// // ============================================================================
// // ULTRA-OPTIMIZED FRAMER MOTION ANIMATIONS
// // Performance-first with GPU acceleration and cool effects
// // ============================================================================

// // Performance detection system
// const PERFORMANCE_THRESHOLDS = {
//   HIGH_END: { memory: 8, cores: 8, connection: '4g' },
//   MID_RANGE: { memory: 4, cores: 4, connection: '3g' },
//   LOW_END: { memory: 2, cores: 2, connection: 'slow-2g' }
// };

// let performanceMode = 'normal';
// let animationsEnabled = true;

// // Initialize performance detection
// const initPerformance = (() => {
//   if (typeof window === 'undefined') return;
  
//   const nav = navigator as any;
//   const memory = nav.deviceMemory || 4;
//   const cores = nav.hardwareConcurrency || 4;
//   const connection = nav.connection?.effectiveType || '4g';
  
//   // Detect reduced motion preference
//   const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
//   if (prefersReducedMotion) {
//     animationsEnabled = false;
//     performanceMode = 'disabled';
//   } else if (memory >= 8 && cores >= 8 && connection === '4g') {
//     performanceMode = 'high';
//   } else if (memory <= 2 || cores <= 2 || connection === 'slow-2g') {
//     performanceMode = 'low';
//     animationsEnabled = false;
//   }
  
//   // Monitor frame rate and adjust dynamically
//   let frameCount = 0;
//   let lastTime = performance.now();
  
//   const monitorPerformance = () => {
//     frameCount++;
//     const currentTime = performance.now();
    
//     if (currentTime - lastTime >= 1000) {
//       const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
      
//       if (fps < 30 && animationsEnabled) {
//         animationsEnabled = false;
//         console.warn('🎯 Animations disabled due to low FPS:', fps);
//       } else if (fps > 50 && !animationsEnabled && performanceMode !== 'disabled') {
//         animationsEnabled = true;
//         console.log('🚀 Animations re-enabled, FPS:', fps);
//       }
      
//       frameCount = 0;
//       lastTime = currentTime;
//     }
    
//     requestAnimationFrame(monitorPerformance);
//   };
  
//   requestAnimationFrame(monitorPerformance);
// })();

// // Smart animation enabler
// export const shouldAnimate = () => animationsEnabled;

// // ============================================================================
// // GPU-ACCELERATED CORE ANIMATIONS
// // ============================================================================

// // Ultra-smooth fade with GPU acceleration
// export const fadeInUp = {
//   initial: shouldAnimate() ? { 
//     opacity: 0, 
//     y: 20,
//     scale: 0.98,
//     filter: 'blur(1px)',
//     transform: 'translate3d(0, 20px, 0) scale3d(0.98, 0.98, 1)'
//   } : { 
//     opacity: 1, 
//     y: 0, 
//     scale: 1,
//     filter: 'blur(0px)',
//     transform: 'translate3d(0, 0, 0) scale3d(1, 1, 1)'
//   },
//   animate: { 
//     opacity: 1, 
//     y: 0,
//     scale: 1,
//     filter: 'blur(0px)',
//     transform: 'translate3d(0, 0, 0) scale3d(1, 1, 1)'
//   },
//   transition: { 
//     duration: shouldAnimate() ? (performanceMode === 'high' ? 0.4 : 0.25) : 0,
//     ease: [0.25, 0.46, 0.45, 0.94], // Custom easing for smoothness
//     opacity: { duration: shouldAnimate() ? 0.3 : 0 },
//     scale: { duration: shouldAnimate() ? 0.35 : 0, delay: 0.05 },
//     filter: { duration: shouldAnimate() ? 0.2 : 0 }
//   }
// };

// export const fadeInLeft = {
//   initial: shouldAnimate() ? { 
//     opacity: 0, 
//     x: -25,
//     rotateY: -5,
//     transform: 'translate3d(-25px, 0, 0) rotateY(-5deg)'
//   } : { 
//     opacity: 1, 
//     x: 0,
//     rotateY: 0,
//     transform: 'translate3d(0, 0, 0) rotateY(0deg)'
//   },
//   animate: { 
//     opacity: 1, 
//     x: 0,
//     rotateY: 0,
//     transform: 'translate3d(0, 0, 0) rotateY(0deg)'
//   },
//   transition: { 
//     duration: shouldAnimate() ? 0.35 : 0,
//     ease: [0.34, 1.56, 0.64, 1], // Bouncy easing
//     type: "spring",
//     damping: 25,
//     stiffness: 300
//   }
// };

