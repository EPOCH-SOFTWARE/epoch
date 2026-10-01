// Usage: node mobile-check.mjs <url> <outPrefix> [width] [selector...]
// Loads the page in headless Chrome at a phone-sized viewport, reports elements wider
// than the viewport, and screenshots the top of the page plus each selector.
import { spawn } from 'node:child_process';
import { writeFileSync, mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const [, , url, outPrefix, widthArg = '390', ...selectors] = process.argv;
const width = Number(widthArg);
const here = dirname(fileURLToPath(import.meta.url));
const port = 9300 + Math.floor(Math.random() * 600);
const profile = mkdtempSync(join(here, 'chrome-profile-'));

const chrome = spawn(CHROME, [
  '--headless=new',
  `--remote-debugging-port=${port}`,
  '--disable-gpu',
  '--hide-scrollbars',
  `--user-data-dir=${profile}`,
  'about:blank',
]);

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

async function pageSocketUrl() {
  for (let attempt = 0; attempt < 50; attempt++) {
    try {
      const targets = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
      const page = targets.find(target => target.type === 'page');
      if (page) return page.webSocketDebuggerUrl;
    } catch {
      // Chrome is still starting; retry below.
    }
    await sleep(200);
  }
  throw new Error('Chrome did not expose a page target');
}

const socket = new WebSocket(await pageSocketUrl());
await new Promise(resolve => socket.addEventListener('open', resolve, { once: true }));

let nextId = 0;
const pending = new Map();
const listeners = [];
socket.addEventListener('message', event => {
  const message = JSON.parse(event.data);
  if (message.id && pending.has(message.id)) {
    const { resolve, reject } = pending.get(message.id);
    pending.delete(message.id);
    if (message.error) reject(new Error(message.error.message));
    else resolve(message.result);
  } else if (message.method) {
    listeners.forEach(listener => listener(message));
  }
});

const send = (method, params = {}) =>
  new Promise((resolve, reject) => {
    const id = ++nextId;
    pending.set(id, { resolve, reject });
    socket.send(JSON.stringify({ id, method, params }));
  });

const evaluate = async expression => {
  const { result, exceptionDetails } = await send('Runtime.evaluate', {
    expression,
    returnByValue: true,
    awaitPromise: true,
  });
  if (exceptionDetails) throw new Error(exceptionDetails.text);
  return result.value;
};

const shoot = async name => {
  const { data } = await send('Page.captureScreenshot', { format: 'png' });
  const file = `${outPrefix}-${name}.png`;
  writeFileSync(file, Buffer.from(data, 'base64'));
  console.log('screenshot', file);
};

await send('Emulation.setDeviceMetricsOverride', {
  width,
  height: 844,
  deviceScaleFactor: 1,
  mobile: true,
});
await send('Page.enable');
const loaded = new Promise(resolve =>
  listeners.push(message => message.method === 'Page.loadEventFired' && resolve())
);
await send('Page.navigate', { url });
await loaded;
await sleep(1500);

const report = await evaluate(`(() => {
  const vw = window.innerWidth;
  const offenders = [...document.querySelectorAll('body *')]
    .filter(el => el.getBoundingClientRect().right > vw + 1)
    .filter(el => !el.closest('[aria-hidden="true"]'))
    .slice(0, 8)
    .map(el => el.tagName.toLowerCase() + '.' + String(el.className.baseVal ?? el.className).split(' ')[0] + ' right=' + Math.round(el.getBoundingClientRect().right));
  return { viewport: vw, documentWidth: document.documentElement.scrollWidth, offenders };
})()`);
console.log(JSON.stringify(report, null, 2));

await shoot('top');
for (const selector of selectors) {
  await evaluate(`document.querySelector(${JSON.stringify(selector)})?.scrollIntoView({ block: 'start' })`);
  await sleep(400);
  await shoot(selector.replace(/[^a-z0-9]+/gi, '_').replace(/^_|_$/g, ''));
}

socket.close();
chrome.kill();
