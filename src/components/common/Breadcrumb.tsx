// common/components/Breadcrumb.tsx

import React from 'react';
import { BreadcrumbItem } from '@/lib/types';

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ 
  items, 
  className = "absolute bottom-8 left-8 z-20" 
}) => {
  if (!items || items.length === 0) return null;

  return (
    <div className={className}>
      <nav className="flex items-center space-x-2 text-white/80 text-sm">
        {items.map((item, index) => (
          <React.Fragment key={index}>
            {index > 0 && <span className="mx-2">/</span>}
            {index === items.length - 1 ? (
              <h3 className="text-white max-w-md truncate">
                {item.label}
              </h3>
            ) : (
              <h3 
                className="text-white hover:text-white/80 transition-colors"
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