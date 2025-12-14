// components/register/RegisterHero.tsx
import { Hero } from "../common/Hero";
import { ContactForm } from "./register-interest-form";

export const RegisterHero = () => {
  return (
    <>
      <Hero
        backgroundType="image"
        backgroundSrc="Booking3_uieo5a_1_hkkeu9"
        overlay="dark"
        // enableParallax={true}
        // parallaxSpeed={0.3}
        contentAlignment="center"
        enableAnimations={true}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 xs:gap-6 sm:gap-8 md:gap-10 lg:gap-12 xl:gap-16 items-center text-start w-full px-3 xs:px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16">
          <div className="text-white space-y-3 xs:space-y-4 sm:space-y-6 flex flex-col items-start order-2 lg:order-1 max-w-full lg:max-w-xl xl:max-w-2xl">
            <h1 className="text-xl hidden md:block sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl leading-tight text-white w-full">
              Designing the future of Living
            </h1>
            <p className="hidden md:block text-xs sm:text-sm md:text-base leading-relaxed w-full sm:w-[20rem] md:w-[25rem] lg:w-[28rem] xl:w-[30rem] 2xl:w-[35rem]">
              Register your interest today and take the first step toward
              becoming part of a visionary community. Whether you are looking to
              invest or find your next dream home, we invite you to join us in
              building spaces that inspire, uplift, and endure.
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
