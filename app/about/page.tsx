/**
 * @fileoverview About page route
 * @author Epoch Development Team
 */

import type { Metadata } from 'next';
import AboutPage from '@/src/components/pages/about';

export const metadata: Metadata = {
  title: 'About',
  description:
    'EPOCH is an AI and software engineering company with teams in the US and India. What we believe, how an engagement runs, and what we build with.',
};

export default function About() {
  return <AboutPage />;
}
