import { Clock, Mail, MapPin, Phone } from "lucide-react";

export const ContactInfo = () => (
  <div>
    <h3 className="text-lg mb-4">
      Contact Information
    </h3>
    <ul className="space-y-3">
      <li className="flex items-start">
        <MapPin className="h-4 w-4 text-[#8c2e47] mr-3 mt-1 flex-shrink-0" />
        <span className="text-black text-sm sm:text-base leading-relaxed">
          Main Boulevard Plot #1
          <br />
          Block B Faisal Hills
        </span>
      </li>
      <li className="flex items-center">
        <Phone className="h-4 w-4 text-[#8c2e47] mr-3 flex-shrink-0" />
        <span className="text-black  text-sm sm:text-base">
          03330777775
        </span>
      </li>
      <li className="flex items-center">
        <Mail className="h-4 w-4 text-[#8c2e47] mr-3 flex-shrink-0" />
        <span className="text-black text-sm sm:text-base break-all">
          info@altafdevelopments.com
        </span>
      </li>
      <li className="flex items-start">
        <Clock className="h-4 w-4 text-[#8c2e47] mr-3 mt-1 flex-shrink-0" />
        <span className="text-black text-sm sm:text-base leading-relaxed">
          Mon - Sun 9AM - 7PM
        </span>
      </li>
    </ul>
  </div>
);