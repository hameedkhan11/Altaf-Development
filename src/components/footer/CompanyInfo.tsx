// components/footer/CompanyInfo.tsx
import Link from "next/link";
import { companyInfo } from "@/lib/constants";
import AltafLogo from "../../../public/logos/ALTAF-LOGO2.svg"

export const CompanyInfo = () => (
  <div className="w-full">
    {/* Logo */}
    <Link href="/" className="inline-block">
      <AltafLogo className="w-[100px] h-[72px] sm:w-[120px] sm:h-[88px] lg:w-[110px] lg:h-[80px] xl:w-[130px] xl:h-[95px] 2xl:w-[150px] 2xl:h-[110px] text-[#8c2e47] transition-all duration-300 hover:opacity-80" />
    </Link>

    {/* Company Description */}
    <p className="text-black dark:text-white text-xs sm:text-sm lg:text-xs xl:text-sm leading-relaxed w-full max-w-full sm:max-w-[250px] lg:max-w-[180px] xl:max-w-[220px] 2xl:max-w-[280px]">
      {companyInfo.description}
    </p>
  </div>
);