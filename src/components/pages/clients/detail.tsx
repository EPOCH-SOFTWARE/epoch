/**
 * @fileoverview Case study page: the problem, what we built, how we worked,
 * where it got hard, and what changed.
 * @author Epoch Development Team
 */

import Link from 'next/link';
import type { ReactNode } from 'react';
import { ClientMark } from '../../ui/ClientMark';
import { ClosingSection } from '../../sections/ClosingSection';
import { findService } from '../../../shared/constants/services';
import type { CaseStudy, ServiceSummary } from '../../../shared/types';
import ui from '../../../../styles/Primitives.module.css';
import styles from '../../../../styles/ClientDetailPage.module.css';

interface ClientDetailPageProps {
  readonly study: CaseStudy;
}

interface DetailSectionProps {
  readonly id: string;
  readonly title: string;
  readonly children: ReactNode;
}

function DetailSection({ id, title, children }: DetailSectionProps) {
  return (
    <section aria-labelledby={id} className={`${ui.section} ${ui.sectionRuled}`}>
      <div className={`${ui.container} ${styles.split}`}>
        <h2 id={id} className={ui.heading}>
          {title}
        </h2>
        <div className={styles.content}>{children}</div>
      </div>
    </section>
  );
}

interface ListProps {
  readonly items: readonly string[];
  /** CSS module lookups are typed as possibly undefined, so accept that explicitly. */
  readonly className?: string | undefined;
}

function List({ items, className }: ListProps) {
  return (
    <ul className={className ?? styles.list}>
      {items.map(item => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

function Hero({ study }: ClientDetailPageProps) {
  return (
    <section aria-labelledby="study-title" className={styles.hero}>
      <div className={ui.container}>
        <Link href="/clients" className={styles.back}>
          All work
        </Link>
        <div className={styles.mark}>
          <ClientMark client={study} />
        </div>
        <p className={styles.client}>
          {study.name}, {study.industry.toLowerCase()}
        </p>
        <h1 id="study-title" className={`${ui.heading} ${styles.title}`}>
          {study.headline}
        </h1>
        <p className={`${ui.lede} ${styles.lede}`}>{study.summary}</p>
        <dl className={styles.facts}>
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
              {study.teamSize.epoch} from EPOCH, {study.teamSize.client} from {study.name}
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}

function Problem({ study }: ClientDetailPageProps) {
  return (
    <DetailSection id="problem-title" title="The problem">
      <List items={study.generalChallenges} />
      <h3 className={`${ui.subheading} ${styles.subTitle}`}>Why EPOCH</h3>
      <p className={ui.body}>{study.whyChoseEpoch}</p>
    </DetailSection>
  );
}

function Built({ study }: ClientDetailPageProps) {
  return (
    <DetailSection id="built-title" title="What we built">
      <p className={`${ui.lede} ${styles.scope}`}>{study.projectScope}</p>
      <List items={study.deliverables} />
    </DetailSection>
  );
}

function Collaboration({ study }: ClientDetailPageProps) {
  const { workingProcess, teamRoles } = study;
  return (
    <DetailSection id="collaboration-title" title="How we worked">
      <dl className={styles.process}>
        <div>
          <dt>Method</dt>
          <dd>{workingProcess.methodology}</dd>
        </div>
        <div>
          <dt>Cadence</dt>
          <dd>{workingProcess.meetingFrequency}</dd>
        </div>
        <div>
          <dt>Tools</dt>
          <dd>{workingProcess.communicationTools.join(', ')}</dd>
        </div>
      </dl>
      <div className={styles.teams}>
        <div>
          <h3 className={`${ui.subheading} ${styles.subTitle}`}>EPOCH team</h3>
          <List items={teamRoles.epochRoles} />
        </div>
        <div>
          <h3 className={`${ui.subheading} ${styles.subTitle}`}>{study.name} team</h3>
          <List items={teamRoles.clientRoles} />
        </div>
      </div>
    </DetailSection>
  );
}

function Hard({ study }: ClientDetailPageProps) {
  return (
    <DetailSection id="hard-title" title="Where it got hard">
      <List items={study.challengesOvercome} className={styles.hardList} />
    </DetailSection>
  );
}

function UnderTheHood({ study }: ClientDetailPageProps) {
  return (
    <DetailSection id="hood-title" title="Under the hood">
      <h3 className={`${ui.subheading} ${styles.subTitleFirst}`}>Technical highlights</h3>
      <List items={study.technicalHighlights} />
      <h3 className={`${ui.subheading} ${styles.subTitle}`}>What made it different</h3>
      <List items={study.innovativeFeatures} />
      <h3 className={`${ui.subheading} ${styles.subTitle}`}>Technologies</h3>
      <List items={study.technologies} className={styles.chips} />
    </DetailSection>
  );
}

function Outcomes({ study }: ClientDetailPageProps) {
  return (
    <DetailSection id="outcomes-title" title="Outcomes">
      <table className={styles.table}>
        <caption className={ui.visuallyHidden}>Outcomes for {study.name}</caption>
        <thead>
          <tr>
            <th scope="col">Area</th>
            <th scope="col">Before</th>
            <th scope="col">After</th>
            <th scope="col">Result</th>
          </tr>
        </thead>
        <tbody>
          {study.quantifiableResults.map(result => (
            <tr key={result.metric}>
              <th scope="row">{result.metric}</th>
              <td data-label="Before">{result.before}</td>
              <td data-label="After">{result.after}</td>
              <td data-label="Result">{result.improvement}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <List items={study.qualitativeResults} />
    </DetailSection>
  );
}

function Testimonial({ study }: ClientDetailPageProps) {
  if (!study.testimonial) return null;
  const { quote, author, position } = study.testimonial;
  return (
    <section aria-label={`What ${study.name} says`} className={`${ui.section} ${ui.sectionRuled}`}>
      <div className={ui.container}>
        <figure className={styles.testimonial}>
          <blockquote className={styles.quote}>
            <p>{quote}</p>
          </blockquote>
          <figcaption className={styles.attribution}>
            {author}, {position}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

function RelatedServices({ study }: ClientDetailPageProps) {
  const services = study.relatedServices
    .map(id => findService(id))
    .filter((service): service is ServiceSummary => service !== undefined);

  return (
    <DetailSection id="related-title" title="Related services">
      <ul className={styles.related}>
        {services.map(service => (
          <li key={service.id}>
            <Link href={`/services/${service.id}`} className={styles.relatedLink}>
              {service.title}
            </Link>
          </li>
        ))}
      </ul>
    </DetailSection>
  );
}

export function ClientDetailPage({ study }: ClientDetailPageProps) {
  return (
    <>
      <Hero study={study} />
      <Problem study={study} />
      <Built study={study} />
      <Collaboration study={study} />
      <Hard study={study} />
      <UnderTheHood study={study} />
      <Outcomes study={study} />
      <Testimonial study={study} />
      <RelatedServices study={study} />
      <ClosingSection />
    </>
  );
}
