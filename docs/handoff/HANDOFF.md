# EPOCH website: session handoff (2026-10-01 to 2026-10-03)

Read this first in a new session. It records everything decided, built, rejected and still open.
For the full story of how we got here, read `HISTORY.md` next to this file. Section 12 says where every file lives.

---

## 0. Quick start (what to do first)

1. `git switch feat/night` for the current site redesign. The fresh logo exploration is on `feat/logo-studies`, branched from `feat/night`; stay on that branch when reviewing `identity-lab.html`.
2. Start the prototype server, which disables caching so edits show on refresh:
   `python3 prototype/serve.py` → http://localhost:3460
   - It sends `Cache-Control: no-store`. The plain `python3 -m http.server` doesn't, which once made the founder think changes were missing.
   - If port 3460 is busy: `kill $(lsof -ti tcp:3460)`.
3. Current state (2026-10-03): the prototype is the **Night** design (ivory on black, with one orange point that always means "now"). Mark **08** is the site logo: the O of the wordmark is a live 24-hour clock. The inner-page craft pass (section 3, item 14) is done and pushed, and the founder is reviewing it. Screenshots of every page are in `screens/2026-10-03/`. The giant footer wordmark now uses option 8's softer ivory at 12% opacity; the existing dusk glow and scroll rise remain.
4. **Do NOT port the prototype to Next.js until the founder says so.** They explicitly said "dont port it into next js tho".
5. The GitHub repo `EPOCH-SOFTWARE/epoch` is **public**. Never commit private material such as chat transcripts, the founder's messages word for word, or credentials. Those stay in the local archive (section 12).
6. Before showing the founder anything, run the full check in `docs/handoff/tools/README.md`, then look at the screenshots yourself.
7. Latest work (2026-10-03): the home page brings selected work directly after the client strip. Home and Work now give HUB a full-width showcase and Inspira its own editorial row, using existing case-study text only. `document-demo.html` demonstrates editable source review, missing fields and conflicting values with fictional briefs. It now includes a separate AI review through the local Python server, alongside the labelled-field preview. The integration is tested with controlled responses but still needs a local API key and a real model run. Approved project screenshots and confirmed outcomes remain outstanding.

