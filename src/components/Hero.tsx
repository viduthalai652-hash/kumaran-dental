'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ChevronDown } from 'lucide-react';
import useMousePosition from '@/hooks/useMousePosition';
import useReducedMotion from '@/hooks/useReducedMotion';

import TransparentVideo from './TransparentVideo';

export default function Hero() {
  const mousePosition = useMousePosition();
  const normalizedX = mousePosition?.normalizedX || 0;
  const normalizedY = mousePosition?.normalizedY || 0;
  const prefersReducedMotion = useReducedMotion();

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const wordVariants = {
    hidden: { y: 60, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] w-full flex-col justify-center overflow-x-hidden bg-[#E5F3FD] pt-32 pb-24 lg:pt-48 lg:pb-32"
    >
      {/* Tooth Cleaners Visual */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-0 flex items-center justify-end"
        initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.95 }}
        animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      >
        <motion.div
          animate={prefersReducedMotion ? {} : {
            x: normalizedX * 20,
            y: normalizedY * 20,
          }}
          transition={{ type: 'spring', stiffness: 50, damping: 20 }}
          className="relative h-[300px] w-[300px] md:h-[500px] md:w-[500px] lg:h-[700px] lg:w-[700px] flex items-center justify-end translate-x-4"
        >
          <motion.div
            animate={prefersReducedMotion ? {} : { y: [0, -18, 0] }}
            transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
            className="w-full h-full"
          >
            <TransparentVideo 
              src="/perfect-tooth.webm" 
              className="w-full h-full object-contain object-center"
            />
          </motion.div>
        </motion.div>
      </motion.div>

      <div className="container relative z-10 mx-auto px-6 pointer-events-none">
        <div className="max-w-4xl pointer-events-auto">
          <motion.h1
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-6xl md:text-7xl lg:text-8xl font-bold leading-tight tracking-tighter text-pearl-charcoal flex flex-col gap-2 animate-float"
          >
            <div className="overflow-hidden pt-2 -mt-2 pb-6 -mb-6">
              <motion.div variants={wordVariants}>Dentistry</motion.div>
            </div>
            <div className="overflow-hidden pt-2 -mt-2 pb-6 -mb-6">
              <motion.div variants={wordVariants} className="flex flex-wrap items-end gap-x-4 gap-y-2">
                <span>worth</span>
                <span className="relative inline-block italic text-pearl-offwhite" style={{ WebkitTextStroke: '2.5px #1A1A1A' }}>
                  <span className="relative z-10">smiling</span>
                  <motion.span
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.8, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute bottom-2 left-0 -z-10 h-6 w-full origin-left -rotate-2 bg-pearl-lime md:bottom-4 md:h-10"
                  />
                </span>
              </motion.div>
            </div>
            <div className="overflow-hidden pt-2 -mt-2 pb-6 -mb-6">
              <motion.div variants={wordVariants}>about.</motion.div>
            </div>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8, ease: 'easeOut' }}
            className="mt-8 max-w-xl text-lg text-pearl-charcoal/80 md:text-xl"
          >
            Modern dentistry in the heart of Manhattan. Thoughtful care, beautiful results, and appointments that don't feel like a trip to the dentist.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.8, ease: 'easeOut' }}
            className="mt-10 flex flex-col items-start gap-6 sm:flex-row sm:items-center"
          >
            <a
              href="#contact"
              className="group relative overflow-hidden flex items-center justify-center gap-2 rounded-full bg-[#111111] px-8 py-4 text-lg font-medium text-white transition-all duration-300 hover:-translate-y-[2px]"
              data-cursor-hover
            >
              <span className="absolute inset-0 z-0 h-full w-full translate-x-[-100%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-500 ease-out group-hover:translate-x-[100%]" />
              <span className="relative z-10">Book an Appointment</span>
            </a>
            <a
              href="#about"
              className="group flex items-center gap-2 text-lg font-medium text-pearl-charcoal transition-colors hover:text-pearl-lime"
              data-cursor-hover
            >
              Explore
              <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs font-medium uppercase tracking-widest text-pearl-charcoal/50">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
        >
          <ChevronDown className="h-4 w-4 text-pearl-charcoal/50" />
        </motion.div>
      </motion.div>
    </section>
  );
}
