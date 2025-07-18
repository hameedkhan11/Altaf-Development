"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NAVIGATION_ITEMS } from "@/lib/constants";
import Link from "next/link";
import { ChevronRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MEDIA_ITEMS } from "@/data/media-center/data";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  scrolled?: boolean;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const [isMediaCenterOpen, setIsMediaCenterOpen] = useState(false);

  const toggleMediaCenter = () => {
    setIsMediaCenterOpen(!isMediaCenterOpen);
  };

  // Handle body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    // Cleanup function to restore scroll when component unmounts
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: "-100%" }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: "-100%" }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed inset-0 bg-white z-50 md:hidden overflow-y-auto"
        >
          {/* Close Button */}
          <div className="flex justify-end p-6">
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
            >
              <X className="h-6 w-6 text-gray-600" />
            </button>
          </div>

          {/* Menu Content */}
          <div className="px-6 py-4">
            {/* Navigation Items */}
            <div className="space-y-0">
              {NAVIGATION_ITEMS.filter(
                (item) => item.name !== "MEDIA CENTER"
              ).map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                >
                  <Link
                    href={item.href}
                    className="flex items-center justify-between py-3 text-gray-800 hover:text-[rgb(140,46,71)] transition-colors duration-200 group border-b border-gray-100"
                    onClick={onClose}
                  >
                    <span className="font-medium uppercase tracking-wide">
                      {item.name}
                    </span>
                    <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-[rgb(140,46,71)] transition-all duration-200 group-hover:translate-x-1" />
                  </Link>
                </motion.div>
              ))}

              {/* Media Center with Expandable Submenu */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: NAVIGATION_ITEMS.length * 0.1,
                  duration: 0.3,
                }}
                className="border-b border-gray-100"
              >
                <button
                  onClick={toggleMediaCenter}
                  className="flex items-center justify-between py-3 text-gray-800 hover:text-[rgb(140,46,71)] transition-colors duration-200 group w-full"
                >
                  <span className="font-medium uppercase tracking-wide">
                    MEDIA CENTER
                  </span>
                  <motion.div
                    animate={{ rotate: isMediaCenterOpen ? 90 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-[rgb(140,46,71)] transition-colors duration-200" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {isMediaCenterOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="pl-4 pb-4 space-y-3">
                        {MEDIA_ITEMS.map((mediaItem, mediaIndex) => {
                          const IconComponent = mediaItem.icon;
                          return (
                            <motion.div
                              key={mediaItem.name}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{
                                delay: mediaIndex * 0.05,
                                duration: 0.2,
                              }}
                            >
                              <Link
                                href={mediaItem.href}
                                className="flex items-center justify-between space-x-3 hover:text-[rgb(140,46,71)] transition-colors duration-200 group"
                                onClick={onClose}
                              >
                                <div>
                                  <div className="text-sm font-medium uppercase tracking-wide">
                                    {mediaItem.name}
                                  </div>
                                </div>
                                <IconComponent className="h-4 w-4 text-gray-600 group-hover:text-[rgb(140,46,71)] transition-colors duration-200" />
                              </Link>
                            </motion.div>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 space-y-4">
              {/* Contact Now Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: (NAVIGATION_ITEMS.length + 1) * 0.1,
                  duration: 0.3,
                }}
              >
                <Link href="/contact" onClick={onClose}>
                  <Button className="group relative transition-all duration-500 bg-[rgb(140,46,71)] text-white hover:bg-transparent hover:text-[rgb(140,46,71)] border-2 border-[rgb(140,46,71)] cursor-pointer font-bold overflow-hidden py-5 w-full text-sm tracking-wider uppercase rounded-full">
                    Contact Now
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
