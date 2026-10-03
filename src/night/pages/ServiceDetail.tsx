import { DATA } from '../data';
import { BulletList, Calls, Section, WideSection, Missing } from '../Blocks';
import { ReadingGuide } from '../ReadingGuide';
const names = [
  'Problem',
  'Approach',
  'Deliverables',
  'Process',
  'Industries',
  'Why EPOCH',
  'Questions',
];
export function ServiceDetail({ id }: { id: string }) {
  const detail = DATA.serviceDetails[id],
    summary = DATA.services.find(s => s.id === id);
  if (!detail || !summary)
    return (
      <main id="main">
        <Missing title="We don’t offer that service." href="/services" label="See all services" />
      </main>
    );
  const tier = DATA.tiers.find(t => t.id === summary.tier)!;
  return (
    <main id="main">
      <section className="page-hero">
        <div className="wrap">
          <p className="crumbs">
            <a href="/services">Services</a>
            <span aria-hidden="true">/</span>
            <a href={'/services#tier-' + tier.id}>{tier.title}</a>
          </p>
          <h1 className="display">{summary.title}</h1>
          <p className="lede">{detail.heroDescription}</p>
          <Calls service={id} />
        </div>
      </section>
      <ReadingGuide names={names} />
      <Section id="read-0" title={detail.problemStatement.title}>
        <p className="lede strong">{detail.problemStatement.description}</p>
        <BulletList items={detail.problemStatement.painPoints} className="list mt-m" />
      </Section>
      <Section id="read-1" title={detail.overview.title}>
        <p className="lede strong">{detail.overview.description}</p>
        {detail.overview.keyPoints.map(p => (
          <p className="body mt-s" key={p}>
            {p}
          </p>
        ))}
        <h3 className="sub-h mt-l">{detail.expertise.title}</h3>
        <ul className="skills">
          {detail.expertise.skills.map(skill => (
            <li key={skill.name}>
              <strong>{skill.name}</strong>
              <span>{skill.description}</span>
            </li>
          ))}
        </ul>
      </Section>
      <WideSection id="read-2" title="What we deliver">
        <ul className="rows">
          {detail.keyServices.map(item => (
            <li className="row" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <p className="small">{item.features.join(', ')}</p>
            </li>
          ))}
        </ul>
      </WideSection>
      <Section id="read-3" title={detail.process.title}>
        <ol className="steps">
          {detail.process.steps.map(step => (
            <li key={step.step}>
              <span className="num" aria-hidden="true">
                {step.step}
              </span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </li>
          ))}
        </ol>
      </Section>
      <Section id="read-4" title="Industries">
        <ul className="industries">
          {detail.industries.map(item => (
            <li key={item.name}>
              <strong>{item.name}</strong>
              <span>{item.applications.join(', ')}</span>
            </li>
          ))}
        </ul>
      </Section>
      <Section id="read-5" title="Why EPOCH">
        <BulletList items={detail.whyEpoch} />
      </Section>
      <Section id="read-6" title="Questions">
        <div className="faq">
          {detail.faqs.map(item => (
            <details key={item.question}>
              <summary>{item.question}</summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </Section>
      <section className="section ruled closing">
        <div className="wrap">
          <h2 className="display">{detail.ctaTitle}</h2>
          <div className="closing-foot">
            <p className="lede">{detail.ctaDescription}</p>
            <Calls service={id} />
          </div>
        </div>
      </section>
    </main>
  );
}
