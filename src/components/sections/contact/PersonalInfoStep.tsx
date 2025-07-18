// components/PersonalInfoStep.tsx
"use client";

import { ContactFormData } from '@/lib/contact-us/types';
import { motion } from 'framer-motion';

interface PersonalInfoStepProps {
  formData: ContactFormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onNext: () => void;
}

export const PersonalInfoStep = ({ formData, onChange, onNext }: PersonalInfoStepProps) => {
  const isValidStep = formData.fullName && formData.email && formData.phoneNumber;

  return (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div>
        <label htmlFor="fullName" className="block text-sm font-semibold font-optima mb-2">
          Full Name *
        </label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          value={formData.fullName}
          onChange={onChange}
          placeholder="Enter your full name"
          className="w-full px-4 py-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all duration-200 text-base bg-white hover:border-slate-300"
          required
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-semibold font-optima mb-2">
          Email Address *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={onChange}
          placeholder="Enter your email address"
          className="w-full px-4 py-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all duration-200 text-base bg-white hover:border-slate-300"
          required
        />
      </div>

      <div>
        <label htmlFor="phoneNumber" className="block text-sm font-semibold font-optima mb-2">
          Phone Number *
        </label>
        <div className="flex rounded-xl border border-slate-200 hover:border-slate-300 focus-within:ring-2 focus-within:ring-slate-500 focus-within:border-transparent transition-all duration-200">
          <div className="flex items-center px-4 py-4 bg-slate-50 rounded-l-xl border-r border-slate-200">
            <span className="text-base">🇵🇰</span>
            <span className="ml-2 font-medium text-sm">+92</span>
          </div>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={onChange}
            placeholder="3XX XXXXXXX"
            className="flex-1 px-4 py-4 bg-white rounded-r-xl border-0 focus:ring-0 focus:outline-none text-base"
            required
          />
        </div>
      </div>

      <motion.button
        type="button"
        onClick={onNext}
        disabled={!isValidStep}
        className="w-full bg-slate-900 text-white py-4 px-8 rounded-xl font-semibold hover:bg-slate-800 focus:ring-4 focus:ring-slate-200 transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-slate-900"
        whileHover={{ scale: isValidStep ? 1.02 : 1 }}
        whileTap={{ scale: isValidStep ? 0.98 : 1 }}
      >
        <span>Continue</span>
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </motion.button>
    </motion.div>
  );
};