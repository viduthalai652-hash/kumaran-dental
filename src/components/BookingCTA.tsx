'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export default function BookingCTA() {
  const containerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const titleWords = "Your next favorite dentist is accepting new patients.".split(" ");

  return (
    <section 
      ref={containerRef}
      className="relative bg-pearl-lime text-pearl-charcoal py-32 md:py-48 px-6 md:px-12 overflow-hidden flex flex-col items-center justify-center text-center"
    >
      {/* Background Animated Elements */}
      {!prefersReducedMotion && (
        <motion.div style={{ y: backgroundY }} className="absolute inset-0 pointer-events-none select-none z-0">
          <div className="absolute top-10 left-10 text-[20vw] font-black opacity-[0.03] whitespace-nowrap">
            SMILE SMILE
          </div>
          <div className="absolute bottom-10 right-10 text-[20vw] font-black opacity-[0.03] whitespace-nowrap">
            SMILE SMILE
          </div>
          
          {/* Abstract floating shapes */}
          <motion.svg 
            animate={{ 
              y: [0, -30, 0],
              rotate: [0, 5, 0]
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[20%] left-[15%] w-32 md:w-64 opacity-5" 
            viewBox="0 0 100 100"
          >
            <path d="M10,50 Q50,90 90,50" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
          </motion.svg>
          
          <motion.svg 
            animate={{ 
              y: [0, 40, 0],
              rotate: [0, -10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-[20%] right-[10%] w-48 md:w-96 opacity-5" 
            viewBox="0 0 100 100"
          >
            <rect x="20" y="20" width="60" height="60" rx="20" fill="currentColor" />
            <circle cx="35" cy="20" r="15" fill="currentColor" />
            <circle cx="65" cy="20" r="15" fill="currentColor" />
          </motion.svg>
        </motion.div>
      )}

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center">
        <h2 className="text-display-md md:text-display-lg font-medium leading-tight mb-12 flex flex-wrap justify-center gap-x-4 gap-y-2">
          {titleWords.map((word, i) => (
            <motion.span
              key={i}
              initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="inline-block"
            >
              {word}
            </motion.span>
          ))}
        </h2>

        <motion.div
          initial={prefersReducedMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center gap-8"
        >
          <a 
            href="#contact"
            className="group relative overflow-hidden inline-flex items-center justify-center bg-[#E5F3FD] text-pearl-offwhite text-lg font-medium px-10 py-5 rounded-full transition-all duration-300 hover:-translate-y-[2px]"
          >
            <span className="absolute inset-0 z-0 h-full w-full translate-x-[-100%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-500 ease-out group-hover:translate-x-[100%]" />
            <span className="relative z-10">Book an Appointment</span>
          </a>
          
          <a 
            href="tel:+12125550184"
            className="group relative inline-block text-lg font-medium text-pearl-charcoal"
          >
            Call +1 212 555 0184
            <span className="absolute left-0 bottom-0 w-full h-[2px] bg-[#E5F3FD] origin-right transform scale-x-100 transition-transform duration-300 ease-out group-hover:scale-x-0"></span>
            <span className="absolute left-0 bottom-0 w-full h-[2px] bg-[#E5F3FD] origin-left transform scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100"></span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
