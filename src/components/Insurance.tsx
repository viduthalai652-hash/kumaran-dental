'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export default function Insurance() {
  const prefersReducedMotion = useReducedMotion();

  const animationProps = prefersReducedMotion
    ? { opacity: 1, y: 0 }
    : { opacity: 0, y: 30 };

  return (
    <section className="bg-[#E5F3FD] py-24 md:py-32 px-6 md:px-12">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={animationProps}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-display-sm md:text-display-md text-pearl-charcoal mb-8"
        >
          Let's talk about the boring stuff.
        </motion.h2>

        <motion.div
          initial={animationProps}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-6"
        >
          <p className="text-lg md:text-xl text-pearl-muted max-w-2xl">
            We work with many PPO dental insurance plans and can help you understand your benefits before treatment.
          </p>
          <p className="text-lg md:text-xl text-pearl-charcoal max-w-2xl font-medium">
            No insurance? No problem. Ask us about self-pay options and flexible payment plans.
          </p>
        </motion.div>

        <motion.div
          initial={animationProps}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12"
        >
          <a
            href="#contact"
            className="group relative inline-block text-lg font-medium text-pearl-charcoal"
          >
            Ask About Insurance
            <span className="absolute left-0 bottom-0 w-full h-[2px] bg-[#E5F3FD] origin-right transform scale-x-100 transition-transform duration-300 ease-out group-hover:scale-x-0"></span>
            <span className="absolute left-0 bottom-0 w-full h-[2px] bg-[#E5F3FD] origin-left transform scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100"></span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
