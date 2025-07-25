// components/footer/QuickLinks.tsx
import { quickLinks } from "@/lib/constants";
import Link from "next/link";

export const QuickLinks = () => (
  <div className="w-full">
    <h3 className="text-sm sm:text-base lg:text-sm xl:text-base 2xl:text-lg font-medium mb-3 lg:mb-4 font-optima dark:text-white text-black">
      Quick Links
    </h3>
    <ul className="space-y-1 lg:space-y-2 w-full">
      {quickLinks.map((item) => (
        <li key={item.name} className="w-full">
          <Link
            href={item.href}
            className="text-black dark:text-white hover:text-[#8c2e47] dark:hover:text-[#8c2e47] transition-colors duration-300 text-xs sm:text-sm lg:text-xs xl:text-sm 2xl:text-base font-optima block w-full"
          >
            {item.name}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);