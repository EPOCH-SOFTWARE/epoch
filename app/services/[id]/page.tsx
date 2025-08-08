/**
 * @fileoverview Dynamic service detail page
 * @author Epoch Development Team
 */

import { notFound } from 'next/navigation';
import { ServiceDetailPage } from '@/src/components/pages/services/detail';
import { SERVICE_DETAIL_DATA } from '@/src/shared/constants/serviceData';
import type { Metadata } from 'next';

interface ServicePageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const serviceData = SERVICE_DETAIL_DATA[params.id as keyof typeof SERVICE_DETAIL_DATA];
  
  if (!serviceData) {
    return {
      title: 'Service Not Found - EPOCH',
      description: 'The requested service page was not found.',
    };
  }

  return {
    title: serviceData.metaTitle,
    description: serviceData.metaDescription,
    openGraph: {
      title: serviceData.metaTitle,
      description: serviceData.metaDescription,
      type: 'article',
      images: serviceData.heroImage ? [serviceData.heroImage] : [],
    },
  };
}

export async function generateStaticParams() {
  // Generate static params for all available services
  return Object.keys(SERVICE_DETAIL_DATA).map((id) => ({
    id,
  }));
}

export default function ServicePage({ params }: ServicePageProps) {
  const serviceData = SERVICE_DETAIL_DATA[params.id as keyof typeof SERVICE_DETAIL_DATA];
  
  if (!serviceData) {
    notFound();
  }

  return <ServiceDetailPage serviceData={serviceData} />;
}