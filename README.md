# EPOCH website

The marketing site for EPOCH Software Services: an AI-first engineering company. Built with Next.js 15 (App Router), React 19, TypeScript and CSS Modules.

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
```

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build (stop the dev server first; both write to `.next`) |
| `npm test` | Jest + Testing Library |
| `npm run type-check` | `tsc --noEmit` |
| `npm run lint` | ESLint |

The contact form sends email through Resend and needs `RESEND_API_KEY` in the environment.

## Pages

| Route | What it is |
| --- | --- |
| `/` | Home: the commitment, the Epoch Field, clients, services, selected work |
| `/services` | Services in two tiers: **AI** first, then **Engineering that makes AI real** |
| `/services/[id]` | One page per service (9 in total) |
| `/clients` | Work: case studies and every client logo |
| `/clients/[id]` | Case studies (HUB International, Inspira Financial) |
| `/about` | Beliefs, how an engagement runs, offices, tech stack |
| `/contact` | Project inquiry form plus direct contact details |

Blockchain, IoT and AR/VR are no longer offered. Their old URLs (`/services/blockchain`, `/services/iot`, `/services/arvr`) permanently redirect to `/services` (see `next.config.ts`).

## Editing content

Copy and data live in `src/shared/constants/`, so most edits never touch a component:

| File | Holds |
| --- | --- |
| `services.ts` | The service catalog, its tiers, and retired service ids |
| `serviceData.ts` | Full content for each service detail page |
| `clientData.ts` | Case studies. Add a `testimonial` only when you have a real quote; the section stays hidden until then |
| `content.ts` | Client logos (shown in this order) and the homepage commitments |
| `contact.ts` | Email, phone, social links and office addresses |

A client without a logo file (currently OneSix AI) renders as a typographic wordmark. To use a real logo, add the file under `public/logos/` and set its `logo` path in `content.ts`.

## Design system

- **Tokens** live in `app/globals.css`. The palette comes from the logo: `--night` (page), `--moss` (structure), `--reseda` (secondary text), `--bone` (primary text) and `--signal` (yellow-green, reserved for the training pass and the primary action).
- **Type** is Archivo (variable width): extra-wide and heavy for statements, normal width for reading. IBM Plex Mono appears only on the field's live readout.
- **Primitives** (`styles/Primitives.module.css`): container, section spacing, display/heading/lede/body text styles.
- **Shared components** (`src/components/ui/`): `ActionLink`, `ClientMark` (logo plate), `ServiceList`, `CaseStudyCard`, `OfficeList`. Page endings and 404s come from `src/components/sections/`.

## The Epoch Field

The animated network in the homepage hero (`src/components/field/`). In machine learning an *epoch* is one full pass over every example in the training data. The field shows that: each pass sweeps through the network layer by layer until every node is reached, the epoch counter ticks up and the loss falls. The cursor bends nearby nodes.

- `fieldModel.ts`: pure, tested model (seeded network layout, pass timing, loss curve)
- `drawField.ts`: stateless canvas drawing
- `fieldLoop.ts`: sizing, timing, pointer tracking; pauses when off screen or in a background tab, runs at 30fps on small screens
- Visitors who prefer reduced motion see a single, fully trained frame
