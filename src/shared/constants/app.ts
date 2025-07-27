/**
 * @fileoverview Application-wide constants and configuration
 * @author Epoch Development Team
 */

export const APP_CONFIG = {
  SCROLL_THRESHOLD: 100,
  ANIMATION: {
    EASING: 0.1,
    DURATION: 300,
    DELAY: 100,
  },
  PERFORMANCE: {
    DEBOUNCE_DELAY: 16, // ~60fps
    ANIMATION_FRAME_TARGET: 60,
    MOBILE_ANIMATION_FRAME_TARGET: 30,
  },
  BREAKPOINTS: {
    MOBILE: 768,
    TABLET: 1024,
    DESKTOP: 1200,
  },
} as const;

export const WORMHOLE_CONFIG = {
  DESKTOP: {
    PARTICLE_COUNT: 100,
    TARGET_FPS: 60,
    TUNNEL_LAYERS: 15,
    SPIRAL_COUNT: 5,
  },
  MOBILE: {
    PARTICLE_COUNT: 50,
    TARGET_FPS: 30,
    TUNNEL_LAYERS: 10,
    SPIRAL_COUNT: 3,
  },
};

export const CANVAS_CONFIG = {
  MAX_SIZE: 450,
  MIN_SIZE: 300,
  SIZE_FACTOR: 0.35,
} as const;