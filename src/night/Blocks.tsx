/* Native anchors intentionally retain document transitions and browser scroll restoration. */
import type { CSSProperties, ReactNode } from 'react';
import type { CaseStudy, ServiceTier } from '@/src/shared/types';
import { DATA } from './data';
import { ScopeExplorer } from './Explorers';

export function Calls({ service, label = 'Arrange a call' }: { service?: string; label?: string }) {
  const href = '/contact' + (service ? '?service=' + service : '');
  return (
    <div className="actions">
      <a className="btn" href={href}>
        Start a project
      </a>
      <a className="btn secondary" href={href + '#book'}>
        {label}
      </a>
    </div>
  );
}
export function Closing() {
  return (
    <section className="section ruled closing" aria-labelledby="closing-title">
      <div className="wrap">
        <h2 id="closing-title" className="display">
          Bring us the project that matters most.
        </h2>
        <div className="closing-foot">
          <p className="lede">
            Tell us what you’re building and what’s in the way. You’ll hear back within 24 hours.
          </p>
          <Calls />
        </div>
      </div>
    </section>
  );
}
export function BulletList({
  items,
  className = 'list',
}: {
  items: readonly string[];
  className?: string;
}) {
  return (
    <ul className={className}>
      {items.map(item => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}
export function Section({
  title,
  children,
  id,
}: {
  title: string;
  children: ReactNode;
  id?: string;
}) {
  return (
    <section className="section ruled" id={id}>
      <div className="wrap split">
        <h2 className="h2">{title}</h2>
        <div>{children}</div>
      </div>
    </section>
  );
}
export function WideSection({
  title,
  children,
  id,
}: {
  title: string;
  children: ReactNode;
  id?: string;
}) {
  return (
    <section className="section ruled" id={id}>
      <div className="wrap">
        <div className="head split">
          <h2 className="h2">{title}</h2>
        </div>
        {children}
      </div>
    </section>
  );
}
export function Missing({ title, href, label }: { title: string; href: string; label: string }) {
  return (
    <section className="page-hero">
      <div className="wrap">
        <p className="mono">404</p>
        <h1 className="display">{title}</h1>
        <div className="actions">
          <a className="btn" href={href}>
            {label}
          </a>
        </div>
      </div>
    </section>
  );
}
export function Clients({ ids }: { ids?: string[] }) {
  return DATA.clients
    .filter(c => !ids || ids.includes(c.id))
    .map(c => (
      <li className="client" data-client={c.id} key={c.id}>
        {c.logo ? <img src={c.logo} alt={c.name} /> : <span className="wordmark">{c.name}</span>}
      </li>
    ));
}
export function ServiceRows({ tier }: { tier: ServiceTier }) {
  return DATA.services
    .filter(s => s.tier === tier)
    .map(s => (
      <li className="row" key={s.id}>
        <h3>
          <a href={'/services/' + s.id}>{s.title}</a>
        </h3>
        <p>{s.description}</p>
        <p className="small">{s.highlights.join(', ')}</p>
      </li>
    ));
}
export function ServiceChips({ tier, ids }: { tier?: ServiceTier; ids?: readonly string[] }) {
  const services = tier
    ? DATA.services.filter(s => s.tier === tier)
    : (ids ?? []).flatMap(id => DATA.services.filter(s => s.id === id));
  return services.map(s => (
    <li key={s.id}>
      <a className="chip" href={'/services/' + s.id}>
        {s.title}
      </a>
    </li>
  ));
}
export function Commitments() {
  return DATA.commitments.map(item => (
    <li className="statement" key={item.title}>
      <h3>{item.title}</h3>
      <p>{item.detail}</p>
    </li>
  ));
}
export function Offices() {
  return DATA.contact.offices.map(office => (
    <li className="office" key={office.city}>
      <h3>{office.city}</h3>
      <p className="office-time">
        Local time{' '}
        <time data-zone={office.city === 'Charlotte, NC' ? 'America/New_York' : 'Asia/Kolkata'} />
      </p>
      <address>
        {office.address.map((line, i) => (
          <span key={line}>
            {i > 0 && <br />}
            {line}
          </span>
        ))}
      </address>
      <a href={office.mapHref} target="_blank" rel="noopener noreferrer">
        Get directions
      </a>
    </li>
  ));
}
export function TechStack() {
  return DATA.techStack.map(g => (
    <div className="def" key={g.category}>
      <dt>{g.category}</dt>
      <dd>
        <ul className="chips">
          {g.technologies.map(name => (
            <li className="chip" key={name}>
              {name}
            </li>
          ))}
        </ul>
      </dd>
    </div>
  ));
}
export function CaseCard({ study, sketch = false }: { study: CaseStudy; sketch?: boolean }) {
  const steps =
    study.id === 'hub-international'
      ? [
          'Legacy systems',
          'API integration layer',
          'AI risk assessment',
          'Automated claims workflow',
          'Real-time analytics',
        ]
      : [
          'Participant portal',
          'API gateway',
          'Plan administration engine',
          'AI retirement guidance',
          'Compliance monitoring',
        ];
  return (
    <article className="card">
      <div className="client" data-client={study.id}>
        <img src={study.logo} alt={study.name} />
      </div>
      <p className="meta">{study.industry}</p>
      {sketch && (
        <ol className="sketch" aria-label="How the system fits together">
          {steps.map((step, index) => (
            <li
              key={step}
              style={{ '--i': index } as CSSProperties}
              className={index === (study.id === 'hub-international' ? 2 : 3) ? 'ai' : undefined}
            >
              <svg className="node" viewBox="0 0 9 9" aria-hidden="true">
                <circle cx="4.5" cy="4.5" r="4" pathLength="1" />
              </svg>
              {step}
            </li>
          ))}
        </ol>
      )}
      <h3>
        <a href={'/work/' + study.id}>{study.headline}</a>
      </h3>
      <div className="facts">
        <span>{study.timeline}</span>
        <span>Team of {study.teamSize.epoch} from EPOCH</span>
      </div>
      <p className="more" aria-hidden="true">
        Read the case study
      </p>
    </article>
  );
}
function FeaturedProject({
  study,
  full,
  index,
}: {
  study: CaseStudy;
  full: boolean;
  index: number;
}) {
  return (
    <article className="project-feature" id={'featured-' + study.id}>
      <div className="project-mast">
        <img src={study.logo} alt={study.name} />
        <span>{study.industry}</span>
      </div>
      <div className="project-layout">
        <div className="project-story">
          <h3>
            <a href={'/work/' + study.id}>{study.headline}</a>
          </h3>
          <p>{study.summary}</p>
          <a className="text-link" href={'/work/' + study.id}>
            Inside the project
          </a>
        </div>
        <ScopeExplorer study={study} index={index} />
      </div>
      {full && (
        <div className="project-context">
          <div>
            <h4>The challenge</h4>
            <p>{study.generalChallenges[0]}.</p>
          </div>
          <div>
            <h4>EPOCH’s scope</h4>
            <p>{study.projectScope}</p>
          </div>
        </div>
      )}
    </article>
  );
}
export function FeaturedWork({ full = false }: { full?: boolean }) {
  const [hub, inspira] = DATA.caseStudies;
  if (!hub || !inspira) return null;
  return (
    <>
      <FeaturedProject study={hub} full={full} index={0} />
      {full ? (
        <FeaturedProject study={inspira} full index={1} />
      ) : (
        <article className="project-companion" id={'featured-' + inspira.id}>
          <div>
            <img src={inspira.logo} alt={inspira.name} />
            <p>{inspira.industry}</p>
          </div>
          <div>
            <h3>
              <a href={'/work/' + inspira.id}>{inspira.headline}</a>
            </h3>
            <p>{inspira.summary}</p>
            <a className="text-link" href={'/work/' + inspira.id}>
              Inside the project
            </a>
          </div>
        </article>
      )}
    </>
  );
}
