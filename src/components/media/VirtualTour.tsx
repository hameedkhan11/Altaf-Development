// // components/media/VirtualTours.tsx
// "use client";

// import React, { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Play, Eye, ArrowRight, Maximize, RotateCcw, Home } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import Image from "next/image";

// interface VirtualTour {
//   id: string;
//   title: string;
//   thumbnail: string;
//   tourUrl: string;
//   type: "360" | "3D" | "AR";
//   propertyType: string;
//   rooms: number;
//   area: string;
//   description?: string;
//   featured?: boolean;
// }

// interface VirtualToursProps {
//   tours: VirtualTour[];
//   title?: string;
//   description?: string;
// }

// const VirtualTours: React.FC<VirtualToursProps> = ({
//   tours,
//   title = "Virtual Tours",
//   description = "Experience our properties in immersive 360° and 3D tours"
// }) => {
//   const [selectedTour, setSelectedTour] = useState<number | null>(null);
//   const [filter, setFilter] = useState<string>("all");

//   const tourTypes = ["all", "360", "3D", "AR"];
//   const filteredTours = filter === "all" ? tours : tours.filter(tour => tour.type === filter);

//   const getTourTypeIcon = (type: string) => {
//     switch (type) {
//       case "360": return <RotateCcw className="h-4 w-4" />;
//       case "3D": return <Maximize className="h-4 w-4" />;
//       case "AR": return <Eye className="h-4 w-4" />;
//       default: return <Play className="h-4 w-4" />;
//     }
//   };

//   const getTourTypeColor = (type: string) => {
//     switch (type) {
//       case "360": return "from-green-500 to-emerald-500";
//       case "3D": return "from-blue-500 to-indigo-500";
//       case "AR": return "from-purple-500 to-pink-500";
//       default: return "from-gray-500 to-gray-600";
//     }
//   };

//   return (
//     <div className="w-full">
//       {/* Header */}
//       <div className="text-center mb-12">
//         <motion.h2 
//           className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//         >
//           {title}
//         </motion.h2>
//         <motion.p 
//           className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, delay: 0.2 }}
//         >
//           {description}
//         </motion.p>
//       </div>

//       {/* Tour Type Filter */}
//       <motion.div 
//         className="flex flex-wrap justify-center gap-4 mb-8"
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6, delay: 0.4 }}
//       >
//         {tourTypes.map((type) => (
//           <Button
//             key={type}
//             variant={filter === type ? "default" : "outline"}
//             onClick={() => setFilter(type)}
//             className={`capitalize px-6 py-2 rounded-full transition-all duration-300 flex items-center gap-2 ${
//               filter === type
//                 ? `bg-gradient-to-r ${getTourTypeColor(type)} text-white shadow-lg scale-105`
//                 : "hover:scale-105 hover:shadow-md"
//             }`}
//           >
//             {getTourTypeIcon(type)}
//             {type === "all" ? "All Tours" : `${type} Tours`}
//           </Button>
//         ))}
//       </motion.div>

//       {/* Featured Tours */}
//       {filter === "all" && tours.some(tour => tour.featured) && (
//         <motion.div
//           className="mb-12"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, delay: 0.6 }}
//         >
//           <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Featured Tours</h3>
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//             {tours
//               .filter(tour => tour.featured)
//               .slice(0, 2)
//               .map((tour, index) => (
//                 <motion.div
//                   key={tour.id}
//                   className="group relative overflow-hidden rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 cursor-pointer"
//                   whileHover={{ y: -8 }}
//                   onClick={() => window.open(tour.tourUrl, '_blank')}
//                 >
//                   <div className="aspect-[16/10] relative">
//                     <Image
//                       src={tour.thumbnail}
//                       alt={tour.title}
//                       fill
//                       className="object-cover transition-transform duration-700 group-hover:scale-110"
//                     />
//                     <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    
//                     {/* Tour Type Badge */}
//                     <div className={`absolute top-6 left-6 bg-gradient-to-r ${getTourTypeColor(tour.type)} text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2`}>
//                       {getTourTypeIcon(tour.type)}
//                       {tour.type.toUpperCase()} Tour
//                     </div>