// export const fadeInRight = {
//   initial: shouldAnimate() ? { 
//     opacity: 0, 
//     x: 25,
//     rotateY: 5,
//     transform: 'translate3d(25px, 0, 0) rotateY(5deg)'
//   } : { 
//     opacity: 1, 
//     x: 0,
//     rotateY: 0,
//     transform: 'translate3d(0, 0, 0) rotateY(0deg)'
//   },
//   animate: { 
//     opacity: 1, 
//     x: 0,
//     rotateY: 0,
//     transform: 'translate3d(0, 0, 0) rotateY(0deg)'
//   },
//   transition: { 
//     duration: shouldAnimate() ? 0.35 : 0,
//     ease: [0.34, 1.56, 0.64, 1],
//     type: "spring",
//     damping: 25,
//     stiffness: 300
//   }
// };

// // ============================================================================
// // PREMIUM HOVER EFFECTS
// // ============================================================================

// export const scaleOnHover = {
//   whileHover: shouldAnimate() ? { 
//     scale: performanceMode === 'high' ? 1.02 : 1.01,
//     rotateZ: 0.5,
//     filter: 'brightness(1.05) saturate(1.1)',
//     transform: `scale3d(${performanceMode === 'high' ? 1.02 : 1.01}, ${performanceMode === 'high' ? 1.02 : 1.01}, 1) rotateZ(0.5deg)`
//   } : {},
//   whileTap: shouldAnimate() ? { 
//     scale: 0.98,
//     rotateZ: -0.5,
//     filter: 'brightness(0.95)',
//     transform: 'scale3d(0.98, 0.98, 1) rotateZ(-0.5deg)'
//   } : {},
//   transition: { 
//     duration: 0.15,
//     ease: [0.25, 0.46, 0.45, 0.94],
//     type: "spring",
//     damping: 20,
//     stiffness: 400
//   }
// };

// export const cardHover = {
//   whileHover: shouldAnimate() ? { 
//     y: performanceMode === 'high' ? -8 : -4,
//     scale: performanceMode === 'high' ? 1.01 : 1.005,
//     rotateX: 2,
//     rotateY: 1,
//     boxShadow: performanceMode === 'high' 
//       ? "0 20px 40px rgba(0,0,0,0.15), 0 0 0 1px rgba(255,255,255,0.1)"
//       : "0 10px 20px rgba(0,0,0,0.1)",
//     filter: 'brightness(1.02)',
//     transform: `translate3d(0, ${performanceMode === 'high' ? -8 : -4}px, 0) scale3d(${performanceMode === 'high' ? 1.01 : 1.005}, ${performanceMode === 'high' ? 1.01 : 1.005}, 1) rotateX(2deg) rotateY(1deg)`
//   } : {},
//   transition: { 
//     duration: performanceMode === 'high' ? 0.25 : 0.15,
//     ease: [0.25, 0.46, 0.45, 0.94],
//     type: "spring",
//     damping: 22,
//     stiffness: 300
//   }
// };

// // ============================================================================
// // ADVANCED STAGGER SYSTEM
// // ============================================================================

// export const staggerContainer = {
//   initial: { opacity: shouldAnimate() ? 0 : 1 },
//   animate: { 
//     opacity: 1,
//     transition: {
//       duration: shouldAnimate() ? 0.2 : 0,
//       staggerChildren: shouldAnimate() ? (performanceMode === 'high' ? 0.08 : 0.04) : 0,
//       delayChildren: shouldAnimate() ? 0.1 : 0,
//       ease: "easeOut",
//       when: "beforeChildren"
//     }
//   }
// };

// export const staggerItem = {
//   initial: shouldAnimate() ? { 
//     opacity: 0, 
//     y: 15,
//     scale: 0.95,
//     filter: 'blur(2px)'
//   } : { 
//     opacity: 1, 
//     y: 0,
//     scale: 1,
//     filter: 'blur(0px)'
//   },
//   animate: { 
//     opacity: 1, 
//     y: 0,
//     scale: 1,
//     filter: 'blur(0px)'
//   },
//   transition: { 
//     duration: shouldAnimate() ? 0.3 : 0,
//     ease: [0.25, 0.46, 0.45, 0.94]
//   }
// };

// // ============================================================================
// // COOL SIGNATURE ANIMATIONS
// // ============================================================================

