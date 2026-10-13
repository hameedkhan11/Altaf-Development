import { Hero } from "@/components/common/Hero";
import { PanoramaTour } from "@/components/media/PanoramaTour";

const page = () => {
  return (
    <>
      <Hero
        backgroundType="image"
        backgroundSrc="About_us_hero_oe5ctv_yozzcj"
        fallbackImage="luxury-apartments/hero-contact-fallback"
        height="three-quarter"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Media", href: "/media" },
          { label: "Virtual Tours", href: "/media/virtual-tours" },
        ]}
        overlay="medium"
        contentAlignment="center"
        ariaLabel="Virtual Tours Hero Section"
      />
      <section className="mt-16 mb-16" aria-label="Apartment 707 virtual tour">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center mb-10">
          Virtual Tours
        </h1>
        <PanoramaTour />
      </section>
    </>
  );
};

export default page;
