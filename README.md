# EPOCH website

EPOCH Software Services' marketing site, built with Next.js 15, React 19 and TypeScript. The accepted Night redesign is ported on **`feat/next-night`**, branched from the mobile-compatible prototype at `b0c08b6`.

Read [AGENTS.md](AGENTS.md), then [the handoff](docs/handoff/HANDOFF.md) and [history](docs/handoff/HISTORY.md). The design remains ivory on black with the live clock wordmark, orange for "now", and the warm ivory footer. Logo exploration, illustrations, photography and further AI work remain parked.

## Run

Use Node.js 22. Vercel installs with `npm ci --include=dev` from `vercel.json`, so TypeScript and the other build tools are available even in the production build environment.

```sh
npm ci
npm run dev       # http://localhost:3000
```

For production checks, run `npm run build` and `npm start`. Development uses `.next-dev`; production uses `.next`. The static reference is still available with `python3 prototype/serve.py` at http://localhost:3460.

## Pages

| Route | Content |
| --- | --- |
| `/` | Home |
| `/services`, `/services/[id]` | Goal explorer and nine services |
| `/work`, `/work/[id]` | Project walkthroughs and two case studies |
| `/industries`, `/industries/[id]` | Industry index and four detail pages |
| `/insights`, `/insights/[id]` | Index and three articles |
| `/how-we-work` | Engagements and the first 30 days |
| `/about` | Beliefs, offices and technology |
| `/contact` | Enquiry preview and direct contact details |
| `/document-demo` | Sample preview and optional local AI review |
| `/labs/*.html` | All five original logo and footer labs |

Prototype `.html` URLs redirect to the corresponding Next routes, preserving enquiry queries and fragments. The former `/clients` routes redirect to `/work`. Retired service URLs still redirect to `/services`. Unknown detail IDs have real 404 responses.

## Editing

- `src/night/pages/`: server-rendered page content.
- `src/night/Chrome.tsx` and `Blocks.tsx`: shared header, footer, logo geometry and content blocks.
- `src/night/Explorers.tsx` and `ReadingGuide.tsx`: React tabs and section navigation.
- `src/shared/constants/`: services, case studies, client logos and contact information.
- `src/night/content.ts`: existing goals, industry content and articles, carried over from the prototype.
- `styles/night/`: the accepted CSS, imported by `app/globals.css`. Host Grotesk and IBM Plex Mono are self-hosted through Next's font loader.
- `public/night/`: the tested time helpers, motion enhancements and document-demo browser code.
- `src/night/Runtime.tsx`: loads those enhancements after hydration, once per document.
- `public/labs/`: complete, preserved static concept archives. Never remove a concept.

Native anchors are intentional: they preserve the existing cross-document circle reveal and browser scroll restoration. Touch devices and reduced-motion visitors keep immediate navigation. Page content is rendered by React; the motion script does not build or replace pages. The older `src/components/` and CSS Modules remain as the previous implementation and are not used by Night routes.

The prototype stays frozen as the comparison reference. When changing pure clock or geometry logic, write its failing test first in `prototype/tests/`, update the corresponding helper and keep the runtime copy in sync.

## Forms and AI

The accepted Contact flow **previews an enquiry without sending it**. Its direct email and phone links work normally. The existing `/api/contact` Resend endpoint remains available, but this preview does not call it.

The document demo's sample preview runs locally in the browser. `/api/document-review` ports the existing optional review to Node, preserving its model, evidence validation, limits and local Host/Origin checks. No Python server is needed for Next. See [AI setup and limits](docs/handoff/tools/AI-REVIEW.md). Live model verification remains pending.

## Check

```sh
npm test -- --runInBand
npm run lint
npm run type-check
npm run build
node --test 'prototype/tests/*.test.js'
python3 -m unittest discover -s prototype/tests -p 'test_*.py'
```

With the Next production server on port 3000:

```sh
BASE_URL=http://localhost:3000 node docs/handoff/tools/journey-check.mjs
BASE_URL=http://localhost:3000 node docs/handoff/tools/responsive-check.mjs
BASE_URL=http://localhost:3000 node docs/handoff/tools/demo-check.mjs
BASE_URL=http://localhost:3000 node docs/handoff/tools/formcheck.mjs
node docs/handoff/tools/next-motion-check.mjs
node docs/handoff/tools/next-parity.mjs
```

Parity also requires the prototype on port 3460. It compares all 36 routes at 1440px and 390px, including visible text, heading positions, document height, image loading, fragments and console errors. The responsive check covers 320, 390, 430, 768 and 1024px plus touch, keyboard and orientation changes. Tests use isolated headless Chrome, not the founder's browser. Full instructions are in [the QA guide](docs/handoff/tools/README.md).
