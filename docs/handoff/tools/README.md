# QA tools for the prototype

Small Node scripts that check the prototype in headless Chrome. They never open or drive anyone's own browser. That is a founder rule.

## Before you start

- Start the prototype server from the repo root: `python3 prototype/serve.py`. It serves http://localhost:3460 with caching off.
- You need Node 22 or later (for the built-in `fetch` and `WebSocket`) and Google Chrome at `/Applications/Google Chrome.app`.
- Quote URLs that contain `?` in zsh, for example `"http://localhost:3460/case.html?id=hub-international"`.
- `shot.mjs`, `mobile-check.mjs` and `formcheck.mjs` make `chrome-profile-*` folders here while they run. They are git-ignored. Delete any that are left behind.
- Optional live AI setup is in [AI-REVIEW.md](AI-REVIEW.md). A key is not needed for automated checks.
- The unit tests for the pure helpers are separate: `node --test 'prototype/tests/*.test.js'`.

## The tools

| Tool | What it does | Usage |
| --- | --- | --- |
| `shot.mjs` | Screenshot of one viewport. Set `REDUCED=1` to emulate reduced motion. | `node shot.mjs <url> <out.png> [width=1440] [height=900] [waitMs=3000] [scrollY or selector] [scale=1] [beforeJs]` |
| `mobile-check.mjs` | Lists elements wider than a phone screen and saves screenshots. | `node mobile-check.mjs <url> <outPrefix> [width=390] [selector...]` |
| `errors.mjs` | Prints console errors, warnings and uncaught exceptions. If you pass an expression, it also prints that value. | `node errors.mjs <url> [waitMs=3000] [expression]` |
| `formcheck.mjs` | Loads the main pages, reports errors, and checks the contact form with empty, bad and valid input. | `node formcheck.mjs` (always checks http://127.0.0.1:3460/) |
| `demo-check.mjs` | Checks sample switching, keyboard access, source selection, document edits, conflicting values, reset, safe rendering, AI loading, success, errors, stale responses and reduced motion at desktop and phone widths. Provider replies are controlled fixtures; this does not verify a live model. | `node docs/handoff/tools/demo-check.mjs` from the repo root |
| `journey-check.mjs` | Checks goal selection, enquiry context, retained drafts, project tabs, section links, mobile menu focus and reduced motion at 1440px, 390px and 320px. | `node docs/handoff/tools/journey-check.mjs` from the repo root |
| `visual-check.mjs` | Checks artwork loading and alt text, all three goal illustrations, keyboard switching, case-scope captions, page width and reduced motion at 1440px, 390px and 320px. | `node docs/handoff/tools/visual-check.mjs` from the repo root |
| `form.mjs` | Types into the contact form like a person and screenshots the error state and the confirmation. | `node form.mjs <outPrefix> [width] [height] [scale]` |
| `audit.mjs` | Type audit: single words stranded on a last line, line lengths, overflow and console errors. | `node audit.mjs <width> <url> [url...]` |
| `tiles.mjs` | Saves the page as a column of screenshots, as a reader sees it while scrolling. | `node tiles.mjs <outPrefix> <width> <viewportH> <scale> <url> [fromY] [toY]` |
| `seq.mjs` | Screenshots an element at several scroll offsets, for scroll-driven moments. | `node seq.mjs <outPrefix> <width> <height> <scale> <url> <selector> <offset,offset,...> [settleMs]` |
| `clip.mjs` | Screenshot of one element plus padding. | `node clip.mjs <out.png> <width> <height> <url> <selector> [pad=24] [waitMs=3500] [scale=1] [setupJs]` |
| `hover.mjs` | Moves a real mouse over an element and screenshots the hover state. | `node hover.mjs <out.png> <url> <hoverSelector> <clipSelector> [pad=24]` |
| `tabfocus.mjs` | Presses Tab like a keyboard user and screenshots the focus state. | `node tabfocus.mjs <out.png> <url> <selectorBefore> <clipSelector> [tabs=1] [pad=24]` |
| `reduced.mjs` | Loads a page with reduced motion on and screenshots one element. | `node reduced.mjs <out.png> <url> <selector> [waitMs=300]` |
| `cdp.mjs` | The shared headless Chrome helper used by the tools from `audit.mjs` down. It is not run directly. | |

## A full check before showing the founder

From the repo root:

1. `node --test 'prototype/tests/*.test.js'` and `python3 -m unittest discover -s prototype/tests -p 'test_*.py'`
2. Run `node docs/handoff/tools/errors.mjs <url> 2500` for every page, including `case.html?id=nope` for the not-found state.
3. Run `node docs/handoff/tools/mobile-check.mjs <url> <prefix> 390` for every page. The only allowed offender is the logo marquee on the home page, which is clipped on purpose.
4. Run `node docs/handoff/tools/formcheck.mjs`.
   Run `node docs/handoff/tools/journey-check.mjs` for discovery, contact or shared navigation changes.
   Run `node docs/handoff/tools/visual-check.mjs` for illustration or project-presentation changes.
   For changes to the document demo, also run `node docs/handoff/tools/demo-check.mjs`.
5. Search the prototype for em dashes. There must be none.
6. Look at the screenshots yourself before you show anything.
