'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
// Assuming siteConfig has some useful data, though not strictly required for the hardcoded links
import { siteConfig } from '@/data/siteConfig'; 

const LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Dentists', href: '#dentists' },
  { label: 'FAQ', href: '#faq' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <motion.nav
        className={cn(
          'fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 transition-all duration-500',
          scrolled ? 'py-4' : 'py-8'
        )}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        aria-label="Main Navigation"
      >
        <div
          className={cn(
            'mx-auto flex w-full max-w-7xl items-center justify-between transition-all duration-500',
            scrolled
              ? 'rounded-full bg-[#E5F3FD]/90 px-6 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.08)] backdrop-blur-md'
              : 'px-2'
          )}
        >
          {/* Logo */}
          <a
            href="#"
            className="text-2xl font-bold uppercase tracking-tight text-pearl-charcoal"
            aria-label="Kumaran Dental Home"
          >
            KUMARAN
          </a>

          {/* Desktop Links */}
          <div className="hidden items-center gap-8 md:flex">
            {LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="group relative text-sm font-medium text-pearl-charcoal"
                data-cursor-hover
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-pearl-lime transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <a
            href="#contact"
            onClick={(e) => handleLinkClick(e, '#contact')}
            className="group hidden relative overflow-hidden items-center gap-2 rounded-full bg-[#111111] px-6 py-2.5 text-sm font-medium text-white transition-transform duration-300 hover:-translate-y-[2px] md:flex"
            data-cursor-hover
          >
            <span className="absolute inset-0 z-0 h-full w-full translate-x-[-100%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-500 ease-out group-hover:translate-x-[100%]" />
            <span className="relative z-10">Book</span>
            <ArrowUpRight className="relative z-10 h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </a>

          {/* Mobile Menu Toggle */}
          <button
            className="text-pearl-charcoal md:hidden"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open Menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Fullscreen Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[60] flex flex-col bg-[#111111] px-6 py-8"
          >
            <div className="flex items-center justify-between">
              <a
                href="#"
                className="text-2xl font-bold uppercase tracking-tight text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                KUMARAN
              </a>
              <button
                className="text-white"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close Menu"
              >
                <X className="h-8 w-8" />
              </button>
            </div>

            <div className="mt-20 flex flex-1 flex-col gap-8">
              {LINKS.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.5, ease: 'easeOut' }}
                  className="text-display-md font-medium text-white hover:text-pearl-lime"
                >
                  {link.label}
                </motion.a>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="mb-8 flex flex-col gap-4 text-pearl-cream"
            >
              <p className="text-lg">+1 (212) 555-0199</p>
              <div className="flex gap-4">
                <a href="#" className="hover:text-pearl-lime">Instagram</a>
                <a href="#" className="hover:text-pearl-lime">Twitter</a>
              </div>
            </motion.div>

            <motion.a
              href="#contact"
              onClick={(e) => handleLinkClick(e, '#contact')}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-pearl-lime px-8 py-4 text-lg font-medium text-pearl-charcoal"
            >
              <span>Book Appointment</span>
              <ArrowUpRight className="h-5 w-5" />
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
