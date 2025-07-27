/**
 * @fileoverview Error boundary component for graceful error handling
 * @author Epoch Development Team
 */

'use client';

import React, { Component, ReactNode } from 'react';
import styles from './ErrorBoundary.module.css';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
}

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: React.ComponentType<{ error?: Error | undefined; resetError: () => void }>;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
    };
  }

  override componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({
      error,
      errorInfo,
    });

    this.props.onError?.(error, errorInfo);

    // Log error to monitoring service in production
    if (process.env.NODE_ENV === 'production') {
      console.error('Error caught by ErrorBoundary:', error, errorInfo);
    }
  }

  resetError = () => {
    this.setState({ hasError: false });
  };

  override render() {
    if (this.state.hasError) {
      const FallbackComponent = this.props.fallback || DefaultErrorFallback;
      return <FallbackComponent error={this.state.error} resetError={this.resetError} />;
    }

    return this.props.children;
  }
}

function DefaultErrorFallback({ error, resetError }: { error?: Error | undefined; resetError: () => void }) {
  return (
    <div className={styles.errorBoundary}>
      <div className={styles.errorBoundaryContent}>
        <h2>Something went wrong</h2>
        <p>We apologize for the inconvenience. An unexpected error has occurred.</p>
        {process.env.NODE_ENV === 'development' && error && (
          <details className={styles.errorBoundaryDetails}>
            <summary>Error details (development only)</summary>
            <pre>{error.toString()}</pre>
          </details>
        )}
        <button
          onClick={resetError}
          className={styles.errorBoundaryResetButton}
          type="button"
        >
          Try again
        </button>
      </div>
    </div>
  );
}