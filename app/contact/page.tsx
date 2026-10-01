/**
 * @fileoverview Contact page route
 * @author Epoch Development Team
 */

import type { Metadata } from 'next';
import ContactPage from '@/src/components/pages/contact';

export const metadata: Metadata = {
  title: 'Start a project',
  description:
    "Tell EPOCH what you're building and what's in the way. You'll hear back within 24 hours.",
};

export default function Contact() {
  return <ContactPage />;
}
