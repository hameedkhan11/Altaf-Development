// components/seo/StructuredData.tsx
import Script from 'next/script';

const StructuredData = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Corporation",
    "name": "Altaf Developments",
    "alternateName": "Altaf Developments Pakistan",
    "url": "https://altafdevelopments.com/",
    "logo": "https://i.ibb.co/bjgNnmmG/ALTAF-DEV-LOGO.png",
    "description": "Altaf Developments builds with purpose—creating spaces that meet real needs, uplift communities, and inspire lasting change in people's lives.",
    "foundingDate": "2010-01-01",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Main Boulevard Plot #1, Block B Faisal Hills",
      "addressLocality": "Taxila",
      "addressRegion": "Punjab",
      "postalCode": "47080",
      "addressCountry": "PK"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+923330777775",
      "email": "info@altafdevelopments.com",
      "contactType": "customer service",
      "areaServed": "PK",
      "availableLanguage": "en"
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      "opens": "09:00",
      "closes": "19:00"
    },
    "sameAs": [
      "https://www.facebook.com/altafdevelopments",
      "https://x.com/Altafdevelpmnts",
      "https://www.instagram.com/altafdevelopments",
      "https://www.youtube.com/@Altafdevelopmentspk",
      "https://www.pinterest.com/altafdevelopmentspk/"
    ]
  };

  return (
    <Script
      id="structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData),
      }}
    />
  );
};

export default StructuredData;