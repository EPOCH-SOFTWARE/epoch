/**
 * @fileoverview Dynamic client detail page
 * @author Epoch Development Team
 */

import { notFound } from 'next/navigation';
import { ClientDetailPage } from '@/src/components/pages/clients/detail';
import { CLIENT_DETAIL_DATA } from '@/src/shared/constants/clientData';
import type { Metadata } from 'next';

interface ClientPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: ClientPageProps): Promise<Metadata> {
  const clientData = CLIENT_DETAIL_DATA[params.id as keyof typeof CLIENT_DETAIL_DATA];
  
  if (!clientData) {
    return {
      title: 'Client Not Found - EPOCH',
      description: 'The requested client page was not found.',
    };
  }

  return {
    title: clientData.metaTitle,
    description: clientData.metaDescription,
    openGraph: {
      title: clientData.metaTitle,
      description: clientData.metaDescription,
      type: 'article',
      images: clientData.heroImage ? [clientData.heroImage] : [],
    },
  };
}

export async function generateStaticParams() {
  // Generate static params for all available clients
  return Object.keys(CLIENT_DETAIL_DATA).map((id) => ({
    id,
  }));
}

export default function ClientPage({ params }: ClientPageProps) {
  const clientData = CLIENT_DETAIL_DATA[params.id as keyof typeof CLIENT_DETAIL_DATA];
  
  if (!clientData) {
    notFound();
  }

  return <ClientDetailPage clientData={clientData} />;
}