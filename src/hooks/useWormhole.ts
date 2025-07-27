/**
 * @fileoverview Optimized wormhole animation hook
 * @author Epoch Development Team
 */

import { useEffect, useRef, useCallback } from 'react';
import { 
  setupCanvas, 
  createParticle, 
  resetParticle, 
  applyGravitationalLensing,
  createOptimizedRadialGradient,
  drawParticle 
} from '../shared/utils/canvas';
import { FrameRateLimiter, ObjectPool, getDeviceOptimizedConfig } from '../shared/utils/performance';
import { WORMHOLE_CONFIG, CANVAS_CONFIG } from '../shared/constants/app';
import type { CanvasParticle, CursorPosition, WormholeConfig } from '../shared/types';

interface UseWormholeProps {
  mousePosition: CursorPosition;
}

export function useWormhole({ mousePosition }: UseWormholeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>(0);
  const particlePoolRef = useRef<ObjectPool<CanvasParticle> | null>(null);
  const frameRateLimiterRef = useRef<FrameRateLimiter | null>(null);
  const mousePositionRef = useRef<CursorPosition>(mousePosition);

  const initializeAnimation = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      console.warn('Canvas ref not available for wormhole animation');
      return;
    }

    const ctx = setupCanvas(canvas);
    if (!ctx) {
      console.warn('Unable to get 2D context for wormhole canvas');
      return;
    }

    const rawConfig = getDeviceOptimizedConfig(
      WORMHOLE_CONFIG.DESKTOP,
      WORMHOLE_CONFIG.MOBILE
    );
    
    const config: WormholeConfig = {
      particleCount: rawConfig.PARTICLE_COUNT,
      targetFPS: rawConfig.TARGET_FPS,
      tunnelLayers: rawConfig.TUNNEL_LAYERS,
      spiralCount: rawConfig.SPIRAL_COUNT,
    };

    // Initialize object pool for particles
    if (!particlePoolRef.current) {
      particlePoolRef.current = new ObjectPool(
        createParticle,
        resetParticle,
        config.particleCount
      );
    }

    // Initialize frame rate limiter
    if (!frameRateLimiterRef.current) {
      frameRateLimiterRef.current = new FrameRateLimiter(config.targetFPS);
    }

    const particles: CanvasParticle[] = [];
    for (let i = 0; i < config.particleCount; i++) {
      particles.push(particlePoolRef.current.acquire());
    }

    let time = 0;

    const animate = (currentTime: number = 0) => {
      if (!canvas || !ctx) return;
      
      if (!frameRateLimiterRef.current?.shouldRender(currentTime)) {
        animationFrameRef.current = requestAnimationFrame(animate);
        return;
      }

      // Use the logical canvas size, not the pixel-scaled size
      const pixelRatio = window.devicePixelRatio || 1;
      const logicalWidth = canvas.width / pixelRatio;
      const logicalHeight = canvas.height / pixelRatio;
      const centerX = logicalWidth / 2;
      const centerY = logicalHeight / 2;
      
      // Ensure we have valid dimensions
      if (centerX <= 0 || centerY <= 0) {
        animationFrameRef.current = requestAnimationFrame(animate);
        return;
      }

      // Clear canvas with dark background
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, logicalWidth, logicalHeight);

      // Draw wormhole tunnel effect
      drawWormholeTunnel(ctx, centerX, centerY, config, mousePositionRef.current);
      
      // Draw swirling effect
      drawSwirlEffect(ctx, centerX, centerY, config, time, mousePositionRef.current);

      // Draw and update particles
      updateAndDrawParticles(ctx, particles, centerX, centerY, time, mousePositionRef.current);

      // Draw event horizon and accretion disk
      drawEventHorizon(ctx, centerX, centerY, mousePositionRef.current);
      drawAccretionDisk(ctx, centerX, centerY, mousePositionRef.current);

      time += 16; // Approximate frame time
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      particles.forEach(particle => {
        particlePoolRef.current?.release(particle);
      });
    };
  }, [mousePosition]);

  // Update mouse position ref when prop changes
  useEffect(() => {
    mousePositionRef.current = mousePosition;
  }, [mousePosition]);

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || typeof window === 'undefined') return;

    const size = window.innerWidth <= 768 
      ? CANVAS_CONFIG.MIN_SIZE 
      : Math.min(window.innerWidth * CANVAS_CONFIG.SIZE_FACTOR, CANVAS_CONFIG.MAX_SIZE);
    
    // Set canvas intrinsic size
    canvas.width = size;
    canvas.height = size;
    
    // Set canvas display size
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;

    resizeCanvas();
    const cleanup = initializeAnimation();

    const handleResize = () => {
      resizeCanvas();
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', handleResize);
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      cleanup?.();
    };
  }, []); // Remove dependencies to prevent re-initialization

  return { canvasRef };
}

