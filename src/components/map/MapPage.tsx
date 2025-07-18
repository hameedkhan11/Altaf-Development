// // app/map/page.tsx or components/MapPage.tsx
// 'use client';

// import { useEffect, useState } from 'react';
// import { LuxuryMap } from '@/components/map/LuxuryMap';
// import { MapLocation } from '@/lib/mapConstants/types';

// const MapPage = () => {
//   const [isClient, setIsClient] = useState(false);

//   useEffect(() => {
//     setIsClient(true);
//   }, []);

//   // Sample data - replace with your actual office location and properties
//   const locations: MapLocation[] = [
//     {
//       id: 'office-1',
//       name: 'Luxury Realty Office',
//       address: '123 Park Avenue, New York, NY 10001',
//       coordinates: [40.7505, -73.9934], // Park Avenue, NYC
//       type: 'office',
//       description: 'Our flagship office in the heart of Manhattan, serving luxury real estate clients since 2010.',
//       phone: '+1 (555) 123-4567',
//       email: 'info@luxuryrealty.com',
//       website: 'https://luxuryrealty.com',
//       image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=200&fit=crop'
//     },
//     {
//       id: 'property-1',
//       name: 'Central Park Penthouse',
//       address: '15 Central Park West, New York, NY',
//       coordinates: [40.7677, -73.9812],
//       type: 'property',
//       description: 'Stunning penthouse with panoramic Central Park views. Premium luxury living.',
//       price: '$12,500,000',
//       bedrooms: 4,
//       bathrooms: 5,
//       sqft: 3500,
//       image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=200&fit=crop'
//     },
//     {
//       id: 'property-2',
//       name: 'Tribeca Loft',
//       address: '456 Broadway, New York, NY',
//       coordinates: [40.7195, -74.0089],
//       type: 'property',
//       description: 'Historic loft conversion in prime Tribeca location. Modern luxury meets classic charm.',
//       price: '$8,750,000',
//       bedrooms: 3,
//       bathrooms: 3,
//       sqft: 2800,
//       image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&h=200&fit=crop'
//     },
//     {
//       id: 'property-3',
//       name: 'Upper East Side Townhouse',
//       address: '789 Madison Avenue, New York, NY',
//       coordinates: [40.7736, -73.9566],
//       type: 'property',
//       description: 'Elegant pre-war townhouse with private garden. Perfect for discerning buyers.',
//       price: '$15,200,000',
//       bedrooms: 5,
//       bathrooms: 6,
//       sqft: 4200,
//       image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=200&fit=crop'
//     },
//     {
//       id: 'landmark-1',
//       name: 'Empire State Building',
//       address: '350 5th Ave, New York, NY',
//       coordinates: [40.7484, -73.9857],
//       type: 'landmark',
//       description: 'Iconic NYC landmark and neighborhood reference point.',
//     }
//   ];

//   if (!isClient) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
//         <div className="mx-auto px-4 sm:px-6 lg:px-16 py-16">
//           <div className="mb-12 text-center">
//             <h2 className="text-7xl mb-4">
//               Explore Our HEAD OFFICE
//             </h2>
//             <p className="text-lg max-w-2xl mx-auto">
//               Interactive map showcasing our office locations and exclusive property listings 
//               in Manhattan&apos;s most desirable neighborhoods
//             </p>
//           </div>
//           <div className="h-96 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center">
//             <div className="text-center">
//               <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto mb-4"></div>
//               <p className="text-gray-600 font-medium">Loading interactive map...</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
//       {/* Map Section */}
//       <div className="mx-auto px-4 sm:px-6 lg:px-16 py-16">
//         <div className="mb-12 text-center">
//           <h2 className="text-7xl mb-4">
//             Explore Our HEAD OFFICE
//           </h2>
//           <p className="text-lg max-w-2xl mx-auto">
//             Interactive map showcasing our office locations and exclusive property listings 
//             in Manhattan&apos;s most desirable neighborhoods
//           </p>
//         </div>

//         <LuxuryMap
//           locations={locations}
//           config={{
//             center: [40.7505, -73.9834], // Centered on Manhattan
//             zoom: 13,
//           }}
//           height="600px"
//           className="mb-12"
//           showControls={true}
//         />
//       </div>
//     </div>
//   );
// };

// export default MapPage;