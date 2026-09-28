'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { doctors } from '@/data/siteConfig';
import { cn } from '@/lib/utils';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const wordVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.8,
      ease: [0.215, 0.61, 0.355, 1],
    },
  }),
};

export default function Dentists() {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const titleText = "People who happen to be dentists.";
  const titleWords = titleText.split(' ');

  return (
    <section id="dentists" ref={containerRef} className="py-32 md:py-48 bg-[#E5F3FD] overflow-hidden relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mb-24">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-display-md text-pearl-dark flex flex-wrap gap-x-4 gap-y-2"
          >
            {titleWords.map((word, i) => (
              <motion.span custom={i} variants={wordVariants} key={i}>
                {word}
              </motion.span>
            ))}
          </motion.h2>
        </div>

        <div className="flex flex-col md:flex-row gap-12 lg:gap-24">
          {doctors.map((doctor, index) => (
            <DoctorCard key={index} doctor={doctor} index={index} shouldReduceMotion={shouldReduceMotion} />
          ))}
        </div>
      </div>
    </section>
  );
}

function DoctorCard({ doctor, index, shouldReduceMotion }: { doctor: any, index: number, shouldReduceMotion: boolean }) {
  const isBennett = doctor.name.includes("Bennett");
  const photo = isBennett ? "/doctor-bennett.jpg" : "/doctor-parker.jpg";
  const annotation = isBennett ? "smile architect" : "gentle hands";
  const accentColor = isBennett ? "bg-pearl-lavender/30" : "bg-[#E5F3FD]/30";

  return (
    <motion.div 
      className="flex-1 group"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
    >
      {/* Photo Card — compact size */}
      <motion.div 
        className={cn(
          "relative w-full aspect-[4/5] rounded-2xl overflow-hidden mb-6 shadow-lg",
          accentColor
        )}
        whileHover={!shouldReduceMotion ? { scale: 1.02 } : {}}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {/* Real doctor photo */}
        <img
          src={photo}
          alt={doctor.name}
          className="absolute inset-0 w-full h-full object-cover object-top"
        />

        {/* Subtle gradient at bottom */}
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/30 to-transparent" />

        {/* Handwritten annotation on hover */}
        <motion.div 
          className="absolute bottom-5 right-5"
          initial={{ opacity: 0, y: 8 }}
          whileHover={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <span className="font-serif italic text-lg text-white drop-shadow -rotate-2 inline-block">
            {annotation}
          </span>
        </motion.div>
      </motion.div>

      {/* Doctor Info */}
      <div className="space-y-3">
        <motion.h3 
          className="text-2xl md:text-3xl font-medium text-pearl-dark group-hover:translate-x-1 transition-transform duration-300"
        >
          {doctor.name}
        </motion.h3>
        <p className="text-base text-pearl-muted">{doctor.title}</p>
        <p className="text-sm md:text-base text-pearl-dark/70 max-w-md leading-relaxed">
          {doctor.bio}
        </p>
        <div className="flex flex-wrap gap-2 pt-2">
          {doctor.specialties?.map((specialty: string, i: number) => (
            <span key={i} className="px-3 py-1 rounded-full border border-pearl-dark/10 text-xs text-pearl-dark/60">
              {specialty}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
