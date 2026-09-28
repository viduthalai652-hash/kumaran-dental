'use client';

import React, { useRef, useEffect } from 'react';

interface TransparentVideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  src: string;
  className?: string;
}

export default function TransparentVideo({ src, className, ...props }: TransparentVideoProps) {
  return (
    <video
      src={src}
      className={`drop-shadow-[0_20px_40px_rgba(0,0,0,0.12)] ${className || ''}`}
      autoPlay
      loop
      muted
      playsInline
      {...props}
    />
  );
}
