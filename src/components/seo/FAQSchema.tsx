// components/seo/FAQSchema.tsx - Final Fixed Version
'use client';
import { faqData } from "@/data/faqs/data";
import Script from "next/script";
import { useEffect, useState } from "react";

const FAQSchema = () => {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    // Check if FAQ schema already exists
    const existingFAQSchema = document.querySelector('#faq-structured-data-home-only');
    
    if (existingFAQSchema) {
      console.log('FAQ schema already exists, skipping render');
      setShouldRender(false);
      return;
    }

    console.log('No existing FAQ schema found, will render');
    setShouldRender(true);
  }, []);

  // Generate FAQ Schema
  const getFAQSchema = () => {
    if (!faqData || !Array.isArray(faqData) || faqData.length === 0) {
      return null;
    }
    
    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": "https://altafdevelopments.com/#faq-home",
      name: "Frequently Asked Questions - Altaf Developments",
      description: "Common questions about Altaf Developments luxury apartments in Faisal Hills, Islamabad",
      mainEntity: faqData.map((faq, index) => {
        if (!faq.question || !faq.answer) {
          return null;
        }
        
        return {
          "@type": "Question",
          "@id": `https://altafdevelopments.com/#faq-home-question-${index + 1}`,
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

  // Don't render if already exists or if we shouldn't render
  if (!shouldRender) {
    return null;
  }

  const faqSchema = getFAQSchema();
  
  if (!faqSchema) {
    return null;
  }

  return (
    <Script
      id="faq-structured-data-home-only"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ 
        __html: JSON.stringify(faqSchema, null, 0)
      }}
      strategy="afterInteractive"
    />
  );
};

export default FAQSchema;