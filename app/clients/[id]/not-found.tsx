/**
 * @fileoverview 404 for case studies that don't exist
 * @author Epoch Development Team
 */

import { NotFoundSection } from '@/src/components/sections/NotFoundSection';

export default function ClientNotFound() {
  return (
    <NotFoundSection
      title="We haven't published that case study."
      body="The work page has every case study we've written up, plus everyone we've worked with."
      href="/clients"
      linkLabel="See all work"
    />
  );
}
