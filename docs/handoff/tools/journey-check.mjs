// Real headless browser checks for discovery, enquiry context, project reading and navigation.
import assert from 'node:assert/strict';
import { launch, setViewport, open, sleep } from './cdp.mjs';

const cdp = await launch();
const problems = [];
cdp.on(message => {
  if (message.method === 'Runtime.exceptionThrown') problems.push(message.params.exceptionDetails);
  if (message.method === 'Runtime.consoleAPICalled' && message.params.type === 'error')
    problems.push(message.params.args);
});
const value = expression => cdp.evaluate(expression);
async function key(name, shift = false) {
  const codes = { Tab: 9, Enter: 13, Escape: 27, ArrowDown: 40, ArrowRight: 39, Home: 36, End: 35 };
  await cdp.send('Input.dispatchKeyEvent', {
    type: 'keyDown',
    key: name,
    code: name,
    windowsVirtualKeyCode: codes[name],
    modifiers: shift ? 8 : 0,
    ...(name === 'Enter' ? { text: '\r' } : {}),
  });
  await cdp.send('Input.dispatchKeyEvent', {
    type: 'keyUp',
    key: name,
    code: name,
    windowsVirtualKeyCode: codes[name],
    modifiers: shift ? 8 : 0,
  });
}

try {
  await cdp.send('Runtime.enable');
  await cdp.send('Emulation.setFocusEmulationEnabled', { enabled: true });
  for (const width of [1440, 390, 320]) {
    await setViewport(cdp, width, 900);
    await open(cdp, 'http://localhost:3460/services.html?goal=build', 400);
    assert.equal(await value('document.documentElement.scrollWidth'), width);
    assert.equal(
      await value("document.querySelector('[role=tab][aria-selected=true]').id"),
      'goal-build'
    );
    await value("document.getElementById('goal-build').focus()");
    await key('ArrowDown');
    assert.equal(await value('document.activeElement.id'), 'goal-modernise');
    assert.equal(await value("document.querySelectorAll('.goal-panel:not([hidden])').length"), 1);
    assert.match(await value('location.search'), /goal=modernise/);
    await key('Home');
    assert.equal(await value('document.activeElement.id'), 'goal-automate');
    await key('End');
    assert.equal(await value('document.activeElement.id'), 'goal-modernise');
    const destination = await value(
      "document.querySelector('.goal-panel:not([hidden]) .btn').href"
    );
    await open(cdp, destination, 400);
    assert.equal(
      await value("document.querySelector('[name=projectType]').value"),
      'custom-software'
    );
    assert.match(
      await value("document.querySelector('[data-enquiry-context]').textContent"),
      /Modernise a platform/
    );
    assert.equal(await value("document.querySelector('[name=message]').value"), '');
    assert.equal(await value("document.querySelector('.project-details').open"), false);
    assert.match(await value("document.querySelector('[data-booking]').textContent"), /by email/);
    assert.match(await value("document.querySelector('[data-booking]').href"), /^mailto:/);

    await value(
      "document.getElementById('name').value = 'Ada Lovelace'; document.querySelector('[data-clear-context]').click()"
    );
    assert.equal(await value("document.getElementById('name').value"), 'Ada Lovelace');
    assert.equal(await value("document.querySelector('[name=projectType]').value"), '');
    assert.equal(await value('location.search'), '');
    await value("document.querySelector('[data-contact-form]').requestSubmit()");
    assert.equal(await value('document.activeElement.id'), 'email');
    await value(
      `document.getElementById('email').value = 'ada@company.com'; document.querySelector('[name=message]').value = 'A project brief with <img src=x onerror=alert(1)> as text.'; document.querySelector('[data-contact-form]').requestSubmit()`
    );
    assert.equal(await value("document.querySelector('[data-form-done]').hidden"), false);
    assert.match(
      await value("document.querySelector('[data-preview-message]').textContent"),
      /<img/
    );
    assert.equal(await value("document.querySelector('[data-form-done] img')"), null);
    assert.match(
      await value("document.querySelector('[data-form-done]').textContent"),
      /Nothing has been sent/
    );
    await value("document.querySelector('[data-form-again]').click()");
    assert.equal(await value('document.activeElement.id'), 'name');
    assert.match(await value("document.querySelector('[name=message]').value"), /project brief/);

    await open(cdp, 'http://localhost:3460/work.html', 400);
    assert.equal(await value('document.documentElement.scrollWidth'), width);
    assert.equal(await value("document.querySelectorAll('[data-scope-explorer]').length"), 2);
    await value("document.querySelector('.scope-choices [aria-selected=true]').focus()");
    await key('ArrowRight');
    assert.equal(await value('document.activeElement.textContent'), 'Integration');
    assert.match(
      await value("document.querySelector('.scope-panel:not([hidden])').textContent"),
      /legacy systems/
    );
    await key('Home');
    assert.equal(await value('document.activeElement.textContent'), 'The challenge');

    if (width < 1061) {
      assert.notEqual(
        await value("getComputedStyle(document.querySelector('.header-contact')).display"),
        'none'
      );
      await value("document.querySelector('.menu-toggle').click()");
      assert.equal(await value("document.querySelector('main').inert"), true);
      assert.equal(await value('document.activeElement.textContent'), 'Work');
      await key('Tab', true);
      assert.equal(await value('document.activeElement.className'), 'menu-toggle');
      await key('Tab', true);
      assert.equal(await value('document.activeElement.textContent'), 'Start a project');
      await key('Escape');
      assert.equal(await value("document.querySelector('main').inert"), false);
      assert.equal(await value('document.activeElement.className'), 'menu-toggle');
      assert.equal(await value("document.getElementById('menu').hidden"), true);
    }
    console.log(
      width +
        'px: goal selection, keyboard, context, optional fields, safe preview, retained draft, scope tabs and menu passed'
    );
  }
  await setViewport(cdp, 1440, 900);
  await open(cdp, 'http://localhost:3460/service.html?id=cloud-computing', 400);
  assert.match(
    await value("document.querySelector('main a[href*=contact]').href"),
    /service=cloud-computing/
  );
  const anchors = await value("[...document.querySelectorAll('.reading-guide a')].map(a=>a.hash)");
  assert.equal(anchors.length, 7);
  await value("document.querySelector('.reading-guide a:nth-child(3)').click()");
  await sleep(300);
  assert.equal(
    await value("document.querySelector('.reading-guide [aria-current=location]').textContent"),
    'Deliverables'
  );
  await open(cdp, 'http://localhost:3460/contact.html?service=cloud-computing', 300);
  assert.equal(
    await value("document.querySelector('[name=projectType]').value"),
    'cloud-computing'
  );
  await open(cdp, 'http://localhost:3460/contact.html?goal=%3Cscript%3E', 300);
  assert.equal(await value("document.querySelector('[data-enquiry-context]').hidden"), true);
  await cdp.send('Emulation.setEmulatedMedia', {
    features: [{ name: 'prefers-reduced-motion', value: 'reduce' }],
  });
  await open(cdp, 'http://localhost:3460/services.html?goal=automate', 300);
  assert.equal(await value("document.querySelectorAll('.goal-panel:not([hidden])').length"), 1);
  assert.deepEqual(problems, []);
  console.log(
    'Service context, reading guide, unknown query, reduced motion and console checks passed'
  );
} finally {
  await cdp.close();
}
