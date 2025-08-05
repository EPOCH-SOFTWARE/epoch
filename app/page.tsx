/**
 * @fileoverview Home page component
 * @author Epoch Development Team
 */

import dynamic from 'next/dynamic';
import type { Metadata } from 'next';

// Lazy load the homepage component
const HomePage = dynamic(() => import('@/src/components/pages/home'), {
  ssr: true,
  loading: () => (
    <div className="loading-container">
      <div className="loading-spinner" />
    </div>
  ),
});

export const metadata: Metadata = {
  title: 'Epoch - Crafting Software with Swiss Precision',
  description: 'We build intelligent systems that transform complexity into elegance, where every line of code serves a purpose.',
};

export default function Home() {
  return <HomePage />;
}