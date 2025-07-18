// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";
// import React, {
//   useState,
//   useEffect,
//   useRef,
//   useCallback,
//   useMemo,
// } from "react";
// import { motion } from "framer-motion";
// import {
//   MapPin,
//   Search,
//   Filter,
//   X,
//   Bed,
//   Bath,
//   Ruler,
//   Phone,
//   Mail,
// } from "lucide-react";
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import Image from "next/image";
// import { Property } from "@/lib/mapConstants/types";
// import { properties, mapLayers } from "@/data/properties";
// import { GlobalStyles } from "./styles";

// // Import optimized animations
// import {
//   fadeInUp,
//   fadeInLeft,
//   fadeInRight,
//   slideInFromBottom,
//   microSlide,
//   cardHover,
//   quickFade,
//   batchStaggerContainer,
//   batchStaggerItem,
//   viewportOnce,
//   viewportDefault,
//   delays,
//   shouldAnimate,
//   getPerformanceMode,
//   animationMetrics,
//   deferredAnimation,
//   createLazyAnimation
// } from "@/lib/constants";

// interface LeafletMap {
//   setView: (coordinates: [number, number], zoom: number) => void;
//   eachLayer: (callback: (layer: LeafletLayer) => void) => void;
//   removeLayer: (layer: LeafletLayer) => void;
// }

// interface LeafletLayer {
//   _url?: string;
//   addTo: (map: LeafletMap) => LeafletLayer;
//   bindPopup?: (content: string, options?: PopupOptions) => LeafletMarker;
//   on?: (event: string, callback: () => void) => void;
// }

// interface LeafletMarker extends LeafletLayer {
//   bindPopup: (content: string, options?: PopupOptions) => LeafletMarker;
//   on: (event: string, callback: () => void) => void;
// }

// interface PopupOptions {
//   maxWidth?: number;
//   className?: string;
// }

// interface MapLayer {
//   name: string;
//   url: string;
//   attribution: string;
// }

// interface GeolocationCoordinates {
//   latitude: number;
//   longitude: number;
// }

// interface GeolocationPosition {
//   coords: GeolocationCoordinates;
// }

// interface FilterState {
//   minPrice?: number;
//   maxPrice?: number;
//   minBeds?: number;
//   maxBeds?: number;
//   propertyType?: string;
// }

// declare global {
//   interface Window {
//     L: {
//       map: (element: HTMLElement, options: MapOptions) => LeafletMap;
//       tileLayer: (url: string, options: TileLayerOptions) => LeafletLayer;
//       marker: (
//         coordinates: [number, number],
//         options?: MarkerOptions
//       ) => LeafletMarker;
//       divIcon: (options: DivIconOptions) => any;
//     };
//     selectProperty: (propertyId: number) => void;
//   }
// }

// interface MapOptions {
//   center: [number, number];
//   zoom: number;
//   zoomControl: boolean;
//   scrollWheelZoom: boolean;
// }

// interface TileLayerOptions {
//   attribution: string;
//   maxZoom: number;
// }

// interface MarkerOptions {
//   icon?: any;
// }

// interface DivIconOptions {
//   className: string;
//   html: string;
//   iconSize: [number, number];
//   iconAnchor: [number, number];
//   popupAnchor?: [number, number];
// }

// type MapStyleKey = keyof typeof mapLayers;

// const RealEstateLeafletMap: React.FC = () => {
//   const [map, setMap] = useState<LeafletMap | null>(null);
//   const [markers, setMarkers] = useState<LeafletMarker[]>([]);
//   const [selectedProperty, setSelectedProperty] = useState<Property | null>(
//     null
//   );
//   const [searchValue, setSearchValue] = useState<string>("");
//   const [showFilters, setShowFilters] = useState<boolean>(true);
//   const [userLocation, setUserLocation] = useState<[number, number] | null>(
//     null
//   );
//   const [isLoading, setIsLoading] = useState<boolean>(true);
//   const [mapStyle, setMapStyle] = useState<MapStyleKey>("street");
//   const [filters] = useState<FilterState>({});
//   const mapRef = useRef<HTMLDivElement>(null);

