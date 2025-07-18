// components/layout/Footer.tsx
"use client";
import { useState, FormEvent } from "react";
import { NewsletterSection } from "../footer/Newsletter";
import { CompanyInfo } from "../footer/CompanyInfo";
import { QuickLinks } from "../footer/QuickLinks";
import { ContactInfo } from "../footer/ContactInfo";
import { FooterBottom } from "../footer/FooterBottom";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleNewsletterSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Handle newsletter submission logic here
    console.log("Newsletter subscription:", email);
    setEmail(""); // Clear form after submission
  };

  return (
    <footer className="text-white py-8 sm:py-12 lg:py-16 border-t border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-6">
          {/* Company Info Section */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-4">
            <CompanyInfo />
          </div>

          {/* Quick Links Section */}
          <div className="col-span-1 lg:col-span-2">
            <QuickLinks />
          </div>

          {/* Contact Information Section */}
          <div className="col-span-1 lg:col-span-3">
            <ContactInfo />
          </div>

          {/* Newsletter Section */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-3">
            <NewsletterSection
              email={email}
              setEmail={setEmail}
              onSubmit={handleNewsletterSubmit}
            />
          </div>
        </div>

        {/* Footer Bottom */}
        <FooterBottom />
      </div>
    </footer>
  );
};

export default Footer;
