// app/components/3DLayout.tsx or any component
import { CldImage } from 'next-cloudinary';

export default function Layout3D() {
  return (
    <section className="flex justify-center items-center bg-transparent">
      <div className="relative w-full max-w-5xl aspect-[1.2/1]">
        <CldImage
          src="ChatGPT_Image_Jul_19_2025_05_03_49_PM_tgudcw"
          alt="3D Apartment Layout"
          fill
          className="object-contain"
          priority
          aria-label='3D Apartment Layout'
        />
      </div>
    </section>
  );
}
