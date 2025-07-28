// components/ContactHero.tsx
import { Hero } from '@/components/common/Hero';

interface ContactHeroProps {
  className?: string;
}

export const ContactHero: React.FC<ContactHeroProps> = ({ className = "" }) => {
  return (
    <div className={className}>
      <Hero
        title="Get in Touch"
        backgroundType="image"
        backgroundSrc="Booking1_rg1bhs"
        fallbackImage="luxury-apartments/hero-contact-fallback"
        height="three-quarter"
        overlay="medium"
        contentAlignment="center"
        ariaLabel="Contact us hero section"
      />
    </div>
  );
};