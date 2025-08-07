import { Hero } from "@/components/common/Hero";

const page = () => {
  return (
    <>
      <Hero
        backgroundType="image"
        backgroundSrc="Booking1_rg1bhs"
        fallbackImage="luxury-apartments/hero-contact-fallback"
        height="three-quarter"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Media", href: "/media" },
          { label: "Brochures", href: "/media/Brochures" },
        ]}
        overlay="medium"
        contentAlignment="center"
        ariaLabel="Brochure Hero Section"
      />
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center mt-24">
        Brochure - Under Construction
      </h1>
    </>
  );
};

export default page;
