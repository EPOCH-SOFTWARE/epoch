/**
 * @fileoverview Jest setup file
 * @author Epoch Development Team
 */

import '@testing-library/jest-dom';

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  observe() {
    return null;
  }
  disconnect() {
    return null;
  }
  unobserve() {
    return null;
  }
};

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  constructor() {}
  observe() {
    return null;
  }
  disconnect() {
    return null;
  }
  unobserve() {
    return null;
  }
};

// Mock Canvas API
const mockCanvas = {
  getContext: () => ({
    fillRect: () => {},
    clearRect: () => {},
    beginPath: () => {},
    arc: () => {},
    fill: () => {},
    stroke: () => {},
    moveTo: () => {},
    lineTo: () => {},
    setTransform: () => {},
    createRadialGradient: () => ({
      addColorStop: () => {},
    }),
    createLinearGradient: () => ({
      addColorStop: () => {},
    }),
  }),
  width: 500,
  height: 500,
};

if (typeof HTMLCanvasElement !== 'undefined')
  Object.defineProperty(HTMLCanvasElement.prototype, 'getContext', {
    value: () => mockCanvas.getContext(),
  });

// Mock requestAnimationFrame
global.requestAnimationFrame = callback => {
  setTimeout(callback, 0);
};

global.cancelAnimationFrame = id => {
  clearTimeout(id);
};
// jsdom has no matchMedia; default to "no preference" for every query.
if (typeof window !== 'undefined')
  Object.defineProperty(window, 'matchMedia', {
    configurable: true,
    writable: true,
    value: query => ({
      matches: false,
      media: query,
      addEventListener: () => {},
      removeEventListener: () => {},
    }),
  });
