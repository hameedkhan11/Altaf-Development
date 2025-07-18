// "use client";
// import React from "react";
// import { motion } from "framer-motion";
// import { ChevronDown } from "lucide-react";
// import { COMPANY_INFO } from "@/lib/constants";

// // Import optimized animations
// import { 
//   scaleOnHover,
//   shouldAnimate,
//   staggerContainer,
//   fadeInUp,
//   quickFade,
//   deferredAnimation,
//   createLazyAnimation,
//   getPerformanceVariant
// } from "@/lib/constants";

// const HeroSection = () => {
//   const handleScrollDown = () => {
//     const nextSection =
//       document.querySelector("section:nth-of-type(2)") ||
//       document.querySelector('[data-section="about"]') ||
//       document.querySelector(".next-section");

//     if (nextSection) {
//       nextSection.scrollIntoView({
//         behavior: "smooth",
//         block: "start",
//       });
//     } else {
//       // Fallback: scroll down by viewport height
//       window.scrollTo({
//         top: window.innerHeight,
//         behavior: "smooth",
//       });
//     }
//   };

//   // Optimized animation variants using the performance system
//   const heroTitleVariant = getPerformanceVariant(fadeInUp);

//   const scrollIndicatorVariant = shouldAnimate() ? {
//     animate: { y: [0, -10, 0] },
//     transition: {
//       duration: 1.5,
//       repeat: Infinity,
//       ease: "easeInOut"
//     }
//   } : {
//     animate: { y: 0 },
//     transition: { duration: 0 }
//   };

//   // Replace 'your-cloud-name' with your actual Cloudinary cloud name
//   const cloudinaryVideoUrl = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/video/upload/q_auto,f_auto/video2_lzrdux.mp4`;

//   return (
//     <section className="h-screen overflow-hidden relative">
//       {/* Video Background using direct Cloudinary URL */}
//       <video
//         src={cloudinaryVideoUrl}
//         autoPlay
//         loop
//         muted
//         playsInline
//         preload="auto"
//         className="absolute inset-0 w-full h-full object-cover z-0"
//         style={{
//           width: '100%',
//           height: '100%',
//           objectFit: 'cover'
//         }}
//         onLoadStart={() => console.log('Video loading started')}
//         onCanPlay={() => console.log('Video can play')}
//         onError={(e) => console.error('Video error:', e)}
//         {...createLazyAnimation(quickFade)}
//       />

//       {/* Fallback background in case video doesn't load */}
//       <div 
//         className="absolute inset-0 w-full h-full bg-gradient-to-br from-gray-900 to-gray-700 z-0"
//         style={{
//           backgroundImage: `url(https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_fill,w_1920,h_1080/video2_lzrdux.jpg)`,
//           backgroundSize: 'cover',
//           backgroundPosition: 'center'
//         }}
//       />

//       <div className="container mx-auto w-full px-6 h-full flex items-center relative z-20">
//         {/* Main content container with optimized stagger */}
//         <motion.div
//           variants={staggerContainer}
//           initial="initial"
//           animate="animate"
//           className="w-full md:w-1/2 text-white"
//         >
//           {/* Hero Title - Critical content with optimized animation */}
//           <motion.h1
//             variants={deferredAnimation(heroTitleVariant)}
//             initial="initial"
//             animate="animate"
//             className="text-2xl md:text-3xl lg:text-6xl leading-tight text-white"
//           >
//             {COMPANY_INFO.tagline}
//           </motion.h1>
//         </motion.div>
//       </div>

//       {/* Scroll indicator with higher z-index and proper clickable area */}
//       <motion.div
//         variants={scrollIndicatorVariant}
//         animate="animate"
//         className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white z-30 cursor-pointer p-4 hover:bg-white/10 rounded-full transition-colors duration-300"
//         onClick={handleScrollDown}
//         {...scaleOnHover}
//         role="button"
//         aria-label="Scroll to next section"
//         tabIndex={0}
//         onKeyDown={(e) => {
//           if (e.key === 'Enter' || e.key === ' ') {
//             e.preventDefault();
//             handleScrollDown();
//           }
//         }}
//       >
//         <ChevronDown className="h-8 w-8" />
//       </motion.div>
//     </section>
//   );
// };

// export default HeroSection;