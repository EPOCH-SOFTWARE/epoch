/**
 * @fileoverview Root layout component
 * @author Epoch Development Team
 */

import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { ErrorBoundary } from '@/src/components/common/ErrorBoundary';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  weight: ['300', '400', '500', '600', '700'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  weight: ['400', '500', '600'],
});

export const metadata: Metadata = {
  title: 'Epoch - Crafting Software with Swiss Precision',
  description: 'We build intelligent systems that transform complexity into elegance, where every line of code serves a purpose.',
  keywords: ['software development', 'AI', 'machine learning', 'cloud architecture', 'digital transformation'],
  authors: [{ name: 'Epoch Development Team' }],
  creator: 'Epoch',
  openGraph: {
    title: 'Epoch - Crafting Software with Swiss Precision',
    description: 'We build intelligent systems that transform complexity into elegance, where every line of code serves a purpose.',
    url: 'https://epoch.dev',
    siteName: 'Epoch',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Epoch - Crafting Software with Swiss Precision',
    description: 'We build intelligent systems that transform complexity into elegance.',
    creator: '@epoch_dev',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
      </head>
      <body
        className={`${geistSans.className} antialiased`}
        suppressHydrationWarning
      >
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
      </body>
    </html>
  );
}
