// Usage: node shot.mjs <url> <out.png> [width=1440] [height=900] [waitMs=3000] [scrollY=0|selector] [scale=1] [beforeJs]
// Headless Chrome screenshot of one viewport. Never touches the user's own browser.
// beforeJs runs just before the shot (e.g. to open a menu); REDUCED=1 emulates prefers-reduced-motion.
import { spawn } from 'node:child_process';
import { writeFileSync, mkdtempSync, rmSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const [, , url, out, w = '1440', h = '900', waitMs = '3000', scroll = '0', scale = '1', beforeJs = ''] = process.argv;
const here = dirname(fileURLToPath(import.meta.url));
const port = 9300 + Math.floor(Math.random() * 600);
const profile = mkdtempSync(join(here, 'chrome-profile-'));
const chrome = spawn(CHROME, [
  '--headless=new',
  `--remote-debugging-port=${port}`,
  '--hide-scrollbars',
  '--mute-audio',
  `--user-data-dir=${profile}`,
  'about:blank',
]);
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

async function pageSocketUrl() {
  for (let attempt = 0; attempt < 60; attempt++) {
    try {
      const targets = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
      const page = targets.find(target => target.type === 'page');
      if (page) return page.webSocketDebuggerUrl;
    } catch {
      // Chrome still starting; retry.
    }
    await sleep(200);
  }
  throw new Error('Chrome did not expose a page target');
}

const socket = new WebSocket(await pageSocketUrl());
await new Promise(resolve => socket.addEventListener('open', resolve, { once: true }));
let nextId = 0;
const pending = new Map();
socket.addEventListener('message', event => {
  const message = JSON.parse(event.data);
  if (message.id && pending.has(message.id)) {
    const { resolve, reject } = pending.get(message.id);
    pending.delete(message.id);
    if (message.error) reject(new Error(message.error.message));
    else resolve(message.result);
  }
});
const send = (method, params = {}) =>
  new Promise((resolve, reject) => {
    const id = ++nextId;
    pending.set(id, { resolve, reject });
    socket.send(JSON.stringify({ id, method, params }));
  });

try {
  await send('Emulation.setDeviceMetricsOverride', {
    width: Number(w),
    height: Number(h),
    deviceScaleFactor: Number(scale),
    mobile: Number(w) < 700,
  });
  await send('Emulation.setFocusEmulationEnabled', { enabled: true });
  if (process.env.REDUCED) {
    await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
  }
  await send('Page.enable');
  await send('Page.navigate', { url });
  await sleep(Number(waitMs));
  const target = /^\d+$/.test(scroll)
    ? `window.scrollTo(0, ${scroll})`
    : `document.querySelector(${JSON.stringify(scroll)})?.scrollIntoView({ block: 'start' })`;
  await send('Runtime.evaluate', { expression: target });
  if (beforeJs) await send('Runtime.evaluate', { expression: beforeJs, awaitPromise: true });
  await sleep(900);
  const { data } = await send('Page.captureScreenshot', { format: 'png' });
  writeFileSync(out, Buffer.from(data, 'base64'));
  console.log('saved', out);
} finally {
  socket.close();
  chrome.kill();
  await sleep(300);
  rmSync(profile, { recursive: true, force: true });
}
