"use client";

import { CldImage } from "next-cloudinary";

interface LeadershipImageProps {
  imageSrc: string;
  imageAlt: string;
}

const LeadershipImage = ({ imageSrc, imageAlt }: LeadershipImageProps) => {
  return (
    <div className="relative aspect-[5/4] w-full overflow-hidden shadow-lg rounded-sm group">
      <div className="w-full h-full transition-transform duration-400 ease-out group-hover:scale-[1.02]">
        <CldImage
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover object-center"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 50vw"
          priority
        />
      </div>
    </div>
  );
};

export default LeadershipImage;