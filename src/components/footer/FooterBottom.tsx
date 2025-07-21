// components/footer/FooterBottom.tsx
import { companyInfo, footerLinks } from "@/lib/constants";
import { SocialMediaLinks } from "./SocialMediaLinks";

export const FooterBottom = () => (
  <div className="border-t border-gray-200 pt-6 sm:pt-8 w-full">
    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center  lg:space-y-0 gap-4 w-full">
      <p className="text-black text-xs sm:text-sm w-full lg:w-auto text-center">
        {companyInfo.copyright}
      </p>
      
      {/* Social Media Links */}
      <div className="w-full lg:w-auto flex justify-center">
        <SocialMediaLinks />
      </div>
      
      <div className="flex justify-center  gap-2 sm:gap-4 lg:gap-6 w-full lg:w-auto lg:justify-end">
        <a
          href={footerLinks.privacy}
          className="text-black hover:text-[#8c2e47] transition-colors duration-300 text-xs sm:text-sm block"
        >
          Privacy Policy
        </a>
        <a
          href={footerLinks.terms}
          className="text-black hover:text-[#8c2e47] transition-colors duration-300 text-xs sm:text-sm block"
        >
          Terms of Service
        </a>
        <a
          href={footerLinks.cookies}
          className="text-black hover:text-[#8c2e47] transition-colors duration-300 text-xs sm:text-sm block"
        >
          Cookie Policy
        </a>
      </div>
    </div>
  </div>
);