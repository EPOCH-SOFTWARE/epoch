/**
 * @fileoverview Clients page wrapper with dynamic header height
 * @author Epoch Development Team
 */

'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { CLIENT_LOGOS, type ClientLogoProps } from '../../../shared/constants/content';
import { Header } from '../../layout/Header';
import { Footer } from '../../layout/Footer';
import { Button } from '../../ui/Button';
import buttonStyles from '../../ui/Button.module.css';
import styles from '../../../../styles/ClientsPage.module.css';

interface ClientPreviewData extends ClientLogoProps {
  industry: string;
  projectType: string;
  yearWorked: string;
  previewDescription: string;
  keyResult: string;
}

// Enhanced client data with preview information
const CLIENT_PREVIEW_DATA: ClientPreviewData[] = [
  {
    ...CLIENT_LOGOS[0]!, // HUB International
    industry: 'Insurance',
    projectType: 'Digital Transformation',
    yearWorked: '2023',
    previewDescription: 'Revolutionized insurance workflows with AI-powered risk assessment and automated claim processing.',
    keyResult: '60% faster claim processing'
  },
  {
    ...CLIENT_LOGOS[1]!, // Inspira Financial
    industry: 'Financial Services',
    projectType: 'Platform Modernization',
    yearWorked: '2023',
    previewDescription: 'Built scalable fintech platform with real-time analytics and enhanced security infrastructure.',
    keyResult: '99.9% uptime achieved'
  },
  {
    ...CLIENT_LOGOS[2]!, // Shift4
    industry: 'Payment Processing',
    projectType: 'Performance Optimization',
    yearWorked: '2022',
    previewDescription: 'Optimized payment processing systems for high-volume transactions with advanced fraud detection.',
    keyResult: '85% faster transactions'
  },
  {
    ...CLIENT_LOGOS[3]!, // Cardinal Health
    industry: 'Healthcare',
    projectType: 'AI Integration',
    yearWorked: '2022',
    previewDescription: 'Implemented machine learning solutions for supply chain optimization and predictive inventory management.',
    keyResult: '40% cost reduction'
  },
  {
    ...CLIENT_LOGOS[4]!, // IDrive
    industry: 'Cloud Storage',
    projectType: 'Infrastructure Scaling',
    yearWorked: '2023',
    previewDescription: 'Architected next-generation cloud storage platform with enhanced data protection and sync capabilities.',
    keyResult: '300% storage efficiency'
  },
  {
    ...CLIENT_LOGOS[5]!, // BlueSky Commerce
    industry: 'E-commerce',
    projectType: 'Platform Development',
    yearWorked: '2022',
    previewDescription: 'Created innovative e-commerce platform with AR product visualization and intelligent recommendations.',
    keyResult: '200% conversion increase'
  },
  {
    ...CLIENT_LOGOS[6]!, // Rural King
    industry: 'Retail',
    projectType: 'Omnichannel Solution',
    yearWorked: '2023',
    previewDescription: 'Unified online and in-store experiences with integrated inventory management and customer analytics.',
    keyResult: '150% online growth'
  },
  {
    ...CLIENT_LOGOS[7]!, // Skeps
    industry: 'Fintech',
    projectType: 'API Development',
    yearWorked: '2022',
    previewDescription: 'Built robust payment infrastructure with seamless integrations and compliance-first architecture.',
    keyResult: '99.99% API reliability'
  },
  {
    ...CLIENT_LOGOS[8]!, // Destify
    industry: 'Travel Technology',
    projectType: 'Mobile Platform',
    yearWorked: '2023',
    previewDescription: 'Developed intelligent travel planning platform with real-time booking and personalized recommendations.',
    keyResult: '180% user engagement'
  }
];

