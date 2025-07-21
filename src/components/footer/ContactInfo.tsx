// components/footer/ContactInfo.tsx
import { Clock, Mail, MapPin, Phone } from "lucide-react";

export const ContactInfo = () => (
  <div className="w-full">
    <h3 className="text-sm sm:text-base lg:text-sm xl:text-base 2xl:text-lg mb-3 lg:mb-4 font-medium font-optima text-black dark:text-white">
      Contact Us
    </h3>
    <ul className="space-y-2 lg:space-y-3 w-full">
      <li className="flex items-start w-full">
        <MapPin className="h-3 w-3 sm:h-4 sm:w-4 text-[#8c2e47] mr-2 sm:mr-3 mt-1 flex-shrink-0" />
        <span className="text-black dark:text-white text-xs sm:text-sm lg:text-xs xl:text-sm 2xl:text-base leading-relaxed font-optima flex-1">
          Main Boulevard Plot #1
          <br />
          Block B Faisal Hills
        </span>
      </li>
      <li className="flex items-center w-full">
        <Phone className="h-3 w-3 sm:h-4 sm:w-4 text-[#8c2e47] mr-2 sm:mr-3 flex-shrink-0" />
        <span className="text-black dark:text-white text-xs sm:text-sm lg:text-xs xl:text-sm 2xl:text-base font-optima flex-1">
          03330777775
        </span>
      </li>
      <li className="flex items-center w-full">
        <Mail className="h-3 w-3 sm:h-4 sm:w-4 text-[#8c2e47] mr-2 sm:mr-3 flex-shrink-0" />
        <span className="text-black dark:text-white text-xs sm:text-sm lg:text-xs xl:text-sm 2xl:text-base font-optima flex-1 break-words">
          info@altafdevelopments.com
        </span>
      </li>
      <li className="flex items-start w-full">
        <Clock className="h-3 w-3 sm:h-4 sm:w-4 text-[#8c2e47] mr-2 sm:mr-3 mt-1 flex-shrink-0" />
        <span className="text-black dark:text-white text-xs sm:text-sm lg:text-xs xl:text-sm 2xl:text-base leading-relaxed font-optima flex-1">
          Mon - Sun 9AM - 7PM
        </span>
      </li>
    </ul>
  </div>
);