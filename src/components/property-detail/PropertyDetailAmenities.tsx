import React from "react";
import {
  FaCar,
  FaTshirt,
  FaBuilding,
  FaDumbbell,
  FaHotTub,
  FaSpa,
  FaSwimmingPool,
  FaCut,
  FaShoppingCart,
  FaCoffee,
  FaBook,
  FaMosque,
  FaFilm,
  FaGamepad,
  FaUsers,
  FaFire,
  // FaBuilding as FaRoof,
  // FaVideo,
  FaBriefcase,
} from "react-icons/fa";
import { MdSecurity, MdRoofing } from "react-icons/md";

interface Amenity {
  name: string;
  icon: React.ReactNode;
}

const ResidenceAmenities: React.FC = () => {
  const amenities: Amenity[] = [
    { name: "Smart car parking", icon: <FaCar /> },
    { name: "Laundry services", icon: <FaTshirt /> },
    { name: "Grand entrance lobby", icon: <FaBuilding /> },
    { name: "Gym", icon: <FaDumbbell /> },
    { name: "Sauna", icon: <FaHotTub /> },
    { name: "Spa", icon: <FaSpa /> },
    { name: "Indoor pool", icon: <FaSwimmingPool /> },
    { name: "Barber shop", icon: <FaCut /> },
    { name: "Grocery store", icon: <FaShoppingCart /> },
    { name: "Cafe shop", icon: <FaCoffee /> },
    { name: "Tuition centre", icon: <FaBook /> },
    { name: "Mosque", icon: <FaMosque /> },
    { name: "Cinema", icon: <FaFilm /> },
    { name: "Snooker", icon: <FaGamepad /> },
    { name: "Meet-up area", icon: <FaUsers /> },
    { name: "BBQ area", icon: <FaFire /> },
    { name: "Roof top", icon: <MdRoofing /> },
    { name: "24/7 security camera", icon: <MdSecurity /> },
    { name: "Management office", icon: <FaBriefcase /> },
  ];

  return (
    <div className="w-full mx-auto py-24 px-16">
      <div className="text-center">
        <h2 className="text-4xl md:text-5xl mb-20">THE RESIDENCES AMENITIES</h2>
      </div>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-8 list-none">
        {amenities.map((amenity, index) => (
          <li key={index} className="flex items-center space-x-3">
            <div className="flex-shrink-0 text-[rgb(140,46,71)] text-lg">
              {amenity.icon}
            </div>
            <span className="text-gray-800 font-medium">{amenity.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ResidenceAmenities;
