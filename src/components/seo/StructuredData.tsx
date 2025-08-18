// components/seo/StructuredData.tsx
/*
eslint-disable @typescript-eslint/no-explicit-any
*/
import Script from "next/script";

interface StructuredDataProps {
  pageType:
    | "home"
    | "about"
    | "contact"
    | "blogs"
    | "blog-post"
    | "property-detail"
    | "media";
  propertyData?: {
    name: string;
    description: string;
    images?: string[];
    propertyType: "one-bed" | "two-bed";
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
    caption: "Altaf Developments Logo",
  },
  image: [
    {
      "@type": "ImageObject",
      url: "https://res.cloudinary.com/dqv6swyul/image/upload/f_auto,q_auto,w_1200,h_800/v1750140482/Booking1_rg1bhs.jpg",
      width: 1200,
      height: 800,
      caption: "Altaf Developments office exterior building",
      description:
        "Modern office exterior of Altaf Developments with contemporary architectural design",
    },
    {
      "@type": "ImageObject",
      url: "https://res.cloudinary.com/dqv6swyul/image/upload/f_auto,q_auto,w_1200,h_800/v1753876189/Altaf_website_image_landscape_2_fxo3d3.jpg",
      width: 1200,
      height: 800,
      caption: "Altaf Developments company owner portrait",
      description:
        "Professional portrait of Altaf Developments owner and founder",
    },
    {
      "@type": "ImageObject",
      url: "https://res.cloudinary.com/dqv6swyul/image/upload/f_auto,q_auto,w_1000,h_1000/v1753816245/FINAL_IMAGE_FOR_WEBSITE_SQUARE_1X1_ji4fnn.jpg",
      width: 1000,
      height: 1000,
      caption: "Altaf Developments owner profile photo",
      description:
        "Square format professional photo of the company owner and leadership team",
    },
  ],
  description:
    "Altaf Developments builds with purpose—creating luxury one and two bedroom apartments in Faisal Hills, Islamabad. We specialize in exceptional spaces that meet real needs, uplift communities, and inspire lasting change.",
  slogan: "Building Dreams, Creating Communities",
  foundingDate: "2010-01-01",
  naics: "236117",
  knowsAbout: [
    "Luxury Apartment Development",
    "One Bedroom Apartments",
    "Two Bedroom Apartments",
    "Faisal Hills Development",
    "Islamabad Real Estate",
    "Premium Residential Properties",
    "Property Investment",
    "Urban Development",
  ],
  address: {
    "@type": "PostalAddress",
    streetAddress: "Main Boulevard Plot #1, Block B Faisal Hills",
    addressLocality: "Islamabad",
    addressRegion: "Islamabad Capital Territory",
    postalCode: "44000",
    addressCountry: "PK",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "33.710925",
    longitude: "72.774986",
  },
  areaServed: [
    {
      "@type": "City",
      name: "Islamabad",
      containedIn: {
        "@type": "Country",
        name: "Pakistan",
      },
    },
    {
      "@type": "Place",
      name: "Faisal Hills",
      containedIn: {
        "@type": "City",
        name: "Islamabad",
      },
    },
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
          description:
            "Premium one bedroom apartments in Faisal Hills with modern amenities - 850 sq ft",
          accommodationCategory: "Apartment",
          numberOfRooms: 1,
          floorSize: {
            "@type": "QuantitativeValue",
            value: "850",
            unitCode: "SQF",
          },
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Accommodation",
          name: "Two Bedroom Luxury Apartments",
          description:
            "Spacious two bedroom apartments with premium finishes in Faisal Hills - 1600 sq ft",
          accommodationCategory: "Apartment",
          numberOfRooms: 2,
          floorSize: {
            "@type": "QuantitativeValue",
            value: "1600",
            unitCode: "SQF",
          },
        },
      },
    ],
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+923330777775",
      email: "info@altafdevelopments.com",
      contactType: "customer service",
      areaServed: "PK",
      availableLanguage: "en-US",
      serviceArea: {
        "@type": "Place",
        name: "Islamabad, Pakistan",
      },
      hoursAvailable: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "09:00",
        closes: "18:00",
      },
    },
    {
      "@type": "ContactPoint",
      telephone: "+923330777775",
      contactType: "sales",
      areaServed: "PK",
      availableLanguage: "en-US",
      serviceArea: {
        "@type": "Place",
        name: "Faisal Hills, Islamabad",
      },
    },
  ],
  sameAs: [
    "https://www.facebook.com/altafdevelopments",
    "https://x.com/Altafdevelpmnts",
    "https://www.instagram.com/altafdevelopments",
    "https://www.youtube.com/@Altafdevelopmentspk",
    "https://www.pinterest.com/altafdevelopmentspk/",
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://altafdevelopments.com/#website",
  url: "https://altafdevelopments.com/",
  name: "Altaf Developments - Luxury Apartments in Faisal Hills Islamabad",
  description:
    "Premium one and two bedroom apartments in Faisal Hills, Islamabad. Exceptional luxury living spaces by Altaf Developments.",
  inLanguage: "en-US",
  publisher: {
    "@id": "https://altafdevelopments.com/#organization",
  },
};

