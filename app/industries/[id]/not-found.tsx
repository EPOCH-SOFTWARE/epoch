import { SitePage } from '@/src/night/Chrome';
import { IndustryDetail } from '@/src/night/pages/IndustryDetail';
export default function NotFound() {
  return (
    <SitePage page="industry">
      <IndustryDetail id="not-found" />
    </SitePage>
  );
}
