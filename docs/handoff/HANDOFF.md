# EPOCH website: session handoff (2026-10-01 → 2026-10-02)

Read this first in a new session. It records everything decided, built, rejected and still open.

---

## 0. Quick start (what to do first)

1. `git switch feat/epoch-identity` (all current work is here).
2. Start the prototype server, which disables caching so edits show on refresh:
   `python3 prototype/serve.py` → http://localhost:3460
   - It sends `Cache-Control: no-store`. The plain `python3 -m http.server` doesn't, which once made the founder think changes were missing.
   - If port 3460 is busy: `kill $(lsof -ti tcp:3460)`.
3. The founder is reviewing **logo concepts** at http://localhost:3460/marks.html and http://localhost:3460/logos.html. The next step is getting their pick (section 6).
4. **Do NOT port the prototype to Next.js until the founder says so.** They explicitly said "dont port it into next js tho".

---

## 1. Who you're working with (founder preferences, important)

- Founder of **EPOCH Software Services**, an AI-first software and AI engineering company with offices in Charlotte, NC and Ahmedabad, India. Email operator@epoch.sh, phone +1 (704) 314-5262.
- Core belief, in the founder's words: *"NO ONE serves like I DO… NO ONE goes to the lengths like I DO… NO ONE commits to the projects and clients like I DO… Its either EPOCH or nothing!"* and *"i go all in, all the time."*
- Ambition: look like a frontier, top-tier AI company. Named references: **xAI (x.ai)** and **OneSix (onesix.ai)**, which is both a client and a peer they admire.
- Marquee clients: **HUB International, OneSix AI, Inspira Financial**. Others: Cardinal Health, Shift4, Rural King, Destify, BlueSky Commerce, Skeps, IDrive.
- **Communication style:**
  - Wants SHORT, plain-language answers. They often reply "explain that to me in short."
  - Ask choices as simple multiple choice (AskUserQuestion with previews worked well).
  - Show built pages instead of describing designs ("build it ill just review the page directly").
  - **No em dashes anywhere in copy** ("em dashes feels like AI"). Titles use " | ".
  - Impatient with slow process. Gets excited when things look great.
- **Do NOT drive the founder's own Chrome** (claude-in-chrome). They interrupted twice when it took over their screen. Use the headless scripts in `docs/handoff/tools/` (section 9).
- Global CLAUDE.md rules (`~/.claude/CLAUDE.md`):
  - TDD always for real code.
  - Concise answers.
  - Ask before big architectural decisions; when unsure, present two options.
  - Atomic commits; **never add Co-Authored-By lines**; never commit to main.
  - Update the README when shipping features.
  - Strict typing; no dead code, no placeholders, no silent catches.
  - Run /simplify before PRs.
  - Compact at 50% context.
- Their workflow, also in memory:
  - When the design direction changes, commit the current work and start a new branch.
  - Commit messages must be conventional, `type(scope): description`.

---

## 2. Branch and commit map

| Branch | What it is |
| --- | --- |
| `main` | Original site. Untouched by this session apart from branching off it. |
| `draft/content-updates` | Exists in the repo; **not created or touched by this session**. Ask the founder what it is before using it. |
| `feat/ai-first-upgrade` | **Round 1: the Next.js site rebuilt AI-first.** 11 commits, tests green. Superseded visually, but its architecture and content are the base for the eventual port. |
| `feat/epoch-identity` | **Round 2 (current): static HTML/CSS/JS prototype** in `prototype/`. Branched from `feat/ai-first-upgrade`, so it also contains all of round 1. |

Commits (newest first):
```
c6a3e70 feat(prototype): static identity prototype with three directions   ← feat/epoch-identity
a9309d7 docs: document the AI-first site, design system and Epoch Field
e40ffa3 fix(hooks): let pre-commit pass when no JS/TS files are staged
6847335 refactor: remove the unused wormhole hero, hooks and starter assets
b5292be feat(about,contact): beliefs-led about page and inline-validated form
89ec7b8 feat(work): reachable case studies and a work index
df52a02 feat(services): two-tier services index and detail pages
0b4280b feat(home): AI-first homepage with the Epoch Field hero
a38a7d1 feat(ui): design system, site chrome and shared components
a032a0d feat(content): honest case studies, OneSix AI, one contact source
0bc7caf feat(services): organize services AI-first, retire three
7d94918 chore(test): register jest-dom types and browser mocks
5481072 [content] - copyright year fix   ← last commit on main
```
The prototype work after `c6a3e70` and this handoff are committed at the end of the session (see `git log`).