8. Latest UI/UX pass (2026-10-03): Home links directly into three project goals. Services has a keyboard-accessible goal explorer with capabilities, related projects and a contextual enquiry link. Work gives both case studies full features with challenge/build/integration tabs drawn from existing content. About has a new editorial composition and office section, with the founder’s preferred headline: "We don’t do half-in." Contact puts the required fields first, optional details in a disclosure, and call/email details alongside. It previews a draft without sending and preserves the draft when editing. The phone header keeps Start a project visible; the menu contains focus and supports Escape. Long service and case pages have section links. Site pages now request only the two Night font families; the labs retain their original fonts.
9. AI demo work is parked until the ML engineer provides details. The current integration remains available as built; no model work was included in the UI/UX pass.
10. Fresh identity exploration (2026-10-03): `identity-lab.html` on `feat/logo-studies` adds four independent directions: Cut, Phase, Threshold and Common. The brief explicitly permits moving beyond the clock and earlier logo work. Each direction has a monochrome comparison, wordmark, website composition, inverse specimen, 16/24/32px symbol and SVG downloads. All shapes and letters are vector paths, with no font dependency in exported logos. The site still uses mark 08; no new direction has been selected. Earlier labs link to the new page and retain every concept. Research sources are linked in the lab and HISTORY.
11. About scroll fix (2026-10-03, on `feat/logo-studies`): "What we believe" now scrolls normally above its full-width rows. The shared desktop sticky-heading rule previously made it cross the belief titles when scrolling. Only this heading is overridden; the side-by-side sections retain their sticky headings.

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
| `feat/epoch-identity` | **Round 2: static HTML/CSS/JS prototype** in `prototype/`, light Draftsman look. Branched from `feat/ai-first-upgrade`, so it also contains all of round 1. Tagged `light-site-2026-10-02`. |
| `feat/night` | **Current: the Night redesign** of the prototype, branched from `feat/epoch-identity`. |
| `feat/logo-studies` | Fresh logo studies, branched from `feat/night` at `97e2bdb`. Adds `identity-lab.html`; does not replace the site logo. |

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
Then on `feat/epoch-identity` (newest first; `2d077c9` is tagged `light-site-2026-10-02`, the light site before Night):
```
2d077c9 fix(prototype): drop office hours from the contact page
0d98d48 feat(prototype): make the clock logo obvious, live office times, shorter menu
fa5cb0c feat(prototype): mark 08 as the site logo, so the name keeps time
2567b4f feat(prototype): Tonight's moon as the site logo
8e0d908 feat(prototype): marks 16 to 22, built on the two the founder liked
61fdbf7 fix(copy): drop em dashes from page titles and service copy
0fd3f3a feat(prototype): eight more time-keeping marks, 08 to 15
e82ad64 docs(handoff): full session handoff, QA tools and backup of lost edits
22311ff feat(prototype): logo explorations, including living time-keeping marks
decb1a2 feat(prototype): lock in Draftsman with logo 2; add new pages and UI pass
```
Then on `feat/night` (newest first):
```
63c4acb docs(handoff): record the inner-page craft pass
d5c871f feat(prototype): craft pass on the inner pages
8791bd5 fix(prototype): sentence case for service detail headings
d01bfdd feat(prototype): tested helpers for reading steps, ring stops and timeline months
756e6a0 feat(prototype): footer dusk rises like a sunrise as you scroll down
481e118 feat(prototype): dusk glow behind the footer wordmark (footer-lab option 6)
ff861ad feat(prototype): sunset-lit giant wordmark in the footer
49a2dd0 feat(prototype): footer-lab round 2, readable variations on the horizon glow
d1dda73 feat(prototype): footer-lab page comparing four treatments of the giant wordmark
66dc5a9 fix(prototype): remove the "EPOCH or nothing." section from the home page
4dafbf5 fix(prototype): footer shows only the copyright
340ee64 feat(prototype): Night, the dark redesign with light from the O
```
`feat/ai-first-upgrade`, `feat/epoch-identity`, `feat/night` and the tag are all pushed to origin. Later commits include the showcase, local AI integration and UI/UX pass; see `git log`.

---

## 3. Timeline of decisions (and what was rejected)
This is the short version. `HISTORY.md` has the full story, the founder's exact words, and a complete "Rejected, do not repeat" list.

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
   - `marks.html` v1 had Now, Long exposure, Harmonograph and Growth rings. Founder: "**only the first one is good**"; the others felt like the same idea with a different picture in front. Lesson: an illustration placed beside the name is not a logo idea.
   - Researched dynamic identities (Nordkyn, MIT Media Lab, Casa da Música, Whitney, the WPP variable-font logo). Rule learned: **keep one thing fixed and let one real signal change the logo itself.**
   - v2 had 01 Now, 02 Daylight, 03 Weight of the day and 04 Timestamp. Founder: "not that much interesting, **try something else keep these 4 tho**."
   - Added 05 Sundial, 06 Tonight's moon and 07 Twenty-four hours. No verdict on 05 and 07; 06 later went on the site for a short time.
8. **Logo round 3 (2026-10-02), same page.**
   - Founder: "I only liked 01 Now so far. Show me more ideas in that spirit, where the logo itself keeps time, not a picture next to the name… really out-of-the-box and professional."
   - After five proposals in chat: "i like some of em, now you are cooking… still not that much interesting, try something else, keep all of the current work intact, EPOCH or nothing!!!"
   - Added 08–15 in a new "EPOCH or nothing." section below 07; 01–07 are untouched apart from a jump link, now labelled "08 to 15 ↓".
