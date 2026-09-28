'use client';

import dynamic from 'next/dynamic';

// Eagerly load above-the-fold components
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import Marquee from '@/components/Marquee';

// Dynamically import below-the-fold components for better performance
const Introduction = dynamic(() => import('@/components/Introduction'), {
  ssr: true,
});
const Services = dynamic(() => import('@/components/Services'), {
  ssr: true,
});
const SmileTransformation = dynamic(
  () => import('@/components/SmileTransformation'),
  { ssr: true }
);
const Experience = dynamic(() => import('@/components/Experience'), {
  ssr: true,
});
const Invisalign = dynamic(() => import('@/components/Invisalign'), {
  ssr: true,
});
const Whitening = dynamic(() => import('@/components/Whitening'), {
  ssr: true,
});
const Dentists = dynamic(() => import('@/components/Dentists'), {
  ssr: true,
});
const PatientJourney = dynamic(() => import('@/components/PatientJourney'), {
  ssr: true,
});
const Reviews = dynamic(() => import('@/components/Reviews'), {
  ssr: true,
});
const Insurance = dynamic(() => import('@/components/Insurance'), {
  ssr: true,
});
const FAQ = dynamic(() => import('@/components/FAQ'), {
  ssr: true,
});
const BookingCTA = dynamic(() => import('@/components/BookingCTA'), {
  ssr: true,
});

const Location = dynamic(() => import('@/components/Location'), {
  ssr: true,
});
const Footer = dynamic(() => import('@/components/Footer'), {
  ssr: true,
});
const FloatingButton = dynamic(() => import('@/components/FloatingButton'), {
  ssr: true,
});
const CustomCursor = dynamic(() => import('@/components/CustomCursor'), {
  ssr: false,
});

export default function HomePage() {
  return (
    <>
      <CustomCursor />
      <Navigation />
      <main>
        <Hero />
        <Marquee />
        <Introduction />
        <Services />
        <SmileTransformation />
        <Experience />
        <Invisalign />
        <Dentists />
        <PatientJourney />
        <Reviews />
        <FAQ />
      </main>
      <Footer />
      <FloatingButton />
    </>
  );
}
