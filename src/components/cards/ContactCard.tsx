// components/cards/ContactCard.tsx
"use client";

import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface ContactCardProps {
  icon: LucideIcon;
  title: string;
  primary: string;
  secondary: string;
  index: number;
}

export const ContactCard = ({ 
  icon: Icon, 
  title, 
  primary, 
  secondary, 
  index 
}: ContactCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        ease: "easeOut"
      }}
      whileHover={{ 
        y: -5,
        transition: { duration: 0.2 }
      }}
      className="group relative bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-[rgb(140,46,71)]/20 max-w-sm w-full"
    >
      {/* Icon Container */}
      <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-[rgb(140,46,71)] mb-4 group-hover:scale-110 transition-transform duration-300 ease-in">
        <Icon className="w-6 h-6 text-white" />
      </div>

      {/* Content */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold group-hover:text-[rgb(140,46,71)] transition-colors duration-300">
          {title}
        </h3>
        
        <p className="text-base font-medium">
          {primary}
        </p>
        
        <p className="text-sm">
          {secondary}
        </p>
      </div>

      {/* Hover Accent */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[rgb(140,46,71)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </motion.div>
  );
};