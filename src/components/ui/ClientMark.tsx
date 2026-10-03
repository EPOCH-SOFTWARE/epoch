/**
 * @fileoverview A client's logo on a light plate, in the colours it was designed for.
 * Clients without a logo file get a wordmark instead.
 */

import Image from 'next/image';
import type { ClientLogo } from '../../shared/types';
import styles from './ClientMark.module.css';

interface ClientMarkProps {
  readonly client: ClientLogo;
}

export function ClientMark({ client }: ClientMarkProps) {
  return (
    <span className={styles.plate}>
      {client.logo ? (
        <Image src={client.logo} alt={client.name} width={160} height={56} className={styles.logo} />
      ) : (
        <span className={styles.wordmark}>{client.name}</span>
      )}
    </span>
  );
}