// export const slideInFromBottom = {
//   initial: shouldAnimate() ? { 
//     opacity: 0, 
//     y: 40,
//     scale: 0.9,
//     rotateX: 15,
//     filter: 'blur(3px)',
//     transform: 'translate3d(0, 40px, 0) scale3d(0.9, 0.9, 1) rotateX(15deg)'
//   } : { 
//     opacity: 1, 
//     y: 0,
//     scale: 1,
//     rotateX: 0,
//     filter: 'blur(0px)',
//     transform: 'translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0deg)'
//   },
//   animate: { 
//     opacity: 1, 
//     y: 0,
//     scale: 1,
//     rotateX: 0,
//     filter: 'blur(0px)',
//     transform: 'translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0deg)'
//   },
//   transition: { 
//     duration: shouldAnimate() ? 0.5 : 0,
//     ease: [0.34, 1.56, 0.64, 1],
//     type: "spring",
//     damping: 20,
//     stiffness: 200
//   }
// };

// export const rotateOnHover = {
//   whileHover: shouldAnimate() ? { 
//     rotate: performanceMode === 'high' ? 3 : 1.5,
//     scale: 1.02,
//     filter: 'hue-rotate(10deg) saturate(1.2)',
//     transform: `rotate(${performanceMode === 'high' ? 3 : 1.5}deg) scale3d(1.02, 1.02, 1)`
//   } : {},
//   transition: { 
//     duration: 0.2,
//     ease: [0.25, 0.46, 0.45, 0.94],
//     type: "spring",
//     damping: 25,
//     stiffness: 400
//   }
// };

// // Magnetic effect for premium feel
// export const magneticHover = {
//   whileHover: shouldAnimate() ? { 
//     scale: 1.05,
//     rotate: [0, 1, -1, 0],
//     filter: 'brightness(1.1) contrast(1.1)',
//     boxShadow: "0 0 30px rgba(59, 130, 246, 0.3)"
//   } : {},
//   transition: { 
//     duration: 0.3,
//     rotate: { repeat: Infinity, repeatType: "reverse" as const, duration: 2 },
//     type: "spring",
//     damping: 15,
//     stiffness: 300
//   }
// };

// // ============================================================================
// // PERFORMANCE OPTIMIZED MICRO-ANIMATIONS
// // ============================================================================

// export const pulseAnimation = {
//   initial: { scale: 1 },
//   animate: shouldAnimate() ? { 
//     scale: [1, performanceMode === 'high' ? 1.02 : 1.01, 1],
//     filter: ['brightness(1)', 'brightness(1.05)', 'brightness(1)']
//   } : { scale: 1 },
//   transition: shouldAnimate() ? {
//     duration: performanceMode === 'high' ? 3 : 2,
//     repeat: Infinity,
//     ease: "easeInOut",
//     times: [0, 0.5, 1]
//   } : { duration: 0 }
// };

// export const quickFade = {
//   initial: { opacity: shouldAnimate() ? 0 : 1 },
//   animate: { opacity: 1 },
//   exit: { opacity: 0 },
//   transition: { 
//     duration: shouldAnimate() ? 0.15 : 0,
//     ease: "easeOut"
//   }
// };

// export const microSlide = {
//   initial: shouldAnimate() ? { 
//     opacity: 0, 
//     y: 10,
//     filter: 'blur(1px)',
//     transform: 'translate3d(0, 10px, 0)'
//   } : { 
//     opacity: 1, 
//     y: 0,
//     filter: 'blur(0px)',
//     transform: 'translate3d(0, 0, 0)'
//   },
//   animate: { 
//     opacity: 1, 
//     y: 0,
//     filter: 'blur(0px)',
//     transform: 'translate3d(0, 0, 0)'
//   },
//   transition: { 
//     duration: shouldAnimate() ? 0.2 : 0,
//     ease: [0.25, 0.46, 0.45, 0.94]
//   }
// };

// // ============================================================================
// // VIEWPORT AND PERFORMANCE SETTINGS
// // ============================================================================

// export const viewportOnce = {
//   once: true,
//   margin: "0px 0px -10% 0px", // Trigger slightly before element is visible
//   amount: 0.1
// };

// export const viewportDefault = {
//   once: true,
//   margin: "0px 0px -5% 0px",
//   amount: 0.05
// };

// export const viewportMobile = {
//   once: true,
//   margin: "0px",
//   amount: 0.1
// };

// // ============================================================================
// // PREMIUM EASING CURVES
// // ============================================================================

// export const easingPresets = {
//   instant: "linear",
//   fast: [0.4, 0, 0.2, 1],
//   smooth: [0.25, 0.46, 0.45, 0.94],
//   bounce: shouldAnimate() ? [0.68, -0.55, 0.265, 1.55] : "linear",
//   elastic: shouldAnimate() ? [0.175, 0.885, 0.32, 1.275] : "linear",
//   spring: shouldAnimate() ? [0.34, 1.56, 0.64, 1] : "linear",
//   premium: [0.25, 0.1, 0.25, 1],
//   magnetic: [0.645, 0.045, 0.355, 1]
// };

