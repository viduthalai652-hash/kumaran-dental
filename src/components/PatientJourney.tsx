'use client';

import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import { journeySteps } from '@/data/siteConfig';
import { cn } from '@/lib/utils';
import { useReducedMotion } from '@/hooks/useReducedMotion';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function PatientJourney() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!sectionRef.current || !scrollContainerRef.current || isMobile || shouldReduceMotion) return;

    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray('.journey-step');
      
      let scrollTween = gsap.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1,
          snap: 1 / (sections.length - 1),
          end: () => "+=" + scrollContainerRef.current!.offsetWidth
        }
      });

      // Animate inner elements of each section
      sections.forEach((section: any, i) => {
        const title = section.querySelector('.journey-title');
        const desc = section.querySelector('.journey-desc');
        
        gsap.fromTo(title, 
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            scrollTrigger: {
              trigger: section,
              containerAnimation: scrollTween,
              start: "left center",
              toggleActions: "play none none reverse"
            }
          }
        );

        gsap.fromTo(desc, 
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.8,
            delay: 0.2,
            scrollTrigger: {
              trigger: section,
              containerAnimation: scrollTween,
              start: "left center",
              toggleActions: "play none none reverse"
            }
          }
        );
      });
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, [isMobile, shouldReduceMotion]);

  if (isMobile) {
    return (
      <section className="py-24 bg-[#E5F3FD] overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="relative w-full h-[200px] mb-8">
            <img 
              src="/dentist-rope-transparent.png" 
              alt="Dentist pulling rope" 
              className="w-full h-full object-contain object-right-bottom"
            />
          </div>
          <h2 className="text-display-md text-pearl-dark mb-16 relative z-10">What your visit looks like</h2>
          <div className="space-y-8">
            {journeySteps.map((step, index) => {
              const stepImages = [
                'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80',
                'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80',
                'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80',
                'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80',
                'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80'
              ];
              const bgImage = stepImages[index % stepImages.length];
              
              return (
                <motion.div 
                  key={step.number}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6 }}
                  className="relative rounded-3xl p-8 overflow-hidden"
                  style={{ backgroundColor: step.color || '#F7F6F2' }}
                >
                  {/* Background Image Layer */}
                  <div 
                    className="absolute inset-0 z-0 opacity-20 mix-blend-luminosity bg-cover bg-center pointer-events-none"
                    style={{ backgroundImage: `url('${bgImage}')` }}
                  />

                  <div className="absolute -right-8 -top-12 text-[150px] font-bold text-black/5 leading-none z-0">
                    0{index + 1}
                  </div>
                  <div className="relative z-10">
                    <h3 className="text-3xl font-medium text-pearl-dark mb-4">{step.title}</h3>
                    <p className="text-lg text-pearl-dark/80">{step.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section 
      ref={sectionRef} 
      className="bg-[#E5F3FD] overflow-hidden h-screen"
      aria-label="Patient Journey Steps"
    >
      <div 
        ref={scrollContainerRef}
        className="flex h-full"
        style={{ width: `${(journeySteps.length + 1) * 100}vw` }}
      >
        <div className="journey-step w-screen h-full flex items-center shrink-0 bg-[#E5F3FD] relative overflow-hidden">
          <div className="w-full container mx-auto px-8 md:px-16 lg:px-24 relative z-10 h-full">
             <div className="flex flex-col lg:flex-row items-center justify-between h-full w-full">
               <div className="flex flex-col justify-center z-20 lg:w-1/2 mt-32 lg:mt-0">
                 <h2 className="journey-title text-display-md text-pearl-dark max-w-3xl relative z-20">What your visit looks like</h2>
                 <p className="journey-desc text-xl text-pearl-muted mt-6 max-w-xl relative z-20">Swipe or scroll to explore our process.</p>
               </div>
               
               <div className="absolute right-0 bottom-0 lg:top-1/2 lg:-translate-y-1/2 w-full lg:w-1/2 h-[30vh] lg:h-[40vh] z-10 pointer-events-none flex items-end lg:items-center justify-end lg:translate-x-12">
                  <img 
                    src="/dentist-rope-transparent.png" 
                    alt="Dentist pulling rope" 
                    className="w-full h-full object-contain object-right-bottom lg:object-right" 
                  />
               </div>
             </div>
          </div>
        </div>

        {journeySteps.map((step, index) => {
          const stepImages = [
            'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80',
            'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80',
            'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80',
            'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80',
            'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80'
          ];
          const bgImage = stepImages[index % stepImages.length];

          return (
            <div 
              key={step.number} 
              className="journey-step w-screen h-full flex items-center shrink-0 relative overflow-hidden"
              style={{ backgroundColor: step.color || '#F7F6F2' }}
            >
              {/* Background Image Layer */}
              <div 
                className="absolute inset-0 z-0 opacity-15 mix-blend-luminosity bg-cover bg-center pointer-events-none"
                style={{ backgroundImage: `url('${bgImage}')` }}
              />

              {/* Background Number */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[30vw] font-bold text-black/5 leading-none pointer-events-none select-none z-0">
                0{index + 1}
              </div>

              <div className="container mx-auto px-8 md:px-16 lg:px-24 relative z-10 max-w-6xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div>
                    <h3 className="journey-title text-display-md text-pearl-dark mb-8 leading-tight">
                      {step.title}
                    </h3>
                    <p className="journey-desc text-xl text-pearl-dark/80 leading-relaxed max-w-xl">
                      {step.description}
                    </p>
                  </div>
                  <div className="hidden lg:block relative h-[60vh] rounded-[2rem] overflow-hidden bg-[#E5F3FD]/5 backdrop-blur-sm border border-black/10">
                    {/* Decorative element placeholder - updated to show the image clearly */}
                    <div 
                      className="absolute inset-0 bg-cover bg-center opacity-80"
                      style={{ backgroundImage: `url('${bgImage}')` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent mix-blend-overlay"></div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
