// import WhyChoose from "@/components/sections/home/WhyChooseUs";
import ProjectsSection from "@/components/sections/home/Projects";
import Testimonials from "@/components/sections/home/Testimonials";
// import PropertyShowcase from "@/components/sections/home/PropertySlider";
// import CEOMessage from "@/components/sections/home/Vision";
// import Amenities from "@/components/sections/home/Amenities";
import { Hero } from "@/components/common/Hero";
import { RegisterHero } from "@/components/register-form/hero-section";
import LuxuryRealEstateFAQ from "@/components/sections/home/FAQs";
import { ApartmentGallery } from "@/components/sections/home/ApartmentGallery";
import sanityService from "@/lib/sanityService";
import { FeaturedPostsSection } from "@/components/sections/home/Blogs";
import Amenities from "@/components/sections/home/Amenities";
import StructuredData from "@/components/seo/StructuredData";

const HomePage = async () => {
  const featuredPosts = await sanityService.getFeaturedPosts(3);
  
  return (
    <>
    <StructuredData pageType="home" includeFAQ={true}/>
      <Hero
        title="Designing the future of living"
        isHomePage={true}
        backgroundType="video"
        overlay="light"
        backgroundSrc="REVEAL_VIDEO_LANDSCAPE_-_WEBSITE_HEADER_xn2ehd"
        ariaLabel="Altaf Development Home Section"
        contentAlignment="center"
      />

      <div>
        <ApartmentGallery />
        {/* <CEOMessage /> */}
        {/* <PropertyShowcase /> */}
        <ProjectsSection />
        <Amenities />
        {/* <WhyChoose /> */}
        <Testimonials />
        <FeaturedPostsSection posts={featuredPosts} />
        <LuxuryRealEstateFAQ />
        <RegisterHero />
      </div>
    </>
  );
};

export default HomePage;