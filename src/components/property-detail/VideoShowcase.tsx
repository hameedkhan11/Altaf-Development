import React, { useState } from 'react';
import { HiPlay } from 'react-icons/hi2';
import { CldImage, CldVideoPlayer } from 'next-cloudinary';
import 'next-cloudinary/dist/cld-video-player.css';

const VideoShowcase = ({ 
  thumbnailId = "imgi_4442_b10d4f101476497.5f1fdce5873f0_czr5uk",
  videoId = "output_compressed_mxrt56"
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayClick = () => {
    setIsPlaying(true);
  };

  return (
    <div className="relative w-full h-[70vh] md:h-[80vh] lg:h-screen bg-black flex items-center justify-center overflow-hidden">
      {!isPlaying ? (
        <>
          {/* Background Image/Video Thumbnail */}
          <div className="absolute inset-0">
            <CldImage
              src={thumbnailId}
              alt="Video Thumbnail"
              fill
              className="object-cover opacity-70"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-black/30"></div>
          </div>

          {/* Content Container */}
          <div className="relative z-10 text-center px-4">
            {/* Play Button */}
            <button
              onClick={handlePlayClick}
              className="group mb-8 cursor-pointer md:mb-12 relative"
              aria-label="Play video"
            >
              {/* Outer Circle - Animated */}
              <div className="absolute inset-0 w-20 h-20 xs:w-24 xs:h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-56 lg:h-56 mx-auto rounded-full border-2 border-white/30 animate-[pulse_2s_ease-in-out_infinite]"></div>
     
              {/* Inner Circle with Play Icon */}
              <div className="relative w-20 h-20 xs:w-24 xs:h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-56 lg:h-56 mx-auto rounded-full border border-white/30 flex items-center justify-center transition-all duration-300 group-hover:bg-white/20 group-hover:scale-105">
                <HiPlay className="w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 text-white ml-1 sm:ml-2" />
              </div>
            </button>
          </div>

          {/* Decorative Pattern Overlay */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-0 right-0 h-24 sm:h-32 bg-gradient-to-b from-black/50 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 h-24 sm:h-32 bg-gradient-to-t from-black/50 to-transparent"></div>
          </div>
        </>
      ) : (
        /* Video Player */
        <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-black">
          <div className="w-full h-full max-w-full max-h-full flex items-center justify-center px-2 sm:px-4 md:px-6 lg:px-8">
            <CldVideoPlayer
              id="cloudinary-video-player"
              width="1920"
              height="1080"
              src={videoId}
              autoplay="always"
              controls
              fluid={true}
              className="w-full h-auto max-h-full"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoShowcase;