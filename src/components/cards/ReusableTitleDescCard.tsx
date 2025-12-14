"use client";
import React from "react";
import { motion } from "framer-motion";
import { AnimatedH1 } from "../ui/text-animations";
interface TitleDescriptionSectionProps {
  title: string;
  description: string;
  secondaryDescription?: string;
}

const AltafDevelopmentsShowcase: React.FC<TitleDescriptionSectionProps> = ({
  title,
  description,
  secondaryDescription,
}) => {
  return (
    <section
      className={`w-full  py-16 md:py-24 lg:py-32 px-4 sm:px-6 md:px-16 flex flex-col items-center justify-center`}
    >
      <motion.div
        className="text-center max-w-2xl flex flex-col items-center justify-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, margin: "-100px" }}
      >
        {" "}
        <AnimatedH1
          wordByWord={true}
          wordStagger={0.1}
          duration={0.2}
          className={`font-light max-w-xl text-2xl md:text-3xl lg:text-4xl xl:text-5xl tracking-wide uppercase text-center`}
        >
          {title}
        </AnimatedH1>
        <div className="space-y-6 md:space-y-8">
          <p className={` text-sm sm:text-base  font-medium leading-relaxed text-center mt-8 sm:mt-12`}>
            {description}
          </p>

          {secondaryDescription && (
            <p className={`text-sm sm:text-base font-light leading-relaxed text-center`}>
              {secondaryDescription}
            </p>
          )}
        </div>
      </motion.div>
    </section>
  );
};

export default AltafDevelopmentsShowcase;
