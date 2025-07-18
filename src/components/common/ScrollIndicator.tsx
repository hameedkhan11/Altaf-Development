// common/components/ScrollIndicator.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface ScrollIndicatorProps {
  onClick?: () => void;
  className?: string;
}

export const ScrollIndicator: React.FC<ScrollIndicatorProps> = ({ 
  onClick,
  className = "absolute bottom-10 left-1/2 transform -translate-x-1/2 z-30"
}) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      // Default scroll behavior
      const nextSection = 
        document.querySelector("section:nth-of-type(2)") ||
        document.querySelector('[data-section="about"]') ||
        document.querySelector(".next-section");

      if (nextSection) {
        nextSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      } else {
        window.scrollTo({
          top: window.innerHeight,
          behavior: "smooth",
        });
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2, duration: 1 }}
      className={`${className} cursor-pointer`}
      onClick={handleClick}
      role="button"
      aria-label="Scroll to next section"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="flex flex-col items-center text-white/70 p-4 hover:bg-white/10 rounded-full transition-colors duration-300"
      >
        <span className="text-sm font-medium mb-3">Scroll to explore</span>
        <div className="w-6 h-10 border-2 border-white/30 rounded-full relative">
          <div className="w-1 h-3 bg-white/70 rounded-full absolute top-2 left-1/2 transform -translate-x-1/2 animate-bounce" />
        </div>
        <ChevronDown className="h-8 w-8 mt-2" />
      </motion.div>
    </motion.div>
  );
};
