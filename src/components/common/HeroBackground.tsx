// Fixed HeroBackground.tsx
"use client";
import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { CldImage } from 'next-cloudinary';
import { HeroImage } from '@/lib/hero/types';
import sanityService from '@/lib/sanityService';

interface HeroBackgroundProps {
  heroImage?: HeroImage | null;
  type?: 'video' | 'image';
  src?: string;
  fallbackImage?: string;
  overlay?: 'light' | 'medium' | 'dark' | 'gradient' | 'none';
  className?: string;
  enableParallax?: boolean;
  parallaxSpeed?: number;
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
  enableParallax = true,
  parallaxSpeed = 0.5,
  videoOptimization = {}
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const smoothY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // FIXED: Better parallax calculations with proper bounds
  const parallaxDistance = 100 * parallaxSpeed;
  const y = useTransform(smoothY, [0, 1], [0, -parallaxDistance]);
  
  // FIXED: Dynamic scale based on parallax speed to prevent gaps
  const minScale = 1 + (parallaxSpeed * 0.2); // Scale increases with speed
  const maxScale = 1 + (parallaxSpeed * 0.3);
  const scale = useTransform(smoothY, [0, 1], [minScale, maxScale]);

  const imageSource = heroImage?.cloudinaryUrl || src;
  const altText = heroImage?.altText || "Hero Background";
  
  const getCloudinaryPublicId = (url: string) => {
    try {
      const urlObj = new URL(url);
      const pathSegments = urlObj.pathname.split('/');
      const uploadIndex = pathSegments.findIndex(segment => segment === 'upload');
      
      if (uploadIndex !== -1 && uploadIndex < pathSegments.length - 1) {
        const publicIdParts = pathSegments.slice(uploadIndex + 1);
        return publicIdParts.join('/').replace(/\.[^/.]+$/, '');
      }
      
      return pathSegments[pathSegments.length - 1].replace(/\.[^/.]+$/, '');
    } catch (error) {
      console.error('Error extracting Cloudinary public ID:', error);
      return url;
    }
  };

  const getOverlayClass = () => {
    if (heroImage?.overlaySettings?.hasOverlay) {
      const { overlayColor, overlayOpacity = 0.5 } = heroImage.overlaySettings;
      const opacityValue = Math.round(overlayOpacity * 100);
      
      switch (overlayColor) {
        case 'black':
          return `bg-black/${opacityValue}`;
        case 'white':
          return `bg-white/${opacityValue}`;
        case 'darkblue':
          return `bg-blue-900/${opacityValue}`;
        case 'custom':
          return '';
        default:
          return `bg-black/${opacityValue}`;
      }
    }
    
    switch (overlay) {
      case 'light':
        return 'bg-black/20';
      case 'medium':
        return 'bg-black/40';
      case 'dark':
        return 'bg-black/70';
      case 'gradient':
        return 'bg-gradient-to-b from-black/20 via-black/30 to-black/40';
      case 'none':
        return '';
      default:
        return 'bg-black/40';
    }
  };

  const getCustomOverlayStyle = (): React.CSSProperties | undefined => {
    if (heroImage?.overlaySettings?.hasOverlay && heroImage.overlaySettings.overlayColor === 'custom') {
      const opacity = heroImage.overlaySettings.overlayOpacity || 0.5;
      const color = heroImage.overlaySettings.customOverlayColor || '#000000';
      
      return {
        backgroundColor: `${color}${Math.round(opacity * 255).toString(16).padStart(2, '0')}`
      };
    }
    return undefined;
  };

  const buildVideoUrl = () => {
    const {
      quality = 'auto:good',
      format = 'auto',
      width = 1920,
      height = 1080,
      bitrate = '1000k',
      fps = 30
    } = videoOptimization;

    const transformations = [
      `q_${quality}`,
      `f_${format}`,
      `w_${width}`,
      `h_${height}`,
      `c_fill`,
      `br_${bitrate}`,
      `fps_${fps}`,
      'ac_none'
    ].join(',');

    return `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/video/upload/${transformations}/${src}`;
  };