// // ============================================================================
// // SMART DELAYS AND PERFORMANCE UTILS
// // ============================================================================

// export const delays = {
//   instant: 0,
//   micro: 0.02,
//   short: 0.05,
//   medium: 0.1,
//   long: 0.2,
//   stagger: (index: number) => shouldAnimate() ? index * (performanceMode === 'high' ? 0.04 : 0.02) : 0
// };

// // Performance-aware variant generator
// export const getPerformanceVariant = (baseVariant: any) => {
//   if (!shouldAnimate()) {
//     return {
//       initial: baseVariant.animate || {},
//       animate: baseVariant.animate || {},
//       transition: { duration: 0 }
//     };
//   }
//   return baseVariant;
// };

// // Critical path optimization
// export const deferredAnimation = (animation: any, defer = true) => {
//   if (!defer || typeof window === 'undefined') return animation;
  
//   if (document.readyState !== 'complete') {
//     return {
//       initial: animation.animate || {},
//       animate: animation.animate || {},
//       transition: { duration: 0 }
//     };
//   }
//   return animation;
// };

// // ============================================================================
// // BATCH PROCESSING AND LAZY LOADING
// // ============================================================================

// export const batchStagger = {
//   container: {
//     animate: shouldAnimate() ? {
//       transition: {
//         staggerChildren: performanceMode === 'high' ? 0.03 : 0.015,
//         delayChildren: 0.05,
//         when: "beforeChildren"
//       }
//     } : {}
//   },
//   item: {
//     initial: shouldAnimate() ? { 
//       opacity: 0, 
//       y: 12,
//       scale: 0.98
//     } : { 
//       opacity: 1, 
//       y: 0,
//       scale: 1
//     },
//     animate: { 
//       opacity: 1, 
//       y: 0,
//       scale: 1,
//       transition: { 
//         duration: shouldAnimate() ? 0.25 : 0,
//         ease: [0.25, 0.46, 0.45, 0.94]
//       }
//     }
//   }
// };

// // IntersectionObserver-based lazy animations
// export const createLazyAnimation = (animation: any, threshold = 0.1) => {
//   if (typeof window === 'undefined') return animation;
  
//   return {
//     ...animation,
//     viewport: { once: true, amount: threshold },
//     initial: shouldAnimate() ? animation.initial : animation.animate
//   };
// };

// // ============================================================================
// // PERFORMANCE MONITORING
// // ============================================================================

// export const animationMetrics = {
//   totalAnimations: 0,
//   activeAnimations: 0,
//   skippedAnimations: 0,
//   performanceMode,
  
//   track(name: string, duration: number) {
//     this.totalAnimations++;
//     if (duration === 0) this.skippedAnimations++;
//     else this.activeAnimations++;
    
//     if (this.totalAnimations % 20 === 0) {
//       console.log(`🎯 Animation Performance: ${this.skippedAnimations}/${this.totalAnimations} optimized | Mode: ${performanceMode}`);
//     }
//   },
  
//   getStats() {
//     return {
//       total: this.totalAnimations,
//       active: this.activeAnimations,
//       skipped: this.skippedAnimations,
//       mode: performanceMode,
//       enabled: animationsEnabled
//     };
//   }
// };

// // ============================================================================
// // PERFORMANCE MODES
// // ============================================================================

// export const PERFORMANCE_MODE = {
//   HIGH: 'high',
//   NORMAL: 'normal', 
//   LOW: 'low',
//   DISABLED: 'disabled'
// };

// export const getPerformanceMode = () => performanceMode;

// // ============================================================================
// // OPTIMIZED ANIMATION EXPORTS
// // ============================================================================

// export const optimizedAnimations = {
//   fadeInUp: getPerformanceVariant(fadeInUp),
//   fadeInLeft: getPerformanceVariant(fadeInLeft),
//   fadeInRight: getPerformanceVariant(fadeInRight),
//   slideInFromBottom: getPerformanceVariant(slideInFromBottom),
//   microSlide: getPerformanceVariant(microSlide),
//   scaleOnHover: getPerformanceVariant(scaleOnHover),
//   cardHover: getPerformanceVariant(cardHover),
//   rotateOnHover: getPerformanceVariant(rotateOnHover),
//   magneticHover: getPerformanceVariant(magneticHover),
//   pulseAnimation: getPerformanceVariant(pulseAnimation)
// };

// // Export current performance info for debugging
// if (typeof window !== 'undefined') {
//   (window as any).__animationPerformance = {
//     mode: performanceMode,
//     enabled: animationsEnabled,
//     metrics: animationMetrics
//   };
// }