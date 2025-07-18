'use client';

import { motion, useInView, Variants, useScroll, useTransform } from 'framer-motion';
import { useRef, forwardRef, ReactNode } from 'react';
import { CldImage } from 'next-cloudinary';

// Base animated image component with multiple animation variants
interface AnimatedImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  delay?: number;
  duration?: number;
  variant?: 'fadeUp' | 'fadeIn' | 'scaleUp' | 'slideLeft' | 'slideRight' | 'parallax' | 'reveal';
  triggerOnce?: boolean;
  priority?: boolean;
  quality?: number;
  sizes?: string;
  fill?: boolean;
  crop?: string;
  gravity?: string;
  overlayChildren?: ReactNode;
  // Performance optimizations
  loading?: 'lazy' | 'eager';
  placeholder?: 'blur' | 'empty';
}

export const AnimatedImage = forwardRef<HTMLDivElement, AnimatedImageProps>(({
  src,
  alt,
  width,
  height,
  className = '',
  delay = 0,
  duration = 0.8,
  variant = 'fadeUp',
  triggerOnce = true,
  priority = false,
  quality = 80,
  sizes = '100vw',
  fill = false,
  gravity = 'center',
  overlayChildren,
  loading = 'lazy',
}, ) => {
  const motionRef = useRef(null);
  const isInView = useInView(motionRef, { 
    once: triggerOnce,
    margin: "-100px 0px -100px 0px"
  });

  // Animation variants for different effects
  const variants: Record<string, Variants> = {
    fadeUp: {
      hidden: {
        opacity: 0,
        y: 40,
        scale: 0.95,
      },
      visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
          duration,
          delay,
          ease: [0.25, 0.46, 0.45, 0.94],
        },
      },
    },
    fadeIn: {
      hidden: {
        opacity: 0,
        scale: 0.9,
      },
      visible: {
        opacity: 1,
        scale: 1,
        transition: {
          duration,
          delay,
          ease: [0.25, 0.46, 0.45, 0.94],
        },
      },
    },
    scaleUp: {
      hidden: {
        opacity: 0,
        scale: 0.8,
      },
      visible: {
        opacity: 1,
        scale: 1,
        transition: {
          duration: duration * 1.2,
          delay,
          ease: [0.34, 1.56, 0.64, 1],
        },
      },
    },
    slideLeft: {
      hidden: {
        opacity: 0,
        x: 60,
        scale: 0.95,
      },
      visible: {
        opacity: 1,
        x: 0,
        scale: 1,
        transition: {
          duration,
          delay,
          ease: [0.25, 0.46, 0.45, 0.94],
        },
      },
    },
    slideRight: {
      hidden: {
        opacity: 0,
        x: -60,
        scale: 0.95,
      },
      visible: {
        opacity: 1,
        x: 0,
        scale: 1,
        transition: {
          duration,
          delay,
          ease: [0.25, 0.46, 0.45, 0.94],
        },
      },
    },
    reveal: {
      hidden: {
        opacity: 0,
        clipPath: 'inset(0 100% 0 0)',
        scale: 1.1,
      },
      visible: {
        opacity: 1,
        clipPath: 'inset(0 0% 0 0)',
        scale: 1,
        transition: {
          duration: duration * 1.3,
          delay,
          ease: [0.25, 0.46, 0.45, 0.94],
          clipPath: {
            duration: duration * 1.1,
          },
        },
      },
    },
  };

  return (
    <motion.div
      ref={motionRef}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants[variant]}
      className={`relative overflow-hidden ${className}`}
      style={{
        willChange: 'transform, opacity',
        backfaceVisibility: 'hidden',
      }}
    >
      <CldImage
        src={src}
        alt={alt}
        width={width}
        height={height}
        fill={fill}
        gravity={gravity}
        quality={quality}
        sizes={sizes}
        priority={priority}
        loading={loading}
        className="object-cover w-full h-full"
        style={{
          willChange: 'transform',
          backfaceVisibility: 'hidden',
        }}
      />
      {overlayChildren && (
        <div className="absolute inset-0 flex items-center justify-center">
          {overlayChildren}
        </div>
      )}
    </motion.div>
  );
});

AnimatedImage.displayName = 'AnimatedImage';

// Parallax image component for hero sections
interface ParallaxImageProps extends Omit<AnimatedImageProps, 'variant'> {
  parallaxStrength?: number;
  containerHeight?: string;
}

export function ParallaxImage({
  src,
  alt,
  width,
  height,
  className = '',
  parallaxStrength = 0.3,
  containerHeight = '60vh',
  priority = true,
  quality = 90,
  overlayChildren,
}: ParallaxImageProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [`-${parallaxStrength * 100}%`, `${parallaxStrength * 100}%`]);

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      style={{ height: containerHeight }}
    >
      <motion.div
        style={{ y }}
        className="absolute inset-0 scale-110"
      >
        <CldImage
          src={src}
          alt={alt}
          width={width}
          height={height}
          crop="fill"
          gravity="center"
          quality={quality}
          priority={priority}
          sizes="100vw"
          className="object-cover w-full h-full"
          style={{
            willChange: 'transform',
            backfaceVisibility: 'hidden',
          }}
        />
      </motion.div>
      {overlayChildren && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          {overlayChildren}
        </div>
      )}
    </div>
  );
}

// Image gallery with staggered animations
interface AnimatedGalleryProps {
  images: Array<{
    src: string;
    alt: string;
    width: number;
    height: number;
  }>;
  className?: string;
  staggerDelay?: number;
  variant?: AnimatedImageProps['variant'];
  columns?: number;
  gap?: string;
}

export function AnimatedGallery({
  images,
  className = '',
  staggerDelay = 0.15,
  variant = 'fadeUp',
  columns = 3,
  gap = '1rem'
}: AnimatedGalleryProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: true,
    margin: "-50px 0px -50px 0px"
  });

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  };

  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      className={`grid ${gridCols[columns as keyof typeof gridCols]} ${className}`}
      style={{ gap }}
    >
      {images.map((image, index) => (
        <AnimatedImage
          key={index}
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          variant={variant}
          className="aspect-square rounded-lg"
          delay={0}
          duration={0.6}
        />
      ))}
    </motion.div>
  );
}

// Hover-enhanced image for property cards
// interface PropertyImageProps extends Omit<AnimatedImageProps, 'variant'> {
//   hoverScale?: number;
//   hoverDuration?: number;
//   badge?: ReactNode;
// }


// Preset components for common use cases
export const HeroImage = (props: Omit<AnimatedImageProps, 'variant'>) => 
  <AnimatedImage {...props} variant="fadeIn" priority={true} quality={90} />;

export const PropertyCardImage = (props: Omit<AnimatedImageProps, 'variant'>) => 
  <AnimatedImage {...props} variant="scaleUp" duration={0.6} />;

export const GalleryImage = (props: Omit<AnimatedImageProps, 'variant'>) => 
  <AnimatedImage {...props} variant="reveal" duration={0.8} />;

export const FeatureImage = (props: Omit<AnimatedImageProps, 'variant'>) => 
  <AnimatedImage {...props} variant="slideLeft" duration={0.7} />;