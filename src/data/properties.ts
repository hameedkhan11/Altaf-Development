import { 
  Delays, 
  ViewportOnce, 
  PropertySection, 
  // PropertyData, 
  Project, // Add this import
  PropertiesData
} from "@/lib/types";

export const delays: Delays = {
  small: 0.1,
  medium: 0.2,
  large: 0.3,
};

export const viewportOnce: ViewportOnce = {
  once: true,
};

export const propertySections: PropertySection[] = [
   {
    id: 'transactions',
    title: 'Grand Lobby',
    image: 'grand-lobby_awpfkg',
    alt: 'Modern room with fireplace and large windows'
  },
  {
    id: 'connect',
    title: "Dream suite",
    image: 'dream-suite_ez3xq0',
    alt: 'Elegant dining area with natural lighting'
  },
   {
    id: 'properties',
    title: 'Suite Bath',
    image: 'powder-room_akquqb',
    alt: 'Luxury living room with modern furniture'
  }
];


// Property data configuration - now using PropertiesData type (Record<PropertyKey, PropertyDetail>)
export const properties: PropertiesData = {
  "1bed": {
    name: "1 Bedroom Apartment",
    size: 850,
    rate: 16500,
    totalPrice: "PKR 14,000,000",
    downPayment: 3500000,
    quarterlyInstallment: 650000,
    bedrooms: 1,
    bathrooms: 1,
    type: "Apartment",
  },
  "2bed": {
    name: "2 Bedroom Apartment",
    size: 1600,
    rate: 16500,
    totalPrice: "PKR 26,400,000",
    downPayment: 6600000,
    quarterlyInstallment: 1200000,
    bedrooms: 2,
    bathrooms: 2,
    type: "Apartment",
  },
};

// Project data for listings - using Project interface
export const projectsData: Project[] = [
  {
    id: 1,
    title: "Modern Apartment",
    image: "imgi_20_istur_Neo-futuristic_house_with_pool_architecture_by_david_rock_997de75f-5df4-4851-89b3-9ab751d93bbf-min_ubf7zz",
    price: "PKR 14,000,000",
    bedrooms: 1,
    bathrooms: 1,
    propertyType: "1bed",
  },
  {
    id: 2,
    title: "Luxury Villa",
    image: "imgi_24_istur_Neo-futuristic_city_house_architecture_by_david_rockwell__4ac8dc3e-7c06-4cc4-b75f-8936a81b641e-min_kmn7ja",
    price: "PKR 26,400,000",
    bedrooms: 2,
    bathrooms: 2,
    propertyType: "2bed",
  },
];