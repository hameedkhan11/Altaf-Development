// components/seo/FAQSchema.tsx
import { faqData } from "@/data/faqs/data";
import Script from "next/script";

const FAQSchema = () => {
  // Generate FAQ Schema
  const getFAQSchema = () => {
    if (!faqData || !Array.isArray(faqData) || faqData.length === 0) {
      return null;
    }

    // Create mainEntity array with proper validation
    const mainEntity = faqData
      .filter(faq => faq && faq.question && faq.answer)
      .map((faq, index) => ({
        "@type": "Question",
        "@id": `https://altafdevelopments.com/#faq-question-${faq.id || index + 1}`,
        name: faq.question.trim(),
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer.replace(/<[^>]+>/g, "").trim()
        }
      }));

    // Ensure we have valid mainEntity items
    if (mainEntity.length === 0) {
      console.warn("No valid FAQ items found for schema generation");
      return null;
    }

    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": "https://altafdevelopments.com/#faq",
      name: "Frequently Asked Questions - Altaf Developments",
      description: "Common questions about Altaf Developments luxury apartments in Faisal Hills, Islamabad",
      url: "https://altafdevelopments.com",
      mainEntity: mainEntity
    };
  };

  const faqSchema = getFAQSchema();

  if (!faqSchema) {
    console.warn("FAQ Schema could not be generated");
    return null;
  }

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