// Compare the frozen prototype with the Next production server in isolated Chrome.
import assert from 'node:assert/strict';
import { readFileSync, mkdirSync, writeFileSync } from 'node:fs';
import { launch, setViewport, open } from './cdp.mjs';

const prototype = process.env.PROTOTYPE_URL || 'http://localhost:3460';
const next = process.env.BASE_URL || 'http://localhost:3000';
const output = process.env.OUT_DIR || '/tmp/epoch-next-parity';
mkdirSync(output, { recursive: true });
const data = JSON.parse(
  readFileSync('prototype/assets/js/data.js', 'utf8')
    .split('window.EPOCH_DATA = ')[1]
    .trim()
    .replace(/;$/, '')
);
const routes = [
  'index',
  'services',
  'work',
  'industries',
  'how-we-work',
  'insights',
  'about',
  'contact',
  'document-demo',
].map(page => [`${page}.html`, page === 'index' ? '/' : '/' + page]);
for (const item of data.services)
  routes.push(['service.html?id=' + item.id, '/services/' + item.id]);
for (const item of data.caseStudies) routes.push(['case.html?id=' + item.id, '/work/' + item.id]);
for (const item of readFileSync('prototype/assets/js/industries.js', 'utf8').matchAll(
  /id: '([^']+)'/g
))
  routes.push(['industry.html?id=' + item[1], '/industries/' + item[1]]);
for (const item of readFileSync('prototype/assets/js/insights.js', 'utf8').matchAll(
  /slug: '([^']+)'/g
))
  routes.push(['article.html?id=' + item[1], '/insights/' + item[1]]);
for (const [old, route] of [
  ['service', 'services'],
  ['case', 'work'],
  ['industry', 'industries'],
  ['article', 'insights'],
])
  routes.push([old + '.html?id=nope', '/' + route + '/nope']);
for (const page of ['marks', 'logos', 'footer-lab', 'identity-lab', 'identity-color-lab'])
  routes.push([page + '.html', '/labs/' + page + '.html']);
const cdp = await launch();
const failures = [];
const links = new Set();
const errors = [];
cdp.on(message => {
  if (message.method === 'Runtime.exceptionThrown') errors.push(message.params.exceptionDetails);
  if (message.method === 'Runtime.consoleAPICalled' && message.params.type === 'error')
    errors.push(message.params.args);
});
const snapshot = `(() => {
  const main = document.querySelector('main') || document.body;
  const visible = node => node.checkVisibility() && !node.closest('[hidden]');
  return {
    links: [...document.querySelectorAll('a[href]')].filter(a => !a.getAttribute('href').startsWith('#')).map(a => a.href).filter(href => href.startsWith(location.origin + '/')),
    text: main.innerText.replace(/\\s+/g, ' ').trim(),
    height: document.documentElement.scrollHeight,
    width: document.documentElement.scrollWidth,
    landmarks: [...main.querySelectorAll('h1,h2,h3')].filter(visible).map(node => {
      const r = node.getBoundingClientRect(), s = getComputedStyle(node);
      return {text: node.textContent.replace(/\\s+/g, ' ').trim(), x: r.x, y: r.y, width: r.width, height: r.height, size: s.fontSize, weight: s.fontWeight};
    }),
    images: [...document.images].filter(node => !node.complete || !node.naturalWidth).map(node => node.src),
    missingLinks: [...document.querySelectorAll('a[href^="#"]')].map(a => a.getAttribute('href')).filter(href => href.length > 1 && !document.getElementById(href.slice(1))),
  };
})()`;
try {
  await cdp.send('Runtime.enable');
  await cdp.send('Emulation.setEmulatedMedia', {
    features: [{ name: 'prefers-reduced-motion', value: 'reduce' }],
  });
  await cdp.send('Page.addScriptToEvaluateOnNewDocument', {
    source: `Date = class extends Date { constructor(...args) { super(...(args.length ? args : ['2026-10-03T12:00:00Z'])); } static now() { return 1791028800000; } };`,
  });
  for (const width of [1440, 390]) {
    await setViewport(cdp, width, 900);
    for (const [old, route] of routes) {
      const pair = [];
      for (const [label, url] of [
        ['prototype', `${prototype}/${old}`],
        ['next', `${next}${route}`],
      ]) {
        await open(cdp, url, 250);
        pair.push(await cdp.evaluate(snapshot));
        if (
          [
            '/',
            '/about',
            '/services',
            '/contact',
            '/how-we-work',
            '/work/hub-international',
            '/insights/first-30-days',
          ].includes(route)
        ) {
          const { data } = await cdp.send('Page.captureScreenshot', { format: 'png' });
          writeFileSync(
            `${output}/${width}-${route.replaceAll('/', '_') || 'home'}-${label}.png`,
            Buffer.from(data, 'base64')
          );
        }
      }
      const [a, b] = pair;
      b.links.forEach(link => links.add(link.split('#')[0]));
      const differences = [];
      if (a.text !== b.text) {
        let at = 0;
        while (a.text[at] === b.text[at] && at < Math.min(a.text.length, b.text.length)) at++;
        differences.push({
          type: 'text',
          at,
          prototype: a.text.slice(Math.max(0, at - 60), at + 150),
          next: b.text.slice(Math.max(0, at - 60), at + 150),
        });
      }
      if (Math.abs(a.height - b.height) > 3)
        differences.push({ type: 'height', prototype: a.height, next: b.height });
      if (a.landmarks.length !== b.landmarks.length)
        differences.push({
          type: 'heading count',
          prototype: a.landmarks.length,
          next: b.landmarks.length,
        });
      a.landmarks.forEach((item, i) => {
        const other = b.landmarks[i];
        if (!other) return;
        if (
          item.text !== other.text ||
          ['x', 'y', 'width', 'height'].some(key => Math.abs(item[key] - other[key]) > 3) ||
          item.size !== other.size ||
          item.weight !== other.weight
        )
          differences.push({ type: 'heading', prototype: item, next: other });
      });
      if (b.width !== width || b.images.length || b.missingLinks.length)
        differences.push({
          type: 'layout/assets/links',
          width: b.width,
          images: b.images,
          links: b.missingLinks,
        });
      if (differences.length) failures.push({ width, route, differences });
      console.log(
        width,
        route,
        differences.length ? `${differences.length} differences` : 'matches'
      );
    }
  }
  for (const link of links) {
    const response = await fetch(link);
    if (!response.ok) failures.push({ link, status: response.status });
    await response.body?.cancel();
  }
  console.log(`Checked ${links.size} internal page and download links`);
  writeFileSync(`${output}/report.json`, JSON.stringify({ failures, errors }, null, 2));
  assert.equal(errors.length, 0, 'Browser errors: ' + JSON.stringify(errors));
  assert.equal(failures.length, 0, `Parity differences: see ${output}/report.json`);
} finally {
  await cdp.close();
}
