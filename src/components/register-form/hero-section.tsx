// components/register/RegisterHero.tsx
import { Hero } from "../common/Hero";
import { ContactForm} from "./register-interest-form";

export const RegisterHero = () => {
  return (
    <>
    <Hero
      backgroundType="image"
      backgroundSrc="Booking3_uieo5a"
      overlay="dark"
      enableParallax={true}
      parallaxSpeed={0.3}
      contentAlignment="center"
      enableAnimations={true}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12 items-center text-start w-full px-4 sm:px-6 md:px-8">
        <div className="text-white space-y-4 sm:space-y-6 flex flex-col items-start order-2 lg:order-1 max-w-xl">
          <h1 className="text-xl hidden sm:block sm:text-3xl md:text-4xl lg:text-5xl leading-tight text-white">
            Luxury Living Redefined
          </h1>
          <p className="hidden sm:block text-sm sm:text-md w-full sm:w-[25rem] md:w-[28rem] lg:w-[30rem]">
            Experience unparalleled luxury in our meticulously crafted
            apartments. From one-bedroom sanctuaries to expansive two-bedroom
            residences, each space is designed to exceed your expectations.
          </p>
        </div>
        <div className="flex justify-center lg:justify-end order-1 lg:order-2 w-full">
          <ContactForm />
        </div>
      </div>
    </Hero>
      </>
  );
};