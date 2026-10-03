/**
 * @fileoverview Site header: logo, primary navigation, and the menu on small screens.
 */

'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ActionLink } from '../ui/ActionLink';
import styles from '../../../styles/Header.module.css';

const NAV_ITEMS = [
  { href: '/clients', label: 'Work' },
  { href: '/services', label: 'Services' },
  { href: '/about', label: 'About' },
] as const;

const MENU_ID = 'site-menu';

function isCurrent(pathname: string, href: string): boolean {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logo} onClick={closeMenu}>
          <Image src="/logos/epoch-logo.svg" alt="EPOCH home" width={112} height={36} priority />
        </Link>

        <nav aria-label="Main" className={styles.nav}>
          <ul className={styles.navList}>
            {NAV_ITEMS.map(item => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={styles.navLink}
                  aria-current={isCurrent(pathname, item.href) ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <ActionLink href="/contact" size="compact">
            Start a project
          </ActionLink>
        </nav>

        <button
          type="button"
          className={styles.menuToggle}
          aria-expanded={menuOpen}
          aria-controls={MENU_ID}
          onClick={() => setMenuOpen(open => !open)}
        >
          {menuOpen ? 'Close' : 'Menu'}
        </button>
      </div>

      {menuOpen && (
        <nav id={MENU_ID} aria-label="Menu" className={styles.menu}>
          <ul className={styles.menuList}>
            {NAV_ITEMS.map(item => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={styles.menuLink}
                  aria-current={isCurrent(pathname, item.href) ? 'page' : undefined}
                  onClick={closeMenu}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/contact" className={styles.menuLink} onClick={closeMenu}>
                Start a project
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
