/**
 * @fileoverview EPOCH's offices with addresses and directions. Shared by About and Contact.
 */

import { CONTACT } from '../../shared/constants/contact';
import styles from './OfficeList.module.css';

export function OfficeList() {
  return (
    <ul className={styles.offices}>
      {CONTACT.offices.map(office => (
        <li key={office.city} className={styles.office}>
          <h3 className={styles.city}>{office.city}</h3>
          <address className={styles.address}>
            {office.address.map(line => (
              <span key={line}>{line}</span>
            ))}
          </address>
          <a
            href={office.mapHref}
            className={styles.directions}
            target="_blank"
            rel="noopener noreferrer"
          >
            Get directions
          </a>
        </li>
      ))}
    </ul>
  );
}
