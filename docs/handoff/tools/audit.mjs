// Usage: node audit.mjs <width> <url> [url...]
// Typographic audit: widows in headings and short text, line lengths, horizontal overflow, console errors.
import { launch, setViewport, open, scrollThrough } from './cdp.mjs';

const [, , w = '1440', ...urls] = process.argv;
const PROBE = `(() => {
  const out = { docWidth: document.documentElement.scrollWidth, view: innerWidth, widows: [], measure: [], overflow: [] };
  const sel = 'h1,h2,h3,h4,p,li,dd,dt,summary,figcaption,blockquote,label,a.btn,button,.chip,span.num,th,td';
  const isHeading = el => /^H[1-4]$/.test(el.tagName) || el.matches('summary,dt,.display,.lede,blockquote p,figcaption,label,th');
  for (const el of document.querySelectorAll(sel)) {
    if (!el.offsetParent && getComputedStyle(el).position !== 'fixed') continue;
    if (el.closest('.site-footer,.site-header,.menu,.marquee,[aria-hidden="true"]')) continue;
    const direct = [...el.childNodes].some(n => n.nodeType === 3 && n.textContent.trim());
    if (!direct) continue;
    const words = [];
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) {
      const re = /\\S+/g; let m;
      while ((m = re.exec(node.textContent))) {
        const r = document.createRange(); r.setStart(node, m.index); r.setEnd(node, m.index + m[0].length);
        const rect = r.getClientRects()[0]; if (!rect) continue;
        words.push({ t: m[0], top: Math.round(rect.top + rect.height / 2) });
      }
    }
    if (!words.length) continue;
    const lines = [];
    for (const word of words) {
      const last = lines[lines.length - 1];
      if (last && Math.abs(last.top - word.top) < 6) last.words.push(word.t);
      else lines.push({ top: word.top, words: [word.t] });
    }
    const text = el.textContent.trim().replace(/\\s+/g, ' ');
    const label = el.tagName.toLowerCase() + (el.className && typeof el.className === 'string' ? '.' + el.className.trim().split(/\\s+/).join('.') : '') + ' "' + text.slice(0, 60) + '"';
    if (lines.length > 1 && lines[lines.length - 1].words.length === 1 && (isHeading(el) || text.length < 260)) out.widows.push(label + ' [' + lines.length + ' lines, last: ' + lines[lines.length - 1].words[0] + ']');
    const longest = Math.max(...lines.slice(0, Math.max(1, lines.length - 1)).map(l => l.words.join(' ').length));
    if (lines.length > 1 && longest > 80) out.measure.push(label + ' [' + longest + ' chars/line]');
    const box = el.getBoundingClientRect();
    if (box.right > innerWidth + 1 || box.left < -1) out.overflow.push(label + ' [' + Math.round(box.left) + '..' + Math.round(box.right) + ']');
  }
  return out;
})()`;

const cdp = await launch();
const problems = [];
cdp.on(msg => {
  if (msg.method === 'Runtime.exceptionThrown') problems.push('EXCEPTION ' + (msg.params.exceptionDetails.exception?.description || msg.params.exceptionDetails.text));
  if (msg.method === 'Runtime.consoleAPICalled' && ['error', 'warning'].includes(msg.params.type)) problems.push(msg.params.type + ' ' + msg.params.args.map(a => a.value ?? a.description).join(' '));
  if (msg.method === 'Log.entryAdded' && ['error', 'warning'].includes(msg.params.entry.level)) problems.push('log ' + msg.params.entry.text + ' ' + (msg.params.entry.url || ''));
});
try {
  await cdp.send('Runtime.enable');
  await cdp.send('Log.enable');
  await setViewport(cdp, Number(w), Number(w) < 700 ? 844 : 900, 1);
  for (const url of urls) {
    problems.length = 0;
    await open(cdp, url, 1200);
    await scrollThrough(cdp);
    const r = await cdp.evaluate(PROBE);
    console.log(`\n=== ${url} @${w}  docWidth=${r.docWidth}/${r.view}`);
    if (problems.length) console.log('  CONSOLE: ' + problems.join(' | '));
    r.widows.forEach(x => console.log('  widow   ' + x));
    r.measure.forEach(x => console.log('  measure ' + x));
    r.overflow.forEach(x => console.log('  overflow ' + x));
  }
} finally {
  await cdp.close();
}
