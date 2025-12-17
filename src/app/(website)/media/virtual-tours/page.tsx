import { Hero } from "@/components/common/Hero";

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
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center mt-24">
        Virtual Tours - Under Construction
      </h1>
    </>
  );
};

export default page;
