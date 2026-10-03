import { HowWeWork } from '@/src/night/pages/HowWeWork';
import { SitePage } from '@/src/night/Chrome';
export const metadata = { title: 'How we work', alternates: { canonical: '/how-we-work' } };
export default function Page() {
  return (
    <SitePage page="how-we-work">
      <HowWeWork />
    </SitePage>
  );
}
