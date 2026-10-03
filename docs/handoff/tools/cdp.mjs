// Minimal headless Chrome over CDP. Never touches the user's browser.
import { spawn } from 'node:child_process';
import { mkdtempSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
export const sleep = ms => new Promise(r => setTimeout(r, ms));

export async function launch(extraArgs = []) {
  const port = 9400 + Math.floor(Math.random() * 500);
  const profile = mkdtempSync(join(process.env.TMPDIR || tmpdir(), 'cdp-'));
  const chrome = spawn(CHROME, ['--headless=new', `--remote-debugging-port=${port}`, '--hide-scrollbars', '--mute-audio', `--user-data-dir=${profile}`, ...extraArgs, 'about:blank']);
  let wsUrl;
  for (let i = 0; i < 80 && !wsUrl; i++) {
    try {
      const list = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
      const pageTarget = list.find(t => t.type === 'page');
      if (pageTarget) wsUrl = pageTarget.webSocketDebuggerUrl;
    } catch (error) {
      if (i === 79) throw error;
    }
    if (!wsUrl) await sleep(200);
  }
  if (!wsUrl) throw new Error('no page target');
  const ws = new WebSocket(wsUrl);
  await new Promise(r => ws.addEventListener('open', r, { once: true }));
  let id = 0;
  const pending = new Map();
  const listeners = [];
  ws.addEventListener('message', event => {
    const msg = JSON.parse(event.data);
    if (msg.id && pending.has(msg.id)) {
      const { resolve, reject } = pending.get(msg.id);
      pending.delete(msg.id);
      msg.error ? reject(new Error(msg.error.message)) : resolve(msg.result);
    } else if (msg.method) listeners.forEach(fn => fn(msg));
  });
  const send = (method, params = {}) => new Promise((resolve, reject) => { const n = ++id; pending.set(n, { resolve, reject }); ws.send(JSON.stringify({ id: n, method, params })); });
  const evaluate = async expression => {
    const res = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
    if (res.exceptionDetails) throw new Error('eval failed: ' + JSON.stringify(res.exceptionDetails.exception?.description || res.exceptionDetails.text));
    return res.result.value;
  };
  const close = async () => { ws.close(); chrome.kill(); await sleep(300); rmSync(profile, { recursive: true, force: true }); };
  return { send, evaluate, close, on: fn => listeners.push(fn) };
}

export async function setViewport(cdp, w, h, scale = 1) {
  await cdp.send('Emulation.setDeviceMetricsOverride', { width: w, height: h, deviceScaleFactor: scale, mobile: w < 700 });
}

export async function open(cdp, url, waitMs = 1500) {
  await cdp.send('Page.enable');
  const loaded = new Promise(r => cdp.on(msg => { if (msg.method === 'Page.loadEventFired') r(); }));
  await cdp.send('Page.navigate', { url });
  await Promise.race([loaded, sleep(8000)]);
  await cdp.evaluate('document.fonts.ready.then(() => true)');
  // Next loads the preserved motion code after hydration. Wait for it before input checks.
  if (await cdp.evaluate("!!document.querySelector('[data-next-night]')")) {
    let ready = false;
    for (let attempt = 0; attempt < 100; attempt++) {
      ready = await cdp.evaluate("document.documentElement.dataset.nightReady === 'true'");
      if (ready) break;
      await sleep(50);
    }
    if (!ready) throw new Error('Night runtime did not initialize: ' + url);
  }
  await sleep(waitMs);
}

// Scroll through the page so scroll-triggered drawings complete.
export async function scrollThrough(cdp, step = 700) {
  const height = await cdp.evaluate('document.documentElement.scrollHeight');
  for (let y = 0; y < height; y += step) {
    await cdp.evaluate(`window.scrollTo(0, ${y})`);
    await sleep(60);
  }
  await cdp.evaluate('window.scrollTo(0, 0)');
  await sleep(400);
}