const getBreadcrumbSchema = (pageType: string, propertyData?: StructuredDataProps["propertyData"]) => {
  const breadcrumbMap: Record<string, Array<{name: string, url: string}>> = {
    home: [{ name: "Home", url: "https://altafdevelopments.com/" }],
    about: [
      { name: "Home", url: "https://altafdevelopments.com/" },
      { name: "About Us", url: "https://altafdevelopments.com/about" },
    ],
    contact: [
      { name: "Home", url: "https://altafdevelopments.com/" },
      { name: "Contact", url: "https://altafdevelopments.com/contact" },
    ],
    blogs: [
      { name: "Home", url: "https://altafdevelopments.com/" },
      { name: "Blogs", url: "https://altafdevelopments.com/blogs" },
    ],
    media: [
      { name: "Home", url: "https://altafdevelopments.com/" },
      { name: "Media", url: "https://altafdevelopments.com/media" },
    ],
    "property-detail": [
      { name: "Home", url: "https://altafdevelopments.com/" },
      { name: "Properties", url: "https://altafdevelopments.com/property-detail" },
      // Add specific property name if available
      ...(propertyData ? [{ name: propertyData.name, url: "https://altafdevelopments.com/property-detail" }] : []),
    ],
  };

  const breadcrumbs = breadcrumbMap[pageType];
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
        url: item.url,
      },
    })),
  };
};

