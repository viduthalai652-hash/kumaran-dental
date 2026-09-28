'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { siteConfig } from '@/data/siteConfig';

const features = [
  { label: 'Digital smile scan', position: 'top-left' },
  { label: 'Personalized treatment plan', position: 'top-right' },
  { label: 'Clear aligners', position: 'bottom-left' },
  { label: 'Progress check-ins', position: 'bottom-right' },
];

export default function Invisalign() {
  const containerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const alignerY = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const alignerRotate = useTransform(scrollYProgress, [0, 1], [-10, 10]);

  const line1 = 'Straight teeth.'.split(' ');
  const line2 = 'Without making it obvious.'.split(' ');

  const wordVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
  };

  const featureVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-[#E5F3FD] py-32 md:py-48 overflow-hidden text-pearl-charcoal"
    >
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-8">
          
          {/* Text Content */}
          <div className="w-full lg:w-1/2 flex flex-col z-10">
            <motion.h2 
              className="text-display-lg font-medium leading-[1.1] tracking-tight mb-12"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              variants={{
                visible: { transition: { staggerChildren: 0.08 } }
              }}
            >
              <span className="block overflow-hidden">
                {line1.map((word, i) => (
                  <motion.span key={i} className="inline-block mr-3" variants={wordVariants}>
                    {word}
                  </motion.span>
                ))}
              </span>
              <span className="block overflow-hidden text-pearl-dark/70">
                {line2.map((word, i) => (
                  <motion.span key={i} className="inline-block mr-3" variants={wordVariants}>
                    {word}
                  </motion.span>
                ))}
              </span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <a 
                href="#contact" 
                className="group inline-flex items-center gap-3 text-lg font-medium relative w-max"
              >
                <span>Explore Invisalign</span>
                <span className="group-hover:translate-x-1 transition-transform duration-300">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#E5F3FD] transition-all duration-300 group-hover:w-full"></span>
              </a>
            </motion.div>
          </div>

          {/* Visual Content */}
          <div className="w-full lg:w-1/2 relative h-[400px] sm:h-[500px] lg:h-[600px] flex items-center justify-center mt-12 lg:mt-0">
            
            {/* Floating Aligner */}
            <motion.div 
              style={{
                y: prefersReducedMotion ? 0 : alignerY,
                rotate: prefersReducedMotion ? 0 : alignerRotate
              }}
              className="relative z-10 w-80 h-80 sm:w-[450px] sm:h-[450px] lg:w-[550px] lg:h-[550px] flex items-center justify-center"
            >
              <motion.img 
                src="/aligner-model.png" 
                alt="Clear Aligner"
                className="w-full h-full object-contain drop-shadow-2xl"
                animate={
                  prefersReducedMotion ? {} : {
                    y: [0, -15, 0],
                    rotate: [0, 2, -1, 0]
                  }
                }
                transition={{
                  repeat: Infinity,
                  duration: 6,
                  ease: "easeInOut"
                }}
              />
            </motion.div>

            {/* Desktop Floating Features */}
            <motion.div 
              className="hidden lg:block absolute inset-0 pointer-events-none"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              variants={{
                visible: { transition: { staggerChildren: 0.15, delayChildren: 0.3 } }
              }}
            >
              {features.map((feature, idx) => {
                let positionClasses = '';
                let dotClasses = '';
                
                switch(feature.position) {
                  case 'top-left':
                    positionClasses = 'top-[5%] left-[0%]';
                    dotClasses = 'right-[-20px] top-1/2 -translate-y-1/2';
                    break;
                  case 'top-right':
                    positionClasses = 'top-[10%] right-[0%]';
                    dotClasses = 'left-[-20px] top-1/2 -translate-y-1/2';
                    break;
                  case 'bottom-left':
                    positionClasses = 'bottom-[20%] left-[-5%]';
                    dotClasses = 'right-[-20px] top-1/2 -translate-y-1/2';
                    break;
                  case 'bottom-right':
                    positionClasses = 'bottom-[15%] right-[-10%]';
                    dotClasses = 'left-[-20px] top-1/2 -translate-y-1/2';
                    break;
                }

                return (
                  <motion.div 
                    key={idx} 
                    className={cn("absolute bg-[#E5F3FD]/50 backdrop-blur-md px-4 py-2 rounded-full text-sm font-medium border border-white/30 shadow-sm whitespace-nowrap", positionClasses)}
                    variants={featureVariants}
                  >
                    {feature.label}
                    <span className={cn("absolute w-2 h-2 rounded-full bg-[#E5F3FD]", dotClasses)}></span>
                  </motion.div>
                );
              })}
            </motion.div>
            
          </div>

          {/* Mobile Features List */}
          <div className="w-full lg:hidden flex flex-col gap-4 mt-8 relative z-20">
            {features.map((feature, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="flex items-center gap-4 bg-[#E5F3FD]/40 backdrop-blur-md p-4 rounded-2xl border border-white/20 shadow-sm"
              >
                <div className="w-2 h-2 rounded-full bg-[#E5F3FD] shrink-0"></div>
                <span className="font-medium text-lg">{feature.label}</span>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
