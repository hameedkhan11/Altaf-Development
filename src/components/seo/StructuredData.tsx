// components/seo/StructuredData.tsx
/*
eslint-disable @typescript-eslint/no-explicit-any
*/
import Script from "next/script";

interface StructuredDataProps {
  pageType: 'home' | 'about' | 'contact' | 'blogs' | 'blog-post' | 'property-detail' | 'media';
  propertyData?: {
    name: string;
    description: string;
    images?: string[];
    propertyType: 'one-bed' | 'two-bed';
    location: string;
    features?: string[];
  };
}

// Enhanced Corporation Schema with proper @type array
const corporationData = {
  "@context": "https://schema.org",
  "@type": ["RealEstateAgent", "Organization"],
  "@id": "https://altafdevelopments.com/#organization",
  name: "Altaf Developments",
  legalName: "Altaf Developments (Private) Limited",
  alternateName: ["Altaf Developments Pakistan", "Altaf Dev"],
  url: "https://altafdevelopments.com",
  logo: {
    "@type": "ImageObject",
    url: "https://i.ibb.co/bjgNnmmG/ALTAF-DEV-LOGO.png",
    width: 300,
    height: 100,
    caption: "Altaf Developments Logo"
  },
  image: [
    "https://res.cloudinary.com/dqv6swyul/image/upload/v1750140482/Booking1_rg1bhs.jpg",
    "https://res.cloudinary.com/dqv6swyul/image/upload/v1753876189/Altaf_website_image_landscape_2_fxo3d3.jpg",
    "https://res.cloudinary.com/dqv6swyul/image/upload/v1753816245/FINAL_IMAGE_FOR_WEBSITE_SQUARE_1X1_ji4fnn.jpg"
  ],
  description: "Altaf Developments builds with purpose—creating luxury one and two bedroom apartments in Faisal Hills, Islamabad. We specialize in exceptional spaces that meet real needs, uplift communities, and inspire lasting change.",
  slogan: "Building Dreams, Creating Communities",
  foundingDate: "2010-01-01",
  naics: "236117",
  industry: "Real Estate Development",
  knowsAbout: [
    "Luxury Apartment Development",
    "One Bedroom Apartments", 
    "Two Bedroom Apartments",
    "Faisal Hills Development",
    "Islamabad Real Estate",
    "Premium Residential Properties",
    "Property Investment",
    "Urban Development"
  ],
  address: {
    "@type": "PostalAddress",
    streetAddress: "Main Boulevard Plot #1, Block B Faisal Hills",
    addressLocality: "Islamabad",
    addressRegion: "Islamabad Capital Territory", 
    postalCode: "44000",
    addressCountry: "PK"
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "33.710925",
    longitude: "72.774986"
  },
  areaServed: [
    {
      "@type": "City",
      name: "Islamabad",
      containedIn: {
        "@type": "Country", 
        name: "Pakistan"
      }
    },
    {
      "@type": "Place",
      name: "Faisal Hills",
      containedIn: {
        "@type": "City",
        name: "Islamabad"
      }
    }
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Luxury Apartment Development Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Accommodation",
          name: "One Bedroom Luxury Apartments",
          description: "Premium one bedroom apartments in Faisal Hills with modern amenities - 850 sq ft",
          accommodationCategory: "Apartment",
          numberOfRooms: 1,
          floorSize: {
            "@type": "QuantitativeValue",
            value: "850",
            unitCode: "SQF"
          }
        }
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Accommodation",
          name: "Two Bedroom Luxury Apartments", 
          description: "Spacious two bedroom apartments with premium finishes in Faisal Hills - 1600 sq ft",
          accommodationCategory: "Apartment",
          numberOfRooms: 2,
          floorSize: {
            "@type": "QuantitativeValue",
            value: "1600",
            unitCode: "SQF"
          }
        }
      }
    ]
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+923330777775",
      email: "info@altafdevelopments.com",
      contactType: "customer service",
      areaServed: "PK",
      availableLanguage: "en",
      serviceArea: {
        "@type": "Place",
        name: "Islamabad, Pakistan"
      },
      hoursAvailable: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "09:00",
        closes: "18:00"
      }
    },
    {
      "@type": "ContactPoint",
      telephone: "+923330777775", 
      contactType: "sales",
      areaServed: "PK",
      availableLanguage: "en",
      serviceArea: {
        "@type": "Place",
        name: "Faisal Hills, Islamabad"
      }
    }
  ],
  sameAs: [
    "https://www.facebook.com/altafdevelopments",
    "https://x.com/Altafdevelpmnts",
    "https://www.instagram.com/altafdevelopments", 
    "https://www.youtube.com/@Altafdevelopmentspk",
    "https://www.pinterest.com/altafdevelopmentspk/"
  ]
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://altafdevelopments.com/#website",
  url: "https://altafdevelopments.com/",
  name: "Altaf Developments - Luxury Apartments in Faisal Hills Islamabad",
  description: "Premium one and two bedroom apartments in Faisal Hills, Islamabad. Exceptional luxury living spaces by Altaf Developments.",
  inLanguage: "en",
  publisher: {
    "@id": "https://altafdevelopments.com/#organization"
  },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://altafdevelopments.com/search?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
};

