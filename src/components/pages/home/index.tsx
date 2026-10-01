/**
 * @fileoverview Homepage: the commitment, the proof, and what EPOCH builds.
 * @author Epoch Development Team
 */

import Link from 'next/link';
import { EpochField } from '../../field/EpochField';
import { ActionLink } from '../../ui/ActionLink';
import { CaseStudyCard } from '../../ui/CaseStudyCard';
import { ClientMark } from '../../ui/ClientMark';
import { ServiceList } from '../../ui/ServiceList';
import { ClosingSection } from '../../sections/ClosingSection';
import { CASE_STUDIES } from '../../../shared/constants/clientData';
import { CLIENT_LOGOS, COMMITMENTS } from '../../../shared/constants/content';
import { servicesInTier } from '../../../shared/constants/services';
import ui from '../../../../styles/Primitives.module.css';
import styles from '../../../../styles/HomePage.module.css';

function Hero() {
  return (
    <section aria-labelledby="hero-title" className={styles.hero}>
      <EpochField className={styles.field} />
      <div className={`${ui.container} ${styles.heroInner}`}>
        <h1 id="hero-title" className={`${ui.display} ${styles.heroTitle}`}>
          <span>All in.</span> <span>Every project.</span> <span>Every time.</span>
        </h1>
        <div className={styles.heroFooter}>
          <p className={ui.lede}>
            EPOCH builds AI systems that hold up in production, with a team that doesn&apos;t
            walk away until they do.
          </p>
          <div className={ui.actions}>
            <ActionLink href="/contact">Start a project</ActionLink>
            <ActionLink href="/clients" variant="secondary">
              See the work
            </ActionLink>
          </div>
        </div>
      </div>
    </section>
  );
}

function Clients() {
  return (
    <section aria-labelledby="clients-title" className={styles.clients}>
      <div className={ui.container}>
        <h2 id="clients-title" className={styles.clientsTitle}>
          Trusted by teams at
        </h2>
        <ul aria-label="Clients" className={styles.clientGrid}>
          {CLIENT_LOGOS.map(client => (
            <li key={client.id}>
              <ClientMark client={client} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Standard() {
  return (
    <section aria-labelledby="standard-title" className={`${ui.section} ${ui.sectionRuled}`}>
      <div className={`${ui.container} ${styles.split}`}>
        <h2 id="standard-title" className={ui.heading}>
          The name is the standard.
        </h2>
        <div>
          <p className={ui.lede}>
            In machine learning, an epoch is one complete pass through every example in the
            training data. Not a sample. Not the easy cases. All of it.
          </p>
          <p className={`${ui.body} ${styles.standardBody}`}>
            That is how we work. Every requirement, every edge case, every person who will use
            what we build. Nothing gets skipped because it was hard.
          </p>
        </div>
      </div>
    </section>
  );
}

function Commitments() {
  return (
    <section aria-labelledby="commitments-title" className={`${ui.section} ${ui.sectionRuled}`}>
      <div className={ui.container}>
        <h2 id="commitments-title" className={styles.commitmentsHeading}>
          What you can hold us to
        </h2>
        <ul className={styles.commitments}>
          {COMMITMENTS.map(commitment => (
            <li key={commitment.title} className={styles.commitment}>
              <h3 className={styles.commitmentTitle}>{commitment.title}</h3>
              <p className={ui.body}>{commitment.detail}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Capabilities() {
  return (
    <section aria-labelledby="build-title" className={`${ui.section} ${ui.sectionRuled}`}>
      <div className={ui.container}>
        <div className={`${styles.split} ${styles.sectionHead}`}>
          <h2 id="build-title" className={ui.heading}>
            AI that makes it to production
          </h2>
          <p className={ui.body}>
            Plenty of AI looks good in a demo. We build the kind that holds up in production: the
            models, the agents and the data underneath them.
          </p>
        </div>
        <ServiceList services={servicesInTier('ai')} />
        <div className={styles.engineering}>
          <h3 className={styles.engineeringTitle}>And the engineering that makes it real</h3>
          <ul className={styles.engineeringLinks}>
            {servicesInTier('engineering').map(service => (
              <li key={service.id}>
                <Link href={`/services/${service.id}`} className={styles.engineeringLink}>
                  {service.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function SelectedWork() {
  return (
    <section aria-labelledby="work-title" className={`${ui.section} ${ui.sectionRuled}`}>
      <div className={ui.container}>
        <div className={`${styles.split} ${styles.sectionHead}`}>
          <h2 id="work-title" className={ui.heading}>
            Selected work
          </h2>
          <p className={ui.body}>
            Production systems for companies where getting it wrong is expensive.
          </p>
        </div>
        <div className={styles.workGrid}>
          {CASE_STUDIES.map(study => (
            <CaseStudyCard key={study.id} study={study} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <Clients />
      <Standard />
      <Commitments />
      <Capabilities />
      <SelectedWork />
      <ClosingSection />
    </>
  );
}
