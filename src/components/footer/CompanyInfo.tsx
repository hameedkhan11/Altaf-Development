import Link from "next/link";
import { companyInfo } from "@/lib/constants";
import AltafLogo from "../../../public/logos/ALTAF-LOGO2.svg"

export const CompanyInfo = () => (
  <div>
    {/* Logo */}
    <Link href="/" className="inline-block">
      <AltafLogo className="w-[120px] h-[88px] sm:w-[140px] sm:h-[102px] lg:w-[160px] lg:h-[116px] text-[#8c2e47] transition-all duration-300 hover:opacity-80 ml-6" />
    </Link>

    {/* Company Description */}
    <p className="text-black text-sm sm:text-base leading-relaxed max-w-sm font-optima ml-8">
      {companyInfo.description}
    </p>
  </div>
);