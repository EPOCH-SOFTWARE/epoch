/**
 * @fileoverview Enhanced clients section component serving as hub for client details
 * @author Epoch Development Team
 */

'use client';

import React, { useState } from 'react';
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

export function ClientsSection({ className, isStandalone = false }: ClientsSectionProps) {
  const router = useRouter();
  const [hoveredClient, setHoveredClient] = useState<string | null>(null);
  const [selectedIndustry, setSelectedIndustry] = useState<string>('All');

  // Get unique industries for filtering
  const industries = ['All', ...Array.from(new Set(CLIENT_PREVIEW_DATA.map(client => client.industry)))];

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
      <div className={styles.clientsInner}>
        <div className={styles.sectionHeader}>
          <p className={styles.sectionLabel} id="clients-heading">
            {isStandalone ? 'Our Partnerships' : 'Trusted partnerships'}
          </p>
          <h2 className={styles.sectionTitle}>
            {isStandalone 
              ? 'Transforming businesses across industries'
              : 'Industry leaders who chose Epoch'
            }
          </h2>
          {isStandalone && (
            <p className={styles.sectionDescription}>
              Each collaboration tells a story of innovation, challenge, and breakthrough success. 
              Explore how our team worked alongside industry leaders to deliver transformative solutions.
            </p>
          )}
        </div>

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
                onClick={() => handleClientClick(client.id)}
                role="button"
                tabIndex={0}
                aria-label={`View ${client.name} collaboration details`}
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
                    <p className={styles.previewDescription}>{client.previewDescription}</p>
                    <div className={styles.keyResult}>
                      <div className={styles.resultIcon}>→</div>
                      <span className={styles.resultText}>{client.keyResult}</span>
                    </div>
                    <div className={styles.cardCta}>
                      <span>View Full Story</span>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M1 8h14m-6-6l6 6-6 6" stroke="currentColor" strokeWidth="1.5"/>
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className={styles.clientMetrics}>
            <div className={styles.metricItem}>
              <div className={styles.metricNumber}>9+</div>
              <div className={styles.metricLabel}>Enterprise Clients</div>
            </div>
            <div className={styles.metricItem}>
              <div className={styles.metricNumber}>5</div>
              <div className={styles.metricLabel}>Industries Served</div>
            </div>
            <div className={styles.metricItem}>
              <div className={styles.metricNumber}>100%</div>
              <div className={styles.metricLabel}>Project Success Rate</div>
            </div>
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