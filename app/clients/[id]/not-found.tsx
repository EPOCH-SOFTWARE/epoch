/**
 * @fileoverview Client not found page
 * @author Epoch Development Team
 */

import Link from 'next/link';

export default function ClientNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center max-w-md mx-auto px-4">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Client Not Found
        </h2>
        <p className="text-gray-600 mb-8">
          The client page you&apos;re looking for doesn&apos;t exist or may have been moved.
        </p>
        <div className="space-y-4">
          <Link
            href="/clients"
            className="inline-block bg-green-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-700 transition-colors"
          >
            View All Clients
          </Link>
          <div>
            <Link
              href="/"
              className="text-green-600 hover:text-green-700 font-medium"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}