const getPropertySchema = (
  propertyData: StructuredDataProps["propertyData"]
) => {
  if (!propertyData) return null;

  const numberOfRooms = propertyData.propertyType === "one-bed" ? 1 : 2;
  const floorSize = propertyData.propertyType === "one-bed" ? "850" : "1600";
  const estimatedOccupancy = propertyData.propertyType === "one-bed" ? 2 : 4;

  // Use provided images if available, otherwise use curated default images based on property type
  const propertyImages = 
    propertyData.images && propertyData.images.length > 0
      ? propertyData.images.map((imageUrl, index) => ({
          "@type": "ImageObject",
          url: imageUrl + "?f_auto,q_auto,w_800,h_600",
          width: 800,
          height: 600,
          caption: `${propertyData.name} - Interior View ${index + 1}`,
          description: `Interior view of ${propertyData.name} showing premium finishes and modern design`,
        }))
      : propertyData.propertyType === "one-bed"
      ? [
          {
            "@type": "ImageObject",
            url: "https://res.cloudinary.com/dqv6swyul/image/upload/f_auto,q_auto,w_800,h_600/v1753518957/One_Bed_Bathroom_sxuabb.jpg",
            width: 800,
            height: 600,
            caption: "One bedroom apartment - Premium bathroom with modern fixtures",
            description: "Luxury bathroom featuring contemporary design, quality fixtures, and elegant tiling",
          },
          {
            "@type": "ImageObject",
            url: "https://res.cloudinary.com/dqv6swyul/image/upload/f_auto,q_auto,w_800,h_600/v1753518957/One_Bed_Feature_bdk9at.jpg",
            width: 800,
            height: 600,
            caption: "One bedroom apartment - Modern living space with premium amenities",
            description: "Spacious one bedroom apartment interior showcasing open-plan living and modern furnishings",
          },
        ]
      : [
          {
            "@type": "ImageObject",
            url: "https://res.cloudinary.com/dqv6swyul/image/upload/f_auto,q_auto,w_800,h_600/v1753518989/two_bed_Tv_Lounge_ihucwo.jpg",
            width: 800,
            height: 600,
            caption: "Two bedroom apartment - Spacious TV lounge with comfortable seating",
            description: "Comfortable living room space in two bedroom luxury apartment with entertainment area",
          },
          {
            "@type": "ImageObject",
            url: "https://res.cloudinary.com/dqv6swyul/image/upload/f_auto,q_auto,w_800,h_600/v1753518985/Two_Bed_Kitchen_ptkuis.jpg",
            width: 800,
            height: 600,
            caption: "Two bedroom apartment - Modern kitchen with premium appliances",
            description: "Fully equipped kitchen featuring high-end appliances, ample storage, and contemporary design",
          },
        ];

  // FIXED: Use single @type instead of array to avoid confusion
  return {
    "@context": "https://schema.org",
    "@type": "Accommodation", // Single type instead of array
    "@id": `https://altafdevelopments.com/property-detail/${encodeURIComponent(propertyData.name.toLowerCase().replace(/\s+/g, '-'))}#accommodation`,
    name: propertyData.name,
    description: propertyData.description,
    image: propertyImages,
    accommodationCategory: "Apartment",
    numberOfRooms: numberOfRooms,
    occupancy: estimatedOccupancy,
    floorSize: {
      "@type": "QuantitativeValue",
      value: floorSize,
      unitCode: "SQF",
    },
    ...(propertyData.features && {
      amenityFeature: propertyData.features.map((feature) => ({
        "@type": "LocationFeatureSpecification",
        name: feature,
        value: true,
      })),
    }),
    address: {
      "@type": "PostalAddress",
      addressLocality: propertyData.location,
      addressRegion: "Islamabad Capital Territory",
      addressCountry: "PK",
    },
    containedInPlace: {
      "@type": "Residence",
      name: "Faisal Hills",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Islamabad",
        addressRegion: "Islamabad Capital Territory",
        addressCountry: "PK",
      },
    },
    landlord: {
      "@id": "https://altafdevelopments.com/#organization",
    },
  };
};

// FIXED: Better unique key generation function
const getUniqueSchemaKey = (schema: any, index: number): string => {
  const type = Array.isArray(schema["@type"]) ? schema["@type"][0] : schema["@type"];
  const id = schema["@id"] ? schema["@id"].split("#")[1] || schema["@id"].split("/").pop() : "";
  return `${type}-${id}-${index}`.replace(/[^a-zA-Z0-9-]/g, "-");
};

const StructuredData = ({ pageType, propertyData }: StructuredDataProps) => {
  const schemas: any[] = [];

  // Always include core schemas
  schemas.push(corporationData);
  schemas.push(websiteSchema);

  // Add breadcrumb schema
  const breadcrumbSchema = getBreadcrumbSchema(pageType, propertyData);
  if (breadcrumbSchema) {
    schemas.push(breadcrumbSchema);
  }

  // Add property schema if provided
  const propertySchema = getPropertySchema(propertyData);
  if (propertySchema) {
    schemas.push(propertySchema);
  }

  return (
    <>
      {schemas.map((schema, index) => {
        const uniqueKey = getUniqueSchemaKey(schema, index);
        return (
          <Script
            key={uniqueKey}
            id={`structured-data-${uniqueKey}`}
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(schema, null, 0),
            }}
            strategy="afterInteractive"
          />
        );
      })}
    </>
  );
};

export default StructuredData;