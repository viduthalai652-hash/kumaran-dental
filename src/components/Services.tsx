'use client';

import React, { useState, useEffect, MouseEvent } from 'react';
import { motion, AnimatePresence, useReducedMotion, useSpring, useMotionValue } from 'framer-motion';
import { services } from '@/data/siteConfig';
import { cn } from '@/lib/utils';
import { ArrowUpRight } from 'lucide-react';

const titleText = "What can we do for your smile?";
const words = titleText.split(" ");

export default function Services() {
  const shouldReduceMotion = useReducedMotion();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 15, stiffness: 150 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleMouseMove = (e: MouseEvent) => {
    if (isMobile) return;
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  return (
    <section 
      id="services" 
      className="relative w-full bg-[#E5F3FD] py-32 md:py-48 overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <div className="mb-16 md:mb-24">
          <p className="text-sm tracking-widest text-pearl-muted uppercase mb-6 font-semibold">
            SERVICES
          </p>
          <h2 className="text-display-sm md:text-display-md lg:text-display-md text-pearl-charcoal font-medium leading-tight flex flex-wrap gap-x-3 gap-y-2">
            {words.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{
                  delay: shouldReduceMotion ? 0 : i * 0.1,
                  duration: 0.6,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {word}
              </motion.span>
            ))}
          </h2>
        </div>

        <div className="flex flex-col w-full border-t border-pearl-warm relative z-10">
          {services.map((service, index) => {
            const isHovered = hoveredIndex === index;
            
            const serviceImages = [
              'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80', // Cosmetic (smiling person)
              'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&q=80', // Invisalign (smile close up)
              'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&q=80', // Veneers (teeth closeup)
              'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80', // Restorative (dental tools)
              'https://images.unsplash.com/photo-1516245834210-c4c142787335?auto=format&fit=crop&q=80', // Emergency (urgency/clinic)
              'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80'  // Preventive
            ];
            const bgImage = serviceImages[index % serviceImages.length];

            return (
              <div 
                key={service.id || index}
                className={cn(
                  "relative w-full border-b border-pearl-warm group focus-within:outline-none overflow-hidden",
                )}
                onMouseEnter={() => !isMobile && setHoveredIndex(index)}
                onMouseLeave={() => !isMobile && setHoveredIndex(null)}
              >
                {/* Background color & image slider */}
                <motion.div
                  className="absolute inset-0 origin-left pointer-events-none z-0 overflow-hidden"
                  style={{ backgroundColor: service.color || 'var(--color-pearl-lime, #d9f99d)' }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: isHovered ? 1 : 0 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                >
                  <div 
                    className="absolute inset-0 bg-cover bg-center opacity-15 mix-blend-luminosity"
                    style={{ backgroundImage: `url('${bgImage}')` }}
                  />
                  {/* Additional gradient mask to ensure text on the left stays perfectly legible */}
                  <div className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent" />
                </motion.div>

                <button
                  className="w-full text-left py-6 md:py-8 px-2 md:px-6 relative z-10 flex flex-col justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-pearl-charcoal"
                  onFocus={() => setHoveredIndex(index)}
                  onBlur={() => setHoveredIndex(null)}
                  onClick={() => {
                    if (isMobile) {
                      setHoveredIndex(isHovered ? null : index);
                    }
                  }}
                  aria-expanded={isHovered}
                  aria-controls={`service-desc-${index}`}
                >
                  <div className="flex justify-between items-center w-full">
                    <motion.h3 
                      animate={{
                        y: isHovered && !isMobile ? -2 : 0,
                      }}
                      className={cn(
                        "text-3xl md:text-5xl lg:text-6xl font-medium transition-colors duration-300",
                        isHovered ? "text-pearl-charcoal" : "text-pearl-charcoal"
                      )}
                    >
                      {service.name}
                    </motion.h3>
                    <div className="flex items-center gap-6">
                      {/* Thumbnail Image */}
                      <AnimatePresence>
                        {isHovered && !isMobile && (
                          <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            transition={{ duration: 0.3 }}
                            className="hidden lg:block w-32 h-20 rounded-lg overflow-hidden bg-[#E5F3FD]/40 shadow-sm border border-white/20 relative"
                          >
                            <div 
                              className="absolute inset-0 bg-cover bg-center"
                              style={{ backgroundImage: `url('${bgImage}')` }}
                            />
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <motion.div
                        animate={{
                          rotate: isHovered ? 45 : 0,
                          x: isHovered ? 4 : 0,
                          y: isHovered ? -4 : 0,
                        }}
                        transition={{ duration: 0.3 }}
                        className={cn(
                          "w-10 h-10 md:w-12 md:h-12 rounded-full border flex items-center justify-center transition-colors duration-300 shrink-0",
                          isHovered 
                            ? "bg-[#E5F3FD] text-pearl-offwhite border-pearl-charcoal" 
                            : "border-pearl-muted text-pearl-charcoal"
                        )}
                      >
                        <ArrowUpRight className="w-5 h-5 md:w-6 md:h-6" />
                      </motion.div>
                    </div>
                  </div>
                  
                  {/* Description Expansion */}
                  <AnimatePresence>
                    {isHovered && (
                      <motion.div
                        id={`service-desc-${index}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <motion.div 
                          initial={{ y: 10, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: 10, opacity: 0 }}
                          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                          className="mt-4 md:mt-6"
                        >
                          <p className="text-base md:text-xl text-pearl-charcoal/80 max-w-2xl">
                            {service.description}
                          </p>
                          {/* Modest inline detail reveal with a short verified service summary and booking link */}
                          <div className="mt-4">
                            <a href="#contact" className="inline-flex items-center text-sm font-medium hover:text-pearl-lime transition-colors">
                              Book this service <ArrowUpRight className="ml-1 w-4 h-4" />
                            </a>
                          </div>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Floating Visual */}
      {!isMobile && !shouldReduceMotion && (
        <AnimatePresence>
          {hoveredIndex !== null && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.7 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 150, damping: 15 }}
              className="fixed pointer-events-none z-0 w-64 h-64 md:w-80 md:h-80 rounded-full blur-3xl mix-blend-multiply"
              style={{
                left: 0,
                top: 0,
                x: cursorX,
                y: cursorY,
                translateX: '-50%',
                translateY: '-50%',
                background: `radial-gradient(circle, ${services[hoveredIndex]?.color || '#d9f99d'} 0%, transparent 70%)`
              }}
            />
          )}
        </AnimatePresence>
      )}
    </section>
  );
}
