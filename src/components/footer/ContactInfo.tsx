import { Clock, Mail, MapPin, Phone } from "lucide-react";

export const ContactInfo = () => (
  <div>
    <h3 className="text-lg font-medium mb-4 font-optima dark:text-white">
      Contact Information
    </h3>
    <ul className="space-y-3">
      <li className="flex items-start">
        <MapPin className="h-4 w-4 text-[#8c2e47] mr-3 mt-1 flex-shrink-0" />
        <span className="text-black dark:text-white text-sm sm:text-base leading-relaxed font-optima">
          Main Boulevard Plot #1
          <br />
          Block B Faisal Hills
        </span>
      </li>
      <li className="flex items-center">
        <Phone className="h-4 w-4 text-[#8c2e47] mr-3 flex-shrink-0" />
        <span className="text-black dark:text-white text-sm sm:text-base font-optima">
          03330777775
        </span>
      </li>
      <li className="flex items-center">
        <Mail className="h-4 w-4 text-[#8c2e47] mr-3 flex-shrink-0" />
        <span className="text-black dark:text-white text-sm sm:text-base break-all font-optima">
          info@altafdevelopments.com
        </span>
      </li>
      <li className="flex items-start">
        <Clock className="h-4 w-4 text-[#8c2e47] mr-3 mt-1 flex-shrink-0" />
        <span className="text-black dark:text-white text-sm sm:text-base leading-relaxed font-optima">
          Mon - Sun 9AM - 7PM
        </span>
      </li>
    </ul>
  </div>
);