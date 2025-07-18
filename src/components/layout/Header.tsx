// components/Header.tsx
"use client";

import React, { useState, useEffect } from "react";
// import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Menu,
  X,
  ArrowRight,
} from "lucide-react";
import { NAVIGATION_ITEMS } from "@/lib/constants";
import Link from "next/link";
import MediaCenterDropdown from "../ui/media-center-dropdown";

// Import SVG as React component
import AltafLogo from "../../../public/logos/ALTAF-LOGO2.svg"
import MobileMenu from "./MobileMenu";
import { Animate } from "../ui/animate";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showBackgroundOverlay] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Set client-side rendering flag
    setIsClient(true);
    
    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Check initial mobile state
    checkMobile();

    // Check initial scroll position on component mount
    const checkInitialScroll = () => {
      const scrollPosition = window.scrollY;
      setScrolled(scrollPosition > 100);
    };

    // Check scroll position immediately
    checkInitialScroll();

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setScrolled(scrollPosition > 100);
    };

    const handleResize = () => {
      checkMobile();
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <Animate
      type="stagger"
        className={`fixed w-full h-20 transition-all duration-500 ease-in-out font-avenir ${
          scrolled
            ? "z-30 backdrop-blur-lg bg-white shadow-lg"
            : "z-30"
        } ${showBackgroundOverlay ? "opacity-0" : "opacity-100"}`}
      >
        {/* Background image overlay for initial state */}
        {!scrolled && (
          <div className="absolute inset-0 bg-cover bg-center opacity-0" />
        )}

        <div className="container mx-auto px-6 h-full relative z-10">
          <div className="flex items-center justify-between h-full">
            {/* Left Navigation */}
            <nav className={`hidden lg:flex items-center space-x-12 ml-12 transition-opacity duration-500 ${
              showBackgroundOverlay ? "opacity-0" : "opacity-100"
            }`}>
              {NAVIGATION_ITEMS.map((item) => (
                <React.Fragment key={item.name}>
                  {item.name === "MEDIA CENTER" ? (
                    <MediaCenterDropdown scrolled={scrolled} />
                  ) : (
                    <Link
                      href={item.href}
                      className={`transition-all duration-500 text-sm relative group ${
                        scrolled
                          ? "text-foreground hover:text-[rgb(140,46,71)] hover:font-bold"
                          : "text-white  hover:text-[rgb(255,167,186)] hover:font-bold space-x-4"
                      }`}
                    >
                      <span className={`tracking-widest ${scrolled ? "text-xs" : "text-sm"}`}>{item.name}</span>
                   { scrolled &&  <span
                        className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full bg-[rgb(140,46,71)]`}
                      /> }
                    </Link>
                  )}
                </React.Fragment>
              ))}
            </nav>

            {/* Center Logo - Simplified without animation */}
            <div className="flex items-center absolute left-1/2 transform -translate-x-1/2">
              <Link
                href={"/"}
                className="cursor-pointer pt-6 flex items-center relative"
              >
                {/* Logo using SVGR */}
                <AltafLogo 
                  className={`cursor-pointer transition-all duration-500 ${
                    isClient && isMobile ? 'w-[120px] h-[88px]' : 'lg:w-[150px] lg:h-[100px] mb-4'
                  } ${
                    !scrolled 
                      ? "text-white" // White when not scrolled
                      : "text-[#8c2e47]" // Brand color when scrolled
                  }`}
                />
              </Link>
            </div>

            {/* Right Side - Contact Button */}
            <div className="hidden lg:flex items-center space-x-4">
              <Link href="/contact">
                <Button
                  className={`group relative transition-all duration-500 px-5 bg-transparent cursor-pointer rounded-full font-bold mr-8 overflow-hidden py-6 ${
                    scrolled
                      ? "bg-[rgb(140,46,71)] text-white hover:bg-[rgb(120,40,61)] "
                      : "bg-white text-[rgb(140,46,71)] hover:bg-gray-100"
                  }`}
                >
                  <div className="flex items-center space-x-2 relative z-10 py-8">
                    <span className="transition-all duration-300 group-hover:tracking-wider">
                      Contact Now
                    </span>
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="lg"
              className={`lg:hidden mt-4 transition-all duration-500 ${
                scrolled
                  ? "text-foreground hover:bg-gray-100"
                  : "text-white hover:bg-white/20"
              }`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </Animate>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
};

export default Header;