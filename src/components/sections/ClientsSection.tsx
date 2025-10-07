/**
 * @fileoverview Enhanced clients section component serving as hub for client details
 * @author Epoch Development Team
 */

'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { CLIENT_LOGOS, type ClientLogoProps } from '../../shared/constants/content';
import styles from '../../../styles/ClientsSection.module.css';

interface ClientsSectionProps {
  className?: string;
  isStandalone?: boolean; // Whether this is used as standalone hub page
}

interface ClientPreviewData extends ClientLogoProps {
  industry: string;
  projectType: string;
  yearWorked: string;
  previewDescription: string;
  keyResult: string;
}

// Enhanced client data with comprehensive case study information (Chronological order - newest first)
const CLIENT_PREVIEW_DATA: ClientPreviewData[] = [
  {
    ...CLIENT_LOGOS[0]!, // Inspira Financial
    industry: 'Financial Services',
    projectType: 'Platform Modernization & Cloud Migration',
    yearWorked: '2024',
    previewDescription: 'Architected and deployed a next-generation fintech platform for Inspira Financial, migrating from legacy mainframe systems to cloud-native microservices architecture. Implemented real-time transaction processing, advanced security protocols including multi-factor authentication and encryption. Built comprehensive analytics dashboard for portfolio management and risk assessment. Developed API-first architecture enabling seamless third-party integrations and white-label solutions for partner institutions.',
    keyResult: '99.9% uptime achieved, 70% faster transactions, 50% operational cost reduction'
  },
  {
    ...CLIENT_LOGOS[1]!, // HUB International
    industry: 'Insurance',
    projectType: 'Digital Transformation & AI Integration',
    yearWorked: '2023',
    previewDescription: 'Transformed HUB International\'s legacy insurance operations through comprehensive digital modernization. Implemented AI-powered risk assessment algorithms, automated claim processing workflows, and real-time fraud detection systems. Developed custom policy management platform with seamless integration to existing enterprise systems. Created mobile-first customer portal enabling instant quotes, policy modifications, and claim submissions. Enhanced data analytics capabilities with predictive modeling for risk assessment and customer behavior analysis.',
    keyResult: '60% faster claim processing, 40% reduction in fraud, 85% customer satisfaction increase'
  },
  {
    ...CLIENT_LOGOS[2]!, // Destify
    industry: 'Travel Technology',
    projectType: 'Intelligent Mobile Platform & Booking Engine',
    yearWorked: '2022',
    previewDescription: 'Developed intelligent travel planning platform for Destify with real-time booking and personalized recommendations. Implemented AI-powered itinerary optimization considering user preferences, budget constraints, and seasonal factors. Created comprehensive booking engine integrating flights, hotels, activities, and transportation. Built social features enabling trip sharing and collaborative planning. Enhanced platform with predictive pricing, weather integration, and real-time travel alerts.',
    keyResult: '180% user engagement, 120% booking conversion, 90% customer satisfaction'
  },
  {
    ...CLIENT_LOGOS[3]!, // Cardinal Health
    industry: 'Healthcare',
    projectType: 'AI-Powered Supply Chain Optimization',
    yearWorked: '2021',
    previewDescription: 'Revolutionized Cardinal Health\'s supply chain operations through AI and machine learning integration. Developed predictive analytics for inventory management, demand forecasting, and automated reordering systems. Implemented IoT sensors for real-time tracking of pharmaceutical products with temperature and humidity monitoring. Created HIPAA-compliant data platform for healthcare analytics and regulatory reporting. Built mobile applications for field representatives with offline capability and real-time synchronization.',
    keyResult: '40% cost reduction, 60% inventory accuracy improvement, 99.5% regulatory compliance'
  },
  {
    ...CLIENT_LOGOS[4]!, // Rural King
    industry: 'Retail',
    projectType: 'Omnichannel Digital Transformation',
    yearWorked: '2020',
    previewDescription: 'Unified Rural King\'s online and in-store experiences through comprehensive omnichannel solution. Developed integrated inventory management system with real-time stock visibility across all locations. Implemented buy-online-pickup-in-store functionality with mobile app integration. Created customer analytics platform tracking behavior across all touchpoints. Built loyalty program with personalized offers and agricultural seasonal recommendations. Enhanced supply chain visibility with vendor portal and automated procurement.',
    keyResult: '150% online growth, 90% inventory accuracy, 65% customer retention increase'
  },
  {
    ...CLIENT_LOGOS[5]!, // BlueSky Commerce
    industry: 'E-commerce',
    projectType: 'Innovative Platform Development with AR/VR',
    yearWorked: '2019',
    previewDescription: 'Created cutting-edge e-commerce platform for BlueSky Commerce featuring augmented reality product visualization and AI-powered recommendations. Developed mobile-first progressive web application with offline shopping capabilities. Implemented intelligent inventory management with predictive analytics for demand forecasting. Built comprehensive seller portal with automated fulfillment, dynamic pricing algorithms, and integrated payment processing. Enhanced customer experience through personalized product discovery and virtual try-on features.',
    keyResult: '200% conversion increase, 150% customer engagement, 80% return rate reduction'
  },
  {
    ...CLIENT_LOGOS[6]!, // Skeps
    industry: 'Fintech',
    projectType: 'Robust Payment Infrastructure & API Development',
    yearWorked: '2018',
    previewDescription: 'Built enterprise-grade payment infrastructure for Skeps with seamless integrations and compliance-first architecture. Developed RESTful APIs supporting multiple payment methods, installment loans, and merchant financing solutions. Implemented real-time underwriting algorithms with machine learning risk assessment. Created comprehensive merchant onboarding platform with automated KYC/AML compliance. Enhanced fraud prevention through behavioral analytics and transaction pattern recognition.',
    keyResult: '99.99% API reliability, 80% faster underwriting, 95% merchant satisfaction'
  },
  {
    ...CLIENT_LOGOS[7]!, // Shift4
    industry: 'Payment Processing',
    projectType: 'Performance Optimization & Security Enhancement',
    yearWorked: '2017',
    previewDescription: 'Optimized Shift4\'s payment processing infrastructure to handle high-volume transactions with sub-second response times. Implemented advanced fraud detection using machine learning algorithms and real-time transaction monitoring. Enhanced PCI DSS compliance through secure tokenization and end-to-end encryption. Developed merchant dashboard with comprehensive analytics, chargeback management, and automated reconciliation. Created scalable API gateway supporting 10M+ daily transactions.',
    keyResult: '85% faster transactions, 95% fraud reduction, zero security breaches'
  },
  {
    ...CLIENT_LOGOS[8]!, // IDrive
    industry: 'Cloud Storage',
    projectType: 'Infrastructure Scaling & Platform Enhancement',
    yearWorked: '2016',
    previewDescription: 'Architected next-generation cloud storage platform for IDrive with enhanced data protection and sync capabilities. Implemented advanced deduplication algorithms reducing storage requirements by 70%. Developed cross-platform synchronization with conflict resolution and version control. Enhanced security through zero-knowledge encryption and multi-layered backup strategies. Created high-performance API supporting millions of concurrent users with global CDN integration for optimal performance.',
    keyResult: '300% storage efficiency, 99.99% data durability, 90% sync speed improvement'
  }
];

