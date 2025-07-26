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
    <div className="space-y-8 sm:space-y-12 md:space-y-16 lg:space-y-20 xl:space-y-24">
      {/* CEO Section - Content Left, Image Right */}
      <section className="py-6 sm:py-8 md:py-12 lg:py-16 xl:py-24 px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-16 relative">
        <div className="mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-x-12 xl:gap-x-16 items-start">
            {/* Content Section */}
            <motion.div
              className="space-y-3 sm:space-y-4 md:space-y-5 lg:space-y-6 flex flex-col justify-center h-full order-2 lg:order-1"
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
                <AnimatedH2 className="text-xl sm:text-2xl md:text-3xl mb-0 leading-tight">
                  About Altaf Development
                </AnimatedH2>
              </motion.div>

              {/* Content Paragraphs */}
              <div className="space-y-2 sm:space-y-3 md:space-y-4 text-left">
                {ceoContent.map((paragraph, index) => (
                  <AnimatedP
                    duration={0.6}
                    className="text-xs sm:text-sm"
                    key={index}
                  >
                    {paragraph}
                  </AnimatedP>
                ))}
              </div>

              {/* CEO Signature */}
              <motion.div
                className="pt-3 sm:pt-4 md:pt-5 lg:pt-6 space-y-1 text-center lg:text-left"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <AnimatedH3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-[#8B2131]">
                  {ceoName}
                </AnimatedH3>
              </motion.div>
            </motion.div>

            {/* Image Section */}
            <motion.div
              className="relative order-1 lg:order-2"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
              viewport={{ once: true, margin: "-50px" }}
            >
              <div className="relative h-[250px] sm:h-[300px] md:h-[360px] lg:h-[400px] xl:h-[460px] 2xl:h-[520px] w-full overflow-hidden shadow-2xl rounded-lg">
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
      <section className="px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-16 relative bg-gray-50">
        <div className="mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-x-12 xl:gap-x-16 items-start">
            {/* Image Section - Left Side */}
            <motion.div
              className="relative order-1"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
              viewport={{ once: true, margin: "-50px" }}
            >
              <div className="relative h-[250px] sm:h-[300px] md:h-[360px] lg:h-[400px] xl:h-[460px] 2xl:h-[520px] w-full overflow-hidden shadow-2xl rounded-lg">
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
              className="space-y-3 sm:space-y-4 md:space-y-5 lg:space-y-6 flex flex-col justify-center h-full order-2"
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
                <AnimatedH2 className="text-xl sm:text-2xl md:text-3xl">
                  Message from Chairman
                </AnimatedH2>
              </motion.div>

              {/* Content Paragraphs */}
              <div className="space-y-2 sm:space-y-3 md:space-y-4 text-left">
                {chairmanContent.map((paragraph, index) => (
                  <AnimatedP
                    duration={0.6}
                    className="text-xs sm:text-sm"
                    key={index}
                  >
                    {paragraph}
                  </AnimatedP>
                ))}
              </div>

              {/* Chairman Signature */}
              <motion.div
                className="pt-3 sm:pt-4 md:pt-5 lg:pt-6 space-y-1 text-center lg:text-left"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <AnimatedH3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-[#8B2131]">
                  {chairmanName}
                </AnimatedH3>
                <AnimatedP className="text-xs sm:text-sm">
                  {chairmanTitle}
                </AnimatedP>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CEOMessage;