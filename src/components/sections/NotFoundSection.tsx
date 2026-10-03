/**
 * @fileoverview A 404 that points somewhere useful instead of apologising.
 */

import { ActionLink } from '../ui/ActionLink';
import ui from '../../../styles/Primitives.module.css';
import styles from '../../../styles/NotFoundSection.module.css';

interface NotFoundSectionProps {
  readonly title: string;
  readonly body: string;
  readonly href: string;
  readonly linkLabel: string;
}

export function NotFoundSection({ title, body, href, linkLabel }: NotFoundSectionProps) {
  return (
    <section aria-labelledby="not-found-title" className={`${ui.section} ${styles.notFound}`}>
      <div className={ui.container}>
        <p className={styles.code}>404</p>
        <h1 id="not-found-title" className={ui.heading}>
          {title}
        </h1>
        <p className={`${ui.body} ${styles.body}`}>{body}</p>
        <div className={ui.actions}>
          <ActionLink href={href}>{linkLabel}</ActionLink>
          <ActionLink href="/" variant="secondary">
            Go to the homepage
          </ActionLink>
        </div>
      </div>
    </section>
  );
}