9. **Logo round 4 (2026-10-02).**
   - Founder on 08–15: "i only liked 08 and 11"; the rest were rejected as ugly and repetitive. "KEEP ADDING DO NOT REMOVE". They asked for research into designers who make logos that stand out.
   - Two research briefs found no brand mark that shows the real live time (likely open ground, though that can't be proven), and that the great marks put one idea into how the mark is built rather than adding effects.
   - Added 16–22 in an "All in." section below 15. No verdict yet.
10. **"put Tonight's moon in the website" (2026-10-02).** The prototype site's logo is now concept 06: the plain wordmark with tonight's real moon phase lit in orange inside the O (header and footer lockups, plus a live favicon). The giant faint footer wordmark stays plain, as the founder chose earlier. The homepage hero drawing still shows the old ring-and-dot mark.
11. **"put 08 on the website let me see how it goes" (2026-10-02).** The site logo switched from the moon (06) to 08: the wordmark's O is a clock whose opening and orange point turn once a day with the visitor's local time (midnight at the top), updated every minute, with a matching live favicon and a hover title giving the time. The moon version is commit 2567b4f.
12. **UI/UX pass, "do it your way" (2026-10-02).** From a list of eight ideas Claude built the four that need no founder content:
   - The logo winds from midnight to now on the first page of each visit (sessionStorage), and hovering it shows "It's 9:05 PM. The O points to now."
   - The home hero is redrawn as the logo's O ("Construction, rev B"): a live 24-hour clock with an orange hand, a "now" label, a 24-hour dial and two plain notes. It draws itself, winds to now, then runs live.
   - Live office clocks: the footer reads "Charlotte 11:35 AM · Ahmedabad 9:05 PM" and each office card shows its local time.
   - A shorter menu: Work, Services, How we work, About and Start a project. Industries and Insights stay in the footer.
   - Not built, needs founder content: real case-study numbers, quotes, the OneSix story and logo, a founder photo and bio, and a Calendly link (`BOOKING_URL`). Also suggested and not built: a sticky "Book a call" bar on phones.
13. **Night (2026-10-02, branch `feat/night`).** The founder said the light site "feels like whiteboard" and chose Night from three looks. The light site is tagged `light-site-2026-10-02`, and all work branches are pushed to GitHub as a backup.
   - Tokens: canvas `#000000`, raised surface `#0d0d0c`, ivory `#f2efe8`, muted `#8f8a80`, faint `#5c5850`, lines at 12% and 24% ivory. Orange `#ff4f00` means "now" only (the logo's point, the live hand, the light); buttons are ivory with black text.
   - The memorable element: orange light leaks from the hero O's opening and turns with it.
   - Fine film grain over every page, and soft light on raised surfaces.
   - A full-screen "EPOCH or nothing." section was tried and removed the same day (founder: "it looks ugly").
   - The giant footer wordmark is option 6 of `prototype/footer-lab.html` (which compares eight treatments), "dusk behind, letters clear": quiet ivory letters at 20% with a low orange glow (`.foot-glow`) rising from the bottom edge of the footer. The glow rises like a sunrise as you scroll: `initScroll` sets `--rise` on the footer from 0 (footer just entering) to 1 (very end of the page) via the tested `KeptTime.rangeProgress`. Option 5 (sunset-lit letters) was tried first, in commit ff861ad. The founder found the scroll rise "not that effective" but kept it ("lets move on"). The footer's bottom row shows only the copyright.
   - Lines and case-card sketches draw themselves once as they scroll into view (text never animates).
   - A reading clock: a small O at the bottom right whose point travels round as you scroll; click it to go back to the top.
   - Page changes reveal as a circle growing from the logo's O (cross-document view transitions).
   - Primary buttons drift slightly toward the cursor.
   - Judgement calls the founder may revisit: the AI step in case sketches and the card corner brackets are now ivory, not orange; the header blur needed the mobile menu moved outside the header.
14. **Inner-page craft pass (2026-10-03).**
   - One twelve-column grid (`--col-gap`): section titles in columns 1-5, content from column 6, on rows, pricing, articles, contact and the case hero. Section titles on inner pages stay pinned while long content scrolls.
   - How we work: "Your first 30 days" is told on the logo's O. Four week arcs light as the reader passes each step, and the point ends in the opening at the top, so the finished plan is the mark. Static and complete on phones and for reduced motion.
   - Case pages: the engagement is drawn on a one-year dial from the real timeline (8 and 12 months). No orange: it is not "now". Each team in the facts row sits on its own line.
   - Contact: inline validation on leaving a field, a confirmation in place of the form, drawn select arrows; "Book a 30-minute call" no longer breaks at the hyphen.
   - Articles: about 70 characters a line, a lead paragraph, a hanging pull quote, the contents list marks the section being read with the logo's orange point (it is "now"), and the last paragraph ends on a small O.
   - Judgement calls the founder may revisit: the case dial (if it reads as decoration) and the small O ending articles.

---

## 4. The prototype (`prototype/`)

Plain HTML + CSS + vanilla JS with no build step. Served by `prototype/serve.py` on port 3460.

### Pages
| File | Notes |
| --- | --- |
| `index.html` | Home. Hero: copy on the left; on the right, the logo's O drawn as a technical construction ("rev B"): a 24-hour dial whose ring, hand and orange point turn to the visitor's time of day, with light from the opening and a label showing the time. The ring draws in and winds to now once per visit. Notes include `t₀ 1970-01-01 00:00 UTC` and the live Unix time. On desktop the cursor becomes a measuring crosshair. Then: three project-goal links, "Trusted by" marquee, selected work with an interactive HUB scope panel, Why EPOCH, commitments, AI services rows plus engineering chips, closing CTA. |
| `service.html?id=` | Rendered from `data.js`, with section navigation and service context carried into Contact. |
| `work.html`, `case.html?id=` | Work has full HUB and Inspira features with challenge/build/integration tabs, a document-demo invitation and the client logo grid. Case detail is rendered from `data.js`, with section navigation. |
| `services.html` | Three project-goal routes, with capabilities and related work, followed by the full service catalogue. |
| `contact.html` | Required brief first, optional details, contextual selection, honest email booking fallback and editable enquiry preview. |
| `document-demo.html` | Fictional briefs with browser sample preview and optional server-side AI review. Sources select the original text. Errors and uncertainty stay visible. AI setup: `tools/AI-REVIEW.md`. Linked from Work. |
| `industries.html`, `industry.html?id=` | insurance, financial-services, healthcare, retail. Data in `assets/js/industries.js`. |
| `how-we-work.html` | Engagement models, first 30 days, how pricing works, FAQs. **Contains claims to confirm** (section 7). |
| `insights.html`, `article.html?id=` | 3 articles in `assets/js/insights.js`: `why-ai-pilots-stall`, `evaluating-llm-systems`, `first-30-days`. Byline "EPOCH"; dates picked by Claude. |
| `about.html` | An editorial introduction, working principles, engagement steps, two offices and the existing technology catalogue. |
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
  The service-detail headings in data.js (section titles, steps, offerings, skills, industries, CTA titles) were put into sentence case directly in data.js on 2026-10-03. `src/shared/constants/serviceData.ts` still has the Title Case originals, so make the same change there before regenerating, or it will be lost.
- **`assets/js/site.js`** is an IIFE that:
  - injects the SVG sprite (symbols `wm-plain` and `wm-clock`), the header (nav: Work, Services, How we work, About + "Start a project") and the footer (giant wordmark over a dusk glow that rises as the page ends, copyright);
  - renders blocks into `[data-clients]`, `[data-service-rows=tier]`, `[data-service-chips=tier]`, `[data-case-cards]` (`with-cta` adds the dark "Your project" card), `[data-commitments]`, `[data-offices]`, `[data-tech]`, `[data-closing]`, and the service and case pages;
  - adds the live clock (`[data-unix-label]`), the measuring crosshair (`.v-draft`, fine pointers only) and booking.
  - `SYSTEM_SKETCH` holds the case-card system diagrams, built from each case study's deliverables.
  - **`BOOKING_URL = ''`**. Set it to the founder's Calendly or Cal.com link; until then "Choose a time" opens an email.
- **`assets/css/site.css`** holds the Night tokens on `:root`:
  - colours: `--bg #000000`, `--raised #0d0d0c`, `--text #f2efe8`, `--muted #8f8a80`, `--faint #5c5850`, `--line` and `--line-strong` (ivory at 12% and 24%), `--accent #ff4f00` ("now" only), `--error #ff6b6b`; buttons are ivory with black text;
  - a type scale (`--text-xs` to `--text-display`) and one twelve-column grid (`--col-gap`): section titles in columns 1 to 5, content from column 6;
  - fonts: Host Grotesk + IBM Plex Mono;
  - rails on `.wrap`, square buttons, film grain;
  - view transitions (the reveal grows from the logo's O), corner brackets on `.card:hover` (ivory), `.sketch`, `.marquee`, `.foot-mark`, `.foot-glow`;
  - nav collapses to a menu below 1060px.
  - `pages.css` (prefix `pg-`) and `insights.css` (prefix `ins-`) are page-specific.
- **`assets/js/kept-time.js`** holds the pure time and geometry helpers: rings with openings, watch angles, seven-segment letters, the engraving text and eclipse geometry (marks 08 onwards), the moon phase (mark 06), the living O's time of day, reading and range progress (the reading clock and the footer rise), the magnetic buttons, and the craft-pass helpers `stepAt`, `ringStop` and `monthsIn`. It is unit-tested with Node's built-in runner: `node --test 'prototype/tests/*.test.js'` (41 tests). Jest only looks in `src/`, so these never mix with the app's tests.
- **`assets/js/marks-live.js`** draws marks 08 onwards as SVG (stage, strip of states, lockup with the wordmark) from one animation loop. Its lockups use `data-lockup-mark`, because 01's inline script already owns `data-lockup`.
- **Discovery and enquiries:** `assets/js/experience.js` owns the three goal routes, accessible tabs for service selection and case scope, validated query context for Contact, and section navigation on long pages. `assets/css/experience.css` gives Home, Services, Work, About and Contact their individual compositions. Pure query resolution lives in `KeptTime.contactContext`, with five tests written failing first. There are now 55 JavaScript and 18 Python tests. `docs/handoff/tools/journey-check.mjs` verifies the full interaction at 1440px, 390px and 320px. Contact previews no delivery and preserves typed values when edited. The scheduling button says Arrange a call by email until `BOOKING_URL` is set, then becomes Choose a time.
- **Showcase and document demo:** `assets/css/work.css` styles the lead project and companion story rendered by `site.js` from existing case-study content. `assets/js/document-demo.js` owns sample selection, editing and citations; `assets/css/document-demo.css` styles the source and results panels. The pure `KeptTime.reviewBrief` helper has 9 tests in `tests/document-review.test.js`, making 50 pure tests in total. `docs/handoff/tools/demo-check.mjs` checks the actual browser flow. The sample text is fictional. Preview stays in the browser; Review with AI sends the document to OpenAI through `serve.py`. `document_api.py` checks exact quotes, cited values and source positions, including browser UTF-16 offsets. 18 Python tests cover the server boundary and provider responses. No document persistence is added, and API requests use `store=False`. This is a loopback-only development endpoint, not a public deployment. A live provider run is still unverified because no API key was configured.
- **Assets:** `assets/logos/` holds client logos.
  - `HUB-international.png` was **made transparent and cropped**; the original has a solid white box.
  - Cardinal, iDrive and Rural King are cropped PNGs.
  - On the dark theme, client logos render as ivory silhouettes (`--client-filter: brightness(0) invert(1)`).
  - `assets/favicon.svg`: ivory ring and orange dot on black. `site.js` redraws the favicon every minute to match the live logo.

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

## 5. UI upgrade pass (light site, 2026-10-01; partly replaced by Night, see section 3, item 13)
- Page-to-page cross-fade via CSS view transitions; the header doesn't move.
- Orange CAD-selection corner brackets on card hover and focus.
- A "system sketch" (vertical pipeline, AI step in orange) on each case card.
- Live `t = <unix seconds> s` in the hero drawing, plus a measuring crosshair with coordinates.
- Logo marquee that pauses on hover; reduced motion makes it a static, scrollable row.
- Big faint footer wordmark.
- The closing CTA on every page offers "Book a 30-minute call" (links to `contact.html#book`).

---

## 6. The logo: 08 is on the site, and every concept stays in marks.html
- **Status (2026-10-03):** 06 Tonight's moon was the site logo briefly (`2567b4f`). Then 08 replaced it (`fa5cb0c`, "ok put 08 on the website let me see how it goes"). The founder has kept building on 08 since then but has not formally called it final, and gave no verdict on 16 to 22. Never remove a concept from `marks.html` ("KEEP ADDING DO NOT REMOVE").
- `marks.html` shows 01 Now (liked), 02 Daylight, 03 Weight of the day, 04 Timestamp, 05 Sundial, 06 Tonight's moon, 07 Twenty-four hours.
- 02–04: "not that much interesting." 05 and 07: no verdict. 06 Tonight's moon was the site logo briefly (`2567b4f`).
- Round 3:
  - 08 In the name: the wordmark's O is 01's clock.
  - 09 Display: EPOCH on seven-segment clock digits; every minute it flips to the time, and the orange point becomes the colon.
  - 10 Overrun: a spiral one full turn plus 40°, tip on the time of day.
  - 11 Hour and minute: hour opening plus a narrow minute cut, read like a watch.
  - 12 Engraved: the ring carries "EPOCH OR NOTHING", the UTC date and time, and the Unix second, in microtext.
  - 13 Full circle: the opening is what is left of today; the logo at noon, closed at midnight.
  - 14 Totality: an eclipse "diamond ring" whose bright side turns with the day.
  - 15 On the minute: the point laps the ring every minute and rests in the opening, like the Swiss railway clock.
- Founder verdict on 08–15: **liked 08 and 11 only**; the rest were rejected as ugly and repetitive.
- Round 4, no verdict yet (each names the design it borrows from):
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
8. ~~Office hours said "9 AM–6 PM PST" although Charlotte is Eastern.~~ Removed from the prototype's contact page on 2026-10-02 at the founder's call ("its not important"); the port should drop them too.

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

## 9. Tools (`docs/handoff/tools/`)
Headless Chrome via CDP. They never touch the founder's browser. `docs/handoff/tools/README.md` explains every tool, with usage, and gives the full check to run before showing the founder anything.
- Screenshots: `shot.mjs` (one viewport; `REDUCED=1` for reduced motion), `tiles.mjs` (a scroll column), `seq.mjs` (scroll-driven moments), `clip.mjs` (one element), `hover.mjs`, `tabfocus.mjs`, `reduced.mjs`.
- Checks: `errors.mjs` (console errors, and optionally the value of an expression), `mobile-check.mjs` (overflow at phone width), `audit.mjs` (stranded words, line length, overflow), `formcheck.mjs` and `form.mjs` (the contact form).
- Pure helpers have unit tests: `node --test 'prototype/tests/*.test.js'`.
- `reference-screenshots/` contains the Anduril, Palantir, Linear, Mistral and OneSix captures used for inspiration.

---

## 10. When the founder says "port it"
1. Make a new branch from `feat/night`.
2. Rebuild the Night design system in the Next app:
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
- `no-em-dashes.md`

## 12. Where everything lives
**In the repo (public):**
- `docs/handoff/HANDOFF.md`: this file, the current state and how to work.
- `docs/handoff/HISTORY.md`: the full story, session by session, with what was asked, built, kept and rejected, and the commits.
- `docs/handoff/screens/`: dated screenshots of every page. `README.md` there says what each one shows.
- `docs/handoff/tools/`: the QA tools and their guide.
- `docs/handoff/reference-screenshots/`: the inspiration captures.
- `docs/handoff/user-wip-backup/`: the founder's uncommitted edits that were saved (section 8).
- `prototype/marks.html`, `prototype/logos.html` and `prototype/footer-lab.html`: every logo and footer option, kept on purpose.

**On the founder's Mac only (private, never commit):** `/Users/yashdesai/Codebase/EPOCH/epoch-context-archive/`
- `transcripts/`: copies of the raw Claude Code session transcripts, the subagent transcripts and the memory files. Claude Code deletes its own copies after about 30 days, so these copies are the long-term record.
- `founder-messages.md`: every message the founder sent, word for word, in order.
- `tmp/`: everything that was in the sessions' temporary scratchpads (QA screenshots, logo sketches, variants, intermediate data files, the first versions of the tools). Chrome profiles were left out.
- `README.md` there lists the contents.
