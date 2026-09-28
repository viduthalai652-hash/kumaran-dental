'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { siteConfig } from '@/data/siteConfig';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import ContactForm from './ContactForm';

export default function Footer() {
  const prefersReducedMotion = useReducedMotion();
  const keepSmiling = "KEEP SMILING.".split("");

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }
  };

  const HoverLink = ({ href, children, external = false }: { href: string, children: React.ReactNode, external?: boolean }) => (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="group relative inline-block text-pearl-offwhite/80 hover:text-pearl-offwhite transition-colors duration-300"
    >
      {children}
      <span className="absolute left-0 bottom-0 w-full h-px bg-pearl-lime origin-right transform scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100"></span>
      <span className="absolute left-0 bottom-0 w-full h-px bg-pearl-lime origin-left transform scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100"></span>
    </a>
  );

  return (
    <footer className="bg-[#111111] text-pearl-offwhite pt-32 pb-12 md:pt-40 md:pb-16 px-6 md:px-12 overflow-hidden">
      <div className="max-w-[1400px] mx-auto flex flex-col">
        
        {/* Split Layout: KUMARAN DENTAL (Left) and Contact (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 mb-32 items-start">
          
          {/* Left Side: KUMARAN DENTAL */}
          <div className="flex flex-col sticky top-32">
            <h2 className="text-display-md md:text-display-lg lg:text-[7vw] font-bold leading-none tracking-tighter text-pearl-offwhite mb-8">
              KUMARAN<br/>DENTAL
            </h2>
            <div className="text-pearl-muted text-lg space-y-2">
              <p>142 West 21st Street</p>
              <p>New York, NY 10011</p>
              <div className="pt-6 flex flex-col items-start space-y-3">
                <HoverLink href={`tel:${siteConfig.contact.phone.replace(/\D/g,'')}`}>
                  {siteConfig.contact.phone}
                </HoverLink>
                <HoverLink href={`mailto:${siteConfig.contact.email}`}>
                  {siteConfig.contact.email}
                </HoverLink>
              </div>
            </div>
          </div>

          {/* Right Side: Contact Form */}
          <div className="w-full">
            <ContactForm />
          </div>

        </div>

        <div className="w-full h-px bg-[#E5F3FD]/10 mb-24"></div>

        {/* Giant Header */}
        <motion.div
          variants={prefersReducedMotion ? {} : containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          className="mb-24 md:mb-32 flex flex-col font-bold text-[15vw] leading-[0.85] tracking-tighter opacity-10 text-pearl-muted select-none"
        >
          <div className="flex">
            {"KEEP".split("").map((letter, i) => (
              <motion.span key={`keep-${i}`} variants={prefersReducedMotion ? {} : letterVariants}>{letter}</motion.span>
            ))}
          </div>
          <div className="flex">
            {"SMILING.".split("").map((letter, i) => (
              <motion.span key={`smiling-${i}`} variants={prefersReducedMotion ? {} : letterVariants}>{letter}</motion.span>
            ))}
          </div>
        </motion.div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8 mb-24">
          <div className="flex flex-col space-y-3">
            <HoverLink href="#services">Services</HoverLink>
            <HoverLink href="#dentists">Dentists</HoverLink>
            <HoverLink href="#contact">Invisalign</HoverLink>
            <HoverLink href="#about">About</HoverLink>
            <HoverLink href="#faq">FAQ</HoverLink>
            <HoverLink href="#contact">Contact</HoverLink>
          </div>

          <div className="flex flex-col space-y-3">
            <HoverLink href={siteConfig.social.instagram} external>Instagram</HoverLink>
            <HoverLink href={siteConfig.social.tiktok} external>TikTok</HoverLink>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-pearl-muted/20 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-pearl-muted/60">
          <p className="mb-4 md:mb-0">© {new Date().getFullYear()} Kumaran Dental. All rights reserved.</p>
          <div className="flex space-x-6">
            <HoverLink href="#">Privacy Policy</HoverLink>
            <HoverLink href="#">Terms of Service</HoverLink>
          </div>
        </div>
        
      </div>
    </footer>
  );
}
