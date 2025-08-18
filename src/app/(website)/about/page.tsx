import AboutPage from "@/components/sections/about/About-us";
import StructuredData from "@/components/seo/StructuredData";

export default function Page() {
  return (
    <>
      <StructuredData pageType="about" />
      <AboutPage />
    </>
  );
}