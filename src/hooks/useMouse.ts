/**
 * @fileoverview Optimized mouse tracking hook
 * @author Epoch Development Team
 */

import { useEffect, useState, useCallback } from 'react';
import { throttle } from '../shared/utils/performance';
import { APP_CONFIG } from '../shared/constants/app';
import type { MouseState } from '../shared/types';

export function useMouse() {
  const [mouseState, setMouseState] = useState<MouseState>({
    x: 0,
    y: 0,
    isPressed: false,
  });

  const updateMousePosition = useCallback((e: MouseEvent) => {
    const throttledUpdate = throttle(() => {
      setMouseState(prev => ({
        ...prev,
        x: e.clientX,
        y: e.clientY,
      }));
    }, APP_CONFIG.PERFORMANCE.DEBOUNCE_DELAY);
    
    throttledUpdate();
  }, []);

  const handleMouseDown = useCallback(() => {
    setMouseState(prev => ({ ...prev, isPressed: true }));
  }, []);

  const handleMouseUp = useCallback(() => {
    setMouseState(prev => ({ ...prev, isPressed: false }));
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [updateMousePosition, handleMouseDown, handleMouseUp]);

  return mouseState;
}