/**
 * @fileoverview Client detail page template component
 * @author Epoch Development Team
 */

'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Header } from '../../layout/Header';
import { Footer } from '../../layout/Footer';
import { useCursor } from '../../../hooks/useCursor';
import styles from '../../../../styles/ClientDetailPage.module.css';

export interface ClientDetailData {
  id: string;
  name: string;
  logo: string;
  heroTitle: string;
  heroSubtitle: string;
  heroImage?: string;
  heroVideo?: string;
  
  // Client Introduction
  industry: string;
  companySize: string;
  generalChallenges: string[];
  whyChoseEpoch: string;
  
  // Project Overview
  projectScope: string;
  timeline: string;
  teamSize: {
    epoch: number;
    client: number;
  };
  
  // Collaboration Details
  workingProcess: {
    communicationTools: string[];
    meetingFrequency: string;
    methodology: string;
  };
  teamRoles: {
    epochRoles: string[];
    clientRoles: string[];
  };
  challengesOvercome: string[];
  
  // Solutions and Innovations
  deliverables: string[];
  technicalHighlights: string[];
  technologies: string[];
  innovativeFeatures: string[];
  
  // Results and Impact
  quantifiableResults: {
    metric: string;
    before: string;
    after: string;
    improvement: string;
  }[];
  qualitativeResults: string[];
  
  // Testimonial
  testimonial: {
    quote: string;
    author: string;
    position: string;
    avatar?: string;
    linkedinUrl?: string;
    videoUrl?: string;
  };
  
  // Additional Media
  screenshots: string[];
  diagrams: string[];
  beforeAfterImages: string[];
  
  // Related Content
  relatedServices: string[];
  relatedCaseStudies: string[];
  
  // SEO
  metaTitle: string;
  metaDescription: string;
}

interface ClientDetailPageProps {
  clientData: ClientDetailData;
}

