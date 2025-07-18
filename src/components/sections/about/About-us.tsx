"use client";
import React, { useEffect, useState } from "react";
import { Hero } from "@/components/common/Hero";
import MissionVisionSection  from './MissionVisionSection';
import  TeamSection  from './TeamSection';
import { aboutPageData, breadcrumbs } from "@/data/about-us/data";
import { CompanyValuesSection } from "./CompanyValue";
// import FeaturesGrid from "./FeaturesGrid";


export default function AboutPage() {
  const [, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About Altaf Developments",
    "description": "Learn about Altaf Developments, a luxury real estate developer founded in 1993. Meet our experienced leadership team and discover our mission, vision, and core values.",
    "url": "https://yourwebsite.com/about",
    "mainEntity": {
      "@type": "Organization",
      "name": "Altaf Developments",
      "foundingDate": "1993",
      "description": aboutPageData.company.description,
      "employee": aboutPageData.team.map(member => ({
        "@type": "Person",
        "name": member.name,
        "jobTitle": member.position,
        "description": member.description,
        "image": `https://res.cloudinary.com/your-cloud-name/image/upload/${member.image}`,
      }))
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen">
        {/* Custom Styles */}
        <style jsx global>{`
          @keyframes fade-in-up {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .animate-fade-in-up {
            animation: fade-in-up 1s ease-out 0.5s forwards;
            opacity: 0;
          }

          .animate-fade-in-up-delay {
            animation: fade-in-up 1s ease-out 1s forwards;
            opacity: 0;
          }

          .animate-fade-in-up-delay-2 {
            animation: fade-in-up 1s ease-out 1.5s forwards;
            opacity: 0;
          }

          .animate-fade-in-up-delay-3 {
            animation: fade-in-up 1s ease-out 2s forwards;
            opacity: 0;
          }

          /* Responsive improvements */
          @media (max-width: 640px) {
            .container {
              padding-left: 1rem;
              padding-right: 1rem;
            }
          }

          @media (max-width: 768px) {
            .text-responsive {
              font-size: clamp(1.5rem, 4vw, 2rem);
            }
          }

          @media (max-width: 1024px) {
            .lg\\:mr-8, .lg\\:ml-8 {
              margin-left: 0 !important;
              margin-right: 0 !important;
            }
          }
        `}</style>

        {/* Hero Section */}
        <Hero
          title="Home/About Us"
          backgroundType="image"
          backgroundSrc="Booking1_rg1bhs"
          breadcrumbs={breadcrumbs}
          overlay="gradient"
          contentAlignment="center"
          ariaLabel="About us hero section"
          enableParallax={true}
          parallaxSpeed={0.3}
          enableAnimations={true}
          height="half"
        />

        <TeamSection />
        {/* Mission & Vision Section */}
        <MissionVisionSection />

        {/* Team Section */}

        {/* Company Values Section */}
        <CompanyValuesSection 
          values={aboutPageData.company.values} 
          description={aboutPageData.company.description}
        />
      </div>
    </>
  );
}