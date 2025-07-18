// // components/GlobalAnimationProvider.tsx
// 'use client';

// import { LazyMotion, domAnimation } from 'framer-motion';
// import { ReactLenis } from '@studio-freight/react-lenis';
// import { useEffect, ReactNode } from 'react';

// interface GlobalAnimationProviderProps {
//   children: ReactNode;
// }

// export default function GlobalAnimationProvider({
//   children,
// }: GlobalAnimationProviderProps) {
//   useEffect(() => {
//     // Add global CSS for smooth animations
//     const style = document.createElement('style');
//     style.textContent = `
//       * {
//         transition: transform 0.3s ease, opacity 0.3s ease;
//       }
      
//       .animate-on-scroll {
//         opacity: 0;
//         transform: translateY(30px);
//       }
      
//       .animate-on-scroll.in-view {
//         opacity: 1;
//         transform: translateY(0);
//       }
      
//       .hover-lift:hover {
//         transform: translateY(-4px);
//       }
//     `;
//     document.head.appendChild(style);

//     // Fix: Return cleanup function properly
//     return () => {
//       if (document.head.contains(style)) {
//         document.head.removeChild(style);
//       }
//     };
//   }, []);

//   return (
//     <LazyMotion features={domAnimation} strict>
//       <ReactLenis
//         root
//         options={{
//           lerp: 0.1,
//           duration: 1.2,
//           smoothWheel: true,
//           wheelMultiplier: 1,
//           touchMultiplier: 2,
//         }}
//       >
//         {children}
//       </ReactLenis>
//     </LazyMotion>
//   );
// }