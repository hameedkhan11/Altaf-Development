import React from "react";
import { motion } from "framer-motion";
import {
  FaHome,
  FaDumbbell,
  FaChild,
  FaCouch,
  FaUtensils,
  FaSwimmingPool,
  FaComments,
  FaUsers,
} from "react-icons/fa";
import { AnimatedH3 } from "../ui/text-animations";

export const PropertyDetailAmenities: React.FC = () => {
  const propertyAmenities = [
    {
      icon: <FaHome className="w-8 h-8 text-[rgb(140,46,71)]" />,
      label: "CLUB HOUSE",
    },
    {
      icon: <FaDumbbell className="w-8 h-8 text-[rgb(140,46,71)]" />,
      label: "FULLY EQUIPPED GYM",
    },
    {
      icon: <FaChild className="w-8 h-8 text-[rgb(140,46,71)]" />,
      label: "KID'S PLAY GROUND",
    },
    {
      icon: <FaCouch className="w-8 h-8 text-[rgb(140,46,71)]" />,
      label: "SITTING AREA",
    },
    {
      icon: <FaUtensils className="w-8 h-8 text-[rgb(140,46,71)]" />,
      label: "BBQ AREA",
    },
    {
      icon: <FaSwimmingPool className="w-8 h-8 text-[rgb(140,46,71)]" />,
      label: "ROOFTOP INFINITY POOL",
    },
    {
      icon: <FaComments className="w-8 h-8 text-[rgb(140,46,71)]" />,
      label: "OUTDOOR DINING",
    },
    {
      icon: <FaUsers className="w-8 h-8 text-[rgb(140,46,71)]" />,
      label: "MEETING AREA",
    },
  ];

  // const itemVariants = {
  //   initial: {
  //     scale: 1,
  //     y: 0,
  //   },
  //   hover: {
  //     scale: 1.05,
  //     y: -8,
  //     transition: {
  //       type: "spring",
  //       stiffness: 300,
  //       damping: 20,
  //     },
  //   },
  // };

  // const iconVariants = {
  //   initial: {
  //     scale: 1,
  //     rotate: 0,
  //   },
  //   hover: {
  //     scale: 1.1,
  //     rotate: 5,
  //     transition: {
  //       type: "spring",
  //       stiffness: 400,
  //       damping: 15,
  //     },
  //   },
  // };

  return (
    <div className="mt-24">
      <div className="text-center mb-8">
        <AnimatedH3 className="text-3xl mb-4">What this property offers</AnimatedH3>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 gap-y-8 mx-auto mt-16 mb-24">
        {propertyAmenities.map((amenity, index) => (
          <motion.div
            key={index}
            className="flex flex-col items-center text-center cursor-pointer"
          >
            <motion.div
              className="w-24 h-24 rounded-full border-2 border-[rgb(140,46,71)] flex items-center justify-center mb-4 "
              initial="initial"
              whileHover="hover"
            >
              {amenity.icon}
            </motion.div>
            <span className="text-sm font-medium leading-tight">
              {amenity.label}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
