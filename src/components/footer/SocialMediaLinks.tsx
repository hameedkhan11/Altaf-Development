import { socialMediaConfig } from "@/lib/constants";
import Link from "next/link";

export const SocialMediaLinks = () => (
  <div className="flex flex-col items-center space-x-4 md:flex-row">
    <span className="text-black dark:text-white text-lg font-medium font-optima">
      Follow us:
    </span>
    <div className="flex items-center space-x-3">
      {socialMediaConfig.map((social, index) => {
        const Icon = social.icon;
        return (
          <Link
            key={index}
            href={social.href}
            target="_blank"
            className="group relative p-2 rounded-full transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            aria-label={social.name}
          >
            <Icon
              className="h-5 w-5 transition-all duration-300"
              style={{
                color: social.color,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = social.hoverColor;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = social.color;
              }}
            />
          </Link>
        );
      })}
    </div>
  </div>
);
