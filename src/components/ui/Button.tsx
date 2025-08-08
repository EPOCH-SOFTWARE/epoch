/**
 * @fileoverview Reusable Button component with multiple variants
 * @author Epoch Development Team
 */

'use client';

import React from 'react';
import Link from 'next/link';
import styles from './Button.module.css';

export type ButtonVariant = 'primary' | 'secondary' | 'outline';
export type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  className?: string | undefined;
  type?: 'button' | 'submit' | 'reset';
  target?: string;
  ariaLabel?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  href,
  onClick,
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'right',
  className,
  type = 'button',
  target,
  ariaLabel,
}) => {
  const buttonClasses = [
    styles.button,
    styles[variant],
    styles[size],
    loading && styles.loading,
    disabled && styles.disabled,
    className
  ].filter(Boolean).join(' ');

  const buttonContent = (
    <>
      {iconPosition === 'left' && icon && (
        <span className={styles.iconLeft}>{icon}</span>
      )}
      <span className={styles.buttonText}>{children}</span>
      {iconPosition === 'right' && icon && (
        <span className={styles.iconRight}>{icon}</span>
      )}
      {loading && (
        <span className={styles.loader}>
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
          </svg>
        </span>
      )}
      <div className={styles.buttonGlow}></div>
    </>
  );

  if (href) {
    if (href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')) {
      return (
        <a
          href={href}
          className={buttonClasses}
          target={target}
          rel={target === '_blank' ? 'noopener noreferrer' : undefined}
          aria-label={ariaLabel}
        >
          {buttonContent}
        </a>
      );
    }

    return (
      <Link href={href} className={buttonClasses} aria-label={ariaLabel}>
        {buttonContent}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled || loading}
      aria-label={ariaLabel}
    >
      {buttonContent}
    </button>
  );
};