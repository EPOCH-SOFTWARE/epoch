/**
 * @fileoverview The Epoch Field: a live network that a training pass sweeps through,
 * reaching every node before the next epoch begins.
 */

'use client';

import { useEffect, useRef, useState } from 'react';
import { formatReadout } from './fieldModel';
import { startField } from './fieldLoop';
import styles from './EpochField.module.css';

interface EpochFieldProps {
  readonly className?: string | undefined;
}

export function EpochField({ className }: EpochFieldProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [epoch, setEpoch] = useState(1);
  const readout = formatReadout(epoch);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!wrap || !canvas || !context) return;
    return startField(wrap, canvas, context, setEpoch);
  }, []);

  return (
    <div
      ref={wrapRef}
      className={className ? `${styles.field} ${className}` : styles.field}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className={styles.canvas} />
      <p className={styles.readout}>
        <span className={styles.label}>epoch</span>
        <span className={styles.value}>{readout.epoch}</span>
        <span className={styles.label}>loss</span>
        <span className={styles.value}>{readout.loss}</span>
      </p>
    </div>
  );
}
