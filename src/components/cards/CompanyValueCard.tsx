import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { CompanyValue } from "@/lib/about-us/types";

interface CompanyValueCardProps {
  value: CompanyValue;
  index: number;
}

export const CompanyValueCard: React.FC<CompanyValueCardProps> = ({
  value,
  index,
}) => {
  return (
    <Card className="card group relative overflow-hidden hover:text-white bg-white border border-gray-200 hover:shadow-xl transition-all duration-500 hover:-translate-y-2 px-0">
      <div className="absolute inset-0 bg-gradient-to-br from-[rgba(140,46,71,0.05)] to-[rgba(140,46,71,0.1)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <CardContent className="relative z-10 p-3 sm:p-4 lg:p-6 text-center">
        <div className="bg-[rgb(140,46,71)] text-white rounded-full w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
          <span className="text-lg sm:text-xl lg:text-2xl font-bold">{index + 1}</span>
        </div>
        
        <h3 className="text-lg sm:text-xl mb-3 sm:mb-4 group-hover:text-white transition-colors duration-300">
          {value.title}
        </h3>
        
        <p className="text-sm sm:text-base leading-relaxed transition-colors duration-300">
          {value.description}
        </p>

        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[rgb(140,46,71)] to-[rgb(255,108,147)] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
      </CardContent>
    </Card>
  );
};