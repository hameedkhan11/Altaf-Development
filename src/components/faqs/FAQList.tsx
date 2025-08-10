// FAQList.tsx
"use client";
import React, { useState } from "react";
import FAQItem from "./FAQitem";
import { faqData } from "@/data/faqs/data";

const FAQList: React.FC = () => {
  const [openItem, setOpenItem] = useState<number | null>(null);

  const toggleItem = (id: number) => {
    setOpenItem(openItem === id ? null : id);
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 sm:ml-8 md:ml-12 lg:ml-20" itemScope itemType="https://schema.org/FAQPage">
      {faqData.map((item, index) => (
        <FAQItem
          key={item.id}
          item={item}
          isOpen={openItem === item.id}
          onToggle={toggleItem}
          isLast={index === faqData.length - 1}
        />
      ))}
    </div>
  );
};

export default FAQList;