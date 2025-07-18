// "use client";
// import { useState, FormEvent } from "react";
// import { motion } from "framer-motion";
// import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react";
// import { Button } from "@/components/ui/button";

// // Import optimized animations
// import {
//   fadeInUp,
//   fadeInLeft,
//   staggerContainer,
//   batchStagger,
//   scaleOnHover,
//   viewportOnce,
//   delays,
//   shouldAnimate,
//   getPerformanceVariant,
// } from "@/lib/constants";

// const Newsletter = () => {
//   const [email, setEmail] = useState("");

//   const handleNewsletterSubmit = (e: FormEvent) => {
//     e.preventDefault();
//   };

//   const socialIcons = [Facebook, Instagram, Twitter, Linkedin];

//   // Optimized animation variants
//   const headerVariant = getPerformanceVariant(fadeInUp);
  
//   const descriptionVariant = getPerformanceVariant({
//     ...fadeInLeft,
//     transition: {
//       ...fadeInLeft.transition,
//       delay: shouldAnimate() ? delays.short : 0
//     }
//   });

//   const formVariant = getPerformanceVariant({
//     initial: shouldAnimate() ? { opacity: 0, y: 15 } : { opacity: 1, y: 0 },
//     animate: { opacity: 1, y: 0 },
//     transition: {
//       duration: shouldAnimate() ? 0.3 : 0,
//       delay: shouldAnimate() ? delays.medium : 0,
//       ease: "easeOut"
//     }
//   });

//   return (
//     <section className="py-12 sm:py-16 md:py-20 lg:py-24 px-16 w-full">
//       <div className="mx-auto w-full max-w-4xl">
//         <motion.div 
//           className="w-full text-center"
//           variants={staggerContainer}
//           initial="initial"
//           whileInView="animate"
//           viewport={viewportOnce}
//         >
//           {/* Content Section */}
//           <motion.div 
//             className="w-full"
//             variants={staggerContainer}
//             initial="initial"
//             whileInView="animate"
//             viewport={viewportOnce}
//           >
//             {/* Header with optimized animation */}
//             <motion.h2 
//               className="text-2xl sm:text-3xl md:text-4xl mb-4 sm:mb-6"
//               variants={headerVariant}
//               initial="initial"
//               whileInView="animate"
//               viewport={viewportOnce}
//             >
//               Stay Updated with ALTAF BUILDER
//             </motion.h2>
            
//             {/* Description with staggered entrance */}
//             <motion.p 
//               className="text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto"
//               variants={descriptionVariant}
//               initial="initial"
//               whileInView="animate"
//               viewport={viewportOnce}
//             >
//               Subscribe to our newsletter to receive the latest updates on our
//               new projects, exclusive offers, and market insights.
//             </motion.p>

//             {/* Form Section with optimized animation */}
//             <motion.div 
//               className="mb-6 sm:mb-8 w-full max-w-lg mx-auto"
//               variants={formVariant}
//               initial="initial"
//               whileInView="animate"
//               viewport={viewportOnce}
//             >
//               <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full items-center">
//                 <motion.input
//                   type="email"
//                   placeholder="Enter your email address"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   className="flex-grow w-full sm:flex-1 px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 bg-white dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B2131] focus:border-transparent text-sm sm:text-base"
//                   required
//                   whileFocus={{ scale: 1.01 }}
//                   transition={{ duration: 0.2 }}
//                 />
//                 <motion.div {...scaleOnHover}>
//                   <Button
//                     size="lg"
//                     type="submit"
//                     onClick={handleNewsletterSubmit}
//                     variant="outline"
//                     className="py-4 text-white font-medium hover:bg-transparent border-[#B91C1C] bg-[#B91C1C] cursor-pointer dark:hover:text-white dark:bg-[#B91C1C] dark:hover:bg-transparent dark:border-[#B91C1C] dark:text-white"
//                   >
//                     Contact Us
//                   </Button>
//                 </motion.div>
//               </div>
//             </motion.div>

//             {/* Social Icons with batch stagger animation */}
//             <motion.div 
//               className="flex items-center justify-center space-x-4 sm:space-x-6"
//               variants={batchStagger.container}
//               initial="initial"
//               whileInView="animate"
//               viewport={viewportOnce}
//             >
//               {socialIcons.map((Icon, index) => (
//                 <motion.a
//                   key={index}
//                   href="#"
//                   className="text-gray-600 dark:text-gray-400 hover:text-[#8B2131] dark:hover:text-[#8B2131] transition-colors duration-300"
//                   aria-label={`Social media link ${index + 1}`}
//                   variants={batchStagger.item}
//                   {...scaleOnHover}
//                 >
//                   <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-[#B91C1C]" />
//                 </motion.a>
//               ))}
//             </motion.div>
//           </motion.div>
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// export default Newsletter;