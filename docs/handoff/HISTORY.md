# EPOCH website redesign: history

EPOCH Software Services is an AI-first software and AI engineering company with offices in Charlotte, NC and Ahmedabad, India. This repo is its marketing website. The clients the founder names first are HUB International, OneSix AI and Inspira Financial.

This file tells how the redesign got to where it is. For each step it says what the founder asked for, what Claude built and showed, what the founder said, what was kept, what was rejected and why, and which commits hold the work. It covers two Claude Code sessions, from 2026-10-01 to 2026-10-03.

- `HANDOFF.md` (next to this file) is the current state and how to work. Read it first.
- `HISTORY.md` (this file) is how we got here. Read it before proposing anything, so rejected ideas don't come back.
- `AGENTS.md` (repo root) is the short brief for any coding agent.

How to read it:
- Times are India Standard Time (UTC+5:30), the zone of the commit timestamps.
- Quotes from the founder are exact, typos included. Strong language is paraphrased.
- "Claude" means Claude Code working in this repo. An "agent" is a helper that Claude started for part of the work.
- The founder's messages word for word, and the raw transcripts, are in a private archive on the founder's Mac (`~/Codebase/EPOCH/epoch-context-archive/`, see HANDOFF section 12). They are never committed.

---

## Mobile compatibility (2026-10-03)

The founder requested a full mobile compatibility pass. Work continued on `fix/mobile-compatibility` from rollback commit `aaeb410`. The existing layouts already fit phone widths. The audit found undersized standalone touch targets, a 13px phone document editor and a menu close action that could move the page.

Expanded touch targets, raised the editor text to 16px for phone and tablet use, preserved scroll position when menu focus returns, made the landscape menu more compact, disabled the circle page transition on touch devices after reproducing transition errors during quick navigation, allowed long button labels to wrap and added safe-area spacing. The floating reading clock hides while a form field is focused. All copy, logo concepts and the accepted design remain. No illustration or identity direction was revived.

A failing headless browser check was added before the fixes. It covers all 36 routes at five widths, real emulated touch events, menu focus and scroll restoration, orientation changes, field sizing and reduced motion. Physical-device Safari and Android testing remains unperformed.

---

## Illustration pass and rollback (2026-10-03)

Commit `4ce5c01` added seven SVG illustrations across Home, Services, Work, case pages and About on `feat/visual-stories`. The founder rejected the entire result and requested a full revert. The prototype was restored exactly to `7ceda36`, retaining the existing logo, footer treatment, About headline and overlap fix. Do not reuse the exploded system, goal diagrams, case illustrations or folded-paper direction without a new request. Photography and logo exploration remain parked. The rejected assets and screenshots are recoverable from `4ce5c01`.

---

## The short version

- **Session 1, night of 2026-10-01.** The founder felt the business was stuck and the site looked old and generic. Claude rebuilt the Next.js site around AI (`feat/ai-first-upgrade`). The founder called its neural-network hero "cringe" and said it didn't match the ambition.
- To move faster, the redesign moved to a static HTML prototype (`feat/epoch-identity`). Of three looks, the founder chose the white "Draftsman" look. New pages and a UI pass followed.
- The founder wanted a logo that "passes time itself". In the first rounds only 01 Now landed: a ring whose opening points to the time of day.
- **Session 2, 2026-10-02.** Marks 08 to 22 were added. The founder liked 08 (the O of EPOCH is the clock) and 11 (hour and minute). After a short try with 06 Tonight's moon, 08 became the site logo.
- The founder banned em dashes: "em dashes feels like AI".
- The white site "feels like whiteboard", so the prototype became Night (`feat/night`): ivory on black, one orange point that means "now", and light leaking from the O.
- The home page and footer were simplified. The footer wordmark got a dusk glow that rises as you scroll. Every inner page got a detail pass.
- Nothing has been ported back to Next.js. Real proof (client numbers and quotes) is still missing.

---

## Before these sessions

- `main` holds the original site (Next.js 15, React 19). Its last commit is `5481072` (2026-01-29).
- Claude's first review found:
  - a headline any agency could use ("We build software that works reliably and scales with you.");
  - generic "why partner with us" points;
  - case-study results with no numbers;
  - testimonials that said "[Testimonial pending]";
  - no mention of OneSix AI, one of the three clients the founder named.
- A mapping agent also found about 6,500 lines of dead code (an old canvas "wormhole" homepage), Tailwind installed but unused, a test setup with no tests, and uncommitted edits in 18 files on `main`.
- The branch `draft/content-updates` already existed and points at the same commit as `main`. These sessions never touched it.

---

## Session 1

Session `ff216694-d6e4-4599-8fce-5d6564693cef`, from 2026-10-01 20:28 to 2026-10-02 04:41.

### 1.1 The ask (2026-10-01, 20:33 to 23:19)

- **Asked:** the founder felt the business was stuck, the website was old, and great clients were not enough. Their belief: no one serves, goes to the lengths, or commits to clients like EPOCH does. "Its either EPOCH or nothing".
- **Claude's advice:** the site says none of this, and proof is what sells. First get short quotes and permission to use real numbers from HUB, Inspira and OneSix. Then rewrite the site around them. Then refresh the visuals. Claude asked for each client contact, what was built, any real number, and one true story of going further.
- **The founder's answer:** "i go all in, all the time bro". Then they asked to upgrade the current site, because "the current website doesnt match my ambitions to work on AI projects and my beliefs that i told you". No numbers, quotes or stories were given, and they are still missing.
- Claude started screenshotting the old site in the founder's own Chrome. The founder rejected that action. It was the first of two times.

### 1.2 Direction by multiple choice (23:20 to 23:37)

- Claude asked three multiple-choice questions, two of them with sketch previews. The founder took the recommended option each time:
  - **Positioning:** AI-first. AI leads; cloud, custom software and DevOps stay as the engineering that makes AI work in production.
  - **Look:** "Manifesto + live field": big editorial type carrying the beliefs, plus one living AI "neural field". It kept the EPOCH green.
  - **Services:** two tiers. "AI" (AI and machine learning, generative AI, data and analytics) and "Engineering that makes AI real" (custom software, cloud, DevOps, mobile, cybersecurity, digital transformation). Blockchain, IoT and AR/VR were cut.
- Claude then started a written design in three parts. After part 1 the founder said "build it ill just review the page directly". Showing built pages instead of write-ups has been the rule ever since.

### 1.3 The AI-first Next.js site (23:37 to 00:17, `feat/ai-first-upgrade`)

- **Built,** test first, on the new branch `feat/ai-first-upgrade`:
  - a design system: wide Archivo type, acid green `#9BC136` on near-black `#060F01`, and shared building blocks;
  - home: "All in. Every project. Every time." over the Epoch Field, a canvas network that a training pass sweeps through, with an epoch counter and a falling loss readout. Then client logos, "The name is the standard", three commitments, AI services, selected work and "Bring us the project that matters most.";
  - services in two tiers, with the retired services' URLs redirecting to `/services`;
  - a Work index. The HUB and Inspira case studies became reachable for the first time, and OneSix AI joined the client list. Testimonials render only when real ones exist;
  - an About page led by the beliefs ("We don't do half-in.") and a Contact form with inline errors;
  - the unused wormhole hero, hooks and starter files removed.
