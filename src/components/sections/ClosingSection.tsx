/**
 * @fileoverview The invitation that ends every page.
 */

import { ActionLink } from '../ui/ActionLink';
import { CONTACT } from '../../shared/constants/contact';
import ui from '../../../styles/Primitives.module.css';
import styles from '../../../styles/ClosingSection.module.css';

export function ClosingSection() {
  return (
    <section aria-labelledby="closing-title" className={`${ui.section} ${styles.closing}`}>
      <div className={ui.container}>
        <h2 id="closing-title" className={`${ui.display} ${styles.title}`}>
          Bring us the project that matters most.
        </h2>
        <div className={styles.footer}>
          <p className={ui.lede}>
            Tell us what you&apos;re building and what&apos;s in the way. You&apos;ll hear back
            within 24 hours.
          </p>
          <div className={ui.actions}>
            <ActionLink href="/contact">Start a project</ActionLink>
            <ActionLink href={`mailto:${CONTACT.email}`} variant="secondary">
              {CONTACT.email}
            </ActionLink>
          </div>
        </div>
      </div>
    </section>
  );
}