  const buildResponsiveVideoSources = () => {
    const baseUrl = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/video/upload`;
    
    return [
      {
        src: `${baseUrl}/q_auto,f_auto,w_640,h_360,c_fill,ac_none/${src}`,
        media: '(max-width: 640px)'
      },
      {
        src: `${baseUrl}/q_auto,f_auto,w_1280,h_720,c_fill,ac_none/${src}`,
        media: '(max-width: 1024px)'
      },
      {
        src: `${baseUrl}/q_auto,f_auto,w_1920,h_1080,c_fill,ac_none/${src}`,
        media: '(min-width: 1025px)'
      }
    ];
  };

  if (!imageSource) {
    return null;
  }

  return (
    // FIXED: Better container with proper overflow handling
    <div 
      ref={containerRef} 
      className={`${className} overflow-hidden bg-gray-900`}
      style={{ backgroundColor: '#1f2937' }} // Fallback background
    >
      {enableParallax ? (
        <motion.div
          className="absolute w-full h-full will-change-transform"
          // FIXED: Better positioning for high parallax speeds
          style={{
            y,
            scale,
            top: `-${parallaxSpeed * 20}%`, // Dynamic top offset
            left: '-10%',
            width: '120%',
            height: `${120 + (parallaxSpeed * 40)}%`, // Dynamic height
          }}
        >
          <ParallaxContent
            type={type}
            src={imageSource}
            altText={altText}
            fallbackImage={fallbackImage}
            buildVideoUrl={buildVideoUrl}
            buildResponsiveVideoSources={buildResponsiveVideoSources}
            getCloudinaryPublicId={getCloudinaryPublicId}
            heroImage={heroImage}
          />
        </motion.div>
      ) : (
        <div className="absolute inset-0 w-full h-full">
          <ParallaxContent
            type={type}
            src={imageSource}
            altText={altText}
            fallbackImage={fallbackImage}
            buildVideoUrl={buildVideoUrl}
            buildResponsiveVideoSources={buildResponsiveVideoSources}
            getCloudinaryPublicId={getCloudinaryPublicId}
            heroImage={heroImage}
          />
        </div>
      )}
      
      {(heroImage?.overlaySettings?.hasOverlay || overlay !== 'none') && (
        <div 
          className={`absolute inset-0 z-10 ${getOverlayClass()}`}
          style={getCustomOverlayStyle()}
        />
      )}
    </div>
  );
};

// FIXED: Enhanced ParallaxContent component
const ParallaxContent: React.FC<{
  type: 'video' | 'image';
  src: string;
  altText: string;
  fallbackImage?: string;
  buildVideoUrl: () => string;
  buildResponsiveVideoSources: () => Array<{src: string; media: string}>;
  getCloudinaryPublicId: (url: string) => string;
  heroImage?: HeroImage | null;
}> = ({ 
  type, 
  src, 
  altText, 
  fallbackImage, 
  buildVideoUrl, 
  buildResponsiveVideoSources, 
  heroImage 
}) => {
  return (
    <>
      {type === 'video' ? (
        <>
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            className="absolute inset-0 w-full h-full object-cover z-0"
            style={{
              minWidth: '100%',
              minHeight: '100%',
            }}
            onError={(e) => console.error('Video error:', e)}
            poster={fallbackImage ? 
              `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_fill,w_1920,h_1080,f_auto,q_auto/${fallbackImage}` 
              : undefined
            }
          >
            {buildResponsiveVideoSources().map((source, index) => (
              <source
                key={index}
                src={source.src}
                media={source.media}
                type="video/mp4"
              />
            ))}
            
            <source
              src={buildVideoUrl()}
              type="video/mp4"
            />
          </video>
          
          {fallbackImage && (
            <div
              className="absolute inset-0 w-full h-full bg-cover bg-center z-0"
              style={{
                backgroundImage: `url(https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_fill,w_1920,h_1080,f_auto,q_auto/${fallbackImage})`,
                minWidth: '100%',
                minHeight: '100%',
              }}
            />
          )}
        </>
      ) : (
        <CldImage
          src={heroImage?.cloudinaryUrl ? sanityService.getCloudinaryPublicId(src) : src}
          alt={altText}
          fill
          sizes="100vw"
          priority
          className="absolute inset-0 object-cover z-0"
          style={{
            minWidth: '100%',
            minHeight: '100%',
          }}
        />
      )}
    </>
  );
};