- Three agents built Services, Work, and About plus Contact in parallel.
- 97 Jest tests, the type check, lint and the production build all passed.
- **Shown:** the running site and a long summary, then a short one when the founder asked "explain it to me in short".
- **Commits** (made at 00:40 to 00:42, when the founder asked for them): `7d94918`, `0bc7caf`, `a032a0d`, `a38a7d1`, `0b4280b`, `df52a02`, `89ec7b8`, `b5292be`, `6847335`, `e40ffa3`, `a9309d7`.

### 1.4 The founder's lost uncommitted edits

- `main` had uncommitted edits in 18 files when the work began. The mapping agent said to commit or branch first. Claude created a branch, but did not save a copy of those edits.
- By the time Claude backed them up (around 00:06), several files had already been rewritten. It saved 8 files and a patch (`user-wip.patch`, a diff against `5481072`).
- Lost for good: the edits to the layout, footer, homepage, services list, clients list, `content.ts` and the shared types. The editor's local history did not have them either.
- Claude told the founder in its summary at 00:17. The backup has been in the repo since `e82ad64`, under `docs/handoff/user-wip-backup/`.
- **Lesson:** snapshot uncommitted work before overwriting anything.

### 1.5 The verdict: "cringe" (00:26 to 00:39)

- **Verdict:** "bro the hero animation feels cringe, it doesnt look like professional". The logo didn't match the website, and the whole site "doesnt match the ambitions we have". The founder pointed at OneSix and xAI for inspiration and wanted a different logo and colours.
- Claude agreed: the field read as a stock "AI network" graphic, and neon green on black is the most common AI-site look.
- Claude opened x.ai and the OneSix site in the founder's Chrome. The founder rejected that action, the second time. Then: "it doesnt necessarily have to only those 2 refs, you can check others tooo, just do something great, i wanna make EPOCH GREATT!!!!!!!!!!".
- From here on Claude used headless Chrome scripts (now in `docs/handoff/tools/`). Captures of Anduril, Palantir, Linear, Mistral and OneSix are in `docs/handoff/reference-screenshots/`.
- **Kept:** the AI-first positioning, the two service tiers, the honest content and the code structure. They are the base for the eventual port.
- **Rejected:** the Epoch Field hero, the green-on-black look and the old logo.

### 1.6 Commit, then a new branch (00:39 to 00:43)

- **Asked:** "ok dont work on the same branch, commit what we built and move on to new branch".
- Claude made the 11 commits listed above. The pre-commit hook failed when no JS or TS files were staged, so `e40ffa3` fixed it. Then Claude created `feat/epoch-identity` from `feat/ai-first-upgrade`.
- This set the rule: each design direction gets its own branch, after the current work is committed.

### 1.7 The static prototype with three looks (00:47 to 01:11)

- **Asked:** "built everything in pure html css and serve me so i can test it quickly then we will port the inalized version to next".
- **Built:** `prototype/`, plain HTML, CSS and JS with no build step. Content was exported from `src/shared/constants` into `assets/js/data.js`. Client logos were cleaned up (HUB's was made transparent). A switcher on every page flipped between three looks and three logos:
  - A "Midnight": black, with a dial counting the seconds since 1970;
  - B "Draftsman": white, ink and one orange `#ff4f00`, with the mark drawn as a technical drawing;
  - C "Ultramarine": electric blue, with an orbit animation;
  - logo 1: a dot in the O; logo 2: a ring-and-dot symbol next to the wordmark; logo 3: the wordmark alone.
- **Shown** at localhost:3460, with Claude recommending A and logo 1.
- **Decision:** the founder said "ok what do you want from me, ask me in simple lingo", then picked A and logo 1. Claude saved the three-way version as `c6a3e70` (01:09). Less than three minutes after answering, the founder switched to "B and logo 2", then said "continue dont port it into next js tho". That no-port rule still stands.

### 1.8 Draftsman locked in (01:11 to 01:19)

- The switcher, A, C and logos 1 and 3 were removed. They are still in `c6a3e70`.
- "trusted by teams at home page, can we make it horizontal scroll?": the client logos became an endless strip that pauses on hover.
- "ok can you make EPOCH in the logo more bold?": the wordmark stroke went from 4.4 to 6.6.

### 1.9 New pages and the first UI pass (01:19 to 01:47)

- **Asked:** how to make the site leave a great impression, and to make the UI "REALLY REALLLY GREATTTTTTTT".
- Claude listed ten ideas. The five that matter most need the founder: real numbers, real quotes, real people, visuals of the work and true credentials. Claude then offered four of the ideas it could build alone, and the founder picked all four.
- **Built** (two agents for the pages, Claude for the shared UI):
  - Industries: an index and four pages (insurance, financial services, healthcare, retail);
  - How we work: ways to engage, the first 30 days, how the work runs, pricing and questions;
  - Insights: three draft articles (why AI pilots stall, evaluating LLM systems, the first 30 days);
  - Book a call on the Contact page, and "Book a 30-minute call" in every closing section. It opens an email until there is a calendar link;
  - the UI pass: page cross-fades, orange corner brackets on card hover, a small system sketch on each case card, a live seconds-since-1970 counter and a measuring crosshair in the hero drawing, and a big faint EPOCH wordmark in the footer. The menu grew to six items.
- **Flagged for the founder to confirm,** and still unconfirmed: "Most projects start at $25,000", the pricing structure, 3 to 4 weeks to a prototype and 8 to 16 weeks to production, the 30-day plan, which clients sit under which industry, and the articles with their dates and byline.
- The founder asked twice more for the short version, and said "ok whats still being built i didnt get that part". Answers had to get shorter.

### 1.10 Servers and caching (02:21 to 03:59)

- Both background servers stopped after their two-hour limit. Claude asked the founder to restart the prototype server by hand.
- Later the founder could not see a change: "i dont see it kill the current server running and run it yourself". The browser had cached old files, which Python's basic server allows. Claude wrote `prototype/serve.py`, which turns caching off, and left it running.

### 1.11 The giant footer wordmark, first try (03:55 to 04:01)

- The founder liked the big faint EPOCH in the footer and asked to try logo 1 there. Claude made the dot orange. The founder asked for "light orange to match the fade", then said "i kinda like the old one without circle logo lets revert". The plain wordmark stayed.

### 1.12 Logo rounds 1 and 2: `logos.html` and marks 01 to 07 (04:05 to 04:31)

- **Asked:** other logo ideas that make the brand stand out, true to the beliefs and the ambition.
- **Round 1a,** `prototype/logos.html`: five directions in the site's style. A Zero point, B The overrun (Claude's pick), C The extra mile, D In focus, E New era.
- **Verdict:** "brooo it doesnt have to match the same webite, i want you yo really think out of the box, think from the outside, create a something that passes time itself".
- **Round 1b,** `prototype/marks.html` ("Kept time"), with the idea written up in `prototype/marks.md`. Four living marks seeded by the current second: Now (a ring whose opening points to the time of day), Long exposure (star trails), Harmonograph and Growth rings.
- **Verdict:** research real examples before creating; "only the first one is good". The rest were the same idea with a different picture in front.
- **Lesson:** a picture beside the name is not a logo idea.
- Claude studied living identities: Nordkyn's weather-driven logo, MIT Media Lab, Casa da Música, the Whitney's responsive W, and a variable-font logo for WPP's campus. **Rule learned:** keep one thing fixed, and let one real signal change the logo itself. For EPOCH the signal is time.
- **Round 2:** 01 Now, 02 Daylight (a sun rises and sets in the O), 03 Weight of the day (the letters thicken with daylight), 04 Timestamp (32 boxes spelling the Unix time). Long exposure, Harmonograph and Growth rings were replaced, and they were never committed.
- **Verdict:** "not that much interestig try something else keep these 4 tho". Claude added 05 Sundial, 06 Tonight's moon and 07 Twenty-four hours. They got no direct verdict.

