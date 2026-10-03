import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SitePage } from '@/src/night/Chrome';
import { ArticleDetail } from '@/src/night/pages/ArticleDetail';
import { ARTICLES } from '@/src/night/content';
type Props = { params: Promise<{ id: string }> };
export function generateStaticParams() {
  return ARTICLES.map(item => ({ id: item.slug }));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const item = ARTICLES.find(item => item.slug === id);
  return {
    title: item?.title ?? 'Article not found',
    description: item?.dek,
    alternates: { canonical: '/insights/' + id },
  };
}
export default async function Page({ params }: Props) {
  const { id } = await params;
  if (!ARTICLES.some(item => item.slug === id)) notFound();
  return (
    <SitePage page="article">
      <ArticleDetail id={id} />
    </SitePage>
  );
}
