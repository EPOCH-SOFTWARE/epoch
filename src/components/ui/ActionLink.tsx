/**
 * @fileoverview A link styled as an action. Primary is the single most important
 * action on a screen; secondary is everything else.
 */

import Link from 'next/link';
import type { ReactNode } from 'react';
import styles from './ActionLink.module.css';

interface ActionLinkProps {
  readonly href: string;
  readonly children: ReactNode;
  readonly variant?: 'primary' | 'secondary';
  readonly size?: 'regular' | 'compact';
}

export function ActionLink({
  href,
  children,
  variant = 'primary',
  size = 'regular',
}: ActionLinkProps) {
  return (
    <Link href={href} className={`${styles.action} ${styles[variant]} ${styles[size]}`}>
      {children}
    </Link>
  );
}
