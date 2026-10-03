'use client';
import { useEffect, useState } from 'react';
import { stepAt } from '@/public/night/kept-time';

export function ReadingGuide({ names }: { names: string[] }) {
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    let frame = 0;
    function update() {
      frame = 0;
      setCurrent(
        stepAt(
          names.map(
            (_, i) => document.getElementById('read-' + i)?.getBoundingClientRect().top ?? Infinity
          ),
          160
        )
      );
    }
    function queue() {
      if (!frame) frame = requestAnimationFrame(update);
    }
    window.addEventListener('scroll', queue, { passive: true });
    window.addEventListener('resize', queue);
    update();
    return () => {
      window.removeEventListener('scroll', queue);
      window.removeEventListener('resize', queue);
      cancelAnimationFrame(frame);
    };
  }, [names]);
  return (
    <nav className="reading-guide wrap" aria-label="On this page">
      {names.map((name, i) => (
        <a key={name} href={'#read-' + i} aria-current={i === current ? 'location' : undefined}>
          {name}
        </a>
      ))}
    </nav>
  );
}