//                     {/* Play Button */}
//                     <div className="absolute inset-0 flex items-center justify-center">
//                       <motion.div
//                         className="bg-white/20 backdrop-blur-sm rounded-full p-6 group-hover:bg-white/30 transition-all duration-300"
//                         whileHover={{ scale: 1.1 }}
//                         whileTap={{ scale: 0.95 }}
//                       >
//                         <Play className="h-12 w-12 text-white fill-white" />
//                       </motion.div>
//                     </div>

//                     {/* Content */}
//                     <div className="absolute bottom-6 left-6 right-6">
//                       <h3 className="text-2xl font-bold text-white mb-2">{tour.title}</h3>
//                       <div className="flex items-center gap-4 text-white/80 text-sm mb-3">
//                         <span className="flex items-center gap-1">
//                           <Home className="h-4 w-4" />
//                           {tour.propertyType}
//                         </span>
//                         <span>{tour.rooms} Rooms</span>
//                         <span>{tour.area}</span>
//                       </div>
//                       {tour.description && (
//                         <p className="text-white/80 text-sm line-clamp-2">{tour.description}</p>
//                       )}
//                     </div>
//                   </div>
//                 </motion.div>
//               ))}
//           </div>
//         </motion.div>
//       )}

//       {/* Tours Grid */}
//       <motion.div 
//         className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
//         layout
//       >
//         <AnimatePresence>
//           {filteredTours
//             .filter(tour => !tour.featured || filter !== "all")
//             .map((tour, index) => (
//             <motion.div
//               key={tour.id}
//               layout
//               initial={{ opacity: 0, scale: 0.8 }}
//               animate={{ opacity: 1, scale: 1 }}
//               exit={{ opacity: 0, scale: 0.8 }}
//               transition={{ duration: 0.4 }}
//               className="group cursor-pointer bg-white dark:bg-gray-900 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
//               whileHover={{ y: -4 }}
//               onClick={() => window.open(tour.tourUrl, '_blank')}
//             >
//               <div className="relative aspect-video overflow-hidden">
//                 <Image
//                   src={tour.thumbnail}
//                   alt={tour.title}
//                   fill
//                   className="object-cover transition-transform duration-500 group-hover:scale-110"
//                 />
                
//                 {/* Overlay */}
//                 <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
                
//                 {/* Tour Type Badge */}
//                 <div className={`absolute top-4 left-4 bg-gradient-to-r ${getTourTypeColor(tour.type)} text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1`}>
//                   {getTourTypeIcon(tour.type)}
//                   {tour.type.toUpperCase()}
//                 </div>

//                 {/* Play Button */}
//                 <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                   <motion.div
//                     className="bg-white/20 backdrop-blur-sm rounded-full p-3"
//                     whileHover={{ scale: 1.1 }}
//                     whileTap={{ scale: 0.95 }}
//                   >
//                     <Play className="h-6 w-6 text-white fill-white" />
//                   </motion.div>
//                 </div>
//               </div>

//               {/* Content */}
//               <div className="p-6">
//                 <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
//                   {tour.title}
//                 </h3>
                
//                 <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400 text-sm mb-3">
//                   <span className="flex items-center gap-1">
//                     <Home className="h-4 w-4" />
//                     {tour.propertyType}
//                   </span>
//                   <span>{tour.rooms} Rooms</span>
//                   <span>{tour.area}</span>
//                 </div>

//                 {tour.description && (
//                   <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 mb-4">
//                     {tour.description}
//                   </p>
//                 )}

//                 <div className="flex items-center justify-between">
//                   <Button
//                     variant="ghost"
//                     size="sm"
//                     className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 p-0 font-medium"
//                   >
//                     Start Tour
//                     <ArrowRight className="h-4 w-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
//                   </Button>
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </AnimatePresence>
//       </motion.div>

//       {/* CTA Section */}
//       <motion.div
//         className="mt-16 text-center bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-3xl p-8"
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6, delay: 0.8 }}
//       >
//         <h3 className="text-2xl font-bold dark:text-white mb-4">
//           Can't Find What You're Looking For?
//         </h3>
//         <p className="font-optima mb-6 max-w-2xl mx-auto">
//           Schedule a personalized virtual tour with our team to explore any of our properties in detail.
//         </p>
//         <Button className=" text-white px-8 py-3 rounded-full hover:shadow-lg transition-all duration-300">
//           Schedule Personal Tour
//         </Button>
//       </motion.div>
//     </div>
//   );
// };

// export default VirtualTours;