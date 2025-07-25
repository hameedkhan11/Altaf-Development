// components/CEOMessage.tsx
"use client";
import { motion } from "framer-motion";
import { visionData } from "@/data/vision";
import { CldImage } from "next-cloudinary";
import { AnimatedH2, AnimatedH3, AnimatedP } from "@/components/ui/text-animations";

const CEOMessage = () => {
  const { ceoName, ceoTitle } = visionData;

  // CEO content
  const ceoContent = [
    "At Altaf Developments, we are reshaping the way people live by crafting architectural landmarks that seamlessly blend innovation, functionality, and timeless elegance. With a trusted legacy of excellence and a portfolio of successful real estate ventures, we stand at the forefront of urban transformation.",
    "Our developments are strategically located in high-growth corridors, offering not just luxurious living spaces but also smart investment opportunities. Whether residential or commercial, every project reflects our unwavering commitment to quality, detail, and customer-centric design.",
    "From concept to completion, we create spaces that inspire  elevating lifestyles, building vibrant communities, and maximizing value for both homeowners and investors.",
    "At Altaf Developments, we are reshaping the way people live by crafting architectural landmarks that seamlessly blend innovation, functionality, and timeless elegance. With a trusted legacy of excellence and a portfolio of successful real estate ventures, we stand at the forefront of urban transformation.",
    "Our developments are strategically located in high-growth corridors, offering not just luxurious living spaces but also smart investment opportunities. Whether residential or commercial, every project reflects our unwavering commitment to quality, detail, and customer-centric design."
  ];

  // Chairman content
  const chairmanContent = [
    "From the very beginning, our vision has been rooted in a desire to uplift communities through thoughtful design, integrity-driven development, and a deep commitment to excellence. Every project we undertake reflects our belief that luxury should be purposeful, innovation should be meaningful, and progress should always serve people first.",
    "We don't just develop land  we design the future of living. We craft environments where families grow, investors find value, and entire communities thrive",
    "As we continue this journey, our promise remains unwavering: to lead with passion, build with purpose, and deliver with pride. Thank you for trusting us to be a part of your story  together, we are building a better tomorrow."
  ];

  const chairmanName = "Altaf Khan";
  const chairmanTitle = "Chairman, Altaf Developments";

  return (
    <div className="space-y-16 md:space-y-24">
      {/* CEO Section - Content Left, Image Right */}
      <section className="py-8 sm:py-12 md:py-16 lg:py-24 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 relative">
        <div className="mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 lg:gap-x-12 items-start">
            {/* Content Section */}
            <motion.div
              className="space-y-4 sm:space-y-5 md:space-y-6 flex flex-col justify-center h-full"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
              viewport={{ once: true, margin: "-50px" }}
            >
              {/* Title */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                viewport={{ once: true, margin: "-50px" }}
                className="text-left"
              >
                <AnimatedH2 className="text-lg sm:text-3xl md:text-4xl mb-0">About Altaf Development</AnimatedH2>
              </motion.div>

              {/* Content Paragraphs */}
              <div className="space-y-3 sm:space-y-4 text-left">
                {ceoContent.map((paragraph, index) => (
                  <AnimatedP
                    duration={0.6}
                    className="text-sm"
                    key={index}
                  >
                    {paragraph}
                  </AnimatedP>
                ))}
              </div>

              {/* CEO Signature */}
              <motion.div
                className="pt-4 sm:pt-5 md:pt-6 space-y-1 text-center lg:text-left"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <AnimatedH3 className="text-base sm:text-lg font-bold text-[#8B2131]">{ceoName}</AnimatedH3>
              </motion.div>
            </motion.div>

            {/* Image Section */}
            <motion.div
              className="relative order-first lg:order-last"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
              viewport={{ once: true, margin: "-50px" }}
            >
              <div className="relative h-[300px] sm:h-[360px] md:h-[400px] lg:h-[460px] xl:h-[520px] w-full overflow-hidden shadow-2xl">
                <motion.div
                  className="w-full h-full"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                >
                  <CldImage
                    src={"altaf2_ikdngn"}
                    alt={`${ceoName} - ${ceoTitle}`}
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 50vw"
                    priority
                  />
                </motion.div>

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Chairman Section - Image Left, Content Right */}
      <section className="py-8 sm:py-12 md:py-16 lg:py-24 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 relative bg-gray-50">
        <div className="mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 lg:gap-x-12 items-start">
            {/* Image Section - Left Side */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
              viewport={{ once: true, margin: "-50px" }}
            >
              <div className="relative h-[300px] sm:h-[360px] md:h-[400px] lg:h-[460px] xl:h-[520px] w-full overflow-hidden shadow-2xl">
                <motion.div
                  className="w-full h-full"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                >
                  <CldImage
                    src={"altaf2_ikdngn"} // Replace with chairman's image
                    alt={`${chairmanName} - ${chairmanTitle}`}
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 50vw"
                  />
                </motion.div>

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
            </motion.div>

            {/* Content Section - Right Side */}
            <motion.div
              className="space-y-4 sm:space-y-5 md:space-y-6 flex flex-col justify-center h-full"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
              viewport={{ once: true, margin: "-50px" }}
            >
              {/* Title */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                viewport={{ once: true, margin: "-50px" }}
                className="text-left"
              >
                <AnimatedH2 className="text-lg sm:text-3xl md:text-4xl mb-0">Message from Chairman</AnimatedH2>
              </motion.div>

              {/* Content Paragraphs */}
              <div className="space-y-3 sm:space-y-4 text-left">
                {chairmanContent.map((paragraph, index) => (
                  <AnimatedP
                    duration={0.6}
                    className="text-sm"
                    key={index}
                  >
                    {paragraph}
                  </AnimatedP>
                ))}
              </div>

              {/* Chairman Signature */}
              <motion.div
                className="pt-4 sm:pt-5 md:pt-6 space-y-1 text-center lg:text-left"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <AnimatedH3 className="text-base sm:text-lg font-bold text-[#8B2131]">{chairmanName}</AnimatedH3>
                <AnimatedP className="text-xs sm:text-sm">{chairmanTitle}</AnimatedP>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CEOMessage;