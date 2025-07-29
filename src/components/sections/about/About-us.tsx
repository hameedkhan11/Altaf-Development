"use client";
import { useEffect, useState } from "react";
import { Hero } from "@/components/common/Hero";
import MissionVisionSection  from './MissionVisionSection';
import  TeamSection  from './TeamSection';
import { aboutPageData, breadcrumbs } from "@/data/about-us/data";
import { CompanyValuesSection } from "./CompanyValue";
import MissionVisionCards from "@/components/cards/MissionVisionCard";
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
    "url": "https://altafdevelopments.com/about",
    "mainEntity": {
      "@type": "Organization",
      "name": "Altaf Developments",
      "foundingDate": "2025",
      "description": aboutPageData.company.description,
      "employee": aboutPageData.team.map(member => ({
        "@type": "Person",
        "name": member.name,
        "jobTitle": member.position,
        "description": member.description,
        "image": `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/${member.image}`,
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
        {/* Hero Section */}
        <Hero
          title=""
          backgroundType="image"
          backgroundSrc="About_us_hero_oe5ctv"
          breadcrumbs={breadcrumbs}
          height="three-quarter"
          overlay="gradient"
          ariaLabel="About us hero section"
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
        <MissionVisionCards />
      </div>
    </>
  );
}