//   // Performance-aware animation configurations
//   const headerAnimation = useMemo(() => createLazyAnimation(fadeInUp), []);
//   const searchAnimation = useMemo(() => deferredAnimation(microSlide), []);
//   const mapAnimation = useMemo(() => createLazyAnimation(fadeInLeft), []);
//   const sidebarAnimation = useMemo(() => createLazyAnimation(fadeInRight), []);
//   const modalAnimation = useMemo(() => shouldAnimate() ? slideInFromBottom : quickFade, []);

//   // Track animation performance
//   useEffect(() => {
//     const performanceMode = getPerformanceMode();
//     const isAnimating = shouldAnimate();
//     animationMetrics.track('component-load', !isAnimating);
    
//     if (performanceMode === 'slow' || performanceMode === 'disabled') {
//       console.log('Real Estate Map: Using optimized animations for performance');
//     }
//   }, []);

//   const getBadgeText = useCallback((badge: string): string => {
//     switch (badge) {
//       case "New Listing":
//         return "NEW";
//       case "Premium":
//         return "VIP";
//       default:
//         return "HOT";
//     }
//   }, []);

//   const createPropertyIcon = useCallback(
//     (property: Property) => {
//       if (!window.L) return null;

//       return window.L.divIcon({
//         className: "property-marker",
//         html: `
//         <div style="
//           position: relative;
//           width: 40px;
//           height: 40px;
//           background: #8B2131;
//           border: 3px solid white;
//           border-radius: 50%;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           box-shadow: 0 4px 12px rgba(139, 33, 49, 0.4);
//           cursor: pointer;
//           transform: scale(1);
//           transition: transform 0.2s ease;
//         ">
//           <svg width="16" height="16" fill="white" viewBox="0 0 24 24">
//             <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
//           </svg>
//           <div style="
//             position: absolute;
//             top: -8px;
//             right: -8px;
//             background: #DC2626;
//             color: white;
//             border-radius: 10px;
//             padding: 2px 6px;
//             font-size: 10px;
//             font-weight: bold;
//             min-width: 16px;
//             text-align: center;
//           ">${getBadgeText(property.badge)}</div>
//         </div>
//       `,
//         iconSize: [40, 40],
//         iconAnchor: [20, 40],
//         popupAnchor: [0, -35],
//       });
//     },
//     [getBadgeText]
//   );

//   const createPopupContent = useCallback((property: Property): string => {
//     return `
//       <div style="max-width: 280px; font-family: system-ui; padding: 8px;">
//         <img src="${property.image}" alt="${property.title}" style="width: 100%; height: 120px; object-fit: cover; border-radius: 8px; margin-bottom: 8px;"/>
//         <div style="background: #8B2131; color: white; padding: 2px 8px; border-radius: 12px; font-size: 10px; font-weight: bold; display: inline-block; margin-bottom: 8px;">
//           ${property.badge}
//         </div>
//         <h3 style="margin: 0 0 6px 0; color: #8B2131; font-size: 16px; font-weight: bold; line-height: 1.2;">${property.title}</h3>
//         <p style="margin: 0 0 8px 0; color: #666; font-size: 13px;">📍 ${property.location}</p>
//         <div style="display: flex; gap: 12px; margin-bottom: 8px; font-size: 11px; color: #666;">
//           <span style="display: flex; align-items: center; gap: 2px;">🛏️ ${property.beds} Beds</span>
//           <span style="display: flex; align-items: center; gap: 2px;">🛁 ${property.baths} Baths</span>
//           <span style="display: flex; align-items: center; gap: 2px;">📐 ${property.sqft} sqft</span>
//         </div>
//         <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 8px;">
//           <span style="font-size: 18px; font-weight: bold; color: #8B2131;">${property.price}</span>
//           <button onclick="window.selectProperty(${property.id})" style="
//             background: #8B2131; 
//             color: white; 
//             border: none; 
//             padding: 6px 12px; 
//             border-radius: 6px; 
//             cursor: pointer; 
//             font-size: 11px; 
//             font-weight: 500;
//             transition: background 0.2s;
//           " onmouseover="this.style.background='#7A1C2A'" onmouseout="this.style.background='#8B2131'">
//             View Details
//           </button>
//         </div>
//       </div>
//     `;
//   }, []);

