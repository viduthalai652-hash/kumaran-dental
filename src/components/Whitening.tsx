'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { siteConfig } from '@/data/siteConfig';

export default function Whitening() {
  const containerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Parallax effects for the large circle
  const circleScale = useTransform(scrollYProgress, [0, 1], [0.85, 1.15]);
  const circleY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);

  const headline = 'Brighten things up.'.split(' ');

  const wordVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-dental-blue-pale py-32 md:py-48 overflow-hidden text-pearl-charcoal flex items-center min-h-[80vh]"
    >
      {/* Background Animated Graphic - Half Sun at Bottom Right */}
      <motion.div 
        className="absolute bottom-0 right-0 translate-x-[30%] translate-y-[40%] w-[600px] h-[600px] md:w-[800px] md:h-[800px] rounded-full pointer-events-none mix-blend-multiply flex items-center justify-center"
        style={{
          scale: prefersReducedMotion ? 1 : circleScale,
        }}
      >
        {/* Core glowing center */}
        <motion.div 
          className="absolute inset-0 rounded-full" 
          animate={prefersReducedMotion ? {} : { opacity: [0.7, 1, 0.7], scale: [0.95, 1.05, 0.95] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          style={{ background: 'radial-gradient(circle at center, #C8FF00, transparent 70%)' }}
        />
        
        {/* Concentric rings */}
        <div className="absolute inset-[10%] rounded-full border border-pearl-lime/50"></div>
        <div className="absolute inset-[20%] rounded-full border border-pearl-lime/30"></div>
        <div className="absolute inset-[35%] rounded-full border border-pearl-lime/10"></div>
        
        {/* Rotating rays with shimmering effect */}
        <div className="absolute inset-[-20%] animate-spin-slow" style={{ animationDuration: '40s' }}>
          {Array.from({ length: 24 }).map((_, i) => (
            <motion.div 
              key={i} 
              className="absolute top-0 bottom-0 left-1/2 w-[2px] -translate-x-1/2"
              style={{ 
                transform: `rotate(${i * 15}deg)`,
                background: 'linear-gradient(to bottom, rgba(200, 255, 0, 0) 0%, rgba(200, 255, 0, 0.4) 15%, rgba(200, 255, 0, 0) 30%, rgba(200, 255, 0, 0) 70%, rgba(200, 255, 0, 0.4) 85%, rgba(200, 255, 0, 0) 100%)'
              }}
              animate={prefersReducedMotion ? {} : { opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 3 + (i % 3), repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}
            />
          ))}
        </div>
      </motion.div>

      <div className="container mx-auto px-6 max-w-[1400px] relative z-10">
        <div className="w-full flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="w-full md:w-2/3 lg:w-1/2 flex flex-col">
            
            <motion.h2 
              className="text-[4rem] sm:text-[5rem] lg:text-[7rem] font-medium leading-[0.95] tracking-tight mb-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              variants={{
                visible: { transition: { staggerChildren: 0.1 } }
              }}
            >
              <span className="block overflow-hidden pb-4">
                {headline.map((word, i) => (
                  <motion.span key={i} className="inline-block mr-4" variants={wordVariants}>
                    {word}
                  </motion.span>
                ))}
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className="text-xl md:text-2xl max-w-xl text-pearl-charcoal/80 mb-12 leading-relaxed"
            >
              Professional whitening designed to brighten your smile safely and efficiently during a single studio visit.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="w-max"
            >
              <a 
                href="#contact" 
                className="group inline-flex items-center gap-4 bg-[#E5F3FD] text-pearl-offwhite px-8 py-4 rounded-full font-medium transition-all duration-300 hover:bg-pearl-dark hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
              >
                <span>Learn About Whitening</span>
                <span className="group-hover:translate-x-1 transition-transform duration-300">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="w-full md:w-auto flex justify-start md:justify-end"
          >
            <a 
              href="#contact" 
              className="group inline-flex items-center gap-3 bg-[#E5F3FD] text-pearl-offwhite px-8 py-4 rounded-full font-medium transition-all duration-300 hover:bg-pearl-dark hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <span>Book Appointment</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
