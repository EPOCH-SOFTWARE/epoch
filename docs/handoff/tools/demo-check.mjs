// Exercise the document demo with real keyboard events in isolated headless Chrome.
// Usage from the repo root: node docs/handoff/tools/demo-check.mjs
import assert from 'node:assert/strict';
import { launch, setViewport, open } from './cdp.mjs';

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
    await cdp.evaluate("document.querySelector('[type=submit]').focus()");
    await press('Enter', 'Enter');
    assert.equal(await cdp.evaluate("document.querySelectorAll('.review-value')[2].textContent"), '6 November');

    await cdp.evaluate(`(() => {
      const input = document.getElementById('source-document');
      input.value = 'Project: <img src=x onerror=alert(1)>\\nOwner: Ada Lovelace\\nTarget: Friday';
      input.dispatchEvent(new Event('input', { bubbles: true }));
      document.getElementById('review-form').requestSubmit();
    })()`);
    assert.equal(await cdp.evaluate("document.querySelector('[data-review-results] img') === null"), true);
    assert.equal(await cdp.evaluate("document.querySelector('.review-value').textContent"), '<img src=x onerror=alert(1)>');

    await cdp.evaluate("document.querySelector('.demo-reset').click()");
    assert.equal(await cdp.evaluate("document.querySelector('[data-sample=conflict]').getAttribute('aria-pressed')"), 'true');
    console.log(width + 'px: sample switching, keyboard, citations, edits, conflicts, reset and safe text rendering passed');
  }
  await cdp.send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
  await open(cdp, 'http://localhost:3460/document-demo.html', 500);
  assert.equal(await cdp.evaluate("document.querySelectorAll('.review-field').length"), 3);
  assert.deepEqual(problems, []);
  console.log('Reduced motion and console checks passed');
} finally {
  await cdp.close();
}
