/**
 * @fileoverview About page with innovative design and animations
 * @author Epoch Development Team
 */

'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Header } from '../../layout/Header';
import { Footer } from '../../layout/Footer';
import { useCursor } from '../../../hooks/useCursor';
import styles from '../../../../styles/AboutPage.module.css';

export default function AboutPage() {
  const [, setActiveSection] = useState(0);
  const heroRef = useRef<HTMLElement>(null);
  const storyRef = useRef<HTMLElement>(null);
  const valuesRef = useRef<HTMLElement>(null);
  const teamRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Initialize cursor tracking
  useCursor({});

  // Professional background effect (CSS-based)

  // Section scroll tracking
  useEffect(() => {
    const handleScroll = () => {
      const sections = [heroRef, storyRef, valuesRef, teamRef];
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

  const teamMembers = [
    {
      name: 'Dr. Alex Chen',
      role: 'Founder & Chief Architect',
      specialty: 'Quantum Computing & AI Systems',
      bio: 'Former CERN researcher who discovered his passion for transforming theoretical physics into practical software solutions.',
      image: '/team/alex-chen.jpg',
      linkedin: 'https://linkedin.com/in/alex-chen-epoch',
      github: 'https://github.com/alex-chen-epoch'
    },
    {
      name: 'Sarah Martinez',
      role: 'VP of Engineering',
      specialty: 'Distributed Systems & Cloud Architecture',
      bio: 'Ex-Google engineer with 15+ years building systems that handle billions of requests while maintaining Swiss precision.',
      image: '/team/sarah-martinez.jpg',
      linkedin: 'https://linkedin.com/in/sarah-martinez-epoch',
      github: 'https://github.com/sarah-martinez-epoch'
    },
    {
      name: 'Marcus Thompson',
      role: 'Head of Design',
      specialty: 'Human-Computer Interaction',
      bio: 'Award-winning designer who believes interfaces should feel like natural phenomena rather than digital constructs.',
      image: '/team/marcus-thompson.jpg',
      linkedin: 'https://linkedin.com/in/marcus-thompson-epoch',
      dribbble: 'https://dribbble.com/marcus-thompson-epoch'
    },
    {
      name: 'Dr. Yuki Tanaka',
      role: 'AI Research Director',
      specialty: 'Machine Learning & Neural Networks',
      bio: 'PhD in Cognitive Science, pioneering the intersection of human cognition and artificial intelligence.',
      image: '/team/yuki-tanaka.jpg',
      linkedin: 'https://linkedin.com/in/yuki-tanaka-epoch',
      scholar: 'https://scholar.google.com/citations?user=yuki-tanaka'
    }
  ];

  const coreValues = [
    {
      title: 'Precision Engineering',
      description: 'Every line of code crafted with the exactitude of Swiss watchmakers',
      icon: (
        <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 2L2 7L12 12L22 7L12 2Z" />
          <path d="M2 17L12 22L22 17" />
          <path d="M2 12L12 17L22 12" />
        </svg>
      ),
      details: "We approach software development like master craftsmen, where precision isn't just a goal—it's our fundamental nature."
    },
    {
      title: 'Scientific Innovation',
      description: 'Applying rigorous scientific methods to solve complex problems',
      icon: (
        <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M9.5 2V8.5L7 11.5V16C7 19.3137 9.68629 22 13 22H11C14.3137 22 17 19.3137 17 16V11.5L14.5 8.5V2" />
          <path d="M8 2H16" />
          <path d="M7 16H17" />
          <circle cx="12" cy="19" r="1" />
          <circle cx="9" cy="17" r="0.5" />
          <circle cx="15" cy="17" r="0.5" />
        </svg>
      ),
      details: 'Our solutions are born from hypothesis, tested through experimentation, and refined through continuous observation.'
    },
    {
      title: 'Elegant Complexity',
      description: 'Transforming intricate challenges into beautifully simple solutions',
      icon: (
        <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 2L2 7V17L12 22L22 17V7L12 2Z" />
          <path d="M12 22V12" />
          <path d="M22 7L12 12L2 7" />
          <path d="M2 17L12 12" />
          <path d="M22 17L12 12" />
        </svg>
      ),
      details: 'We believe true elegance emerges when complex systems operate with effortless simplicity.'
    },
    {
      title: 'Continuous Evolution',
      description: 'Embracing change as the only constant in our digital universe',
      icon: (
        <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22" />
          <path d="M12 2C17.52 2 22 6.48 22 12C22 17.52 17.52 22 12 22" />
          <path d="M12 8L16 12L12 16" />
          <path d="M8 12H16" />
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
            <span className={styles.heroLabel}>About EPOCH</span>
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
                  {[
                    { year: '2012', event: 'EPOCH Founded', description: 'Scientific approach to software' },
                    { year: '2015', event: 'First AI System', description: 'Breakthrough in machine learning' },
                    { year: '2018', event: 'Quantum Computing', description: 'Applied quantum algorithms' },
                    { year: '2021', event: 'Global Expansion', description: 'Worldwide innovation network' },
                    { year: '2024', event: 'Next Epoch', description: 'Pushing boundaries further' }
                  ].map((milestone, index) => (
                    <div key={index} className={styles.timelineItem}>
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

        {/* Core Values Section */}
        <section ref={valuesRef} className={styles.values} id="our-values">
          <div className={styles.valuesInner}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionLabel}>Core Values</span>
              <h2 className={styles.sectionTitle}>The Principles That Guide Us</h2>
            </div>
            
            <div className={styles.valuesGrid}>
              {coreValues.map((value, index) => (
                <div key={index} className={styles.valueCard}>
                  <div className={styles.valueIcon}>{value.icon}</div>
                  <h3 className={styles.valueTitle}>{value.title}</h3>
                  <p className={styles.valueDescription}>{value.description}</p>
                  <div className={styles.valueDetails}>{value.details}</div>
                  <div className={styles.valueGlow}></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section ref={teamRef} className={styles.team} id="our-team">
          <div className={styles.teamInner}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionLabel}>Our Team</span>
              <h2 className={styles.sectionTitle}>Minds Behind the Magic</h2>
            </div>
            
            <div className={styles.teamGrid}>
              {teamMembers.map((member, index) => (
                <div key={index} className={styles.teamCard}>
                  <div className={styles.memberImageContainer}>
                    <div className={styles.memberImage}>
                      <div className={styles.placeholder}>{member.name.split(' ').map(n => n[0]).join('')}</div>
                    </div>
                    <div className={styles.memberOrbit}>
                      <div className={styles.orbitRing}></div>
                    </div>
                  </div>
                  
                  <div className={styles.memberInfo}>
                    <h3 className={styles.memberName}>{member.name}</h3>
                    <p className={styles.memberRole}>{member.role}</p>
                    <p className={styles.memberSpecialty}>{member.specialty}</p>
                    <p className={styles.memberBio}>{member.bio}</p>
                    
                    <div className={styles.memberLinks}>
                      {member.linkedin && (
                        <a href={member.linkedin} className={styles.memberLink} aria-label="LinkedIn">
                          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                          </svg>
                        </a>
                      )}
                      {member.github && (
                        <a href={member.github} className={styles.memberLink} aria-label="GitHub">
                          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.30.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
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
            <a href="/contact" className={styles.ctaButton}>
              <span className={styles.ctaButtonText}>Begin Your Journey</span>
              <div className={styles.ctaButtonGlow}></div>
            </a>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
}