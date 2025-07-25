// FAQCTA.tsx
import React, { useState, useRef, useEffect } from "react";
import { Phone } from "lucide-react";
import { AnimatedH3, AnimatedP } from "../ui/text-animations";

// Function to get Cloudinary video URL
const getCloudinaryVideoUrl = (publicId: string, options?: {
  quality?: string;
  format?: string;
  width?: number;
  height?: number;
}) => {
  // Replace with your actual Cloudinary cloud name
  const cloudName = `${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}`; // Change this to your actual cloud name
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
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // Replace with your actual Cloudinary video public ID
  const videoPublicId = 'Comp_1_1_jjidyq';
  
  // Generate video URLs
  const mp4Url = getCloudinaryVideoUrl(videoPublicId, { 
    format: 'mp4', 
    quality: 'auto',
    width: 1600,
    height: 1200
  });
  
  const webmUrl = getCloudinaryVideoUrl(videoPublicId, { 
    format: 'webm', 
    quality: 'auto',
    width: 1600,
    height: 1200
  });

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

  // Force video play on mount (some browsers need this)
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
  }, []);

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
            <source src={mp4Url} type="video/mp4" />
            <source src={webmUrl} type="video/webm" />
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
          <button className="inline-flex items-center px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-4 bg-neutral-900 cursor-pointer text-white font-medium rounded-lg hover:bg-neutral-800 transition-colors duration-300 shadow-sm text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:ring-opacity-50">
            <Phone className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
            Contact Our Team
          </button>
        </div>
      </div>
    </div>
  );
};

export default FAQCTA;