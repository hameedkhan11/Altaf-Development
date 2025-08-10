// components/CEOSection.tsx
"use client";
import { ceoData } from '@/data/about-us/data';
import LeadershipSection from './LeadershipSection';

const CEOSection = () => {
  return (
    <LeadershipSection
      title="About Altaf Developments"
      name={ceoData.name}
      content={ceoData.content}
      imageSrc={ceoData.image}
      imageAlt={`${ceoData.name} - ${ceoData.title}`}
      imagePosition="right"
    />
  );
};

export default CEOSection;