import { Services } from '@/src/night/pages/Services';
import { SitePage } from '@/src/night/Chrome';
export const metadata = { title: 'Services', alternates: { canonical: '/services' } };
export default function Page() {
  return (
    <SitePage page="services">
      <Services />
    </SitePage>
  );
}
