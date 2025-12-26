
import {
  HiArrowDown,
} from "react-icons/hi2";
import Link from "next/link";
import { socialMediaConfig } from "@/lib/constants";
import Image from "next/image";

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Properties", href: "/properties" },
  { name: "Blogs", href: "/media/blogs" },
  { name: "Apartments", href: "/properties/apartments/1-bed" },
  { name: "Career", href: "/careers" },
  { name: "Contact", href: "/contact" },
];

// Company Info Component
const CompanyInfo = () => (
  <div className="w-full space-y-4 sm:space-y-6">
    <Link href="/" className="inline-block">
    <Image src={"/logos/altaf_logo.svg"} alt="Altaf Developments Logo" width={200} height={200} />
    </Link>
    <div>
      <div className="space-y-2 text-base sm:text-lg mt-6 sm:mt-8 md:mt-12">
        <h3 className="text-xl sm:text-2xl md:text-2xl text-[rgb(140,46,71)]">
          +92 337 1114448
        </h3>
        <h3 className="text-xl sm:text-2xl md:text-2xl text-[rgb(140,46,71)]">
          +92 333 0777775
        </h3>
      </div>
    </div>
  </div>
);

// Contact Info Component
const ContactInfo = () => (
  <div className="w-full space-y-3 sm:space-y-4">
    <h3 className="text-sm sm:text-base md:text-base font-bold uppercase tracking-wider text-[rgb(140,46,71)]">
      Headquarter
    </h3>
    <p className="text-sm sm:text-base md:text-base leading-relaxed font-medium text-[rgb(140,46,71)]">
      Main Boulevard Plot #1
      <br />
      Block B Faisal Hills, Islamabad
    </p>
  </div>
);

// Quick Links Component (Regional Office)
const QuickLinks = () => (
  <div className="w-full space-y-3 sm:space-y-4">
    <h3 className="text-sm sm:text-base md:text-base font-bold uppercase tracking-wider text-[rgb(140,46,71)]">
      Property Location
    </h3>
    <p className="text-sm sm:text-base md:text-base leading-relaxed font-medium text-[rgb(140,46,71)]">
      Main Boulevard Plot #11
      <br />
      Block A Faisal Hills, Islamabad
    </p>
  </div>
);

// Newsletter Section Component (Press Kit Button)
const NewsletterSection = () => (
  <button className="flex items-center gap-2 w-full sm:w-[220px] md:w-[250px] bg-[rgb(140,46,71)] text-white px-8 sm:px-10 md:px-12 justify-center py-2 sm:py-2.5 rounded-full hover:bg-transparent border border-[rgb(140,46,71)] hover:text-[rgb(140,46,71)] transition-colors cursor-pointer duration-300">
    <span className="font-medium text-base sm:text-lg">Press Kit</span>
    <HiArrowDown className="w-4 h-4 sm:w-5 sm:h-5" />
  </button>
);

// Social Media Links Component
const SocialMediaLinks = () => (
  <div className="grid grid-cols-4 gap-3 sm:flex sm:flex-wrap sm:gap-4 justify-center lg:justify-start max-w-[280px] sm:max-w-none mx-auto lg:mx-0">
    {socialMediaConfig.map((social, index) => {
      const Icon = social.icon;
      return (
        <Link
          key={index}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 sm:w-12 sm:h-12 bg-[rgb(140,46,71)] rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
          aria-label={social.name}
        >
          <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
        </Link>
      );
    })}
  </div>
);

// Footer Bottom Component
const FooterBottom = () => (
  <div className="border-t border-[rgb(140,46,71)] pt-6 sm:pt-8 w-full">
    {/* Navigation Links */}
    <div className="flex flex-wrap gap-4 sm:gap-6 lg:gap-12 mb-6 sm:mb-8 text-sm sm:text-base justify-center">
      {quickLinks.map((link) => (
        <Link
          key={link.name}
          href={link.href}
          className="text-[rgb(140,46,71)] font-medium transition-colors duration-300 hover:opacity-70"
        >
          {link.name}
        </Link>
      ))}
    </div>

    {/* Divider Line */}
    <div className="border-t border-[rgb(140,46,71)] mb-6 sm:mb-8"></div>

    {/* Bottom Section - Copyright and Social Media */}
    <div className="flex flex-col lg:flex-row justify-between items-center gap-4 sm:gap-6">
      <p className="text-sm sm:text-base font-medium text-[rgb(140,46,71)] text-center lg:text-left">
        © 2025 Altaf Developments Ltd.
      </p>
      <SocialMediaLinks />
    </div>
  </div>
);

// Main Footer Component
const Footer = () => {
  return (
    <footer className="py-8 sm:py-12 md:py-16 lg:py-20 border-t border-[#D5CEC5] min-h-[500px] sm:min-h-[600px]">
      <div className="w-full max-w-screen-2xl mx-auto">
        <div className="px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-24">
          {/* Top Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10 lg:gap-12 mb-8 sm:mb-10 md:mb-12">
            {/* Company Info Section */}
            <div className="w-full sm:col-span-2 lg:col-span-1">
              <CompanyInfo />
            </div>

            {/* Contact Information Section */}
            <div className="w-full">
              <ContactInfo />
              {/* Newsletter Section (Press Kit Button) */}
              <div className="mt-6 sm:mt-10 md:mt-14">
                <NewsletterSection />
              </div>
            </div>

            {/* Quick Links Section (Regional Office) */}
            <div className="w-full">
              <QuickLinks />
            </div>
          </div>

          {/* Footer Bottom */}
          <FooterBottom />
        </div>
      </div>
    </footer>
  );
};

export default Footer;