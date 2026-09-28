'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { siteConfig } from '@/data/siteConfig';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export default function Location() {
  const prefersReducedMotion = useReducedMotion();

  const animationProps = prefersReducedMotion 
    ? { opacity: 1, y: 0 } 
    : { opacity: 0, y: 30 };

  return (
    <section className="bg-[#E5F3FD] py-24 md:py-32 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 items-center">
          
          <motion.div
            initial={animationProps}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="order-2 md:order-1 flex flex-col items-start"
          >
            <h3 className="text-xl font-bold tracking-widest text-pearl-charcoal mb-8">
              KUMARAN DENTAL
            </h3>
            
            <div className="space-y-1 mb-8 text-pearl-charcoal text-lg">
              <p>142 West 21st Street</p>
              <p>New York, NY 10011</p>
              <p className="text-base text-pearl-muted mt-2">Between Sixth & Seventh Avenue</p>
            </div>

            <div className="space-y-2 mb-12 text-pearl-charcoal text-lg">
              <p><span className="font-bold">Monday–Friday</span> 8 AM–7 PM</p>
              <p><span className="font-bold">Saturday</span> 9 AM–3 PM</p>
            </div>

            <a
              href={siteConfig.contact.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center text-lg font-medium text-pearl-charcoal"
            >
              Get Directions 
              <span className="ml-1 inline-block transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1">↗</span>
              <span className="absolute left-0 bottom-0 w-full h-[2px] bg-[#E5F3FD] origin-right transform scale-x-100 transition-transform duration-300 ease-out group-hover:scale-x-0"></span>
              <span className="absolute left-0 bottom-0 w-full h-[2px] bg-[#E5F3FD] origin-left transform scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100"></span>
            </a>
          </motion.div>

          <motion.div
            initial={prefersReducedMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="order-1 md:order-2 w-full aspect-square md:aspect-[4/3] rounded-2xl bg-pearl-warm relative overflow-hidden flex items-center justify-center p-8"
          >
            {/* Abstract Map Decorative Visual */}
            <div className="absolute inset-0 opacity-20 flex flex-col justify-between py-12">
              <div className="w-full h-px bg-[#E5F3FD]"></div>
              <div className="w-full h-px bg-[#E5F3FD]"></div>
              <div className="w-full h-px bg-[#E5F3FD]"></div>
            </div>
            <div className="absolute inset-0 opacity-20 flex justify-between px-16">
              <div className="h-full w-px bg-[#E5F3FD]"></div>
              <div className="h-full w-px bg-[#E5F3FD]"></div>
            </div>

            {/* Labels */}
            <div className="absolute top-10 left-4 text-xs font-medium text-pearl-charcoal/40 -rotate-90 origin-left">
              7th Ave
            </div>
            <div className="absolute top-10 right-12 text-xs font-medium text-pearl-charcoal/40 -rotate-90 origin-left">
              6th Ave
            </div>
            <div className="absolute bottom-20 left-20 text-xs font-medium text-pearl-charcoal/40">
              21st St
            </div>

            {/* Pin */}
            <motion.div 
              animate={prefersReducedMotion ? {} : { 
                scale: [1, 1.1, 1],
                opacity: [1, 0.8, 1]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="relative z-10 w-6 h-6 rounded-full bg-pearl-lime shadow-[0_0_20px_rgba(204,255,0,0.5)] flex items-center justify-center"
            >
              <div className="w-2 h-2 rounded-full bg-[#E5F3FD]"></div>
            </motion.div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