function drawWormholeTunnel(
  ctx: CanvasRenderingContext2D,
  centerX: number,
  centerY: number,
  config: WormholeConfig,
  mousePos: CursorPosition
) {
  const windowCenterX = typeof window !== 'undefined' ? window.innerWidth / 2 : 400;
  const windowCenterY = typeof window !== 'undefined' ? window.innerHeight / 2 : 400;
  
  // Calculate mouse distance from center for dramatic effect
  const mouseDistanceX = mousePos.x - windowCenterX;
  const mouseDistanceY = mousePos.y - windowCenterY;
  const mouseDistance = Math.sqrt(mouseDistanceX * mouseDistanceX + mouseDistanceY * mouseDistanceY);
  const maxDistance = Math.sqrt(windowCenterX * windowCenterX + windowCenterY * windowCenterY);
  const mouseIntensity = Math.min(mouseDistance / maxDistance, 1);

  for (let i = config.tunnelLayers; i > 0; i--) {
    const radius = (i / config.tunnelLayers) * (centerX * 0.8);
    const opacity = 1 - (i / config.tunnelLayers);
    
    // Subtle but responsive mouse influence for seamless integration
    const layerMultiplier = i * 0.08; // Reduced for subtlety
    const distortionStrength = 1 + mouseIntensity * 0.6; // Gentle distortion
    
    const mouseOffsetX = mouseDistanceX * layerMultiplier * distortionStrength;
    const mouseOffsetY = mouseDistanceY * layerMultiplier * distortionStrength;
    
    // Gentle rotation effect that follows website's cubic-bezier aesthetic
    const mouseAngle = Math.atan2(mouseDistanceY, mouseDistanceX);
    const rotationOffset = mouseIntensity * 0.2 * Math.sin(mouseAngle * 2);
    
    // Website-integrated gradient using the established color palette
    const greenIntensity = mouseIntensity * 0.4; // Subtle intensity
    const nightIntensity = 1 - mouseIntensity * 0.3; // Keep dark base
    
    const gradient = createOptimizedRadialGradient(
      ctx,
      centerX + mouseOffsetX,
      centerY + mouseOffsetY,
      0,
      radius * (1 + mouseIntensity * 0.15), // Subtle radius changes
      [
        { offset: 0, color: `rgba(6, 15, 1, ${opacity * nightIntensity})` }, // --night
        { offset: 0.3, color: `rgba(69, 84, 34, ${opacity * 0.8})` }, // --dark-moss-green
        { offset: 0.5, color: `rgba(135, 138, 115, ${opacity * 0.6})` }, // --reseda-green
        { offset: 0.7, color: `rgba(155, 193, 54, ${opacity * (0.3 + greenIntensity * 0.5)})` }, // --yellow-green
        { offset: 0.9, color: `rgba(155, 193, 54, ${opacity * greenIntensity * 0.8})` }, // --yellow-green glow
        { offset: 1, color: `rgba(155, 193, 54, ${opacity * greenIntensity * 0.3})` }, // Subtle edge
      ]
    );

    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(rotationOffset);
    ctx.translate(-centerX, -centerY);
    
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.restore();
  }
}

