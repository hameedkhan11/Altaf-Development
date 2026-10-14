import Image from "next/image";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { PanoramaTour } from "@/components/media/PanoramaTour";

export default function VirtualToursPage() {
  return (
    <>
      {/* The supplied floor-plan graphic is displayed in full, without
          Cloudinary transformations, cropping, or Next/Image recompression. */}
      <section
        className="relative flex min-h-[310px] items-center bg-[#faf9f7]"
        aria-label="Virtual Tours Hero Section"
      >
        <Image
          src="/virtual-tour/model-apartment-hero.png"
          alt="Model apartment layout showing living room, executive bedroom, master bedroom, master bathroom and utility room"
          width={1920}
          height={1080}
          priority
          unoptimized
          className="block h-auto w-full object-contain"
          quality={90}
        />
        {/* Keep the site's existing white navigation legible on the new light hero. */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/65 to-transparent" aria-hidden="true" />
        <div className="absolute bottom-3 left-3 z-10 rounded bg-white px-3 py-2 sm:bottom-6 sm:left-6">
          <Breadcrumb items={[
            { label: "Home", href: "/" },
            { label: "Media", href: "/media" },
            { label: "Virtual Tours", href: "/media/virtual-tours" },
          ]} className="relative z-10 [&_*]:!text-black" />
        </div>
      </section>
      <section className="mt-16 mb-16" aria-label="Apartment 707 virtual tour">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center mb-10">
          Virtual Tours
        </h1>
        <PanoramaTour />
      </section>
    </>
  );
}