//   const getUserLocation = useCallback((): void => {
//     if (!navigator.geolocation) return;

//     navigator.geolocation.getCurrentPosition(
//       (position: GeolocationPosition) => {
//         const userPos: [number, number] = [
//           position.coords.latitude,
//           position.coords.longitude,
//         ];
//         setUserLocation(userPos);

//         if (map && window.L) {
//           map.setView(userPos, 13);

//           const userIcon = window.L.divIcon({
//             className: "user-location-marker",
//             html: `
//               <div style="
//                 width: 20px; 
//                 height: 20px; 
//                 background: #3B82F6; 
//                 border: 3px solid white; 
//                 border-radius: 50%; 
//                 box-shadow: 0 2px 8px rgba(0,0,0,0.3);
//               "></div>
//             `,
//             iconSize: [20, 20],
//             iconAnchor: [10, 10],
//           });

//           if (window.L) {
//             const marker = window.L.marker(userPos, { icon: userIcon }).addTo(
//               map
//             );
//             if (marker) {
//               (marker as LeafletMarker).bindPopup("Your Location");
//             }
//           }
//         }
//       },
//       (error: GeolocationPositionError) => {
//         console.error("Geolocation error:", error);
//       }
//     );
//   }, [map]);

//   const addPropertyMarkers = useCallback(
//     (leafletMap: LeafletMap): void => {
//       if (!window.L) return;

//       const newMarkers: LeafletMarker[] = properties
//         .filter(
//           (
//             property
//           ): property is Property & { coordinates: [number, number] } =>
//             property.coordinates !== undefined
//         )
//         .map((property) => {
//           const propertyIcon = createPropertyIcon(property);
//           if (!propertyIcon) return null;

//           const marker = window.L.marker(property.coordinates, {
//             icon: propertyIcon,
//           }).addTo(leafletMap);

//           const popupContent = createPopupContent(property);

//           (marker as LeafletMarker).bindPopup(popupContent, {
//             maxWidth: 300,
//             className: "custom-popup",
//           });

//           (marker as LeafletMarker).on("click", () => {
//             setSelectedProperty(property as Property);
//           });

//           return marker;
//         })
//         .filter((marker): marker is LeafletMarker => marker !== null);

//       setMarkers(newMarkers);
//     },
//     [createPropertyIcon, createPopupContent]
//   );

//   const initializeMap = useCallback((): void => {
//     if (!mapRef.current || !window.L) return;

//     const defaultCenter: [number, number] = userLocation || [40.758, -73.9855];

//     const leafletMap = window.L.map(mapRef.current, {
//       center: defaultCenter,
//       zoom: 12,
//       zoomControl: true,
//       scrollWheelZoom: true,
//     });

//     const currentMapLayer = mapLayers[mapStyle] as MapLayer;
//     window.L.tileLayer(currentMapLayer.url, {
//       attribution: currentMapLayer.attribution,
//       maxZoom: 19,
//     }).addTo(leafletMap);

//     setMap(leafletMap);
//     addPropertyMarkers(leafletMap);
//     setIsLoading(false);
//   }, [userLocation, mapStyle, addPropertyMarkers]);

//   const loadLeaflet = useCallback(async (): Promise<void> => {
//     if (typeof window === "undefined") return;

//     if (!window.L) {
//       const link = document.createElement("link");
//       link.rel = "stylesheet";
//       link.href =
//         "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css";
//       document.head.appendChild(link);

//       const script = document.createElement("script");
//       script.src =
//         "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js";
//       script.onload = initializeMap;
//       document.head.appendChild(script);
//     } else {
//       initializeMap();
//     }
//   }, [initializeMap]);

//   const filteredProperties = useMemo((): Property[] => {
//     return properties.filter((property) => {
//       if (!property.coordinates) return false;

//       const matchesSearch =
//         property.title.toLowerCase().includes(searchValue.toLowerCase()) ||
//         property.location.toLowerCase().includes(searchValue.toLowerCase());

//       const matchesFilters =
//         Object.keys(filters).length === 0 ||
//         ((!filters.minBeds || property.beds >= filters.minBeds) &&
//           (!filters.maxBeds || property.beds <= filters.maxBeds));

