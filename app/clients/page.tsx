/**
 * @fileoverview Clients hub page
 * @author Epoch Development Team
 */

import ClientsPageWrapper from '@/src/components/ClientsPageWrapper';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Clients - EPOCH Partnerships & Success Stories',
  description: 'Explore detailed case studies of our collaborations with industry leaders. Discover how EPOCH transforms businesses through innovative technology solutions.',
  openGraph: {
    title: 'Our Clients - EPOCH Partnerships & Success Stories',
    description: 'Explore detailed case studies of our collaborations with industry leaders. Discover how EPOCH transforms businesses through innovative technology solutions.',
    type: 'website',
  },
};

export default function ClientsPage() {
  return <ClientsPageWrapper />;
}