import { About } from '@/src/night/pages/About';
import { SitePage } from '@/src/night/Chrome';
export const metadata = { title: 'About', alternates: { canonical: '/about' } };
export default function Page() {
  return (
    <SitePage page="about">
      <About />
    </SitePage>
  );
}
