import { SitePage } from '@/src/night/Chrome';
import { ServiceDetail } from '@/src/night/pages/ServiceDetail';
export default function NotFound() {
  return (
    <SitePage page="service">
      <ServiceDetail id="not-found" />
    </SitePage>
  );
}
