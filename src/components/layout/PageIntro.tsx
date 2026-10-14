"use client";

import { usePathname } from "next/navigation";
import AltafLogoSvg from "./AltafLogo";

/**
 * The website layout persists between routes. Remounting the intro's DOM
 * element with a route key restarts its CSS animation on every navigation,
 * including client-side Next.js Link transitions.
 */
export default function PageIntro() {
  const pathname = usePathname();

  return (
    <div key={pathname} className="page-intro" aria-hidden="true">
      <AltafLogoSvg className="page-intro__logo" />
    </div>
  );
}
