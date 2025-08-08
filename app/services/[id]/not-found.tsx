/**
 * @fileoverview 404 page for service not found
 * @author Epoch Development Team
 */

import Link from 'next/link';

export default function ServiceNotFound() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      textAlign: 'center',
      background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)',
    }}>
      <h1 style={{
        fontSize: '4rem',
        fontWeight: 700,
        marginBottom: '1rem',
        background: 'linear-gradient(135deg, #9ACD32 0%, #7CB342 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      }}>
        404
      </h1>
      <h2 style={{
        fontSize: '1.5rem',
        marginBottom: '1rem',
        color: '#fff',
      }}>
        Service Not Found
      </h2>
      <p style={{
        fontSize: '1rem',
        marginBottom: '2rem',
        color: 'rgba(255, 255, 255, 0.7)',
        maxWidth: '500px',
      }}>
        The service you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/services"
        style={{
          padding: '12px 24px',
          fontSize: '1rem',
          background: 'linear-gradient(135deg, #9ACD32 0%, #7CB342 100%)',
          color: '#0a0a0a',
          borderRadius: '8px',
          textDecoration: 'none',
          fontWeight: 600,
          transition: 'transform 0.2s ease',
          display: 'inline-block',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-2px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
        }}
      >
        Back to Services
      </Link>
    </div>
  );
}