### 1.13 The first handoff (04:36 to 04:41)

- **Asked:** "write the detailed hand off, make sure you dont loose anything", including the temp files, before a new session.
- Claude copied the temp-only files into the repo (QA tools, the edit backup, reference screenshots). It wrote `docs/handoff/HANDOFF.md` and a memory note pointing to it, and gave the founder a first message for the next session.
- **Commits** at 04:40 on `feat/epoch-identity`: `decb1a2` (Draftsman lock-in, new pages, UI pass), `22311ff` (`logos.html`, `marks.html`, `marks.md`) and `e82ad64` (handoff, tools, backup).

---

## Session 2

Session `229b15c3-ad9c-4bcd-95e4-1ef6c28ea854`, from 2026-10-02 04:41 to 2026-10-03 (still open at about 01:50, when this file was written).

### 2.1 Restart from the handoff (04:41 to 04:59)

- The founder pasted the suggested first message: read the handoff, start the server, and show more marks in the spirit of 01 Now, where the logo itself keeps time, not a picture next to the name. Keep explanations short, and don't port to Next.js. They added "understand everythign and come back".
- Claude read the handoff, looked at every mark headlessly, and proposed five ideas in chat: In the name, Display, Overrun, Hour and minute, Engraved. The founder said "ok" and stepped away for about ten hours.

### 2.2 Logo round 3: 08 to 15, "EPOCH or nothing." (14:50 to 15:26)

- Asked whether to build the five, the founder first said "No let me review what we have now ill tell you later, dont work on it yet". Two minutes later: "ok i like some of em, now you are cooking some interesting stuff, keep going, still not that much interestig try something else keep all of the current work intact, EPOCH or nothing!!!".
- **Built,** test first: the five ideas plus three new ones, in a new "EPOCH or nothing." section below 07. 01 to 07 were left untouched. The time and geometry maths lives in `prototype/assets/js/kept-time.js`, with 22 tests run by Node's built-in test runner (`prototype/tests/kept-time.test.js`).
  - 08 In the name: the O of EPOCH is 01's clock.
  - 09 Display: EPOCH on seven-segment digits that flip to the time each minute.
  - 10 Overrun: a spiral, one turn plus a little, with its tip on the time.
  - 11 Hour and minute: an hour opening plus a narrow minute cut, read like a watch.
  - 12 Engraved: microtext of "EPOCH OR NOTHING" and the exact second.
  - 13 Full circle: the opening is what is left of today.
  - 14 Totality: an eclipse whose bright side turns with the day.
  - 15 On the minute: the point laps the ring each minute, like the Swiss railway clock.
- **Commit:** `0fd3f3a` (15:25). Claude's favourites were 09, 12 and 14.

### 2.3 Logo round 4: research, then 16 to 22, "All in." (15:33 to 16:07)

- **Verdict on round 3:** the founder was frustrated that the ideas were not different enough. "i only liked 08 and 11"; the rest were rejected as ugly. A new rule: "KEEP ADDING DO NOT REMOVE". They asked Claude to "take some inspirations from people who are really great at making brand logos that stand out".
- Two research agents ran in parallel. One covered master logo designers and studios (Rand, Bass, Chermayeff & Geismar, Wyman, Stankowski, the FedEx arrow, recent AI brands). The other covered remarkable watch and clock displays and live-data identities (Ressence, Urwerk, HYT, Louis Vuitton's Spin Time, Hermès' Le Temps Suspendu, the Long Now clock, Nordkyn).
- **Findings:** neither agent found a brand mark that shows the real live time. That looks like open ground for EPOCH, though it is not proven. Great marks build one idea into how the mark is made instead of adding effects. Everything the founder rejected was an effect or a picture; everything they liked was built into the mark.
- **Built** in a new "All in." section below 15 (the drawing code was renamed `marks-live.js`):
  - 16 In the name, to the minute: 08 and 11 combined;
  - 17 Parallel lines, after Lance Wyman's Mexico 68;
  - 18 Slashed zero, after Stankowski's Deutsche Bank slash;
  - 19 One orange letter, after Mobil's red O;
  - 20 Stencil, after the hidden FedEx arrow;
  - 21 Flip, after Louis Vuitton's Spin Time;
  - 22 Wandering point, after Urwerk.
- Claude also sketched a solid clock face in the O, hands only, and hours in the O with minutes in the C. It judged them too generic to show.
- **Commit:** `8e0d908` (16:06). There has been no verdict on 16 to 22. The research ideas not built yet are listed in HANDOFF section 6.

### 2.4 The em-dash rule (15:40 to 15:46)

- **Asked,** in the middle of round 4: "why we adding em dashes in page titles and stuff??? em dashes feels like AI".
- Claude found 32 em dashes in the site copy and rewrote each sentence at its source (`src/shared/constants/serviceData.ts`). Page titles in the prototype and the Next app now use " | " (for example "About | EPOCH"). `data.js` was regenerated, and all 97 Jest tests still passed. The dashed jump links on the marks page were renamed too.
- **Commit:** `61fdbf7` (15:44). The rule was saved as a memory note and repeated in every later brief.

### 2.5 Tonight's moon as the site logo (20:30 to 20:37)

- **Asked:** "put Tonight’s moon in the website".
- **Built:** mark 06 became the site logo. The wordmark showed tonight's real moon phase lit in orange inside the O, in the header, the footer and a live browser-tab icon, with the phase name on hover. The moon maths went into `kept-time.js`, test first. The giant footer wordmark stayed plain.
- **Commit:** `2567b4f` (20:37).

### 2.6 Mark 08 becomes the site logo (20:53 to 20:58)

- **Asked:** "ok put 08 on the website let me see how it goes".
- **Built:** the O of the wordmark is now a 24-hour clock. Its opening and orange point turn with the visitor's local time, with midnight at the top. It updates every minute, the tab icon matches, and hovering shows the time. Mark 06 on the marks page now uses the shared moon maths.
- **Commit:** `fa5cb0c` (20:56). The moon version is kept in `2567b4f`.
- The founder did not see how it moved ("explain to me in short"). Claude explained that the O is an hour hand that turns once a day. That showed the clock had to explain itself, which drove the next phase.
- 08 is still the site logo. The founder has not formally called it final.

### 2.7 The UI/UX pass, "do it your way" (21:11 to 21:21)

- Claude proposed eight ideas and suggested the four that need nothing from the founder. The founder said "do it your way".
- **Built:**
  - the logo winds from midnight to now on the first page of each visit, and hovering explains it ("It's 9:05 PM. The O points to now.");
  - the home hero redrawn as the logo's O, live, with a 24-hour dial and a "now" label;
  - live local times for Charlotte and Ahmedabad in the footer and on each office card;
  - a shorter menu: Work, Services, How we work, About and "Start a project". Industries and Insights moved to the footer.
- **Not built:** real proof and real booking (both need the founder), a sticky "Book a call" bar on phones, and lines that draw themselves on scroll (done later, in Night).
- **Commit:** `0d98d48` (21:21).