const getBreadcrumbSchema = (pageType: string) => {
  const breadcrumbMap = {
    home: [
      { name: "Home", url: "https://altafdevelopments.com/" }
    ],
    about: [
      { name: "Home", url: "https://altafdevelopments.com/" },
      { name: "About Us", url: "https://altafdevelopments.com/about" }
    ],
    contact: [
      { name: "Home", url: "https://altafdevelopments.com/" },
      { name: "Contact", url: "https://altafdevelopments.com/contact" }
    ],
    blogs: [
      { name: "Home", url: "https://altafdevelopments.com/" },
      { name: "Blogs", url: "https://altafdevelopments.com/blogs" }
    ],
    media: [
      { name: "Home", url: "https://altafdevelopments.com/" },
      { name: "Media", url: "https://altafdevelopments.com/media" }
    ],
    "property-detail": [
      { name: "Home", url: "https://altafdevelopments.com/" },
      { name: "Properties", url: "https://altafdevelopments.com/property-detail" }
    ]
  };
  
  const breadcrumbs = breadcrumbMap[pageType as keyof typeof breadcrumbMap];
  if (!breadcrumbs || breadcrumbs.length <= 1) return null;
  
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `https://altafdevelopments.com/${pageType}#breadcrumb`,
    itemListElement: breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: {
        "@type": "WebPage",
        "@id": item.url,
        url: item.url
      }
    }))
  };
};

const getPropertySchema = (propertyData: StructuredDataProps["propertyData"]) => {
  if (!propertyData) return null;
  
  const numberOfRooms = propertyData.propertyType === "one-bed" ? 1 : 2;
  const floorSize = propertyData.propertyType === "one-bed" ? "850" : "1600";
  const estimatedOccupancy = propertyData.propertyType === "one-bed" ? 2 : 4;
  
  const propertyImages = propertyData.images && propertyData.images.length > 0 
    ? propertyData.images 
    : [
        "https://res.cloudinary.com/dqv6swyul/image/upload/v1753518957/One_Bed_Bathroom_sxuabb.jpg",
        "https://res.cloudinary.com/dqv6swyul/image/upload/v1753518957/One_Bed_Feature_bdk9at.jpg",
        "https://res.cloudinary.com/dqv6swyul/image/upload/v1753518989/two_bed_Tv_Lounge_ihucwo.jpg",
        "https://res.cloudinary.com/dqv6swyul/image/upload/v1753518985/Two_Bed_Kitchen_ptkuis.jpg"
      ];
  
  return {
    "@context": "https://schema.org",
    "@type": ["Product", "Accommodation", "Apartment"],
    name: propertyData.name,
    description: propertyData.description,
    image: propertyImages,
    category: "Luxury Apartment",
    accommodationCategory: "Apartment",
    numberOfRooms: numberOfRooms,
    occupancy: estimatedOccupancy,
    floorSize: {
      "@type": "QuantitativeValue",
      value: floorSize,
      unitCode: "SQF"
    },
    ...(propertyData.features && {
      amenityFeature: propertyData.features.map(feature => ({
        "@type": "LocationFeatureSpecification",
        name: feature,
        value: true
      }))
    }),
    address: {
      "@type": "PostalAddress",
      addressLocality: propertyData.location,
      addressRegion: "Islamabad Capital Territory",
      addressCountry: "PK"
    },
    locationCreated: {
      "@type": "Place",
      name: propertyData.location
    },
    brand: {
      "@id": "https://altafdevelopments.com/#organization"
    },
    manufacturer: {
      "@id": "https://altafdevelopments.com/#organization"
    },
    isRelatedTo: {
      "@id": "https://altafdevelopments.com/#organization"
    }
  };
};

const StructuredData = ({ 
  pageType, 
  propertyData 
}: StructuredDataProps) => {
  
  // Create a Set to track schema types and prevent duplicates
  const addedSchemaTypes = new Set();
  const schemas: any[] = [];

  // Always include these core schemas
  if (!addedSchemaTypes.has('organization')) {
    schemas.push(corporationData);
    addedSchemaTypes.add('organization');
  }
  
  if (!addedSchemaTypes.has('website')) {
    schemas.push(websiteSchema);
    addedSchemaTypes.add('website');
  }

  // Add conditional schemas
  const breadcrumbSchema = getBreadcrumbSchema(pageType);
  if (breadcrumbSchema && !addedSchemaTypes.has(`breadcrumb-${pageType}`)) {
    schemas.push(breadcrumbSchema);
    addedSchemaTypes.add(`breadcrumb-${pageType}`);
  }

  // Add property schema if provided
  const propertySchema = getPropertySchema(propertyData);
  if (propertySchema && !addedSchemaTypes.has('property')) {
    schemas.push(propertySchema);
    addedSchemaTypes.add('property');
  }

  return (
    <>
      {/* Render each schema as a separate script tag */}
      {schemas.map((schema, index) => (
        <Script
          key={`schema-${schema['@type']}-${index}`} // More unique key
          id={`structured-data-${schema['@type']}-${index}`} // More unique ID
          type="application/ld+json"
          dangerouslySetInnerHTML={{ 
            __html: JSON.stringify(schema, null, 0)
          }}
          strategy="afterInteractive"
        />
      ))}
    </>
  );
};

export default StructuredData;