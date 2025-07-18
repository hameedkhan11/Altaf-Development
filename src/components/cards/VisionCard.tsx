// components/MissionVisionCard.tsx
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { MissionVision } from '@/lib/about-us/types';

interface MissionVisionCardProps {
  data: MissionVision;
  index: number;
}

export const MissionVisionCard: React.FC<MissionVisionCardProps> = ({ data, index }) => {
  return (
    <Card className={`card  group relative overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 ${
      index % 2 === 0 ? 'lg:mr-8' : 'lg:ml-8'
    }`}>
      <div>

      <CardHeader className="relative z-10 pb-4">
        <div className="flex items-center gap-4 mb-4">
          <div className="text-4xl bg-gradient-to-br from-[rgb(140,46,71)] to-[rgb(180,86,111)] p-3 rounded-full shadow-lg">
            {data.icon}
          </div>
          <h3 className="text-2xl group-hover:text-white transition-colors duration-300">
            {data.title}
          </h3>
        </div>
      </CardHeader>
      
      <CardContent className="relative z-10">
        <p className=" text-md leading-relaxed mb-6 font-optima">
          {data.description}
        </p>
        
        <div className="space-y-3">
          {data.features.map((feature, idx) => (
            <div key={idx} className="flex items-start gap-3 group/item">
              <div className="w-2 h-2 rounded-full bg-[rgb(140,46,71)] mt-2 group-hover/item:scale-125 transition-transform duration-200" />
              <span className=" transition-colors duration-200 font-optima">
                {feature}
              </span>
            </div>
          ))}
        </div>
        
     
      </CardContent>
          </div>
    </Card>
  );
};