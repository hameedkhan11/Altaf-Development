// FAQHeader.tsx
import React from "react";
import { AnimatedH2, AnimatedSpan } from "../ui/text-animations";

const FAQHeader: React.FC = () => {
  return (
    <header className="mb-8 sm:mb-10 md:mb-12 lg:mb-16 pt-4 sm:pt-6 md:pt-8 lg:pt-12 px-4 sm:px-6 lg:px-8">
      <div className="text-sm sm:text-base lg:text-lg uppercase tracking-wider text-gray-500 mb-3 sm:mb-4 font-medium font-optima">
        FAQ&apos;S
      </div>
      <AnimatedH2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light mb-4 sm:mb-6 tracking-tight leading-tight flex flex-col gap-y-2 sm:gap-y-3 md:gap-y-4">
        Frequently
        <AnimatedSpan className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl">Asked Questions</AnimatedSpan>
      </AnimatedH2>
    </header>
  );
};

export default FAQHeader;