//       return matchesSearch && matchesFilters;
//     });
//   }, [searchValue, filters]);

//   const handlePropertyClick = useCallback(
//     (property: Property): void => {
//       setSelectedProperty(property);
//       if (map && property.coordinates) {
//         map.setView(property.coordinates, 15);
//       }
//     },
//     [map]
//   );

//   const handleMapStyleChange = useCallback(
//     (e: React.ChangeEvent<HTMLSelectElement>): void => {
//       setMapStyle(e.target.value as MapStyleKey);
//     },
//     []
//   );

//   const handleSearchChange = useCallback(
//     (e: React.ChangeEvent<HTMLInputElement>): void => {
//       setSearchValue(e.target.value);
//     },
//     []
//   );

//   useEffect(() => {
//     loadLeaflet();
//   }, [loadLeaflet]);

//   useEffect(() => {
//     window.selectProperty = (propertyId: number) => {
//       const property = properties.find((p) => p.id === propertyId);
//       if (property) {
//         setSelectedProperty(property as Property);
//       }
//     };

//     return () => {
//       if ("selectProperty" in window) {
//         delete (window as any).selectProperty;
//       }
//     };
//   }, []);

//   useEffect(() => {
//     if (!map || !window.L) return;

//     map.eachLayer((layer: LeafletLayer) => {
//       if (layer._url) {
//         map.removeLayer(layer);
//       }
//     });

//     const currentMapLayer = mapLayers[mapStyle] as MapLayer;
//     window.L.tileLayer(currentMapLayer.url, {
//       attribution: currentMapLayer.attribution,
//       maxZoom: 19,
//     }).addTo(map);

//     markers.forEach((marker) => marker.addTo(map));
//   }, [mapStyle, map, markers]);

//   return (
//     <>
//       <GlobalStyles />

//       <section className="py-12 sm:py-16 lg:py-24 px-4 sm:px-6 lg:px-16">
//         <div className=" mx-auto">
//           {/* Optimized Header Animation */}
//           <motion.div
//             className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 sm:mb-12 gap-6"
//             {...headerAnimation}
//             viewport={viewportOnce}
//           >
//             <motion.div
//               {...fadeInLeft}
//               viewport={viewportOnce}
//               transition={{ ...fadeInLeft.transition, delay: delays.medium }}
//             >
//               <h2 className="text-2xl sm:text-3xl dark:text-white mb-2">
//                 EXPLORE PROPERTIES
//               </h2>
//               <motion.div
//                 className="w-16 sm:w-20 h-1 bg-gradient-to-r from-[#8B2131] to-[#B91C1C] rounded-full"
//                 initial={{ scaleX: shouldAnimate() ? 0 : 1 }}
//                 whileInView={{ scaleX: 1 }}
//                 viewport={viewportOnce}
//                 transition={{
//                   duration: shouldAnimate() ? 0.8 : 0,
//                   delay: shouldAnimate() ? delays.medium : 0,
//                   ease: "easeOut",
//                 }}
//                 style={{ transformOrigin: "left" }}
//               />
//             </motion.div>

//             <motion.div
//               className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto"
//               {...fadeInRight}
//               viewport={viewportOnce}
//               transition={{ ...fadeInRight.transition, delay: delays.medium }}
//             >
//               <Button
//                 onClick={getUserLocation}
//                 className="bg-[#8B2131] hover:bg-[#7A1C2A] text-white w-full sm:w-auto"
//               >
//                 <MapPin className="h-4 w-4 mr-2" />
//                 My Location
//               </Button>

//               <select
//                 value={mapStyle}
//                 onChange={handleMapStyleChange}
//                 className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B2131] dark:bg-gray-900 dark:border-gray-600 dark:text-white w-full sm:w-auto"
//                 aria-label="Map style selector"
//               >
//                 {Object.entries(mapLayers).map(([key, layer]) => (
//                   <option key={key} value={key}>
//                     {(layer as MapLayer).name}
//                   </option>
//                 ))}
//               </select>

