'use client';

import React, { useRef, useState, useEffect, KeyboardEvent } from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const TeethPlaceholder = ({ 
  isBefore, 
  className 
}: { 
  isBefore: boolean; 
  className?: string;
}) => {
  return (
    <div className={cn("w-full h-full flex flex-col items-center justify-center p-8", className)}>
      <div className="relative w-full max-w-lg aspect-[2/1] flex flex-col items-center justify-center gap-1 sm:gap-2">
        {/* Top row of teeth */}
        <div className="flex items-end justify-center gap-1 sm:gap-2 h-1/2">
          {[...Array(6)].map((_, i) => {
            const height = i === 2 || i === 3 ? 'h-full' : (i === 1 || i === 4 ? 'h-[90%]' : 'h-[80%]');
            const width = 'w-6 sm:w-10 md:w-12';
            const offset = isBefore ? `${(Math.random() - 0.5) * 6}px` : '0px';
            const rotation = isBefore ? `${(Math.random() - 0.5) * 5}deg` : '0deg';
            const bgClass = isBefore ? 'bg-[#d4ccb8]' : 'bg-[#E5F3FD] shadow-[0_0_15px_rgba(255,255,255,0.8)]';
            const radius = 'rounded-b-xl rounded-t-sm';
            
            return (
              <div
                key={`top-${i}`}
                className={cn(width, height, bgClass, radius, "transition-all duration-300")}
                style={{
                  transform: `translateY(${offset}) rotate(${rotation})`,
                }}
              />
            );
          })}
        </div>
        {/* Bottom row of teeth */}
        <div className="flex items-start justify-center gap-1 sm:gap-2 h-[40%] mt-1">
           {[...Array(6)].map((_, i) => {
            const height = i === 2 || i === 3 ? 'h-full' : (i === 1 || i === 4 ? 'h-[90%]' : 'h-[80%]');
            const width = 'w-5 sm:w-8 md:w-10';
            const offset = isBefore ? `${(Math.random() - 0.5) * 6}px` : '0px';
            const rotation = isBefore ? `${(Math.random() - 0.5) * 5}deg` : '0deg';
            const bgClass = isBefore ? 'bg-[#c4bcab]' : 'bg-[#E5F3FD] shadow-[0_0_15px_rgba(255,255,255,0.8)]';
            const radius = 'rounded-t-lg rounded-b-sm';
            
            return (
              <div
                key={`bottom-${i}`}
                className={cn(width, height, bgClass, radius, "transition-all duration-300")}
                style={{
                  transform: `translateY(${offset}) rotate(${rotation})`,
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default function SmileTransformation() {
  const sliderRef = useRef<HTMLDivElement>(null);
  
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const handleMove = (clientX: number) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = (x / rect.width) * 100;
    setSliderPosition(percent);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const step = 5;
    if (e.key === 'ArrowLeft') {
      setSliderPosition((prev) => Math.max(0, prev - step));
    } else if (e.key === 'ArrowRight') {
      setSliderPosition((prev) => Math.min(100, prev + step));
    }
  };

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchend', handleMouseUp);
    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, []);

  return (
    <section className="relative w-full bg-[#111111] text-pearl-offwhite py-24 md:py-32 overflow-hidden">
      <div className="container mx-auto px-6 max-w-[1400px]">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Left Text Column */}
          <div className="w-full lg:w-[45%] flex flex-col items-start z-10">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[#D3E156] uppercase tracking-[0.2em] text-sm font-semibold mb-6 md:mb-8"
            >
              Transformations
            </motion.span>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-5xl sm:text-6xl lg:text-[72px] leading-[1.05] font-medium tracking-tight mb-8"
            >
              A little change can make a big difference<span className="text-[#D3E156]">.</span>
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg sm:text-xl text-pearl-offwhite/70 max-w-lg leading-relaxed mb-10"
            >
              Thoughtful, modern dental care for a healthier, brighter smile you'll feel more confident in.
            </motion.p>
            
            <motion.a 
              href="#contact"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-full border border-pearl-offwhite text-pearl-offwhite hover:bg-[#E5F3FD] hover:text-[#111111] transition-all duration-300 font-medium text-lg"
            >
              <span>Book Appointment</span>
              <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </motion.a>
          </div>

          {/* Right Slider Column */}
          <div className="w-full lg:w-[55%] relative z-10 mt-8 lg:mt-0">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative w-full aspect-[4/3] md:aspect-[16/11] rounded-3xl overflow-hidden bg-[#EAE1D0] shadow-2xl"
            >
              {/* Interactive Area */}
              <div 
                ref={sliderRef}
                className="absolute inset-0 cursor-col-resize select-none touch-none"
                onMouseDown={(e) => {
                  setIsDragging(true);
                  handleMove(e.clientX);
                }}
                onMouseMove={onMouseMove}
                onTouchStart={(e) => {
                  setIsDragging(true);
                  handleMove(e.touches[0].clientX);
                }}
                onTouchMove={onTouchMove}
              >
                {/* AFTER — Clean white teeth (full background) */}
                <div className="absolute inset-0 bg-[#EAD9C8]">
                  <img
                    src="/teeth-after.png"
                    alt="After whitening"
                    className="absolute inset-0 w-full h-full object-cover object-center"
                    draggable={false}
                  />
                </div>

                {/* BEFORE — Stained teeth (clipped to show only left portion) */}
                <div
                  className="absolute inset-0 bg-[#D3C7AE]"
                  style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
                >
                  <img
                    src="/teeth-before.png"
                    alt="Before whitening"
                    className="absolute inset-0 w-full h-full object-cover object-center"
                    draggable={false}
                  />
                </div>

                {/* Labels */}
                {sliderPosition > 10 && (
                  <div className="absolute top-5 left-5 z-20 px-4 py-1.5 bg-[#E5F3FD]/80 backdrop-blur-sm rounded-full text-sm font-medium text-black/70 shadow-sm select-none pointer-events-none">
                    Before
                  </div>
                )}
                <div className="absolute top-5 right-5 z-20 px-4 py-1.5 bg-[#E5F3FD]/80 backdrop-blur-sm rounded-full text-sm font-medium text-black/70 shadow-sm select-none pointer-events-none">
                  After
                </div>

                {/* Single Divider Line & Handle */}
                <div
                  className="absolute top-0 bottom-0 w-[2px] bg-[#E5F3FD] z-30 shadow-[0_0_8px_rgba(255,255,255,0.5)]"
                  style={{ left: `${sliderPosition}%` }}
                >
                  <div
                    role="slider"
                    tabIndex={0}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={Math.round(sliderPosition)}
                    onKeyDown={onKeyDown}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 bg-[#E5F3FD] rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(0,0,0,0.25)] focus:outline-none focus:ring-2 focus:ring-white/40 cursor-col-resize"
                  >
                    <div className="flex items-center gap-1.5 text-black/50">
                      <svg width="6" height="10" viewBox="0 0 6 10" fill="none">
                        <path d="M5 9L1 5L5 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <svg width="6" height="10" viewBox="0 0 6 10" fill="none">
                        <path d="M1 9L5 5L1 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
