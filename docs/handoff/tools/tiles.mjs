// Usage: node tiles.mjs <outPrefix> <width> <viewportH> <scale> <url> [fromY] [toY]
// Captures the page as a column of viewport screenshots (what a reader sees while scrolling).
import { writeFileSync } from 'node:fs';
import { launch, setViewport, open, scrollThrough, sleep } from './cdp.mjs';

const [, , prefix, w = '1440', h = '900', scale = '1', url, fromY = '0', toY = ''] = process.argv;
const cdp = await launch();
try {
  await setViewport(cdp, Number(w), Number(h), Number(scale));
  await open(cdp, url, 1600);
  await scrollThrough(cdp);
  const height = await cdp.evaluate('document.documentElement.scrollHeight');
  const docWidth = await cdp.evaluate('document.documentElement.scrollWidth');
  const end = toY ? Math.min(Number(toY), height) : height;
  const step = Number(h) - 72;
  let n = 0;
  for (let y = Number(fromY); y < end; y += step) {
    await cdp.evaluate(`window.scrollTo(0, ${y})`);
    await sleep(450);
    const { data } = await cdp.send('Page.captureScreenshot', { format: 'png' });
    const out = `${prefix}-${String(n).padStart(2, '0')}.png`;
    writeFileSync(out, Buffer.from(data, 'base64'));
    n++;
    if (y + Number(h) >= height) break;
  }
  console.log(`${url} height=${height} docWidth=${docWidth} tiles=${n}`);
} finally {
  await cdp.close();
}
