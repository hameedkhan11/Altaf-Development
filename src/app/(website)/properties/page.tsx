import { Hero } from "@/components/common/Hero";
import { RegisterHero } from "@/components/register-form/hero-section";
import PropertyDetail from "@/components/property-detail/PropertyDetail";
import AtAGlance from "@/components/property-detail/Residences";
import ApartmentShowcase from "@/components/property-detail/ApartmentShowcase";
import VideoShowcase from "@/components/property-detail/VideoShowcase";
import AltafDevelopmentsShowcase from "@/components/cards/ReusableTitleDescCard";
import StructuredData from "@/components/seo/StructuredData";

const PropertyDetailContent: React.FC = () => {
  return (
    <>
    <StructuredData pageType="properties"/>
      <Hero
        backgroundType="image"
        backgroundSrc="Featured_Properties_ldygh0"
        fallbackImage="luxury-apartment-hero-gallery"
        height="three-quarter"
        overlay="light"
        contentAlignment="center"
        title="Featured Properties"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Properties", href: "/properties" },
        ]}
      />
      <AltafDevelopmentsShowcase
        title="The Art of Strategic Investment"
        description="ALTAF Developments pioneers innovative real estate solutions, delivering luxury lifestyles through meticulous design and precision craftsmanship. Our projects in Faisal Hills go beyond residences, they are thoughtfully curated living experiences, offering state of the art amenities, world class security, and modern facilities designed to support a healthy, high quality lifestyle."
      />
      <AtAGlance />
      <ApartmentShowcase />
      <VideoShowcase />
      <PropertyDetail />
      <RegisterHero />
    </>
  );
};

// Main component wrapped with Suspense
const PropertyDetailSection: React.FC = () => {
  return <PropertyDetailContent />;
};

export default PropertyDetailSection;