function drawSwirlEffect(
  ctx: CanvasRenderingContext2D,
  centerX: number,
  centerY: number,
  config: WormholeConfig,
  time: number,
  mousePos: CursorPosition
) {
  const windowCenterX = typeof window !== 'undefined' ? window.innerWidth / 2 : 400;
  const windowCenterY = typeof window !== 'undefined' ? window.innerHeight / 2 : 400;
  
  const mouseDistanceX = mousePos.x - windowCenterX;
  const mouseDistanceY = mousePos.y - windowCenterY;
  const mouseDistance = Math.sqrt(mouseDistanceX * mouseDistanceX + mouseDistanceY * mouseDistanceY);
  const maxDistance = Math.sqrt(windowCenterX * windowCenterX + windowCenterY * windowCenterY);
  const mouseIntensity = Math.min(mouseDistance / maxDistance, 1);
  
  // Mouse angle for directional effects
  const mouseAngle = Math.atan2(mouseDistanceY, mouseDistanceX);
  
  ctx.save();
  ctx.translate(centerX, centerY);
  
  // Gentle mouse-influenced rotation for natural feel
  ctx.rotate(mouseAngle * 0.05 + mouseIntensity * 0.1);

  for (let i = 0; i < config.spiralCount; i++) {
    // Subtle rotation speed that feels organic
    const baseRotation = time * 0.001 * (i % 2 ? 1 : -1);
    const mouseRotation = mouseIntensity * 0.003 * (i % 2 ? 1 : -1); // Gentle influence
    ctx.rotate(baseRotation + mouseRotation);

    // Refined gradient with website colors
    const gradientLength = 200 + mouseIntensity * 80; // Subtle expansion
    const spiralGradient = ctx.createLinearGradient(-gradientLength, 0, gradientLength, 0);
    
    const baseOpacity = 0.08 - i * 0.015; // Reduced base opacity
    const mouseOpacity = mouseIntensity * 0.2; // Subtle enhancement
    const totalOpacity = Math.min(baseOpacity + mouseOpacity, 0.3); // Keep it subtle
    
    spiralGradient.addColorStop(0, 'rgba(155, 193, 54, 0)'); // --yellow-green transparent
    spiralGradient.addColorStop(0.2, `rgba(135, 138, 115, ${totalOpacity * 0.6})`); // --reseda-green
    spiralGradient.addColorStop(0.5, `rgba(155, 193, 54, ${totalOpacity})`); // --yellow-green
    spiralGradient.addColorStop(0.7, `rgba(69, 84, 34, ${totalOpacity * 0.8})`); // --dark-moss-green
    spiralGradient.addColorStop(1, 'rgba(155, 193, 54, 0)'); // --yellow-green transparent

    ctx.strokeStyle = spiralGradient;
    ctx.lineWidth = 1.5 + mouseIntensity * 2; // Subtle line width changes
    ctx.beginPath();

    for (let angle = 0; angle < Math.PI * 2; angle += 0.08) { // Standard detail
      // Gentle dynamic radius calculation
      const baseRadius = 50 + angle * 20 - i * 10;
      const mouseRadius = mouseIntensity * 15 * Math.sin(angle * 3); // Subtle influence
      const r = baseRadius + mouseRadius;
      
      // Subtle mouse-influenced distortion
      const distortion = mouseIntensity * 8 * Math.sin(angle * 2 + time * 0.003);
      const timeOffset = time * 0.002 + mouseIntensity * 0.0005;
      
      const x = Math.cos(angle + timeOffset) * r + distortion;
      const y = Math.sin(angle + timeOffset) * r + distortion * 0.5;

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

function updateAndDrawParticles(
  ctx: CanvasRenderingContext2D,
  particles: CanvasParticle[],
  centerX: number,
  centerY: number,
  time: number,
  mousePos: CursorPosition
) {
  const windowCenterX = typeof window !== 'undefined' ? window.innerWidth / 2 : 400;
  const windowCenterY = typeof window !== 'undefined' ? window.innerHeight / 2 : 400;
  
  const mouseDistanceX = mousePos.x - windowCenterX;
  const mouseDistanceY = mousePos.y - windowCenterY;
  const mouseDistance = Math.sqrt(mouseDistanceX * mouseDistanceX + mouseDistanceY * mouseDistanceY);
  const maxDistance = Math.sqrt(windowCenterX * windowCenterX + windowCenterY * windowCenterY);
  const mouseIntensity = Math.min(mouseDistance / maxDistance, 1);
  
  particles.forEach((particle, index) => {
    // Responsive but gentle particle movement
    const speedMultiplier = 1 + mouseIntensity * 0.3; // Subtle speed increase
    particle.angle += particle.speed * 0.01 * speedMultiplier;
    particle.radius -= particle.speed * speedMultiplier;

    if (particle.radius < 10) {
      particle.radius = 250 + mouseIntensity * 30; // Gentle variation
      particle.depth = 1;
    }

    // Subtle mouse-influenced particle path distortion
    const mouseInfluence = mouseIntensity * 0.4; // Gentle influence
    const particleMouseOffset = Math.sin(index + time * 0.001) * mouseInfluence;
    
    const baseX = centerX + Math.cos(particle.angle + time * 0.001 + particleMouseOffset) * particle.radius;
    const baseY = centerY + Math.sin(particle.angle + time * 0.001 + particleMouseOffset) * particle.radius;

    // Standard gravitational lensing with subtle mouse enhancement
    const lensedPosition = applyGravitationalLensing(baseX, baseY, centerX, centerY);
    
    // Gentle additional mouse-based movement
    const mouseDistortion = mouseIntensity * 12; // Subtle distortion
    const distortedX = lensedPosition.x + Math.sin(time * 0.002 + index) * mouseDistortion;
    const distortedY = lensedPosition.y + Math.cos(time * 0.002 + index) * mouseDistortion;
    
    drawParticle(ctx, particle, distortedX, distortedY);
  });
}

function drawEventHorizon(ctx: CanvasRenderingContext2D, centerX: number, centerY: number, mousePos: CursorPosition) {
  const windowCenterX = typeof window !== 'undefined' ? window.innerWidth / 2 : 400;
  const windowCenterY = typeof window !== 'undefined' ? window.innerHeight / 2 : 400;
  
  const mouseDistanceX = mousePos.x - windowCenterX;
  const mouseDistanceY = mousePos.y - windowCenterY;
  const mouseDistance = Math.sqrt(mouseDistanceX * mouseDistanceX + mouseDistanceY * mouseDistanceY);
  const maxDistance = Math.sqrt(windowCenterX * windowCenterX + windowCenterY * windowCenterY);
  const mouseIntensity = Math.min(mouseDistance / maxDistance, 1);
  
  // Subtle event horizon that gently responds to mouse
  const horizonRadius = 80 + mouseIntensity * 15;
  
  const eventGradient = createOptimizedRadialGradient(
    ctx,
    centerX + mouseDistanceX * 0.02,
    centerY + mouseDistanceY * 0.02,
    0,
    horizonRadius,
    [
      { offset: 0, color: `rgba(6, 15, 1, 1)` }, // --night
      { offset: 0.4, color: `rgba(6, 15, 1, 0.95)` }, // --night slightly transparent
      { offset: 0.7, color: `rgba(69, 84, 34, ${0.8 - mouseIntensity * 0.2})` }, // --dark-moss-green
      { offset: 1, color: 'rgba(69, 84, 34, 0)' }, // --dark-moss-green transparent
    ]
  );

  ctx.fillStyle = eventGradient;
  ctx.beginPath();
  ctx.arc(centerX, centerY, horizonRadius, 0, Math.PI * 2);
  ctx.fill();
}

function drawAccretionDisk(ctx: CanvasRenderingContext2D, centerX: number, centerY: number, mousePos: CursorPosition) {
  const windowCenterX = typeof window !== 'undefined' ? window.innerWidth / 2 : 400;
  const windowCenterY = typeof window !== 'undefined' ? window.innerHeight / 2 : 400;
  
  const mouseDistanceX = mousePos.x - windowCenterX;
  const mouseDistanceY = mousePos.y - windowCenterY;
  const mouseDistance = Math.sqrt(mouseDistanceX * mouseDistanceX + mouseDistanceY * mouseDistanceY);
  const maxDistance = Math.sqrt(windowCenterX * windowCenterX + windowCenterY * windowCenterY);
  const mouseIntensity = Math.min(mouseDistance / maxDistance, 1);
  
  // Subtle accretion disk that gently responds to mouse movement
  const diskRadius = 200 + mouseIntensity * 50; // Reduced expansion
  const innerRadius = 80 + mouseIntensity * 15; // Gentle inner radius change
  
  // Website-integrated gradient using established color palette
  const greenIntensity = mouseIntensity * 0.4; // Subtle intensity
  const baseOpacity = 0.15; // Much more subtle base
  
  const glowGradient = createOptimizedRadialGradient(
    ctx,
    centerX + mouseDistanceX * 0.02, // Reduced mouse offset
    centerY + mouseDistanceY * 0.02,
    innerRadius,
    diskRadius,
    [
      { offset: 0, color: `rgba(135, 138, 115, ${baseOpacity + greenIntensity * 0.3})` }, // --reseda-green
      { offset: 0.3, color: `rgba(155, 193, 54, ${baseOpacity + greenIntensity * 0.4})` }, // --yellow-green
      { offset: 0.6, color: `rgba(69, 84, 34, ${baseOpacity + greenIntensity * 0.2})` }, // --dark-moss-green
      { offset: 0.8, color: `rgba(155, 193, 54, ${baseOpacity * 0.5})` }, // --yellow-green fading
      { offset: 1, color: 'rgba(155, 193, 54, 0)' }, // --yellow-green transparent
    ]
  );

  ctx.fillStyle = glowGradient;
  ctx.beginPath();
  ctx.arc(centerX, centerY, diskRadius, 0, Math.PI * 2);
  ctx.fill();
}