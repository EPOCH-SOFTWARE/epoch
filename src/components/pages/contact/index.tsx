/**
 * @fileoverview Contact page with professional form and innovative design
 * @author Epoch Development Team
 */

'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Header } from '../../layout/Header';
import { Footer } from '../../layout/Footer';
import { useCursor } from '../../../hooks/useCursor';
import styles from '../../../../styles/ContactPage.module.css';

export default function ContactPage() {
  const [scrolled, setScrolled] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    projectType: '',
    budget: '',
    timeline: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const formRef = useRef<HTMLFormElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Initialize cursor tracking
  useCursor({});

  // Scroll tracking
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Canvas animation for background
  useEffect(() => {
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
        opacity: Math.random() * 0.5 + 0.2
      });
    }

    let animationId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connections
      particles.forEach((particle, i) => {
        particles.forEach((particle2, j) => {
          if (i !== j) {
            const dx = particle.x - particle2.x;
            const dy = particle.y - particle2.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 150) {
              ctx.beginPath();
              ctx.strokeStyle = `rgba(154, 205, 50, ${0.2 * (1 - distance / 150)})`;
              ctx.lineWidth = 0.5;
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(particle2.x, particle2.y);
              ctx.stroke();
            }
          }
        });

        // Update particle position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Bounce off walls
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(154, 205, 50, ${particle.opacity})`;
        ctx.fill();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animationId);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        company: '',
        projectType: '',
        budget: '',
        timeline: '',
        message: ''
      });
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactMethods = [
    {
      icon: (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      ),
      title: 'Email Us',
      detail: 'hello@epoch.dev',
      action: 'mailto:hello@epoch.dev'
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      ),
      title: 'Call Us',
      detail: '+1 (415) 555-0123',
      action: 'tel:+14155550123'
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      ),
      title: 'Visit Us',
      detail: 'San Francisco, CA',
      action: '#location'
    }
  ];

  return (
    <>
      <Header isScrolled={scrolled} />
      
      <main className={styles.contactMain}>
        <canvas ref={canvasRef} className={styles.backgroundCanvas} />
        
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              <span className={styles.titleLine}>Let{`'`}s Create</span>
              <span className={styles.titleLine}>
                <span className={styles.titleHighlight}>Digital Excellence</span>
              </span>
              <span className={styles.titleLine}>Together</span>
            </h1>
            
            <p className={styles.heroSubtitle}>
              Your vision deserves precision engineering and scientific innovation. 
              Connect with our team of experts to transform complexity into elegance.
            </p>

            <div className={styles.heroStats}>
              <div className={styles.stat}>
                <span className={styles.statNumber}>24h</span>
                <span className={styles.statLabel}>Response Time</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNumber}>100%</span>
                <span className={styles.statLabel}>Confidential</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNumber}>500+</span>
                <span className={styles.statLabel}>Projects Delivered</span>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className={styles.contactSection}>
          <div className={styles.contactContainer}>
            <div className={styles.formSection}>
              <div className={styles.sectionHeader}>
                <span className={styles.sectionLabel}>Start Your Journey</span>
                <h2 className={styles.sectionTitle}>Tell Us About Your Vision</h2>
              </div>

              <form ref={formRef} onSubmit={handleSubmit} className={styles.contactForm}>
                <div className={styles.formGrid}>
                  <div className={styles.formGroup}>
                    <label htmlFor="name" className={styles.label}>
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      className={`${styles.input} ${focusedField === 'name' ? styles.focused : ''}`}
                      required
                    />
                    <div className={styles.inputGlow}></div>
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="email" className={styles.label}>
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      className={`${styles.input} ${focusedField === 'email' ? styles.focused : ''}`}
                      required
                    />
                    <div className={styles.inputGlow}></div>
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="company" className={styles.label}>
                      Company
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField('company')}
                      onBlur={() => setFocusedField(null)}
                      className={`${styles.input} ${focusedField === 'company' ? styles.focused : ''}`}
                    />
                    <div className={styles.inputGlow}></div>
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="projectType" className={styles.label}>
                      Project Type *
                    </label>
                    <select
                      id="projectType"
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField('projectType')}
                      onBlur={() => setFocusedField(null)}
                      className={`${styles.select} ${focusedField === 'projectType' ? styles.focused : ''}`}
                      required
                    >
                      <option value="">Select a project type</option>
                      <option value="custom-software">Custom Software Development</option>
                      <option value="ai-ml">AI & Machine Learning</option>
                      <option value="cloud-architecture">Cloud Architecture</option>
                      <option value="digital-transformation">Digital Transformation</option>
                      <option value="technical-consulting">Technical Consulting</option>
                      <option value="other">Other</option>
                    </select>
                    <div className={styles.inputGlow}></div>
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="budget" className={styles.label}>
                      Budget Range
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField('budget')}
                      onBlur={() => setFocusedField(null)}
                      className={`${styles.select} ${focusedField === 'budget' ? styles.focused : ''}`}
                    >
                      <option value="">Select budget range</option>
                      <option value="25-50k">$25,000 - $50,000</option>
                      <option value="50-100k">$50,000 - $100,000</option>
                      <option value="100-250k">$100,000 - $250,000</option>
                      <option value="250k+">$250,000+</option>
                    </select>
                    <div className={styles.inputGlow}></div>
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="timeline" className={styles.label}>
                      Timeline
                    </label>
                    <select
                      id="timeline"
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField('timeline')}
                      onBlur={() => setFocusedField(null)}
                      className={`${styles.select} ${focusedField === 'timeline' ? styles.focused : ''}`}
                    >
                      <option value="">Select timeline</option>
                      <option value="asap">ASAP</option>
                      <option value="1-3months">1-3 months</option>
                      <option value="3-6months">3-6 months</option>
                      <option value="6months+">6+ months</option>
                    </select>
                    <div className={styles.inputGlow}></div>
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="message" className={styles.label}>
                    Project Details *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                    className={`${styles.textarea} ${focusedField === 'message' ? styles.focused : ''}`}
                    rows={6}
                    placeholder="Tell us about your project vision, challenges, and goals..."
                    required
                  />
                  <div className={styles.inputGlow}></div>
                </div>

                <button
                  type="submit"
                  className={`${styles.submitButton} ${isSubmitting ? styles.submitting : ''}`}
                  disabled={isSubmitting}
                >
                  <span className={styles.buttonText}>
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </span>
                  <div className={styles.buttonGlow}></div>
                  {!isSubmitting && (
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 2L11 13" />
                      <path d="M22 2L15 22L11 13L2 9L22 2Z" />
                    </svg>
                  )}
                </button>

                {submitStatus === 'success' && (
                  <div className={styles.successMessage}>
                    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                    <span>Thank you! We{`'`}ll be in touch within 24 hours.</span>
                  </div>
                )}
              </form>
            </div>

            {/* Contact Methods */}
            <div className={styles.contactMethods}>
              <h3 className={styles.methodsTitle}>Direct Contact</h3>
              <p className={styles.methodsSubtitle}>
                Prefer immediate contact? Reach out through any of these channels.
              </p>

              {contactMethods.map((method, index) => (
                <a
                  key={index}
                  href={method.action}
                  className={styles.contactMethod}
                  data-magnetic
                >
                  <div className={styles.methodIcon}>{method.icon}</div>
                  <div className={styles.methodContent}>
                    <h4 className={styles.methodTitle}>{method.title}</h4>
                    <p className={styles.methodDetail}>{method.detail}</p>
                  </div>
                  <div className={styles.methodArrow}>
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M7 17L17 7" />
                      <path d="M7 7h10v10" />
                    </svg>
                  </div>
                </a>
              ))}

              {/* Office Hours */}
              <div className={styles.officeHours}>
                <h4 className={styles.hoursTitle}>Office Hours</h4>
                <div className={styles.hoursGrid}>
                  <div className={styles.hoursItem}>
                    <span className={styles.hoursDay}>Mon - Fri</span>
                    <span className={styles.hoursTime}>9:00 AM - 6:00 PM PST</span>
                  </div>
                  <div className={styles.hoursItem}>
                    <span className={styles.hoursDay}>Response Time</span>
                    <span className={styles.hoursTime}>Within 24 hours</span>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className={styles.socialSection}>
                <h4 className={styles.socialTitle}>Connect With Us</h4>
                <div className={styles.socialLinks}>
                  <a href="https://linkedin.com/company/epoch-software" className={styles.socialLink} aria-label="LinkedIn">
                    <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                  <a href="https://github.com/EPOCH-SOFTWARE" className={styles.socialLink} aria-label="GitHub">
                    <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </a>
                  <a href="https://twitter.com/epoch_dev" className={styles.socialLink} aria-label="Twitter">
                    <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className={styles.mapSection} id="location">
          <div className={styles.mapContainer}>
            <div className={styles.mapOverlay}>
              <h3 className={styles.mapTitle}>Visit Our Office</h3>
              <p className={styles.mapAddress}>
                11807 Park Road<br />
                Charlotte, NC 28226<br />
                United States
              </p>
              <a href="https://maps.google.com/maps?q=11807+Park+Road+Charlotte+NC+28226" className={styles.directionsLink} target="_blank" rel="noopener noreferrer">
                Get Directions
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </a>
            </div>
            <div className={styles.mapPlaceholder}>
              {/* Map grid pattern */}
              <div className={styles.mapGrid}>
                {[...Array(20)].map((_, i) => (
                  <div key={i} className={styles.gridLine} style={{ '--index': i } as React.CSSProperties} />
                ))}
              </div>
              
              {/* Additional visual elements for better visibility */}
              <div className={styles.mapPattern}>
                {[...Array(50)].map((_, i) => (
                  <div 
                    key={`dot-${i}`} 
                    className={styles.mapDot} 
                    style={{ 
                      '--dot-index': i
                    } as React.CSSProperties} 
                  />
                ))}
              </div>
              
              <div className={styles.mapPin}>
                <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" fill="rgba(154, 205, 50, 0.2)" />
                  <circle cx="12" cy="10" r="3" fill="rgba(154, 205, 50, 0.3)" />
                </svg>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
}