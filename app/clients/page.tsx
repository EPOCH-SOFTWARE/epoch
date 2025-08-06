/**
 * @fileoverview Clients hub page
 * @author Epoch Development Team
 */

import ClientsPage from '@/src/components/pages/clients';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Clients - EPOCH Partnerships & Success Stories',
  description: 'Explore our client collaborations and success stories with industry leaders. Discover how EPOCH transforms businesses through innovative technology solutions.',
  openGraph: {
    title: 'Our Clients - EPOCH Partnerships & Success Stories',
    description: 'Explore our client collaborations and success stories with industry leaders. Discover how EPOCH transforms businesses through innovative technology solutions.',
    type: 'website',
  },
};

export default function ClientsPageRoute() {
  return <ClientsPage />;
}