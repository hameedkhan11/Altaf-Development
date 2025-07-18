// // utils/mapUtils.ts
// import { Property, LeafletMap } from '../types';
// import { LEAFLET_CSS_URL, LEAFLET_JS_URL } from '../mapConstants/types';

// // Load Leaflet library
// export const loadLeaflet = async (callback: () => void): Promise<void> => {
//   if (typeof window !== "undefined" && !window.L) {
//     // Load Leaflet CSS
//     const link = document.createElement("link");
//     link.rel = "stylesheet";
//     link.href = LEAFLET_CSS_URL;
//     document.head.appendChild(link);

//     // Load Leaflet JS
//     const script = document.createElement("script");
//     script.src = LEAFLET_JS_URL;
//     script.onload = callback;
//     document.head.appendChild(script);
//   } else if (window.L) {
//     callback();
//   }
// };

// // Get user's current location
// export const getUserLocation = (
//   map: LeafletMap | null,
//   setUserLocation: (location: [number, number]) => void
// ): void => {
//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         const userPos: [number, number] = [position.coords.latitude, position.coords.longitude];
//         setUserLocation(userPos);
        
//         if (map) {
//           map.setView(userPos, 13);

//           // Add user location marker
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

//           window.L.marker(userPos, { icon: userIcon })
//             .addTo(map)
//             .bindPopup("Your Location")
//             .openPopup();
//         }
//       },
//       (error) => {
//         console.error("Geolocation error:", error);
//       }
//     );
//   }
// };

// // Create property marker icon
// export const createPropertyIcon = (property: Property) => {
//   const badgeText = property.badge === "New Listing" 
//     ? "NEW" 
//     : property.badge === "Premium" 
//     ? "VIP" 
//     : "HOT";

//   return window.L.divIcon({
//     className: "property-marker",
//     html: `
//       <div style="
//         position: relative;
//         width: 40px;
//         height: 40px;
//         background: #8B2131;
//         border: 3px solid white;
//         border-radius: 50%;
//         display: flex;
//         align-items: center;
//         justify-content: center;
//         box-shadow: 0 4px 12px rgba(139, 33, 49, 0.4);
//         cursor: pointer;
//         transform: scale(1);
//         transition: transform 0.2s ease;
//       ">
//         <svg width="16" height="16" fill="white" viewBox="0 0 24 24">
//           <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
//         </svg>
//         <div style="
//           position: absolute;
//           top: -8px;
//           right: -8px;
//           background: #DC2626;
//           color: white;
//           border-radius: 10px;
//           padding: 2px 6px;
//           font-size: 10px;
//           font-weight: bold;
//           min-width: 16px;
//           text-align: center;
//         ">${badgeText}</div>
//       </div>
//     `,
//     iconSize: [40, 40],
//     iconAnchor: [20, 40],
//     popupAnchor: [0, -35],
//   });
// };

// // Create popup content for property
// export const createPopupContent = (property: Property): string => {
//   return `
//     <div style="max-width: 280px; font-family: system-ui; padding: 8px;">
//       <img src="${property.image}" alt="${property.title}" style="width: 100%; height: 120px; object-fit: cover; border-radius: 8px; margin-bottom: 8px;"/>
//       <div style="background: #8B2131; color: white; padding: 2px 8px; border-radius: 12px; font-size: 10px; font-weight: bold; display: inline-block; margin-bottom: 8px;">
//         ${property.badge}
//       </div>
//       <h3 style="margin: 0 0 6px 0; color: #8B2131; font-size: 16px; font-weight: bold; line-height: 1.2;">${property.title}</h3>
//       <p style="margin: 0 0 8px 0; color: #666; font-size: 13px;">📍 ${property.location}</p>
//       <div style="display: flex; gap: 12px; margin-bottom: 8px; font-size: 11px; color: #666;">
//         <span style="display: flex; align-items: center; gap: 2px;">🛏️ ${property.beds} Beds</span>
//         <span style="display: flex; align-items: center; gap: 2px;">🛁 ${property.baths} Baths</span>
//         <span style="display: flex; align-items: center; gap: 2px;">📐 ${property.sqft} sqft</span>
//       </div>
//       <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 8px;">
//         <span style="font-size: 18px; font-weight: bold; color: #8B2131;">${property.price}</span>
//         <button onclick="window.selectProperty(${property.id})" style="
//           background: #8B2131; 
//           color: white; 
//           border: none; 
//           padding: 6px 12px; 
//           border-radius: 6px; 
//           cursor: pointer; 
//           font-size: 11px; 
//           font-weight: 500;
//           transition: background 0.2s;
//         " onmouseover="this.style.background='#7A1C2A'" onmouseout="this.style.background='#8B2131'">
//           View Details
//         </button>
//       </div>
//     </div>
//   `;
// };

// // Filter properties by search value
// export const filterProperties = (properties: Property[], searchValue: string): Property[] => {
//   return properties.filter(
//     (property) =>
//       property.title.toLowerCase().includes(searchValue.toLowerCase()) ||
//       property.location.toLowerCase().includes(searchValue.toLowerCase())
//   );
// };