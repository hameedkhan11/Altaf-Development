// "use client";
// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import {
//   Linkedin,
//   Twitter,
//   Mail,
//   Phone,
//   Calendar,
// } from "lucide-react";

// // Import animations from constants
// import {
//   fadeInUp,
//   scaleOnHover,
//   cardHover,
//   batchStaggerContainer,
//   batchStaggerItem,
//   slideInFromBottom,
//   rotateOnHover,
//   microSlide,
//   quickFade,
//   viewportDefault,
//   shouldAnimate,
//   getPerformanceMode,
// } from "@/lib/constants";

// // Team member data
// const teamMembers = [
//   {
//     id: 1,
//     name: "John Doe",
//     position: "Chief Technology Officer",
//     image: "/images/altaf3.jpg",
//     bio: "Michael drives our technological innovation, ensuring we stay ahead in the digital real estate landscape.",
//     email: "altaf1@company.com",
//     phone: "+1 (555) 123-4568",
//     linkedin: "#",
//     twitter: "#",
//     experience: "12+ Years",
//     specialties: ["Technology", "Innovation", "Digital Solutions"],
//     achievements: ["Tech Innovation Award", "Best CTO 2022"],
//   },
//   {
//     id: 2,
//     name: "Altaf Khan",
//     position: "Chief Executive Officer",
//     image: "/images/altaf.jpg",
//     bio: "Emily's exceptional sales expertise and client relationship skills have made her an invaluable team leader.",
//     email: "altaf@company.com",
//     phone: "+92 1234567890",
//     linkedin: "#",
//     twitter: "#",
//     experience: "10+ Years",
//     specialties: ["Sales Strategy", "Client Relations", "Team Leadership"],
//     achievements: ["Sales Leader of the Year", "Top Performer 2023"],
//   },
//   {
//     id: 3,
//     name: "David Thompson",
//     position: "Senior Property Manager",
//     image: "/images/altaf2.jpg",
//     bio: "David ensures our properties are maintained to the highest standards while maximizing investment returns.",
//     email: "david.thompson@company.com",
//     phone: "+92 1234567890",
//     linkedin: "#",
//     twitter: "#",
//     experience: "8+ Years",
//     specialties: ["Management", "Investment Analysis", "Maintenance"],
//     achievements: ["Property Manager Excellence", "Client Satisfaction Award"],
//   },
// ];

// const MeetOurTeam = () => {
//   const [hoveredMember, setHoveredMember] = useState<number | null>(null);
  
//   // Get performance mode for conditional logic
//   const performanceMode = getPerformanceMode();
//   const animationsEnabled = shouldAnimate();

//   return (
//     <section className="py-12 px-16 sm:py-8 md:py-12 lg:py-16">
//       <div className="container mx-auto px-4 sm:px-6">
//         {/* Header Section */}
//         <motion.div 
//           className="text-center mb-12 sm:mb-16"
//           initial={slideInFromBottom.initial}
//           whileInView={slideInFromBottom.animate}
//           transition={slideInFromBottom.transition}
//           viewport={viewportDefault}
//         >
//           <motion.h2
//             className="text-xl sm:text-2xl md:text-3xl lg:text-5xl mb-4 sm:mb-6"
//             initial={fadeInUp.initial}
//             animate={fadeInUp.animate}
//             transition={fadeInUp.transition}
//           >
//             MEET OUR TEAM
//           </motion.h2>

//           <motion.p
//             className="text-base sm:text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed dark:text-white px-4 sm:px-0"
//             initial={fadeInUp.initial}
//             animate={fadeInUp.animate}
//             transition={{
//               ...fadeInUp.transition,
//               delay: animationsEnabled ? 0.1 : 0
//             }}
//           >
//             Our dedicated team of professionals brings decades of combined
//             experience to help you achieve your real estate goals with
//             confidence and expertise.
//           </motion.p>
//         </motion.div>

