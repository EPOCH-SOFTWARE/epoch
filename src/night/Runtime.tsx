'use client';

import Script from 'next/script';
import { useState } from 'react';

// Native document navigation preserves the prototype's cross-document circle transition.
// Script loads once per document, after hydration, even under React Strict Mode.
export function Runtime({ demo = false }: { demo?: boolean }) {
  const [helpersReady, setHelpersReady] = useState(false);
  const [motionReady, setMotionReady] = useState(false);
  return (
    <>
      <Script
        src="/night/kept-time.js"
        strategy="afterInteractive"
        onReady={() => setHelpersReady(true)}
      />
      {helpersReady && (
        <Script
          src="/night/motion.js"
          strategy="afterInteractive"
          onReady={() => setMotionReady(true)}
        />
      )}
      {demo && motionReady && <Script src="/night/document-demo.js" strategy="afterInteractive" />}
    </>
  );
}
