// components/ContactInfoCard.tsx
"use client";

import { motion } from 'framer-motion';
import { Phone, Mail, Clock, Building } from 'lucide-react';
import { ContactCard } from '@/components/cards/ContactCard';

const contactInfo = [
  {
    icon: Building,
    title: 'Property Details',
    primary: 'Main Boulevard Plot #1',
    secondary: 'Block B, Faisal Hills',
    description: 'Near Islamabad Rawalpindi'
  },
  {
    icon: Phone,
    title: 'Sales & Inquiries', 
    primary: '+92 333 0777775',
    secondary: 'Direct sales line',
  },
  {
    icon: Mail,
    title: 'Information & Support',
    primary: 'info@altafdevelopment.com',
    secondary: 'General inquiries and support',
  },
  {
    icon: Clock,
    title: 'Office Hours',
    primary: 'Mon - Sun: 9:00 AM - 7:00 PM',
    secondary: 'Open 7 days a week',
  }
];

export const ContactInfoCard = () => {
  return (
    <section className="relative pt-16 pb-8">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        {/* Header Section */}
        <div className="mb-12 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl"
          >
            Get in Touch
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="leading-relaxed text-sm sm:text-base max-w-2xl mx-auto"
          >
            At Altaf Developments, we craft more than homes — we create elevated lifestyles. Let our expert team guide you in discovering your perfect residence within our premium, thoughtfully designed communities.
          </motion.p>
        </div>
        
        {/* Contact Cards Grid */}
        <div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4 justify-items-center"
          role="list"
          aria-label="Contact information and details"
        >
          {contactInfo.map((item, index) => (
            <ContactCard
              key={index}
              icon={item.icon}
              title={item.title}
              primary={item.primary}
              secondary={item.secondary}
              index={index}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
};