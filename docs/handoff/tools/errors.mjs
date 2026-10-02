// Usage: node errors.mjs <url> [waitMs=3000] [expression]
// Loads a page in headless Chrome and prints uncaught exceptions and console errors/warnings.
// With an expression, also prints its value (promises are awaited), e.g. to measure the page.
import { spawn } from 'node:child_process';
import { mkdtempSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const [, , url, waitMs = '3000', expression] = process.argv;
const port = 9900 + Math.floor(Math.random() * 90);
const profile = mkdtempSync(join(process.env.TMPDIR || tmpdir(), 'cdp-'));
const chrome = spawn(CHROME, ['--headless=new', `--remote-debugging-port=${port}`, `--user-data-dir=${profile}`, 'about:blank']);
const sleep = ms => new Promise(r => setTimeout(r, ms));

async function socketUrl() {
  for (let i = 0; i < 60; i++) {
    try {
      const list = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
      const page = list.find(t => t.type === 'page');
      if (page) return page.webSocketDebuggerUrl;
    } catch (error) {
      if (i === 59) throw error;
    }
    await sleep(200);
  }
  throw new Error('no page target');
}

const ws = new WebSocket(await socketUrl());
await new Promise(r => ws.addEventListener('open', r, { once: true }));
let id = 0;
const pending = new Map();
const problems = [];
ws.addEventListener('message', event => {
  const msg = JSON.parse(event.data);
  if (msg.id && pending.has(msg.id)) {
    const { resolve, reject } = pending.get(msg.id);
    pending.delete(msg.id);
    msg.error ? reject(new Error(msg.error.message)) : resolve(msg.result);
  }
  if (msg.method === 'Runtime.exceptionThrown') problems.push('EXCEPTION ' + JSON.stringify(msg.params.exceptionDetails.exception?.description || msg.params.exceptionDetails.text));
  if (msg.method === 'Runtime.consoleAPICalled' && ['error', 'warning'].includes(msg.params.type)) problems.push(msg.params.type.toUpperCase() + ' ' + msg.params.args.map(a => a.value ?? a.description).join(' '));
  if (msg.method === 'Log.entryAdded' && ['error', 'warning'].includes(msg.params.entry.level)) problems.push('LOG ' + msg.params.entry.level + ' ' + msg.params.entry.text + ' ' + (msg.params.entry.url || ''));
});
const send = (method, params = {}) => new Promise((resolve, reject) => { const n = ++id; pending.set(n, { resolve, reject }); ws.send(JSON.stringify({ id: n, method, params })); });
try {
  await send('Runtime.enable');
  await send('Log.enable');
  await send('Page.enable');
  await send('Page.navigate', { url });
  await sleep(Number(waitMs));
  console.log(problems.length ? problems.join('\n') : 'no errors or warnings');
  if (expression) {
    const { result } = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
    console.log(result.value);
  }
} finally {
  ws.close();
  chrome.kill();
  await sleep(300);
  rmSync(profile, { recursive: true, force: true });
}
