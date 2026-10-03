# CLAUDE.md

Read `AGENTS.md`, `docs/handoff/HANDOFF.md`, `docs/handoff/HISTORY.md` and `docs/handoff/tools/README.md` first.

## Current work

The founder authorized porting the accepted Night prototype into Next.js on a separate branch. The approved release is on `main`; continue development on feature branches. The port was built on `feat/next-night` from the mobile-compatible prototype at `b0c08b6`. The prototype remains the visual and behavioral reference. Further logo, illustration, photography and AI model work are parked.

## Architecture

- Next.js 15 App Router, React 19, strict TypeScript.
- `app/`: routes, metadata, fonts and API boundaries.
- `src/night/pages/`: server-rendered Night pages.
- `src/night/Chrome.tsx`, `Blocks.tsx`: shared content and exact wordmark geometry.
- `src/night/Explorers.tsx`, `ReadingGuide.tsx`: interactive React tabs and reading navigation.
- `src/shared/constants/`: original service and case-study content.
- `src/night/content.ts`: existing goals, industries and articles.
- `styles/night/`: accepted global CSS. Next serves Host Grotesk and IBM Plex Mono locally.
- `public/night/`: tested browser motion and demo enhancements, loaded after hydration by `Runtime.tsx`.
- `public/labs/`: every static logo and footer concept, preserved in full.
- `prototype/`: frozen static reference, served at port 3460.

Native anchors preserve the cross-document O reveal and browser history. Do not replace them with client navigation without equivalent lifecycle and animation checks. Keep orange meaningful, reduced motion respected, keyboard focus visible and phones free from sideways scroll.

Contact remains an honest enquiry preview. The old Resend endpoint is retained but the Night form does not send to it. The document demo retains its optional local-only review, now served by Next at `/api/document-review`. Live provider verification is still pending; no model changes are authorized.

## Run and verify

`npm run dev` uses port 3000 and `.next-dev`. `npm run build && npm start` serves the production build from `.next`. `python3 prototype/serve.py` starts the reference on port 3460.

Run Jest, lint, TypeScript, production build, prototype helper tests and the browser checks in the QA guide. `next-parity.mjs` compares both sites across all routes. `next-motion-check.mjs` exercises clocks, scroll behavior, native transitions, history and reduced motion. Use isolated headless Chrome only.

Never commit to main. Commit and push completed work on the feature branch. Update the handoff and history. No em dashes, invented client claims, private notes or credentials in this public repository.
