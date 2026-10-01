/**
 * @fileoverview Services as large typographic rows. Each row links to its detail page.
 */

import Link from 'next/link';
import type { ServiceSummary } from '../../shared/types';
import styles from './ServiceList.module.css';

interface ServiceListProps {
  readonly services: readonly ServiceSummary[];
}

export function ServiceList({ services }: ServiceListProps) {
  return (
    <ul className={styles.list}>
      {services.map(service => (
        <li key={service.id} className={styles.row}>
          <h3 className={styles.title}>
            <Link href={`/services/${service.id}`} className={styles.link}>
              {service.title}
            </Link>
          </h3>
          <p className={styles.description}>{service.description}</p>
          <p className={styles.highlights}>{service.highlights.join(', ')}</p>
        </li>
      ))}
    </ul>
  );
}
