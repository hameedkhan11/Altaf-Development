import { 
  Delays, 
  ViewportOnce, 
  PropertySection, 
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
    image: '/interior/interior (9).jpeg',
    alt: 'Modern room with fireplace and large windows'
  },
  {
    id: 'connect',
    title: "Dream suite",
    image: '/interior/interior (5).jpeg',
    alt: 'Elegant dining area with natural lighting'
  },
   {
    id: 'properties',
    title: 'Suite Bath',
    image: '/interior/powder room.jpeg',
    alt: 'Luxury living room with modern furniture'
  }
];
