/**
 * @fileoverview Main homepage component with optimized architecture
 * @author Epoch Development Team
 */

'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Header } from '../../layout/Header';
import { Footer } from '../../layout/Footer';
import { HeroSection } from '../../sections/HeroSection';
import { ClientsSection } from '../../sections/ClientsSection';
import { useCursor } from '../../../hooks/useCursor';
import { PORTFOLIO_ITEMS, CASE_STUDIES } from '../../../shared/constants/content';
import { logger } from '../../../shared/utils/logger';
import styles from '../../../../styles/EpochHomepage.module.css';

export default function EpochHomepage() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  useCursor({});
  
  const [hoveredPortfolio, setHoveredPortfolio] = useState<string | null>(null);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<number>(0);
  
  const heroRef = useRef<HTMLElement>(null);
  const expertiseRef = useRef<HTMLElement>(null);
  const portfolioRef = useRef<HTMLElement>(null);
  const caseStudiesRef = useRef<HTMLElement>(null);

  // Scroll tracking effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 100);
      
      // Update active section based on scroll
      if (heroRef.current && expertiseRef.current) {
        const heroBottom = heroRef.current.offsetTop + heroRef.current.offsetHeight;
        if (scrollY < heroBottom - 200) {
          setActiveSection(0);
        } else {
          setActiveSection(1);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  logger.performance('EpochHomepage render', () => {
    logger.debug('Rendering EpochHomepage component', {
      scrolled,
      activeSection,
    });
  });

  return (
    <>
      <Header isScrolled={scrolled} />

      <main>
        <HeroSection ref={heroRef} />

        <section className={styles.about} id="about" aria-labelledby="about-heading">
          <div className={styles.aboutInner}>
            <div className={styles.sectionHeader}>
              <p className={styles.sectionLabel} id="about-heading">
                About us
              </p>
              <h2 className={styles.sectionTitle}>About Epoch</h2>
            </div>
            <div className={styles.aboutContent}>
              <div className={styles.aboutText}>
                <p className={styles.aboutParagraph}>
                  Founded on the principle that exceptional software emerges from the intersection
                  of deep technical expertise and relentless attention to detail, Epoch represents
                  a new paradigm in software development.
                </p>
                <p className={styles.aboutParagraph}>
                  We believe that every line of code tells a story—one of intention, precision, and
                  purpose. Our team combines decades of collective experience across cutting-edge
                  technologies with an unwavering commitment to craftsmanship that mirrors the
                  precision of Swiss watchmakers.
                </p>
                <p className={styles.aboutParagraph}>
                  At Epoch, we don&apos;t just build software; we architect digital experiences that
                  stand the test of time. Each project is an opportunity to push the boundaries of
                  what&apos;s possible while maintaining the reliability and elegance that define truly
                  exceptional systems.
                </p>
              </div>
              <div className={styles.aboutStats}>
                <div className={styles.stat}>
                  <div className={styles.statNumber}>10+</div>
                  <div className={styles.statLabel}>Years of Excellence</div>
                </div>
                <div className={styles.stat}>
                  <div className={styles.statNumber}>50+</div>
                  <div className={styles.statLabel}>Projects Delivered</div>
                </div>
                <div className={styles.stat}>
                  <div className={styles.statNumber}>99.9%</div>
                  <div className={styles.statLabel}>Uptime Achieved</div>
                </div>
                <div className={styles.stat}>
                  <div className={styles.statNumber}>&lt;100ms</div>
                  <div className={styles.statLabel}>Average Response Time</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.services} id="services" aria-labelledby="services-heading">
          <div className={styles.servicesInner}>
            <div className={styles.sectionHeader}>
              <p className={styles.sectionLabel} id="services-heading">Our capabilities</p>
              <h2 className={styles.sectionTitle}>Services that transcend boundaries</h2>
            </div>
            <div className={styles.servicesGrid}>
              <div className={styles.serviceItem} data-service="01">
                <div className={styles.serviceNumber}>
                  <span className={styles.numberMain}>01</span>
                  <span className={styles.numberGhost}>01</span>
                </div>
                <div className={styles.serviceContent}>
                  <h3 className={styles.serviceTitle}>Custom Software Development</h3>
                  <p className={styles.serviceDescription}>
                    Architecting digital ecosystems with precision engineering. From concept to deployment, 
                    we craft bespoke solutions that evolve with your vision.
                  </p>
                  <div className={styles.serviceTags}>
                    <span className={styles.serviceTag}>Full-stack</span>
                    <span className={styles.serviceTag}>API Integration</span>
                    <span className={styles.serviceTag}>Architecture</span>
                  </div>
                </div>
                <div className={styles.serviceOrbit}>
                  <div className={styles.orbitRing}></div>
                  <div className={styles.orbitParticle}></div>
                </div>
              </div>

              <div className={styles.serviceItem} data-service="02">
                <div className={styles.serviceNumber}>
                  <span className={styles.numberMain}>02</span>
                  <span className={styles.numberGhost}>02</span>
                </div>
                <div className={styles.serviceContent}>
                  <h3 className={styles.serviceTitle}>AI & Machine Learning</h3>
                  <p className={styles.serviceDescription}>
                    Harnessing artificial intelligence to unlock patterns in complexity. 
                    We transform data into actionable intelligence through cutting-edge algorithms.
                  </p>
                  <div className={styles.serviceTags}>
                    <span className={styles.serviceTag}>Predictive Analytics</span>
                    <span className={styles.serviceTag}>NLP</span>
                    <span className={styles.serviceTag}>Computer Vision</span>
                  </div>
                </div>
                <div className={styles.serviceOrbit}>
                  <div className={styles.orbitRing}></div>
                  <div className={styles.orbitParticle}></div>
                </div>
              </div>

              <div className={styles.serviceItem} data-service="03">
                <div className={styles.serviceNumber}>
                  <span className={styles.numberMain}>03</span>
                  <span className={styles.numberGhost}>03</span>
                </div>
                <div className={styles.serviceContent}>
                  <h3 className={styles.serviceTitle}>Cloud Architecture</h3>
                  <p className={styles.serviceDescription}>
                    Building resilient infrastructure that scales beyond horizons. Our cloud solutions 
                    ensure applications perform flawlessly under any pressure.
                  </p>
                  <div className={styles.serviceTags}>
                    <span className={styles.serviceTag}>Microservices</span>
                    <span className={styles.serviceTag}>DevOps</span>
                    <span className={styles.serviceTag}>Security</span>
                  </div>
                </div>
                <div className={styles.serviceOrbit}>
                  <div className={styles.orbitRing}></div>
                  <div className={styles.orbitParticle}></div>
                </div>
              </div>

              <div className={styles.serviceItem} data-service="04">
                <div className={styles.serviceNumber}>
                  <span className={styles.numberMain}>04</span>
                  <span className={styles.numberGhost}>04</span>
                </div>
                <div className={styles.serviceContent}>
                  <h3 className={styles.serviceTitle}>Digital Experience Design</h3>
                  <p className={styles.serviceDescription}>
                    Crafting interfaces that feel like natural phenomena. We design experiences that 
                    bridge human intuition and digital possibility.
                  </p>
                  <div className={styles.serviceTags}>
                    <span className={styles.serviceTag}>UX/UI Design</span>
                    <span className={styles.serviceTag}>Prototyping</span>
                    <span className={styles.serviceTag}>Design Systems</span>
                  </div>
                </div>
                <div className={styles.serviceOrbit}>
                  <div className={styles.orbitRing}></div>
                  <div className={styles.orbitParticle}></div>
                </div>
              </div>

              <div className={styles.serviceItem} data-service="05">
                <div className={styles.serviceNumber}>
                  <span className={styles.numberMain}>05</span>
                  <span className={styles.numberGhost}>05</span>
                </div>
                <div className={styles.serviceContent}>
                  <h3 className={styles.serviceTitle}>Performance Optimization</h3>
                  <p className={styles.serviceDescription}>
                    Accelerating digital velocity through computational precision. We fine-tune systems 
                    to achieve quantum leaps in speed and efficiency.
                  </p>
                  <div className={styles.serviceTags}>
                    <span className={styles.serviceTag}>Code Optimization</span>
                    <span className={styles.serviceTag}>Database Tuning</span>
                    <span className={styles.serviceTag}>Load Testing</span>
                  </div>
                </div>
                <div className={styles.serviceOrbit}>
                  <div className={styles.orbitRing}></div>
                  <div className={styles.orbitParticle}></div>
                </div>
              </div>

              <div className={styles.serviceItem} data-service="06">
                <div className={styles.serviceNumber}>
                  <span className={styles.numberMain}>06</span>
                  <span className={styles.numberGhost}>06</span>
                </div>
                <div className={styles.serviceContent}>
                  <h3 className={styles.serviceTitle}>Technical Consulting</h3>
                  <p className={styles.serviceDescription}>
                    Navigating complexity of modern technology landscapes. Our expertise guides 
                    critical decisions that shape digital transformation futures.
                  </p>
                  <div className={styles.serviceTags}>
                    <span className={styles.serviceTag}>Architecture Reviews</span>
                    <span className={styles.serviceTag}>Tech Audits</span>
                    <span className={styles.serviceTag}>Strategic Planning</span>
                  </div>
                </div>
                <div className={styles.serviceOrbit}>
                  <div className={styles.orbitRing}></div>
                  <div className={styles.orbitParticle}></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.portfolio} id="portfolio" aria-labelledby="portfolio-heading" ref={portfolioRef}>
          <div className={styles.portfolioInner}>
            <div className={styles.sectionHeader}>
              <p className={styles.sectionLabel} id="portfolio-heading">Our work</p>
              <h2 className={styles.sectionTitle}>Digital phenomena we&apos;ve birthed</h2>
            </div>
            
            <div className={styles.portfolioGrid}>
              {PORTFOLIO_ITEMS.map((item, index) => (
                <div
                  key={item.id}
                  className={`${styles.portfolioItem} ${hoveredPortfolio === item.id ? styles.portfolioItemHovered : ''}`}
                  onMouseEnter={() => setHoveredPortfolio(item.id)}
                  onMouseLeave={() => setHoveredPortfolio(null)}
                  style={{
                    '--portfolio-delay': `${index * 0.1}s`,
                    '--portfolio-gradient': item.gradient
                  } as React.CSSProperties}
                >
                  <div className={styles.portfolioItemInner}>
                    <div className={styles.portfolioGradient}></div>
                    <div className={styles.portfolioContent}>
                      <div className={styles.portfolioCategory}>{item.category}</div>
                      <h3 className={styles.portfolioTitle}>{item.title}</h3>
                      <p className={styles.portfolioDescription}>{item.description}</p>
                      
                      <div className={styles.portfolioTags}>
                        {item.tags.map((tag, tagIndex) => (
                          <span key={tagIndex} className={styles.portfolioTag}>{tag}</span>
                        ))}
                      </div>
                      
                      <div className={styles.portfolioMetrics}>
                        <div className={styles.metric}>
                          <span className={styles.metricLabel}>Impact</span>
                          <span className={styles.metricValue}>{item.metrics.impact}</span>
                        </div>
                        <div className={styles.metric}>
                          <span className={styles.metricLabel}>Duration</span>
                          <span className={styles.metricValue}>{item.metrics.duration}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className={styles.portfolioHoverEffect}>
                      <div className={styles.portfolioParticles}>
                        {[...Array(6)].map((_, i) => (
                          <div key={i} className={styles.particle} style={{ '--particle-index': i } as React.CSSProperties}></div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.caseStudies} id="case-studies" aria-labelledby="case-studies-heading" ref={caseStudiesRef}>
          <div className={styles.caseStudiesInner}>
            <div className={styles.sectionHeader}>
              <p className={styles.sectionLabel} id="case-studies-heading">Deep dives</p>
              <h2 className={styles.sectionTitle}>Transformations that rewrote reality</h2>
            </div>
            
            <div className={styles.caseStudiesContainer}>
              <div className={styles.caseStudyTimeline}>
                {CASE_STUDIES.map((study, index) => (
                  <button
                    key={study.id}
                    className={`${styles.timelineItem} ${selectedCaseStudy === index ? styles.timelineItemActive : ''}`}
                    onClick={() => setSelectedCaseStudy(index)}
                    aria-label={`View ${study.title} case study`}
                  >
                    <div className={styles.timelineYear}>{study.year}</div>
                    <div className={styles.timelineTitle}>{study.title}</div>
                    <div className={styles.timelineProgress}></div>
                  </button>
                ))}
              </div>
              
              <div className={styles.caseStudyContent}>
                {CASE_STUDIES.map((study, index) => (
                  <div
                    key={study.id}
                    className={`${styles.caseStudyDetail} ${selectedCaseStudy === index ? styles.caseStudyDetailActive : ''}`}
                    style={{ '--case-gradient': study.gradient } as React.CSSProperties}
                  >
                    <div className={styles.caseStudyHeader}>
                      <div className={styles.caseStudyIndustry}>{study.industry}</div>
                      <h3 className={styles.caseStudyTitle}>{study.title}</h3>
                      <p className={styles.caseStudySubtitle}>{study.subtitle}</p>
                    </div>
                    
                    <div className={styles.caseStudyBody}>
                      <div className={styles.caseStudySection}>
                        <h4 className={styles.caseStudySectionTitle}>The Challenge</h4>
                        <p className={styles.caseStudySectionText}>{study.challenge}</p>
                      </div>
                      
                      <div className={styles.caseStudySection}>
                        <h4 className={styles.caseStudySectionTitle}>Our Solution</h4>
                        <p className={styles.caseStudySectionText}>{study.solution}</p>
                      </div>
                      
                      <div className={styles.caseStudySection}>
                        <h4 className={styles.caseStudySectionTitle}>The Results</h4>
                        <div className={styles.caseStudyResults}>
                          {study.results.map((result, resultIndex) => (
                            <div key={resultIndex} className={styles.resultItem}>
                              <div className={styles.resultIcon}>
                                <svg viewBox="0 0 24 24" width="24" height="24" fill="none">
                                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="currentColor"/>
                                </svg>
                              </div>
                              <span className={styles.resultText}>{result}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className={styles.caseStudyTech}>
                        <h4 className={styles.caseStudySectionTitle}>Technologies Used</h4>
                        <div className={styles.techStack}>
                          {study.technologies.map((tech, techIndex) => (
                            <span key={techIndex} className={styles.techItem}>{tech}</span>
                          ))}
                        </div>
                      </div>
                      
                      {study.testimonial && (
                        <div className={styles.caseStudyTestimonial}>
                          <blockquote className={styles.testimonialQuote}>
                            &quot;{study.testimonial.quote}&quot;
                          </blockquote>
                          <div className={styles.testimonialAuthor}>
                            <div className={styles.authorName}>{study.testimonial.author}</div>
                            <div className={styles.authorPosition}>{study.testimonial.position}</div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <ClientsSection />

        <section className={styles.contact} id="contact" aria-labelledby="contact-heading">
          <div className={styles.contactInner}>
            <div className={styles.sectionHeader}>
              <p className={styles.sectionLabel} id="contact-heading">Get in touch</p>
              <h2 className={styles.sectionTitle}>Ready to build something extraordinary?</h2>
            </div>
            
            <div className={styles.contactContent}>
              <div className={styles.contactInfo}>
                <p className={styles.contactDescription}>
                  Let&apos;s discuss how we can transform your vision into reality. 
                  Our team is ready to tackle complex challenges and deliver 
                  exceptional solutions that drive real results.
                </p>
                
                <div className={styles.contactMethods}>
                  <div className={styles.contactMethod}>
                    <div className={styles.contactIcon}>
                      <svg viewBox="0 0 24 24" width="24" height="24" fill="none">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="2"/>
                        <polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                    </div>
                    <div className={styles.contactDetails}>
                      <span className={styles.contactLabel}>Email</span>
                      <a href="mailto:hello@epoch.dev" className={styles.contactLink}>hello@epoch.dev</a>
                    </div>
                  </div>
                  
                  <div className={styles.contactMethod}>
                    <div className={styles.contactIcon}>
                      <svg viewBox="0 0 24 24" width="24" height="24" fill="none">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                    </div>
                    <div className={styles.contactDetails}>
                      <span className={styles.contactLabel}>Phone</span>
                      <a href="tel:+1234567890" className={styles.contactLink}>+1 (234) 567-890</a>
                    </div>
                  </div>
                  
                  <div className={styles.contactMethod}>
                    <div className={styles.contactIcon}>
                      <svg viewBox="0 0 24 24" width="24" height="24" fill="none">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke="currentColor" strokeWidth="2"/>
                        <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                    </div>
                    <div className={styles.contactDetails}>
                      <span className={styles.contactLabel}>Location</span>
                      <span className={styles.contactValue}>San Francisco, CA</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className={styles.contactCTA}>
                <a href="mailto:hello@epoch.dev" className={styles.contactButton}>
                  <span className={styles.contactButtonText}>Start a Project</span>
                  <div className={styles.contactButtonIcon}>
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
                      <path d="M7 17L17 7" stroke="currentColor" strokeWidth="2"/>
                      <path d="M7 7h10v10" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                  </div>
                  <div className={styles.contactButtonGlow}></div>
                </a>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}