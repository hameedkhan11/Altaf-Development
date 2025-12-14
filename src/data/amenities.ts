// data/amenities.ts
// import { AmenitiesData } from "@/lib/types";

export interface AmenityData {
  id: string;
  name: string;
  title: string;
  description: string[];
  image: string;
  features: string[];
}

export interface SimpleAmenityData {
  name: string;
  image: string;
}

export interface AmenitiesData {
  [key: string]: AmenityData;
}

export const amenitiesData: AmenitiesData = {
  location: {
    id: "location",
    name: "Faisal Hills Islamabad",
    title: "Faisal Hills Islamabad",
    description: [
      "Nestled near the scenic Margalla Hills and connected through five major routes including M-1, M-2, GT Road, FMC, and B-17, Faisal Hills offers unmatched accessibility for residents and visitors alike. The community blends serene lifestyle amenities with bold infrastructure, making it ideal for families and investors.",
      "Family glow parks, dedicated football and cricket grounds, and scenic nature trails offer a peaceful yet active environment. Healthcare is set to reach new heights with a multi-kanal teaching hospital, designed to surpass even Shifa International in scale and services.",
      "A stunning hilltop restaurant is also underway, promising elevated dining with panoramic views. At the heart of Faisal Hills lies a vibrant downtown inspired by Defence Raya, featuring a dynamic food park and retail experience.",
      "The society is also emerging as an educational hub, with Roots International's largest campus and a designated university plot already in place. For hospitality, a luxury hotel is planned to enhance tourism and economic activity.",
      "Faisal Hills is not just a housing society it's a master-planned lifestyle community rising with vision and purpose.",
    ],
    image:
      "Faisal Hills/ALTAF DEVELOPMENTS WEBSITE IMAGES FAISAL HILLS  (1).jpg",
    features: [
      "High-end retail stores",
      "Gourmet dining options",
      "Entertainment venues",
      "Premium shopping experience",
    ],
  },
};

export const additionalAmenities = [
  {
    key: "shopping-mall",
    data: {
      name: "International Standard Mall",
      image:
        "Faisal Hills/ALTAF DEVELOPMENTS WEBSITE IMAGES FAISAL HILLS  (3).jpg",
    },
  },
  {
    key: "mosque",
    data: {
      name: "Mosque",
      image:
        "Faisal Hills/ALTAF DEVELOPMENTS WEBSITE IMAGES FAISAL HILLS  (12).jpg",
    },
  },
  {
    key: "schools-colleges-university",
    data: {
      name: "Schools Colleges University",
      image:
        "Faisal Hills/ALTAF DEVELOPMENTS WEBSITE IMAGES FAISAL HILLS  (2).jpg",
    },
  },
  {
    key: "arch-monument",
    data: {
      name: "Arch Monument",
      image: "Faisal Hills/Arch Monument.jpg",
    },
  },
];
