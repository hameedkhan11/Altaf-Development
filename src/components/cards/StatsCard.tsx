// components/StatsCard.tsx
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
interface CompanyStats {
  value: number;
  label: string;
  description: string;
}

interface StatsCardProps {
  stat: CompanyStats;
  index: number;
}

export const StatsCard: React.FC<StatsCardProps> = ({ stat }) => {
  return (
    <Card className="group relative overflow-hidden bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 transition-all duration-500 hover:scale-105">
      <div className="absolute inset-0 bg-gradient-to-br from-[rgba(140,46,71,0.1)] to-[rgba(140,46,71,0.3)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <CardContent className="relative z-10 p-8 text-center">
        <div className="text-4xl lg:text-5xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">
          {stat.value}
        </div>
        <div className="text-lg font-semibold text-white/90 mb-3">
          {stat.label}
        </div>
        <div className="text-sm text-white/70 group-hover:text-white/90 transition-colors duration-300">
          {stat.description}
        </div>
        
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-white/20 to-white/40 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
      </CardContent>
    </Card>
  );
};