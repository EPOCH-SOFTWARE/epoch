// Usage: node clip.mjs <out.png> <width> <height> <url> <selector> [pad=24] [waitMs=3500] [scale=1] [setup-js]
// Screenshot of one element (plus padding) at full resolution.
import { writeFileSync } from 'node:fs';
import { launch, setViewport, open, sleep } from './cdp.mjs';

const [, , out, w, h, url, selector, pad = '24', waitMs = '3500', scale = '1', setup = ''] = process.argv;
const cdp = await launch();
try {
  await setViewport(cdp, Number(w), Number(h), Number(scale));
  await open(cdp, url, 600);
  await cdp.evaluate(`document.querySelector(${JSON.stringify(selector)}).scrollIntoView({block:'center'})`);
  if (setup) await cdp.evaluate(setup);
  await sleep(Number(waitMs));
  const box = await cdp.evaluate(`(() => { const r = document.querySelector(${JSON.stringify(selector)}).getBoundingClientRect(); return { x: r.left + scrollX, y: r.top + scrollY, width: r.width, height: r.height }; })()`);
  const p = Number(pad);
  const clip = { x: Math.max(0, box.x - p), y: Math.max(0, box.y - p), width: box.width + 2 * p, height: box.height + 2 * p, scale: 1 };
  const { data } = await cdp.send('Page.captureScreenshot', { format: 'png', clip, captureBeyondViewport: true });
  writeFileSync(out, Buffer.from(data, 'base64'));
  console.log('saved', out, JSON.stringify(clip));
} finally {
  await cdp.close();
}
