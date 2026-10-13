import AltafLogoSvg from "./AltafLogo";

/**
 * Show the existing brand reveal on the initial page load only.
 * This layout persists during in-app navigation, avoiding a 1.5 second
 * fullscreen animation on every route change.
 */
export default function PageIntro() {
  return (
    <div className="page-intro" aria-hidden="true">
      <AltafLogoSvg className="page-intro__logo" />
    </div>
  );
}
