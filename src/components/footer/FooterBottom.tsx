import { companyInfo, footerLinks } from "@/lib/constants";
import { SocialMediaLinks } from "./SocialMediaLinks";

export const FooterBottom = () => (
  <div className="border-t border-gray-200 mt-8 sm:mt-12 pt-6 sm:pt-8">
    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
      <p className="text-black text-xs sm:text-sm text-center md:text-left font-optima">
        {companyInfo.copyright}
      </p>
      {/* Social Media Links */}
      <SocialMediaLinks />
      <div className="flex flex-wrap items-center justify-center md:justify-end gap-4 sm:gap-6">
        <a
          href={footerLinks.privacy}
          className="text-black hover:text-[#8c2e47] transition-colors duration-300 text-xs sm:text-sm font-optima"
        >
          Privacy Policy
        </a>
        <a
          href={footerLinks.terms}
          className="text-black hover:text-[#8c2e47]  transition-colors duration-300 text-xs sm:text-sm font-optima"
        >
          Terms of Service
        </a>
        <a
          href={footerLinks.cookies}
          className="text-black hover:text-[#8c2e47]  transition-colors duration-300 text-xs sm:text-sm font-optima"
        >
          Cookie Policy
        </a>
      </div>
    </div>
  </div>
);