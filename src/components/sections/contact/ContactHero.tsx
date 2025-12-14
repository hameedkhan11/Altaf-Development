// components/ContactHero.tsx
import { Hero } from '@/components/common/Hero';

interface ContactHeroProps {
  className?: string;
}
const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Contact", href: "/contact" },
]

export const ContactHero: React.FC<ContactHeroProps> = ({ className = "" }) => {
  return (
    <div className={className}>
      <Hero
        title="Get in Touch"
        backgroundType="image"
        breadcrumbs={breadcrumbs}
        backgroundSrc="altaf_fvt_6_1_urwwau"
        fallbackImage="luxury-apartments/hero-contact-fallback"
        height="three-quarter"
        overlay="medium"
        contentAlignment="center"
        ariaLabel="Contact us hero section"
      />
    </div>
  );
};