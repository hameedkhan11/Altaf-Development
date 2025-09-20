"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { CldImage } from "next-cloudinary";

interface ApproachStep {
  number: string;
  title: string;
  description: string;
  image: string;
}

const CompanyCulture: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const approachSteps: ApproachStep[] = [
    {
      number: "01",
      title: "Discovery & Consultation",
      description:
        "We begin by understanding your vision, needs, and aspirations. Through in-depth discussions, site analysis, and feasibility studies, we gather insights that lay the foundation for a well-informed design strategy.",
      image: "imgi_12_oGJ4EV0W8kHCqp4OS7wjuxBtcrk_d3cgxn",
    },
    {
      number: "02",
      title: "Design & Planning",
      description:
        "Our team translates ideas into innovative architectural concepts. From conceptual sketches to detailed planning, we ensure that every design balances aesthetics, functionality, and sustainability, tailored to your unique requirements.",
      image: "imageye___-_imgi_1_DV0xVxYyQ3jxVaAZAh6i4dIQNvM_oy8vsv",
    },
    {
      number: "03",
      title: "Development & Execution",
      description:
        "With meticulous attention to detail, we bring designs to life. Our comprehensive project management ensures seamless coordination between all stakeholders, maintaining quality standards throughout the construction process.",
      image: "imgi_43_o5Q5tHN4ZF3kGNhkQSFjU6Lqc_kbjb5z",
    },
    {
      number: "04",
      title: "Delivery & Beyond",
      description:
        "We deliver exceptional spaces that exceed expectations. Our commitment continues beyond project completion, providing ongoing support and maintenance to ensure your architectural investment remains pristine for years to come.",
      image: "imgi_27_wLcEj21z89tU2UZtzt0o9NpN8Js_ym20kl",
    },
  ];

  // Create all useTransform hooks at the component level
  const totalCards = approachSteps.length;
  
  // Call useTransform hooks directly (not in a callback)
  const yTransform0 = useTransform(
    scrollYProgress,
    [0 / totalCards, 1 / totalCards],
    [`${100 - 0 * 5}vh`, "80px"]
  );
  const yTransform1 = useTransform(
    scrollYProgress,
    [1 / totalCards, 2 / totalCards],
    [`${100 - 1 * 5}vh`, "80px"]
  );
  const yTransform2 = useTransform(
    scrollYProgress,
    [2 / totalCards, 3 / totalCards],
    [`${100 - 2 * 5}vh`, "80px"]
  );
  const yTransform3 = useTransform(
    scrollYProgress,
    [3 / totalCards, 4 / totalCards],
    [`${100 - 3 * 5}vh`, "80px"]
  );

  const yTransforms = [yTransform0, yTransform1, yTransform2, yTransform3];

  return (
    <div className="relative w-full px-2 xs:px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
      <div ref={containerRef} className="relative">
        {approachSteps.map((step, index) => {
          return (
            <div key={step.number} className="">
              <motion.div
                className="sticky top-0 w-full flex items-center justify-center p-2 xs:p-3 sm:p-4 md:p-5 lg:p-6"
                style={{
                  y: yTransforms[index],
                  zIndex: 10 + index,
                }}
              >
                <div className="w-full mx-auto bg-white shadow-sm overflow-hidden">
                  <div className="flex flex-col lg:grid lg:grid-cols-12 lg:gap-6 xl:gap-8 2xl:gap-10">
                    {/* Step Number Section - Left */}
                    <div className="order-1 lg:col-span-2 flex items-center justify-center lg:justify-start p-4 xs:p-5 sm:p-6 md:p-7 lg:p-8 xl:p-10">
                      <div className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-semibold text-[rgb(140,46,71)] leading-none select-none">
                        {step.number}
                      </div>
                    </div>

                    {/* Content Section - Middle */}
                    <div className="order-2 lg:col-span-6 p-4 xs:p-5 sm:p-6 md:p-8 lg:p-10 xl:p-12 2xl:p-16 flex flex-col justify-center relative min-h-[250px] xs:min-h-[300px] sm:min-h-[350px] md:min-h-[400px]">
                      <div className="relative z-10">
                        <h2 className="text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl leading-tight mb-3 xs:mb-4 sm:mb-5 lg:mb-6">
                          {step.title}
                        </h2>

                        <p className="text-xs xs:text-sm sm:text-base">
                          {step.description}
                        </p>
                      </div>
                    </div>

                    {/* Image Section - Right */}
                    <div className="order-3 lg:col-span-4 relative overflow-hidden h-[340px] sm:h-[400px]">
                      <CldImage
                        width={800}
                        height={600}
                        src={step.image}
                        alt={step.title}
                        className="w-full h-full object-cover transition-transform duration-300"
                        quality={"auto:best"}
                        format="auto"
                        dpr="auto"
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        loading={index === 0 ? "eager" : "lazy"}
                        fetchPriority={index === 0 ? "high" : "auto"}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CompanyCulture;