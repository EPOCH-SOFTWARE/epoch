import { DocumentDemo } from '@/src/night/pages/DocumentDemo';
import { SitePage } from '@/src/night/Chrome';
export const metadata = {
  title: 'Document review demo',
  alternates: { canonical: '/document-demo' },
};
export default function Page() {
  return (
    <SitePage page="document-demo">
      <DocumentDemo />
    </SitePage>
  );
}
