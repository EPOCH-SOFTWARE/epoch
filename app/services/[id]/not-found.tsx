/**
 * @fileoverview 404 for service pages that don't exist
 * @author Epoch Development Team
 */

import { NotFoundSection } from '@/src/components/sections/NotFoundSection';

export default function ServiceNotFound() {
  return (
    <NotFoundSection
      title="We don't offer that service."
      body="It may have been renamed or retired. The services list shows everything we build today."
      href="/services"
      linkLabel="See all services"
    />
  );
}
