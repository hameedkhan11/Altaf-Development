// "use client"
// import React from 'react'
// import { motion } from 'framer-motion'
// import Image from 'next/image'
// import { Card, CardContent } from '@/components/ui/card'
// import { Button } from '@/components/ui/button'
// import { Badge } from '@/components/ui/badge'
// import { Bed, Bath, Ruler } from 'lucide-react'
// import { Property } from '@/lib/types'

// interface PropertyCardProps {
//   property: Property;
//   index: number;
// }

// export const PropertyCard: React.FC<PropertyCardProps> = ({ property, index }) => {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 50 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true, margin: "-100px" }}
//       transition={{ 
//         duration: 0.6, 
//         delay: index * 0.1,
//         ease: [0.25, 0.25, 0, 1]
//       }}
//       whileHover={{ y: -8 }}
//       className="w-full"
//     >
//       <Card className="overflow-hidden group cursor-pointer hover:shadow-xl transition-all duration-500 w-full">
//         <motion.div 
//           className="relative overflow-hidden"
//           whileHover={{ scale: 1.02 }}
//           transition={{ duration: 0.3 }}
//         >
//           <Image 
//             src={property.image}
//             alt={property.title}
//             width={800}
//             height={256}
//             className="w-full h-48 sm:h-56 md:h-60 lg:h-64 object-cover transition-transform duration-500 group-hover:scale-110"
//             sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
//             priority={false}
//           />
          
//           <motion.div
//             initial={{ opacity: 0, scale: 0.8 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ delay: index * 0.1 + 0.3 }}
//             className="absolute top-2 right-2 sm:top-4 sm:right-4"
//           >
//             <Badge className="bg-[#8B2131] text-white shadow-lg text-xs sm:text-sm px-2 py-1 sm:px-3 sm:py-1">
//               {property.badge}
//             </Badge>
//           </motion.div>
//         </motion.div>
             
//         <CardContent className="p-3 sm:p-4 md:p-5 lg:p-6">
//           <motion.h3 
//             className="text-lg sm:text-xl font-bold mb-2 dark:text-white line-clamp-2"
//             initial={{ opacity: 0, x: -20 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             viewport={{ once: true }}
//             transition={{ delay: index * 0.1 + 0.4 }}
//           >
//             {property.title}
//           </motion.h3>
                 
//           <motion.div 
//             className="flex flex-wrap items-center gap-2 sm:gap-4 mb-3 sm:mb-4 text-xs sm:text-sm"
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ delay: index * 0.1 + 0.6 }}
//           >
//             <div className="flex items-center">
//               <Bed className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground mr-1" />
//               <span>{property.beds} Beds</span>
//             </div>
//             <div className="flex items-center">
//               <Bath className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground mr-1" />
//               <span>{property.baths} Baths</span>
//             </div>
//             <div className="flex items-center">
//               <Ruler className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground mr-1" />
//               <span>{property.sqft} sqft</span>
//             </div>
//           </motion.div>
                 
//           <motion.div 
//             className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0"
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ delay: index * 0.1 + 0.7 }}
//           >
//             <div className="text-base sm:text-lg font-bold text-[#8B2131] dark:text-red-400">
//               {property.price}
//             </div>
//             <motion.div
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//             >
//               <Button className="bg-[#8B2131] hover:bg-[#7A1C2A] text-white transition-colors text-xs sm:text-sm px-3 py-2 sm:px-4 sm:py-2 w-full sm:w-auto">
//                 View Details
//               </Button>
//             </motion.div>
//           </motion.div>
//         </CardContent>
//       </Card>
//     </motion.div>
//   )
// }