---

## 3. Timeline of decisions (and what was rejected)

1. **Round 1 (Next.js, `feat/ai-first-upgrade`).**
   - Positioning set to AI-first.
   - Services split into two tiers: AI (AI/ML, Generative AI, Data & Analytics) and "Engineering that makes AI real" (Custom Software, Cloud, DevOps, Mobile, Cybersecurity, Digital Transformation).
   - Blockchain, IoT and AR/VR removed; their URLs 308-redirect to `/services`.
   - Look: extended Archivo, acid green `#9BC136` on near-black `#060F01`, plus a canvas "Epoch Field" neural-network hero.
   - **Founder verdict: "hero animation feels cringe… logo doesnt match… doesnt match the ambitions."** Don't revive the neural-network hero or the old look.
2. **Pivot to a static prototype.** The founder said "built everything in pure html css and serve me… then we will port the finalized version to next."
3. **Three directions were prototyped.** The snapshot is in commit `c6a3e70`, with a switcher on every page.
   - A "Midnight": black, Instrument Sans, a dial ticking seconds since the Unix epoch.
   - B "Draftsman": white, Host Grotesk + IBM Plex Mono, ink with orange `#ff4f00`, hairline rails, the mark drawn as a technical construction.
   - C "Ultramarine": electric blue `#1b32f0`, Mona Sans, orbit animation.
   - Three logos: 1 = dot-in-the-O wordmark, 2 = ring-and-dot symbol + wordmark, 3 = wordmark only.
4. The founder first picked A + logo 1, then **changed to B (Draftsman) + logo 2**. The prototype is now locked to B + logo 2: the switcher, A, C and the logo 1/3 variants were removed. The full three-way version is recoverable from `c6a3e70`.
5. **Requests after the lock-in, all done:**
   - Scrolling "Trusted by" logo marquee on home.
   - Bolder wordmark (stroke 4.4 → 6.6).
   - A big faint footer wordmark.
     - Tried as logo 1 with an orange dot, then a light-orange dot. **Founder reverted to the plain wordmark**, so the footer shows the plain wordmark now.
6. **"How can we make it more professional / REALLY GREAT":** the founder picked all four content ideas, and a UI upgrade pass was added on top (section 5).
   - How we work page.
   - Industries pages.
   - Book a call.
   - Insights articles.
7. **Logo exploration (in progress).**
   - `logos.html`: 5 concepts within the site style. Founder: "it doesnt have to match the website… think out of the box… create something that passes time itself."
   - `marks.html` v1 had Now, Long exposure, Harmonograph and Growth rings. Founder: "**only the first one is good** all others are same shit just different thing in front." Lesson: an illustration placed beside the name is not a logo idea.
   - Researched dynamic identities (Nordkyn, MIT Media Lab, Casa da Música, Whitney, the WPP variable-font logo). Rule learned: **keep one thing fixed and let one real signal change the logo itself.**
   - v2 had 01 Now, 02 Daylight, 03 Weight of the day and 04 Timestamp. Founder: "not that much interesting, **try something else keep these 4 tho**."
   - Added 05 Sundial, 06 Tonight's moon and 07 Twenty-four hours. **No feedback yet.**
8. **Logo round 3 (2026-10-02), same page.**
   - Founder: "I only liked 01 Now so far. Show me more ideas in that spirit, where the logo itself keeps time, not a picture next to the name… really out-of-the-box and professional."
   - After five proposals in chat: "i like some of em, now you are cooking… still not that much interesting, try something else, keep all of the current work intact, EPOCH or nothing!!!"
   - Added 08–15 in a new "EPOCH or nothing." section below 07; 01–07 are untouched apart from a "New: 08–15" jump link.
