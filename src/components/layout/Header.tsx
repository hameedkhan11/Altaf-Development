// components/Header.tsx
"use client";

import React, { useState, useEffect, useRef } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { Button } from "@/components/ui/button";
import { X, ArrowRight, Phone } from "lucide-react";
import { NAVIGATION_ITEMS } from "@/lib/constants";
import Link from "next/link";
import MediaCenterDropdown from "../ui/media-center-dropdown";
import MobileMenu from "./MobileMenu";
import { Animate } from "../ui/animate";
import AltafLogoSvg from "./AltafLogo";

const HUBSPOT_MEETING_URL =
  "https://meetings-na2.hubspot.com/altaf-developments";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollYRef = useRef(0);

  useEffect(() => {
    const checkInitialScroll = () => {
      const scrollPosition = window.scrollY;
      setScrolled(scrollPosition > 100);
    };

    checkInitialScroll();

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setScrolled(scrollPosition > 100);

      if (scrollPosition > lastScrollYRef.current && scrollPosition > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      lastScrollYRef.current = scrollPosition;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <Animate
        type="stagger"
        className={`fixed w-full h-20 transition-all duration-500 ease-in-out font-avenir ${
          scrolled ? "z-30 backdrop-blur-lg bg-white shadow-lg" : "z-30 mt-5"
        } ${isVisible ? "translate-y-0" : "-translate-y-full"}`}
      >
        {!scrolled && (
          <div className="absolute inset-0 bg-cover bg-center opacity-0" />
        )}

        <div className="container mx-auto px-4 xl:px-6 h-full relative z-10">
          <div className="flex items-center justify-between h-full relative">
            {/* Left Navigation */}
            <nav
              className={`hidden lg:flex items-center space-x-6 xl:space-x-8 2xl:space-x-12 absolute left-0 xl:left-12 top-1/2 transform -translate-y-1/2 transition-opacity duration-500`}
            >
              {NAVIGATION_ITEMS.map((item) => (
                <React.Fragment key={item.name}>
                  {item.name === "MEDIA CENTER" ? (
                    <MediaCenterDropdown scrolled={scrolled} />
                  ) : (
                    <Link
                      href={item.href}
                      className={`transition-all duration-500 text-sm relative group whitespace-nowrap ${
                        scrolled
                          ? "text-foreground hover:text-[rgb(140,46,71)] hover:font-bold"
                          : "text-white hover:text-[rgb(255,167,186)] hover:font-bold space-x-4"
                      }`}
                    >
                      <span
                        className={`tracking-widest ${scrolled ? "text-xs" : "text-sm"}`}
                      >
                        {item.name}
                      </span>
                      {scrolled && (
                        <span
                          className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full bg-[rgb(140,46,71)]`}
                        />
                      )}
                    </Link>
                  )}
                </React.Fragment>
              ))}
            </nav>

            {/* Center Logo */}
            <div className="flex items-center absolute left-1/2 transform -translate-x-1/2 top-1/2 -translate-y-1/2 z-20">
              <Link
                href={"/"}
                className="cursor-pointer flex items-center relative"
              >
                <AltafLogoSvg
                  className={`mt-4 w-[170px] h-[170px] sm:w-[140px] sm:h-[140px] md:w-[160px] md:h-[160px] lg:w-[180px] lg:h-[180px] ${!scrolled ? "text-white" : "text-[rgb(140,46,71)]"}`}
                />
              </Link>
            </div>

            {/* Right Side - Book a Call + Contact Button */}
            <div className="hidden lg:flex items-center space-x-3 absolute right-0 xl:right-8 top-1/2 transform -translate-y-1/2">
              {/* Book a Call Button — opens HubSpot meeting in new tab */}
              <Link
                href={HUBSPOT_MEETING_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  className={`group relative transition-all duration-500 px-4 xl:px-5 cursor-pointer rounded-full font-medium overflow-hidden py-4 xl:py-[22px]
                    bg-[rgb(140,46,71)] text-white border-2 border-[rgb(140,46,71)]
                    hover:bg-[rgb(110,36,56)] hover:border-[rgb(110,36,56)]`}
                  aria-label="Book a Call"
                >
                  <div className="flex items-center space-x-2 relative z-10 py-4 xl:py-8">
                    <Phone className="h-4 w-4 transition-transform duration-300 group-hover:rotate-12" />
                    <span className="transition-all duration-300 group-hover:tracking-wider whitespace-nowrap text-sm">
                      Book a Call
                    </span>
                  </div>
                </Button>
              </Link>

              {/* Contact Now Button */}
              <Link href="/contact">
                <Button
                  className={`group relative transition-all duration-500 px-4 xl:px-5 bg-transparent cursor-pointer rounded-full font-bold overflow-hidden py-4 xl:py-[22px] ${
                    scrolled
                      ? "bg-transparent text-[rgb(140,46,71)] hover:bg-[rgb(140,46,71)] hover:text-white border-[rgb(140,46,71)] border-2"
                      : "bg-white text-[rgb(140,46,71)] hover:bg-gray-100"
                  }`}
                  aria-label="Contact Now"
                >
                  <div className="flex items-center space-x-2 relative z-10 py-4 xl:py-8">
                    <span className="transition-all duration-300 group-hover:tracking-wider whitespace-nowrap font-medium text-sm">
                      Contact Now
                    </span>
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              aria-label={
                isMobileMenuOpen ? "Close mobile menu" : "Open mobile menu"
              }
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden absolute top-1/2 transform -translate-y-1/2 transition-all duration-500 ${
                scrolled
                  ? "text-foreground hover:bg-gray-100"
                  : "text-white hover:bg-white/20"
              }`}
            >
              {isMobileMenuOpen ? (
                <X className="h-full w-full" />
              ) : (
                <GiHamburgerMenu className="h-6 w-6 mt-3" />
              )}
            </button>
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
