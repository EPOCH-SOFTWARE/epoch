/**
 * @fileoverview Modern homepage with dark theme and professional design
 * @author Epoch Development Team
 */

'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Header } from '../../layout/Header';
import { Footer } from '../../layout/Footer';
import { Button } from '../../ui/Button';
import { CLIENT_LOGOS } from '../../../shared/constants/content';
import styles from '../../../../styles/HomePage.module.css';

export default function HomePage() {
  // const [activeService, setActiveService] = useState<number | null>(null);
  const heroRef = useRef<HTMLElement>(null);

  // Professional background effect (CSS-based)

  return (
    <>
      <Header />
      
      <main className={styles.homeMain}>
        <div className={styles.backgroundEffect}></div>
        
        {/* Hero Section */}
        <section ref={heroRef} className={styles.hero}>
          <div className={styles.heroContent}>
            <div className={styles.heroLabel}>Engineering Excellence</div>
            <h1 className={styles.heroTitle}>
              <span className={styles.titleLine}>Crafting software</span>
              <span className={styles.titleLine}>with the precision</span>
              <span className={styles.titleLine}>
                <span className={styles.titleHighlight}>of Swiss watchmakers</span>
              </span>
            </h1>
            <p className={styles.heroDescription}>
              Transform your vision into powerful software solutions. 
              We combine cutting-edge technology with proven expertise to deliver 
              systems that drive your business forward.
            </p>
            <div className={styles.heroActions}>
              <Button 
                href="/contact" 
                variant="primary"
                size="large"
                icon={
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="5" y1="12" x2="19" y2="12"/>
                    <polyline points="12,5 19,12 12,19"/>
                  </svg>
                }
              >
                Start Your Project
              </Button>
              <Button 
                href="/services" 
                variant="secondary"
                size="large"
              >
                Explore Services
              </Button>
            </div>
          </div>
          
          <div className={styles.heroStats}>
            <div className={styles.stat}>
              <span className={styles.statNumber}>500+</span>
              <span className={styles.statLabel}>Projects Delivered</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNumber}>98%</span>
              <span className={styles.statLabel}>Client Satisfaction</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNumber}>24/7</span>
              <span className={styles.statLabel}>Support Available</span>
            </div>
          </div>
        </section>

        {/* Services Preview Section */}
        <section className={styles.servicesPreview}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionLabel}>What We Do</span>
            <h2 className={styles.sectionTitle}>
              Comprehensive Technology Solutions
            </h2>
            <p className={styles.sectionDescription}>
              From concept to deployment, we provide end-to-end software development services 
              that transform your business challenges into competitive advantages.
            </p>
          </div>

          <div className={styles.servicesGrid}>
            <div 
              className={styles.serviceCard}
              // onMouseEnter={() => setActiveService(0)}
              // onMouseLeave={() => setActiveService(null)}
            >
              <div className={styles.serviceIcon}>
                <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
              <h3 className={styles.serviceTitle}>AI & Machine Learning</h3>
              <p className={styles.serviceDescription}>
                Build intelligent systems that learn, adapt, and deliver predictive insights to drive decision-making.
              </p>
              <Link href="/services/ai-ml" className={styles.serviceLink}>
                Learn More
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12"/>
                  <polyline points="12,5 19,12 12,19"/>
                </svg>
              </Link>
            </div>

            <div 
              className={styles.serviceCard}
              // onMouseEnter={() => setActiveService(1)}
              // onMouseLeave={() => setActiveService(null))
            >
              <div className={styles.serviceIcon}>
                <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
                </svg>
              </div>
              <h3 className={styles.serviceTitle}>Cloud Computing</h3>
              <p className={styles.serviceDescription}>
                Scale your infrastructure with enterprise-grade cloud solutions on AWS, Azure, and Google Cloud.
              </p>
              <Link href="/services/cloud-computing" className={styles.serviceLink}>
                Learn More
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12"/>
                  <polyline points="12,5 19,12 12,19"/>
                </svg>
              </Link>
            </div>

            <div 
              className={styles.serviceCard}
              // onMouseEnter={() => setActiveService(2)}
              // onMouseLeave={() => setActiveService(null))
            >
              <div className={styles.serviceIcon}>
                <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <polyline points="16 18 22 12 16 6" />
                  <polyline points="8 6 2 12 8 18" />
                </svg>
              </div>
              <h3 className={styles.serviceTitle}>Custom Software</h3>
              <p className={styles.serviceDescription}>
                Tailored solutions designed to meet your unique business requirements and growth objectives.
              </p>
              <Link href="/services/custom-software" className={styles.serviceLink}>
                Learn More
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12"/>
                  <polyline points="12,5 19,12 12,19"/>
                </svg>
              </Link>
            </div>

            <div 
              className={styles.serviceCard}
              // onMouseEnter={() => setActiveService(3)}
              // onMouseLeave={() => setActiveService(null))
            >
              <div className={styles.serviceIcon}>
                <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="M9 12l2 2 4-4" />
                </svg>
              </div>
              <h3 className={styles.serviceTitle}>Cybersecurity</h3>
              <p className={styles.serviceDescription}>
                Protect your digital assets with advanced security frameworks and proactive threat management.
              </p>
              <Link href="/services/cybersecurity" className={styles.serviceLink}>
                Learn More
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12"/>
                  <polyline points="12,5 19,12 12,19"/>
                </svg>
              </Link>
            </div>

             <div 
              className={styles.serviceCard}
              // onMouseEnter={() => setActiveService(4)}
              // onMouseLeave={() => setActiveService(null))
            >
              <div className={styles.serviceIcon}>
                <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M3 3v18h18" />
                  <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3" />
                </svg>
              </div>
              <h3 className={styles.serviceTitle}>Data Analytics</h3>
              <p className={styles.serviceDescription}>
                Transform raw data into actionable business insights with advanced analytics platforms and big data solutions.
              </p>
              <Link href="/services/data-analytics" className={styles.serviceLink}>
                Learn More
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12"/>
                  <polyline points="12,5 19,12 12,19"/>
                </svg>
              </Link>
            </div>

             <div 
              className={styles.serviceCard}
              // onMouseEnter={() => setActiveService(5)}
              // onMouseLeave={() => setActiveService(null))
            >
              <div className={styles.serviceIcon}>
                <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="3" />
                  <path d="M12 1v6M12 17v6M4.22 4.22l4.24 4.24M15.54 15.54l4.24 4.24" />
                </svg>
              </div>
              <h3 className={styles.serviceTitle}>DevOps & Automation</h3>
              <p className={styles.serviceDescription}>
                Accelerate your development lifecycle with automated CI/CD pipelines and infrastructure as code.
              </p>
              <Link href="/services/devops" className={styles.serviceLink}>
                Learn More
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12"/>
                  <polyline points="12,5 19,12 12,19"/>
                </svg>
              </Link>
            </div>
          </div>

          <div className={styles.servicesAction}>
            <Button 
              href="/services" 
              variant="secondary"
              size="medium"
              icon={
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12"/>
                  <polyline points="12,5 19,12 12,19"/>
                </svg>
              }
            >
              View All Services
            </Button>
          </div>
        </section>

        {/* Why Choose Epoch Section */}
        <section className={styles.whyChooseSection}>
          <div className={styles.whyChooseContent}>
            <div className={styles.splitLayout}>
              <div className={styles.contentSide}>
                <span className={styles.sectionLabel}>Why Partner With Us</span>
                <h2 className={styles.whyChooseTitle}>
                  Where Precision Meets Innovation
                </h2>
                <div className={styles.valuePropositions}>
                  <div className={styles.valueItem}>
                    <div className={styles.valueIcon}>
                      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    </div>
                    <div className={styles.valueContent}>
                      <h3 className={styles.valueTitle}>Swiss-Level Precision</h3>
                      <p className={styles.valueDescription}>
                        Every line of code crafted with the exactitude of master watchmakers. We believe in perfection through iteration and meticulous attention to detail.
                      </p>
                    </div>
                  </div>

                  <div className={styles.valueItem}>
                    <div className={styles.valueIcon}>
                      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                      </svg>
                    </div>
                    <div className={styles.valueContent}>
                      <h3 className={styles.valueTitle}>Lightning Fast Delivery</h3>
                      <p className={styles.valueDescription}>
                        Agile methodologies combined with proven frameworks enable us to deliver production-ready solutions at unprecedented speed.
                      </p>
                    </div>
                  </div>

                  <div className={styles.valueItem}>
                    <div className={styles.valueIcon}>
                      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                        <path d="M9 12l2 2 4-4" />
                      </svg>
                    </div>
                    <div className={styles.valueContent}>
                      <h3 className={styles.valueTitle}>Enterprise Security</h3>
                      <p className={styles.valueDescription}>
                        Security-first architecture with multi-layered protection and proactive threat monitoring to safeguard your digital assets.
                      </p>
                    </div>
                  </div>
                </div>

                <div className={styles.whyChooseAction}>
                  <Button 
                    href="/about" 
                    variant="outline"
                    size="medium"
                    icon={
                      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="5" y1="12" x2="19" y2="12"/>
                        <polyline points="12,5 19,12 12,19"/>
                      </svg>
                    }
                  >
                    Discover Our Story
                  </Button>
                </div>
              </div>

              <div className={styles.statsSide}>
                <div className={styles.statsContainer}>
                  <div className={styles.statsHeader}>
                    <h3 className={styles.statsTitle}>Proven Track Record</h3>
                    <p className={styles.statsDescription}>
                      Numbers that speak to our commitment to excellence
                    </p>
                  </div>

                  <div className={styles.statsGrid}>
                    <div className={styles.statCard}>
                      <div className={styles.statNumber}>99.9%</div>
                      <div className={styles.statLabel}>System Uptime</div>
                      <div className={styles.statDetail}>Guaranteed reliability</div>
                    </div>

                    <div className={styles.statCard}>
                      <div className={styles.statNumber}>50%</div>
                      <div className={styles.statLabel}>Faster Delivery</div>
                      <div className={styles.statDetail}>Than industry average</div>
                    </div>

                    <div className={styles.statCard}>
                      <div className={styles.statNumber}>0</div>
                      <div className={styles.statLabel}>Security Breaches</div>
                      <div className={styles.statDetail}>Zero incidents record</div>
                    </div>

                    <div className={styles.statCard}>
                      <div className={styles.statNumber}>24/7</div>
                      <div className={styles.statLabel}>Expert Support</div>
                      <div className={styles.statDetail}>Always available</div>
                    </div>

                    <div className={styles.statCard}>
                      <div className={styles.statNumber}>500+</div>
                      <div className={styles.statLabel}>Projects Delivered</div>
                      <div className={styles.statDetail}>Across industries</div>
                    </div>

                    <div className={styles.statCard}>
                      <div className={styles.statNumber}>98%</div>
                      <div className={styles.statLabel}>Client Satisfaction</div>
                      <div className={styles.statDetail}>Long-term partnerships</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Clients Section */}
        <section className={styles.clientsSection}>
          <div className={styles.clientsContent}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionLabel}>Trusted By Industry Leaders</span>
              <h2 className={styles.sectionTitle}>
                Partnering with Visionary Companies
              </h2>
              <p className={styles.sectionDescription}>
                From Fortune 500 enterprises to innovative startups, we&apos;ve earned the trust of industry leaders 
                across technology, healthcare, finance, and beyond.
              </p>
            </div>

            <div className={styles.clientsShowcase}>
              <div className={styles.featuredClients}>
                {CLIENT_LOGOS.slice(0, 8).map((client, index) => (
                  <div 
                    key={client.id} 
                    className={styles.clientCard}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className={styles.clientCardInner}>
                      <Image 
                        src={client.logo} 
                        alt={client.alt}
                        width={140}
                        height={50}
                        className={styles.clientLogo}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className={styles.clientsStats}>
                <div className={styles.statsRow}>
                  <div className={styles.clientStat}>
                    <span className={styles.statNumber}>50+</span>
                    <span className={styles.statLabel}>Enterprise Clients</span>
                  </div>
                  <div className={styles.clientStat}>
                    <span className={styles.statNumber}>15+</span>
                    <span className={styles.statLabel}>Industries Served</span>
                  </div>
                  <div className={styles.clientStat}>
                    <span className={styles.statNumber}>5</span>
                    <span className={styles.statLabel}>Years Average Partnership</span>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.clientsAction}>
              <Button 
                href="/clients" 
                variant="secondary"
                size="medium"
                icon={
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="5" y1="12" x2="19" y2="12"/>
                    <polyline points="12,5 19,12 12,19"/>
                  </svg>
                }
              >
                Explore All Success Stories
              </Button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className={styles.ctaSection}>
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>Ready to Build Something Amazing?</h2>
            <p className={styles.ctaDescription}>
              Let&apos;s discuss how we can help transform your ideas into powerful digital solutions.
            </p>
            <div className={styles.ctaActions}>
              <Button 
                href="/contact" 
                variant="primary"
                size="large"
                icon={
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="5" y1="12" x2="19" y2="12"/>
                    <polyline points="12,5 19,12 12,19"/>
                  </svg>
                }
              >
                Get Started Today
              </Button>
              <Button 
                href="/services" 
                variant="secondary"
                size="large"
              >
                Explore Our Services
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
}