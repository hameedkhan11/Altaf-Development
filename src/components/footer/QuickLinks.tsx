import { quickLinks } from "@/lib/constants";
import Link from "next/link";

export const QuickLinks = () => (
  <div>
    <h3 className="text-lg font-medium mb-4 font-optima dark:text-white">
      Quick Links
    </h3>
    <ul className="space-y-1">
      {quickLinks.map((item) => (
        <li key={item}>
          <Link
            href="#"
            className="text-black dark:text-white hover:text-[#8c2e47] dark:hover:text-[#8c2e47] transition-colors duration-300 text-sm sm:text-base font-optima"
          >
            {item}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);