//               <Button
//                 variant="outline"
//                 onClick={() => setShowFilters(!showFilters)}
//                 className="border-[#8B2131] dark:bg-gray-900 hover:bg-[#8B2131] hover:text-white w-full sm:w-auto"
//               >
//                 <Filter className="h-4 w-4 mr-2" />
//                 Filters
//               </Button>
//             </motion.div>
//           </motion.div>

//           {/* Optimized Search Animation */}
//           <motion.div
//             className="mb-6 sm:mb-8"
//             {...searchAnimation}
//             viewport={viewportDefault}
//           >
//             <div className="relative">
//               <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
//               <input
//                 type="text"
//                 placeholder="Search properties by name or location..."
//                 value={searchValue}
//                 onChange={handleSearchChange}
//                 className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B2131] focus:border-transparent dark:bg-gray-900 dark:border-gray-600 dark:text-white text-sm sm:text-base"
//                 aria-label="Search properties"
//               />
//             </div>
//           </motion.div>

//           <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
//             {/* Optimized Map Animation */}
//             <motion.div
//               className="xl:col-span-2 h-[400px] sm:h-[500px] lg:h-[600px] rounded-xl overflow-hidden shadow-lg relative order-2 xl:order-1"
//               {...mapAnimation}
//               viewport={viewportDefault}
//             >
//               {isLoading && (
//                 <div className="absolute inset-0 bg-gray-100 dark:bg-gray-900 flex items-center justify-center z-10">
//                   <div className="text-center">
//                     <div className="animate-spin rounded-full h-8 sm:h-12 w-8 sm:w-12 border-b-2 border-[#8B2131] mx-auto mb-4"></div>
//                     <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
//                       Loading map...
//                     </p>
//                   </div>
//                 </div>
//               )}
//               <div ref={mapRef} className="w-full h-full" />
//             </motion.div>

//             {/* Optimized Sidebar with Staggered Properties */}
//             <motion.div
//               className="space-y-4 max-h-[400px] sm:max-h-[500px] lg:max-h-[600px] overflow-y-auto order-1 xl:order-2"
//               {...sidebarAnimation}
//               viewport={viewportDefault}
//             >
//               <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-4 sticky top-0 bg-white dark:bg-gray-900 py-2 z-10">
//                 Featured Properties ({filteredProperties.length})
//               </h3>

//               {/* Batch Staggered Property List */}
//               <motion.div
//                 {...batchStaggerContainer}
//                 viewport={viewportDefault}
//               >
//                 {filteredProperties.map((property) => (
//                   <motion.div
//                     key={property.id}
//                     {...batchStaggerItem}
//                     {...(shouldAnimate() ? cardHover : {})}
//                     className="cursor-pointer"
//                     onClick={() => handlePropertyClick(property as Property)}
//                     onAnimationComplete={() => {
//                       animationMetrics.track(`property-${property.id}`, !shouldAnimate());
//                     }}
//                   >
//                     <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 dark:bg-gray-900">
//                       <CardContent className="p-3 sm:p-4">
//                         <div className="flex gap-3 sm:gap-4">
//                           <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0">
//                             <Image
//                               src={property.image}
//                               alt={property.title}
//                               fill
//                               sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
//                               className="object-cover rounded-lg"
//                             />
//                             <Badge className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-[#8B2131] text-white text-xs">
//                               {getBadgeText(property.badge)}
//                             </Badge>
//                           </div>
//                           <div className="flex-1 min-w-0">
//                             <h4 className="font-bold text-gray-900 dark:text-white text-sm sm:text-base truncate">
//                               {property.title}
//                             </h4>
//                             <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm mb-2 truncate">
//                               📍 {property.location}
//                             </p>
//                             <div className="flex items-center gap-2 sm:gap-3 text-xs text-gray-500 dark:text-gray-400 mb-2">
//                               <span className="flex items-center">
//                                 <Bed className="h-3 w-3 mr-1" />
//                                 {property.beds}
//                               </span>
//                               <span className="flex items-center">
//                                 <Bath className="h-3 w-3 mr-1" />
//                                 {property.baths}
//                               </span>
//                               <span className="flex items-center">
//                                 <Ruler className="h-3 w-3 mr-1" />
//                                 {property.sqft}
//                               </span>
//                             </div>
//                             <div className="font-bold text-[#8B2131] dark:text-red-400 text-sm sm:text-base">
//                               {property.price}
//                             </div>
//                           </div>
//                         </div>
//                       </CardContent>
//                     </Card>
//                   </motion.div>
//                 ))}
//               </motion.div>
//             </motion.div>
//           </div>

