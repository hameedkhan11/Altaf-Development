"use client";
import React from "react";
import { CldImage } from "next-cloudinary";
import { ApartmentType } from "@/components/apartment-detail/ApartmentDetail";

interface Room {
  number: number;
  name: string;
  description: string;
}

interface FloorPlanData {
  floorPlanImage: string;
  title: string;
  rooms: Room[];
}

type FloorPlanDataMap = Record<ApartmentType, FloorPlanData>;

// Floor plan data for each apartment type
const floorPlanData: FloorPlanDataMap = {
  studio: {
    floorPlanImage: "Studio_Apt_Floor_Plan_1_fvn6of",
    title: "Studio Floor Plan",
    rooms: [
      {
        number: 1,
        name: "Living Space",
        description: "Open concept living and sleeping area",
      },
      {
        number: 2,
        name: "Kitchen",
        description: "Compact efficient kitchen space",
      },
      {
        number: 3,
        name: "Bathroom",
        description: "Full bathroom with modern fixtures",
      },
      {
        number: 4,
        name: "Balcony",
        description: "Private outdoor space with city views",
      },
      {
        number: 5,
        name: "Dining Room",
        description: "Spacious dining area for entertaining",
      },

    ],
  },
  "1 bed": {
    floorPlanImage: "1_Bed_Apt_Floor_Plan_1_lspaci",
    title: "1 Bedroom Floor Plan",
    rooms: [
      {
        number: 1,
        name: "Bedroom",
        description: "Spacious bedroom with ample storage",
      },
      {
        number: 2,
        name: "Kitchen",
        description: "Modern kitchen with dining space",
      },
      {
        number: 3,
        name: "Living Room",
        description: "Comfortable living area for relaxation",
      },
      {
        number: 4,
        name: "Bathroom",
        description: "Full bathroom with premium finishes",
      },
      {
        number: 5,
        name: "Balcony",
        description: "Private balcony with panoramic views",
      },
    ],
  },
  "2 bed": {
    floorPlanImage: "2_Bed_Apt_Floor_Plan_1_krate4",
    title: "2 Bedroom Floor Plan",
    rooms: [
      {
        number: 1,
        name: "Master Bedroom",
        description: "Large master suite with walk-in closet",
      },
      {
        number: 2,
        name: "Second Bedroom",
        description: "Spacious second bedroom with built-ins",
      },
      {
        number: 3,
        name: "Kitchen",
        description: "Full kitchen with modern appliances",
      },
      {
        number: 4,
        name: "Living Room",
        description: "Generous living space for entertainment",
      },
      {
        number: 5,
        name: "Dining Area",
        description: "Dedicated dining space for family meals",
      },
      {
        number: 6,
        name: "Bathrooms",
        description: "Two full bathrooms with luxury fixtures",
      },
      {
        number: 7,
        name: "Balcony",
        description: "Spacious balcony with stunning views",
      },
    ],
  },
};

interface FloorPlanComponentProps {
  type: ApartmentType;
}

const FloorPlanComponent: React.FC<FloorPlanComponentProps> = ({ type }) => {
  // Get floor plan data for the specified type
  const planData = floorPlanData[type];

  // If invalid type, show fallback
  if (!planData) {
    return (
      <div className="bg-white py-8 sm:py-12 md:py-16 lg:py-20">
        <div className="mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <p className="text-center text-gray-600 text-sm sm:text-base">
            Floor plan not available for this apartment type.
          </p>
        </div>
      </div>
    );
  }

  const { floorPlanImage, title, rooms } = planData;

  return (
    <div className="bg-white py-8 sm:py-12 md:py-16 lg:py-20">
      <div className="mx-auto px-4 sm:px-8 md:px-12 lg:px-16">
        {/* Title */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-light mb-8 sm:mb-10 md:mb-12 lg:mb-16">
          {title}
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 sm:gap-8 md:gap-10 lg:gap-16">
          {/* Left Side - Floor Plan Image */}
          <div className="w-full lg:col-span-3">
            {/* Floor Plan Image */}
            <div className="relative w-full aspect-[16/9] rounded-lg overflow-hidden shadow-sm">
              <CldImage
                src={floorPlanImage}
                alt={`${title} - Floor Plan`}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 90vw, 60vw"
              />
            </div>
          </div>

          {/* Right Side - Room List */}
          <div className="w-full space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-8 lg:col-span-2">
            {rooms.map((room) => (
              <div
                key={room.number}
                className="flex items-start gap-3 sm:gap-4 pb-3 sm:pb-4 border-b border-[rgb(140,46,71)] last:border-b-0"
              >
                {/* Number Circle */}
                <div className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[rgb(140,46,71)] text-white flex items-center justify-center text-xs sm:text-sm font-medium">
                  {room.number}
                </div>

                {/* Room Info */}
                <div className="flex-1">
                  <h3 className="text-base sm:text-lg md:text-xl font-medium text-[rgb(140,46,71)] mb-1">
                    {room.name}
                  </h3>
                  <p className="text-xs sm:text-sm md:text-base text-gray-700">
                    {room.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FloorPlanComponent;