/**
 * @fileoverview Main header component with navigation
 * @author Epoch Development Team
 */

'use client';

import React, { memo, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../../../styles/EpochHomepage.module.css';

interface HeaderProps {
  isScrolled?: boolean;
  className?: string;
}

const navigation = [
  { href: '#services', label: 'Services', ariaLabel: 'Go to services section' },
  { href: '#portfolio', label: 'Portfolio', ariaLabel: 'Go to portfolio section' },
  { href: '#case-studies', label: 'Case Studies', ariaLabel: 'Go to case studies section' },
  { href: '#expertise', label: 'Expertise', ariaLabel: 'Go to expertise section' },
  { href: '#contact', label: 'Contact', ariaLabel: 'Go to contact section' },
] as const;

export const Header = memo<HeaderProps>(function Header({ isScrolled: propIsScrolled, className }) {
  const [isScrolled, setIsScrolled] = useState(propIsScrolled || false);

  useEffect(() => {
    if (propIsScrolled !== undefined) {
      setIsScrolled(propIsScrolled);
      return;
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [propIsScrolled]);

  return (
    <header
      className={`${styles.header} ${isScrolled ? styles.headerScrolled : ''} ${className || ''}`}
      role="banner"
    >
      <div className={styles.headerInner}>
        <Link href="/" className={styles.logo} aria-label="Go to homepage">
          <Image
            src="/logos/epoch-logo.svg"
            alt="Epoch"
            width={150}
            height={48}
            priority
            style={{ objectFit: 'contain' }}
          />
        </Link>
        
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