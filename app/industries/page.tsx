import { Industries } from '@/src/night/pages/Industries';
import { SitePage } from '@/src/night/Chrome';
export const metadata = { title: 'Industries', alternates: { canonical: '/industries' } };
export default function Page() {
  return (
    <SitePage page="industries">
      <Industries />
    </SitePage>
  );
}
