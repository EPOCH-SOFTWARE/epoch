'use client';

import React, { useMemo, useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { EXPERTISE_ITEMS, PORTFOLIO_ITEMS, CASE_STUDIES } from '@/src/shared/constants/content';
import { ExpertiseItem, PortfolioItem, CaseStudy } from '@/src/shared/types';
import styles from '@/styles/EpochHomepage.module.css';

const EpochHomepage: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hoveredPortfolio, setHoveredPortfolio] = useState<string | null>(null);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<number>(0);
  const heroRef = useRef<HTMLElement>(null);
  const expertiseRef = useRef<HTMLElement>(null);
  const portfolioRef = useRef<HTMLElement>(null);
  const caseStudiesRef = useRef<HTMLElement>(null);
  const wormholeCanvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 100);
      
      // Update active section based on scroll
      if (heroRef.current && expertiseRef.current) {
        const heroBottom = heroRef.current.offsetTop + heroRef.current.offsetHeight;
        if (scrollY < heroBottom - 200) {
          setActiveSection(0);
        } else {
          setActiveSection(1);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Mouse tracking for parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Wormhole animation
  useEffect(() => {
    if (!wormholeCanvasRef.current) return;

    const canvas = wormholeCanvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      if (typeof window !== 'undefined') {
        // Always use desktop size on mobile for consistency
        const size = window.innerWidth <= 768 ? 450 : Math.min(window.innerWidth * 0.35, 450);
        canvas.width = size;
        canvas.height = size;
      }
    };
    resizeCanvas();
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', resizeCanvas);
    }

    // Wormhole parameters
    let time = 0;
    const particles: Array<{
      angle: number;
      radius: number;
      speed: number;
      size: number;
      color: string;
      depth: number;
    }> = [];

    // Create particles - reduced count for performance
    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
    const particleCount = isMobile ? 50 : 100; // Reduced from 200
    
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        angle: Math.random() * Math.PI * 2,
        radius: Math.random() * 250,
        speed: 0.5 + Math.random() * 2,
        size: Math.random() * 3 + 1,
        color: `hsl(${140 + Math.random() * 60}, 70%, ${50 + Math.random() * 30}%)`,
        depth: Math.random()
      });
    }

    let frameCount = 0;
    const targetFPS = 30; // Reduced from 60fps
    const frameInterval = 1000 / targetFPS;
    let lastFrameTime = 0;

    const drawWormhole = (currentTime: number = 0) => {
      // Throttle to target FPS
      if (currentTime - lastFrameTime < frameInterval) {
        animationFrameRef.current = requestAnimationFrame(drawWormhole);
        return;
      }
      lastFrameTime = currentTime;
      frameCount++;

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      
      // Clear canvas with dark background
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Add soft edge transition
      const edgeGradient = ctx.createRadialGradient(
        centerX, centerY, canvas.width * 0.3,
        centerX, centerY, canvas.width * 0.5
      );
      edgeGradient.addColorStop(0, 'transparent');
      edgeGradient.addColorStop(0.8, 'transparent');
      edgeGradient.addColorStop(1, 'rgba(155, 193, 54, 0.05)');
      
      ctx.fillStyle = edgeGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw wormhole tunnel effect - reduced complexity
      const tunnelLayers = isMobile ? 10 : 15; // Reduced from 20
      for (let i = tunnelLayers; i > 0; i--) {
        const radius = (i / tunnelLayers) * (canvas.width * 0.4);
        const opacity = 1 - (i / tunnelLayers);
        
        // Create gradient for depth
        const gradient = ctx.createRadialGradient(
          centerX + (mousePos.x - (typeof window !== 'undefined' ? window.innerWidth / 2 : 400)) * 0.02 * i,
          centerY + (mousePos.y - (typeof window !== 'undefined' ? window.innerHeight / 2 : 400)) * 0.02 * i,
          0,
          centerX,
          centerY,
          radius
        );
        
        gradient.addColorStop(0, `rgba(0, 0, 0, ${opacity})`);
        gradient.addColorStop(0.5, `rgba(30, 10, 60, ${opacity * 0.5})`);
        gradient.addColorStop(0.7, `rgba(60, 20, 100, ${opacity * 0.3})`);
        gradient.addColorStop(1, `rgba(155, 193, 54, ${opacity * 0.1})`);
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw swirling effect - reduced on mobile
      if (!isMobile || frameCount % 2 === 0) { // Skip every other frame on mobile
        ctx.save();
        ctx.translate(centerX, centerY);
        
        const spiralCount = isMobile ? 3 : 5; // Reduced spirals on mobile
        for (let i = 0; i < spiralCount; i++) {
          ctx.rotate(time * 0.001 * (i % 2 ? 1 : -1));
        
        const spiralGradient = ctx.createLinearGradient(-200, 0, 200, 0);
        spiralGradient.addColorStop(0, 'rgba(155, 193, 54, 0)');
        spiralGradient.addColorStop(0.5, `rgba(155, 193, 54, ${0.1 - i * 0.02})`);
        spiralGradient.addColorStop(1, 'rgba(155, 193, 54, 0)');
        
        ctx.strokeStyle = spiralGradient;
        ctx.lineWidth = 2;
        ctx.beginPath();
        
        for (let angle = 0; angle < Math.PI * 2; angle += 0.1) {
          const r = 50 + angle * 20 - i * 10;
          const x = Math.cos(angle + time * 0.002) * r;
          const y = Math.sin(angle + time * 0.002) * r;
          
          if (angle === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        
        ctx.stroke();
        }
        
        ctx.restore();
      }

      // Draw particles
      particles.forEach((particle) => {
        particle.angle += particle.speed * 0.01;
        particle.radius -= particle.speed;
        
        if (particle.radius < 10) {
          particle.radius = 250;
          particle.depth = 1;
        }
        
        const x = centerX + Math.cos(particle.angle + time * 0.001) * particle.radius;
        const y = centerY + Math.sin(particle.angle + time * 0.001) * particle.radius;
        
        // Gravitational lensing effect
        const distFromCenter = Math.sqrt(
          Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2)
        );
        const lensStrength = Math.max(0, 1 - distFromCenter / 200);
        const lensX = x + (centerX - x) * lensStrength * 0.3;
        const lensY = y + (centerY - y) * lensStrength * 0.3;
        
        // Draw particle
        ctx.globalAlpha = (1 - particle.radius / 250) * particle.depth;
        ctx.fillStyle = particle.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = particle.color;
        ctx.beginPath();
        ctx.arc(lensX, lensY, particle.size * (1 - particle.radius / 250), 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Draw event horizon
      ctx.globalAlpha = 1;
      const eventGradient = ctx.createRadialGradient(
        centerX,
        centerY,
        0,
        centerX,
        centerY,
        80
      );
      eventGradient.addColorStop(0, 'rgba(0, 0, 0, 1)');
      eventGradient.addColorStop(0.7, 'rgba(0, 0, 0, 0.8)');
      eventGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      
      ctx.fillStyle = eventGradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 80, 0, Math.PI * 2);
      ctx.fill();

      // Draw accretion disk glow
      const glowGradient = ctx.createRadialGradient(
        centerX,
        centerY,
        80,
        centerX,
        centerY,
        200
      );
      glowGradient.addColorStop(0, 'rgba(155, 193, 54, 0.3)');
      glowGradient.addColorStop(0.5, 'rgba(155, 193, 54, 0.1)');
      glowGradient.addColorStop(1, 'rgba(155, 193, 54, 0)');
      
      ctx.fillStyle = glowGradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 200, 0, Math.PI * 2);
      ctx.fill();

      time += frameInterval;
      animationFrameRef.current = requestAnimationFrame(drawWormhole);
    };

    drawWormhole();

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', resizeCanvas);
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [mousePos]);


  const heroTextLines = useMemo(() => [
    { text: 'Crafting software', delay: '0.1s' },
    { text: 'with the precision', delay: '0.3s' },
    { text: 'of Swiss watchmakers', delay: '0.5s' }
  ], []);

  const renderExpertiseItems = useMemo(() => 
    EXPERTISE_ITEMS.map((item: ExpertiseItem, index: number) => (
      <div 
        key={`${item.number}-${index}`}
        className={styles.expertiseItem}
      >
        <div className={styles.expertiseNumber} aria-hidden="true">
          {item.number}
        </div>
        <h3 className={styles.expertiseTitle}>{item.title}</h3>
        <p className={styles.expertiseDescription}>{item.description}</p>
      </div>
    )), []
  );

  return (
    <>

      <header 
        className={`${styles.header} ${scrolled ? styles.headerScrolled : ''}`}
        role="banner"
      >
        <div className={styles.headerInner}>
          <div className={styles.logo}>
            <Image 
              src="/epoch-logo.svg" 
              alt="Epoch" 
              width={150} 
              height={48}
              priority
              style={{ objectFit: 'contain' }}
            />
          </div>
          <nav className={styles.nav} role="navigation" aria-label="Main navigation">
            <ul>
              <li>
                <a 
                  href="#services" 
                  aria-label="Go to services section"
                >
                  Services
                </a>
              </li>
              <li>
                <a 
                  href="#portfolio" 
                  aria-label="Go to portfolio section"
                >
                  Portfolio
                </a>
              </li>
              <li>
                <a 
                  href="#case-studies" 
                  aria-label="Go to case studies section"
                >
                  Case Studies
                </a>
              </li>
              <li>
                <a 
                  href="#expertise" 
                  aria-label="Go to expertise section"
                >
                  Expertise
                </a>
              </li>
              <li>
                <a 
                  href="#contact" 
                  aria-label="Go to contact section"
                >
                  Contact
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main>
        <section className={styles.hero} role="banner" ref={heroRef}>
          {/* Animated gradient mesh background */}
          <div className={styles.gradientMesh} aria-hidden="true">
            <div className={styles.gradientOrb1}></div>
            <div className={styles.gradientOrb2}></div>
            <div className={styles.gradientOrb3}></div>
          </div>
          
          
          
          <div className={styles.heroInner}>
            <div className={styles.heroLayout}>
              <div className={styles.heroContent}>
                <h1 className={styles.heroTitle}>
                {heroTextLines.map((line, index) => (
                  <div key={index} className={styles.heroText}>
                    <span 
                      className={styles.heroTextSpan}
                      style={{ '--delay': line.delay } as React.CSSProperties}
                    >
                      {line.text.split('').map((char, charIndex) => (
                        <span 
                          key={charIndex} 
                          className={styles.heroChar}
                          style={{ '--char-delay': `${charIndex * 0.02}s` } as React.CSSProperties}
                        >
                          {char === ' ' ? '\u00A0' : char}
                        </span>
                      ))}
                    </span>
                  </div>
                ))}
              </h1>
              <p className={styles.heroSubtitle}>
                We build intelligent systems that transform complexity into elegance, 
                where every line of code serves a purpose.
              </p>
              <div className={styles.ctaWrapper}>
                <a 
                  href="#expertise" 
                  className={styles.cta} 
                  aria-label="Explore our craft and expertise"
                >
                  <div className={styles.ctaGlow}></div>
                  <span className={styles.ctaText}>Explore our craft</span>
                  <div className={styles.ctaArrow} aria-hidden="true">
                    <svg viewBox="0 0 16 16" width="16" height="16" role="img" aria-label="Arrow pointing right">
                      <path d="M1 8h14m-6-6l6 6-6 6" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                    </svg>
                  </div>
                </a>
                <div className={styles.ctaShimmer}></div>
              </div>
            </div>
            
            {/* Wormhole Animation */}
            <div className={styles.wormholeContainer}>
              <canvas 
                ref={wormholeCanvasRef}
                className={styles.wormholeCanvas}
                aria-hidden="true"
              />
              <div className={styles.wormholeGlow}></div>
            </div>
          </div>
          </div>

        </section>

        <section className={styles.about} id="about" aria-labelledby="about-heading">
          <div className={styles.aboutInner}>
            <div className={styles.sectionHeader}>
              <p className={styles.sectionLabel} id="about-heading">About us</p>
              <h2 className={styles.sectionTitle}>About Epoch</h2>
            </div>
            <div className={styles.aboutContent}>
              <div className={styles.aboutText}>
                <p className={styles.aboutParagraph}>
                  Founded on the principle that exceptional software emerges from the intersection 
                  of deep technical expertise and relentless attention to detail, Epoch represents 
                  a new paradigm in software development.
                </p>
                <p className={styles.aboutParagraph}>
                  We believe that every line of code tells a story—one of intention, precision, 
                  and purpose. Our team combines decades of collective experience across cutting-edge 
                  technologies with an unwavering commitment to craftsmanship that mirrors the 
                  precision of Swiss watchmakers.
                </p>
                <p className={styles.aboutParagraph}>
                  At Epoch, we don't just build software; we architect digital experiences that 
                  stand the test of time. Each project is an opportunity to push the boundaries 
                  of what's possible while maintaining the reliability and elegance that define 
                  truly exceptional systems.
                </p>
              </div>
              <div className={styles.aboutStats}>
                <div className={styles.stat}>
                  <div className={styles.statNumber}>10+</div>
                  <div className={styles.statLabel}>Years of Excellence</div>
                </div>
                <div className={styles.stat}>
                  <div className={styles.statNumber}>50+</div>
                  <div className={styles.statLabel}>Projects Delivered</div>
                </div>
                <div className={styles.stat}>
                  <div className={styles.statNumber}>99.9%</div>
                  <div className={styles.statLabel}>Uptime Achieved</div>
                </div>
                <div className={styles.stat}>
                  <div className={styles.statNumber}>&lt;100ms</div>
                  <div className={styles.statLabel}>Average Response Time</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.services} id="services" aria-labelledby="services-heading">
          <div className={styles.servicesInner}>
            <div className={styles.sectionHeader}>
              <p className={styles.sectionLabel} id="services-heading">Our capabilities</p>
              <h2 className={styles.sectionTitle}>Services that transcend boundaries</h2>
            </div>
            <div className={styles.servicesGrid}>
              <div className={styles.serviceItem} data-service="01">
                <div className={styles.serviceNumber}>
                  <span className={styles.numberMain}>01</span>
                  <span className={styles.numberGhost}>01</span>
                </div>
                <div className={styles.serviceContent}>
                  <h3 className={styles.serviceTitle}>Custom Software Development</h3>
                  <p className={styles.serviceDescription}>
                    Architecting digital ecosystems with precision engineering. From concept to deployment, 
                    we craft bespoke solutions that evolve with your vision.
                  </p>
                  <div className={styles.serviceTags}>
                    <span className={styles.serviceTag}>Full-stack</span>
                    <span className={styles.serviceTag}>API Integration</span>
                    <span className={styles.serviceTag}>Architecture</span>
                  </div>
                </div>
                <div className={styles.serviceOrbit}>
                  <div className={styles.orbitRing}></div>
                  <div className={styles.orbitParticle}></div>
                </div>
              </div>

              <div className={styles.serviceItem} data-service="02">
                <div className={styles.serviceNumber}>
                  <span className={styles.numberMain}>02</span>
                  <span className={styles.numberGhost}>02</span>
                </div>
                <div className={styles.serviceContent}>
                  <h3 className={styles.serviceTitle}>AI & Machine Learning</h3>
                  <p className={styles.serviceDescription}>
                    Harnessing artificial intelligence to unlock patterns in complexity. 
                    We transform data into actionable intelligence through cutting-edge algorithms.
                  </p>
                  <div className={styles.serviceTags}>
                    <span className={styles.serviceTag}>Predictive Analytics</span>
                    <span className={styles.serviceTag}>NLP</span>
                    <span className={styles.serviceTag}>Computer Vision</span>
                  </div>
                </div>
                <div className={styles.serviceOrbit}>
                  <div className={styles.orbitRing}></div>
                  <div className={styles.orbitParticle}></div>
                </div>
              </div>

              <div className={styles.serviceItem} data-service="03">
                <div className={styles.serviceNumber}>
                  <span className={styles.numberMain}>03</span>
                  <span className={styles.numberGhost}>03</span>
                </div>
                <div className={styles.serviceContent}>
                  <h3 className={styles.serviceTitle}>Cloud Architecture</h3>
                  <p className={styles.serviceDescription}>
                    Building resilient infrastructure that scales beyond horizons. Our cloud solutions 
                    ensure applications perform flawlessly under any pressure.
                  </p>
                  <div className={styles.serviceTags}>
                    <span className={styles.serviceTag}>Microservices</span>
                    <span className={styles.serviceTag}>DevOps</span>
                    <span className={styles.serviceTag}>Security</span>
                  </div>
                </div>
                <div className={styles.serviceOrbit}>
                  <div className={styles.orbitRing}></div>
                  <div className={styles.orbitParticle}></div>
                </div>
              </div>

              <div className={styles.serviceItem} data-service="04">
                <div className={styles.serviceNumber}>
                  <span className={styles.numberMain}>04</span>
                  <span className={styles.numberGhost}>04</span>
                </div>
                <div className={styles.serviceContent}>
                  <h3 className={styles.serviceTitle}>Digital Experience Design</h3>
                  <p className={styles.serviceDescription}>
                    Crafting interfaces that feel like natural phenomena. We design experiences that 
                    bridge human intuition and digital possibility.
                  </p>
                  <div className={styles.serviceTags}>
                    <span className={styles.serviceTag}>UX/UI Design</span>
                    <span className={styles.serviceTag}>Prototyping</span>
                    <span className={styles.serviceTag}>Design Systems</span>
                  </div>
                </div>
                <div className={styles.serviceOrbit}>
                  <div className={styles.orbitRing}></div>
                  <div className={styles.orbitParticle}></div>
                </div>
              </div>

              <div className={styles.serviceItem} data-service="05">
                <div className={styles.serviceNumber}>
                  <span className={styles.numberMain}>05</span>
                  <span className={styles.numberGhost}>05</span>
                </div>
                <div className={styles.serviceContent}>
                  <h3 className={styles.serviceTitle}>Performance Optimization</h3>
                  <p className={styles.serviceDescription}>
                    Accelerating digital velocity through computational precision. We fine-tune systems 
                    to achieve quantum leaps in speed and efficiency.
                  </p>
                  <div className={styles.serviceTags}>
                    <span className={styles.serviceTag}>Code Optimization</span>
                    <span className={styles.serviceTag}>Database Tuning</span>
                    <span className={styles.serviceTag}>Load Testing</span>
                  </div>
                </div>
                <div className={styles.serviceOrbit}>
                  <div className={styles.orbitRing}></div>
                  <div className={styles.orbitParticle}></div>
                </div>
              </div>

              <div className={styles.serviceItem} data-service="06">
                <div className={styles.serviceNumber}>
                  <span className={styles.numberMain}>06</span>
                  <span className={styles.numberGhost}>06</span>
                </div>
                <div className={styles.serviceContent}>
                  <h3 className={styles.serviceTitle}>Technical Consulting</h3>
                  <p className={styles.serviceDescription}>
                    Navigating complexity of modern technology landscapes. Our expertise guides 
                    critical decisions that shape digital transformation futures.
                  </p>
                  <div className={styles.serviceTags}>
                    <span className={styles.serviceTag}>Architecture Reviews</span>
                    <span className={styles.serviceTag}>Tech Audits</span>
                    <span className={styles.serviceTag}>Strategic Planning</span>
                  </div>
                </div>
                <div className={styles.serviceOrbit}>
                  <div className={styles.orbitRing}></div>
                  <div className={styles.orbitParticle}></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.portfolio} id="portfolio" aria-labelledby="portfolio-heading" ref={portfolioRef}>
          <div className={styles.portfolioInner}>
            <div className={styles.sectionHeader}>
              <p className={styles.sectionLabel} id="portfolio-heading">Our work</p>
              <h2 className={styles.sectionTitle}>Digital phenomena we've birthed</h2>
            </div>
            
            <div className={styles.portfolioGrid}>
              {PORTFOLIO_ITEMS.map((item, index) => (
                <div
                  key={item.id}
                  className={`${styles.portfolioItem} ${hoveredPortfolio === item.id ? styles.portfolioItemHovered : ''}`}
                  onMouseEnter={() => setHoveredPortfolio(item.id)}
                  onMouseLeave={() => setHoveredPortfolio(null)}
                  style={{
                    '--portfolio-delay': `${index * 0.1}s`,
                    '--portfolio-gradient': item.gradient
                  } as React.CSSProperties}
                >
                  <div className={styles.portfolioItemInner}>
                    <div className={styles.portfolioGradient}></div>
                    <div className={styles.portfolioContent}>
                      <div className={styles.portfolioCategory}>{item.category}</div>
                      <h3 className={styles.portfolioTitle}>{item.title}</h3>
                      <p className={styles.portfolioDescription}>{item.description}</p>
                      
                      <div className={styles.portfolioTags}>
                        {item.tags.map((tag, tagIndex) => (
                          <span key={tagIndex} className={styles.portfolioTag}>{tag}</span>
                        ))}
                      </div>
                      
                      <div className={styles.portfolioMetrics}>
                        <div className={styles.metric}>
                          <span className={styles.metricLabel}>Impact</span>
                          <span className={styles.metricValue}>{item.metrics.impact}</span>
                        </div>
                        <div className={styles.metric}>
                          <span className={styles.metricLabel}>Duration</span>
                          <span className={styles.metricValue}>{item.metrics.duration}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className={styles.portfolioHoverEffect}>
                      <div className={styles.portfolioParticles}>
                        {[...Array(6)].map((_, i) => (
                          <div key={i} className={styles.particle} style={{ '--particle-index': i } as React.CSSProperties}></div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.caseStudies} id="case-studies" aria-labelledby="case-studies-heading" ref={caseStudiesRef}>
          <div className={styles.caseStudiesInner}>
            <div className={styles.sectionHeader}>
              <p className={styles.sectionLabel} id="case-studies-heading">Deep dives</p>
              <h2 className={styles.sectionTitle}>Transformations that rewrote reality</h2>
            </div>
            
            <div className={styles.caseStudiesContainer}>
              <div className={styles.caseStudyTimeline}>
                {CASE_STUDIES.map((study, index) => (
                  <button
                    key={study.id}
                    className={`${styles.timelineItem} ${selectedCaseStudy === index ? styles.timelineItemActive : ''}`}
                    onClick={() => setSelectedCaseStudy(index)}
                    aria-label={`View ${study.title} case study`}
                  >
                    <div className={styles.timelineYear}>{study.year}</div>
                    <div className={styles.timelineTitle}>{study.title}</div>
                    <div className={styles.timelineProgress}></div>
                  </button>
                ))}
              </div>
              
              <div className={styles.caseStudyContent}>
                {CASE_STUDIES.map((study, index) => (
                  <div
                    key={study.id}
                    className={`${styles.caseStudyDetail} ${selectedCaseStudy === index ? styles.caseStudyDetailActive : ''}`}
                    style={{ '--case-gradient': study.gradient } as React.CSSProperties}
                  >
                    <div className={styles.caseStudyHeader}>
                      <div className={styles.caseStudyIndustry}>{study.industry}</div>
                      <h3 className={styles.caseStudyTitle}>{study.title}</h3>
                      <p className={styles.caseStudySubtitle}>{study.subtitle}</p>
                    </div>
                    
                    <div className={styles.caseStudyBody}>
                      <div className={styles.caseStudySection}>
                        <h4 className={styles.caseStudySectionTitle}>The Challenge</h4>
                        <p className={styles.caseStudySectionText}>{study.challenge}</p>
                      </div>
                      
                      <div className={styles.caseStudySection}>
                        <h4 className={styles.caseStudySectionTitle}>Our Solution</h4>
                        <p className={styles.caseStudySectionText}>{study.solution}</p>
                      </div>
                      
                      <div className={styles.caseStudySection}>
                        <h4 className={styles.caseStudySectionTitle}>The Results</h4>
                        <div className={styles.caseStudyResults}>
                          {study.results.map((result, resultIndex) => (
                            <div key={resultIndex} className={styles.resultItem}>
                              <div className={styles.resultIcon}>
                                <svg viewBox="0 0 24 24" width="24" height="24" fill="none">
                                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="currentColor"/>
                                </svg>
                              </div>
                              <span className={styles.resultText}>{result}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className={styles.caseStudyTech}>
                        <h4 className={styles.caseStudySectionTitle}>Technologies Used</h4>
                        <div className={styles.techStack}>
                          {study.technologies.map((tech, techIndex) => (
                            <span key={techIndex} className={styles.techItem}>{tech}</span>
                          ))}
                        </div>
                      </div>
                      
                      {study.testimonial && (
                        <div className={styles.caseStudyTestimonial}>
                          <blockquote className={styles.testimonialQuote}>
                            "{study.testimonial.quote}"
                          </blockquote>
                          <div className={styles.testimonialAuthor}>
                            <div className={styles.authorName}>{study.testimonial.author}</div>
                            <div className={styles.authorPosition}>{study.testimonial.position}</div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section 
          className={`${styles.expertise} ${activeSection >= 1 ? styles.expertiseVisible : ''}`} 
          id="expertise" 
          aria-labelledby="expertise-heading"
          ref={expertiseRef}
        >
          <div className={styles.expertiseInner}>
            <div className={styles.sectionHeader}>
              <p className={styles.sectionLabel} id="expertise-heading">What we do</p>
              <h2 className={styles.sectionTitle}>Expertise that drives innovation</h2>
            </div>
            <div className={styles.expertiseGrid} role="list">
              {renderExpertiseItems}
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default EpochHomepage;