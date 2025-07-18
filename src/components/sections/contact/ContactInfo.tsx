// components/ContactInfoCard.tsx
"use client";

import { motion } from 'framer-motion';
import { Phone, Mail, Clock, Building } from 'lucide-react';
import FeatureCard from '@/components/cards/FeatureCard';

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
    description: 'Available Mon - Sun, 9 AM - 7 PM'
  },
  {
    icon: Mail,
    title: 'Information & Support',
    primary: 'info@altafdevelopment.com',
    secondary: 'General inquiries and support',
    // description: 'Response within 24 hours'
  },
  {
    icon: Clock,
    title: 'Office Hours',
    primary: 'Mon - Sun: 9:00 AM - 7:00 PM',
    secondary: 'Open 7 days a week',
    description: 'Extended hours by appointment'
  }
];

export const ContactInfoCard = () => {
  return (
    <section className="relative pt-16">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="relative"
      >
        <div className="max-w-8xl mx-auto">
          <div className="mb-8 text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl mt-4">
              Get in Touch
            </h2>
            <p className="leading-relaxed text-black">
              Experience luxury living redefined. Our expert team is ready to help you 
              discover your perfect home in our premium residential developments?.
            </p>
          </div>
          
          <div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-4 xl:gap-2 justify-items-center"
            role="list"
            aria-label="Contact information and details"
          >
            {contactInfo.map((item, index) => (
              <FeatureCard
                key={index}
                icon={item.icon}
                title={item.title}
                description={item.description}
                primary={item.primary}
                secondary={item.secondary}
                index={index}
                variant="contact"
              />
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};