/**
 * @fileoverview Enhanced cursor interaction hook
 * @author Epoch Development Team
 */

import { useEffect, useRef, useState, useCallback } from 'react';
import type { CursorPosition, AnimationConfig } from '../shared/types';
import { APP_CONFIG } from '../shared/constants/app';

interface UseCursorProps {
  config?: AnimationConfig;
}

export function useCursor({ config = { easing: APP_CONFIG.ANIMATION.EASING } }: UseCursorProps = {}) {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const [magneticTarget, setMagneticTarget] = useState<HTMLElement | null>(null);
  const animationFrameRef = useRef<number>(0);

  const updateCursorPosition = useCallback((position: CursorPosition) => {
    if (cursorRef.current) {
      cursorRef.current.style.transform = `translate3d(${position.x}px, ${position.y}px, 0)`;
    }
  }, []);

  const handleMagneticEffect = useCallback((e: MouseEvent, target: HTMLElement | null) => {
    if (!target) return;
    
    try {
      const rect = target.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

      if (distance < 100) {
        const pullStrength = (100 - distance) / 100;
        const transform = `translate3d(${distanceX * pullStrength * 0.2}px, ${distanceY * pullStrength * 0.2}px, 0)`;
        target.style.transform = transform;
      }
    } catch (error) {
      console.warn('Error in magnetic effect:', error);
    }
  }, []);

  const resetMagneticTarget = useCallback(() => {
    if (magneticTarget) {
      try {
        magneticTarget.style.transform = '';
      } catch (error) {
        console.warn('Error resetting magnetic target:', error);
      }
      setMagneticTarget(null);
    }
  }, [magneticTarget]);

  useEffect(() => {
    const mousePosition: CursorPosition = { x: 0, y: 0 };
    const cursorPosition: CursorPosition = { x: 0, y: 0 };

    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.x = e.clientX;
      mousePosition.y = e.clientY;

      try {
        const target = e.target as HTMLElement;
        const magneticElement = target?.closest('[data-magnetic]') as HTMLElement | null;

        if (magneticElement && magneticElement !== magneticTarget) {
          setMagneticTarget(magneticElement);
          handleMagneticEffect(e, magneticElement);
        } else if (!magneticElement && magneticTarget) {
          resetMagneticTarget();
        } else if (magneticElement === magneticTarget) {
          handleMagneticEffect(e, magneticElement);
        }
      } catch (error) {
        console.warn('Error in mouse move handler:', error);
      }
    };

    const animateCursor = () => {
      const dx = mousePosition.x - cursorPosition.x;
      const dy = mousePosition.y - cursorPosition.y;

      cursorPosition.x += dx * config.easing;
      cursorPosition.y += dy * config.easing;

      updateCursorPosition(cursorPosition);
      animationFrameRef.current = requestAnimationFrame(animateCursor);
    };

    const handleMouseLeave = () => {
      resetMagneticTarget();
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    animationFrameRef.current = requestAnimationFrame(animateCursor);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [config.easing, magneticTarget, handleMagneticEffect, resetMagneticTarget, updateCursorPosition]);

  return {
    cursorRef,
    cursorDotRef,
    cursorRingRef,
  };
}