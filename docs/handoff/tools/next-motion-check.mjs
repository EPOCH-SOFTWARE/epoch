// Test the accepted animation behavior, including document navigation, in isolated Chrome.
import assert from 'node:assert/strict';
import { launch, open, setViewport, sleep } from './cdp.mjs';
const base = process.env.BASE_URL || 'http://localhost:3000';
const c = await launch();
const errors = [];
c.on(m => {
  if (m.method === 'Runtime.exceptionThrown') errors.push(m.params.exceptionDetails);
  if (m.method === 'Runtime.consoleAPICalled' && m.params.type === 'error')
    errors.push(m.params.args);
});
const value = source => c.evaluate(source);
async function click(selector) {
  const point = await value(
    `(() => { const r = document.querySelector(${JSON.stringify(selector)}).getBoundingClientRect(); return {x:r.x+r.width/2,y:r.y+r.height/2}; })()`
  );
  await c.send('Input.dispatchMouseEvent', {
    type: 'mousePressed',
    button: 'left',
    clickCount: 1,
    ...point,
  });
  await c.send('Input.dispatchMouseEvent', {
    type: 'mouseReleased',
    button: 'left',
    clickCount: 1,
    ...point,
  });
}
async function ready(path) {
  for (let i = 0; i < 100; i++) {
    if (
      await value(
        `location.pathname === ${JSON.stringify(path)} && document.documentElement.dataset.nightReady === 'true'`
      )
    )
      return;
    await sleep(50);
  }
  throw new Error('Navigation did not settle: ' + path);
}
try {
  await c.send('Runtime.enable');
  await c.send('Page.addScriptToEvaluateOnNewDocument', {
    source: `
    window.__transition = false;
    window.__transitionAnimations = [];
    addEventListener('pagereveal', event => {
      window.__transition = !!event.viewTransition;
      if (event.viewTransition) event.viewTransition.ready.then(() => {
        window.__transitionAnimations = document.getAnimations().map(animation => animation.animationName).filter(Boolean);
      }).catch(error => { window.__transitionError = error.name; });
    });
    window.__logoFrames = [];
    function observeLogo() {
      const logo = document.querySelector('[data-clock-o]');
      if (logo) {
        new MutationObserver(() => window.__logoFrames.push(logo.getAttribute('transform'))).observe(logo, {attributes:true,attributeFilter:['transform']});
      } else requestAnimationFrame(observeLogo);
    }
    requestAnimationFrame(observeLogo);
  `,
  });
  await setViewport(c, 1440, 900);
  await open(c, base + '/', 0);
  await sleep(1500);
  const firstFrames = await value('[...new Set(window.__logoFrames)]');
  assert.ok(firstFrames.length > 3, 'The logo winds to the current time on the first visit');
  assert.equal(await value("sessionStorage.getItem('epoch-wound')"), '1');
  await sleep(2700);
  assert.equal(
    await value("document.querySelector('[data-hero-now]').classList.contains('on')"),
    true
  );
  assert.match(await value("document.querySelector('[data-hero-now]').textContent"), /^now /);
  assert.match(
    await value("document.querySelector('link[rel=icon]').href"),
    /^data:image\/svg\+xml,/
  );
  const button = await value(
    "(() => {const r=document.querySelector('.hero .btn').getBoundingClientRect();return {x:r.right-12,y:r.top+10};})()"
  );
  await c.send('Input.dispatchMouseEvent', { type: 'mouseMoved', ...button });
  await sleep(100);
  assert.notEqual(await value("document.querySelector('.hero .btn').style.translate"), '');
  await c.send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: 5, y: 5 });
  assert.equal(await value("document.querySelector('.hero .btn').style.translate"), '');
  await value('scrollTo(0,1200)');
  await sleep(250);
  assert.equal(
    await value("document.querySelector('.site-header').classList.contains('scrolled')"),
    true
  );
  assert.equal(await value("document.querySelectorAll('.reading-clock.shown').length"), 1);
  assert.ok(await value("document.querySelectorAll('.ruled.drawn').length > 0"));
  const mid = await value("document.querySelector('[data-reading-o]').getAttribute('transform')");
  await value('scrollTo(0,document.documentElement.scrollHeight)');
  await sleep(300);
  assert.notEqual(
    await value("document.querySelector('[data-reading-o]').getAttribute('transform')"),
    mid
  );
  assert.equal(
    await value("Number(document.querySelector('.site-footer').style.getPropertyValue('--rise'))"),
    1
  );
  await click('.reading-clock');
  await sleep(1400);
  assert.equal(await value('scrollY'), 0);
  assert.equal(await value('document.activeElement.className'), 'brand');
  await click('.nav a[href="/work"]');
  await ready('/work');
  await sleep(1000);
  assert.equal(
    await value('window.__transition'),
    true,
    'Desktop link navigation uses the O reveal'
  );
  assert.ok((await value('window.__transitionAnimations')).includes('o-reveal'));
  assert.ok(
    (await value('[...new Set(window.__logoFrames)]')).length <= 1,
    'The logo does not rewind on the next page'
  );
  await value('history.back()');
  await ready('/');
  await sleep(800);
  assert.equal(await value("document.querySelectorAll('.reading-clock').length"), 1);
  await value('history.forward()');
  await ready('/work');
  await sleep(800);
  assert.equal(await value("document.querySelectorAll('.reading-clock').length"), 1);
  console.log(
    'Logo wind, hero draw, live favicon, magnetic buttons, reading clock, drawn rules, dusk, circle transition and history passed'
  );

  await open(c, base + '/how-we-work', 100);
  const firstAngle = await value(
    "document.querySelector('[data-month-ring] svg').style.getPropertyValue('--angle')"
  );
  await value(
    "document.querySelectorAll('[data-ring-steps] > li')[2].scrollIntoView({block:'center'})"
  );
  await sleep(300);
  assert.notEqual(
    await value(
      "document.querySelector('[data-month-ring] svg').style.getPropertyValue('--angle')"
    ),
    firstAngle
  );
  assert.equal(
    await value("document.querySelectorAll('[data-ring-steps] > li.current').length"),
    1
  );
  await open(c, base + '/work/hub-international', 100);
  assert.ok(
    parseFloat(
      await value("getComputedStyle(document.querySelector('.dial-arc')).strokeDashoffset")
    ) > 0
  );
  await sleep(3000);
  assert.equal(
    parseFloat(
      await value("getComputedStyle(document.querySelector('.dial-arc')).strokeDashoffset")
    ),
    0
  );
  assert.equal(
    parseFloat(await value("getComputedStyle(document.querySelector('.dial-end')).opacity")),
    1
  );
  assert.equal(await value("document.querySelectorAll('.dial-ticks line').length"), 12);
  await open(c, base + '/insights/first-30-days', 100);
  await value("document.querySelector('.ins-toc li:nth-child(3) a').click()");
  await sleep(1000);
  assert.equal(
    await value(
      "document.querySelector('.ins-toc li:nth-child(3) a').getAttribute('aria-current')"
    ),
    'location'
  );
  assert.equal(await value("document.querySelectorAll('.ins-end').length"), 1);
  console.log('Month ring, case dial and article reading details passed');

  await c.send('Emulation.setEmulatedMedia', {
    features: [{ name: 'prefers-reduced-motion', value: 'reduce' }],
  });
  await open(c, base + '/', 0);
  assert.equal(
    await value("document.querySelector('[data-hero-now]').classList.contains('on')"),
    true
  );
  assert.equal(await value("document.documentElement.classList.contains('draws')"), false);
  await click('.nav a[href="/work"]');
  await ready('/work');
  await sleep(200);
  assert.equal(await value('window.__transition'), false);
  await open(c, base + '/how-we-work', 100);
  assert.equal(
    await value(
      "document.querySelector('[data-month-ring] svg').style.getPropertyValue('--angle')"
    ),
    '360deg'
  );
  assert.equal(
    await value("document.querySelectorAll('[data-ring-steps] > li.current').length"),
    0
  );
  await c.send('Emulation.setEmulatedMedia', {
    features: [{ name: 'prefers-reduced-motion', value: 'no-preference' }],
  });
  await c.send('Emulation.setTouchEmulationEnabled', { enabled: true });
  await setViewport(c, 390, 844);
  await open(c, base + '/', 100);
  await value("document.querySelector('.header-contact').click()");
  await ready('/contact');
  await sleep(200);
  assert.equal(await value('window.__transition'), false);
  assert.deepEqual(errors, []);
  console.log('Reduced motion, touch navigation and console checks passed');
} finally {
  await c.close();
}
