import AboutPage from "@/components/sections/about/About-us";
import StructuredData from "@/components/seo/StructuredData";

export default function Page() {
  return (
    <>
      {/* Use centralized StructuredData component */}
      <StructuredData pageType="about" />
      
      {/* Visual Page */}
      <AboutPage />
    </>
  );
}