import { ARTICLES } from './content';
export type Article = (typeof ARTICLES)[number];
export function articleSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[’']/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}
export function readingTime(article: Article): number {
  const text = [
    article.dek,
    article.closing,
    ...article.body.map(b => b.p || b.h2 || b.quote || b.ul?.join(' ') || ''),
  ].join(' ');
  return Math.max(1, Math.ceil(text.split(/\s+/).filter(Boolean).length / 220));
}
export function formatArticleDate(date: string): string {
  return new Date(date + 'T12:00:00Z').toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  });
}
export function newestArticles(): Article[] {
  return [...ARTICLES].sort((a, b) => b.date.localeCompare(a.date));
}
