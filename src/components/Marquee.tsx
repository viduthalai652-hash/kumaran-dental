'use client';

import { useReducedMotion } from '@/hooks/useReducedMotion';

const MARQUEE_TEXT = 'COSMETIC DENTISTRY ✦ INVISALIGN ✦ WHITENING ✦ VENEERS ✦ IMPLANTS ✦ CLEANINGS ✦ ';

export default function Marquee() {
  const prefersReducedMotion = useReducedMotion();

  // Split content to handle sparkles separately
  const renderContent = (indexPrefix: string) => {
    return MARQUEE_TEXT.split('✦').map((text, j, arr) => (
      <span key={`${indexPrefix}-${j}`} className="flex items-center">
        {text}
        {j < arr.length - 1 && (
          <span 
            className="text-pearl-lime mx-4 inline-block"
            style={{
              animation: prefersReducedMotion ? 'none' : `pulse-scale 3s ease-in-out infinite`,
              animationDelay: `${j * 0.4}s`
            }}
          >
            ✦
          </span>
        )}
      </span>
    ));
  };

  if (prefersReducedMotion) {
    return (
      <section className="py-4 md:py-6 bg-[#111111] text-pearl-offwhite overflow-hidden">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tight flex flex-wrap justify-center items-center">
            {renderContent('reduced')}
          </h2>
        </div>
      </section>
    );
  }

  // Create enough duplicate content to ensure it fills more than 200% width
  const repeatCount = 6;
  
  return (
    <section className="py-4 md:py-6 bg-[#111111] text-pearl-offwhite overflow-hidden group">
      <div className="relative flex overflow-hidden">
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes marquee-linear {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          @keyframes pulse-scale {
            0%, 100% { transform: scale(1) rotate(0deg); opacity: 0.8; }
            50% { transform: scale(1.3) rotate(15deg); opacity: 1; }
          }
          .animate-marquee-linear {
            animation: marquee-linear 80s linear infinite;
          }
          .group:hover .animate-marquee-linear,
          .group:focus-within .animate-marquee-linear {
            animation-play-state: paused;
          }
        `}} />
        <div 
          className="flex whitespace-nowrap will-change-transform animate-marquee-linear"
          style={{ width: 'fit-content' }}
          tabIndex={0}
          aria-label="Services Ticker"
        >
          {Array.from({ length: repeatCount }).map((_, i) => (
            <div key={i} className="flex whitespace-nowrap px-4" aria-hidden={i > 0}>
              <span className="text-6xl md:text-8xl lg:text-9xl font-bold uppercase tracking-tight flex items-center">
                {renderContent(`marquee-${i}`)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
