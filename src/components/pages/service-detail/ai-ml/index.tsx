/**
 * @fileoverview AI and Machine Learning Development Service Detail Page
 * @author Epoch Development Team
 */

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Header } from '../../../layout/Header';
import { Footer } from '../../../layout/Footer';
import { Button } from '../../../ui/Button';
import styles from '../../../../../styles/ServiceDetail.module.css';

export default function AIMLServiceDetailPage() {
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
              <span className={styles.titleLine}>AI and</span>
              <span className={styles.titleLine}>
                <span className={styles.titleHighlight}>Machine Learning</span>
              </span>
              <span className={styles.titleLine}>Development</span>
            </h1>

            <p className={styles.heroDescription}>
              Transform your enterprise with intelligent systems that learn, adapt, and deliver measurable results. 
              We build AI solutions that turn data into competitive advantage.
            </p>

            <div className={styles.heroActions}>
              <Button 
                href="/contact?service=ai-ml" 
                variant="primary"
                size="large"
                icon={
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 2L11 13" />
                    <path d="M22 2L15 22L11 13L2 9L22 2Z" />
                  </svg>
                }
              >
                Start Your AI Journey
              </Button>
              <Button 
                onClick={() => document.getElementById('overview')?.scrollIntoView({ behavior: 'smooth' })}
                variant="outline"
                size="large"
              >
                Learn More
              </Button>
            </div>

            <div className={styles.heroStats}>
              <div className={styles.stat}>
                <div className={styles.statIcon}>
                  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
                  </svg>
                </div>
                <div className={styles.statContent}>
                  <span className={styles.statNumber}>78%</span>
                  <span className={styles.statLabel}>Organizations Using AI</span>
                </div>
              </div>
              <div className={styles.stat}>
                <div className={styles.statIcon}>
                  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <line x1="12" y1="1" x2="12" y2="23" />
                    <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
                  </svg>
                </div>
                <div className={styles.statContent}>
                  <span className={styles.statNumber}>$113B</span>
                  <span className={styles.statLabel}>Market Size by 2025</span>
                </div>
              </div>
              <div className={styles.stat}>
                <div className={styles.statIcon}>
                  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                  </svg>
                </div>
                <div className={styles.statContent}>
                  <span className={styles.statNumber}>40%</span>
                  <span className={styles.statLabel}>Cost Reduction</span>
                </div>
              </div>
            </div>

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
                Ethical AI Practices
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
            <h2 className={styles.sectionTitle}>Transforming Data Into Intelligence</h2>
            <div className={styles.overview}>
              <p className={styles.lead}>
                At EPOCH Software Services, we specialize in delivering transformative AI and Machine Learning solutions 
                that empower US enterprises to innovate, optimize, and lead in a data-driven world.
              </p>
              <p>
                As AI adoption accelerates—with 78% of organizations now using AI, up from 55% last year—our services 
                help you integrate intelligent systems seamlessly into your operations. Whether you&apos;re building 
                predictive models or deploying advanced algorithms, our team of experts ensures scalable, ethical, 
                and high-impact results tailored to your business needs.
              </p>
              <p>
                The global machine learning market is projected to reach $113.10 billion in 2025, highlighting the 
                immense demand for robust AI capabilities. Partner with us to harness this growth and turn your 
                data into a competitive advantage.
              </p>
            </div>
          </div>
        </section>

        {/* Expertise Section */}
        <section id="expertise" className={styles.section}>
          <div className={styles.sectionContent}>
            <h2 className={styles.sectionTitle}>Our Expertise in AI and ML</h2>
            <p className={styles.sectionIntro}>
              With years of experience serving US enterprises, EPOCH combines cutting-edge technology with 
              industry-specific insights.
            </p>
            
            <div className={styles.expertiseGrid}>
              <div className={styles.expertiseCard}>
                <div className={styles.expertiseIcon}>
                  <svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 2L2 7l10 5 10-5-10-5z" />
                    <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
                  </svg>
                </div>
                <h3>Agile Development</h3>
                <p>Rapid prototyping and iterative improvements with seamless integration</p>
              </div>

              <div className={styles.expertiseCard}>
                <div className={styles.expertiseIcon}>
                  <svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M9 11l5 5L22 8" />
                    <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
                  </svg>
                </div>
                <h3>In-Demand Skills</h3>
                <p>Machine learning engineering, NLP, and computer vision expertise</p>
              </div>

              <div className={styles.expertiseCard}>
                <div className={styles.expertiseIcon}>
                  <svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v6l4 2" />
                  </svg>
                </div>
                <h3>Real-World Solutions</h3>
                <p>Addressing automation, personalization, and efficiency challenges</p>
              </div>
            </div>
          </div>
        </section>

        {/* Key Services Section */}
        <section id="services" className={styles.section}>
          <div className={styles.sectionContent}>
            <h2 className={styles.sectionTitle}>Key Services We Offer</h2>
            <p className={styles.sectionIntro}>
              End-to-end AI and ML development services customized for enterprise needs in 2025
            </p>

            <div className={styles.servicesGrid}>
              <div className={styles.serviceCard}>
                <div className={styles.serviceHeader}>
                  <h3>Predictive Analytics</h3>
                  <div className={styles.serviceIcon}>
                    <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M3 3v18h18" />
                      <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3" />
                    </svg>
                  </div>
                </div>
                <p className={styles.serviceDescription}>
                  Leverage historical data to forecast trends, risks, and opportunities. Our predictive models 
                  use advanced algorithms to drive proactive decision-making.
                </p>
                <div className={styles.serviceApplications}>
                  <h4>Applications:</h4>
                  <ul>
                    <li>Sales forecasting</li>
                    <li>Supply chain optimization</li>
                    <li>Customer behavior analysis</li>
                    <li>Risk assessment</li>
                  </ul>
                </div>
                <div className={styles.serviceDemand}>
                  <span className={styles.demandBadge}>High Demand</span>
                  <p>Top AI skill enabling businesses to anticipate market shifts</p>
                </div>
              </div>

              <div className={styles.serviceCard}>
                <div className={styles.serviceHeader}>
                  <h3>Natural Language Processing</h3>
                  <div className={styles.serviceIcon}>
                    <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                    </svg>
                  </div>
                </div>
                <p className={styles.serviceDescription}>
                  Build systems that understand and generate human language for sentiment analysis, chatbots, 
                  and document summarization.
                </p>
                <div className={styles.serviceApplications}>
                  <h4>Applications:</h4>
                  <ul>
                    <li>Customer service automation</li>
                    <li>Content moderation</li>
                    <li>Legal document review</li>
                    <li>CRM integration</li>
                  </ul>
                </div>
                <div className={styles.serviceDemand}>
                  <span className={styles.demandBadge}>High Demand</span>
                  <p>Powers conversational AI for enhanced customer engagement</p>
                </div>
              </div>

              <div className={styles.serviceCard}>
                <div className={styles.serviceHeader}>
                  <h3>Model Training & Deployment</h3>
                  <div className={styles.serviceIcon}>
                    <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <circle cx="12" cy="12" r="3" />
                      <path d="M12 1v6M12 17v6M4.22 4.22l4.24 4.24M15.54 15.54l4.24 4.24" />
                    </svg>
                  </div>
                </div>
                <p className={styles.serviceDescription}>
                  Full lifecycle management from data preparation to cloud deployment using TensorFlow and PyTorch 
                  for custom models.
                </p>
                <div className={styles.serviceApplications}>
                  <h4>Applications:</h4>
                  <ul>
                    <li>Image recognition</li>
                    <li>Recommendation engines</li>
                    <li>Anomaly detection</li>
                    <li>Custom ML solutions</li>
                  </ul>
                </div>
                <div className={styles.serviceDemand}>
                  <span className={styles.demandBadge}>Critical Skill</span>
                  <p>ML engineering tops AI careers with surging deployment demand</p>
                </div>
              </div>

              <div className={styles.serviceCard}>
                <div className={styles.serviceHeader}>
                  <h3>Computer Vision</h3>
                  <div className={styles.serviceIcon}>
                    <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  </div>
                </div>
                <p className={styles.serviceDescription}>
                  Develop vision-based AI for object detection, facial recognition, and video analytics 
                  ideal for visual data processing.
                </p>
                <div className={styles.serviceApplications}>
                  <h4>Applications:</h4>
                  <ul>
                    <li>Quality control</li>
                    <li>Autonomous systems</li>
                    <li>Surveillance</li>
                    <li>Manufacturing inspection</li>
                  </ul>
                </div>
                <div className={styles.serviceDemand}>
                  <span className={styles.demandBadge}>High Growth</span>
                  <p>Highly sought for robotics and IoT applications</p>
                </div>
              </div>

              <div className={styles.serviceCard}>
                <div className={styles.serviceHeader}>
                  <h3>AI Ethics & Governance</h3>
                  <div className={styles.serviceIcon}>
                    <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      <path d="M9 12l2 2 4-4" />
                    </svg>
                  </div>
                </div>
                <p className={styles.serviceDescription}>
                  Ensure bias-free, transparent, and compliant AI implementations with GDPR and emerging 
                  US AI standards.
                </p>
                <div className={styles.serviceApplications}>
                  <h4>Applications:</h4>
                  <ul>
                    <li>Ethical AI deployment</li>
                    <li>Compliance audits</li>
                    <li>Bias mitigation</li>
                    <li>Responsible AI frameworks</li>
                  </ul>
                </div>
                <div className={styles.serviceDemand}>
                  <span className={styles.demandBadge}>Emerging</span>
                  <p>Critical role for enterprise AI risk mitigation</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section id="benefits" className={styles.section}>
          <div className={styles.sectionContent}>
            <h2 className={styles.sectionTitle}>Benefits of Our AI and ML Services</h2>
            
            <div className={styles.benefitsGrid}>
              <div className={styles.benefitCard}>
                <div className={styles.benefitIcon}>
                  <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                  </svg>
                </div>
                <h3>Enhanced Efficiency</h3>
                <p>Automate routine tasks, reducing operational costs by up to 40% through intelligent workflows</p>
              </div>

              <div className={styles.benefitCard}>
                <div className={styles.benefitIcon}>
                  <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.35-4.35" />
                  </svg>
                </div>
                <h3>Data-Driven Insights</h3>
                <p>Unlock hidden patterns in your data for better strategic planning and innovation</p>
              </div>

              <div className={styles.benefitCard}>
                <div className={styles.benefitIcon}>
                  <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                    <path d="M16 3.13a4 4 0 010 7.75" />
                  </svg>
                </div>
                <h3>Scalability</h3>
                <p>Deploy models that grow with your business, supported by cloud-native architectures</p>
              </div>

              <div className={styles.benefitCard}>
                <div className={styles.benefitIcon}>
                  <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                  </svg>
                </div>
                <h3>Competitive Edge</h3>
                <p>Stay ahead with technologies like deep learning, defining enterprise success in 2025</p>
              </div>

              <div className={styles.benefitCard}>
                <div className={styles.benefitIcon}>
                  <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="3" y="11" width="18" height="10" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0110 0v4" />
                  </svg>
                </div>
                <h3>Security & Compliance</h3>
                <p>Built-in safeguards to protect sensitive data and adhere to industry standards</p>
              </div>
            </div>
          </div>
        </section>

        {/* Industries Section */}
        <section id="industries" className={styles.section}>
          <div className={styles.sectionContent}>
            <h2 className={styles.sectionTitle}>Industry Applications</h2>
            <p className={styles.sectionIntro}>
              Our AI and ML solutions span multiple sectors, adapting to unique enterprise needs
            </p>

            <div className={styles.industriesGrid}>
              <div className={styles.industryCard}>
                <div className={styles.industryIcon}>
                  <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                  </svg>
                </div>
                <h3>Healthcare</h3>
                <p>Predictive diagnostics and personalized treatment plans</p>
              </div>

              <div className={styles.industryCard}>
                <div className={styles.industryIcon}>
                  <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                    <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" />
                  </svg>
                </div>
                <h3>Finance</h3>
                <p>Fraud detection and algorithmic trading</p>
              </div>

              <div className={styles.industryCard}>
                <div className={styles.industryIcon}>
                  <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="9" cy="21" r="1" />
                    <circle cx="20" cy="21" r="1" />
                    <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" />
                  </svg>
                </div>
                <h3>Retail</h3>
                <p>Personalized recommendations and inventory optimization</p>
              </div>

              <div className={styles.industryCard}>
                <div className={styles.industryIcon}>
                  <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                  </svg>
                </div>
                <h3>Manufacturing</h3>
                <p>Predictive maintenance and quality assurance</p>
              </div>

              <div className={styles.industryCard}>
                <div className={styles.industryIcon}>
                  <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="1" y="3" width="15" height="13" />
                    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                    <circle cx="5.5" cy="18.5" r="2.5" />
                    <circle cx="18.5" cy="18.5" r="2.5" />
                  </svg>
                </div>
                <h3>Logistics</h3>
                <p>Route optimization and demand forecasting</p>
              </div>
            </div>
          </div>
        </section>

        {/* Case Studies Section */}
        <section id="case-studies" className={styles.section}>
          <div className={styles.sectionContent}>
            <h2 className={styles.sectionTitle}>Success Stories</h2>
            
            <div className={styles.caseStudiesGrid}>
              <div className={styles.caseStudy}>
                <div className={styles.caseStudyHeader}>
                  <div className={styles.caseStudyIcon}>
                    <svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <circle cx="9" cy="21" r="1" />
                      <circle cx="20" cy="21" r="1" />
                      <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" />
                    </svg>
                  </div>
                  <h3>Retail Giant Boosts Sales</h3>
                </div>
                <div className={styles.caseStudyContent}>
                  <p>
                    A leading US retailer partnered with us to implement ML models for customer behavior prediction, 
                    resulting in a 25% increase in targeted marketing efficiency.
                  </p>
                  <div className={styles.caseStudyResults}>
                    <div className={styles.resultItem}>
                      <span className={styles.resultNumber}>25%</span>
                      <span className={styles.resultLabel}>Marketing Efficiency</span>
                    </div>
                    <div className={styles.resultItem}>
                      <span className={styles.resultNumber}>3M+</span>
                      <span className={styles.resultLabel}>Customers Analyzed</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.caseStudy}>
                <div className={styles.caseStudyHeader}>
                  <div className={styles.caseStudyIcon}>
                    <svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                      <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" />
                    </svg>
                  </div>
                  <h3>Financial Firm Enhances Security</h3>
                </div>
                <div className={styles.caseStudyContent}>
                  <p>
                    We developed an NLP-based system for real-time fraud detection, reducing false positives 
                    by 30% and saving millions in potential losses.
                  </p>
                  <div className={styles.caseStudyResults}>
                    <div className={styles.resultItem}>
                      <span className={styles.resultNumber}>30%</span>
                      <span className={styles.resultLabel}>Fewer False Positives</span>
                    </div>
                    <div className={styles.resultItem}>
                      <span className={styles.resultNumber}>$10M+</span>
                      <span className={styles.resultLabel}>Saved Annually</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Section */}
        <section className={styles.whyChooseSection}>
          <div className={styles.sectionContent}>
            <h2 className={styles.sectionTitle}>Why Choose EPOCH Software Services?</h2>
            
            <div className={styles.whyChooseGrid}>
              <div className={styles.whyChooseItem}>
                <h3>Proven Track Record</h3>
                <p>We&apos;ve helped US enterprises deploy AI solutions that drive ROI with measurable outcomes</p>
              </div>
              <div className={styles.whyChooseItem}>
                <h3>Expert Team</h3>
                <p>Certified AI specialists with expertise in Python, data science, and ML frameworks</p>
              </div>
              <div className={styles.whyChooseItem}>
                <h3>Customized Approach</h3>
                <p>Every project starts with thorough assessment to align AI with your business goals</p>
              </div>
              <div className={styles.whyChooseItem}>
                <h3>Ongoing Support</h3>
                <p>Post-deployment maintenance, updates, and optimization to keep systems cutting-edge</p>
              </div>
              <div className={styles.whyChooseItem}>
                <h3>Innovation-Driven</h3>
                <p>We stay ahead of trends, incorporating latest AI advancements and methodologies</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className={styles.ctaSection}>
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>Ready to Transform Your Business with AI?</h2>
            <p className={styles.ctaDescription}>
              Contact EPOCH Software Services today for a free consultation. Let&apos;s discuss how our AI and 
              Machine Learning Development services can propel your enterprise into the future.
            </p>
            <div className={styles.ctaButtons}>
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
                Start Your AI Journey
              </Button>
              <Button 
                href="/services" 
                variant="outline"
                size="large"
              >
                Explore More Services
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
}