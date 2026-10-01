/**
 * @fileoverview A case study preview. The headline is the link; the whole card is clickable.
 */

import Link from 'next/link';
import type { CaseStudy } from '../../shared/types';
import { ClientMark } from './ClientMark';
import styles from './CaseStudyCard.module.css';

interface CaseStudyCardProps {
  readonly study: CaseStudy;
}

export function CaseStudyCard({ study }: CaseStudyCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.mark}>
        <ClientMark client={study} />
      </div>
      <p className={styles.client}>
        {study.name}, {study.industry.toLowerCase()}
      </p>
      <h3 className={styles.title}>
        <Link href={`/clients/${study.id}`} className={styles.link}>
          {study.headline}
        </Link>
      </h3>
      <p className={styles.summary}>{study.summary}</p>
      <dl className={styles.facts}>
        <div>
          <dt>Timeline</dt>
          <dd>{study.timeline}</dd>
        </div>
        <div>
          <dt>Team</dt>
          <dd>
            {study.teamSize.epoch} EPOCH, {study.teamSize.client} {study.name}
          </dd>
        </div>
      </dl>
      <p className={styles.more} aria-hidden="true">
        Read the case study
      </p>
    </article>
  );
}
