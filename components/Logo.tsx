'use client';
import Image from 'next/image';

const SRC = {
  navy: '/images/logo/mh-toha-logo-navy.webp',
  white: '/images/logo/mh-toha-logo-white.webp',
};

// Real MH-TOHA wordmark (938×341 source). `variant` picks the recolored
// asset for the background it sits on — navy letters for light backgrounds,
// white letters for dark backgrounds. The red dash stays red in both.
export default function Logo({
  variant = 'navy',
  height = 22,
  priority = false,
}: {
  variant?: 'navy' | 'white';
  height?: number;
  priority?: boolean;
}) {
  const width = Math.round(height * (938 / 341));
  return (
    <Image
      src={SRC[variant]}
      alt="MH-TOHA"
      width={width}
      height={height}
      priority={priority}
      style={{ height: `${height}px`, width: 'auto', display: 'block' }}
    />
  );
}
