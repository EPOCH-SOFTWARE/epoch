/**
 * @fileoverview Footer component for site-wide use
 * @author Epoch Development Team
 */

'use client';

import React from 'react';
import Link from 'next/link';
import styles from '../../../styles/Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer} id="footer">
      <div className={styles.footerConstellation}>
        {[...Array(8)].map((_, i) => (
          <div key={i} className={styles.constellationStar} style={{ '--star-index': i } as React.CSSProperties}></div>
        ))}
      </div>
      <div className={styles.footerInner}>
        <div className={styles.footerContent}>
          <div className={styles.footerSection}>
            <div className={styles.footerBrand}>
              <div className={styles.footerLogo}>
                <div className={styles.logoSymbol}>
                  <div className={styles.logoOrbit}>
                    <div className={styles.logoCore}></div>
                  </div>
                </div>
                <span className={styles.logoText}>Epoch</span>
              </div>
              <p className={styles.footerMission}>
                Transforming complexity into elegance through precision engineering and scientific innovation.
              </p>
              <div className={styles.footerCoordinates}>
                <span className={styles.coordinate}>37.7749° N, 122.4194° W</span>
                <span className={styles.coordinate}>UTC-08:00</span>
              </div>
            </div>
          </div>

          <div className={styles.footerSection}>
            <h4 className={styles.footerTitle}>Navigation</h4>
            <nav className={styles.footerNav}>
              <Link href="/about" className={styles.footerLink}>About</Link>
              <Link href="/services" className={styles.footerLink}>Services</Link>
              <a href="#portfolio" className={styles.footerLink}>Portfolio</a>
              <a href="#case-studies" className={styles.footerLink}>Case Studies</a>
              <Link href="/clients" className={styles.footerLink}>Clients</Link>
              <Link href="/contact" className={styles.footerLink}>Contact</Link>
            </nav>
          </div>

          <div className={styles.footerSection}>
            <h4 className={styles.footerTitle}>Capabilities</h4>
            <nav className={styles.footerNav}>
              <span className={styles.footerItem}>Custom Software Development</span>
              <span className={styles.footerItem}>AI & Machine Learning</span>
              <span className={styles.footerItem}>Cloud Architecture</span>
              <span className={styles.footerItem}>Digital Experience Design</span>
              <span className={styles.footerItem}>Performance Optimization</span>
              <span className={styles.footerItem}>Technical Consulting</span>
            </nav>
          </div>

          <div className={styles.footerSection}>
            <h4 className={styles.footerTitle}>Connect</h4>
            <div className={styles.footerContact}>
              <a href="mailto:hello@epoch.dev" className={styles.footerContactItem}>
                <span className={styles.contactIcon}>
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="2"/>
                    <polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </span>
                hello@epoch.dev
              </a>
              <a href="tel:+1234567890" className={styles.footerContactItem}>
                <span className={styles.contactIcon}>
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </span>
                +1 (234) 567-890
              </a>
            </div>
            <div className={styles.footerSocial}>
              <a href="https://www.linkedin.com/company/epoch-software-services/" className={styles.socialLink} aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a href="https://github.com/EPOCH-SOFTWARE" className={styles.socialLink} aria-label="GitHub" target="_blank" rel="noopener noreferrer">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.30.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <a href="#" className={styles.socialLink} aria-label="X">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className={styles.footerDivider}>
          <div className={styles.dividerLine}></div>
          <div className={styles.dividerParticles}>
            {[...Array(12)].map((_, i) => (
              <div key={i} className={styles.dividerParticle} style={{ '--particle-index': i } as React.CSSProperties}></div>
            ))}
          </div>
        </div>

        <div className={styles.footerBottom}>
          <div className={styles.footerBottomLeft}>
            <p className={styles.footerCopyright}>
              © 2024 Epoch Development. All rights reserved.
            </p>
            <div className={styles.footerLegal}>
              <a href="#" className={styles.legalLink}>Privacy Policy</a>
              <a href="#" className={styles.legalLink}>Terms of Service</a>
              <a href="#" className={styles.legalLink}>Cookie Policy</a>
            </div>
          </div>
          <div className={styles.footerBottomRight}>
            <div className={styles.footerMetadata}>
              <span className={styles.metadata}>
                <span className={styles.metadataLabel}>Status:</span>
                <span className={styles.metadataValue}>Operational</span>
              </span>
              <span className={styles.metadata}>
                <span className={styles.metadataLabel}>Version:</span>
                <span className={styles.metadataValue}>2.1.0</span>
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <div className={styles.footerBackground}>
        <div className={styles.footerGrid}></div>
        <div className={styles.footerWave}></div>
      </div>
    </footer>
  );
}