// import WhyChoose from "@/components/sections/home/WhyChooseUs";
// import ProjectsSection from "@/components/sections/home/Projects";
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
import FAQSchema from "@/components/seo/FAQSchema";
import DemoGallery from "@/components/property-detail/Gallery";
import AltafDevelopmentsShowcase from "@/components/cards/ReusableTitleDescCard";
import AtAGlance from "@/components/property-detail/Residences";
import Link from "next/link";

const HomePage = async () => {
  const featuredPosts = await sanityService.getFeaturedPosts(3);

  return (
    <>
      <StructuredData pageType="home" />
      <FAQSchema />
      <Hero
        title="Designing the future of living"
        isHomePage={true}
        backgroundType="video"
        overlay="light"
        backgroundSrc="output_50mb_rnp539"
        ariaLabel="Altaf Development Home Section"
        contentAlignment="center"
      />

      <div>
        <AltafDevelopmentsShowcase
          title="The Standard of Premium Living"
          description="ALTAF Developments stands at the forefront of Islamabad's luxury real estate landscape, creating architectural landmarks that redefine modern living. With a commitment to transparency, ethical practices, and investor-focused planning, we transform premium locations into trust-driven communities where vision accelerates, connections elevate, and leadership soars."
        />
        <ApartmentGallery />
        {/* <CEOMessage /> */}
        {/* <PropertyShowcase /> */}
        {/* <ProjectsSection /> */}
        <div className="flex flex-col items-center py-20 sm:py-24 md:py-32">
          <h2 className="max-w-2xl font-light text-2xl sm:text-3xl lg:text-4xl text-center mb-4 sm:mb-6 md:mb-8">
            DISCOVER OUR RESIDENTIAL BUILDING IN FAISAL HILLS
          </h2>
          <Link href={"/properties"} className="text-white font-medium bg-[rgb(140,46,71)] cursor-pointer transition duration-300 ease-in-out hover:scale-110 px-6 py-2.5 rounded-full hover:bg-transparent border border-[rgb(140,46,71)] hover:text-[rgb(140,46,71)]">
            View All Projects
          </Link>
        </div>
        <AtAGlance />
        <DemoGallery />

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
