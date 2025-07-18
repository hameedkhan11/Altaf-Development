// components/ContactHero.tsx
"use client";
import React from 'react';
import { BreadcrumbItem } from '@/lib/types';
import { Hero } from '@/components/common/Hero';

interface ContactHeroProps {
  className?: string;
}

export const ContactHero: React.FC<ContactHeroProps> = ({ className = "" }) => {
  const breadcrumbs: BreadcrumbItem[] = [
    { label: 'Home', href: '/' },
    { label: 'Contact Us', href: '/contact-us' }
  ];

  return (
    <div className={className}>
      <Hero
        title="Get in Touch"
        backgroundType="image"
        backgroundSrc="Booking1_rg1bhs"
        fallbackImage="luxury-apartments/hero-contact-fallback"
        height="half"
        overlay="medium"
        contentAlignment="center"
        breadcrumbs={breadcrumbs}
        enableParallax={true}
        parallaxSpeed={0.3}
        enableAnimations={true}
        ariaLabel="Contact us hero section"
      />
    </div>
  );
};