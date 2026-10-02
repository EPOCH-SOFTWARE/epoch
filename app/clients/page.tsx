/**
 * @fileoverview Work page route
 * @author Epoch Development Team
 */

import ClientsPage from '@/src/components/pages/clients';
import type { Metadata } from 'next';

const DESCRIPTION =
  'Case studies and clients: AI automation for HUB International, a modern retirement platform for Inspira Financial, and production systems for OneSix AI, Cardinal Health, Shift4 and more.';

export const metadata: Metadata = {
  title: 'Work',
  description: DESCRIPTION,
  openGraph: {
    title: 'Work | EPOCH',
    description: DESCRIPTION,
    type: 'website',
  },
};

export default function ClientsPageRoute() {
  return <ClientsPage />;
}
