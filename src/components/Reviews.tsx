'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { testimonials, stats } from '@/data/siteConfig';
import { cn } from '@/lib/utils';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export default function Reviews() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  const statsRef = useRef(null);
  const isInView = useInView(statsRef, { once: true, margin: '-100px' });

  // Auto-rotate testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Counting animation for 4.9
  const [rating, setRating] = useState(0);
  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = parseFloat(stats.rating.value) || 4.9;
      const duration = 1500;
      const increment = end / (duration / 16);
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setRating(end);
          clearInterval(timer);
        } else {
          setRating(start);
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [isInView]);

  const slideVariants = {
    enter: { x: shouldReduceMotion ? 0 : 40, opacity: 0 },
    center: { x: 0, opacity: 1 },
    exit: { x: shouldReduceMotion ? 0 : -40, opacity: 0 },
  };

  return (
    <section className="bg-[#0E0E0E] text-pearl-offwhite relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-28">

        {/* Two-column layout with vertical divider */}
        <div className="flex flex-col md:flex-row gap-0 items-stretch">

          {/* LEFT — Testimonial (wider) */}
          <div className="w-full md:w-[58%] md:pr-16 flex flex-col justify-between min-h-[260px]">

            {/* Lime quotation marks */}
            <div className="text-5xl text-pearl-lime font-serif leading-none mb-6 select-none">"</div>

            {/* Quote */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="flex-1"
              >
                <p className="text-2xl md:text-3xl lg:text-4xl font-bold leading-snug text-pearl-offwhite mb-6">
                  {testimonials[currentIndex].quote}
                </p>
                <p className="text-sm text-pearl-muted/70 tracking-wide">
                  {testimonials[currentIndex].author}
                  {testimonials[currentIndex].location ? `, ${testimonials[currentIndex].location}` : ''}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Navigation dots */}
            <div className="flex items-center gap-2 mt-10">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  aria-label={`Testimonial ${idx + 1}`}
                  className="focus:outline-none"
                >
                  <div
                    className={cn(
                      'h-2 rounded-full transition-all duration-400',
                      currentIndex === idx
                        ? 'w-8 bg-pearl-lime'
                        : 'w-2 bg-[#E5F3FD]/20 hover:bg-[#E5F3FD]/40'
                    )}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Vertical Divider */}
          <div className="hidden md:block w-px bg-[#E5F3FD]/10 self-stretch flex-shrink-0" />

          {/* RIGHT — Rating (narrower, right-aligned content) */}
          <div
            ref={statsRef}
            className="w-full md:w-[42%] md:pl-16 flex flex-col justify-center items-start mt-12 md:mt-0"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-full"
            >
              {/* Big 4.9 */}
              <div className="text-[7rem] md:text-[9rem] font-bold leading-none tracking-tighter text-pearl-offwhite mb-3">
                {rating.toFixed(1)}
              </div>

              {/* Stars */}
              <div className="flex gap-1.5 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star} className="text-2xl text-pearl-lime">★</span>
                ))}
              </div>

              {/* Subtitle */}
              <p className="text-sm md:text-base text-pearl-muted/60 max-w-[260px] leading-relaxed">
                Loved by New Yorkers who used to hate going to the dentist.
              </p>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
