/**
 * @fileoverview Optimized scroll tracking hook
 * @author Epoch Development Team
 */

import { useEffect, useState, useCallback } from 'react';
import { throttle } from '../shared/utils/performance';
import { APP_CONFIG } from '../shared/constants/app';
import type { ScrollState, ScrollDirection } from '../shared/types';

export function useScroll() {
  const [scrollState, setScrollState] = useState<ScrollState>({
    scrollY: 0,
    direction: 'down',
    activeSection: 0,
  });

  const updateScrollState = useCallback(() => {
    const throttledUpdate = throttle(() => {
      const currentScrollY = window.scrollY;
      setScrollState(prev => {
        const direction: ScrollDirection = currentScrollY > prev.scrollY ? 'down' : 'up';
        return {
          scrollY: currentScrollY,
          direction,
          activeSection: prev.activeSection, // Will be updated by section tracking
        };
      });
    }, APP_CONFIG.PERFORMANCE.DEBOUNCE_DELAY);
    
    throttledUpdate();
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', updateScrollState, { passive: true });
    return () => window.removeEventListener('scroll', updateScrollState);
  }, [updateScrollState]);

  const updateActiveSection = useCallback((section: number) => {
    setScrollState(prev => ({ ...prev, activeSection: section }));
  }, []);

  return {
    ...scrollState,
    isScrolled: scrollState.scrollY > APP_CONFIG.SCROLL_THRESHOLD,
    updateActiveSection,
  };
}