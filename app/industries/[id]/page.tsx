import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SitePage } from '@/src/night/Chrome';
import { IndustryDetail } from '@/src/night/pages/IndustryDetail';
import { INDUSTRIES } from '@/src/night/content';
type Props = { params: Promise<{ id: string }> };
export function generateStaticParams() {
  return INDUSTRIES.map(item => ({ id: item.id }));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const item = INDUSTRIES.find(item => item.id === id);
  return {
    title: item?.name ?? 'Industry not found',
    description: item?.intro,
    alternates: { canonical: '/industries/' + id },
  };
}
export default async function Page({ params }: Props) {
  const { id } = await params;
  if (!INDUSTRIES.some(item => item.id === id)) notFound();
  return (
    <SitePage page="industry">
      <IndustryDetail id={id} />
    </SitePage>
  );
}
