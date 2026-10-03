import { SitePage } from '@/src/night/Chrome';
import { CaseDetail } from '@/src/night/pages/CaseDetail';
export default function NotFound() {
  return (
    <SitePage page="case">
      <CaseDetail id="not-found" />
    </SitePage>
  );
}
