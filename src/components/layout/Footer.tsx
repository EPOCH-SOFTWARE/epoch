/**
 * @fileoverview Site footer: every service, the company pages, and direct contact.
 */

import Image from 'next/image';
import Link from 'next/link';
import { SERVICE_TIERS, servicesInTier } from '../../shared/constants/services';
import { CONTACT } from '../../shared/constants/contact';
import styles from '../../../styles/Footer.module.css';

const COMPANY_LINKS = [
  { href: '/clients', label: 'Work' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
] as const;

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <Image src="/logos/epoch-logo.svg" alt="EPOCH" width={112} height={36} />
          <p className={styles.tagline}>AI systems, built all the way through.</p>
          <ul className={styles.offices}>
            {CONTACT.offices.map(office => (
              <li key={office.city}>{office.city}</li>
            ))}
          </ul>
        </div>

        {SERVICE_TIERS.map(tier => (
          <nav key={tier.id} aria-label={tier.title} className={styles.column}>
            <h2 className={styles.columnTitle}>{tier.title}</h2>
            <ul className={styles.links}>
              {servicesInTier(tier.id).map(service => (
                <li key={service.id}>
                  <Link href={`/services/${service.id}`} className={styles.link}>
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        <nav aria-label="Company" className={styles.column}>
          <h2 className={styles.columnTitle}>Company</h2>
          <ul className={styles.links}>
            {COMPANY_LINKS.map(link => (
              <li key={link.href}>
                <Link href={link.href} className={styles.link}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.column}>
          <h2 className={styles.columnTitle}>Talk to us</h2>
          <ul className={styles.links}>
            <li>
              <a href={`mailto:${CONTACT.email}`} className={styles.link}>
                {CONTACT.email}
              </a>
            </li>
            <li>
              <a href={CONTACT.phoneHref} className={styles.link}>
                {CONTACT.phone}
              </a>
            </li>
            {CONTACT.social.map(profile => (
              <li key={profile.href}>
                <a href={profile.href} className={styles.link} target="_blank" rel="noopener noreferrer">
                  {profile.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={styles.legal}>
        <p>© {new Date().getFullYear()} Epoch Software Services</p>
      </div>
    </footer>
  );
}
