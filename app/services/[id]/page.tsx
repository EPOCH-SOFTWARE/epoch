import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SitePage } from '@/src/night/Chrome';
import { ServiceDetail } from '@/src/night/pages/ServiceDetail';
import { DATA } from '@/src/night/data';
type Props = { params: Promise<{ id: string }> };
export function generateStaticParams() {
  return DATA.services.map(item => ({ id: item.id }));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const item = DATA.services.find(item => item.id === id);
  return {
    title: item?.title ?? 'Service not found',
    description: DATA.serviceDetails[id]?.metaDescription,
    alternates: { canonical: '/services/' + id },
  };
}
export default async function Page({ params }: Props) {
  const { id } = await params;
  if (!DATA.services.some(item => item.id === id)) notFound();
  return (
    <SitePage page="service">
      <ServiceDetail id={id} />
    </SitePage>
  );
}
