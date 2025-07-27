/**
 * @fileoverview Core type definitions for the Epoch application
 * @author Epoch Development Team
 */

export interface ExpertiseItem {
  readonly number: string;
  readonly title: string;
  readonly description: string;
}

export interface CursorPosition {
  x: number;
  y: number;
}

export interface AnimationConfig {
  readonly easing: number;
  readonly duration?: number;
  readonly delay?: number;
}

export interface PortfolioItemMetrics {
  readonly impact: string;
  readonly duration: string;
  readonly technology: ReadonlyArray<string>;
}

export interface PortfolioItem {
  readonly id: string;
  readonly title: string;
  readonly category: string;
  readonly description: string;
  readonly tags: ReadonlyArray<string>;
  readonly image: string;
  readonly gradient: string;
  readonly metrics: PortfolioItemMetrics;
}

export interface CaseStudyTestimonial {
  readonly quote: string;
  readonly author: string;
  readonly position: string;
}

export interface CaseStudy {
  readonly id: string;
  readonly title: string;
  readonly subtitle: string;
  readonly year: string;
  readonly industry: string;
  readonly challenge: string;
  readonly solution: string;
  readonly results: ReadonlyArray<string>;
  readonly technologies: ReadonlyArray<string>;
  readonly testimonial?: CaseStudyTestimonial;
  readonly gradient: string;
}

export interface CanvasParticle {
  angle: number;
  radius: number;
  speed: number;
  size: number;
  color: string;
  depth: number;
}

export interface WormholeConfig {
  particleCount: number;
  targetFPS: number;
  tunnelLayers: number;
  spiralCount: number;
}

export type ScrollDirection = 'up' | 'down';

export interface ScrollState {
  readonly scrollY: number;
  readonly direction: ScrollDirection;
  readonly activeSection: number;
}

export interface MouseState {
  readonly x: number;
  readonly y: number;
  readonly isPressed: boolean;
}

export interface ClientPartner {
  readonly id: string;
  readonly name: string;
  readonly logo: string;
  readonly sector: string;
  readonly partnership: string;
  readonly achievement: string;
  readonly field: string;
  readonly charge: 'positive' | 'negative' | 'neutral';
  readonly mass: number;
  readonly velocity: {
    readonly x: number;
    readonly y: number;
  };
}