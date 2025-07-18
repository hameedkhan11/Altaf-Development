// layouts/HeroSection.tsx
import React from 'react';
import { AnimatedH1 } from '../ui/text-animations';

interface HeroSectionProps {
  title: string;
  subtitle: string;
  backgroundImage: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ title, subtitle, backgroundImage }) => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax Effect */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-fixed transform scale-110"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[rgba(140,46,71,0.1)] rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[rgba(140,46,71,0.1)] rounded-full blur-3xl animate-pulse delay-1000" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
        <AnimatedH1 className="text-5xl font-bold text-white mb-8 leading-tight">
          <span className="block opacity-0 animate-[fadeInUp_1s_ease-out_0.5s_forwards]">
            {title.split(' ').slice(0, 3).join(' ')}
          </span>
          <span className="block opacity-0 animate-[fadeInUp_1s_ease-out_1s_forwards] bg-gradient-to-r from-white to-[rgb(140,46,71)] bg-clip-text text-transparent">
            {title.split(' ').slice(3).join(' ')}
          </span>
        </AnimatedH1>
        
        <p className="text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto opacity-0 animate-[fadeInUp_1s_ease-out_1.5s_forwards]">
          {subtitle}
        </p>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 animate-[fadeInUp_1s_ease-out_2s_forwards]">
          <div className="flex flex-col items-center text-white/70">
            <span className="text-sm font-medium mb-3">Scroll to explore</span>
            <div className="w-6 h-10 border-2 border-white/30 rounded-full relative">
              <div className="w-1 h-3 bg-white/70 rounded-full absolute top-2 left-1/2 transform -translate-x-1/2 animate-bounce" />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};