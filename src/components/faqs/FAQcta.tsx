// FAQCTA.tsx
import React from "react";
import { Phone } from "lucide-react";
import { AnimatedH3, AnimatedP } from "../ui/text-animations";

const FAQCTA: React.FC = () => {
  return (
    <div className="mt-8 sm:mt-12 md:mt-16 lg:mt-20 text-center ">
      <div className="rounded-xl p-4 sm:p-6 md:p-8 lg:p-12 shadow-sm bg-[rgb(140,46,71)]">
        <AnimatedH3 className="text-xl sm:text-2xl md:text-3xl font-light mb-2 sm:mb-3 md:mb-4 text-white px-2 sm:px-0">
          Still have questions?
        </AnimatedH3>
        <AnimatedP className="mb-4 sm:mb-6 md:mb-8 max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-white leading-relaxed px-2 sm:px-4 md:px-0">
          Our luxury real estate specialists are available 24/7 to provide
          personalized consultation and answer any specific questions about
          your property needs.
        </AnimatedP>
        <button className="inline-flex items-center px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-4 bg-neutral-900 cursor-pointer text-white font-medium rounded-lg hover:bg-neutral-800 transition-colors duration-300 shadow-sm text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:ring-opacity-50">
          <Phone className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
          Contact Our Team
        </button>
      </div>
    </div>
  );
};

export default FAQCTA;