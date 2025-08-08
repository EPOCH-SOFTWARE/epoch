/**
 * @fileoverview Main header component with navigation
 * @author Epoch Development Team
 */

'use client';

import React, { memo, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../../../styles/Header.module.css';

interface HeaderProps {
  isScrolled?: boolean;
  className?: string;
}

type NavItem = {
  href: string;
  label: string;
  ariaLabel: string;
  hasSubmenu?: boolean;
  submenu?: Array<{ href: string; label: string }>;
};

const navigation: readonly NavItem[] = [
  { href: '/about', label: 'About', ariaLabel: 'Go to about page' },
  { 
    href: '/services', 
    label: 'Services', 
    ariaLabel: 'Go to services page',
    hasSubmenu: true,
    submenu: [
      { href: '/services/ai-ml', label: 'AI & Machine Learning' },
      { href: '/services/generative-ai', label: 'Generative AI' },
      { href: '/services/cloud-computing', label: 'Cloud Computing' },
      { href: '/services/cybersecurity', label: 'Cybersecurity' },
      { href: '/services/custom-software', label: 'Custom Software' },
      { href: '/services/data-analytics', label: 'Data Analytics' },
    ]
  },
  { href: '/clients', label: 'Clients', ariaLabel: 'Go to clients page' },
  { href: '/contact', label: 'Contact', ariaLabel: 'Go to contact page' },
] as const;

export const Header = memo<HeaderProps>(function Header({ isScrolled: propIsScrolled, className }) {
  const [isScrolled, setIsScrolled] = useState(propIsScrolled || false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDarkPage, setIsDarkPage] = useState(false);
  const [servicesSubmenuOpen, setServicesSubmenuOpen] = useState(false);

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

  // Detect if we need light text (dark background)
  useEffect(() => {
    const checkTextColor = () => {
      const pathname = window.location.pathname;
      const darkPages = ['/', '/about', '/contact', '/services', '/clients'];
      // Check if pathname starts with any dark page path or is exact match for home
      const isOnDarkPage = darkPages.some(page => 
        page === '/' ? pathname === '/' : pathname.startsWith(page)
      );
      
      // Show light text only when:
      // 1. On dark page AND header is not scrolled (transparent/dark background)
      // 2. Never show light text when header is scrolled (glassmorphism background)
      const shouldUseLightText = isOnDarkPage && !isScrolled;
      setIsDarkPage(shouldUseLightText);
    };

    checkTextColor();
    
    // Listen for navigation changes
    const handlePopState = () => checkTextColor();
    window.addEventListener('popstate', handlePopState);
    
    return () => window.removeEventListener('popstate', handlePopState);
  }, [isScrolled]); // Add isScrolled as dependency

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setServicesSubmenuOpen(false);
  };

  const toggleServicesSubmenu = () => {
    setServicesSubmenuOpen(!servicesSubmenuOpen);
  };

  return (
    <header
      className={`${styles.header} ${isScrolled ? styles.headerScrolled : ''} ${isDarkPage ? styles.darkMode : ''} ${className || ''}`}
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

        {/* Hamburger Menu Button */}
        <button
          className={`${styles.hamburger} ${mobileMenuOpen ? styles.hamburgerOpen : ''}`}
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
          aria-expanded={mobileMenuOpen}
        >
          <div className={styles.hamburgerIcon}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>

        {/* Mobile Navigation */}
        <nav
          className={`${styles.mobileNav} ${mobileMenuOpen ? styles.mobileNavOpen : ''}`}
          role="navigation"
          aria-label="Mobile navigation"
        >
          <ul className={styles.mobileNavList}>
            <li className={styles.mobileNavLogo}>
              <Link href="/" onClick={closeMobileMenu}>
                <Image
                  src="/logos/epoch-logo.svg"
                  alt="Epoch"
                  width={80}
                  height={26}
                  priority
                />
              </Link>
            </li>
            {navigation.map((item) => (
              <li key={item.href} className={styles.mobileNavItem}>
                {item.hasSubmenu ? (
                  <>
                    <div className={styles.mobileNavItemWithSubmenu}>
                      <a href={item.href} aria-label={item.ariaLabel} onClick={closeMobileMenu}>
                        {item.label}
                      </a>
                      <button 
                        className={`${styles.submenuToggle} ${servicesSubmenuOpen ? styles.submenuToggleOpen : ''}`}
                        onClick={toggleServicesSubmenu}
                        aria-label="Toggle services submenu"
                      >
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </button>
                    </div>
                    {servicesSubmenuOpen && (
                      <ul className={styles.mobileSubmenu}>
                        {item.submenu?.map((subItem) => (
                          <li key={subItem.href}>
                            <a href={subItem.href} onClick={closeMobileMenu}>
                              <span className={styles.submenuIcon}>→</span>
                              {subItem.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                ) : (
                  <a href={item.href} aria-label={item.ariaLabel} onClick={closeMobileMenu}>
                    {item.label}
                  </a>
                )}
              </li>
            ))}
            <li className={styles.mobileNavCTA}>
              <a 
                href="/contact" 
                className={styles.ctaButton}
                onClick={closeMobileMenu}
                aria-label="Start your project with Epoch"
              >
                Start Your Project
                <span className={styles.ctaArrow}>→</span>
              </a>
            </li>
          </ul>
        </nav>

        {/* Overlay */}
        {mobileMenuOpen && (
          <div
            className={`${styles.overlay} ${mobileMenuOpen ? styles.overlayVisible : ''}`}
            onClick={closeMobileMenu}
            aria-hidden="true"
          />
        )}
      </div>
    </header>
  );
});