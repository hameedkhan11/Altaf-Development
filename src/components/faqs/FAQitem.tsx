// FAQItem.tsx
"use client";
import React from "react";
import { ChevronDown } from "lucide-react";
import { FAQItem as FAQItemType } from "@/data/faqs/data";
import { AnimatedH3 } from "../ui/text-animations";

interface FAQItemProps {
  item: FAQItemType;
  isOpen: boolean;
  onToggle: (id: number) => void;
  isLast: boolean;
}

const FAQItem: React.FC<FAQItemProps> = ({ item, isOpen, onToggle }) => {
  return (
    <div
      className={`group`}
      itemScope
      itemType="https://schema.org/Question"
    >
      <button
        onClick={() => onToggle(item.id)}
        className="w-full py-4 sm:py-5 md:py-6 text-left hover:bg-gray-50/50 transition-colors duration-200 focus:outline-none group border-b border-black"
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${item.id}`}
      >
        <div className="flex items-start justify-between w-full">
          <AnimatedH3
            className="text-lg sm:text-xl font-light text-left leading-tight pr-4 sm:pr-6 md:pr-8 flex-1 min-w-0"
          >
            {item.question}
          </AnimatedH3>
          <ChevronDown
            className={`w-5 h-5 sm:w-6 sm:h-6  transition-transform duration-300 flex-shrink-0 mt-0.5 sm:mt-1 ${
              isOpen ? "rotate-180" : ""
            }`}
            aria-hidden="true"
          />
        </div>
      </button>
      
      {/* Answer Section */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen
            ? "max-h-[600px] opacity-100"
            : "max-h-0 opacity-0"
        }`}
        id={`faq-answer-${item.id}`}
        itemScope
        itemType="https://schema.org/Answer"
      >
        <div className="pb-6 sm:pb-7 md:pb-8 lg:pb-10 pr-8 sm:pr-10 md:pr-12 pt-4">
          <p
            className="leading-relaxed font-light text-sm sm:text-base"
          >
            {item.answer}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FAQItem;