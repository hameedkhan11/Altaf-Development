// //@ts-nocheck
// "use client";
// import React, { useRef } from "react";
// import { motion, useScroll, useTransform, useSpring } from "framer-motion";
// import { CldImage } from "next-cloudinary";

// // Lenis smooth scroll integration
// let lenis: any = null;
// if (typeof window !== "undefined") {
//   import('@studio-freight/lenis').then(({ default: Lenis }) => {
//     if (!lenis) {
//       lenis = new Lenis({
//         duration: 1.2,
//         easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
//         orientation: "vertical",
//         gestureOrientation: "vertical",
//         smoothWheel: true,
//         wheelMultiplier: 0.4
//       });
      
//       function raf(time: number) {
//         lenis.raf(time);
//         requestAnimationFrame(raf);
//       }
//       requestAnimationFrame(raf);
//     }
//   });
// }

// // Create motion-enhanced CldImage
// // const MotionCldImage = motion(CldImage);

// interface SmoothAnimatedImageProps {
//   src: string;
//   alt: string;
//   fill?: boolean;
//   width?: number;
//   height?: number;
//   className?: string;
//   quality?: string | number;
//   format?: string;
//   sizes?: string;
//   priority?: boolean;
//   delay?: number;
//   [key: string]: any; // For any additional CldImage props
// }

// const SmoothAnimatedImage: React.FC<SmoothAnimatedImageProps> = ({
//   src,
//   alt,
//   fill,
//   width,
//   height,
//   className = "",
//   quality = "auto",
//   format = "auto",
//   sizes,
//   priority = false,
//   delay = 0,
//   ...props
// }) => {
//   const containerRef = useRef<HTMLDivElement>(null);
  
//   // Use scroll-based animation with Lenis smooth scrolling
//   const { scrollYProgress } = useScroll({
//     target: containerRef,
//     offset: ["start end", "end start"]
//   });
  
//   // Apply spring physics for buttery smooth animation
//   const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
//   const smoothProgress = useSpring(scrollYProgress, springConfig);
  
//   // Transform values for center-to-sides expansion
//   const scaleX = useTransform(smoothProgress, [0, 0.5, 1], [0, 1, 1]);
//   const imageScale = useTransform(smoothProgress, [0, 0.5, 1], [1.1, 1, 1]);
//   const opacity = useTransform(smoothProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 1]);

//   return (
//     <div
//       ref={containerRef}
//       className={`overflow-hidden ${className}`}
//     >
//       <motion.div
//         className="w-full h-full"
//         style={{
//           scaleX,
//           originX: 0.5,
//           opacity
//         }}
//       >
//         <motion.div
//           className="w-full h-full"
//           style={{
//             scale: imageScale
//           }}
//         >
//           <CldImage
//             src={src}
//             alt={alt}
//             fill={fill}
//             width={width}
//             height={height}
//             quality={quality}
//             format={format}
//             sizes={sizes}
//             priority={priority}
//             className="object-cover w-full h-full"
//             {...props}
//           />
//         </motion.div>
//       </motion.div>
//     </div>
//   );
// };

// // Export helper component for text that appears after image animation
// export const AnimatedText: React.FC<{ 
//   children: React.ReactNode;
//   className?: string;
//   delay?: number;
// }> = ({ 
//   children, 
//   className = "",
//   delay = 0.5
// }) => {
//   const textRef = useRef<HTMLDivElement>(null);
  
//   const { scrollYProgress } = useScroll({
//     target: textRef,
//     offset: ["start end", "end start"]
//   });
  
//   const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
//   const smoothProgress = useSpring(scrollYProgress, springConfig);
  
//   const y = useTransform(smoothProgress, [0, 0.5], [30, 0]);
//   const opacity = useTransform(smoothProgress, [0, 0.3, 0.6], [0, 0, 1]);
  
//   return (
//     <motion.div
//       ref={textRef}
//       className={className}
//       style={{
//         y,
//         opacity
//       }}
//     >
//       {children}
//     </motion.div>
//   );
// };

// export default SmoothAnimatedImage;