import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SitePage } from '@/src/night/Chrome';
import { CaseDetail } from '@/src/night/pages/CaseDetail';
import { DATA } from '@/src/night/data';
type Props = { params: Promise<{ id: string }> };
export function generateStaticParams() {
  return DATA.caseStudies.map(item => ({ id: item.id }));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const item = DATA.caseStudies.find(item => item.id === id);
  return {
    title: item?.name ?? 'Case study not found',
    description: item?.summary,
    alternates: { canonical: '/work/' + id },
  };
}
export default async function Page({ params }: Props) {
  const { id } = await params;
  if (!DATA.caseStudies.some(item => item.id === id)) notFound();
  return (
    <SitePage page="case">
      <CaseDetail id={id} />
    </SitePage>
  );
}
