// types/map.ts
export interface MapLocation {
  id: string;
  name: string;
  address: string;
  coordinates: [number, number]; // [lat, lng]
  type: 'office' | 'property' | 'landmark';
  description?: string;
  phone?: string;
  email?: string;
  website?: string;
  image?: string;
  price?: string;
  bedrooms?: number;
  bathrooms?: number;
  sqft?: number;
}

export interface MapConfig {
  center: [number, number];
  zoom: number;
  maxZoom: number;
  minZoom: number;
}

export interface MapProps {
  locations: MapLocation[];
  config?: Partial<MapConfig>;
  height?: string;
  className?: string;
  showControls?: boolean;
  enableClustering?: boolean;
}