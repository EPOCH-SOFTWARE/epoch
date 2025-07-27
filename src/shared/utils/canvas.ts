/**
 * @fileoverview Canvas utilities for optimized rendering
 * @author Epoch Development Team
 */

import type { CanvasParticle } from '../types';

/**
 * Set up canvas with proper scaling for different devices
 */
export function setupCanvas(canvas: HTMLCanvasElement): CanvasRenderingContext2D | null {
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  try {
    const pixelRatio = window.devicePixelRatio || 1;
    
    // Use the canvas dimensions that were already set by resizeCanvas
    const width = canvas.width;
    const height = canvas.height;
    
    // Apply pixel ratio scaling for crisp rendering
    const scaledWidth = width * pixelRatio;
    const scaledHeight = height * pixelRatio;
    
    canvas.width = scaledWidth;
    canvas.height = scaledHeight;
    
    // Scale the context back down
    ctx.scale(pixelRatio, pixelRatio);
    
    return ctx;
  } catch (error) {
    console.warn('Error setting up canvas:', error);
    return ctx;
  }
}

/**
 * Create optimized particle for wormhole animation
 */
export function createParticle(): CanvasParticle {
  return {
    angle: Math.random() * Math.PI * 2,
    radius: Math.random() * 250,
    speed: 0.5 + Math.random() * 2,
    size: Math.random() * 3 + 1,
    color: `hsl(${140 + Math.random() * 60}, 70%, ${50 + Math.random() * 30}%)`,
    depth: Math.random(),
  };
}

/**
 * Reset particle properties for object pooling
 */
export function resetParticle(particle: CanvasParticle): void {
  particle.angle = Math.random() * Math.PI * 2;
  particle.radius = Math.random() * 250;
  particle.speed = 0.5 + Math.random() * 2;
  particle.size = Math.random() * 3 + 1;
  particle.color = `hsl(${140 + Math.random() * 60}, 70%, ${50 + Math.random() * 30}%)`;
  particle.depth = Math.random();
}

/**
 * Apply gravitational lensing effect to particle position
 */
export function applyGravitationalLensing(
  x: number,
  y: number,
  centerX: number,
  centerY: number
): { x: number; y: number } {
  const distFromCenter = Math.sqrt(
    Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2)
  );
  const lensStrength = Math.max(0, 1 - distFromCenter / 200);
  
  return {
    x: x + (centerX - x) * lensStrength * 0.3,
    y: y + (centerY - y) * lensStrength * 0.3,
  };
}

/**
 * Create radial gradient with optimized settings
 */
export function createOptimizedRadialGradient(
  ctx: CanvasRenderingContext2D,
  centerX: number,
  centerY: number,
  innerRadius: number,
  outerRadius: number,
  colorStops: Array<{ offset: number; color: string }>
): CanvasGradient {
  const gradient = ctx.createRadialGradient(
    centerX, centerY, innerRadius,
    centerX, centerY, outerRadius
  );
  
  colorStops.forEach(({ offset, color }) => {
    gradient.addColorStop(offset, color);
  });
  
  return gradient;
}

/**
 * Draw particle with shadow and opacity optimization
 */
export function drawParticle(
  ctx: CanvasRenderingContext2D,
  particle: CanvasParticle,
  x: number,
  y: number
): void {
  const opacity = (1 - particle.radius / 250) * particle.depth;
  const size = particle.size * (1 - particle.radius / 250);
  
  ctx.globalAlpha = opacity;
  ctx.fillStyle = particle.color;
  ctx.shadowBlur = 10;
  ctx.shadowColor = particle.color;
  
  ctx.beginPath();
  ctx.arc(x, y, size, 0, Math.PI * 2);
  ctx.fill();
  
  ctx.shadowBlur = 0;
  ctx.globalAlpha = 1;
}