//         {/* Team Grid - Using optimized batch stagger */}
//         <motion.div
//           className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
//           initial={batchStaggerContainer.initial}
//           whileInView={batchStaggerContainer.animate}
//           transition={batchStaggerContainer.transition}
//           viewport={viewportDefault}
//         >
//           {teamMembers.map((member, index) => (
//             <motion.div
//               key={member.id}
//               className="group dark:bg-gray-900 w-full"
//               initial={batchStaggerItem.initial}
//               animate={batchStaggerItem.animate}
//               transition={{
//                 ...batchStaggerItem.transition,
//                 delay: animationsEnabled ? index * 0.05 : 0
//               }}
//               onHoverStart={() => animationsEnabled && setHoveredMember(member.id)}
//               onHoverEnd={() => animationsEnabled && setHoveredMember(null)}
//             >
//               <motion.div
//                 className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 dark:bg-gray-900 dark:border-gray-700 w-full"
//                 {...(animationsEnabled ? cardHover : {})}
//               >
//                 {/* Image Section */}
//                 <div className="relative overflow-hidden">
//                   <motion.img
//                     src={member.image}
//                     alt={member.name}
//                     width={400}
//                     height={320}
//                     className="w-full h-64 sm:h-72 md:h-80 object-cover transition-transform duration-500 group-hover:scale-110"
//                     {...(animationsEnabled && performanceMode !== "slow" ? rotateOnHover : {})}
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

//                   {/* Social Links Overlay - Only animate if performance allows */}
//                   <motion.div
//                     className="absolute bottom-4 left-4 right-4 flex justify-center gap-2 sm:gap-3"
//                     initial={animationsEnabled ? { opacity: 0, y: 20 } : { opacity: 0 }}
//                     animate={{
//                       opacity: hoveredMember === member.id ? 1 : 0,
//                       y: animationsEnabled && hoveredMember === member.id ? 0 : (animationsEnabled ? 20 : 0),
//                     }}
//                     transition={{ 
//                       duration: animationsEnabled ? 0.3 : 0,
//                       ease: "easeOut"
//                     }}
//                   >
//                     <motion.a
//                       href={member.linkedin}
//                       className="bg-white/90 backdrop-blur-sm p-2 rounded-full text-[#8B2131] hover:bg-white transition-colors"
//                       {...(animationsEnabled ? scaleOnHover : {})}
//                     >
//                       <Linkedin size={16} className="sm:w-[18px] sm:h-[18px]" />
//                     </motion.a>
//                     <motion.a
//                       href={member.twitter}
//                       className="bg-white/90 backdrop-blur-sm p-2 rounded-full text-[#8B2131] hover:bg-white transition-colors"
//                       {...(animationsEnabled ? scaleOnHover : {})}
//                     >
//                       <Twitter size={16} className="sm:w-[18px] sm:h-[18px]" />
//                     </motion.a>
//                     <motion.a
//                       href={`mailto:${member.email}`}
//                       className="bg-white/90 backdrop-blur-sm p-2 rounded-full text-[#8B2131] hover:bg-white transition-colors"
//                       {...(animationsEnabled ? scaleOnHover : {})}
//                     >
//                       <Mail size={16} className="sm:w-[18px] sm:h-[18px]" />
//                     </motion.a>
//                   </motion.div>
//                 </div>

//                 {/* Content Section */}
//                 <div className="p-4 sm:p-6">
//                   <motion.h3
//                     className="text-lg sm:text-xl dark:text-white mb-2 font-semibold"
//                     initial={microSlide.initial}
//                     animate={microSlide.animate}
//                     transition={microSlide.transition}
//                   >
//                     {member.name}
//                   </motion.h3>

//                   <motion.p
//                     className="text-[#8B2131] dark:text-[#B91C1C] font-semibold mb-3 sm:mb-4 text-sm sm:text-base"
//                     initial={microSlide.initial}
//                     animate={microSlide.animate}
//                     transition={{
//                       ...microSlide.transition,
//                       delay: animationsEnabled ? 0.05 : 0
//                     }}
//                   >
//                     {member.position}
//                   </motion.p>

//                   <motion.p
//                     className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4 sm:mb-6"
//                     initial={quickFade.initial}
//                     animate={quickFade.animate}
//                     transition={quickFade.transition}
//                   >
//                     {member.bio}
//                   </motion.p>

