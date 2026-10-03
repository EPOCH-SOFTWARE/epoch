// Usage: node seq.mjs <outPrefix> <width> <height> <scale> <url> <selector> <offset,offset,...> [settleMs]
// Scrolls so the selected element's top sits `offset` px below the viewport top (negative = scrolled past), one shot each.
import { writeFileSync } from 'node:fs';
import { launch, setViewport, open, scrollThrough, sleep } from './cdp.mjs';

const [, , prefix, w, h, scale, url, selector, offsets, settle = '1300'] = process.argv;
const cdp = await launch();
try {
  await setViewport(cdp, Number(w), Number(h), Number(scale));
  await open(cdp, url, 1500);
  await scrollThrough(cdp);
  let n = 0;
  for (const offset of offsets.split(',').map(Number)) {
    await cdp.evaluate(`(() => { const el = document.querySelector(${JSON.stringify(selector)}); const top = el.getBoundingClientRect().top + scrollY; scrollTo(0, top - ${offset}); })()`);
    await sleep(Number(settle));
    const { data } = await cdp.send('Page.captureScreenshot', { format: 'png' });
    const out = `${prefix}-${n++}.png`;
    writeFileSync(out, Buffer.from(data, 'base64'));
    console.log('saved', out);
  }
} finally {
  await cdp.close();
}
