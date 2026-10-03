# Screens

Dated snapshots of the prototype, so anyone can see what the site looked like at each point without running it. Each folder is one date. Screens show `feat/night` unless an exploratory branch is named below.

To see an older state live instead, check out its commit or tag (for example `light-site-2026-10-02`) and run `python3 prototype/serve.py`.

## 2026-10-03: Night, after the inner-page craft pass (commit 63c4acb)

Desktop shots are 1440 × 900 and phone shots are 390 × 844 at 2x.

| File | What it shows |
| --- | --- |
| `desktop-01-home-hero.jpg` | Home: the hero, with the logo's O drawn as a live 24-hour clock |
| `desktop-02-home-footer.jpg` | Home: the footer, with the giant wordmark over the dusk glow (footer-lab option 6) |
| `desktop-03-services.jpg` | Services index |
| `desktop-04-service-detail.jpg` | A service page (AI & Machine Learning) |
| `desktop-05-work.jpg` | Work index |
| `desktop-06-case.jpg` | A case page (HUB International) with the one-year dial |
| `desktop-07-industries.jpg` | Industries index |
| `desktop-08-industry.jpg` | An industry page (insurance) |
| `desktop-09-how-we-work.jpg` | How we work, top |
| `desktop-10-how-we-work-ring.jpg` | How we work: the first 30 days finished as the logo |
| `desktop-11-insights.jpg` | Insights index |
| `desktop-12-article.jpg` | An article, top |
| `desktop-13-about.jpg` | About, top |
| `desktop-14-about-beliefs.jpg` | About: the beliefs |
| `desktop-15-contact.jpg` | Contact |
| `desktop-16-logo-concepts.jpg` | `marks.html`, the logo concepts page |
| `desktop-17-footer-lab.jpg` | `footer-lab.html`, the footer options the founder chose from |
| `mobile-01-home.jpg` to `mobile-06-contact.jpg` | Home, Services, the 30-day ring, a case page, an article and Contact on a phone |

### Footer letter colour update

`desktop-18-footer-soft-ivory.png` and `mobile-07-footer-soft-ivory.png` show the giant wordmark using footer-lab option 8's ivory at 12% opacity, with the existing dusk glow and scroll rise. Earlier screenshots above retain the previous 20% letter opacity.

### Project showcase and document demo

- `desktop-19-work-showcase.png` and `mobile-08-work-showcase.png`: the larger HUB feature, built from existing case-study content.
- `desktop-20-document-demo.png` and `mobile-09-document-demo.png`: the editable fictional source document and results.
- `desktop-21-demo-conflict.png`: conflicting dates, with both source references retained.
- `desktop-22-home-showcase.png`: selected work directly after the client strip.

These show the first pass for review. No project product imagery or new client results were supplied. The demo uses labelled-field extraction in the browser, with no live AI model.

### Local AI connection

- `desktop-23-demo-ai-setup.png` and `mobile-10-demo-ai-setup.png`: the AI submission control, separate sample preview, disclosure and disconnected status with no local key configured.
- `desktop-24-demo-ai-unavailable.png`: the real server error state after requesting AI review without a key.

These show the integration interface. No live model output is represented in these captures.

### UI/UX pass: discovery, reading and contact

- `desktop-25-services-goals.png`: Services begins with a selectable project goal.
- `desktop-26-contact-brief.png`: the brief and direct contact routes together.
- `desktop-27-work-inspira.png`: the second full project feature and its scope tabs.
- `desktop-28-about-team.png`: the new About composition.
- `desktop-29-home-paths.png`: the retained living O and new routes into Services.
- `desktop-30-case-navigation.png`: section links on a long case study.
- `mobile-11-services-goals.png`: goal selection and visible header contact action.
- `mobile-12-contact-brief.png`: required fields arrive near the top of the page.
- `mobile-13-work-scope.png`: project scope tabs at phone width.
- `mobile-14-about-team.png`: About's mobile composition.
- `mobile-15-contact-context.png`: a service selection carried into the editable brief.

The AI demo is parked. Project text uses the existing case-study content; no product imagery was fabricated.

### Fresh identity studies, `feat/logo-studies`

- `desktop-31-identity-comparison.png`: Cut, Phase, Threshold and Common together.
- `desktop-32-identity-phase.png`: Phase at large size, in a website composition, reversed and at icon sizes.
- `mobile-16-identity-lab.png`: the introduction and first concept at 390px.
- `mobile-17-identity-common.png`: the custom lowercase wordmark and website composition at 390px.

These are separate explorations in `identity-lab.html`. Mark 08 remains the site logo.

### About heading scroll fix, `feat/logo-studies`

- `desktop-33-about-beliefs-scroll.png`: after scrolling down through the beliefs and back up, the section heading no longer stays over the rows.
- `mobile-18-about-beliefs-scroll.png`: the same scroll sequence at 390px, retaining the stacked layout.

### Colour identity studies, `feat/logo-studies`

- `desktop-34-colour-comparison.png`: Afterlight, Prism, Current and Voltage together.
- `desktop-35-colour-afterlight.png`: the gradient O, website composition and icon sizes.
- `mobile-19-colour-current.png`: the mint/violet ribbon concept at 390px with reduced motion enabled.

The founder rejected the earlier monochrome round and explicitly asked for colour and gradient explorations. These are separate concepts in `identity-color-lab.html`; the site logo has not changed.

## Illustration rollback, 2026-10-03

`desktop-43-illustration-rollback.png` shows the restored Home page after the founder rejected the illustration pass. The rejected screenshots remain recoverable from commit `4ce5c01`.
