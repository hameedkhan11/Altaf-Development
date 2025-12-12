// app/properties/apartments/[type]/page.tsx

import ApartmentDetailPage, {
  ApartmentType,
} from "@/components/apartment-detail/ApartmentDetail";
import AltafDevelopmentsShowcase from "@/components/cards/ReusableTitleDescCard";
import { Hero } from "@/components/common/Hero";
import FloorPlanComponent from "@/components/property-detail/ApartmentFloorPlans";
import ResidenceAmenities from "@/components/property-detail/PropertyDetailAmenities";
import { notFound } from "next/navigation";

// Define valid apartment types
const validTypes: ApartmentType[] = ["studio", "1 bed", "2 bed"];

interface PageProps {
  params: Promise<{
    type: string;
  }>;
}

// For static generation (optional)
export async function generateStaticParams() {
  return validTypes.map((type) => ({
    type: type,
  }));
}

// For metadata (optional)
export async function generateMetadata({ params }: PageProps) {
  const { type } = await params;
  const decodedType = decodeURIComponent(type);

  // Check if type is valid
  if (!validTypes.includes(decodedType as ApartmentType)) {
    return {
      title: "Apartment Not Found",
    };
  }

  return {
    title: `${decodedType.charAt(0).toUpperCase() + decodedType.slice(1)} Apartment | Your Site Name`,
    description: `Explore our ${decodedType} apartment details, floor plans, and amenities.`,
  };
}

const Page = async ({ params }: PageProps) => {
  // Await params to get the actual values
  const { type } = await params;
  
  // Decode the URL parameter (handles spaces in "1 bed" and "2 bed")
  const decodedType = decodeURIComponent(type);

  // Validate the apartment type
  if (!validTypes.includes(decodedType as ApartmentType)) {
    notFound(); // This will show your 404 page
  }

  return (
    <div>
      <Hero
        backgroundSrc="imgi_4442_b10d4f101476497.5f1fdce5873f0_czr5uk"
        backgroundType="image"
        overlay="medium"
        ariaLabel="Apartment Detail Hero Section"
      />
      <AltafDevelopmentsShowcase
        title="Trust-Driven Real Estate Excellence"
        description="Transform your investment dreams into reality with Islamabad's trusted real estate partner. We specialize in premium developments in Faisal Hills, offering verified projects, dedicated support, and transparent dealings. Whether you're a local investor or overseas Pakistani, we provide secure investment processes, long-term guidance, and after-sales support that extends beyond the sale."
      />
      <ApartmentDetailPage type={decodedType as ApartmentType} />
      <FloorPlanComponent type={decodedType as ApartmentType} />
      <ResidenceAmenities />
    </div>
  );
};

export default Page;