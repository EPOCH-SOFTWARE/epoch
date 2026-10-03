import { Insights } from '@/src/night/pages/Insights';
import { SitePage } from '@/src/night/Chrome';
export const metadata = { title: 'Insights', alternates: { canonical: '/insights' } };
export default function Page() {
  return (
    <SitePage page="insights">
      <Insights />
    </SitePage>
  );
}
