/**
 * @fileoverview Services listing page component
 * @author Epoch Development Team
 */

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Header } from '../../layout/Header';
import { Footer } from '../../layout/Footer';
import { Button } from '../../ui/Button';
import styles from '../../../../styles/ServicesPage.module.css';

interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  category: string;
  highlights: string[];
  color: string;
}

const services: Service[] = [
  {
    id: 'ai-ml',
    title: 'AI and Machine Learning Development',
    description: 'Unlock the potential of intelligent systems with our custom AI and ML solutions. We build robust models that automate processes, predict outcomes, and enhance decision-making.',
    icon: (
      <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
    category: 'AI & Automation',
    highlights: ['Predictive Analytics', 'Natural Language Processing', 'Model Training & Deployment'],
    color: '#9ACD32'
  },
  {
    id: 'generative-ai',
    title: 'Generative AI Implementation',
    description: 'Leverage generative AI to create innovative content, automate workflows, and personalize user experiences with ethical governance.',
    icon: (
      <svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 3v18M12 3l4 4M12 3l-4 4M12 21l4-4M12 21l-4-4M3 12h18M3 12l4-4M3 12l4 4M21 12l-4-4M21 12l-4 4" />
        <circle cx="12" cy="12" r="3" fill="none" strokeDasharray="2 2" />
      </svg>
    ),
    category: 'AI & Automation',
    highlights: ['Chatbots', 'Automated Design Tools', 'AI Workflow Agents'],
    color: '#8FBC8F'
  },
  {
    id: 'cloud-computing',
    title: 'Cloud Computing',
    description: 'Scale your infrastructure with enterprise-grade cloud solutions on AWS, Azure, and Google Cloud. Optimize performance, security, and cost-efficiency.',
    icon: (
      <svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
      </svg>
    ),
    category: 'Infrastructure',
    highlights: ['Cloud Migration', 'Multi-cloud Management', 'Serverless Architecture'],
    color: '#4682B4'
  },
  {
    id: 'cybersecurity',
    title: 'Cybersecurity',
    description: 'Protect your digital assets with advanced security frameworks and proactive threat management. Comprehensive security solutions for enterprise environments.',
    icon: (
      <svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
    category: 'Security',
    highlights: ['Penetration Testing', 'Zero-trust Architecture', 'Post-quantum Cryptography'],
    color: '#DC143C'
  },
  {
    id: 'custom-software',
    title: 'Custom Software',
    description: 'Tailored solutions designed to meet your unique business requirements and growth objectives. From concept to deployment with agile methodologies.',
    icon: (
      <svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    category: 'Development',
    highlights: ['Full-stack Development', 'Legacy Modernization', 'API Integrations'],
    color: '#6A5ACD'
  },
  {
    id: 'data-analytics',
    title: 'Data Analytics',
    description: 'Transform raw data into actionable business insights. Advanced analytics platforms and big data solutions for informed decision-making.',
    icon: (
      <svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 3v18h18" />
        <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3" />
      </svg>
    ),
    category: 'Data & Analytics',
    highlights: ['Big Data Platforms', 'Real-time Analytics', 'Data Governance'],
    color: '#FF8C00'
  },
  {
    id: 'iot-development',
    title: 'IoT Development',
    description: 'Connect devices and ecosystems for smarter operations with real-time monitoring, automation, and intelligent data processing.',
    icon: (
      <svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="2" />
        <path d="M16.24 7.76a6 6 0 0 1 0 8.49m-8.48-.01a6 6 0 0 1 0-8.49" />
      </svg>
    ),
    category: 'Emerging Tech',
    highlights: ['Device Integration', 'Edge Computing', 'IoT Security'],
    color: '#20B2AA'
  },
  {
    id: 'blockchain',
    title: 'Blockchain Solutions',
    description: 'Build secure, decentralized applications for transparent transactions, smart contracts, and supply chain management.',
    icon: (
      <svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="3" width="6" height="6" rx="1" />
        <rect x="15" y="15" width="6" height="6" rx="1" />
        <path d="M9 6h6M6 9v6" />
      </svg>
    ),
    category: 'Emerging Tech',
    highlights: ['DApp Development', 'Tokenization', 'Blockchain Audits'],
    color: '#FFD700'
  },
  {
    id: 'devops',
    title: 'DevOps & Automation',
    description: 'Accelerate your development lifecycle with automated CI/CD pipelines, infrastructure as code, and continuous monitoring.',
    icon: (
      <svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 1v6M12 17v6M4.22 4.22l4.24 4.24M15.54 15.54l4.24 4.24" />
      </svg>
    ),
    category: 'Infrastructure',
    highlights: ['CI/CD Pipelines', 'Monitoring Tools', 'Process Automation'],
    color: '#32CD32'
  },
  {
    id: 'mobile-app',
    title: 'Mobile Application Development',
    description: 'Create intuitive, cross-platform mobile apps that drive engagement with AI and cloud integration.',
    icon: (
      <svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
        <line x1="12" y1="18" x2="12.01" y2="18" />
        <path d="M8 6h8M8 10h8M8 14h4" />
      </svg>
    ),
    category: 'Development',
    highlights: ['Native & Hybrid Apps', 'App Security', 'UX/UI Design'],
    color: '#FF69B4'
  },
  {
    id: 'digital-transformation',
    title: 'Digital Transformation Consulting',
    description: 'Guide your organization through tech evolution with strategic advice and implementation roadmaps.',
    icon: (
      <svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
        <path d="M8 10l4-2 4 2" />
        <path d="M8 14l4-2 4 2" />
      </svg>
    ),
    category: 'Consulting',
    highlights: ['Assessments', 'Transformation Roadmaps', 'Change Management'],
    color: '#8B4513'
  },
  {
    id: 'ar-vr-spatial',
    title: 'AR/VR/Spatial Computing Solutions',
    description: 'Immerse your teams in virtual environments for training, collaboration, and visualization.',
    icon: (
      <svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M2 3h20v14H2z" />
        <path d="M8 21h8" />
        <path d="M12 17v4" />
        <circle cx="8" cy="9" r="2" />
        <circle cx="16" cy="9" r="2" />
        <path d="M6 13c1-1 2-1 4 0s3-1 4 0" />
      </svg>
    ),
    category: 'Emerging Tech',
    highlights: ['VR Simulations', 'AR Overlays', 'Metaverse Integration'],
    color: '#9370DB'
  }
];

const categories = ['All', 'AI & Automation', 'Infrastructure', 'Security', 'Development', 'Data & Analytics', 'Emerging Tech', 'Consulting'];

export default function ServicesPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  // const canvasRef = useRef<HTMLCanvasElement>(null);

  // Professional background effect (CSS-based)

  const filteredServices = services.filter(service => {
    const matchesCategory = selectedCategory === 'All' || service.category === selectedCategory;
    const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          service.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <Header />
      <main className={styles.servicesMain}>
        <div className={styles.backgroundEffect}></div>
        
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <span className={styles.heroLabel}>Our Services</span>
            <h1 className={styles.heroTitle}>
              <span className={styles.titleLine}>Transforming</span>
              <span className={styles.titleLine}>
                <span className={styles.titleHighlight}>Digital Visions</span>
              </span>
              <span className={styles.titleLine}>Into Reality</span>
            </h1>
            <p className={styles.heroDescription}>
              At EPOCH Software Services, we deliver cutting-edge software solutions tailored to empower US enterprises 
              in a rapidly evolving digital landscape. With a focus on innovation, scalability, and security.
            </p>
          </div>

          <div className={styles.heroStats}>
            <div className={styles.stat}>
              <span className={styles.statNumber}>12+</span>
              <span className={styles.statLabel}>Service Categories</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNumber}>500+</span>
              <span className={styles.statLabel}>Projects Delivered</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNumber}>98%</span>
              <span className={styles.statLabel}>Client Satisfaction</span>
            </div>
          </div>
        </section>

        {/* Filter Section */}
        <section className={styles.filterSection}>
          <div className={styles.filterContainer}>
            <div className={styles.searchBox}>
              <input
                type="text"
                placeholder="Search services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.searchInput}
              />
              <svg className={styles.searchIcon} viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
            </div>

            <div className={styles.categoryFilters}>
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`${styles.filterButton} ${selectedCategory === category ? styles.active : ''}`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className={styles.servicesSection}>
          <div className={styles.servicesGrid}>
            {filteredServices.map((service, index) => (
              <Link
                key={service.id}
                href={`/services/${service.id}`}
                className={styles.serviceCard}
                onMouseEnter={() => setHoveredCard(service.id)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  animationDelay: `${index * 0.1}s`,
                  '--card-color': service.color
                } as React.CSSProperties}
              >
                <div className={styles.cardIcon}>{service.icon}</div>

                <h3 className={styles.cardTitle}>{service.title}</h3>
                <p className={styles.cardDescription}>{service.description}</p>

                <div className={styles.cardHighlights}>
                  {service.highlights.map((highlight, i) => (
                    <span key={i} className={styles.highlight}>
                      {highlight}
                    </span>
                  ))}
                </div>

                <div className={styles.cardFooter}>
                  <span className={styles.learnMore}>
                    Learn More
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </span>
                </div>

                {hoveredCard === service.id && (
                  <div className={styles.cardGlow} />
                )}
              </Link>
            ))}
          </div>

          {filteredServices.length === 0 && (
            <div className={styles.noResults}>
              <p>No services found matching your criteria.</p>
              <Button 
                onClick={() => {setSelectedCategory('All'); setSearchTerm('');}}
                variant="secondary"
                size="small"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </section>

        {/* CTA Section */}
        <section className={styles.ctaSection}>
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>Ready to Elevate Your Enterprise?</h2>
            <p className={styles.ctaDescription}>
              Contact EPOCH Software Services today for a free consultation and discover how our expertise can propel your business forward.
            </p>
            <Button 
              href="/contact" 
              variant="primary"
              size="large"
              icon={
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              }
            >
              Get Started
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
}