// Usage: node reduced.mjs <out.png> <url> <selector> [waitMs=300]
// Loads a page with prefers-reduced-motion: reduce and clips one element shortly after load.
import { writeFileSync } from 'node:fs';
import { launch, setViewport, open, sleep } from './cdp.mjs';

const [, , out, url, selector, waitMs = '300'] = process.argv;
const cdp = await launch();
try {
  await setViewport(cdp, 1440, 900, 1);
  await cdp.send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
  await open(cdp, url, Number(waitMs));
  await cdp.evaluate(`document.querySelector(${JSON.stringify(selector)}).scrollIntoView({block:'center'})`);
  await sleep(150);
  const box = await cdp.evaluate(`(() => { const r = document.querySelector(${JSON.stringify(selector)}).getBoundingClientRect(); return { x: r.left + scrollX, y: r.top + scrollY, width: r.width, height: r.height }; })()`);
  const { data } = await cdp.send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true, clip: { ...box, x: box.x - 16, y: box.y - 16, width: box.width + 32, height: box.height + 32, scale: 0.6 } });
  writeFileSync(out, Buffer.from(data, 'base64'));
  console.log('saved', out);
} finally {
  await cdp.close();
}
