/**
 * @fileoverview Reusable technology icon component
 * @author Epoch Development Team
 */

import React from 'react';
import Image from 'next/image';

interface TechIconProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  style?: React.CSSProperties;
  className?: string;
}

export const TechIcon: React.FC<TechIconProps> = ({
  src,
  alt,
  width = 24,
  height = 24,
  style,
  className
}) => {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      style={style}
      className={className}
      unoptimized
    />
  );
};