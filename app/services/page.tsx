/**
 * @fileoverview Services index route
 * @author Epoch Development Team
 */

import type { Metadata } from 'next';
import ServicesPage from '@/src/components/pages/services';

const DESCRIPTION =
  'AI first: machine learning, generative AI and data systems, backed by the software, cloud, DevOps and security engineering that keeps them running in production.';

export const metadata: Metadata = {
  title: 'Services',
  description: DESCRIPTION,
  openGraph: {
    title: 'Services',
    description: DESCRIPTION,
    type: 'website',
  },
};

export default function Services() {
  return <ServicesPage />;
}