9. **Logo round 4 (2026-10-02).**
   - Founder on 08–15: "i only liked 08 and 11, everything else is just ugly same shit!!!!! KEEP ADDING DO NOT REMOVE", and asked for research into designers who make logos that stand out.
   - Two research briefs found that no brand mark shows the real live time (open ground), and that the great marks put one idea into how the mark is built rather than adding effects.
   - Added 16–22 in an "All in." section below 15. **No feedback yet.**
10. **"put Tonight's moon in the website" (2026-10-02).** The prototype site's logo is now concept 06: the plain wordmark with tonight's real moon phase lit in orange inside the O (header and footer lockups, plus a live favicon). The giant faint footer wordmark stays plain, as the founder chose earlier. The homepage hero drawing still shows the old ring-and-dot mark.
11. **"put 08 on the website let me see how it goes" (2026-10-02).** The site logo switched from the moon (06) to 08: the wordmark's O is a clock whose opening and orange point turn once a day with the visitor's local time (midnight at the top), updated every minute, with a matching live favicon and a hover title giving the time. The moon version is commit 2567b4f.

---

## 4. The prototype (`prototype/`)

Plain HTML + CSS + vanilla JS with no build step. Served by `prototype/serve.py` on port 3460.

### Pages
| File | Notes |
| --- | --- |
| `index.html` | Home. Hero: copy on the left; on the right, the mark drawn as a technical construction. The ring draws in, the orange dot pops, then the notes fade in. Notes include `t₀ 1970-01-01 00:00 UTC` and a live `t = <unix seconds> s`. On desktop the cursor becomes a measuring crosshair showing SVG coordinates. Then: "Trusted by" marquee, Why EPOCH (epoch in computing and in ML), commitments, AI services rows plus engineering chips, case cards with system sketches, closing CTA. |
| `services.html`, `service.html?id=` | Two tiers. The detail page is rendered from `data.js`. |
| `work.html`, `case.html?id=` | Case cards plus a logo grid. Case detail is rendered from `data.js`. |
| `industries.html`, `industry.html?id=` | insurance, financial-services, healthcare, retail. Data in `assets/js/industries.js`. |
| `how-we-work.html` | Engagement models, first 30 days, how pricing works, FAQs. **Contains claims to confirm** (section 7). |
| `insights.html`, `article.html?id=` | 3 articles in `assets/js/insights.js`: `why-ai-pilots-stall`, `evaluating-llm-systems`, `first-30-days`. Byline "EPOCH"; dates picked by Claude. |
| `about.html`, `contact.html` | Contact has `#book`, a "Book a 30-minute call" section with "What happens next", plus a form with inline validation. On a prototype submit it shows a note and sends nothing. |
| `logos.html` | Logo directions A–E: zero point, overrun, extra mile, in focus, new era. |
| `marks.html` + `marks.md` | "Kept time" gallery of living logo concepts on a dark gallery page: 01–07, then 08–15 under "EPOCH or nothing.", then 16–22 under "All in.". `marks.md` is the written concept. |

### Code
- **`assets/js/data.js`** is generated from the TypeScript content in `src/shared/constants` (services, serviceDetails, caseStudies, clients, commitments, contact, techStack). To regenerate:
  ```bash
  OUT=$(mktemp -d) && npx tsc --outDir $OUT --module commonjs --target es2020 --skipLibCheck --rootDir src/shared \
    src/shared/constants/{services,serviceData,clientData,content,contact}.ts && node -e "
  const b='$OUT/constants/';const s=require(b+'services.js'),d=require(b+'serviceData.js'),c=require(b+'clientData.js'),ct=require(b+'content.js'),k=require(b+'contact.js');
  const tech=require('./src/data/techStackData.json').techStack.map(t=>({category:t.category,technologies:t.technologies.map(x=>x.name)}));
  require('fs').writeFileSync('prototype/assets/js/data.js','window.EPOCH_DATA = '+JSON.stringify({tiers:s.SERVICE_TIERS,services:s.SERVICES,serviceDetails:d.SERVICE_DETAIL_DATA,caseStudies:c.CASE_STUDIES,clients:ct.CLIENT_LOGOS,commitments:ct.COMMITMENTS,contact:k.CONTACT,techStack:tech},null,1)+';\n');"
  ```
  After regenerating, change `"/logos/ruralking.webp"` to `"/logos/ruralking.png"` in data.js; the prototype uses a cropped PNG.
