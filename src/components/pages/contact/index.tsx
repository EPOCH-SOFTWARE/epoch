/**
 * @fileoverview Contact page: the inquiry form beside every direct way to reach EPOCH.
 * @author Epoch Development Team
 */

import { CONTACT } from '../../../shared/constants/contact';
import { ContactForm } from './ContactForm';
import { OfficeList } from '../../ui/OfficeList';
import ui from '../../../../styles/Primitives.module.css';
import styles from '../../../../styles/ContactPage.module.css';

function DirectContact() {
  return (
    <aside aria-labelledby="direct-title" className={styles.aside}>
      <h2 id="direct-title" className={styles.asideTitle}>
        Or reach us directly
      </h2>
      <dl className={styles.details}>
        <div>
          <dt>Email</dt>
          <dd>
            <a href={`mailto:${CONTACT.email}`} className={styles.directLink}>
              {CONTACT.email}
            </a>
          </dd>
        </div>
        <div>
          <dt>Phone</dt>
          <dd>
            <a href={CONTACT.phoneHref} className={styles.directLink}>
              {CONTACT.phone}
            </a>
          </dd>
        </div>
        <div>
          <dt>Response time</dt>
          <dd>Within 24 hours</dd>
        </div>
        <div>
          <dt>Hours</dt>
          <dd>Mon–Fri, 9 AM–6 PM PST</dd>
        </div>
      </dl>

      <h2 className={styles.asideTitle}>Offices</h2>
      <OfficeList />
    </aside>
  );
}

export default function ContactPage() {
  return (
    <>
      <section aria-labelledby="contact-title" className={styles.hero}>
        <div className={ui.container}>
          <h1 id="contact-title" className={ui.display}>
            Start a project.
          </h1>
          <p className={`${ui.lede} ${styles.heroLede}`}>
            Tell us what you&apos;re building and what&apos;s in the way. You&apos;ll hear back
            within 24 hours.
          </p>
        </div>
      </section>

      <section aria-label="Inquiry" className={styles.inquiry}>
        <div className={`${ui.container} ${styles.layout}`}>
          <ContactForm />
          <DirectContact />
        </div>
      </section>
    </>
  );
}
