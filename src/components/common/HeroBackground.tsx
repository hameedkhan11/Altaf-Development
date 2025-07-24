// Fixed HeroBackground.tsx
"use client";
import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { CldImage } from 'next-cloudinary';
import { HeroImage } from '@/lib/hero/types';

interface HeroBackgroundProps {
  heroImage?: HeroImage | null;
  type?: 'video' | 'image';
  src?: string; // This will be the public ID for images, or a video source
  fallbackImage?: string;
  overlay?: 'light' | 'medium' | 'dark' | 'gradient' | 'none';
  className?: string;
  videoOptimization?: {
    quality?: 'auto' | 'auto:low' | 'auto:good' | 'auto:best' | number;
    format?: 'auto' | 'mp4' | 'webm';
    width?: number;
    height?: number;
    bitrate?: string;
    fps?: number;
  };
}

export const HeroBackground: React.FC<HeroBackgroundProps> = ({
  heroImage,
  type = 'image',
  src,
  fallbackImage,
  overlay = 'medium',
  className = "absolute inset-0 w-full h-full",
  videoOptimization = {}
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const parallaxSpeed = 0.3; // Default parallax speed

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const smoothY = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const y = useTransform(smoothY, [0, 1], [0, -(100 * parallaxSpeed)]);
  const scale = useTransform(smoothY, [0, 1], [1 + (parallaxSpeed * 0.2), 1 + (parallaxSpeed * 0.3)]);

  // Use the public ID from the src prop. For videos, this is the video public ID.
  const publicId = src;
  const altText = heroImage?.altText ?? "Hero background image";

  const getOverlayClass = () => {
    // Prioritize overlay settings from Sanity
    if (heroImage?.overlaySettings?.hasOverlay) {
      const { overlayColor, overlayOpacity = 0.5 } = heroImage.overlaySettings;
      const opacityValue = Math.round(overlayOpacity * 100);
      switch (overlayColor) {
        case 'black': return `bg-black/${opacityValue}`;
        case 'white': return `bg-white/${opacityValue}`;
        case 'darkblue': return `bg-blue-900/${opacityValue}`;
        case 'custom': return '';
        default: return `bg-black/${opacityValue}`;
      }
    }
    // Fallback to prop-based overlay
    switch (overlay) {
      case 'light': return 'bg-black/20';
      case 'medium': return 'bg-black/40';
      case 'dark': return 'bg-black/70';
      case 'gradient': return 'bg-gradient-to-b from-black/20 via-black/30 to-black/40';
      case 'none': return '';
      default: return 'bg-black/40';
    }
  };

  const getCustomOverlayStyle = (): React.CSSProperties | undefined => {
    if (heroImage?.overlaySettings?.hasOverlay && heroImage.overlaySettings.overlayColor === 'custom') {
      const opacity = heroImage.overlaySettings.overlayOpacity || 0.5;
      const color = heroImage.overlaySettings.customOverlayColor || '#000000';
      return { backgroundColor: `${color}${Math.round(opacity * 255).toString(16).padStart(2, '0')}` };
    }
    return undefined;
  };
  
  // Return null if there is no source for either image or video
  if (!publicId) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className={`${className} overflow-hidden bg-gray-900`}
      style={{ backgroundColor: '#1f2937' }}
    >
      <motion.div
        className="absolute w-full h-full will-change-transform"
        style={{
          y, scale,
          top: `-${parallaxSpeed * 20}%`,
          left: '-10%',
          width: '120%',
          height: `${120 + (parallaxSpeed * 40)}%`,
        }}
      >
        <ParallaxContent
          type={type}
          publicId={publicId}
          altText={altText}
          fallbackImage={fallbackImage}
          videoOptimization={videoOptimization}
        />
      </motion.div>

      {(heroImage?.overlaySettings?.hasOverlay || overlay !== 'none') && (
        <div className={`absolute inset-0 z-10 ${getOverlayClass()}`} style={getCustomOverlayStyle()} />
      )}
    </div>
  );
};

// ParallaxContent now cleanly accepts a publicId
const ParallaxContent: React.FC<{
  type: 'video' | 'image';
  publicId: string;
  altText: string;
  fallbackImage?: string;
  videoOptimization: HeroBackgroundProps['videoOptimization'];
}> = ({ type, publicId, altText, fallbackImage, videoOptimization }) => {
  const buildVideoUrl = () => {
    const { quality = 'auto:good', format = 'auto' } = videoOptimization ?? {};
    const transformations = `q_${quality},f_${format},w_1920,c_fill,ac_none`;
    return `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/video/upload/${transformations}/${publicId}`;
  };

  return (
    <>
      {type === 'video' ? (
        <video
          autoPlay loop muted playsInline preload="metadata"
          className="absolute inset-0 w-full h-full object-cover z-0"
          poster={fallbackImage ? `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_fill,w_1920,h_1080,f_auto,q_auto/${fallbackImage}` : undefined}
        >
          <source src={buildVideoUrl()} type="video/mp4" />
        </video>
      ) : (
        <CldImage
          src={publicId} // Directly use the publicId
          alt={altText}
          fill
          sizes="100vw"
          priority
          className="absolute inset-0 object-cover z-0"
        />
      )}
    </>
  );
};