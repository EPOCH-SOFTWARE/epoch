/**
 * @fileoverview Global type declarations
 * @author Epoch Development Team
 */

declare global {
  interface Window {
    gtag?: (
      command: 'config' | 'event' | 'exception',
      targetId: string,
      config?: Record<string, unknown>
    ) => void;
  }
}

export {};