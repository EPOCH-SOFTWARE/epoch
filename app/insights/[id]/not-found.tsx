import { SitePage } from '@/src/night/Chrome';
import { ArticleDetail } from '@/src/night/pages/ArticleDetail';
export default function NotFound() {
  return (
    <SitePage page="article">
      <ArticleDetail id="not-found" />
    </SitePage>
  );
}
