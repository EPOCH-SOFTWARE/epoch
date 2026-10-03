import type { Metadata, Viewport } from 'next';
import { Host_Grotesk, IBM_Plex_Mono } from 'next/font/google';
import './globals.css';

const host = Host_Grotesk({ variable: '--font-host', subsets: ['latin'], display: 'swap' });
const mono = IBM_Plex_Mono({
  variable: '--font-plex',
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
});
export const metadata: Metadata = {
  metadataBase: new URL('https://epoch.sh'),
  title: { default: 'EPOCH | AI, engineered all the way to production.', template: '%s | EPOCH' },
  description:
    'EPOCH designs, builds and supports AI systems, from the first model to long after launch.',
  icons: { icon: '/night/favicon.svg' },
  openGraph: { siteName: 'EPOCH', type: 'website', locale: 'en_US' },
  twitter: { card: 'summary_large_image' },
};
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#000000',
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${host.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
