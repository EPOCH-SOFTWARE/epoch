import { DATA } from '../data';
import { INDUSTRIES } from '../content';
import {
  Section,
  BulletList,
  CaseCard,
  Clients,
  ServiceChips,
  Calls,
  Closing,
  Missing,
} from '../Blocks';
export function IndustryRows() {
  return INDUSTRIES.map(i => (
    <li className="row" key={i.id}>
      <h3>
        <a href={'/industries/' + i.id}>{i.name}</a>
      </h3>
      <p>{i.intro}</p>
      <p className="small">
        {i.clientIds
          .map(id => DATA.clients.find(c => c.id === id)?.name)
          .filter(Boolean)
          .join(', ')}
      </p>
    </li>
  ));
}
function LogoList({ label, ids }: { label: string; ids: string[] }) {
  return (
    <>
      <p className="pg-label">{label}</p>
      <ul className="clients">
        <Clients ids={ids} />
      </ul>
    </>
  );
}
export function IndustryDetail({ id }: { id: string }) {
  const item = INDUSTRIES.find(i => i.id === id);
  if (!item)
    return (
      <main id="main">
        <div data-industry="">
          <Missing
            title="We don’t have a page for that industry."
            href="/industries"
            label="See all industries"
          />
        </div>
      </main>
    );
  const study = DATA.caseStudies.find(s => s.id === item.caseStudyId),
    others = item.clientIds.filter(id => id !== study?.id);
  return (
    <main id="main">
      <div data-industry="">
        <section className="page-hero">
          <div className="wrap">
            <p className="crumbs">
              <a href="/industries">Industries</a>
              <span aria-hidden="true">/</span>
              <span>{item.name}</span>
            </p>
            <h1 className="display">{item.headline}</h1>
            <p className="lede">{item.intro}</p>
            <Calls label="Book a 30-minute call" />
          </div>
        </section>
        <Section title="What gets in the way">
          <BulletList items={item.challenges} />
        </Section>
        <Section title="What we build">
          <BulletList items={item.whatWeBuild} className="pg-two-list" />
        </Section>
        {study ? (
          <Section title="Proof">
            <div className="pg-proof">
              <CaseCard study={study} />
              {others.length > 0 && (
                <div>
                  <LogoList label={'Also in ' + item.name.toLowerCase()} ids={others} />
                </div>
              )}
            </div>
          </Section>
        ) : (
          <Section title="Who we’ve worked with">
            <LogoList
              label={'Teams we’ve worked with in ' + item.name.toLowerCase()}
              ids={item.clientIds}
            />
          </Section>
        )}
        <Section title="Services that fit">
          <ul className="chips">
            <ServiceChips ids={item.serviceIds} />
          </ul>
        </Section>
      </div>
      <Closing />
    </main>
  );
}
