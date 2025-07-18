// // components/HeroButtons.tsx
// "use client";

// import React from 'react';
// import { motion } from 'framer-motion';
// import { Button } from '@/components/ui/button';
// import {  ArrowRight } from 'lucide-react';
// import Link from 'next/link';

// interface HeroButtonsProps {
//   className?: string;
//   enableAnimations?: boolean;
// }

// const HeroButtons: React.FC<HeroButtonsProps> = ({ 
//   className = "", 
//   enableAnimations = true 
// }) => {
//   const containerVariants = {
//     initial: { opacity: 0, y: 30 },
//     animate: {
//       opacity: 1,
//       y: 0,
//       transition: {
//         duration: 0.8,
//         ease: "easeOut",
//         staggerChildren: 0.2
//       }
//     }
//   };

//   const buttonVariants = {
//     initial: { opacity: 0, y: 20 },
//     animate: {
//       opacity: 1,
//       y: 0,
//       transition: { duration: 0.6, ease: "easeOut" }
//     }
//   };

//   const MotionDiv = enableAnimations ? motion.div : 'div';

//   return (
//     <MotionDiv
//       className={`flex flex-col sm:flex-row gap-4 items-center justify-center sm:justify-start ${className}`}
//       {...(enableAnimations && {
//         variants: containerVariants,
//         initial: "initial",
//         animate: "animate"
//       })}
//     >
//       {/* View Properties Button */}
//       <MotionDiv
//         {...(enableAnimations && {
//           variants: buttonVariants
//         })}
//       >
//         <Link href="/properties">
//           <Button
//             className="group relative cursor-pointer px-8 py-6 bg-white text-[rgb(140,46,71)] rounded-full font-bold text-lg hover:bg-gray-100 shadow-lg  transition-all duration-300 overflow-hidden min-w-[12rem] hover:scale-105"
//           > 
//             <div className="flex items-center space-x-3 relative z-10">
//               {/* <Building2 className="h-5 w-5 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-12" /> */}
//               <span className="transition-all duration-300  font-bold">
//                 View Properties
//               </span>
//               <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
//             </div>
            
//             {/* Shine effect */}
//             <div className="absolute inset-0 -top-2 -left-2 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
//           </Button>
//         </Link>
//       </MotionDiv>

//       {/* Let's Connect Button */}
//       <MotionDiv
//         {...(enableAnimations && {
//           variants: buttonVariants
//         })}
//       >
//         <Link href="/contact">
//           <Button
//             className="group relative px-4 py-6 cursor-pointer bg-transparent border-1 border-white text-white rounded-full font-bold text-lg hover:bg-[rgb(120,40,61)] shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden min-w-[12rem] hover:border-transparent"
//           >
//             <div className="flex items-center space-x-3 relative z-10">
//               {/* <MessageCircle className="h-5 w-5 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12" /> */}
//               <span className="transition-all duration-300 group-hover:tracking-wider">
//                 Let&apos;s Connect
//               </span>
//               <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
//             </div>
            
//             {/* Shine effect */}
//             <div className="absolute inset-0 -top-2 -left-2 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
//           </Button>
//         </Link>
//       </MotionDiv>
//     </MotionDiv>
//   );
// };

// export default HeroButtons;