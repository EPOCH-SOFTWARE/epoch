/**
 * @fileoverview Site-wide 404
 */

import { NotFoundSection } from '@/src/components/sections/NotFoundSection';

export default function NotFound() {
  return (
    <NotFoundSection
      title="This page doesn't exist."
      body="The link may be old, or the page may have moved. Start from the work or get in touch."
      href="/clients"
      linkLabel="See the work"
    />
  );
}
