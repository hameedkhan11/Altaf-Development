// components/seo/FAQSchema.tsx
import { faqData } from "@/data/faqs/data";
import Script from "next/script";

const FAQSchema = () => {
  // Generate FAQ Schema
  const getFAQSchema = () => {
    if (!faqData || !Array.isArray(faqData) || faqData.length === 0) {
      return null;
    }
    
    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": "https://altafdevelopments.com/#faq",
      name: "Frequently Asked Questions - Altaf Developments",
      description: "Common questions about Altaf Developments luxury apartments in Faisal Hills, Islamabad",
      mainEntity: faqData.map((faq, index) => {
        if (!faq.question || !faq.answer) {
          return null;
        }
        
        return {
          "@type": "Question",
          "@id": `https://altafdevelopments.com/#faq-question-${index + 1}`,
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer.replace(/<[^>]+>/g, ""),
            author: {
              "@id": "https://altafdevelopments.com/#organization"
            }
          }
        };
      }).filter(Boolean)
    };
  };

  const faqSchema = getFAQSchema();
  
  if (!faqSchema) return null;

  return (
    <Script
      id="faq-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ 
        __html: JSON.stringify(faqSchema, null, 0)
      }}
      strategy="afterInteractive"
    />
  );
};

export default FAQSchema;