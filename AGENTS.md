# AGENTS.md

This is the brief for any AI coding agent working in this repo, such as Codex or Claude Code. Read all of it before you do anything.

## 1. What this is

- **EPOCH Software Services** is an AI-first software and AI engineering company with offices in Charlotte, NC and Ahmedabad, India. This repo is its marketing website.
- You work for the founder. They will tell you what they want next.
- Two things live here:
  1. **The Next.js port:** the Night redesign in `app/` and `src/night/` is released from **`main`** with the founder’s approval. The port was built on **`feat/next-night`** from the mobile-compatible prototype at `b0c08b6`. Make further changes on feature branches. See `README.md` and `CLAUDE.md`.
  2. **The reference:** the accepted static HTML, CSS and JS prototype in `prototype/`, descended from **`feat/night`**. Keep it as the comparison baseline during the port.

## 2. Read these first, in this order

1. `docs/handoff/HANDOFF.md` has the current state, the founder's preferences, the branch and commit map, the exact logo geometry, the content still to confirm, and known issues.
2. `docs/handoff/HISTORY.md` tells how the site and logo got here, session by session: what was tried, kept and rejected, and why. Don't bring back rejected ideas.
3. `docs/handoff/tools/README.md` explains the QA tools and the full check.
4. `docs/handoff/screens/2026-10-03/` shows what every page looks like now.

Then run the prototype and look at the pages yourself before you suggest anything.

## 3. Run it

```bash
git switch feat/next-night
npm run dev                            # Next.js on http://localhost:3000
python3 prototype/serve.py              # http://localhost:3460, caching off
node --test 'prototype/tests/*.test.js' # unit tests for the pure helpers
```

- The prototype has no build step. Next uses `npm run build` and `npm start` for production checks. Development uses `.next-dev`; production uses `.next`.
- If port 3460 is busy, run `kill $(lsof -ti tcp:3460)`.

## 4. How the prototype is built

- **Pages:**
  - `index`, `services`, `service.html?id=`, `work`, `case.html?id=`, `industries`, `industry.html?id=`;
  - `how-we-work`, `insights`, `article.html?id=`, `about`, `contact`.
- **Lab pages, kept on purpose:** `marks.html` and `logos.html` (every logo concept), and `footer-lab.html` (the footer options).
- `assets/js/data.js` holds the content, generated from the Next app's `src/shared/constants`. HANDOFF section 4 has the command.
- `assets/js/kept-time.js` holds the pure time and geometry helpers, with unit tests. It loads as `window.KeptTime` in the browser and as a CommonJS module in tests. New pure logic goes here, test first.
- `assets/js/site.js` does the following:
  - injects the header, the footer and the SVG sprite (logo symbols `wm-clock` and `wm-plain`);
  - renders the data-driven blocks;
  - runs the living logo and the page details.
- `assets/js/insights.js` and `assets/js/industries.js` run those page families. `assets/js/marks-live.js` drives the living marks on `marks.html`.
- **CSS:** `assets/css/site.css` (design tokens and shared styles), `pages.css` and `insights.css`.
- Site pages load `data.js`, then `kept-time.js`, then `site.js`.

## 5. The design, called "Night"

- **Colours:** ivory on true black.
  - Canvas `#000`, surface `#0d0d0c`.
  - Ivory `#f2efe8`, muted `#8f8a80`, faint `#5c5850`.
  - Hairlines `rgba(242,239,232,0.12)` and `0.24`.
- **One orange, `#ff4f00`, and it always means "now":** the logo's point, the live time, the section being read. It is never decoration.
- **The logo is mark 08.** The O in the EPOCH wordmark is a live 24-hour clock. Its opening and orange point show the time of day, with midnight at the top. It winds up once per visit. Keep the geometry exactly as in HANDOFF section 4.
- **Details already built:**
  - light from the O's opening;
  - page transitions that grow from the O;
  - a reading clock;
  - lines that draw as you scroll;
  - film grain;
  - primary buttons that drift slightly toward the cursor;
  - a giant footer wordmark over a dusk glow that rises at the end of the page.