### 2.8 Office hours removed (21:53 to 21:54)

- Claude asked whether to fix the Contact page's "9 AM to 6 PM PST", since Charlotte is on Eastern time. The founder: "i think we should just remove it its not important".
- **Commit:** `2d077c9`. It is the last commit of the light site and is tagged `light-site-2026-10-02`.

### 2.9 Night (21:58 to 22:39, `feat/night`)

- **Asked:** "everything just feels like whiteboard". The founder wanted the site "really reallyyyyyyyyyy cool, and professional", so that "users visiting the websites leaves with awwww", maybe through subtle details.
- Claude's read: it looks like a whiteboard because everything is white, with thin grey lines and small grey text. Nothing has depth, light or weight. Claude proposed seven details and asked one question with previews: Night (dark everywhere, like the marks page), Day and night (light by day, dark after 6 PM in the visitor's city), or Light with weight.
- **Decision:** "Ok lets try Night, but i want you to commit/save everything we have done so far make sure we dont loose anything".
- Claude tagged the light site `light-site-2026-10-02` (on `2d077c9`) and started `feat/night`. It warned that nothing was on GitHub yet, and the founder said "yes push that to remote". At 22:20, `feat/ai-first-upgrade`, `feat/epoch-identity`, `feat/night` and the tag were pushed to `EPOCH-SOFTWARE/epoch`. `main` and `draft/content-updates` were left alone.
- **Built** by an agent. Claude checked the screenshots, tests and console errors itself before showing anything.
  - Tokens: true black `#000000`, raised surfaces `#0d0d0c`, ivory `#f2efe8`, muted `#8f8a80`, faint `#5c5850`, hairlines at 12% and 24% ivory. Orange `#ff4f00` means "now" only. Buttons are ivory with black text.
  - The seven details:
    1. orange light leaks from the hero O's opening and turns with it;
    2. a page change reveals the next page as a circle growing from the logo's O;
    3. a reading clock: a small O at the bottom right whose point travels as you scroll; click it to go back to the top;
    4. lines and case sketches draw themselves once as they come into view; text never animates;
    5. fine film grain, and soft light on raised surfaces;
    6. one big moment: a full-screen "EPOCH or nothing." over a giant live O;
    7. primary buttons drift slightly toward the cursor.
- **Judgement calls,** still open: the AI step in case sketches and the card corner brackets went from orange to ivory, and the mobile menu moved outside the header so the header blur works.
- **Commit:** `340ee64` (22:39), pushed. 33 tests passed, and none of the 14 pages had console errors.

### 2.10 Office clocks out of the footer (23:15 to 23:18)

- **Asked:** "we dont need to show the Ahmedabad and Charlotte at the bottom", and what could go there instead.
- Claude removed the line and offered four options with previews: a live seconds-since-1970 counter (recommended), tonight's moon, back to top, or nothing. The founder chose "Nothing".
- **Commit:** `4dafbf5`. The office cards on Contact and About keep their local times.

### 2.11 The "EPOCH or nothing." section removed (23:18 to 23:20)

- **Verdict:** "remove EPOCH or nothing. it looks ugly bro".
- The section and all its code were removed. Home now goes straight to the closing invitation.
- **Commit:** `66dc5a9`.

### 2.12 The footer lab, option 6 and the scroll rise (23:27 to 23:54)

