import { SitePage } from '@/src/night/Chrome';
import { Missing } from '@/src/night/Blocks';
export default function NotFound() {
  return (
    <SitePage page="not-found">
      <main id="main">
        <Missing title="We couldn’t find that page." href="/" label="Back to home" />
      </main>
    </SitePage>
  );
}
