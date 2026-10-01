/**
 * @fileoverview Work page: case studies first, then everyone EPOCH has worked with.
 * @author Epoch Development Team
 */

import { CaseStudyCard } from '../../ui/CaseStudyCard';
import { ClientMark } from '../../ui/ClientMark';
import { ClosingSection } from '../../sections/ClosingSection';
import { CASE_STUDIES } from '../../../shared/constants/clientData';
import { CLIENT_LOGOS } from '../../../shared/constants/content';
import ui from '../../../../styles/Primitives.module.css';
import styles from '../../../../styles/ClientsPage.module.css';

function Hero() {
  return (
    <section aria-labelledby="work-hero-title" className={styles.hero}>
      <div className={ui.container}>
        <h1 id="work-hero-title" className={`${ui.display} ${styles.title}`}>
          Work that had to hold up.
        </h1>
        <p className={`${ui.lede} ${styles.lede}`}>
          Production systems for insurance, retirement, healthcare, payments and retail. Two of
          them, in detail.
        </p>
      </div>
    </section>
  );
}

function CaseStudies() {
  return (
    <section aria-labelledby="case-studies-title" className={`${ui.section} ${ui.sectionRuled}`}>
      <div className={ui.container}>
        <h2 id="case-studies-title" className={`${ui.heading} ${styles.sectionTitle}`}>
          Case studies
        </h2>
        <div className={styles.studyGrid}>
          {CASE_STUDIES.map(study => (
            <CaseStudyCard key={study.id} study={study} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Clients() {
  return (
    <section aria-labelledby="clients-title" className={`${ui.section} ${ui.sectionRuled}`}>
      <div className={ui.container}>
        <h2 id="clients-title" className={`${ui.heading} ${styles.sectionTitle}`}>
          Everyone we&apos;ve worked with
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

export default function ClientsPage() {
  return (
    <>
      <Hero />
      <CaseStudies />
      <Clients />
      <ClosingSection />
    </>
  );
}