export function ClientsSection({ className, isStandalone = false }: ClientsSectionProps) {
  const router = useRouter();
  const [hoveredClient, setHoveredClient] = useState<string | null>(null);
  const [selectedIndustry, setSelectedIndustry] = useState<string>('All');
  const [expandedDescriptions, setExpandedDescriptions] = useState<{[key: string]: boolean}>({});
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const toggleDescription = (clientId: string) => {
    setExpandedDescriptions(prev => ({
      ...prev,
      [clientId]: !prev[clientId]
    }));
  };

  const truncateText = (text: string, maxLength: number = 150) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim();
  };

  // Get unique industries for filtering
  const industries = ['All', ...Array.from(new Set(CLIENT_PREVIEW_DATA.map(client => client.industry)))];

  // Background animation for standalone page
  useEffect(() => {
    if (!isStandalone) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      opacity: number;
    }> = [];

    // Create particles
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.1
      });
    }

    const animate = () => {
      ctx.fillStyle = 'rgba(10, 10, 10, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(154, 205, 50, ${particle.opacity})`;
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isStandalone]);

  // Filter clients based on selected industry
  const filteredClients = selectedIndustry === 'All' 
    ? CLIENT_PREVIEW_DATA 
    : CLIENT_PREVIEW_DATA.filter(client => client.industry === selectedIndustry);

  const handleClientClick = (clientId: string) => {
    router.push(`/clients/${clientId}`);
  };

  return (
    <section 
      className={`${styles.clients} ${className || ''} ${isStandalone ? styles.standalone : ''}`}
      id="clients" 
      aria-labelledby="clients-heading"
    >
      {/* Canvas background for standalone page */}
      {isStandalone && <canvas ref={canvasRef} className={styles.backgroundCanvas} />}

      <div className={styles.clientsInner}>
        {/* Hero Section for standalone */}
        {isStandalone && (
          <div className={styles.hero}>
            <div className={styles.heroContent}>
              <span className={styles.heroLabel} id="clients-heading">Our Partnerships</span>
              <h1 className={styles.heroTitle}>
                <span className={styles.titleLine}>Transforming</span>
                <span className={styles.titleLine}>
                  <span className={styles.titleHighlight}>Business Futures</span>
                </span>
                <span className={styles.titleLine}>Together</span>
              </h1>
              <p className={styles.heroDescription}>
                Each partnership tells a story of innovation, challenge, and breakthrough success. 
                Discover how we{`'`}ve collaborated with industry leaders to deliver transformative solutions 
                that drive measurable results and lasting impact.
              </p>
            </div>

            <div className={styles.heroStats}>
              <div className={styles.stat}>
                <span className={styles.statNumber}>9+</span>
                <span className={styles.statLabel}>Enterprise Partners</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNumber}>5</span>
                <span className={styles.statLabel}>Industries Served</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNumber}>100%</span>
                <span className={styles.statLabel}>Success Rate</span>
              </div>
            </div>
          </div>
        )}

        {/* Regular section header for non-standalone */}
        {!isStandalone && (
          <div className={styles.sectionHeader}>
            <p className={styles.sectionLabel} id="clients-heading">
              Trusted partnerships
            </p>
            <h2 className={styles.sectionTitle}>
              Industry leaders who chose Epoch
            </h2>
          </div>
        )}

        {isStandalone && (
          <div className={styles.industryFilter}>
            <div className={styles.filterButtons}>
              {industries.map((industry) => (
                <button
                  key={industry}
                  className={`${styles.filterButton} ${selectedIndustry === industry ? styles.active : ''}`}
                  onClick={() => setSelectedIndustry(industry)}
                  aria-pressed={selectedIndustry === industry}
                >
                  {industry}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className={styles.clientShowcase}>
          <div className={`${styles.clientGrid} ${isStandalone ? styles.enhanced : ''}`}>
            {(isStandalone ? filteredClients : CLIENT_PREVIEW_DATA).map((client, index) => (
              <div
                key={client.id}
                className={`${styles.clientCard} ${hoveredClient === client.id ? styles.hovered : ''}`}
                style={{
                  '--card-delay': `${index * 0.1}s`
                } as React.CSSProperties}
                onMouseEnter={() => setHoveredClient(client.id)}
                onMouseLeave={() => setHoveredClient(null)}
                // onClick={() => handleClientClick(client.id)}
                // role="button"
                // tabIndex={0}
                // aria-label={`View ${client.name} collaboration details`}
              >
                <div className={styles.cardGlow} />
                
                <div className={styles.logoSection}>
                  <div className={styles.logoContainer}>
                    <Image 
                      src={client.logo} 
                      alt={client.alt} 
                      className={styles.clientLogo}
                      width={160}
                      height={50}
                    />
                  </div>
                  {isStandalone && (
                    <div className={styles.clientMeta}>
                      <span className={styles.industry}>{client.industry}</span>
                      <span className={styles.year}>{client.yearWorked}</span>
                    </div>
                  )}
                </div>

                {isStandalone && (
                  <div className={styles.cardContent}>
                    <h3 className={styles.projectType}>{client.projectType}</h3>
                    <div className={styles.descriptionContainer}>
                      <p className={`${styles.previewDescription} ${expandedDescriptions[client.id] ? styles.expanded : styles.truncated}`}>
                        {expandedDescriptions[client.id] 
                          ? client.previewDescription 
                          : truncateText(client.previewDescription)}
                        {!expandedDescriptions[client.id] && client.previewDescription.length > 150 && '...'}
                      </p>
                      {client.previewDescription.length > 150 && (
                        <button 
                          className={styles.readMoreBtn}
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleDescription(client.id);
                          }}
                        >
                          {expandedDescriptions[client.id] ? 'Read less' : 'Read more'}
                        </button>
                      )}
                    </div>
                    <div className={styles.metricsSection}>
                      {client.keyResult.split(',').map((metric, index) => (
                        <div key={index} className={styles.metricItem}>
                          <div className={styles.resultIcon}></div>
                          <span className={styles.resultText}>{metric.trim()}</span>
                        </div>
                      ))}
                    </div>
                    {/* <div className={styles.cardCta}>
                      <span>View Full Story</span>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M1 8h14m-6-6l6 6-6 6" stroke="currentColor" strokeWidth="1.5"/>
                      </svg>
                    </div> */}
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>

        {isStandalone && (
          <div className={styles.ctaSection}>
            <h3 className={styles.ctaTitle}>Ready to join our success stories?</h3>
            <p className={styles.ctaDescription}>
              Let{`'`}s discuss how our collaborative approach can transform your next project.
            </p>
            <a href="#contact" className={styles.ctaButton}>
              <span>Start Your Story</span>
              <div className={styles.ctaGlow} />
            </a>
          </div>
        )}
      </div>
    </section>
  );
}