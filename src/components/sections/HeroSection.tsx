/**
 * @fileoverview Hero section component with wormhole animation
 * @author Epoch Development Team
 */

'use client';

import React, { useMemo, useEffect, useRef, useState } from 'react';
import styles from '../../../styles/EpochHomepage.module.css';

interface HeroSectionProps {
  className?: string;
}

export const HeroSection = React.forwardRef<HTMLElement, HeroSectionProps>(
  function HeroSection({ className }, ref) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const wormholeCanvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>(0);

  // Mouse tracking for parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Wormhole animation - exact copy from original
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

  const heroTextLines = useMemo(
    () => [
      { text: 'Crafting software', delay: '0.1s' },
      { text: 'with the precision', delay: '0.3s' },
      { text: 'of Swiss watchmakers', delay: '0.5s' },
    ],
    []
  );

  return (
    <section ref={ref} className={`${styles.hero} ${className || ''}`} role="banner">
      {/* Animated gradient mesh background */}
      <div className={styles.gradientMesh} aria-hidden="true">
        <div className={styles.gradientOrb1} />
        <div className={styles.gradientOrb2} />
        <div className={styles.gradientOrb3} />
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
                        style={
                          {
                            '--char-delay': `${charIndex * 0.02}s`,
                          } as React.CSSProperties
                        }
                      >
                        {char === ' ' ? '\u00A0' : char}
                      </span>
                    ))}
                  </span>
                </div>
              ))}
            </h1>
            
            <p className={styles.heroSubtitle}>
              We build intelligent systems that transform complexity into elegance, where every
              line of code serves a purpose.
            </p>
            
            <div className={styles.ctaWrapper}>
              <a
                href="#expertise"
                className={styles.cta}
                aria-label="Explore our craft and expertise"
                data-magnetic
              >
                <div className={styles.ctaGlow} />
                <span className={styles.ctaText}>Explore our craft</span>
                <div className={styles.ctaArrow} aria-hidden="true">
                  <svg
                    viewBox="0 0 16 16"
                    width="16"
                    height="16"
                    role="img"
                    aria-label="Arrow pointing right"
                  >
                    <path
                      d="M1 8h14m-6-6l6 6-6 6"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      fill="none"
                    />
                  </svg>
                </div>
              </a>
              <div className={styles.ctaShimmer} />
            </div>
          </div>

          {/* Wormhole Animation */}
          <div className={styles.wormholeContainer}>
            <canvas ref={wormholeCanvasRef} className={styles.wormholeCanvas} aria-hidden="true" />
            <div className={styles.wormholeGlow} />
          </div>
        </div>
      </div>
    </section>
  );
}
);