//                   {/* Experience & Contact - Using batch stagger for better performance */}
//                   <motion.div
//                     className="space-y-3 sm:space-y-4 mb-4 sm:mb-6"
//                     initial={batchStaggerContainer.initial}
//                     animate={batchStaggerContainer.animate}
//                     transition={batchStaggerContainer.transition}
//                   >
//                     <motion.div
//                       className="flex items-center gap-2 text-sm"
//                       initial={batchStaggerItem.initial}
//                       animate={batchStaggerItem.animate}
//                       transition={batchStaggerItem.transition}
//                     >
//                       <Calendar
//                         size={14}
//                         className="text-[#8B2131] dark:text-[#B90C0C] flex-shrink-0"
//                       />
//                       <span className="dark:text-white">
//                         {member.experience} Experience
//                       </span>
//                     </motion.div>
                    
//                     <motion.div
//                       className="flex items-center gap-2 text-sm"
//                       initial={batchStaggerItem.initial}
//                       animate={batchStaggerItem.animate}
//                       transition={{
//                         ...batchStaggerItem.transition,
//                         delay: animationsEnabled ? 0.02 : 0
//                       }}
//                     >
//                       <Phone
//                         size={14}
//                         className="text-[#8B2131] dark:text-[#B90C0C] flex-shrink-0"
//                       />
//                       <span className="dark:text-white truncate">{member.phone}</span>
//                     </motion.div>
//                   </motion.div>

//                   {/* Specialties - Performance-aware stagger */}
//                   <motion.div
//                     initial={microSlide.initial}
//                     animate={microSlide.animate}
//                     transition={microSlide.transition}
//                   >
//                     <div className="flex flex-wrap gap-1 sm:gap-2">
//                       {member.specialties.map((specialty, idx) => (
//                         <motion.span
//                           key={specialty}
//                           className="px-2 py-1 sm:px-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-full"
//                           initial={animationsEnabled ? { opacity: 0, scale: 0.8 } : { opacity: 1, scale: 1 }}
//                           animate={{ opacity: 1, scale: 1 }}
//                           transition={{ 
//                             delay: animationsEnabled ? idx * 0.03 : 0, 
//                             duration: animationsEnabled ? 0.2 : 0,
//                             ease: "easeOut"
//                           }}
//                         >
//                           {specialty}
//                         </motion.span>
//                       ))}
//                     </div>
//                   </motion.div>
//                 </div>
//               </motion.div>
//             </motion.div>
//           ))}
//         </motion.div>

//         {/* CTA Section */}
//         <motion.div 
//           className="text-center mt-12 sm:mt-16"
//           initial={slideInFromBottom.initial}
//           whileInView={slideInFromBottom.animate}
//           transition={{
//             ...slideInFromBottom.transition,
//             delay: animationsEnabled ? 0.2 : 0
//           }}
//           viewport={viewportDefault}
//         >
//           <motion.div
//             className="bg-gradient-to-r from-[#8B2131] to-[#B91C1C] rounded-2xl p-6 sm:p-8 mx-4 sm:mx-0"
//             {...(animationsEnabled ? cardHover : {})}
//           >
//             <motion.h3
//               className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 text-white"
//               initial={fadeInUp.initial}
//               animate={fadeInUp.animate}
//               transition={fadeInUp.transition}
//             >
//               Ready to Work with Our Team?
//             </motion.h3>

//             <motion.p
//               className="text-white/90 mb-4 sm:mb-6 max-w-2xl mx-auto text-sm sm:text-base"
//               initial={fadeInUp.initial}
//               animate={fadeInUp.animate}
//               transition={{
//                 ...fadeInUp.transition,
//                 delay: animationsEnabled ? 0.1 : 0
//               }}
//             >
//               Get in touch with our experts today and let us help you find your
//               perfect property or achieve your real estate investment goals.
//             </motion.p>

//             <motion.button
//               className="bg-white text-[#8B2131] px-6 py-2 sm:px-8 sm:py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors text-sm sm:text-base"
//               {...(animationsEnabled ? scaleOnHover : {})}
//             >
//               Contact Our Team
//             </motion.button>
//           </motion.div>
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// export default MeetOurTeam;