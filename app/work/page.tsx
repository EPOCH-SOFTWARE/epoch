import { Work } from '@/src/night/pages/Work';
import { SitePage } from '@/src/night/Chrome';
export const metadata = { title: 'Work', alternates: { canonical: '/work' } };
export default function Page() {
  return (
    <SitePage page="work">
      <Work />
    </SitePage>
  );
}
