/**
 * @fileoverview Performance optimization utilities
 * @author Epoch Development Team
 */

/**
 * Debounce function to limit the rate of function execution
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

/**
 * Throttle function to limit function execution to once per interval
 */
export function throttle<T extends (...args: unknown[]) => unknown>(
  func: T,
  interval: number
): (...args: Parameters<T>) => void {
  let lastCall = 0;
  
  return (...args: Parameters<T>) => {
    const now = Date.now();
    if (now - lastCall >= interval) {
      lastCall = now;
      func(...args);
    }
  };
}

/**
 * Check if the device is mobile based on screen width
 */
export function isMobileDevice(): boolean {
  return typeof window !== 'undefined' && window.innerWidth <= 768;
}

/**
 * Get optimal configuration based on device capabilities
 */
export function getDeviceOptimizedConfig<T>(
  desktopConfig: T,
  mobileConfig: T
): T {
  return isMobileDevice() ? mobileConfig : desktopConfig;
}

/**
 * Frame rate limiter for animations
 */
export class FrameRateLimiter {
  private lastFrameTime = 0;
  private readonly targetFPS: number;
  private readonly frameInterval: number;

  constructor(targetFPS: number) {
    this.targetFPS = targetFPS;
    this.frameInterval = 1000 / targetFPS;
  }

  shouldRender(currentTime: number): boolean {
    if (currentTime - this.lastFrameTime >= this.frameInterval) {
      this.lastFrameTime = currentTime;
      return true;
    }
    return false;
  }
}

/**
 * Memory-efficient object pool for canvas particles
 */
export class ObjectPool<T> {
  private pool: T[] = [];
  private createFn: () => T;
  private resetFn: (obj: T) => void;

  constructor(createFn: () => T, resetFn: (obj: T) => void, initialSize = 0) {
    this.createFn = createFn;
    this.resetFn = resetFn;
    
    for (let i = 0; i < initialSize; i++) {
      this.pool.push(createFn());
    }
  }

  acquire(): T {
    if (this.pool.length > 0) {
      return this.pool.pop()!;
    }
    return this.createFn();
  }

  release(obj: T): void {
    this.resetFn(obj);
    this.pool.push(obj);
  }

  clear(): void {
    this.pool.length = 0;
  }
}