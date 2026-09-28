'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export default function Experience() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative w-full overflow-hidden bg-[#E8F5EE] text-[#1A1A1A]">
      {/* Header */}
      <div className="pt-24 pb-8 md:pt-32 md:pb-12 px-6 md:px-12 max-w-7xl mx-auto relative z-20">
        <motion.div 
          className="text-display-md md:text-display-lg font-medium tracking-tight"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="block overflow-hidden">
            <motion.span 
              className="block"
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              The dentist,
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span 
              className="block"
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              redesigned.
            </motion.span>
          </span>
        </motion.div>
      </div>

      {/* Main Comfort Area */}
      <div className="relative w-full flex flex-col justify-center px-6 md:px-12 pb-24 pt-4 md:py-16">
        
        {/* Layered Depth Effect Background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 flex items-center justify-center opacity-30">
          <motion.div
            animate={prefersReducedMotion ? {} : {
              scale: [1, 1.05, 1],
              rotate: [0, 1, 0],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            className="w-full h-full max-w-[150vw] max-h-[150vh] rounded-full bg-gradient-to-tr from-white/40 via-transparent to-pearl-mint/20 blur-3xl"
          />
        </div>

        <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between h-full relative z-10 gap-12 md:gap-0">
          
          {/* Large Background Word with Subtle Moving Light */}
          <div className="relative w-full md:w-1/2 flex items-center justify-center md:justify-start">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative text-[22vw] md:text-[12vw] font-bold tracking-tighter leading-none"
            >
              <span className="relative inline-block overflow-hidden group">
                COMFORT
                {/* Subtle moving light effect across the text */}
                <motion.span
                  className="absolute inset-0 z-10 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12 mix-blend-overlay"
                  animate={prefersReducedMotion ? {} : {
                    x: ["-150%", "150%"],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                    repeatDelay: 2
                  }}
                />
              </span>
            </motion.div>
          </div>

          {/* Masked Image in Empty Visual Area */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] md:w-2/3 h-full min-h-[300px] md:min-h-[400px] opacity-40 pointer-events-none z-0">
             <div 
               className="w-full h-full rounded-3xl overflow-hidden shadow-2xl mix-blend-luminosity bg-cover bg-center"
               style={{
                 backgroundImage: 'url("/intro-bg.jpg")',
                 WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 70%)',
                 maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 70%)'
               }}
             />
          </div>

          {/* Detail Content */}
          <div className="z-20 w-full max-w-md md:w-1/2 md:pl-12 flex flex-col justify-center text-center md:text-left mt-8 md:mt-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-4"
            >
              <h3 className="text-display-sm md:text-display-md font-medium tracking-tight">
                No judgment
              </h3>
              <p className="text-lg md:text-xl opacity-90 leading-relaxed font-medium">
                We're here to help you move forward, not lecture you about the past.
              </p>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
