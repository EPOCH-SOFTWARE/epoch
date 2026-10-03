import { DATA } from '../data';
import { BulletList, Closing, Section, WideSection, ServiceChips, Missing } from '../Blocks';
import { EngagementDial } from '../EngagementDial';
import { ReadingGuide } from '../ReadingGuide';
const names = ['Problem', 'Build', 'Team', 'Challenges', 'Technology', 'Outcomes'];
export function CaseDetail({ id }: { id: string }) {
  const study = DATA.caseStudies.find(s => s.id === id);
  if (!study)
    return (
      <main id="main">
        <Missing title="We haven’t published that case study." href="/work" label="See all work" />
      </main>
    );
  const process = study.workingProcess;
  return (
    <main id="main">
      <section className="page-hero">
        <div className="wrap">
          <p className="crumbs">
            <a href="/work">Work</a>
            <span aria-hidden="true">/</span>
            <span>{study.name}</span>
          </p>
          <div className="case-intro">
            <div>
              <ul className="clients">
                <li className="client" data-client={study.id}>
                  <img src={study.logo} alt={study.name} />
                </li>
              </ul>
              <h1 className="display mt-m">{study.headline}</h1>
              <p className="lede">{study.summary}</p>
            </div>
            <EngagementDial timeline={study.timeline} />
          </div>
          <dl className="facts-row">
            <div>
              <dt>Industry</dt>
              <dd>{study.industry}</dd>
            </div>
            <div>
              <dt>Company size</dt>
              <dd>{study.companySize}</dd>
            </div>
            <div>
              <dt>Timeline</dt>
              <dd>{study.timeline}</dd>
            </div>
            <div>
              <dt>Team</dt>
              <dd>
                {study.teamSize.epoch} from EPOCH
                <br />
                {study.teamSize.client} from {study.name}
              </dd>
            </div>
          </dl>
        </div>
      </section>
      <ReadingGuide names={names} />
      <Section id="read-0" title="The problem">
        <BulletList items={study.generalChallenges} />
        <h3 className="sub-h mt-l">Why EPOCH</h3>
        <p className="body">{study.whyChoseEpoch}</p>
      </Section>
      <Section id="read-1" title="What we built">
        <p className="lede strong">{study.projectScope}</p>
        <BulletList className="list mt-m" items={study.deliverables} />
      </Section>
      <Section id="read-2" title="How we worked">
        <dl className="facts-row single">
          <div>
            <dt>Method</dt>
            <dd>{process.methodology}</dd>
          </div>
          <div>
            <dt>Cadence</dt>
            <dd>{process.meetingFrequency}</dd>
          </div>
          <div>
            <dt>Tools</dt>
            <dd>{process.communicationTools.join(', ')}</dd>
          </div>
        </dl>
        <div className="two-col mt-l">
          <div>
            <h3 className="sub-h">EPOCH team</h3>
            <BulletList items={study.teamRoles.epochRoles} />
          </div>
          <div>
            <h3 className="sub-h">{study.name} team</h3>
            <BulletList items={study.teamRoles.clientRoles} />
          </div>
        </div>
      </Section>
      <Section id="read-3" title="Where it got hard">
        <BulletList className="hard" items={study.challengesOvercome} />
      </Section>
      <Section id="read-4" title="Under the hood">
        <h3 className="sub-h">Technical highlights</h3>
        <BulletList items={study.technicalHighlights} />
        <h3 className="sub-h mt-l">What made it different</h3>
        <BulletList items={study.innovativeFeatures} />
        <h3 className="sub-h mt-l">Technologies</h3>
        <ul className="chips">
          {study.technologies.map(name => (
            <li className="chip" key={name}>
              {name}
            </li>
          ))}
        </ul>
      </Section>
      <WideSection id="read-5" title="Outcomes">
        <table className="outcomes">
          <caption className="sr-only">Outcomes for {study.name}</caption>
          <thead>
            <tr>
              <th scope="col">Area</th>
              <th scope="col">Before</th>
              <th scope="col">After</th>
              <th scope="col">Result</th>
            </tr>
          </thead>
          <tbody>
            {study.quantifiableResults.map(r => (
              <tr key={r.metric}>
                <td>{r.metric}</td>
                <td data-label="Before">{r.before}</td>
                <td data-label="After">{r.after}</td>
                <td data-label="Result">{r.improvement}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="split on-baseline mt-l">
          <h3 className="sub-h">What else changed</h3>
          <BulletList items={study.qualitativeResults} />
        </div>
      </WideSection>
      {study.testimonial && (
        <section className="section ruled">
          <div className="wrap">
            <figure>
              <blockquote className="display quote">{study.testimonial.quote}</blockquote>
              <figcaption className="label mt-m">
                {study.testimonial.author}, {study.testimonial.position}
              </figcaption>
            </figure>
          </div>
        </section>
      )}
      <Section title="Related services">
        <ul className="chips">
          <ServiceChips ids={study.relatedServices} />
        </ul>
      </Section>
      <Closing />
    </main>
  );
}
