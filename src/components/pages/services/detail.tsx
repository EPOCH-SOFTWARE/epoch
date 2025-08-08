/**
 * @fileoverview Service detail page component
 * @author Epoch Development Team
 */

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Header } from '../../layout/Header';
import { Footer } from '../../layout/Footer';
import { Button } from '../../ui/Button';
import type { ServiceDetailData } from '@/src/shared/constants/serviceData';
import styles from '../../../../styles/ServiceDetail.module.css';

interface ServiceDetailPageProps {
  serviceData: ServiceDetailData;
}

export function ServiceDetailPage({ serviceData }: ServiceDetailPageProps) {
  const [activeSection, setActiveSection] = useState('overview');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const sections = [
    { id: 'overview', label: 'Overview' },
    { id: 'expertise', label: 'Our Expertise' },
    { id: 'services', label: 'Key Services' },
    { id: 'benefits', label: 'Benefits' },
    { id: 'industries', label: 'Industries' },
    { id: 'case-studies', label: 'Case Studies' },
  ];

  return (
    <>
      <Header />
      <main className={styles.serviceDetailMain}>
        <div className={styles.backgroundEffect}></div>

        {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles.heroBackground}>
            <div className={styles.heroPattern}></div>
            <div className={styles.heroGradient}></div>
          </div>
          
          <div className={styles.heroContent}>
            <Link href="/services" className={styles.backLink}>
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
              Back to Services
            </Link>
            
            <h1 className={styles.heroTitle}>
              {serviceData.heroTitle.split(' ').map((word, index) => {
                // Special handling for specific service patterns
                if (serviceData.id === 'ai-ml') {
                  if (index === 0) return <span key={index} className={styles.titleLine}>AI and</span>;
                  if (index === 2) return <span key={index} className={styles.titleLine}><span className={styles.titleHighlight}>Machine Learning</span></span>;
                  if (index === 4) return <span key={index} className={styles.titleLine}>Development</span>;
                  return null;
                } else if (serviceData.id === 'generative-ai') {
                  if (index === 0) return <span key={index} className={styles.titleLine}><span className={styles.titleHighlight}>Generative AI</span></span>;
                  if (index === 2) return <span key={index} className={styles.titleLine}>Solutions</span>;
                  return null;
                } else if (serviceData.id === 'cloud-computing') {
                  if (index === 0) return <span key={index} className={styles.titleLine}><span className={styles.titleHighlight}>Cloud Computing</span></span>;
                  if (index === 2) return <span key={index} className={styles.titleLine}>Solutions</span>;
                  return null;
                } else if (serviceData.id === 'cybersecurity') {
                  if (index === 0) return <span key={index} className={styles.titleLine}><span className={styles.titleHighlight}>Cybersecurity</span></span>;
                  if (index === 1) return <span key={index} className={styles.titleLine}>Solutions</span>;
                  return null;
                } else if (serviceData.id === 'custom-software') {
                  if (index === 0) return <span key={index} className={styles.titleLine}>Custom</span>;
                  if (index === 1) return <span key={index} className={styles.titleLine}><span className={styles.titleHighlight}>Software</span></span>;
                  if (index === 2) return <span key={index} className={styles.titleLine}>Development</span>;
                  return null;
                } else if (serviceData.id === 'data-analytics') {
                  if (index === 0) return <span key={index} className={styles.titleLine}>Data Analytics &</span>;
                  if (index === 2) return <span key={index} className={styles.titleLine}><span className={styles.titleHighlight}>Business Intelligence</span></span>;
                  return null;
                } else if (serviceData.id === 'iot') {
                  if (index === 0) return <span key={index} className={styles.titleLine}><span className={styles.titleHighlight}>IoT Application</span></span>;
                  if (index === 2) return <span key={index} className={styles.titleLine}>Development</span>;
                  return null;
                } else if (serviceData.id === 'blockchain') {
                  if (index === 0) return <span key={index} className={styles.titleLine}><span className={styles.titleHighlight}>Blockchain</span></span>;
                  if (index === 1) return <span key={index} className={styles.titleLine}>Development</span>;
                  return null;
                } else if (serviceData.id === 'devops') {
                  if (index === 0) return <span key={index} className={styles.titleLine}><span className={styles.titleHighlight}>DevOps and</span></span>;
                  if (index === 2) return <span key={index} className={styles.titleLine}>Automation</span>;
                  if (index === 3) return <span key={index} className={styles.titleLine}>Services</span>;
                  return null;
                } else if (serviceData.id === 'mobile') {
                  if (index === 0) return <span key={index} className={styles.titleLine}><span className={styles.titleHighlight}>Mobile Application</span></span>;
                  if (index === 2) return <span key={index} className={styles.titleLine}>Development</span>;
                  return null;
                } else if (serviceData.id === 'digital-transformation') {
                  if (index === 0) return <span key={index} className={styles.titleLine}><span className={styles.titleHighlight}>Digital Transformation</span></span>;
                  if (index === 2) return <span key={index} className={styles.titleLine}>Consulting</span>;
                  return null;
                } else if (serviceData.id === 'arvr') {
                  if (index === 0) return <span key={index} className={styles.titleLine}><span className={styles.titleHighlight}>AR VR</span></span>;
                  if (index === 2) return <span key={index} className={styles.titleLine}>Spatial Computing</span>;
                  if (index === 4) return <span key={index} className={styles.titleLine}>Solutions</span>;
                  return null;
                }
                return null;
              })}
            </h1>

            <p className={styles.heroDescription}>
              {serviceData.heroDescription}
            </p>

            <div className={styles.heroActions}>
              <Button 
                href={`/contact?service=${serviceData.id}`}
                variant="primary"
                size="large"
                icon={
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 2L11 13" />
                    <path d="M22 2L15 22L11 13L2 9L22 2Z" />
                  </svg>
                }
              >
                {serviceData.ctaButtonText}
              </Button>
              <Button 
                onClick={() => document.getElementById('overview')?.scrollIntoView({ behavior: 'smooth' })}
                variant="outline"
                size="large"
              >
                Learn More
              </Button>
            </div>

            {serviceData.stats && (
              <div className={styles.heroStats}>
                {serviceData.stats.slice(0, 3).map((stat, index) => (
                  <div key={index} className={styles.stat}>
                    <div className={styles.statIcon}>
                      {index === 0 && (
                        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                          <circle cx="9" cy="7" r="4" />
                          <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
                        </svg>
                      )}
                      {index === 1 && (
                        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <line x1="12" y1="1" x2="12" y2="23" />
                          <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
                        </svg>
                      )}
                      {index === 2 && (
                        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                        </svg>
                      )}
                    </div>
                    <div className={styles.statContent}>
                      <span className={styles.statNumber}>{stat.value}</span>
                      <span className={styles.statLabel}>{stat.label}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className={styles.heroHighlights}>
              <div className={styles.highlight}>
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M9 11l5 5L22 8" />
                  <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
                </svg>
                Enterprise-Grade Solutions
              </div>
              <div className={styles.highlight}>
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                Best Practices
              </div>
              <div className={styles.highlight}>
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="3" />
                  <path d="M12 1v6M12 17v6M4.22 4.22l4.24 4.24M15.54 15.54l4.24 4.24" />
                </svg>
                24/7 Support
              </div>
            </div>
          </div>
        </section>

        {/* Navigation */}
        <nav className={`${styles.stickyNav} ${scrolled ? styles.scrolled : ''}`}>
          <div className={styles.navContainer}>
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => {
                  setActiveSection(section.id);
                  document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`${styles.navItem} ${activeSection === section.id ? styles.active : ''}`}
              >
                {section.label}
              </button>
            ))}
          </div>
        </nav>

        {/* Overview Section */}
        <section id="overview" className={styles.section}>
          <div className={styles.sectionContent}>
            <div className={styles.overviewHeader}>
              <h2 className={styles.sectionTitle}>{serviceData.overview.title}</h2>
            </div>
            
            <div className={styles.overviewContainer}>
              <div className={styles.overviewMain}>
                <p className={styles.lead}>
                  {serviceData.overview.description}
                </p>
                
                <div className={styles.keyPointsGrid}>
                  {serviceData.overview.keyPoints.map((point, index) => (
                    <div key={index} className={styles.keyPointCard}>
                      <div className={styles.keyPointNumber}>
                        <span>{String(index + 1).padStart(2, '0')}</span>
                      </div>
                      <div className={styles.keyPointContent}>
                        <p>{point}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className={styles.overviewSidebar}>
                <div className={styles.overviewHighlight}>
                  <div className={styles.highlightIcon}>
                    <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                    </svg>
                  </div>
                  <h3>Why Choose EPOCH?</h3>
                  <ul>
                    <li>Industry-leading expertise</li>
                    <li>Proven track record</li>
                    <li>End-to-end solutions</li>
                    <li>24/7 dedicated support</li>
                  </ul>
                </div>
                
                <div className={styles.overviewQuote}>
                  <svg className={styles.quoteIcon} viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                    <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" />
                  </svg>
                  <p>Transform your business with cutting-edge {serviceData.name.toLowerCase()} solutions designed for the future.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Expertise Section */}
        <section id="expertise" className={styles.section}>
          <div className={styles.sectionContent}>
            <h2 className={styles.sectionTitle}>{serviceData.expertise.title}</h2>
            <p className={styles.sectionIntro}>
              {serviceData.expertise.description}
            </p>
            
            <div className={styles.expertiseGrid}>
              {serviceData.expertise.skills.slice(0, 3).map((skill, index) => (
                <div key={index} className={styles.expertiseCard}>
                  <div className={styles.expertiseIcon}>
                    {index === 0 && (
                      <svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M12 2L2 7l10 5 10-5-10-5z" />
                        <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
                      </svg>
                    )}
                    {index === 1 && (
                      <svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M9 11l5 5L22 8" />
                        <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
                      </svg>
                    )}
                    {index === 2 && (
                      <svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 6v6l4 2" />
                      </svg>
                    )}
                  </div>
                  <h3>{skill.name}</h3>
                  <p>{skill.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Key Services Section */}
        <section id="services" className={styles.section}>
          <div className={styles.sectionContent}>
            <h2 className={styles.sectionTitle}>Key Services We Offer</h2>
            <p className={styles.sectionIntro}>
              End-to-end {serviceData.name.toLowerCase()} services customized for enterprise needs
            </p>

            <div className={styles.servicesGrid}>
              {serviceData.keyServices.map((service, index) => (
                <div key={index} className={styles.serviceCard}>
                  <div className={styles.serviceHeader}>
                    <h3>{service.title}</h3>
                    <div className={styles.serviceIcon}>
                      {index === 0 && (
                        <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path d="M3 3v18h18" />
                          <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3" />
                        </svg>
                      )}
                      {index === 1 && (
                        <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                        </svg>
                      )}
                      {index === 2 && (
                        <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <circle cx="12" cy="12" r="3" />
                          <path d="M12 1v6M12 17v6M4.22 4.22l4.24 4.24M15.54 15.54l4.24 4.24" />
                        </svg>
                      )}
                      {index === 3 && (
                        <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                      )}
                      {index === 4 && (
                        <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                          <path d="M9 12l2 2 4-4" />
                        </svg>
                      )}
                      {index > 4 && (
                        <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                          <line x1="9" y1="9" x2="15" y2="9" />
                          <line x1="9" y1="15" x2="15" y2="15" />
                        </svg>
                      )}
                    </div>
                  </div>
                  <p className={styles.serviceDescription}>
                    {service.description}
                  </p>
                  <div className={styles.serviceApplications}>
                    <h4>Applications:</h4>
                    <ul>
                      {service.features.slice(0, 4).map((feature, featureIndex) => (
                        <li key={featureIndex}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                  <div className={styles.serviceDemand}>
                    <span className={styles.demandBadge}>
                      {index === 0 ? 'High Demand' : index === 1 ? 'High Demand' : index === 2 ? 'Critical Skill' : index === 3 ? 'High Growth' : 'Emerging'}
                    </span>
                    <p>{index === 0 ? 'Top skill enabling businesses to stay competitive' : 
                       index === 1 ? 'Powers enhanced engagement and automation' : 
                       index === 2 ? 'Essential for modern deployment and scaling' : 
                       index === 3 ? 'Highly sought for advanced applications' : 
                       'Critical role for enterprise risk mitigation'}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section id="benefits" className={styles.section}>
          <div className={styles.sectionContent}>
            <h2 className={styles.sectionTitle}>Benefits of Our {serviceData.name} Services</h2>
            
            <div className={styles.benefitsGrid}>
              {serviceData.benefits.slice(0, 5).map((benefit, index) => (
                <div key={index} className={styles.benefitCard}>
                  <div className={styles.benefitIcon}>
                    {index === 0 && (
                      <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                      </svg>
                    )}
                    {index === 1 && (
                      <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <circle cx="11" cy="11" r="8" />
                        <path d="m21 21-4.35-4.35" />
                      </svg>
                    )}
                    {index === 2 && (
                      <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                        <path d="M16 3.13a4 4 0 010 7.75" />
                      </svg>
                    )}
                    {index === 3 && (
                      <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                      </svg>
                    )}
                    {index === 4 && (
                      <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <rect x="3" y="11" width="18" height="10" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 0110 0v4" />
                      </svg>
                    )}
                  </div>
                  <h3>{benefit.title}</h3>
                  <p>{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Industries Section */}
        <section id="industries" className={styles.section}>
          <div className={styles.sectionContent}>
            <h2 className={styles.sectionTitle}>Industry Applications</h2>
            <p className={styles.sectionIntro}>
              Our {serviceData.name.toLowerCase()} solutions span multiple sectors, adapting to unique enterprise needs
            </p>

            <div className={styles.industriesGrid}>
              {serviceData.industries.map((industry, index) => (
                <div key={index} className={styles.industryCard}>
                  <div className={styles.industryIcon}>
                    {industry.name === 'Healthcare' && (
                      <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                      </svg>
                    )}
                    {(industry.name === 'Finance' || industry.name === 'Financial Services' || industry.name === 'Banking') && (
                      <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                        <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" />
                      </svg>
                    )}
                    {industry.name === 'Retail' && (
                      <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <circle cx="9" cy="21" r="1" />
                        <circle cx="20" cy="21" r="1" />
                        <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" />
                      </svg>
                    )}
                    {industry.name === 'Manufacturing' && (
                      <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                      </svg>
                    )}
                    {industry.name === 'Logistics' && (
                      <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <rect x="1" y="3" width="15" height="13" />
                        <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                        <circle cx="5.5" cy="18.5" r="2.5" />
                        <circle cx="18.5" cy="18.5" r="2.5" />
                      </svg>
                    )}
                    {!['Healthcare', 'Finance', 'Financial Services', 'Banking', 'Retail', 'Manufacturing', 'Logistics'].includes(industry.name) && (
                      <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
                      </svg>
                    )}
                  </div>
                  <h3>{industry.name}</h3>
                  <p>{industry.applications.slice(0, 2).join(' and ')}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Case Studies Section */}
        <section id="case-studies" className={styles.section}>
          <div className={styles.sectionContent}>
            <h2 className={styles.sectionTitle}>Success Stories</h2>
            
            <div className={styles.caseStudiesGrid}>
              {serviceData.caseStudies && serviceData.caseStudies.slice(0, 2).map((study, index) => (
                <div key={index} className={styles.caseStudy}>
                  <div className={styles.caseStudyHeader}>
                    <div className={styles.caseStudyIcon}>
                      {index === 0 && (
                        <svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <circle cx="9" cy="21" r="1" />
                          <circle cx="20" cy="21" r="1" />
                          <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" />
                        </svg>
                      )}
                      {index === 1 && (
                        <svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                          <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" />
                        </svg>
                      )}
                    </div>
                    <h3>{study.title}</h3>
                  </div>
                  <div className={styles.caseStudyContent}>
                    <p>
                      {study.solution}
                    </p>
                    <div className={styles.caseStudyResults}>
                      {study.results.slice(0, 2).map((result, resultIndex) => (
                        <div key={resultIndex} className={styles.resultItem}>
                          <span className={styles.resultNumber}>{result.split(' ')[0]}</span>
                          <span className={styles.resultLabel}>{result.substring(result.indexOf(' ') + 1)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className={styles.ctaSection}>
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>{serviceData.ctaTitle}</h2>
            <p className={styles.ctaDescription}>
              {serviceData.ctaDescription}
            </p>
            <Button 
              href={`/contact?service=${serviceData.id}`}
              variant="primary"
              size="large"
              className={styles.ctaButton}
            >
              {serviceData.ctaButtonText}
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}