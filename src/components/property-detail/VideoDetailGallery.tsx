// "use client";
// import React, { useState, useRef } from "react";
// import { PropertyKey } from "@/lib/types";
// import { FiPlay, FiPause } from "react-icons/fi";

// interface VideoGalleryProps {
//   propertyType: PropertyKey;
//   videoId?: string;
//   title?: string;
//   fallbackImage?: string;
// }

// export const VideoGallery: React.FC<VideoGalleryProps> = ({ 
//   propertyType, 
//   videoId = "video2_lzrdux",
//   title = "Property Tour",
//   fallbackImage = "luxury-apartment-hero-gallery"
// }) => {
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [showControls, setShowControls] = useState(true);
//   const videoRef = useRef<HTMLVideoElement>(null);

//   // Cloudinary video URL generator
//   const getCloudinaryVideoUrl = (publicId: string) => {
//     return `https://res.cloudinary.com/your-cloud-name/video/upload/q_auto,f_auto/${publicId}`;
//   };

//   // Generate thumbnail URL from video as poster
//   const getThumbnailUrl = (publicId: string) => {
//     return `https://res.cloudinary.com/your-cloud-name/video/upload/so_2,q_auto,f_auto,c_fill,w_1200,h_800/${publicId}.jpg`;
//   };

//   // Fallback image URL
//   const getFallbackImageUrl = (publicId: string) => {
//     return `https://res.cloudinary.com/your-cloud-name/image/upload/q_auto,f_auto,c_fill,w_1200,h_800/${publicId}.jpg`;
//   };

//   const togglePlay = () => {
//     if (videoRef.current) {
//       if (isPlaying) {
//         videoRef.current.pause();
//       } else {
//         videoRef.current.play();
//       }
//     }
//   };

//   const handlePlay = () => {
//     setIsPlaying(true);
//     setShowControls(false);
//   };

//   const handlePause = () => {
//     setIsPlaying(false);
//     setShowControls(true);
//   };

//   const handleVideoClick = () => {
//     togglePlay();
//   };

//   return (
//     <div className="w-full">
//       <div 
//         className="relative bg-black rounded-lg overflow-hidden shadow-lg group cursor-pointer"
//         onClick={handleVideoClick}
//         onMouseEnter={() => setShowControls(true)}
//         onMouseLeave={() => !isPlaying && setShowControls(true)}
//       >
//         <video
//           ref={videoRef}
//           className="w-full h-auto object-cover"
//           poster={getThumbnailUrl(videoId)}
//           onPlay={handlePlay}
//           onPause={handlePause}
//           onError={(e) => {
//             console.error('Video failed to load:', e);
//             // Set fallback image if video fails to load
//             e.currentTarget.poster = getFallbackImageUrl(fallbackImage);
//           }}
//           controls={false}
//           muted
//           playsInline
//           preload="metadata"
//         >
//           <source src={getCloudinaryVideoUrl(videoId)} type="video/mp4" />
//           <source src={`${getCloudinaryVideoUrl(videoId)}.webm`} type="video/webm" />
//           <source src={`${getCloudinaryVideoUrl(videoId)}.ogv`} type="video/ogg" />
//           {/* Fallback for browsers that don't support video */}
//           <img 
//             src={getFallbackImageUrl(fallbackImage)} 
//             alt={title}
//             className="w-full h-auto object-cover"
//           />
//         </video>
        
//         {/* Play/Pause Button Overlay */}
//         {showControls && (
//           <div className="absolute inset-0 flex items-center justify-center bg-black/20 transition-all duration-300">
//             <div className="bg-white/80 backdrop-blur-sm rounded-full p-6 hover:bg-white/90 transition-all duration-300 hover:scale-110">
//               {isPlaying ? (
//                 <FiPause className="w-12 h-12 text-gray-800" />
//               ) : (
//                 <FiPlay className="w-12 h-12 text-gray-800 ml-1" />
//               )}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };