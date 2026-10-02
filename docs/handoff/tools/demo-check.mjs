// Exercise the document demo with real keyboard events in isolated headless Chrome.
// Usage from the repo root: node docs/handoff/tools/demo-check.mjs
import assert from 'node:assert/strict';
import { launch, setViewport, open, sleep } from './cdp.mjs';

const cdp = await launch();
const problems = [];
cdp.on(message => {
  if (message.method === 'Runtime.exceptionThrown') problems.push(message.params.exceptionDetails);
  if (message.method === 'Runtime.consoleAPICalled' && message.params.type === 'error') problems.push(message.params.args);
});

async function press(key, code) {
  const windowsVirtualKeyCode = key === 'Enter' ? 13 : 9;
  await cdp.send('Input.dispatchKeyEvent', { type: 'keyDown', key, code, windowsVirtualKeyCode, ...(key === 'Enter' ? { text: '\r' } : {}) });
  await cdp.send('Input.dispatchKeyEvent', { type: 'keyUp', key, code, windowsVirtualKeyCode });
}

async function settled() {
  for (let attempt = 0; attempt < 100; attempt++) {
    if (!(await cdp.evaluate("document.querySelector('[type=submit]').disabled"))) return;
    await sleep(20);
  }
  throw new Error('Review did not settle');
}

try {
  await cdp.send('Runtime.enable');
  await cdp.send('Emulation.setFocusEmulationEnabled', { enabled: true });
  for (const width of [1440, 390]) {
    await setViewport(cdp, width, 900);
    await open(cdp, 'http://localhost:3460/document-demo.html', 500);
    assert.equal(await cdp.evaluate('document.documentElement.scrollWidth'), width);
    assert.equal(await cdp.evaluate("document.querySelectorAll('.review-field').length"), 3);

    await cdp.evaluate("document.querySelector('[data-sample=complete]').focus()");
    await press('Tab', 'Tab');
    assert.equal(await cdp.evaluate('document.activeElement.dataset.sample'), 'missing');
    await press('Enter', 'Enter');
    assert.match(await cdp.evaluate("document.querySelectorAll('.review-value')[1].textContent"), /Not confirmed/);
    await press('Tab', 'Tab');
    await press('Enter', 'Enter');
    assert.equal(await cdp.evaluate("document.querySelectorAll('.review-value')[2].textContent"), 'Needs a decision');
    assert.equal(await cdp.evaluate("document.querySelectorAll('.review-field')[2].querySelectorAll('.source-link').length"), 2);

    await cdp.evaluate("document.querySelectorAll('.review-field')[2].querySelector('.source-link').focus()");
    await press('Enter', 'Enter');
    assert.equal(await cdp.evaluate('document.activeElement.id'), 'source-document');
    assert.equal(await cdp.evaluate('document.activeElement.value.slice(document.activeElement.selectionStart, document.activeElement.selectionEnd)'), 'Target date: 30 October');
    await cdp.send('Input.insertText', { text: 'Target date: 6 November' });
    assert.equal(await cdp.evaluate("document.querySelectorAll('.review-field').length"), 0, 'Editing clears stale evidence');
    await cdp.evaluate("document.querySelector('[data-preview]').focus()");
    await press('Enter', 'Enter');
    assert.equal(await cdp.evaluate("document.querySelectorAll('.review-value')[2].textContent"), '6 November');

    await cdp.evaluate(`(() => {
      const input = document.getElementById('source-document');
      input.value = 'Project: <img src=x onerror=alert(1)>\\nOwner: Ada Lovelace\\nTarget: Friday';
      input.dispatchEvent(new Event('input', { bubbles: true }));
      document.querySelector('[data-preview]').click();
    })()`);
    assert.equal(await cdp.evaluate("document.querySelector('[data-review-results] img') === null"), true);
    assert.equal(await cdp.evaluate("document.querySelector('.review-value').textContent"), '<img src=x onerror=alert(1)>');

    await cdp.evaluate("document.querySelector('.demo-reset').click()");
    assert.equal(await cdp.evaluate("document.querySelector('[data-sample=conflict]').getAttribute('aria-pressed')"), 'true');
    // Controlled provider responses test the browser without billing or a real API key.
    await cdp.evaluate(`(() => {
      window.__reviewCalls = [];
      window.fetch = (url, options) => new Promise(resolve => {
        window.__reviewCalls.push(JSON.parse(options.body));
        window.__reply = (status, payload) => resolve(new Response(JSON.stringify(payload), {status}));
      });
      document.getElementById('review-form').requestSubmit();
    })()`);
    assert.equal(await cdp.evaluate("document.querySelector('[data-review-state]').textContent"), 'AI reviewing');
    assert.equal(await cdp.evaluate("document.querySelector('[type=submit]').disabled"), true);
    assert.equal(await cdp.evaluate('window.__reviewCalls.length'), 1);
    await cdp.evaluate(`window.__reply(200, {fields: window.KeptTime.reviewBrief(document.getElementById('source-document').value)})`);
    await settled();
    assert.equal(await cdp.evaluate("document.querySelector('[data-review-state]').textContent"), 'AI review');
    assert.equal(await cdp.evaluate("document.querySelectorAll('.review-field').length"), 3);
    assert.equal(await cdp.evaluate("document.querySelector('[type=submit]').disabled"), false);

    await cdp.evaluate(`document.getElementById('review-form').requestSubmit(); window.__reply(429, {error: 'Usage limit reached. Please try again later.'})`);
    await settled();
    assert.equal(await cdp.evaluate("document.querySelector('[data-review-error]').hidden"), false);
    assert.match(await cdp.evaluate("document.querySelector('[data-review-error]').textContent"), /Usage limit/);
    assert.equal(await cdp.evaluate("document.querySelectorAll('.review-field').length"), 0, 'Provider errors never become sample results');

    await cdp.evaluate(`(() => {
      document.getElementById('review-form').requestSubmit();
      const input = document.getElementById('source-document');
      const oldFields = window.KeptTime.reviewBrief(input.value);
      input.value = 'A different brief with no owner.';
      input.dispatchEvent(new Event('input', {bubbles: true}));
      window.__reply(200, {fields: oldFields});
    })()`);
    assert.equal(await cdp.evaluate("document.querySelectorAll('.review-field').length"), 0, 'Late AI responses cannot overwrite edits');
    assert.equal(await cdp.evaluate("document.querySelector('[data-review-state]').textContent"), 'Document changed');

    await cdp.evaluate(`window.fetch = () => Promise.reject(new TypeError('Network unavailable')); document.getElementById('review-form').requestSubmit()`);
    await settled();
    assert.match(await cdp.evaluate("document.querySelector('[data-review-error]').textContent"), /could not connect/);
    await cdp.evaluate("document.querySelector('.demo-reset').click()");
    assert.equal(await cdp.evaluate("document.querySelector('[data-review-state]').textContent"), 'Sample preview');
    console.log(width + 'px: sample switching, keyboard, citations, edits, conflicts, reset, safe rendering, AI loading, success, failure and stale responses passed');
  }
  await cdp.send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
  await open(cdp, 'http://localhost:3460/document-demo.html', 500);
  assert.equal(await cdp.evaluate("document.querySelectorAll('.review-field').length"), 3);
  assert.deepEqual(problems, []);
  console.log('Reduced motion and console checks passed');
} finally {
  await cdp.close();
}