- Each page gets at most one signature moment, and only where the content earns it. One example is the first 30 days on How we work, told on the logo's O.

## 6. The founder's rules (not negotiable)

- **No em dashes anywhere:** not in copy, titles, docs or commit messages. They "feel like AI". Use commas, colons or full stops. Page titles use " | ".
- **Never invent** client metrics, quotes, testimonials, logos or facts. HANDOFF section 7 lists the real content still missing. Leave a gap rather than make something up.
- **The founder has authorized the Next.js port** on a separate feature branch. Preserve the accepted design, mobile behavior and animations. Further visual exploration remains parked.
- **Never delete a logo or footer concept** from the lab pages. The founder said "KEEP ADDING DO NOT REMOVE".
- **Show, don't describe.** Build it, screenshot it and show the result. When there's a choice, show 2 to 4 options with pictures.
- **Talk in short, plain language** with no jargon. The founder often says "explain that to me in short".
- **No template looks:**
  - ALL-CAPS labels above headings;
  - "→" on links;
  - 01/02/03 numbering on things that aren't steps;
  - fade-up animation on every section;
  - decorative gradients;
  - identical SaaS card grids.
- **Quality floor:**
  - works at 390px wide with no sideways scroll;
  - visible keyboard focus;
  - respects reduced motion;
  - no console errors.
- **Use headless Chrome for screenshots.** Never take over the founder's own browser.

## 7. Engineering rules

- Write the failing test first for any pure logic, in `prototype/tests/`. Then write the code.
- Keep code simple and readable:
  - small functions;
  - no dead or commented-out code;
  - handle errors explicitly, with no empty `catch`.
- Check what already exists before writing new logic. `kept-time.js` has many helpers.
- **Git:**
  - Never commit to `main`.
  - Work on `feat/night`, or on a new branch from it for a new design direction.
  - Make atomic commits with conventional messages that say what and why, for example `feat(prototype): ...` or `fix(prototype): ...`.
  - Push to `origin` after you commit. The founder wants nothing lost.
- Leave `main`, `draft/content-updates`, `app/` and `src/` alone unless asked.
- The pre-commit hook runs `next lint` and `tsc`. It also prints a few harmless husky warnings.
- When you ship something:
  - update `docs/handoff/HANDOFF.md` (current state);
  - add the decision to `docs/handoff/HISTORY.md`;
  - add new screenshots under `docs/handoff/screens/<date>/` when the look changes.

## 8. This repo is public

- github.com/EPOCH-SOFTWARE/epoch is public, so every branch can be read by anyone.
- Never commit any of these:
  - secrets;
  - private notes;
  - chat logs;
  - personal data;
  - real names or emails as test data. Use "Ada Lovelace" and ada@company.com instead.
- The founder keeps a private archive on their Mac at `~/Codebase/EPOCH/epoch-context-archive/`. It holds raw chat transcripts, the founder's messages word for word and old scratch files. Read it only when you need raw detail, and never copy it into the repo.

## 9. Before you show the founder anything

1. Run the full check in `docs/handoff/tools/README.md`:
   - the unit tests;
   - console errors on every page;
   - overflow at phone width;
   - the contact form;
   - a search for em dashes.
2. Look at the screenshots yourself and fix what you see.
3. The tools need Google Chrome and Node 22 or later. If your sandbox can't launch Chrome or reach localhost:3460, say so plainly. Don't skip the check silently.

## 10. Where things stand (2026-10-03)

- The Night design and logo 08 are on every page.
- The inner-page craft pass and mobile compatibility work are complete. The authorized Next.js port is on `feat/next-night`.
- The founder approved publishing the Next.js port through the existing Vercel production deployment.
- Two calls they may undo: the one-year dial on case pages, and the small O that ends each article.
- Still waiting on the founder for:
  - real case-study numbers and quotes;
  - the OneSix story (official logo now sourced);
  - a founder photo and bio;
  - the booking (Calendly) link.

When starting a new session without a task, reply with a summary of five lines or fewer and wait. If the founder has already asked for work, continue that authorized task.
