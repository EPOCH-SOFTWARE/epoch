// Loads pages headlessly, reports JS exceptions/console errors, and exercises the contact form.
import { spawn } from 'node:child_process';
import { mkdtempSync, rmSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const here = dirname(fileURLToPath(import.meta.url));
const port = 9300 + Math.floor(Math.random() * 600);
const profile = mkdtempSync(join(here, 'chrome-profile-'));
const chrome = spawn(CHROME, ['--headless=new', `--remote-debugging-port=${port}`, `--user-data-dir=${profile}`, 'about:blank']);
const sleep = ms => new Promise(r => setTimeout(r, ms));
let wsUrl;
for (let i = 0; i < 60 && !wsUrl; i++) {
  try { wsUrl = (await (await fetch(`http://127.0.0.1:${port}/json/list`)).json()).find(t => t.type === 'page')?.webSocketDebuggerUrl; } catch { /* starting */ }
  if (!wsUrl) await sleep(200);
}
const ws = new WebSocket(wsUrl);
await new Promise(r => ws.addEventListener('open', r, { once: true }));
let id = 0; const pending = new Map(); const problems = [];
ws.addEventListener('message', e => {
  const m = JSON.parse(e.data);
  if (m.id && pending.has(m.id)) { pending.get(m.id)(m.result); pending.delete(m.id); }
  if (m.method === 'Runtime.exceptionThrown') problems.push('EXCEPTION ' + m.params.exceptionDetails.exception?.description);
  if (m.method === 'Runtime.consoleAPICalled' && ['error', 'warning'].includes(m.params.type)) problems.push(m.params.type + ' ' + m.params.args.map(a => a.value ?? a.description).join(' '));
});
const send = (method, params = {}) => new Promise(r => { const i = ++id; pending.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });
const evaluate = async expr => (await send('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true })).result.value;
await send('Runtime.enable');
const base = 'http://127.0.0.1:3460/';
for (const path of ['index.html', 'services.html', 'service.html?id=generative-ai', 'service.html?id=nope', 'work.html', 'case.html?id=inspira-financial', 'case.html?id=nope', 'about.html', 'contact.html']) {
  await send('Page.navigate', { url: base + path }); await sleep(1500);
  const h1 = await evaluate("document.querySelector('h1')?.textContent.trim()");
  console.log(path.padEnd(32), '|', h1);
}
await send('Page.navigate', { url: base + 'contact.html' }); await sleep(1200);
const empty = await evaluate(`(() => { document.querySelector('[data-contact-form] [type=submit]').click(); return [...document.querySelectorAll('.error:not([hidden])')].map(e => e.textContent).concat(document.activeElement.id); })()`);
console.log('empty submit ->', JSON.stringify(empty));
// form.elements, because form.name is the form's own name attribute, not the "name" field.
const bad = await evaluate(`(() => { const f = document.querySelector('[data-contact-form]').elements; f.namedItem('name').value = 'Ada'; f.namedItem('email').value = 'ada@'; f.namedItem('message').value = 'Hi'; document.querySelector('[data-contact-form] [type=submit]').click(); return [...document.querySelectorAll('.error:not([hidden])')].map(e => e.textContent); })()`);
console.log('bad email ->', JSON.stringify(bad));
const ok = await evaluate(`(() => { document.querySelector('[data-contact-form]').elements.namedItem('email').value = 'ada@company.com'; document.querySelector('[data-contact-form] [type=submit]').click(); const done = document.querySelector('[data-form-done]'); return { errors: document.querySelectorAll('.error:not([hidden])').length, confirmation: done.hidden ? null : done.querySelector('[data-done-title]').textContent }; })()`);
console.log('valid ->', JSON.stringify(ok));
console.log('problems:', problems.length ? problems : 'none');
ws.close(); chrome.kill(); await sleep(300); rmSync(profile, { recursive: true, force: true });
