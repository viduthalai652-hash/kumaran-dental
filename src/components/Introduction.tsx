"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView, useSpring } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";
import { siteConfig, stats as siteStats } from "@/data/siteConfig";

// Fallbacks in case stats aren't exactly matched in siteConfig
const defaultStats = [
  { value: "4.9 / 5", label: "Average patient rating" },
  { value: "2,500+", label: "smiles cared for" }
];

export default function Introduction() {
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    damping: 25,
    stiffness: 70,
  });

  // Parallax offsets for the stat blocks
  const y1 = useTransform(smoothProgress, [0, 1], [0, -60]);
  const y2 = useTransform(smoothProgress, [0, 1], [0, -120]);

  const headline = "We made going to the dentist feel a little less like going to the dentist.";
  const words = headline.split(" ");

  const isHeadlineInView = useInView(headlineRef, {
    once: false,
    margin: "-20% 0px",
  });

  const stats = [
    { value: siteStats.rating.value + " / " + siteStats.rating.outOf, label: siteStats.rating.label },
    { value: siteStats.patients.value, label: siteStats.patients.label }
  ];

  return (
    <section 
      id="about" 
      ref={containerRef}
      className="py-24 md:py-40 bg-[#E5F3FD] text-pearl-dark relative overflow-hidden"
    >
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60"
          style={{ backgroundImage: 'url("/intro-bg.jpg")' }}
        />
        <div className="absolute inset-0 bg-[#E5F3FD]/70 backdrop-blur-[2px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-pearl-cream via-transparent to-pearl-cream/50" />
      </div>

      <div className="container mx-auto px-4 md:px-8 max-w-6xl relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Animated Headline — reduced to text-display-sm */}
          <h2 
            ref={headlineRef}
            className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight mb-8 flex flex-wrap"
          >
            {words.map((word, i) => (
              <span key={i} className="inline-block mr-[0.3em] mb-[0.1em] overflow-hidden pt-1 pb-2 -mb-2">
                <motion.span
                  className="inline-block"
                  initial={{ opacity: prefersReducedMotion ? 1 : 0, y: prefersReducedMotion ? 0 : 30 }}
                  animate={
                    isHeadlineInView 
                      ? { opacity: 1, y: 0 } 
                      : { opacity: prefersReducedMotion ? 1 : 0, y: prefersReducedMotion ? 0 : 30 }
                  }
                  transition={{
                    duration: 0.6,
                    delay: prefersReducedMotion ? 0 : i * 0.04,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h2>

          {/* Subheading — reduced size */}
          <motion.p 
            className="text-base md:text-lg text-pearl-muted max-w-2xl"
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Kumaran Dental combines modern dental technology, thoughtful care, and a more relaxed studio experience in the middle of Manhattan.
          </motion.p>
        </div>

        {/* Stats Section — more compact */}
        <div className="mt-12 md:mt-16 max-w-4xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 relative">
            
            {/* Stat 1 */}
            <motion.div 
              className="flex flex-col relative"
              style={{ y: prefersReducedMotion ? 0 : y1 }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-3 mb-3">
                <motion.span 
                  className="w-2 h-2 rounded-full bg-pearl-lime block"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: [0, 1.5, 1] }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                />
                <motion.div 
                  className="h-px bg-pearl-dark/20 flex-grow origin-left"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
                />
              </div>
              <motion.div 
                className="text-4xl md:text-5xl font-bold mb-1 tracking-tighter"
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4, type: "spring" }}
              >
                {stats[0]?.value || defaultStats[0].value}
              </motion.div>
              <p className="text-sm md:text-base text-pearl-muted font-medium">
                {stats[0]?.label || defaultStats[0].label}
              </p>
            </motion.div>

            {/* Stat 2 */}
            <motion.div 
              className="flex flex-col relative"
              style={{ y: prefersReducedMotion ? 0 : y1 }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="flex items-center gap-3 mb-3">
                <motion.span 
                  className="w-2 h-2 rounded-full bg-pearl-lime block"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: [0, 1.5, 1] }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                />
                <motion.div 
                  className="h-px bg-pearl-dark/20 flex-grow origin-left"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                />
              </div>
              <motion.div 
                className="text-4xl md:text-5xl font-bold mb-1 tracking-tighter"
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6, type: "spring" }}
              >
                {stats[1]?.value || defaultStats[1].value}
              </motion.div>
              <p className="text-sm md:text-base text-pearl-muted font-medium">
                {stats[1]?.label || defaultStats[1].label}
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
