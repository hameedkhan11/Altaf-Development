// components/seo/StructuredData.tsx
import Script from "next/script";

interface StructuredDataProps {
  pageType:
    | "home"
    | "about"
    | "contact"
    | "blogs"
    | "blog-post"
    | "properties"
    | "apartments"
    | "media";
  propertyData?: {
    name: string;
    description: string;
    images?: string[];
    propertyType: "1-bed" | "2-bed" | "studio";
    location: string;
    features?: string[];
  };
}

// Organization Schema - Clean and focused
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  "@id": "https://altafdevelopments.com/#organization",
  name: "Altaf Developments",
  legalName: "Altaf Developments (Private) Limited",
  url: "https://altafdevelopments.com",
  logo: {
    "@type": "ImageObject",
    url: "https://i.ibb.co/bjgNnmmG/ALTAF-DEV-LOGO.png",
    width: 300,
    height: 100,
  },
  description:
    "Altaf Developments builds luxury apartments in Faisal Hills, Islamabad. Specializing in one bedroom, two bedroom, and studio apartments with premium finishes.",
  slogan: "Building Dreams, Creating Communities",
  foundingDate: "2010",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Main Boulevard Plot #1, Block B Faisal Hills",
    addressLocality: "Islamabad",
    postalCode: "44000",
    addressCountry: "PK",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 33.710925,
    longitude: 72.774986,
  },
  areaServed: {
    "@type": "City",
    name: "Islamabad",
    addressCountry: "Pakistan",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+923330777775",
    email: "info@altafdevelopments.com",
    contactType: "customer service",
    areaServed: "PK",
    availableLanguage: "English",
  },
  sameAs: [
    "https://www.facebook.com/altafdevelopments",
    "https://x.com/Altafdevelpmnts",
    "https://www.instagram.com/altafdevelopments",
    "https://www.youtube.com/@Altafdevelopmentspk",
    "https://www.pinterest.com/altafdevelopmentspk/",
  ],
};

// Website Schema
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://altafdevelopments.com/#website",
  url: "https://altafdevelopments.com",
  name: "Altaf Developments",
  description:
    "Premium apartments in Faisal Hills, Islamabad - One bedroom, two bedroom, and studio apartments by Altaf Developments",
  publisher: {
    "@id": "https://altafdevelopments.com/#organization",
  },
};

// Breadcrumb Schema Generator
const getBreadcrumbSchema = (pageType: string, propertyData?: StructuredDataProps["propertyData"]) => {
  const breadcrumbMap: Record<string, Array<{ name: string; url: string }>> = {
    home: [{ name: "Home", url: "https://altafdevelopments.com/" }],
    about: [
      { name: "Home", url: "https://altafdevelopments.com/" },
      { name: "About", url: "https://altafdevelopments.com/about" },
    ],
    contact: [
      { name: "Home", url: "https://altafdevelopments.com/" },
      { name: "Contact", url: "https://altafdevelopments.com/contact" },
    ],
    blogs: [
      { name: "Home", url: "https://altafdevelopments.com/" },
      { name: "Blogs", url: "https://altafdevelopments.com/media/blogs" },
    ],
    media: [
      { name: "Home", url: "https://altafdevelopments.com/" },
      { name: "Media", url: "https://altafdevelopments.com/media" },
    ],
    properties: [
      { name: "Home", url: "https://altafdevelopments.com/" },
      { name: "Properties", url: "https://altafdevelopments.com/properties" },
    ],
    "apartment-detail": [
      { name: "Home", url: "https://altafdevelopments.com/" },
      { name: "Properties", url: "https://altafdevelopments.com/properties" },
      { name: "Apartments", url: "https://altafdevelopments.com/properties/apartments" },
      ...(propertyData
        ? [
            {
              name: propertyData.name,
              url: `https://altafdevelopments.com/properties/apartments/${propertyData.propertyType}`,
            },
          ]
        : []),
    ],
  };

  const breadcrumbs = breadcrumbMap[pageType];
  if (!breadcrumbs || breadcrumbs.length <= 1) return null;

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
};

// Property Schema Generator
const getPropertySchema = (propertyData: StructuredDataProps["propertyData"]) => {
  if (!propertyData) return null;

  const propertyConfig = {
    "1-bed": { rooms: 1, size: "945", occupancy: 200 },
    "2-bed": { rooms: 2, size: "1641", occupancy: 200 },
    "studio": { rooms: 1, size: "798", occupancy: 50 },
  };

  const config = propertyConfig[propertyData.propertyType];

  return {
    "@context": "https://schema.org",
    "@type": "Apartment",
    name: propertyData.name,
    description: propertyData.description,
    numberOfRooms: config.rooms,
    occupancy: {
      "@type": "QuantitativeValue",
      value: config.occupancy,
    },
    floorSize: {
      "@type": "QuantitativeValue",
      value: config.size,
      unitCode: "FTK",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: propertyData.location,
      addressRegion: "Islamabad Capital Territory",
      addressCountry: "PK",
    },
    ...(propertyData.features && propertyData.features.length > 0 && {
      amenityFeature: propertyData.features.map((feature) => ({
        "@type": "LocationFeatureSpecification",
        name: feature,
        value: true,
      })),
    }),
    ...(propertyData.images && propertyData.images.length > 0 && {
      image: propertyData.images.slice(0, 3).map((url) => url),
    }),
  };
};

const StructuredData = ({ pageType, propertyData }: StructuredDataProps) => {
  const schemas = [];

  // Core schemas on every page
  schemas.push(organizationSchema);
  schemas.push(websiteSchema);

  // Breadcrumb schema
  const breadcrumb = getBreadcrumbSchema(pageType, propertyData);
  if (breadcrumb) schemas.push(breadcrumb);

  // Property schema for apartment detail pages
  if (pageType === "apartments" && propertyData) {
    const property = getPropertySchema(propertyData);
    if (property) schemas.push(property);
  }

  return (
    <>
      {schemas.map((schema, index) => (
        <Script
          key={`schema-${index}`}
          id={`structured-data-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema),
          }}
          strategy="afterInteractive"
        />
      ))}
    </>
  );
};

export default StructuredData;