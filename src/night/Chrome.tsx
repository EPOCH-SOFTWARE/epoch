import type { ReactNode } from 'react';
import { arcPath } from '@/public/night/kept-time';
import { DATA } from './data';
import { Runtime } from './Runtime';

const box = '-0.5 -1 208 42';
const nav = [
  { href: '/work', label: 'Work', pages: ['work', 'case'] },
  { href: '/services', label: 'Services', pages: ['services', 'service'] },
  { href: '/how-we-work', label: 'How we work', pages: ['how-we-work'] },
  { href: '/about', label: 'About', pages: ['about'] },
];
function Letters() {
  return (
    <g fill="none" stroke="currentColor" strokeWidth="6.6">
      <path d="M26 3.3H3.3V36.7H26M3.3 20H23" />
      <path transform="translate(39 0)" d="M3.3 40V3.3H14A9.2 9.2 0 0 1 14 21.7H3.3" />
      <path transform="translate(131.3 0)" d="M32.71 8.56A17.1 17.1 0 1 0 32.71 31.44" />
      <path transform="translate(176.5 0)" d="M3.3 0V40M26.7 0V40M3.3 20H26.7" />
    </g>
  );
}
export function LogoSprite() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}
    >
      <symbol id="wm-plain" viewBox={box}>
        <Letters />
        <circle cx="98.5" cy="20" r="17.1" fill="none" stroke="currentColor" strokeWidth="6.6" />
      </symbol>
      <symbol id="wm-clock" viewBox={box}>
        <Letters />
        <g data-clock-o="">
          <path
            d={arcPath(98.5, 20, 17.1, 28, 304)}
            fill="none"
            stroke="currentColor"
            strokeWidth="6.6"
          />
          <circle cx="98.5" cy="2.9" r="4.2" style={{ fill: 'var(--logo-dot,currentColor)' }} />
        </g>
      </symbol>
    </svg>
  );
}
function Logo() {
  return (
    <span className="logo">
      <svg viewBox={box}>
        <use href="#wm-clock" />
      </svg>
      <span className="logo-note" aria-hidden="true" data-logo-note="" />
    </span>
  );
}
function NavLinks({ page }: { page: string }) {
  return nav.map(item => (
    <a
      key={item.href}
      href={item.href}
      aria-current={item.pages.includes(page) ? 'page' : undefined}
    >
      {item.label}
    </a>
  ));
}
export function Header({ page }: { page: string }) {
  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <header className="site-header">
        <div className="wrap bar">
          <a className="brand" href="/" aria-label="EPOCH home">
            <Logo />
          </a>
          <nav className="nav" aria-label="Main">
            <NavLinks page={page} />
          </nav>
          <a className="btn sm header-contact" href="/contact">
            Start a project
          </a>
          <button className="menu-toggle" type="button" aria-expanded="false" aria-controls="menu">
            Menu
          </button>
        </div>
      </header>
      <nav className="menu" id="menu" aria-label="Menu" hidden>
        <NavLinks page={page} />
        <a href="/contact">Start a project</a>
      </nav>
    </>
  );
}
export function Footer() {
  return (
    <footer className="site-footer ruled">
      <span className="foot-glow" aria-hidden="true" />
      <div className="wrap">
        <div className="foot-grid">
          <div className="foot-brand">
            <Logo />
            <p className="foot-tag">AI, engineered all the way to production.</p>
          </div>
          {DATA.tiers.map(tier => (
            <nav
              key={tier.id}
              className="foot-col"
              aria-label={tier.id === 'ai' ? 'AI services' : 'Engineering services'}
            >
              <h2>{tier.id === 'ai' ? 'AI' : 'Engineering'}</h2>
              {DATA.services
                .filter(s => s.tier === tier.id)
                .map(s => (
                  <a key={s.id} href={'/services/' + s.id}>
                    {s.title}
                  </a>
                ))}
            </nav>
          ))}
          <nav className="foot-col" aria-label="Company">
            <h2>Company</h2>
            {[
              ['work', 'Work'],
              ['industries', 'Industries'],
              ['how-we-work', 'How we work'],
              ['insights', 'Insights'],
              ['about', 'About'],
              ['contact', 'Contact'],
            ].map(([href, label]) => (
              <a key={href} href={'/' + href}>
                {label}
              </a>
            ))}
          </nav>
          <div className="foot-col">
            <h2>Talk to us</h2>
            <a href={'mailto:' + DATA.contact.email}>{DATA.contact.email}</a>
            <a href={DATA.contact.phoneHref}>{DATA.contact.phone}</a>
            {DATA.contact.social.map(p => (
              <a key={p.href} href={p.href} target="_blank" rel="noopener noreferrer">
                {p.label}
              </a>
            ))}
          </div>
        </div>
        <div className="legal">
          <span>© {new Date().getFullYear()} Epoch Software Services</span>
        </div>
        <div className="foot-mark" aria-hidden="true">
          <svg viewBox={box}>
            <use href="#wm-plain" />
          </svg>
        </div>
      </div>
    </footer>
  );
}
export function SitePage({ page, children }: { page: string; children: ReactNode }) {
  return (
    <div className="night-page" data-next-night="" data-page={page}>
      <LogoSprite />
      <Header page={page} />
      {children}
      <Footer />
      <Runtime demo={page === 'document-demo'} />
    </div>
  );
}