- **Asked:** the founder liked the giant EPOCH at the bottom and wanted it more impressive, with a gradient or shades.
- Claude offered four ideas: Lit by the O (recommended), Horizon glow, Cursor light and Slow embers. The founder: "i need visuals of all options to decide which option please my eyes".
- **Round 1:** `prototype/footer-lab.html` with all four live (`d1dda73`). **Verdict:** "didnt like any of this", "try something different, that suits the website that has some good taste bro", and "liked the 2nd Horizen glow a little bit but EPOCH is not visible as it should be".
- **Round 2:** four readable takes on the horizon glow, added above round 1 (`49a2dd0`). 5 Sunset-lit, 6 Dusk behind, letters clear, 7 Rising out of the glow (Claude's pick), 8 One warm line.
- "put the 5" put sunset-lit letters on every page (`ff861ad`). Two minutes later, "put 6" replaced them with quiet ivory letters at 20% over a low orange dusk glow rising from the bottom edge of the footer (`481e118`).
- The founder's own idea: "what if we animate that shade like when user scrolls down???". The glow now rises like a sunrise: dim when the footer comes into view, fully lit at the very end of the page. It uses a new tested helper, `rangeProgress` (`756e6a0`, 34 tests).
- **Verdict:** the founder found the rise not very effective, but kept it and moved on.
- All eight options stay in `footer-lab.html`.

### 2.13 The inner-page craft pass (23:55 to 01:19 on 2026-10-03)

- Claude offered three next steps: the inner pages, real proof, or the Next.js port. The founder chose the inner pages: "1, focus on details like steve jobs, put some really goood taste in it broooooooo". The conversation was compacted while the work ran.
- An agent audited all eleven inner pages at desktop and phone width, fixed what it found, and added a moment to a page only where the content earned it. Claude then reviewed the screenshots and made two fixes of its own.
- **Built:**
  - one twelve-column grid, with section titles pinned on inner pages; lines of about 70 characters; no single word stranded on a last line; consistent hover, focus and form states;
  - service detail headings in sentence case (154 headings, changed in `data.js` only);
  - How we work: the first 30 days drawn on the logo's O. Four week arcs light up as you read, and the point ends in the opening at the top, so the finished plan is the mark;
  - case pages: the engagement drawn on a one-year dial from the real timeline (HUB 8 months, Inspira 12), with no orange because it is not "now". Claude's fix: each team in the facts row sits on its own line;
  - Contact: errors appear when you leave a field, a confirmation replaces the form, and booking reads as the main path;
  - articles: a lead paragraph, a hanging pull quote, and a small O ending the last paragraph. Claude's fix: the contents list marks the section being read with the orange point;
  - Work, Industries and Insights got no special moment, on purpose.
- **Commits** on `feat/night` (01:18 to 01:19), pushed: `d01bfdd` (tested helpers `stepAt`, `ringStop` and `monthsIn`), `8791bd5` (sentence case), `d5c871f` (the craft pass) and `63c4acb` (handoff note). 41 tests pass.
- **Open:** the case dial and the small O ending articles may be undone. The sentence-case change must also be made in `serviceData.ts` before `data.js` is regenerated.

### 2.14 Writing it all down (01:27 to 01:50)

- The founder asked for the short version of the craft pass, then: "ok i want you to document everything that we have done so far, everything files in tmp and all dat, so to make sure we dont loose the context".
- Claude moved the QA tools into the repo with a guide (`69a4850`), saved dated screenshots of every page (`da0c0fa`) and brought HANDOFF up to date (`af90eb2`). It copied the raw transcripts and temp files into the private archive. An agent wrote this file and the private list of the founder's messages.
- The founder then said they would ask OpenAI Codex to carry on, and asked for instructions it could follow. Claude wrote `AGENTS.md`, a brief for any coding agent, linked from `CLAUDE.md` and the README (`b991d65`).

---

## Session 3: footer letter colour, project showcase and demo (2026-10-03)

- **Asked:** match the big footer EPOCH letter colour to footer-lab option 8, "One warm line".
- **Changed:** shared `.foot-mark` colour from ivory at 20% opacity to option 8's exact 12%. The existing dusk glow and scroll rise remain; this request changes the letter colour only.
- **Preserved:** the wordmark geometry and every footer-lab concept.
- Desktop and phone captures: `screens/2026-10-03/desktop-18-footer-soft-ivory.png` and `screens/2026-10-03/mobile-07-footer-soft-ivory.png`.

### Project showcase and document review

- **Asked:** make the website support EPOCH's ambition more strongly. The founder agreed to start on a project showcase and a working demo.
- **Built:** selected work moves directly below the home page's client strip. HUB has a larger editorial feature with selected deliverables, and Inspira has its own companion story. Work adds the existing challenge and scope. All client copy comes from the existing case studies; no results, quotes or product screens were invented.
- **Built:** `document-demo.html`, an editable fictional brief with sourced Project, Owner and Target results. Three samples cover complete, missing and conflicting information. Source buttons select the exact document line. Editing clears old results; reviewing recalculates them. All rendering treats document text as text.
- **Limit:** the demo deliberately says it reads labelled fields and has no live AI model. It demonstrates the review interaction, not model quality. Real AI integration requires a backend and model configuration. Approved project screens, confirmed outcomes, founder material and a booking link remain missing.
- **Validation:** 9 tests were written failing before the extraction helper, then passed. All 50 pure tests pass. The browser check covers keyboard operation, citations, edits, conflicting values, reset, safe rendering and reduced motion at desktop and phone widths. All 31 checked routes have no console errors or page overflow at 390px; the home marquee remains intentionally clipped. The contact form check and em-dash scan pass.
- **Status:** first pass for founder review. The larger showcase still needs real product imagery and confirmed results to become a complete evidence-led case study.

### Local AI review integration

- **Asked:** connect the document demo to a real AI model, keeping the key on the local server.
- **Built:** `POST /api/document-review` in the prototype server, using OpenAI Responses with a strict schema and configurable model (default `gpt-5-mini`). The backend verifies source quotes and cited values against the supplied text, then computes browser selection offsets. Missing and conflicting fields remain visible.
- **Interaction:** Review with AI is an explicit submission. Sample preview remains available and is labelled separately. Loading, connection failures, usage limits and retries have clear states. Editing or changing samples aborts the browser request and prevents late results from replacing newer text. A provider call already in progress can still finish and incur usage.
- **Boundary:** credentials stay in the server environment. Documents are not written to disk, API storage is disabled, and raw provider errors are not returned. Same-origin checks, body limits, one active review and request timeouts protect the local endpoint. It is not a public hosting setup.
- **Validation:** backend tests were written failing first. All 50 JavaScript and 18 Python tests pass. Headless browser checks cover AI success and failures with controlled responses, plus desktop, phone, keyboard and reduced motion. All 31 routes passed console and 390px page-width checks; the home logo strip is intentionally clipped. Contact form, lint, type checks and the em-dash scan passed. Screenshots record the honest disconnected state, not simulated model output.
- **Open:** no API key was available, so a real provider call and model-quality evaluation are still required. Setup instructions are in `tools/AI-REVIEW.md`.

---

## Session 4: discovery, project reading and contact (2026-10-03)

- **Asked:** park the AI demo until the ML engineer supplies details, research stronger references, and complete the UI/UX improvements across the prototype.
- **References reviewed:** [Linear](https://linear.app/) for showing the product alongside its explanation; [Work & Co](https://www.work.co/) for giving individual projects space; [Instrument](https://www.instrument.com/) for deliberate shifts in type and visual scale; [Anthropic](https://www.anthropic.com/) for separating a concise positioning statement from its supporting explanation. These are design observations from the rendered sites, not claims about their conversion performance. External assets and client facts were not imported.
- **Built:** three service starting points: automate a workflow, build an AI product and modernise a platform. Each shows a route through the work, links to existing capabilities and an existing case study, and carries the chosen goal into Contact. Home links into these routes directly.
- **Built:** both Work projects now receive full editorial features. Challenge/build/integration tabs use the existing case-study text. Inspira has an ivory scope panel, while HUB stays dark. No product screenshots, metrics or architecture diagrams were invented. About gets a distinct composition, larger working principles and a two-location section. The founder preferred the confidence of "We don’t do half-in.", so that headline was restored during review.
- **Built:** a shorter Contact page with the brief first and optional details inside a disclosure. Service and goal selections arrive as editable context. The call action truthfully opens an email until a booking URL is configured. The form previews the supplied brief, explicitly says nothing was sent, and keeps all typed values when the visitor returns to edit.
- **Polish:** visible phone contact action, menu focus containment and Escape, section navigation on long service and case pages, balanced headings, larger touch targets, and removal of three unused font families from site pages. Logo and footer geometry and all lab concepts are preserved.
- **Validation:** five context tests were written failing first. The browser journey check covers direct goal links, keyboard tabs, context removal, optional fields, safe text rendering, retained drafts, scope tabs, menu focus, section links and reduced motion at desktop, 390px and 320px. All 55 JavaScript and 18 Python tests passed. All 31 routes passed console and 390px overflow checks; only the intentionally clipped home marquee extends beyond its container. Contact form, document demo, lint, type checking and the em-dash scan also passed.
- **Still open:** approved project screens, confirmed client results, founder photo/bio and the booking URL. The ML demo is parked. These content gaps do not block the completed interface changes.

---

## Session 5: fresh identity studies (2026-10-03)

- **Brief:** explore a different identity from the existing clock work, with Linear among the references. The founder still likes the current site logo. This authorises independent symbols and lettering in a separate lab; no replacement has been selected.
- **Branch:** `feat/logo-studies`, from `feat/night` at `97e2bdb`. The existing site and all earlier logo and footer concepts are retained.
- **Research:** [Linear’s brand guidelines](https://linear.app/brand) for monochrome presentation and space; [IBM’s history of Paul Rand’s logo](https://www.ibm.com/history/logo) for a repeated visual rule; [Pentagram’s MIT Media Lab identity](https://www.pentagram.com/work/mit-media-lab/story), led by Michael Bierut, for shapes built on a consistent grid. These informed design principles. Reference brand assets were not imported.
- **Built:** `identity-lab.html`, linked from both earlier logo labs. Cut is a solid E with diagonal terminals. Phase offsets two semicircles to suggest a change of era. Threshold opens a corner of an architectural block. Common is custom geometric lowercase lettering with an e symbol. Each has a large specimen, a website composition, reversed colour, actual 16/24/32px icons and downloadable SVGs. All exported artwork uses vector paths rather than external fonts. This page has no new JavaScript or motion.
- **Review:** Phase was initially proposed as a starting point. The founder subsequently rejected all four concepts and requested the colour round below. Retain this round for the archive, not as the preferred direction.
- **Validation:** all 55 JavaScript and 18 Python tests passed. All 32 routes passed console and 390px overflow checks, with only the intentionally clipped home marquee exempted. The contact form passed empty, bad-email and valid-input checks. The new lab was inspected at desktop, 390px and 320px, including visible keyboard focus and reduced motion. All 11 SVG downloads returned successfully and parsed as SVG; the em-dash scan passed. Screenshots are recorded in the dated screen catalogue.

---

## About heading overlap fix (2026-10-03)

- **Reported and reproduced:** "What we believe" crossed its child titles while scrolling back up on desktop. The UI pass changed this section to stacked rows, but the shared sticky-heading rule still applied above 900px.
- **Fixed:** the beliefs heading uses static positioning, keeping it above its rows. This is a scoped CSS override on `feat/logo-studies`; other section headings and the logo studies are unchanged.
- **Validation:** headless Chrome checked the heading and every row after scrolling down and back up at 1440px, 1024px, 901px, 900px and 390px. The heading remained above all rows at every offset. Desktop and phone screenshots were inspected. All 55 JavaScript and 18 Python tests, the contact form and the em-dash scan passed.

---

## Colour identity studies (2026-10-03)

- **Brief:** the founder rejected Cut, Phase, Threshold and Common, and asked for something different with dual colour or gradients. This explicitly opens up the earlier monochrome and orange-only restrictions for the exploration. The site identity is not being replaced.
- **Research:** [Mozilla’s Firefox identity account](https://blog.mozilla.org/opendesign/firefox-the-evolution-of-a-brand/) for layered gradients and related shapes, and [Pentagram’s Cohere identity](https://www.pentagram.com/work/cohere) for a more expressive technology identity. These informed the exploration; source brand assets were not imported.
- **Built:** `identity-color-lab.html`, linked from all three earlier logo labs. Afterlight puts a rose/amber/violet O within wide custom lettering. Prism is a folded coral/violet form. Current interlocks mint/violet ribbons beside rounded lettering. Voltage uses slanted letterforms split into ice blue and pink. Each includes a website composition, 16/24/32px specimens and a keyboard-accessible one-colour disclosure. The 16 downloadable SVGs cover colour and monochrome symbols and logos; lettering is drawn as paths with no external font dependency.
- **Boundary:** all earlier concepts are retained. The site's living logo, Night palette and About overlap fix remain in place. There is no new animation or JavaScript. None of the new directions has a founder verdict yet.
- **Validation:** all 55 JavaScript and 18 Python tests passed. All 33 routes passed console and 390px overflow checks, with the intentionally clipped home marquee exempted. The contact form passed. SVG IDs, gradient/clip references, section anchors, keyboard disclosure and expanded one-colour layouts were checked at 1440px, 390px and 320px. All 16 SVG files were fetched and parsed. Desktop and phone screenshots, including reduced motion, were inspected. The em-dash scan passed.

---

## Logo concepts at a glance

| Concept | Where it lives | The idea | Founder's verdict |
| --- | --- | --- | --- |
| Logo 1, dot in the O | `c6a3e70` | The O open at the top, with a dot | Picked first, then dropped for logo 2. Tried on the giant footer wordmark and reverted. Its geometry lives on in 08. |
| Logo 2, ring and dot beside the name | Site logo from 2026-10-02 01:11 to 20:37 | A separate symbol next to the wordmark | Chosen with Draftsman. Replaced by 06, then by 08. |
| Logo 3, wordmark only | `c6a3e70` | The name alone | Not chosen. The plain wordmark is still the giant footer mark. |
| A to E | `logos.html` | Zero point, The overrun, The extra mile, In focus, New era | The founder asked for something out of the box instead. |
| Long exposure, Harmonograph, Growth rings | First version of `marks.html`, never committed | Pictures beside the name | Rejected. |
| 01 Now | `marks.html` | A ring whose opening points to the time of day | Liked. |
| 02 Daylight, 03 Weight of the day, 04 Timestamp | `marks.html` | Effects on the letters, and a binary time strip | "not that much interestig". Kept on the page. |
| 05 Sundial, 07 Twenty-four hours | `marks.html` | Shadows that move with the sun; letter weight tracing the last day | No verdict. |
| 06 Tonight's moon | `marks.html`; site logo for about 20 minutes (`2567b4f`) | Tonight's real moon phase in the O | Put on the site, then replaced by 08. |
| 08 In the name | `marks.html`; site logo since `fa5cb0c` | The O of EPOCH is 01's clock | Liked. The current site logo. |
| 09, 10, 12, 13, 14, 15 | `marks.html` | Display, Overrun, Engraved, Full circle, Totality, On the minute | Rejected as ugly. |
| 11 Hour and minute | `marks.html` | An hour opening plus a minute cut | Liked. |
| 16 to 22 | `marks.html` ("All in.") | 08 and 11 combined, Parallel lines, Slashed zero, One orange letter, Stencil, Flip, Wandering point | No verdict yet. |

---

## Rules and taste learned

These are the founder's durable preferences, with the reason and when they were learned.

1. **No em dashes, anywhere.** Not in copy, titles, labels or alt text, and keep docs and commit messages free of them too. Titles use " | ". Sentences use commas, colons or full stops. Why: "em dashes feels like AI"; they make the brand read as machine-written. (2026-10-02)
2. **Never invent client metrics, quotes, testimonials or facts.** Testimonials render only when real ones exist. Any claim Claude derives (a price, a timeline, an industry mapping) is flagged for the founder to confirm. Why: vague results and "[Testimonial pending]" were the old site's problem, and real proof is what sells. (2026-10-01)
3. **Show built pages, not descriptions.** For a choice, build the options side by side, as `marks.html` and `footer-lab.html` do. Why: "build it ill just review the page directly" and "i need visuals of all options to decide which option please my eyes". (2026-10-01, 2026-10-02)
4. **Short, plain answers.** Two or three lines, no jargon. Why: the founder asked for the short version five times, and said "ask me in simple lingo". (2026-10-01, 2026-10-02)
5. **Ask decisions as multiple choice, with previews.** Ask only what changes the direction. Why: these got fast, clear answers. A typed answer to such a question is a decision too, as with "Ok lets try Night, but ...". (2026-10-01)
6. **Commit and push everything.** Why: the founder wants nothing lost ("commit/save everything we have done so far make sure we dont loose anything", "yes push that to remote"). (2026-10-01, 2026-10-02)
7. **A new branch for each design direction, and a tag on the old one.** Why: "dont work on the same branch, commit what we built and move on to new branch". The light site was tagged before Night began. (2026-10-01, 2026-10-02)
8. **Headless Chrome only.** Never drive the founder's own browser. Why: the founder stopped Claude twice when it took over their Chrome. (2026-10-01)
9. **No Next.js port until the founder says so.** Why: "continue dont port it into next js tho", repeated in the first message of session 2. (2026-10-01, 2026-10-02)
10. **Snapshot uncommitted work before overwriting anything.** Why: the founder's edits in seven areas were lost. (2026-10-01)
11. **Keep every exploration. Add, never remove.** Why: "keep these 4 tho", "keep all of the current work intact" and "KEEP ADDING DO NOT REMOVE". (2026-10-01, 2026-10-02)
12. **The logo keeps time in itself.** No picture beside the name. Keep one thing fixed and let one real signal, time, change the mark. A readable analog clock built into the ring or the O works (01, 08, 11). Effects on the letters, digital looks, text and odd shapes failed. (2026-10-01, 2026-10-02)
13. **Research the best first, then create.** Why: "do google take some inspirations, consider some examples and then create", and take inspiration "from people who are really great at making brand logos that stand out". (2026-10-01, 2026-10-02)
14. **Aim for frontier-AI polish: professional and out of the box.** xAI and OneSix are references, not limits: "it doesnt necessarily have to only those 2 refs". (2026-10-01)
15. **Good taste means restraint and legibility.** The founder kept choosing the quieter option: the plain footer wordmark, "Nothing" in the footer corner, option 6 over louder ones. A look was turned down because "EPOCH is not visible as it should be". The bar for detail: "focus on details like steve jobs". (2026-10-01, 2026-10-02)
16. **Cut what isn't important.** The office hours ("its not important"), the footer clocks and the "EPOCH or nothing." section all went. (2026-10-02)
17. **Don't lean on Claude's favourites.** The founder often chose something else: A with logo 1 (switched within minutes), `logos.html` B, marks 09, 12 and 14, the seconds counter, Lit by the O, and footer option 7. Offer options evenly and show them. (2026-10-01, 2026-10-02)
18. **Serve the prototype with `prototype/serve.py`.** It turns caching off. Why: the founder once thought a change was missing because the browser had cached old files. (2026-10-01)
19. **Engineering rules from the founder's global settings:** test first, atomic conventional commits (`type(scope): description`), no Co-Authored-By lines, never commit to `main`, keep the docs current, and compact the conversation at half its context. (Both sessions)

Design rules Claude set in the Night and craft-pass briefs, which the founder has not overruled:
- Orange `#ff4f00` means "now" only: the logo's point, the live time, the section being read. Never decoration.
- Mono type only for real data, such as times and coordinates.
- No ALL-CAPS labels above headings, no arrows on buttons, and no fade-up entrance on every section.
- At most one signature moment per page, and only where the content earns it.
- Works at 390px wide with no sideways scroll, shows keyboard focus, respects reduced motion, and logs no console errors.
- Pure logic lives in `kept-time.js` and is written test first.

---

## Session 6: Next.js port with regression checks (2026-10-03)

The founder authorized porting everything to Next.js on a separate feature branch and asked for the animations and behavior to remain intact. `feat/next-night` starts from the accepted mobile baseline, `b0c08b6`. The static prototype remains frozen for comparison.

Built server-rendered React pages for all page families, shared Night chrome, accessible React goal/project tabs and reading navigation. Preserved the original CSS, clock geometry and motion enhancements. Next serves the fonts locally. Native anchors retain the O page reveal and browser history. All five concept labs remain complete static archives. Old links redirect to the corresponding Next routes, including enquiry parameters; missing detail pages return 404.

Contact retains the accepted draft-preview behavior. The existing Resend endpoint is retained. The optional document review moved from Python to a Next/Node route with the same provider contract and validation; model changes remain parked. Automated tests use controlled provider responses, with no live API calls.

Compared 36 routes against the prototype at desktop and phone widths. Fixed the regressions this caught: escaped noscript markup causing hydration errors, missing article closing sections, and a lab navigation link changed by route conversion. Confirmed responsive layout at 320, 390, 430, 768 and 1024px, keyboard and touch flows, form validation, demo states, clock winding, scrolling effects, page transitions, history and reduced motion. Headless screenshots are saved with the `next-` prefix. This is a framework port; no new visual direction or business claims were introduced.


## Session 7: production release (2026-10-03)

The founder approved merging the Night port into `main` so live visitors can use it. Release checks found that Vercel had rejected earlier preview builds and the installed Next.js version had known security issues. Updated Next.js and its matching lint/analyzer packages to 15.5.27 within the existing major version, then reran build and regression checks. The hosting log then identified the actual failure: the dashboard install command used `npm install --production`, omitting TypeScript and other build tools. Added `vercel.json` with `npm ci --include=dev` to override that command, and pinned Node to 22.x to match the project setting. The security update remains, but was not the cause of this build failure.

A fresh Node 22 production-mode install and build passed with the corrected command. Vercel preview `CfzY8Zu7EJJ8yVLY5suwbKpAfHAi` then succeeded, clearing the approved merge into `main`. The release uses the existing Vercel integration and domain, https://epoch.sh. No separate hosting provider or new design is introduced. The Contact preview and parked AI scope remain as accepted.


## Session 8: official client logos (2026-10-03)

The founder reported HUB missing across the site and requested the real OneSix logo. The old HUB PNG had no alpha channel: the white-logo filter flattened its white background and lettering into a solid rectangle. Replaced the shared HUB references with a transparent official asset and replaced OneSix’s text fallback with its official logo. No logo was redrawn. Both keep the accepted monochrome client treatment, and the source files are stored locally without hotlinking.

Official sources, retrieved 2026-10-03:

- `public/logos/hub-logo.png`: [HUB careers](https://careers.hubinternational.com/), [original PNG](https://cdn.phenompeople.com/CareerConnectResources/HULHICUS/images/HUBLogo_H_FullColor_RGB-1789143138996.png).
- `public/logos/onesix.avif`: [OneSix homepage](https://www.onesix.ai/), [original AVIF](https://cdn.prod.website-files.com/69d725709c508aa57a7f5224/69d7861d3ec010cda98b4472_onesix-logo.avif).

The frozen prototype retains its old assets. The catalogue test allows only these approved logo substitutions. Verified desktop and phone appearances across Home, Work, the HUB case study and insurance proof. Saved screenshots use the `client-logos-` prefix. All 202 unit tests, lint, TypeScript, the production build, contact form and 36-route responsive checks pass. Browser checks also verify logo loading, transparent pixels and readable dimensions, since a successful image request alone did not catch the original opaque rectangle.


## Rejected, do not repeat

1. **The Epoch Field neural-network hero, and acid green on near-black** (2026-10-01). "cringe", not professional, and below the ambition. It read as a stock "AI network" look.
2. **The original EPOCH logo** (2026-10-01). It didn't match the website or the ambition.
3. **Logo ideas tied to the website's style** (`logos.html` A to E, 2026-10-01). The founder wanted something out of the box that "passes time itself".
4. **A picture beside the name as a logo** (Long exposure, Harmonograph, Growth rings, 2026-10-01). The same idea with a different picture in front.
5. **Effects on the letters** (02 Daylight, 03 Weight of the day, 04 Timestamp, 2026-10-01). "not that much interestig". They stay on the marks page, but they are not the direction.
6. **Digital, text and odd-shaped marks** (09 Display, 10 Overrun, 12 Engraved, 13 Full circle, 14 Totality, 15 On the minute, 2026-10-02). Rejected as ugly and samey. Three of them were Claude's favourites.
7. **A dot in the giant footer wordmark,** in orange or light orange (2026-10-01). Reverted to the plain wordmark.
8. **The full-screen "EPOCH or nothing." section on the home page** (2026-10-02). "it looks ugly".
9. **Office hours on the Contact page** (2026-10-02). "not important".
10. **Office clocks, or any extra, in the footer's bottom row** (2026-10-02). The founder chose "Nothing" over a seconds counter, the moon and a back-to-top link.
11. **Footer lab round 1** (Lit by the O, Horizon glow as first built, Cursor light, Slow embers, 2026-10-02). "didnt like any of this". The glow was liked a little, but the letters must stay readable.
12. **The white "whiteboard" look as the final look** (2026-10-02). It is tagged as `light-site-2026-10-02`, not deleted.
13. **Driving the founder's own Chrome** (2026-10-01).
14. **Long written designs for approval** (2026-10-01). Build the page instead.

---

## Still open

- **The logo.** 08 is on the site on trial ("let me see how it goes"). There is no verdict on 16 to 22, and the research ideas in HANDOFF section 6 are unbuilt.
- **Judgement calls the founder may undo:** the ivory (not orange) AI step in case sketches and card brackets, the one-year case dial, the small O ending articles, and the footer glow's scroll rise, which the founder found not very effective.
- **Claims to confirm** (HANDOFF section 7): "Most projects start at $25,000"; the pricing structure; 3 to 4 weeks to a prototype and 8 to 16 weeks to production; the 30-day plan and "one accountable lead"; the industry mapping (Destify, IDrive and OneSix are not mapped); the three Insights drafts, their dates and the "EPOCH" byline.
- **Real proof the founder owes:** numbers for the HUB and Inspira case studies; client quotes; what EPOCH built for OneSix AI (official logo sourced in session 8); a founder photo, bio and team; certifications or partnerships, only if true; a Calendly or Cal.com link for `BOOKING_URL`.
- **The Next.js port,** only when the founder says so (HANDOFF section 10). It must carry the sentence-case headings into `serviceData.ts` and drop the office hours.
- **Known issues** (HANDOFF section 8): the contact API puts visitor input into the email without escaping it; the `.husky/commit-msg` check never runs; `@svgr/webpack` is referenced but not installed; Tailwind is installed but unused.
- **A question for the founder:** what `draft/content-updates` is for.
- **Suggested, never built:** a sticky "Book a call" bar on phones; a branded link preview card; privacy, terms and security pages; the "Day and night" look.

---

## Commit map

All times are on the commit, in IST. Each branch also contains the branches above it in this table.

| Commit | Time | Branch | What |
| --- | --- | --- | --- |
| `5481072` | 2026-01-29 17:07 | `main` | Last commit of the original site |
| `7d94918` | 2026-10-02 00:40 | `feat/ai-first-upgrade` | jest-dom types and browser mocks |
| `0bc7caf` | 00:40 | `feat/ai-first-upgrade` | Services organised AI-first; three retired |
| `a032a0d` | 00:40 | `feat/ai-first-upgrade` | Honest case studies, OneSix AI, one contact source |
| `a38a7d1` | 00:41 | `feat/ai-first-upgrade` | Design system, site chrome, shared components |
| `0b4280b` | 00:41 | `feat/ai-first-upgrade` | AI-first homepage with the Epoch Field |
| `df52a02` | 00:41 | `feat/ai-first-upgrade` | Two-tier services index and detail pages |
| `89ec7b8` | 00:41 | `feat/ai-first-upgrade` | Reachable case studies and a work index |
| `b5292be` | 00:41 | `feat/ai-first-upgrade` | Beliefs-led About, validated Contact form |
| `6847335` | 00:42 | `feat/ai-first-upgrade` | Remove the unused wormhole hero, hooks, starter assets |
| `e40ffa3` | 00:42 | `feat/ai-first-upgrade` | Pre-commit hook passes with no JS or TS staged |
| `a9309d7` | 00:42 | `feat/ai-first-upgrade` | README and CLAUDE.md for the AI-first site |
| `c6a3e70` | 01:09 | `feat/epoch-identity` | Static prototype with three looks and three logos |
| `decb1a2` | 04:40 | `feat/epoch-identity` | Draftsman and logo 2 locked in; new pages; UI pass |
| `22311ff` | 04:40 | `feat/epoch-identity` | `logos.html`, `marks.html` 01 to 07, `marks.md` |
| `e82ad64` | 04:40 | `feat/epoch-identity` | First handoff, QA tools, backup of lost edits |
| `0fd3f3a` | 15:25 | `feat/epoch-identity` | Marks 08 to 15 and `kept-time.js` |
| `61fdbf7` | 15:44 | `feat/epoch-identity` | Em dashes removed from titles and copy |
| `8e0d908` | 16:06 | `feat/epoch-identity` | Marks 16 to 22 |
| `2567b4f` | 20:37 | `feat/epoch-identity` | Tonight's moon as the site logo |
| `fa5cb0c` | 20:56 | `feat/epoch-identity` | Mark 08 as the site logo |
| `0d98d48` | 21:21 | `feat/epoch-identity` | Logo wind-up, live O hero, office times, shorter menu |
| `2d077c9` | 21:54 | `feat/epoch-identity` | Office hours dropped; tagged `light-site-2026-10-02` |
| `340ee64` | 22:39 | `feat/night` | Night |
| `4dafbf5` | 23:18 | `feat/night` | Footer shows only the copyright |
| `66dc5a9` | 23:20 | `feat/night` | "EPOCH or nothing." section removed |
| `d1dda73` | 23:31 | `feat/night` | Footer lab, round 1 |
| `49a2dd0` | 23:36 | `feat/night` | Footer lab, round 2 |
| `ff861ad` | 23:42 | `feat/night` | Option 5, sunset-lit footer wordmark |
| `481e118` | 23:44 | `feat/night` | Option 6, dusk glow behind the footer wordmark |
| `756e6a0` | 23:49 | `feat/night` | The dusk rises as you scroll |
| `d01bfdd` | 2026-10-03 01:18 | `feat/night` | Helpers for reading steps, ring stops, timeline months |
| `8791bd5` | 01:18 | `feat/night` | Sentence case for service detail headings |
| `d5c871f` | 01:19 | `feat/night` | Craft pass on the inner pages |
| `63c4acb` | 01:19 | `feat/night` | Handoff note for the craft pass |
| `69a4850` | 01:46 | `feat/night` | QA tools kept in the repo, with a guide |
| `da0c0fa` | 01:46 | `feat/night` | Dated screenshots of every page |
| `af90eb2` | 01:50 | `feat/night` | Handoff brought up to date |
| `b991d65` | 01:50 | `feat/night` | `AGENTS.md` brief for any coding agent |

---

## Agents used

| When | Agent | Asked to | Delivered |
| --- | --- | --- | --- |
| 2026-10-01 23:17 | Map EPOCH site structure | Map routes, components, styling, content, tooling and problems | The map, with warnings about 18 uncommitted files and about 6,500 lines of dead code |
| 2026-10-02 00:04 | Build services pages | The two-tier index and detail pages, test first | Done, 16 tests. Flagged the missing jest-dom types (fixed in `7d94918`) |
| 00:04 | Build work and case study pages | The Work index and case study page, test first | Done, 11 tests |
| 00:04 | Build about and contact pages | The beliefs-led About and the validated form, test first | Done, 21 tests. Kept the PST office hours and flagged them |
| 01:24 | Build Insights pages and articles | An index, an article page and three articles, with no invented facts | Done. Flagged its picked dates, the byline and the 30-day claims |
| 01:25 | Build Industries and How we work | Four industry pages and How we work | Done. Flagged $25,000, pricing, timelines and the industry mapping |
| 15:36 | Research master logo designers | Tricks of great logo designers, with sources, and seeds for EPOCH | A brief: great marks build one idea into the mark; 9 seeds |
| 15:36 | Research time-keeping designs | Remarkable watch, clock and live-data designs, with sources | A brief: no live-time brand mark found; 10 seeds |
| 22:08 | Build the Night redesign | The dark theme and the seven details | Done, 33 tests, no console errors |
| 23:57 | Craft pass on the inner pages | A detail pass on every inner page | Done, 41 tests |

An eleventh agent wrote this file from the session transcripts.

---

## Adding to this file

- Add a new "Session N" section with the session id and dates. Use the same shape for each phase: what was asked, built and shown, the verdict, what was kept or rejected, and the commits.
- Update the concept table, the commit map and the three lists (rules, rejected, still open).
- Same writing rules as the rest of the docs: plain English, short sentences, exact founder quotes only where the wording carries a rule, no em dashes, and nothing private.
