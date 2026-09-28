'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { faqs } from '@/data/siteConfig';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const fadeUp = (delay = 0) =>
    prefersReducedMotion
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: '-80px' },
          transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] },
        };

  return (
    <section id="faq" className="bg-[#E5F3FD] py-24 md:py-36">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* Two-column layout — Insurance left, FAQ right */}
        <div className="flex flex-col md:flex-row gap-0 items-stretch">

          {/* LEFT — Insurance / boring stuff */}
          <div className="w-full md:w-[38%] md:pr-16 flex flex-col justify-start">
            <motion.h2
              {...fadeUp(0)}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-pearl-charcoal leading-tight mb-8"
            >
              Let's talk about the boring stuff.
            </motion.h2>

            <motion.div {...fadeUp(0.1)} className="space-y-5 mb-10">
              <p className="text-base md:text-lg text-pearl-muted leading-relaxed">
                We work with many PPO dental insurance plans and can help you understand your benefits before treatment.
              </p>
              <p className="text-base md:text-lg text-pearl-charcoal font-medium leading-relaxed">
                No insurance? No problem. Ask us about self-pay options and flexible payment plans.
              </p>
            </motion.div>

            <motion.div {...fadeUp(0.2)}>
              <a
                href="#contact"
                className="group relative inline-block text-base font-medium text-pearl-charcoal"
              >
                Ask About Insurance
                <span className="absolute left-0 bottom-0 w-full h-[2px] bg-[#E5F3FD] origin-right transform scale-x-100 transition-transform duration-300 ease-out group-hover:scale-x-0" />
                <span className="absolute left-0 bottom-0 w-full h-[2px] bg-[#E5F3FD] origin-left transform scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100" />
              </a>
            </motion.div>
          </div>

          {/* Vertical Divider */}
          <div className="hidden md:block w-px bg-[#E5F3FD]/10 self-stretch flex-shrink-0" />

          {/* RIGHT — FAQ Accordion */}
          <div className="w-full md:w-[62%] md:pl-16 mt-16 md:mt-0">
            <motion.div {...fadeUp(0)} className="mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-pearl-charcoal">FAQ</h2>
              <p className="text-base text-pearl-muted mt-1">Things people ask us</p>
            </motion.div>

            <div className="space-y-0">
              {faqs.map((faq, index) => {
                const isOpen = openIndex === index;
                const number = String(index + 1).padStart(2, '0');

                return (
                  <motion.div
                    key={index}
                    {...fadeUp(index * 0.05)}
                    className="border-b border-pearl-warm last:border-b-0"
                  >
                    <button
                      onClick={() => toggleAccordion(index)}
                      className="w-full text-left py-5 md:py-6 group flex items-start justify-between gap-6 focus:outline-none focus-visible:ring-2 focus-visible:ring-pearl-lime"
                      aria-expanded={isOpen}
                      aria-controls={`faq-answer-${index}`}
                    >
                      <div className="flex items-start gap-4 flex-1">
                        <span className="text-xs tracking-widest text-pearl-muted mt-1.5 flex-shrink-0">
                          {number}
                        </span>
                        <h3 className="text-base md:text-lg lg:text-xl font-medium text-pearl-charcoal group-hover:text-pearl-lime transition-colors duration-300">
                          {faq.question}
                        </h3>
                      </div>
                      <div className="mt-0.5 w-5 h-5 flex-shrink-0 flex items-center justify-center text-pearl-charcoal">
                        <span
                          className={`block text-xl leading-none transition-transform duration-400 ease-in-out ${isOpen ? 'rotate-45' : 'rotate-0'}`}
                          aria-hidden="true"
                        >
                          +
                        </span>
                      </div>
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          id={`faq-answer-${index}`}
                          role="region"
                          initial={prefersReducedMotion ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="pb-6 pl-8">
                            <p className="text-sm md:text-base text-pearl-muted leading-relaxed">
                              {faq.answer}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
