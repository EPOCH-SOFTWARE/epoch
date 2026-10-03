/**
 * @fileoverview Services index: the AI tier first, then the engineering beneath it.
 * @author Epoch Development Team
 */

import { ServiceList } from '../../ui/ServiceList';
import { ClosingSection } from '../../sections/ClosingSection';
import { SERVICE_TIERS, servicesInTier } from '../../../shared/constants/services';
import ui from '../../../../styles/Primitives.module.css';
import styles from '../../../../styles/ServicesPage.module.css';

function Hero() {
  return (
    <section aria-labelledby="services-title" className={styles.hero}>
      <div className={ui.container}>
        <h1 id="services-title" className={`${ui.display} ${styles.title}`}>
          AI, and everything it stands on.
        </h1>
        <p className={`${ui.lede} ${styles.lede}`}>
          We lead with AI: models, generative systems and the data that feeds them. Behind it sits
          the engineering that keeps it running in production.
        </p>
      </div>
    </section>
  );
}

export default function ServicesPage() {
  return (
    <>
      <Hero />
      {SERVICE_TIERS.map(tier => (
        <section
          key={tier.id}
          aria-labelledby={`tier-${tier.id}`}
          className={`${ui.section} ${ui.sectionRuled}`}
        >
          <div className={ui.container}>
            <div className={styles.tierHead}>
              <h2 id={`tier-${tier.id}`} className={ui.heading}>
                {tier.title}
              </h2>
              <p className={ui.body}>{tier.intro}</p>
            </div>
            <ServiceList services={servicesInTier(tier.id)} />
          </div>
        </section>
      ))}
      <ClosingSection />
    </>
  );
}
