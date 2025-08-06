/**
 * @fileoverview Contact page component
 * @author Epoch Development Team
 */

import dynamic from 'next/dynamic';
import type { Metadata } from 'next';

// Lazy load the contact page component
const ContactPage = dynamic(() => import('@/src/components/pages/contact'), {
  ssr: true,
  loading: () => (
    <div className="loading-container">
      <div className="loading-spinner" />
    </div>
  ),
});

export const metadata: Metadata = {
  title: 'Contact EPOCH - Start Your Digital Transformation Journey',
  description: 'Connect with EPOCH\'s team of precision engineers and scientists. Let\'s transform your vision into digital reality with Swiss precision and scientific innovation.',
  keywords: ['contact epoch', 'software consultation', 'digital transformation', 'project inquiry', 'technical consultation'],
  openGraph: {
    title: 'Contact EPOCH - Start Your Digital Transformation Journey',
    description: 'Connect with EPOCH\'s team of precision engineers. Let\'s transform your vision into digital reality.',
    type: 'website',
  },
};

export default function Contact() {
  return <ContactPage />;
}