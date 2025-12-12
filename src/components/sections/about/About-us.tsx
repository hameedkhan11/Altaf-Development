"use client";

import { Hero } from "@/components/common/Hero";
import MissionVisionSection from "./MissionVisionSection";
import TeamSection from "./CEOMessage";
import { breadcrumbs } from "@/data/about-us/data";
import { CompanyValuesSection } from "./CompanyValue";
import MissionVisionCards from "@/components/cards/MissionVisionCard";

export default function AboutPage() {
  return (
    <div className="min-h-screen">
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
      <MissionVisionSection />
      <CompanyValuesSection />
      <MissionVisionCards />
    </div>
  );
}
