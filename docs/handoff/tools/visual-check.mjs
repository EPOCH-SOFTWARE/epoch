// Illustrations must follow their selected goal, load at every size and stay honest about case scope.
import assert from 'node:assert/strict';
import { launch, setViewport, open } from './cdp.mjs';

const cdp = await launch();
async function imagesReady() {
  return cdp.evaluate(`Promise.all([...document.querySelectorAll('img.editorial-image')].map(async image => {
    image.loading = 'eager';
    await image.decode();
    return { source: image.getAttribute('src'), alt: image.alt, width: image.naturalWidth };
  }))`);
}
try {
  for (const width of [1440, 390, 320]) {
    await setViewport(cdp, width, 900);
    await open(cdp, 'http://localhost:3460/index.html', 300);
    const home = await imagesReady();
    assert.ok(home.some(image => image.source.includes('system-cutaway.svg')));
    assert.ok(home.every(image => image.width > 0 && image.alt.length > 15));
    for (const goal of ['automate', 'build', 'modernise']) {
      await open(cdp, 'http://localhost:3460/services.html?goal=' + goal, 200);
      await imagesReady();
      const source = await cdp.evaluate(
        `document.querySelector('.goal-panel:not([hidden]) .editorial-image').getAttribute('src')`
      );
      assert.equal(source, 'assets/illustrations/goal-' + goal + '.svg');
      assert.equal(await cdp.evaluate('document.documentElement.scrollWidth'), width);
    }
    await cdp.evaluate(`document.querySelector('#goal-build').focus()`);
    await cdp.send('Input.dispatchKeyEvent', {
      type: 'keyDown',
      key: 'ArrowDown',
      code: 'ArrowDown',
      windowsVirtualKeyCode: 40,
    });
    await cdp.send('Input.dispatchKeyEvent', {
      type: 'keyUp',
      key: 'ArrowDown',
      code: 'ArrowDown',
      windowsVirtualKeyCode: 40,
    });
    assert.match(
      await cdp.evaluate(`document.querySelector('.goal-panel:not([hidden]) img').src`),
      /goal-modernise.svg$/
    );
    await open(cdp, 'http://localhost:3460/work.html', 200);
    assert.equal((await imagesReady()).length, 2);
    for (const id of ['hub-international', 'inspira-financial']) {
      await open(cdp, 'http://localhost:3460/case.html?id=' + id, 200);
      assert.ok((await imagesReady()).some(image => image.source.endsWith(id + '.svg')));
      assert.match(
        await cdp.evaluate(`document.querySelector('.case-illustration figcaption').textContent`),
        /Scope illustration/
      );
      assert.equal(await cdp.evaluate('document.documentElement.scrollWidth'), width);
    }
    console.log(
      width + 'px: home artwork, all goal images, keyboard switching, work and case scope passed'
    );
  }
  await cdp.send('Emulation.setEmulatedMedia', {
    features: [{ name: 'prefers-reduced-motion', value: 'reduce' }],
  });
  await open(cdp, 'http://localhost:3460/services.html', 200);
  assert.equal((await imagesReady()).length, 3);
  console.log('Reduced motion: all artwork available without animation');
} finally {
  await cdp.close();
}
