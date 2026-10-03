import { Contact } from '@/src/night/pages/Contact';
import { SitePage } from '@/src/night/Chrome';
export const metadata = { title: 'Start a project', alternates: { canonical: '/contact' } };
export default function Page() {
  return (
    <SitePage page="contact">
      <Contact />
    </SitePage>
  );
}
