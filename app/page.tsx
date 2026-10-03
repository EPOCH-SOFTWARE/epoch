import { Home } from '@/src/night/pages/Home';
import { SitePage } from '@/src/night/Chrome';
export const metadata = {
  title: { absolute: 'EPOCH | AI, engineered all the way to production.' },
};
export default function Page() {
  return (
    <SitePage page="home">
      <Home />
    </SitePage>
  );
}
