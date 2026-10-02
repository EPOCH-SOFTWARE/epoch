// Usage: node hover.mjs <out.png> <url> <hoverSelector> <clipSelector> [pad=24]
// Moves a real mouse over an element (fine pointer) and clips a region after the hover transition.
import { writeFileSync } from 'node:fs';
import { launch, setViewport, open, sleep } from './cdp.mjs';

const [, , out, url, hoverSel, clipSel, pad = '24'] = process.argv;
const cdp = await launch();
try {
  await setViewport(cdp, 1440, 900, 1);
  await open(cdp, url, 1200);
  await cdp.evaluate(`document.querySelector(${JSON.stringify(clipSel)}).scrollIntoView({block:'center'})`);
  await sleep(500);
  const r = await cdp.evaluate(`(() => { const b = document.querySelector(${JSON.stringify(hoverSel)}).getBoundingClientRect(); return { x: b.left + b.width * 0.6, y: b.top + b.height / 2 }; })()`);
  await cdp.send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: r.x, y: r.y });
  await sleep(900);
  const box = await cdp.evaluate(`(() => { const b = document.querySelector(${JSON.stringify(clipSel)}).getBoundingClientRect(); return { x: b.left + scrollX, y: b.top + scrollY, width: b.width, height: b.height }; })()`);
  const p = Number(pad);
  const { data } = await cdp.send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true, clip: { x: Math.max(0, box.x - p), y: box.y - p, width: box.width + 2 * p, height: box.height + 2 * p, scale: 0.75 } });
  writeFileSync(out, Buffer.from(data, 'base64'));
  console.log('saved', out);
} finally {
  await cdp.close();
}
