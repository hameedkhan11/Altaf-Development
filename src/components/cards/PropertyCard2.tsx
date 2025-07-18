import { PropertySection } from '@/lib/types';
import { CldImage } from 'next-cloudinary';
import { motion } from "framer-motion";

interface PropertyCardProps {
  section: PropertySection;
  index: number;
}

export const PropertyCard2 = ({ section, index }: PropertyCardProps) => {
  return (
    <motion.div
      className="group relative overflow-hidden cursor-pointer transition-all duration-500 ease-out md:hover:flex-[1.7] md:flex-1 min-h-[200px] w-full h-full"
      initial={{ opacity: 0, x: 100, scale: 0.95 }}
      whileInView={{ opacity: 1, x: 0, scale: 1 }}
      transition={{
        duration: 0.8,
        ease: "easeOut",
        delay: index * 0.1
      }}
      viewport={{ once: true, margin: "-50px" }}
    >
      <div className="h-full relative">
        <CldImage
          src={section.image}
          alt={section.alt}
          fill
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority={index === 0}
        />
        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-500" />
        <motion.div
          className="absolute bottom-0 left-0 right-0 flex justify-center p-4 sm:p-6 lg:p-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            ease: "easeOut",
            delay: 0.5 + (index * 0.1)
          }}
          viewport={{ once: true }}
        >
          <h3 className="text-white text-lg sm:text-xl md:text-2xl lg:text-3xl tracking-wide text-center transform transition-all duration-500 group-hover:scale-110 group-hover:-translate-y-2">
            {section.title}
          </h3>
        </motion.div>
      </div>
    </motion.div>
  );
};