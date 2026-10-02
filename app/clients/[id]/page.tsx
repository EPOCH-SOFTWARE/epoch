/**
 * @fileoverview Case study route
 * @author Epoch Development Team
 */

import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { ClientDetailPage } from '@/src/components/pages/clients/detail';
import { CASE_STUDIES, findCaseStudy } from '@/src/shared/constants/clientData';

interface ClientPageProps {
  params: Promise<{ id: string }>;
}

/** The root layout's title template already appends the brand. */
function pageTitle(metaTitle: string): string {
  return metaTitle.split(' | ')[0] ?? metaTitle;
}

export async function generateMetadata({ params }: ClientPageProps): Promise<Metadata> {
  const { id } = await params;
  const study = findCaseStudy(id);

  if (!study) {
    return { title: 'Case study not found' };
  }

  const title = pageTitle(study.metaTitle);
  return {
    title,
    description: study.metaDescription,
    openGraph: {
      title: `${title} | EPOCH`,
      description: study.metaDescription,
      type: 'article',
    },
  };
}

export function generateStaticParams() {
  return CASE_STUDIES.map(study => ({ id: study.id }));
}

export default async function ClientPage({ params }: ClientPageProps) {
  const { id } = await params;
  const study = findCaseStudy(id);

  if (!study) {
    notFound();
  }

  return <ClientDetailPage study={study} />;
}
