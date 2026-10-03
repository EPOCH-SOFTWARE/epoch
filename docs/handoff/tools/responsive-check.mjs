// Real touch input and layout checks in isolated headless Chrome.
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { launch, setViewport, open, sleep } from './cdp.mjs';

const data = JSON.parse(
  readFileSync('prototype/assets/js/data.js', 'utf8')
    .split('window.EPOCH_DATA = ')[1]
    .trim()
    .replace(/;$/, '')
);
const routes = [
  'index.html',
  'services.html',
  'work.html',
  'industries.html',
  'how-we-work.html',
  'insights.html',
  'about.html',
  'contact.html',
  'document-demo.html',
  'marks.html',
  'logos.html',
  'footer-lab.html',
  'identity-lab.html',
  'identity-color-lab.html',
  'case.html?id=nope',
  'service.html?id=nope',
  'industry.html?id=nope',
  'article.html?id=nope',
];
for (const item of data.services) routes.push('service.html?id=' + item.id);
for (const item of data.caseStudies) routes.push('case.html?id=' + item.id);
for (const id of readFileSync('prototype/assets/js/industries.js', 'utf8').matchAll(
  /id: '([^']+)'/g
))
  routes.push('industry.html?id=' + id[1]);
for (const id of readFileSync('prototype/assets/js/insights.js', 'utf8').matchAll(
  /slug: '([^']+)'/g
))
  routes.push('article.html?id=' + id[1]);
const cdp = await launch();
const failures = [];
const check = (condition, message) => {
  if (!condition) failures.push(message);
};
cdp.on(message => {
  if (message.method === 'Runtime.exceptionThrown')
    failures.push(
      message.params.exceptionDetails.exception?.description || message.params.exceptionDetails.text
    );
  if (message.method === 'Runtime.consoleAPICalled' && message.params.type === 'error')
    failures.push(JSON.stringify(message.params.args));
});
async function tap(selector) {
  const point = await cdp.evaluate(`(() => {
    const element = document.querySelector(${JSON.stringify(selector)});
    const before = element.getBoundingClientRect();
    const top = element.closest('.site-header') ? 0 : 64;
    if (before.top < top || before.bottom > innerHeight) element.scrollIntoView({block: 'center'});
    const rect = element.getBoundingClientRect();
    return {x: rect.x + rect.width / 2, y: rect.y + rect.height / 2};
  })()`);
  await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [point] });
  await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
  await sleep(100);
}
try {
  await cdp.send('Runtime.enable');
  await cdp.send('Emulation.setTouchEmulationEnabled', { enabled: true });
  for (const width of [320, 390, 430, 768, 1024]) {
    await setViewport(cdp, width, 844);
    for (const route of routes) {
      await open(cdp, 'http://localhost:3460/' + route, 80);
      const report = await cdp.evaluate(`(() => {
        const visible = e => e.checkVisibility() && !e.closest('[hidden],details:not([open]) .details-fields');
        const label = e => e.textContent.trim().slice(0, 45) || e.id;
        const overflow = [...document.querySelectorAll('main *, .site-header *, .site-footer *')].filter(e => {
          if (!visible(e) || e.closest('svg, .marquee, .logo-note')) return false;
          const r = e.getBoundingClientRect();
          return r.right > innerWidth + 1 || r.left < -1;
        }).map(label);
        const targets = '.brand, .menu-toggle, .header-contact, .foot-col a, .crumbs a, .office a, .direct a, .text-link, .home-paths a, .goal-proof, .goal-links a, .reading-guide a, .ins-toc a, .scope-choices button, .demo-back, .demo-preview, .demo-reset, .source-link, .lab-name, .intro-bottom a, .back, .jump';
        return {
          width: document.documentElement.scrollWidth,
          overflow,
          small: [...document.querySelectorAll(targets)].filter(e => visible(e) && e.getBoundingClientRect().height < 43.5).map(label),
          fields: [...document.querySelectorAll('input, select, textarea')].filter(e => visible(e) && parseFloat(getComputedStyle(e).fontSize) < 16).map(e => e.id),
          zoom: !/user-scalable=no|maximum-scale=1/.test(document.querySelector('meta[name=viewport]').content)
        };
      })()`);
      check(
        report.width === width && !report.overflow.length,
        `${width} ${route}: overflow ${report.overflow}`
      );
      check(!report.small.length, `${width} ${route}: small touch targets ${report.small}`);
      check(!report.fields.length, `${width} ${route}: small field text ${report.fields}`);
      check(report.zoom, `${route}: zoom disabled`);
    }
    console.log(`${width}px: checked ${routes.length} routes`);
  }
  for (const [width, height] of [
    [390, 844],
    [844, 390],
  ]) {
    await setViewport(cdp, width, height);
    await open(cdp, 'http://localhost:3460/work.html', 1000);
    await cdp.evaluate('window.scrollTo(0, 1000)');
    await sleep(100);
    await tap('.menu-toggle');
    check(
      await cdp.evaluate(
        "document.querySelector('main').inert && !document.getElementById('menu').hidden"
      ),
      'Touch opens menu and contains background'
    );
    await tap('.menu-toggle');
    check(
      Math.abs((await cdp.evaluate('scrollY')) - 1000) < 2,
      `${width}: menu close moved the page`
    );
    await tap('.menu-toggle');
    await tap('#menu a:last-child');
    await sleep(1000);
    check(
      await cdp.evaluate("location.pathname.endsWith('contact.html')"),
      `${width}: last menu link reachable by touch`
    );
    await open(cdp, 'http://localhost:3460/work.html', 1000);
    await tap('.menu-toggle');
    await setViewport(cdp, 1200, 844);
    await sleep(100);
    check(
      await cdp.evaluate(
        "document.getElementById('menu').hidden && !document.querySelector('main').inert && document.body.style.overflow !== 'hidden'"
      ),
      'Desktop resize releases menu and scroll lock'
    );
  }
  await setViewport(cdp, 390, 844);
  await open(cdp, 'http://localhost:3460/services.html', 1000);
  await tap('#goal-build');
  check(
    await cdp.evaluate(
      "document.getElementById('goal-build').getAttribute('aria-selected') === 'true'"
    ),
    'Goal switches by touch'
  );
  await open(cdp, 'http://localhost:3460/contact.html', 1000);
  await tap('.project-details summary');
  check(
    await cdp.evaluate("document.querySelector('.project-details').open"),
    'Optional contact fields open by touch'
  );
  await tap('#message-body');
  check(
    await cdp.evaluate(
      "document.activeElement.id === 'message-body' && getComputedStyle(document.querySelector('.reading-clock')).visibility === 'hidden'"
    ),
    'Reading control stays clear of the focused form'
  );
  await cdp.send('Emulation.setEmulatedMedia', {
    features: [{ name: 'prefers-reduced-motion', value: 'reduce' }],
  });
  await open(cdp, 'http://localhost:3460/', 1000);
  check(
    await cdp.evaluate(
      "parseFloat(getComputedStyle(document.querySelector('.marquee-track')).animationDuration) < .1"
    ),
    'Reduced motion stops marquee animation'
  );
  assert.deepEqual(failures, []);
  console.log(
    'Touch navigation, menu scroll position, rotation, optional fields, zoom and reduced motion passed'
  );
} finally {
  await cdp.close();
}
