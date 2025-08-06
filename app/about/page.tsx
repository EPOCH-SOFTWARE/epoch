/**
 * @fileoverview About page component
 * @author Epoch Development Team
 */

import dynamic from 'next/dynamic';
import type { Metadata } from 'next';

// Lazy load the about page component
const AboutPage = dynamic(() => import('@/src/components/pages/about'), {
  ssr: true,
  loading: () => (
    <div className="loading-container">
      <div className="loading-spinner" />
    </div>
  ),
});

export const metadata: Metadata = {
  title: 'About EPOCH - Swiss Precision in Software Development',
  description: 'Discover the story behind EPOCH, our team of precision engineers, and our mission to transform complexity into digital elegance through scientific innovation.',
  keywords: ['about epoch', 'software development team', 'precision engineering', 'digital innovation', 'company story'],
  openGraph: {
    title: 'About EPOCH - Swiss Precision in Software Development',
    description: 'Discover the story behind EPOCH, our team of precision engineers, and our mission to transform complexity into digital elegance.',
    type: 'website',
  },
};

export default function About() {
  return <AboutPage />;
}