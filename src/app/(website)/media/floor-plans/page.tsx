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
          { label: "floor plans", href: "/media/floor-plans" },
        ]}
        overlay="medium"
        contentAlignment="center"
        ariaLabel="Floor Plans Hero Section"
      />
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center mt-24">
        Floor Plans - Under Construction
      </h1>
    </>
  );
};

export default page;
