'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { formServices, siteConfig } from '@/data/siteConfig';
import { buildMailtoLink } from '@/lib/utils';
import { useReducedMotion } from '@/hooks/useReducedMotion';

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  service: string;
  day: string;
  message: string;
};

type Errors = {
  firstName?: string;
  email?: string;
};

const INITIAL_STATE: FormState = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  service: '',
  day: '',
  message: '',
};

export default function ContactForm() {
  const [formData, setFormData] = useState<FormState>(INITIAL_STATE);
  const [errors, setErrors] = useState<Errors>({});
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (errors[name as keyof Errors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = () => {
    const newErrors: Errors = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Valid email is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      const mailtoData: Record<string, string> = {
        'Name': `${formData.firstName} ${formData.lastName}`,
        'Email': formData.email,
        'Phone': formData.phone,
        'Preferred Service': formData.service || 'Not specified',
        'Preferred Day': formData.day || 'Not specified',
        'Message': formData.message,
      };

      const mailtoUrl = buildMailtoLink(mailtoData, siteConfig.contact.email);
      window.location.href = mailtoUrl;
    }
  };

  const inputClasses = "w-full bg-transparent border-b-2 border-pearl-muted/30 pt-6 pb-2 focus:border-pearl-lime outline-none text-lg text-pearl-offwhite transition-colors duration-300";
  const labelClasses = "absolute left-0 top-6 text-pearl-muted text-sm uppercase tracking-widest transition-all duration-300 pointer-events-none";

  const renderLabel = (name: keyof FormState, text: string) => {
    const isFocused = focusedField === name;
    const hasValue = !!formData[name];
    const isFloating = isFocused || hasValue;

    return (
      <label 
        htmlFor={name}
        className={`${labelClasses} ${isFloating ? '-translate-y-5 text-xs text-pearl-lime' : ''}`}
      >
        {text}
      </label>
    );
  };

  const staggerItem = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const animations = prefersReducedMotion ? {} : {
    variants: containerVariants,
    initial: "hidden",
    whileInView: "show",
    viewport: { once: true, margin: '-100px' }
  };

  const fieldAnimations = prefersReducedMotion ? {} : {
    variants: staggerItem
  };

  return (
    <div id="contact" className="w-full">
      <div className="w-full">
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="mb-12 md:mb-16"
        >
          <h2 className="text-display-sm md:text-5xl font-bold mb-4 text-pearl-offwhite">Get in touch</h2>
          <p className="text-lg text-pearl-muted">
            Send us an appointment enquiry and we'll follow up to confirm availability.
          </p>
        </motion.div>

        <motion.form 
          onSubmit={handleSubmit}
          className="grid grid-cols-1 gap-y-10"
          {...animations}
        >
          <motion.div className="relative" {...fieldAnimations}>
            {renderLabel('firstName', 'First Name *')}
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              onFocus={() => setFocusedField('firstName')}
              onBlur={() => setFocusedField(null)}
              className={inputClasses}
            />
            {errors.firstName && <span className="absolute bottom-[-20px] left-0 text-sm text-pearl-peach">{errors.firstName}</span>}
          </motion.div>

          <motion.div className="relative" {...fieldAnimations}>
            {renderLabel('lastName', 'Last Name')}
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              onFocus={() => setFocusedField('lastName')}
              onBlur={() => setFocusedField(null)}
              className={inputClasses}
            />
          </motion.div>

          <motion.div className="relative" {...fieldAnimations}>
            {renderLabel('email', 'Email Address *')}
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onFocus={() => setFocusedField('email')}
              onBlur={() => setFocusedField(null)}
              className={inputClasses}
            />
            {errors.email && <span className="absolute bottom-[-20px] left-0 text-sm text-pearl-peach">{errors.email}</span>}
          </motion.div>

          <motion.div className="relative" {...fieldAnimations}>
            {renderLabel('phone', 'Phone Number')}
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              onFocus={() => setFocusedField('phone')}
              onBlur={() => setFocusedField(null)}
              className={inputClasses}
            />
          </motion.div>

          <motion.div className="relative" {...fieldAnimations}>
            {renderLabel('service', 'Preferred Service')}
            <select
              id="service"
              name="service"
              value={formData.service}
              onChange={handleChange}
              onFocus={() => setFocusedField('service')}
              onBlur={() => setFocusedField(null)}
              className={`${inputClasses} appearance-none bg-transparent cursor-pointer`}
            >
              <option value="" disabled className="bg-[#E5F3FD] text-pearl-muted"></option>
              {formServices.map(service => (
                <option key={service} value={service} className="bg-[#E5F3FD] text-pearl-offwhite">
                  {service}
                </option>
              ))}
            </select>
            <div className="absolute right-0 top-8 pointer-events-none text-pearl-muted">
              ▼
            </div>
          </motion.div>

          <motion.div className="relative" {...fieldAnimations}>
            {renderLabel('day', 'Preferred Day')}
            <select
              id="day"
              name="day"
              value={formData.day}
              onChange={handleChange}
              onFocus={() => setFocusedField('day')}
              onBlur={() => setFocusedField(null)}
              className={`${inputClasses} appearance-none bg-transparent cursor-pointer`}
            >
              <option value="" disabled className="bg-[#E5F3FD] text-pearl-muted"></option>
              {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Any day'].map(day => (
                <option key={day} value={day} className="bg-[#E5F3FD] text-pearl-offwhite">
                  {day}
                </option>
              ))}
            </select>
            <div className="absolute right-0 top-8 pointer-events-none text-pearl-muted">
              ▼
            </div>
          </motion.div>

          <motion.div className="relative w-full" {...fieldAnimations}>
            {renderLabel('message', 'Message')}
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              onFocus={() => setFocusedField('message')}
              onBlur={() => setFocusedField(null)}
              rows={4}
              className={`${inputClasses} resize-none`}
            />
          </motion.div>

          <motion.div className="w-full flex flex-col items-start gap-6 mt-8" {...fieldAnimations}>
            <button
              type="submit"
              className="w-full md:w-auto bg-pearl-lime text-pearl-charcoal px-10 py-4 rounded-full text-lg font-medium hover:scale-[1.02] active:scale-[0.98] transition-transform duration-200"
            >
              Send Enquiry
            </button>
            <p className="text-sm text-pearl-muted">
              This is an appointment enquiry only. We'll confirm availability and get back to you within one business day.
            </p>
          </motion.div>
        </motion.form>
      </div>
    </div>
  );
}
