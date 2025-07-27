/**
 * @fileoverview Main header component with navigation
 * @author Epoch Development Team
 */

'use client';

import React, { memo } from 'react';
import Image from 'next/image';
import styles from '../../../styles/EpochHomepage.module.css';

interface HeaderProps {
  isScrolled: boolean;
  className?: string;
}

const navigation = [
  { href: '#services', label: 'Services', ariaLabel: 'Go to services section' },
  { href: '#portfolio', label: 'Portfolio', ariaLabel: 'Go to portfolio section' },
  { href: '#case-studies', label: 'Case Studies', ariaLabel: 'Go to case studies section' },
  { href: '#expertise', label: 'Expertise', ariaLabel: 'Go to expertise section' },
  { href: '#contact', label: 'Contact', ariaLabel: 'Go to contact section' },
] as const;

export const Header = memo<HeaderProps>(function Header({ isScrolled, className }) {
  return (
    <header
      className={`${styles.header} ${isScrolled ? styles.headerScrolled : ''} ${className || ''}`}
      role="banner"
    >
      <div className={styles.headerInner}>
        <div className={styles.logo}>
          <Image
            src="/logos/epoch-logo.svg"
            alt="Epoch"
            width={150}
            height={48}
            priority
            style={{ objectFit: 'contain' }}
          />
        </div>
        
        <nav className={styles.nav} role="navigation" aria-label="Main navigation">
          <ul>
            {navigation.map(({ href, label, ariaLabel }) => (
              <li key={href}>
                <a href={href} aria-label={ariaLabel} data-magnetic>
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
});