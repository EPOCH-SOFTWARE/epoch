/**
 * @fileoverview About page with innovative design and animations
 * @author Epoch Development Team
 */

'use client';

import React, { useRef, useState, useEffect, useMemo } from 'react';
import { Header } from '../../layout/Header';
import { Footer } from '../../layout/Footer';
import { Button } from '../../ui/Button';
import { TechIcon } from '../../ui/TechIcon';
import { useCursor } from '../../../hooks/useCursor';
import styles from '../../../../styles/AboutPage.module.css';
import techStackData from '../../../data/techStackData.json';

// Type definitions
interface ApproachItem {
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface TimelineItem {
  year: string;
  event: string;
  description: string;
}

interface TechnologyItem {
  name: string;
  iconSrc: string;
  expertise: string;
  style?: React.CSSProperties;
}

interface TechCategory {
  category: string;
  description: string;
  technologies: TechnologyItem[];
}

// Approach methodology data
const approachData: ApproachItem[] = [
  {
    title: 'Discovery & Analysis',
    description: 'We begin every project with deep discovery sessions to understand your challenges, goals, and constraints. Like scientists studying a phenomenon, we gather data before forming hypotheses.',
    icon: (
      <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 1v6M12 17v6M4.22 4.22l4.24 4.24M15.54 15.54l4.24 4.24M1 12h6M17 12h6M4.22 19.78l4.24-4.24M15.54 8.46l4.24-4.24" />
      </svg>
    )
  },
  {
    title: 'Iterative Design',
    description: 'Our solutions evolve through rapid prototyping and continuous feedback. We believe the best systems emerge from experimentation, not from rigid upfront specifications.',
    icon: (
      <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polygon points="12,2 22,8.5 22,15.5 12,22 2,15.5 2,8.5" />
        <polygon points="12,8 18,11.5 18,16.5 12,20 6,16.5 6,11.5" />
        <circle cx="12" cy="14" r="2" />
      </svg>
    )
  },
  {
    title: 'Quality Assurance',
    description: 'Every solution undergoes rigorous testing and validation. We apply the same standards of proof and verification that govern scientific research to ensure reliability and performance.',
    icon: (
      <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <circle cx="12" cy="12" r="3" />
        <path d="M10.5 12l1.5 1.5L15 10.5" />
      </svg>
    )
  },
  {
    title: 'Continuous Evolution',
    description: 'Technology is never static, and neither are our solutions. We provide ongoing optimization and evolution to ensure your systems remain at the cutting edge of what\'s possible.',
    icon: (
      <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
        <path d="M3 3v5h5" />
        <path d="M21 12a9 9 0 1 1-9 9 9.75 9.75 0 0 1 6.74-2.74L21 16" />
        <path d="M21 21v-5h-5" />
      </svg>
    )
  }
];

export default function AboutPage() {
  const [, setActiveSection] = useState(0);
  const heroRef = useRef<HTMLElement>(null);
  const storyRef = useRef<HTMLElement>(null);
  const valuesRef = useRef<HTMLElement>(null);
  const techRef = useRef<HTMLElement>(null);
  const approachRef = useRef<HTMLElement>(null);

  // Initialize cursor tracking
  useCursor({});

  // Memoize timeline data for performance
  const timelineData = useMemo((): TimelineItem[] => [
    { year: '2012', event: 'EPOCH Founded', description: 'Scientific approach to software' },
    { year: '2015', event: 'First AI System', description: 'Breakthrough in machine learning' },
    { year: '2018', event: 'Quantum Computing', description: 'Applied quantum algorithms' },
    { year: '2021', event: 'Global Expansion', description: 'Worldwide innovation network' },
    { year: '2024', event: 'Next Epoch', description: 'Pushing boundaries further' }
  ], []);

  // Section scroll tracking
  useEffect(() => {
    const sections = [heroRef, storyRef, valuesRef, techRef, approachRef];
    const handleScroll = () => {
      sections.forEach((ref, index) => {
        if (ref.current) {
          const rect = ref.current.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            setActiveSection(index);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Get tech stack data from JSON
  const techStack: TechCategory[] = techStackData.techStack;


  const coreValues = [
    {
      title: 'Precision Engineering',
      description: 'Every line of code crafted with the exactitude of Swiss watchmakers',
      icon: (
        <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M7 12h10" />
          <path d="M12 7v10" />
          <path d="M7.5 7.5l9 9" />
          <path d="M16.5 7.5l-9 9" />
        </svg>
      ),
      details: "We approach software development like master craftsmen, where precision isn't just a goal—it's our fundamental nature."
    },
    {
      title: 'Scientific Innovation',
      description: 'Applying rigorous scientific methods to solve complex problems',
      icon: (
        <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M9 11H7a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2h-2" />
          <path d="M12 2v9" />
          <circle cx="12" cy="6" r="3" />
        </svg>
      ),
      details: 'Our solutions are born from hypothesis, tested through experimentation, and refined through continuous observation.'
    },
    {
      title: 'Elegant Complexity',
      description: 'Transforming intricate challenges into beautifully simple solutions',
      icon: (
        <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5">
          <polygon points="12,2 22,8.5 22,15.5 12,22 2,15.5 2,8.5" />
          <polygon points="12,8 18,11.5 18,16.5 12,20 6,16.5 6,11.5" />
          <polygon points="12,14 15,15.5 15,18.5 12,20 9,18.5 9,15.5" />
        </svg>
      ),
      details: 'We believe true elegance emerges when complex systems operate with effortless simplicity.'
    },
    {
      title: 'Continuous Evolution',
      description: 'Embracing change as the only constant in our digital universe',
      icon: (
        <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
          <path d="M3 3v5h5" />
          <path d="M21 12a9 9 0 1 1-9 9 9.75 9.75 0 0 1 6.74-2.74L21 16" />
          <path d="M21 21v-5h-5" />
        </svg>
      ),
      details: 'Like natural systems, our solutions adapt, evolve, and improve through iterative refinement.'
    }
  ];

  return (
    <>
      <Header />
      
      <main className={styles.aboutMain}>
        <div className={styles.backgroundEffect}></div>
        
        {/* Hero Section */}
        <section ref={heroRef} className={styles.hero} id="about-hero">
          <div className={styles.heroContent}>
            <div className={styles.heroHeader}>
              <span className={styles.sectionLabel}>About EPOCH</span>
            </div>
            <h1 className={styles.heroTitle}>
              <span className={styles.titleLine}>Crafting Digital</span>
              <span className={styles.titleLine}>
                <span className={styles.titleHighlight}>Phenomena</span>
              </span>
              <span className={styles.titleLine}>with Scientific Precision</span>
            </h1>
            
            <p className={styles.heroDescription}>
              We are EPOCH—a collective of engineers, scientists, and visionaries 
              united by the belief that exceptional software emerges from the 
              intersection of rigorous methodology and boundless creativity.
            </p>
          </div>

          <div className={styles.heroStats}>
            <div className={styles.stat}>
              <span className={styles.statNumber}>12+</span>
              <span className={styles.statLabel}>Years of Excellence</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNumber}>500+</span>
              <span className={styles.statLabel}>Projects Delivered</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNumber}>99.9%</span>
              <span className={styles.statLabel}>Client Satisfaction</span>
            </div>
          </div>
        </section>

        {/* Origin Story Section */}
        <section ref={storyRef} className={styles.story} id="our-story">
          <div className={styles.storyInner}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionLabel}>Origin Story</span>
              <h2 className={styles.sectionTitle}>Born from Curiosity, Forged by Precision</h2>
            </div>
            
            <div className={styles.storyContent}>
              <div className={styles.storyText}>
                <div className={styles.storyChapter}>
                  <h3 className={styles.chapterTitle}>The Genesis</h3>
                  <p className={styles.chapterText}>
                    EPOCH was born in 2012 from a simple yet profound realization: 
                    the software industry had lost its connection to scientific rigor. 
                    Our founders, a quantum physicist and a systems architect, 
                    envisioned a new paradigm where software development would 
                    embrace the precision of scientific methodology.
                  </p>
                </div>
                
                <div className={styles.storyChapter}>
                  <h3 className={styles.chapterTitle}>The Evolution</h3>
                  <p className={styles.chapterText}>
                    What began as an experiment in applied computational science 
                    has evolved into a philosophy that permeates every aspect of 
                    our work. We don{`'`}t just write code—we discover digital laws 
                    of nature and architect systems that feel inevitable.
                  </p>
                </div>
                
                <div className={styles.storyChapter}>
                  <h3 className={styles.chapterTitle}>The Future</h3>
                  <p className={styles.chapterText}>
                    Today, EPOCH stands at the forefront of technological innovation, 
                    applying quantum computing principles, AI methodologies, and 
                    systems thinking to solve humanity{`'`}s most complex digital 
                    challenges.
                  </p>
                </div>
              </div>
              
              <div className={styles.timelineVisualization}>
                <div className={styles.timeline}>
                  {timelineData.map((milestone) => (
                    <div key={milestone.year} className={styles.timelineItem}>
                      <div className={styles.timelineYear}>{milestone.year}</div>
                      <div className={styles.timelineContent}>
                        <h4 className={styles.timelineEvent}>{milestone.event}</h4>
                        <p className={styles.timelineDescription}>{milestone.description}</p>
                      </div>
                      <div className={styles.timelineConnector}></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Technology Stack Section */}
        <section ref={techRef} className={styles.tech} id="technology-stack">
          <div className={styles.techInner}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionLabel}>Technology Stack</span>
              <h2 className={styles.sectionTitle}>Cutting-Edge Tools & Expertise</h2>
              <p className={styles.sectionSubtitle}>
                We leverage the most advanced technologies to build systems that scale, 
                perform, and evolve with your business needs.
              </p>
            </div>
            
            <div className={styles.techGrid}>
              {techStack.map((category, index) => (
                <div key={index} className={styles.techCategory}>
                  <div className={styles.categoryHeader}>
                    <h3 className={styles.categoryTitle}>{category.category}</h3>
                    <p className={styles.categoryDescription}>{category.description}</p>
                  </div>
                  
                  <div className={styles.technologiesList}>
                    {category.technologies.map((tech) => (
                      <div key={tech.name} className={styles.techItem}>
                        <div className={styles.techIcon}>
                          <TechIcon
                            src={tech.iconSrc}
                            alt={tech.name}
                            width={24}
                            height={24}
                            {...(tech.style && { style: tech.style })}
                          />
                        </div>
                        <div className={styles.techInfo}>
                          <span className={styles.techName}>{tech.name}</span>
                          <span className={`${styles.techExpertise} ${styles[tech.expertise.toLowerCase()]}`}>
                            {tech.expertise}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Core Values Section */}
        <section ref={valuesRef} className={styles.values} id="our-values">
          <div className={styles.valuesInner}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionLabel}>Core Values</span>
              <h2 className={styles.sectionTitle}>The Principles That Guide Us</h2>
              <p className={styles.sectionSubtitle}>
                These fundamental principles shape every decision, guide every project, 
                and define who we are as a company.
              </p>
            </div>
            
            <div className={styles.valuesList}>
              {coreValues.map((value) => (
                <div key={value.title} className={styles.valueRow}>
                  <div className={styles.valueIcon}>{value.icon}</div>
                  <div className={styles.valueContent}>
                    <h3 className={styles.valueTitle}>{value.title}</h3>
                    <p className={styles.valueDescription}>{value.description}</p>
                    <p className={styles.valueDetails}>{value.details}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Approach Section */}
        <section ref={approachRef} className={styles.approach} id="our-approach">
          <div className={styles.approachInner}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionLabel}>Our Approach</span>
              <h2 className={styles.sectionTitle}>How We Work</h2>
              <p className={styles.sectionSubtitle}>
                Our methodology combines scientific rigor with creative innovation 
                to deliver exceptional results for every client.
              </p>
            </div>
            
            <div className={styles.approachGrid}>
              {approachData.map((approach) => (
                <div key={approach.title} className={styles.approachItem}>
                  <div className={styles.approachIcon}>
                    {approach.icon}
                  </div>
                  <h3 className={styles.approachTitle}>{approach.title}</h3>
                  <p className={styles.approachDescription}>
                    {approach.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>


        {/* Call to Action */}
        <section className={styles.cta}>
          <div className={styles.ctaInner}>
            <h2 className={styles.ctaTitle}>Ready to Start Your Next Epoch?</h2>
            <p className={styles.ctaSubtitle}>
              Join the companies who trust EPOCH to transform their digital universe
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
              Begin Your Journey
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
}