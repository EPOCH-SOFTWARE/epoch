/**
 * @fileoverview Root layout: fonts, site chrome, and default metadata
 * @author Epoch Development Team
 */

import type { Metadata, Viewport } from 'next';
import { Archivo, IBM_Plex_Mono } from 'next/font/google';
import { ErrorBoundary } from '@/src/components/common/ErrorBoundary';
import { Header } from '@/src/components/layout/Header';
import { Footer } from '@/src/components/layout/Footer';
import './globals.css';

const archivo = Archivo({
  variable: '--font-archivo',
  subsets: ['latin'],
  axes: ['wdth'],
  display: 'swap',
});

const plexMono = IBM_Plex_Mono({
  variable: '--font-plex-mono',
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
});

const TITLE = 'EPOCH | AI systems, built all the way through';
const DESCRIPTION =
  'EPOCH builds AI systems that work in production: machine learning, generative AI and the data and engineering underneath them. All in, every project, every time.';

export const metadata: Metadata = {
  metadataBase: new URL('https://epoch.sh'),
  title: {
    default: TITLE,
    template: '%s | EPOCH',
  },
  description: DESCRIPTION,
  keywords: ['AI development', 'machine learning', 'generative AI', 'AI agents', 'data engineering'],
  creator: 'Epoch Software Services',
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    siteName: 'EPOCH',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#060f01',
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  return (
    // Browser extensions inject attributes on <html>; don't treat those as hydration errors.
    <html lang="en" className={`${archivo.variable} ${plexMono.variable}`} suppressHydrationWarning>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Header />
        <main id="main">
          <ErrorBoundary>{children}</ErrorBoundary>
        </main>
        <Footer />
      </body>
    </html>
  );
}
