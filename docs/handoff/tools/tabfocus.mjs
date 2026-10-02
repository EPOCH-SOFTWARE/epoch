// Usage: node tabfocus.mjs <out.png> <url> <selectorBefore> <clipSelector> [tabs=1] [pad=24]
// Focuses an element, presses Tab (so :focus-visible applies as for a keyboard user), and clips a region.
import { writeFileSync } from 'node:fs';
import { launch, setViewport, open, sleep } from './cdp.mjs';

const [, , out, url, before, clipSel, tabs = '1', pad = '24'] = process.argv;
const cdp = await launch();
try {
  await setViewport(cdp, 1440, 900, 1);
  await open(cdp, url, 1200);
  await cdp.evaluate(`document.querySelector(${JSON.stringify(clipSel)}).scrollIntoView({block:'center'}); document.querySelector(${JSON.stringify(before)}).focus({preventScroll:true})`);
  for (let i = 0; i < Number(tabs); i++) {
    await cdp.send('Input.dispatchKeyEvent', { type: 'rawKeyDown', key: 'Tab', code: 'Tab', windowsVirtualKeyCode: 9 });
    await cdp.send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Tab', code: 'Tab', windowsVirtualKeyCode: 9 });
  }
  await sleep(900);
  console.log('focused:', await cdp.evaluate(`document.activeElement.outerHTML.slice(0, 90) + ' visible=' + document.activeElement.matches(':focus-visible')`));
  const box = await cdp.evaluate(`(() => { const r = document.querySelector(${JSON.stringify(clipSel)}).getBoundingClientRect(); return { x: r.left + scrollX, y: r.top + scrollY, width: r.width, height: r.height }; })()`);
  const p = Number(pad);
  const { data } = await cdp.send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true, clip: { x: Math.max(0, box.x - p), y: box.y - p, width: box.width + 2 * p, height: box.height + 2 * p, scale: 1 } });
  writeFileSync(out, Buffer.from(data, 'base64'));
  console.log('saved', out);
} finally {
  await cdp.close();
}
