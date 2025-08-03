// common/components/Breadcrumb.tsx

import React from 'react';
import { BreadcrumbItem } from '@/lib/types';

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ 
  items, 
  className = "absolute bottom-4 sm:bottom-6 md:bottom-8 left-4 sm:left-6 md:left-8 z-20" 
}) => {
  if (!items || items.length === 0) return null;

  return (
    <div className={className}>
      <nav className="flex items-center space-x-1 sm:space-x-2 text-white/80 text-sm sm:text-base">
        {items.map((item, index) => (
          <React.Fragment key={index}>
            {index > 0 && <span className="mx-1 sm:mx-2 -mt-4 -ml-1 sm:-ml-2 text-xs sm:text-base">/</span>}
            {index === items.length - 1 ? (
              <h3 className="text-white max-w-40 sm:max-w-48 md:max-w-md truncate text-sm sm:text-md  md:text-lg lg:text-xl xl:text-2xl">
                {item.label}
              </h3>
            ) : (
              <h3
                className="text-white hover:text-white/80 transition-colors text-sm sm:text-md md:text-lg lg:text-xl xl:text-2xl"
              >
                {item.label}
              </h3>
            )}
          </React.Fragment>
        ))}
      </nav>
    </div>
  );
};