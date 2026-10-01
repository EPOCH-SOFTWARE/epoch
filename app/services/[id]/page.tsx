/**
 * @fileoverview Service detail route
 * @author Epoch Development Team
 */

import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { ServiceDetailPage } from '@/src/components/pages/services/detail';
import { SERVICE_DETAIL_DATA } from '@/src/shared/constants/serviceData';
import { SERVICES, findService } from '@/src/shared/constants/services';

interface ServicePageProps {
  params: Promise<{ id: string }>;
}

/** The root layout's title template appends the brand, so drop the one baked into the data. */
const BRAND_SUFFIX = /\s*-\s*EPOCH$/;

function findDetail(id: string) {
  return Object.hasOwn(SERVICE_DETAIL_DATA, id)
    ? SERVICE_DETAIL_DATA[id as keyof typeof SERVICE_DETAIL_DATA]
    : undefined;
}

export async function generateStaticParams() {
  return SERVICES.map(service => ({ id: service.id }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { id } = await params;
  const service = findDetail(id);

  if (!service || !findService(id)) {
    return { title: 'Service not found' };
  }

  const title = service.metaTitle.replace(BRAND_SUFFIX, '');
  return {
    title,
    description: service.metaDescription,
    openGraph: { title, description: service.metaDescription, type: 'article' },
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { id } = await params;
  const service = findDetail(id);
  const summary = findService(id);

  if (!service || !summary) {
    notFound();
  }

  return <ServiceDetailPage service={service} summary={summary} />;
}
