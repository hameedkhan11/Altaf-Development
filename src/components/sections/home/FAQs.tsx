// LuxuryRealEstateFAQ.tsx
import FAQCTA from "@/components/faqs/FAQcta";
import FAQHeader from "@/components/faqs/FAQheader";
import FAQList from "@/components/faqs/FAQList";
import React from "react";

const LuxuryRealEstateFAQ: React.FC = () => {
  return (
    <section className="py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24 px-3 sm:px-4 md:px-6 lg:px-16 bg-neutral-50">
      <div className="mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 sm:gap-8 lg:gap-12">
          {/* Header Section - Left Side (40% width) */}
          <div className="lg:col-span-2">
            <FAQHeader />
          </div>
          
          {/* FAQ List - Right Side (60% width) */}
          <div className="lg:col-span-3">
            <FAQList />
          </div>
        </div>
        
        {/* Call to Action */}
        <FAQCTA />
      </div>
    </section>
  );
};

export default LuxuryRealEstateFAQ;