//           {/* Optimized Selected Property Modal */}
//           {selectedProperty && (
//             <motion.div
//               className="mt-6 sm:mt-8"
//               {...modalAnimation}
//               onAnimationComplete={() => {
//                 animationMetrics.track('property-modal', !shouldAnimate());
//               }}
//             >
//               <Card className="overflow-hidden dark:bg-gray-900">
//                 <CardContent className="p-4 sm:p-6">
//                   <div className="flex justify-between items-start mb-4">
//                     <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white pr-4">
//                       {selectedProperty.title}
//                     </h3>
//                     <Button
//                       variant="ghost"
//                       size="sm"
//                       onClick={() => setSelectedProperty(null)}
//                       className="flex-shrink-0"
//                       aria-label="Close property details"
//                     >
//                       <X className="h-4 w-4" />
//                     </Button>
//                   </div>

//                   <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//                     <div>
//                       <Image
//                         src={selectedProperty.image}
//                         alt={selectedProperty.title}
//                         width={400}
//                         height={256}
//                         className="w-full h-48 sm:h-56 lg:h-64 object-cover rounded-lg mb-4"
//                         priority
//                       />
//                       <div className="flex items-center gap-3 sm:gap-4 dark:text-white mb-4 text-sm sm:text-base">
//                         <span className="flex items-center">
//                           <Bed className="h-4 w-4 mr-1" />
//                           {selectedProperty.beds} Beds
//                         </span>
//                         <span className="flex items-center">
//                           <Bath className="h-4 w-4 mr-1" />
//                           {selectedProperty.baths} Baths
//                         </span>
//                         <span className="flex items-center">
//                           <Ruler className="h-4 w-4 mr-1" />
//                           {selectedProperty.sqft} sqft
//                         </span>
//                       </div>
//                       <div className="text-xl sm:text-2xl font-bold text-[#8B2131] dark:text-red-400">
//                         {selectedProperty.price}
//                       </div>
//                     </div>

//                     <div>
//                       <h4 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-3">
//                         Contact Agent
//                       </h4>
//                       <div className="space-y-3">
//                         <div className="flex items-center gap-3">
//                           <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#8B2131] rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-base">
//                             {selectedProperty.agent.name.charAt(0)}
//                           </div>
//                           <div>
//                             <div className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">
//                               {selectedProperty.agent.name}
//                             </div>
//                             <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
//                               Real Estate Agent
//                             </div>
//                           </div>
//                         </div>

//                         <div className="space-y-2">
//                           <a
//                             href={`tel:${selectedProperty.agent.phone}`}
//                             className="flex items-center gap-2 text-[#8B2131] hover:underline text-sm sm:text-base"
//                           >
//                             <Phone className="h-4 w-4" />
//                             {selectedProperty.agent.phone}
//                           </a>
//                           <a
//                             href={`mailto:${selectedProperty.agent.email}`}
//                             className="flex items-center gap-2 text-[#8B2131] hover:underline text-sm sm:text-base break-all"
//                           >
//                             <Mail className="h-4 w-4 flex-shrink-0" />
//                             {selectedProperty.agent.email}
//                           </a>
//                         </div>