- **`assets/js/site.js`** is an IIFE that:
  - injects the SVG sprite (symbols `wm-plain` and `mark`), the header (nav: Work, Services, Industries, How we work, Insights, About + "Start a project") and the footer (giant faint wordmark);
  - renders blocks into `[data-clients]`, `[data-service-rows=tier]`, `[data-service-chips=tier]`, `[data-case-cards]` (`with-cta` adds the dark "Your project" card), `[data-commitments]`, `[data-offices]`, `[data-tech]`, `[data-closing]`, and the service and case pages;
  - adds the live clock (`[data-unix-label]`), the measuring crosshair (`.v-draft`, fine pointers only) and booking.
  - `SYSTEM_SKETCH` holds the case-card system diagrams, built from each case study's deliverables.
  - **`BOOKING_URL = ''`**. Set it to the founder's Calendly or Cal.com link; until then "Choose a time" opens an email.
- **`assets/css/site.css`** holds the Draftsman tokens on `:root`:
  - `--bg #fff`, `--text #0c0d0f`, `--muted #5d636b`, `--line #e2e5e8`, `--accent #ff4f00`, `--grid #eef0f2`;
  - fonts: Host Grotesk + IBM Plex Mono;
  - rails on `.wrap`, square buttons;
  - view transitions (`@view-transition`), CAD-style corner brackets on `.card:hover`, `.sketch`, `.marquee`, `.foot-mark`;
  - nav collapses to a menu below 1060px.
  - `pages.css` (prefix `pg-`) and `insights.css` (prefix `ins-`) are page-specific.