export function ClientDetailPage({ clientData }: ClientDetailPageProps) {
  useCursor();

  return (
    <>
      <Header />
      <main className={styles.clientDetailPage}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroInner}>
          <div className={styles.heroContent}>
            <div className={styles.clientLogo}>
              <Image src={clientData.logo} alt={`${clientData.name} logo`} width={120} height={60} priority />
            </div>
            <h1 className={styles.heroTitle}>{clientData.heroTitle}</h1>
            <p className={styles.heroSubtitle}>{clientData.heroSubtitle}</p>
            <div className={styles.heroCta}>
              <a href="#contact" className={styles.ctaButton}>
                Get in Touch
              </a>
              <a href="#results" className={styles.ctaSecondary}>
                See Results
              </a>
            </div>
          </div>
          {clientData.heroImage && (
            <div className={styles.heroMedia}>
              <Image src={clientData.heroImage} alt="Project showcase" width={600} height={400} />
            </div>
          )}
          {clientData.heroVideo && (
            <div className={styles.heroMedia}>
              <video autoPlay muted loop>
                <source src={clientData.heroVideo} type="video/mp4" />
              </video>
            </div>
          )}
        </div>
      </section>

      {/* Client Introduction */}
      <section className={styles.clientIntroduction}>
        <div className={styles.sectionInner}>
          <div className={styles.introContent}>
            <h2 className={styles.sectionTitle}>About {clientData.name}</h2>
            <div className={styles.clientMeta}>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Industry</span>
                <span className={styles.metaValue}>{clientData.industry}</span>
              </div>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Company Size</span>
                <span className={styles.metaValue}>{clientData.companySize}</span>
              </div>
            </div>
            
            <div className={styles.challengesSection}>
              <h3 className={styles.subsectionTitle}>Industry Challenges</h3>
              <ul className={styles.challengesList}>
                {clientData.generalChallenges.map((challenge, index) => (
                  <li key={index} className={styles.challengeItem}>{challenge}</li>
                ))}
              </ul>
            </div>
            
            <div className={styles.whyEpoch}>
              <h3 className={styles.subsectionTitle}>Why EPOCH?</h3>
              <p className={styles.whyEpochText}>{clientData.whyChoseEpoch}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Project Overview */}
      <section className={styles.projectOverview}>
        <div className={styles.sectionInner}>
          <h2 className={styles.sectionTitle}>Project Overview</h2>
          <div className={styles.overviewGrid}>
            <div className={styles.overviewContent}>
              <h3 className={styles.subsectionTitle}>What We Built</h3>
              <p className={styles.projectScope}>{clientData.projectScope}</p>
            </div>
            <div className={styles.overviewStats}>
              <div className={styles.statItem}>
                <div className={styles.statNumber}>{clientData.timeline}</div>
                <div className={styles.statLabel}>Project Duration</div>
              </div>
              <div className={styles.statItem}>
                <div className={styles.statNumber}>{clientData.teamSize.epoch}</div>
                <div className={styles.statLabel}>EPOCH Experts</div>
              </div>
              <div className={styles.statItem}>
                <div className={styles.statNumber}>{clientData.teamSize.client}</div>
                <div className={styles.statLabel}>Client Team Members</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Collaboration Details */}
      <section className={styles.collaborationDetails}>
        <div className={styles.sectionInner}>
          <h2 className={styles.sectionTitle}>How We Collaborated</h2>
          <div className={styles.collaborationGrid}>
            <div className={styles.processSection}>
              <h3 className={styles.subsectionTitle}>Working Process</h3>
              <div className={styles.processItem}>
                <strong>Communication:</strong> {clientData.workingProcess.communicationTools.join(', ')}
              </div>
              <div className={styles.processItem}>
                <strong>Meetings:</strong> {clientData.workingProcess.meetingFrequency}
              </div>
              <div className={styles.processItem}>
                <strong>Methodology:</strong> {clientData.workingProcess.methodology}
              </div>
            </div>
            
            <div className={styles.rolesSection}>
              <h3 className={styles.subsectionTitle}>Team Roles</h3>
              <div className={styles.roleGroup}>
                <h4>EPOCH Team</h4>
                <ul>
                  {clientData.teamRoles.epochRoles.map((role, index) => (
                    <li key={index}>{role}</li>
                  ))}
                </ul>
              </div>
              <div className={styles.roleGroup}>
                <h4>Client Team</h4>
                <ul>
                  {clientData.teamRoles.clientRoles.map((role, index) => (
                    <li key={index}>{role}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          
          <div className={styles.challengesOvercome}>
            <h3 className={styles.subsectionTitle}>Challenges We Overcame Together</h3>
            <div className={styles.challengesGrid}>
              {clientData.challengesOvercome.map((challenge, index) => (
                <div key={index} className={styles.challengeCard}>
                  <div className={styles.challengeIcon}>🚀</div>
                  <p>{challenge}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Solutions and Innovations */}
      <section className={styles.solutionsSection}>
        <div className={styles.sectionInner}>
          <h2 className={styles.sectionTitle}>Solutions & Innovations</h2>
          
          <div className={styles.deliverablesSection}>
            <h3 className={styles.subsectionTitle}>Key Deliverables</h3>
            <div className={styles.deliverablesList}>
              {clientData.deliverables.map((deliverable, index) => (
                <div key={index} className={styles.deliverableItem}>
                  <div className={styles.deliverableIcon}>✨</div>
                  <span>{deliverable}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className={styles.technicalHighlights}>
            <h3 className={styles.subsectionTitle}>Technical Highlights</h3>
            <div className={styles.highlightsList}>
              {clientData.technicalHighlights.map((highlight, index) => (
                <div key={index} className={styles.highlightItem}>{highlight}</div>
              ))}
            </div>
          </div>
          
          <div className={styles.technologiesUsed}>
            <h3 className={styles.subsectionTitle}>Technologies Used</h3>
            <div className={styles.techStack}>
              {clientData.technologies.map((tech, index) => (
                <span key={index} className={styles.techTag}>{tech}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Results and Impact */}
      <section className={styles.resultsSection} id="results">
        <div className={styles.sectionInner}>
          <h2 className={styles.sectionTitle}>Results & Impact</h2>
          
          <div className={styles.metricsTable}>
            <div className={styles.tableHeader}>
              <div>Metric</div>
              <div>Before</div>
              <div>After</div>
              <div>Improvement</div>
            </div>
            {clientData.quantifiableResults.map((result, index) => (
              <div key={index} className={styles.tableRow}>
                <div className={styles.metricName}>{result.metric}</div>
                <div className={styles.beforeValue}>{result.before}</div>
                <div className={styles.afterValue}>{result.after}</div>
                <div className={styles.improvement}>{result.improvement}</div>
              </div>
            ))}
          </div>
          
          <div className={styles.qualitativeResults}>
            <h3 className={styles.subsectionTitle}>Additional Benefits</h3>
            <ul className={styles.benefitsList}>
              {clientData.qualitativeResults.map((result, index) => (
                <li key={index}>{result}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className={styles.testimonialSection}>
        <div className={styles.sectionInner}>
          <div className={styles.testimonialCard}>
            <div className={styles.testimonialContent}>
              <blockquote className={styles.testimonialQuote}>
                &ldquo;{clientData.testimonial.quote}&rdquo;
              </blockquote>
              <div className={styles.testimonialAuthor}>
                {clientData.testimonial.avatar && (
                  <Image 
                    src={clientData.testimonial.avatar} 
                    alt={clientData.testimonial.author}
                    className={styles.authorAvatar}
                    width={60}
                    height={60}
                  />
                )}
                <div className={styles.authorInfo}>
                  <div className={styles.authorName}>{clientData.testimonial.author}</div>
                  <div className={styles.authorPosition}>{clientData.testimonial.position}</div>
                  {clientData.testimonial.linkedinUrl && (
                    <a href={clientData.testimonial.linkedinUrl} className={styles.linkedinLink}>
                      Connect on LinkedIn
                    </a>
                  )}
                </div>
              </div>
            </div>
            {clientData.testimonial.videoUrl && (
              <div className={styles.testimonialVideo}>
                <video controls>
                  <source src={clientData.testimonial.videoUrl} type="video/mp4" />
                </video>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection} id="contact">
        <div className={styles.sectionInner}>
          <h2 className={styles.ctaTitle}>Ready to Collaborate?</h2>
          <p className={styles.ctaDescription}>
            Let{`'`}s discuss how our team can help transform your next project into a success story.
          </p>
          <div className={styles.ctaButtons}>
            <a href="#contact" className={styles.primaryCta}>Contact EPOCH Today</a>
            <Link href="/services" className={styles.secondaryCta}>Explore Our Services</Link>
          </div>
        </div>
      </section>

      {/* Related Content */}
      <section className={styles.relatedContent}>
        <div className={styles.sectionInner}>
          <h2 className={styles.sectionTitle}>Related Services</h2>
          <div className={styles.relatedGrid}>
            <div className={styles.relatedServices}>
              <h3>Our Services</h3>
              <ul>
                {clientData.relatedServices.map((service, index) => (
                  <li key={index}>
                    <a href={`/services/${service.toLowerCase().replace(/\s+/g, '-')}`}>
                      {service}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
      </main>
      <Footer />
    </>
  );
}