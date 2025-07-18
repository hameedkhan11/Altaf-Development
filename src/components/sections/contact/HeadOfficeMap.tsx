// // app/map/page.tsx or components/MapPage.tsx
// 'use client';

// import { LuxuryMap } from '@/components/map/LuxuryMap';

// // Define the MapLocation type directly if not available
// interface MapLocation {
//   id: string;
//   name: string;
//   address: string;
//   coordinates: [number, number];
//   type: 'office' | 'property' | 'landmark';
//   description: string;
//   phone?: string;
//   email?: string;
//   website?: string;
//   image?: string;
//   price?: string;
//   bedrooms?: number;
//   bathrooms?: number;
//   sqft?: number;
// }

// const MapPage = () => {
//   // Office location based on your handwritten note
//   const locations: MapLocation[] = [
//     {
//       id: 'office-1',
//       name: 'Luxury Realty Head Office',
//       address: 'Main Boulevard, Plot #1, Block B, Faisal Hills',
//       coordinates: [33.5651, 73.0169], // Islamabad/Rawalpindi coordinates
//       type: 'office',
//       description: 'Our flagship office located in the prestigious Faisal Hills development, serving luxury real estate clients with premium properties and exceptional service.',
//       phone: '+92 (51) 123-4567',
//       email: 'info@luxuryrealty.com',
//       website: 'https://luxuryrealty.com',
//       image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=200&fit=crop'
//     }
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
//       {/* Hero Section */}
//       <div className="relative bg-gradient-to-r from-[rgb(140,46,71)] via-[rgb(160,60,85)] to-[rgb(140,46,71)] text-white overflow-hidden">
//         <div className="absolute inset-0 bg-black/20"></div>
//         <div className="absolute inset-0 bg-white/5 opacity-30" 
//              style={{
//                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
//              }}>
//         </div>
        
//         <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
//           <div className="text-center">
//             <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
//               <span className="text-sm font-medium">📍 Premium Location</span>
//             </div>
//             <h1 className="text-4xl md:text-6xl font-bold mb-6">
//               Our Head Office
//             </h1>
//             <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
//               Located in the heart of Faisal Hills, our flagship office provides exceptional real estate services in Pakistan's most prestigious development
//             </p>
//             <div className="flex flex-col sm:flex-row gap-4 justify-center">
//               <button className="bg-white text-[rgb(140,46,71)] px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg">
//                 Schedule Visit
//               </button>
//               <button className="border-2 border-white text-white px-8 py-3 rounded-xl font-semibold hover:bg-white hover:text-[rgb(140,46,71)] transition-all duration-300">
//                 Contact Us
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Map Section */}
//       <div className="mx-auto px-4 sm:px-6 lg:px-16 py-20">
//         <div className="mb-16 text-center">
//           <div className="inline-flex items-center px-4 py-2 rounded-full bg-[rgb(140,46,71)]/10 border border-[rgb(140,46,71)]/20 mb-6">
//             <span className="text-sm font-medium text-[rgb(140,46,71)]">🗺️ Interactive Map</span>
//           </div>
//           <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
//             Find Our Office
//           </h2>
//           <p className="text-lg text-gray-600 max-w-2xl mx-auto">
//             Interactive map showing our premium office location in Faisal Hills, 
//             perfectly positioned to serve our discerning clientele
//           </p>
//         </div>

//         <LuxuryMap
//           locations={locations}
//           config={{
//             center: [33.5651, 73.0169] as [number, number], // Centered on Islamabad/Rawalpindi
//             zoom: 14,
//           }}
//           height="650px"
//           className="mb-12"
//           showControls={true}
//         />

//         {/* Office Details Card */}
//         <div className="max-w-4xl mx-auto mt-12">
//           <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
//             <div className="bg-gradient-to-r from-[rgb(140,46,71)] to-[rgb(160,60,85)] p-6">
//               <h3 className="text-2xl font-bold text-white mb-2">Office Information</h3>
//               <p className="text-white/90">Your gateway to luxury real estate</p>
//             </div>
            
//             <div className="p-8">
//               <div className="grid md:grid-cols-2 gap-8">
//                 <div className="space-y-4">
//                   <div className="flex items-start space-x-3">
//                     <div className="w-8 h-8 bg-[rgb(140,46,71)]/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
//                       <span className="text-[rgb(140,46,71)]">📍</span>
//                     </div>
//                     <div>
//                       <h4 className="font-semibold text-gray-900">Address</h4>
//                       <p className="text-gray-600">Main Boulevard, Plot #1, Block B, Faisal Hills</p>
//                     </div>
//                   </div>
                  
//                   <div className="flex items-start space-x-3">
//                     <div className="w-8 h-8 bg-[rgb(140,46,71)]/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
//                       <span className="text-[rgb(140,46,71)]">📞</span>
//                     </div>
//                     <div>
//                       <h4 className="font-semibold text-gray-900">Phone</h4>
//                       <p className="text-gray-600">+92 (51) 123-4567</p>
//                     </div>
//                   </div>
//                 </div>
                
//                 <div className="space-y-4">
//                   <div className="flex items-start space-x-3">
//                     <div className="w-8 h-8 bg-[rgb(140,46,71)]/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
//                       <span className="text-[rgb(140,46,71)]">✉️</span>
//                     </div>
//                     <div>
//                       <h4 className="font-semibold text-gray-900">Email</h4>
//                       <p className="text-gray-600">info@luxuryrealty.com</p>
//                     </div>
//                   </div>
                  
//                   <div className="flex items-start space-x-3">
//                     <div className="w-8 h-8 bg-[rgb(140,46,71)]/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
//                       <span className="text-[rgb(140,46,71)]">🌐</span>
//                     </div>
//                     <div>
//                       <h4 className="font-semibold text-gray-900">Website</h4>
//                       <p className="text-gray-600">www.luxuryrealty.com</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
              
//               <div className="mt-8 p-4 bg-gray-50 rounded-xl">
//                 <p className="text-gray-700 text-sm leading-relaxed">
//                   Our flagship office is strategically located in the prestigious Faisal Hills development, 
//                   providing easy access to our clients while maintaining the luxury and professionalism 
//                   that defines our brand. Visit us to discuss your real estate needs with our expert team.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MapPage;