- **`assets/js/kept-time.js`** holds the pure time and geometry math for marks 08–15: rings with openings, watch angles, seven-segment letters, the engraving text and the eclipse geometry. It is unit-tested with Node's built-in runner: `node --test 'prototype/tests/*.test.js'` (22 tests). Jest only looks in `src/`, so these never mix with the app's tests.
- **`assets/js/marks-live.js`** draws marks 08 onwards as SVG (stage, strip of states, lockup with the wordmark) from one animation loop. Its lockups use `data-lockup-mark`, because 01's inline script already owns `data-lockup`.
- **Assets:** `assets/logos/` holds client logos.
  - `HUB-international.png` was **made transparent and cropped**; the original has a solid white box.
  - Cardinal, iDrive and Rural King are cropped PNGs.
  - On the white theme, client logos render as solid black silhouettes (`filter: brightness(0)`).
  - `assets/favicon.svg`: ring and orange dot on ink.

### Logo geometry (keep exact)
Bold monoline wordmark, viewBox `-0.5 -1 208 42`, stroke `6.6`, no fill:
```
E  M26 3.3H3.3V36.7H26M3.3 20H23
P  translate(39 0)    M3.3 40V3.3H14A9.2 9.2 0 0 1 14 21.7H3.3
O  circle cx=98.5 cy=20 r=17.1
C  translate(131.3 0) M32.71 8.56A17.1 17.1 0 1 0 32.71 31.44
H  translate(176.5 0) M3.3 0V40M26.7 0V40M3.3 20H26.7
```
Symbol mark (logo 2), viewBox `0 0 48 48`: ring `M31.45 8.72A17 17 0 1 1 16.55 8.72` stroke 5.2, plus a dot `circle 24,7 r3.6` in orange `#ff4f00`.
Logo 1 (dot-in-O) at bold weight: O = `translate(78.5 0) M28.03 4.9A17.1 17.1 0 1 1 11.97 4.9` + dot `circle 98.5,2.9 r4.2`.
The site logo (header and footer) is now **mark 08, In the name**: the `wm-clock` symbol in `site.js` is the wordmark without its O, plus an O open at the top (`KeptTime.arcPath(98.5, 20, 17.1, 28, 304)`, logo 1's geometry) holding the orange point (`circle 98.5,2.9 r4.2`, `--logo-dot`). `setLogoClock()` rotates that O to the local time of day every minute and redraws the favicon to match. Every page loads `kept-time.js` before `site.js`; `site.js` throws if it is missing. Earlier site logos are in git history: logo 2 (symbol + wordmark) up to 8e0d908, Tonight's moon in 2567b4f. marks.html's 06 now uses the shared, tested moon maths in kept-time.js.

---

## 5. UI upgrade pass (done, in the prototype)
- Page-to-page cross-fade via CSS view transitions; the header doesn't move.
- Orange CAD-selection corner brackets on card hover and focus.
- A "system sketch" (vertical pipeline, AI step in orange) on each case card.
- Live `t = <unix seconds> s` in the hero drawing, plus a measuring crosshair with coordinates.
- Logo marquee that pauses on hover; reduced motion makes it a static, scrollable row.
- Big faint footer wordmark.
- The closing CTA on every page offers "Book a 30-minute call" (links to `contact.html#book`).

---

## 6. Open: the logo decision (next conversation starts here)
- `marks.html` shows 01 Now (liked), 02 Daylight, 03 Weight of the day, 04 Timestamp, 05 Sundial, 06 Tonight's moon, 07 Twenty-four hours.
- 02–04: "not that much interesting." 05–07: no feedback yet.
- Round 3, no feedback yet:
  - 08 In the name: the wordmark's O is 01's clock.
  - 09 Display: EPOCH on seven-segment clock digits; every minute it flips to the time, and the orange point becomes the colon.
  - 10 Overrun: a spiral one full turn plus 40°, tip on the time of day.
  - 11 Hour and minute: hour opening plus a narrow minute cut, read like a watch.
  - 12 Engraved: the ring carries "EPOCH OR NOTHING", the UTC date and time, and the Unix second, in microtext.
  - 13 Full circle: the opening is what is left of today; the logo at noon, closed at midnight.
  - 14 Totality: an eclipse "diamond ring" whose bright side turns with the day.
  - 15 On the minute: the point laps the ring every minute and rests in the opening, like the Swiss railway clock.
- Founder verdict on 08–15: **liked 08 and 11 only**; the rest "ugly same shit".
- Round 4, no feedback yet (each names the design it borrows from):
  - 16 In the name, to the minute: 08 + 11, the wordmark's O shows the hour opening with the point and a minute cut.
  - 17 Parallel lines: the wordmark in Mexico 68 lines (Lance Wyman); two slots through the O are the hands.
  - 18 Slashed zero: the O is a programmer's Ø whose slash is the hour hand (after Stankowski's Deutsche Bank slash).
  - 19 One orange letter: only the O is orange, with hour opening and minute cut (after Mobil, Chermayeff & Geismar).
  - 20 Stencil: stencil letters; the O's two bridges are the hands (hidden in plain sight, after the FedEx arrow).
  - 21 Flip: twelve hour tiles; on the hour the next tile turns edge-on to open (after Louis Vuitton's Spin Time).
  - 22 Wandering point: the opening jumps hourly and the point drifts across it with the minutes (after Urwerk).
- Research seeds not built yet: the logo shows your last visit and winds to now on arrival (Long Now clock); hover suspends it to the standard pose (Hermès Temps Suspendu); minute as a notch from the inside so the outline stays pure; the hour hand running out of the logo as a hairline across the hero (Wyman); every exported logo frozen at the minute it was made (Nordkyn).
- The founder wants something "out of the box… passes time itself… really professional… stands out", reflecting the beliefs (all in, goes further, never stops paying attention) and the ambition (frontier AI).
- **Rules learned:**
  1. Integrate the idea into the logo itself; no pictures beside the name.
  2. One fixed element plus one real signal (time).
  3. Restraint: ivory on black with one orange point reads as premium.
  4. Show, don't describe.
- Concepts with no feedback yet that could pair with Now:
  - business cards printed with the moment they were printed;
  - an app icon that tells the time;
  - motion versions for video and social.

---

## 7. Content the founder must confirm (do not ship unconfirmed)
1. "Most projects start at $25,000." This was derived from the contact form's lowest budget option.
2. The pricing structure: pilots at a fixed price after discovery; production builds fixed-scope or time and materials; dedicated teams monthly; support on a monthly plan.
3. Timelines: a prototype in 3–4 weeks and 8–16 weeks to production. These come from the AI/ML FAQ.
4. The "first 30 days" plan: wk1 discovery → wk2 written plan → wks 3–4 prototype → day 30 go/adjust/stop. Also "one accountable lead".
5. Industry mapping: Shift4 and Skeps under financial services, Cardinal Health under healthcare, Rural King and BlueSky under retail. Destify, IDrive and OneSix are unmapped.
6. The three Insights articles (drafts by Claude), plus their dates and the byline.
7. **Missing real proof:**
   - real metrics for HUB and Inspira (case studies currently say "significantly faster" etc.);
   - real testimonials (hidden until provided);
   - a OneSix AI logo file and what EPOCH built for them;
   - founder photo, bio and team;
   - certifications or partnerships, only if true;
   - the Calendly link.
8. Office hours say "9 AM–6 PM PST", but the US office is in Charlotte (Eastern).

---

## 8. Known issues and notes
- **Lost WIP:** when work started, `main` had 18 files of uncommitted founder edits. Several were overwritten before they were backed up and are unrecoverable: layout, Footer, home/index.tsx, services/index.tsx, clients/index.tsx, content.ts, types. The rest were saved in `docs/handoff/user-wip-backup/`, which has the original files (renamed `*.bak` so tooling ignores them) plus `user-wip.patch` (the diff against `5481072`). The founder was told.
- **Security (not fixed; outside scope):** `app/api/contact/route.ts` puts user input into the HTML email without escaping, which allows HTML injection into the founder's inbox.
- `.husky/commit-msg` has escaped `\!` characters, so its format check never runs (it prints "!: command not found"). `.husky/pre-commit` was fixed in `e40ffa3` (grep with `set -e`).
- `next.config.ts` references `@svgr/webpack`, which isn't installed (pre-existing; harmless unless SVGs are imported).
- Tailwind is installed but not used.
- `temp.txt` (the old homepage source), `.specstory/` and `.history/` are founder clutter. Leave them alone.
- Running `next build` while `next dev` is up overwrites `.next` and breaks the dev server. Stop dev first.
- Background servers launched with the harness die after 2 hours. `serve.py` was started with `nohup` and persists until killed.
- The round-1 Next app has 97 Jest tests (16 suites), plus tsc, ESLint and build all green on `feat/ai-first-upgrade`.

---

## 9. Tools (copied from the session scratchpad into `docs/handoff/tools/`)
Headless Chrome via CDP. They never touch the founder's browser. They need macOS Google Chrome and Node 24.
- `node docs/handoff/tools/shot.mjs <url> <out.png> [w=1440] [h=900] [waitMs] [scrollY|cssSelector] [scale]` takes one viewport screenshot.
- `node docs/handoff/tools/mobile-check.mjs <url> <outPrefix> 390 [selector…]` prints `documentWidth` (must equal the viewport) plus any overflowing elements, and saves screenshots.
- `node docs/handoff/tools/formcheck.mjs` loads the prototype pages, prints each h1, reports JS exceptions and console errors/warnings, and exercises the contact form. Edit the `for (const path of [...])` list to check other pages.
- These scripts create `chrome-profile-*` folders next to themselves. `shot.mjs` deletes its own; delete the others manually and don't commit them.
- `reference-screenshots/` contains the Anduril, Palantir, Linear, Mistral and OneSix captures used for inspiration.

---

## 10. When the founder says "port it"
1. Make a new branch from `feat/epoch-identity`.
2. Rebuild the Draftsman design system in the Next app:
   - tokens go in `app/globals.css`;
   - fonts via `next/font` (Host_Grotesk, IBM_Plex_Mono);
   - the logo becomes inline SVG components using the geometry in section 4;
   - add the new routes: industries, how-we-work, insights, article.
3. Move the prototype-only content (industries, articles, system sketches, engagement models) into `src/shared/constants` with types. Keep it grounded: no invented metrics.
4. Strict TDD (founder rule). Update the existing 97 tests where copy changed and write new ones first.
5. Update README and CLAUDE.md, then run lint, tsc, jest and build, and capture headless screenshots.

## 11. Memory files (auto-loaded in new sessions)
`~/.claude/projects/-Users-yashdesai-Codebase-EPOCH-epoch/memory/`:
- `epoch-repositioning-goal.md`
- `review-by-result.md`
- `workflow-branches-and-browser.md`
- `handoff-location.md` (points here)