export default function ClientsPage() {
  const router = useRouter();
  const [hoveredClient, setHoveredClient] = useState<string | null>(null);
  const [selectedIndustry, setSelectedIndustry] = useState<string>('All');
  const [isFiltering, setIsFiltering] = useState(false);
  // const canvasRef = useRef<HTMLCanvasElement>(null);

  // Get unique industries for filtering
  const industries = ['All', ...Array.from(new Set(CLIENT_PREVIEW_DATA.map(client => client.industry)))];

  // Professional background effect (CSS-based)

  // Filter clients based on selected industry
  const filteredClients = selectedIndustry === 'All' 
    ? CLIENT_PREVIEW_DATA 
    : CLIENT_PREVIEW_DATA.filter(client => client.industry === selectedIndustry);

  const handleClientClick = (clientId: string) => {
    router.push(`/clients/${clientId}`);
  };

  return (
    <>
      <Header />
      <main className={styles.clientsPageMain}>
        <div className={styles.backgroundEffect}></div>
        
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <span className={styles.heroLabel}>Our Partnerships</span>
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
        </section>

        {/* Filter Section */}
        <section className={styles.filterSection}>
          <div className={styles.filterContainer}>
            <div className={styles.industryFilter}>
              <div className={styles.filterButtons}>
                {industries.map((industry) => (
                  <Button
                    key={industry}
                    onClick={() => {
                      setIsFiltering(true);
                      setSelectedIndustry(industry);
                      setTimeout(() => setIsFiltering(false), 300);
                    }}
                    variant={selectedIndustry === industry ? "primary" : "secondary"}
                    size="small"
                    className={buttonStyles.filterButton}
                  >
                    {industry}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Clients Grid */}
        <section className={styles.clientsSection}>
          {filteredClients.length > 0 ? (
            <div className={`${styles.clientsGrid} ${isFiltering ? styles.filtering : ''}`}>
              {filteredClients.map((client, index) => {
                // Use original index for consistent animation
                const originalIndex = CLIENT_PREVIEW_DATA.findIndex(c => c.id === client.id);
                // Define colors for different industries
                const industryColors = {
                  'Technology': '#9ACD32',
                  'Healthcare': '#4ECDC4',
                  'Finance': '#45B7D1',
                  'Fintech': '#45B7D1',
                  'E-commerce': '#96CEB4',
                  'Retail': '#96CEB4',
                  'Cloud Storage': '#A8E6CF',
                  'Travel Technology': '#FFB6C1'
                };
                const cardColor = industryColors[client.industry as keyof typeof industryColors] || '#9ACD32';
                const rgbColor = cardColor === '#9ACD32' ? '154, 205, 50' : 
                                cardColor === '#4ECDC4' ? '78, 205, 196' :
                                cardColor === '#45B7D1' ? '69, 183, 209' :
                                cardColor === '#96CEB4' ? '150, 206, 180' :
                                cardColor === '#A8E6CF' ? '168, 230, 207' :
                                cardColor === '#FFB6C1' ? '255, 182, 193' : '154, 205, 50';
                
                return (
                  <div
                    key={client.id}
                    className={`${styles.clientCard} ${hoveredClient === client.id ? styles.hovered : ''}`}
                    style={{
                      '--card-delay': `${originalIndex * 0.05}s`,
                      '--card-color': cardColor,
                      '--card-color-rgb': rgbColor
                    } as React.CSSProperties}
                    onMouseEnter={() => setHoveredClient(client.id)}
                    onMouseLeave={() => setHoveredClient(null)}
                    onClick={() => handleClientClick(client.id)}
                    role="button"
                    tabIndex={0}
                    aria-label={`View ${client.name} collaboration details`}
                  >
                <div className={styles.logoSection}>
                  <div className={styles.logoWrapper}>
                    <div className={styles.logoContainer}>
                      <Image 
                        src={client.logo} 
                        alt={client.alt} 
                        className={styles.clientLogo}
                        width={160}
                        height={50}
                      />
                    </div>
                  </div>
                  <div className={styles.clientMeta}>
                    <span className={styles.industry}>{client.industry}</span>
                    <span className={styles.year}>Since {client.yearWorked}</span>
                  </div>
                </div>

                <div className={styles.cardContent}>
                  <h3 className={styles.projectType}>{client.projectType}</h3>
                  <p className={styles.previewDescription}>{client.previewDescription}</p>
                  <div className={styles.keyResult}>
                    <div className={styles.resultIcon}>
                      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                      </svg>
                    </div>
                    <span className={styles.resultText}>{client.keyResult}</span>
                  </div>
                  <div className={styles.cardFooter}>
                    <div className={styles.cardCta}>
                      <span className={styles.ctaText}>View Case Study</span>
                      <span className={styles.ctaIcon}>
                        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                          <line x1="5" y1="12" x2="19" y2="12" />
                          <polyline points="12 5 19 12 12 19" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              );
            })}
          </div>
          ) : (
            <div className={styles.noResults}>
              <div className={styles.noResultsContent}>
                <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1.5" className={styles.noResultsIcon}>
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
                <h3 className={styles.noResultsTitle}>No clients found</h3>
                <p className={styles.noResultsText}>No clients match the selected industry filter.</p>
                <Button 
                  onClick={() => {
                    setIsFiltering(true);
                    setSelectedIndustry('All');
                    setTimeout(() => setIsFiltering(false), 300);
                  }}
                  variant="outline"
                  size="medium"
                  icon={
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                  }
                  iconPosition="left"
                >
                  Clear Filter
                </Button>
              </div>
            </div>
          )}
        </section>

        {/* CTA Section */}
        <section className={styles.ctaSection}>
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>Ready to join our success stories?</h2>
            <p className={styles.ctaDescription}>
              Let{`'`}s discuss how our collaborative approach can transform your next project.
            </p>
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
              Start Your Story
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
}