//                        <div className="flex flex-col sm:flex-row gap-2 pt-4">
//                           <Button className="flex-1 bg-[#8B2131] text-white hover:bg-[#7A1C2A]">
//                             Schedule Tour
//                           </Button>
//                           <Button 
//                             variant="outline" 
//                             className="flex-1 border-[#8B2131] text-[#8B2131] hover:bg-[#8B2131] hover:text-white"
//                           >
//                             Save Property
//                           </Button>
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
//                     <h4 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-3">
//                       Property Details
//                     </h4>
//                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm sm:text-base">
//                       <div>
//                         <span className="text-gray-600 dark:text-gray-300">Type:</span>
//                         <span className="ml-2 font-medium text-gray-900 dark:text-white">
//                           {selectedProperty.type || 'Residential'}
//                         </span>
//                       </div>
//                       <div>
//                         <span className="text-gray-600 dark:text-gray-300">Year Built:</span>
//                         <span className="ml-2 font-medium text-gray-900 dark:text-white">
//                           {selectedProperty.yearBuilt || '2020'}
//                         </span>
//                       </div>
//                       <div>
//                         <span className="text-gray-600 dark:text-gray-300">Parking:</span>
//                         <span className="ml-2 font-medium text-gray-900 dark:text-white">
//                           {selectedProperty.parking || '2 spaces'}
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             </motion.div>
//           )}

//           {/* Filters Panel */}
//           {showFilters && (
//             <motion.div
//               className="mt-6 sm:mt-8"
//               initial={{ opacity: 0, height: 0 }}
//               animate={{ opacity: 1, height: "auto" }}
//               exit={{ opacity: 0, height: 0 }}
//               transition={{ duration: 0.3 }}
//             >
//               <Card className="dark:bg-gray-900 shadow-xl">
//                 <CardContent className="p-4 sm:p-6">
//                   <div className="flex justify-between items-center mb-4">
//                     <h3 className="text-lg sm:text-xl dark:text-white">
//                       Filter Properties
//                     </h3>
//                     <Button
//                       variant="ghost"
//                       size="sm"
//                       onClick={() => setShowFilters(false)}
//                       aria-label="Close filters"
//                     >
//                       <X className="h-4 w-4" />
//                     </Button>
//                   </div>

//                   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//                     <div>
//                       <label className="block text-sm font-bold dark:text-gray-300 mb-2">
//                         Min Price
//                       </label>
//                       <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B2131] dark:bg-gray-800 dark:border-gray-600 dark:text-white">
//                         <option value="">Any</option>
//                         <option value="500000">$500,000+</option>
//                         <option value="1000000">$1,000,000+</option>
//                         <option value="2000000">$2,000,000+</option>
//                       </select>
//                     </div>

//                     <div>
//                       <label className="block text-sm font-bold dark:text-gray-300 mb-2">
//                         Max Price
//                       </label>
//                       <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B2131] dark:bg-gray-800 dark:border-gray-600 dark:text-white">
//                         <option value="">Any</option>
//                         <option value="1000000">$1,000,000</option>
//                         <option value="2000000">$2,000,000</option>
//                         <option value="5000000">$5,000,000</option>
//                       </select>
//                     </div>

//                     <div>
//                       <label className="block text-sm font-bold dark:text-gray-300 mb-2">
//                         Bedrooms
//                       </label>
//                       <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B2131] dark:bg-gray-800 dark:border-gray-600 dark:text-white">
//                         <option value="">Any</option>
//                         <option value="1">1+</option>
//                         <option value="2">2+</option>
//                         <option value="3">3+</option>
//                         <option value="4">4+</option>
//                       </select>
//                     </div>

//                     <div>
//                       <label className="block text-sm font-bold dark:text-gray-300 mb-2">
//                         Property Type
//                       </label>
//                       <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B2131] dark:bg-gray-800 dark:border-gray-600 dark:text-white">
//                         <option value="">Any</option>
//                         <option value="house">House</option>
//                         <option value="apartment">Apartment</option>
//                         <option value="condo">Condo</option>
//                         <option value="townhouse">Townhouse</option>
//                       </select>
//                     </div>
//                   </div>

//                   <div className="flex justify-end gap-3 mt-6">
//                     <Button
//                       variant="outline"
//                       onClick={() => setShowFilters(false)}
//                       className="border-gray-300 dark:border-gray-600"
//                     >
//                       Clear Filters
//                     </Button>
//                     <Button
//                       className="bg-[#8B2131] text-white hover:bg-[#7A1C2A]"
//                       onClick={() => setShowFilters(false)}
//                     >
//                       Apply Filters
//                     </Button>
//                   </div>
//                 </CardContent>
//               </Card>
//             </motion.div>
//           )}
//         </div>
//       </section>
//     </>
//   );
// };

// export default RealEstateLeafletMap;