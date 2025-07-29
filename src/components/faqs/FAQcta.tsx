// FAQCTA.tsx
import React, { useState, useRef, useEffect } from "react";
import { Phone } from "lucide-react";
import { AnimatedH3, AnimatedP } from "../ui/text-animations";
import Link from "next/link";

// Function to get Cloudinary video URL
const getCloudinaryVideoUrl = (publicId: string, options?: {
  quality?: string;
  format?: string;
  width?: number;
  height?: number;
}) => {
  // Replace with your actual Cloudinary cloud name
  const cloudName = `${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}`;
  const baseUrl = `https://res.cloudinary.com/${cloudName}/video/upload/`;
  
  const transformations = [];
  
  // Add crop and resize for better background video performance
  transformations.push('c_fill'); // Crop to fill
  if (options?.width && options?.height) {
    transformations.push(`w_${options.width},h_${options.height}`);
  }
  if (options?.quality) transformations.push(`q_${options.quality}`);
  if (options?.format) transformations.push(`f_${options.format}`);
  
  const transformationString = transformations.length > 0 ? transformations.join(',') + '/' : '';
  
  return `${baseUrl}${transformationString}${publicId}`;
};

const FAQCTA: React.FC = () => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [screenSize, setScreenSize] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Replace with your actual Cloudinary video public ID
  const videoPublicId = 'Comp_1_1_jjidyq';
  
  // Detect screen size for optimal video dimensions
  useEffect(() => {
    const updateScreenSize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setScreenSize('mobile');
      } else if (width < 1024) {
        setScreenSize('tablet');
      } else {
        setScreenSize('desktop');
      }
    };

    updateScreenSize();
    window.addEventListener('resize', updateScreenSize);
    return () => window.removeEventListener('resize', updateScreenSize);
  }, []);

  // Generate responsive video URLs based on screen size
  const getVideoUrls = () => {
    const dimensions = {
      mobile: { width: 800, height: 600 },
      tablet: { width: 1200, height: 800 },
      desktop: { width: 1600, height: 1200 }
    };

    const { width, height } = dimensions[screenSize];
    
    return {
      mp4: getCloudinaryVideoUrl(videoPublicId, { 
        format: 'mp4', 
        quality: 'auto',
        width,
        height
      }),
      webm: getCloudinaryVideoUrl(videoPublicId, { 
        format: 'webm', 
        quality: 'auto',
        width,
        height
      })
    };
  };

  const { mp4, webm } = getVideoUrls();

  // Handle video load
  const handleVideoLoad = () => {
    setVideoLoaded(true);
    setVideoError(false);
  };

  // Handle video error
  const handleVideoError = () => {
    setVideoError(true);
    console.error('Video failed to load. Check your Cloudinary settings and video public ID.');
  };

  // Force video play and handle responsive reloading
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.load();
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.error('Video autoplay failed:', error);
        });
      }
    }
  }, [mp4, webm]); // Reload when URLs change due to screen size

  return (
    <div className="mt-8 sm:mt-12 md:mt-16 lg:mt-20 text-center">
      <div className="rounded-xl p-4 sm:p-6 md:p-8 lg:p-12 shadow-sm relative overflow-hidden">
        {/* Background Video */}
        {!videoError && (
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            onLoadedData={handleVideoLoad}
            onError={handleVideoError}
            style={{ 
              opacity: videoLoaded ? 1 : 0,
              transition: 'opacity 0.5s ease-in-out'
            }}
          >
            <source src={mp4} type="video/mp4" />
            <source src={webm} type="video/webm" />
          </video>
        )}
        
        {/* Fallback background color if video fails or while loading */}
        <div 
          className={`absolute inset-0 bg-[rgb(140,46,71)] transition-opacity duration-500 ${
            videoLoaded && !videoError ? 'opacity-70' : 'opacity-100'
          }`}
        />
        {/* Content - positioned above video */}
        <div className="relative z-10">
          <AnimatedH3 className="text-xl sm:text-2xl md:text-3xl font-light mb-2 sm:mb-3 md:mb-4 text-white px-2 sm:px-0">
            Still have questions?
          </AnimatedH3>
          <AnimatedP className="mb-4 sm:mb-6 md:mb-8 max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-white leading-relaxed px-2 sm:px-4 md:px-0">
            Our luxury real estate specialists are available 24/7 to provide
            personalized consultation and answer any specific questions about
            your property needs.
          </AnimatedP>
          <Link 
            href="/contact" 
            className="inline-flex items-center px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-4 bg-neutral-900 cursor-pointer text-white font-medium rounded-full hover:bg-neutral-800 transition-colors duration-300 shadow-sm text-sm sm:text-base">
            <Phone className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
            Contact Our Team
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FAQCTA;