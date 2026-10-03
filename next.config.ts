import type { NextConfig } from 'next';
import bundleAnalyzer from '@next/bundle-analyzer';
import { RETIRED_SERVICE_IDS } from './src/shared/constants/services';

const nextConfig: NextConfig = {
  distDir: process.env.NODE_ENV === 'development' ? '.next-dev' : '.next',
  eslint: { dirs: ['src', 'app'] },
  poweredByHeader: false,
  async redirects() {
    return [
      ...RETIRED_SERVICE_IDS.map(id => ({
        source: `/services/${id}`,
        destination: '/services',
        permanent: true,
      })),
      { source: '/index.html', destination: '/', permanent: true },
      { source: '/favicon.ico', destination: '/night/favicon.svg', permanent: true },
      ...[
        'services',
        'work',
        'industries',
        'how-we-work',
        'insights',
        'about',
        'contact',
        'document-demo',
      ].map(name => ({ source: `/${name}.html`, destination: `/${name}`, permanent: true })),
      ...[
        ['service', 'services'],
        ['case', 'work'],
        ['industry', 'industries'],
        ['article', 'insights'],
      ].map(([old, route]) => ({
        source: `/${old}.html`,
        has: [{ type: 'query' as const, key: 'id', value: '(?<id>[^/]+)' }],
        destination: `/${route}/:id`,
        permanent: true,
      })),
      { source: '/service.html', destination: '/services/ai-ml', permanent: true },
      { source: '/case.html', destination: '/work/hub-international', permanent: true },
      { source: '/industry.html', destination: '/industries/not-found', permanent: true },
      { source: '/article.html', destination: '/insights/not-found', permanent: true },
      ...['marks', 'logos', 'footer-lab', 'identity-lab', 'identity-color-lab'].map(name => ({
        source: `/${name}.html`,
        destination: `/labs/${name}.html`,
        permanent: true,
      })),
    ];
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
        ],
      },
    ];
  },
};
export default bundleAnalyzer({ enabled: process.env.ANALYZE === 'true', openAnalyzer: false })(
  nextConfig
);
