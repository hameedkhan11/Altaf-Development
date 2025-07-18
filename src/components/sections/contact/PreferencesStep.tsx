// components/PreferencesStep.tsx
"use client";

import { apartmentTypes, ContactFormData, purposeOfInquiry } from '@/lib/contact-us/types';
import { motion } from 'framer-motion';

interface PreferencesStepProps {
  formData: ContactFormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  onPrevious: () => void;
  onSubmit: () => void;
  isSubmitting: boolean;
}

export const PreferencesStep = ({ 
  formData, 
  onChange, 
  onPrevious, 
  onSubmit, 
  isSubmitting 
}: PreferencesStepProps) => {
  const isValidStep = formData.purposeOfInquiry && formData.apartmentType && formData.privacyConsent;

  return (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div>
        <label htmlFor="purposeOfInquiry" className="block text-sm font-semibold font-optima mb-2">
          Purpose of Inquiry *
        </label>
        <select
          id="purposeOfInquiry"
          name="purposeOfInquiry"
          value={formData.purposeOfInquiry}
          onChange={onChange}
          className="w-full px-4 py-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all duration-200 text-base bg-white hover:border-slate-300"
          required
        >
          <option value="">Select purpose of inquiry</option>
          {purposeOfInquiry.map((purpose) => (
            <option key={purpose.value} value={purpose.value}>
              {purpose.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="apartmentType" className="block text-sm font-semibold font-optima mb-2">
          Property Type *
        </label>
        <select
          id="apartmentType"
          name="apartmentType"
          value={formData.apartmentType}
          onChange={onChange}
          className="w-full px-4 py-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all duration-200 text-base bg-white hover:border-slate-300"
          required
        >
          <option value="">Select property type</option>
          {apartmentTypes.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-semibold font-optima mb-2">
          Additional Message
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={onChange}
          rows={4}
          placeholder="Any specific requirements or questions you'd like to share..."
          className="w-full px-4 py-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all duration-200 resize-none bg-white hover:border-slate-300"
        />
      </div>

      <div className="space-y-4 pt-2">
        <label className="flex items-start">
          <input
            type="checkbox"
            name="marketingConsent"
            checked={formData.marketingConsent}
            onChange={onChange}
            className="w-5 h-5 text-slate-900 border-slate-300 rounded focus:ring-slate-500 mt-0.5"
          />
          <span className="ml-3 text-sm text-slate-600 leading-relaxed">
            I would like to receive updates about new developments and exclusive offers.
          </span>
        </label>

        <label className="flex items-start">
          <input
            type="checkbox"
            name="privacyConsent"
            checked={formData.privacyConsent}
            onChange={onChange}
            className="w-5 h-5 text-slate-900 border-slate-300 rounded focus:ring-slate-500 mt-0.5"
            required
          />
          <span className="ml-3 text-sm text-slate-600 leading-relaxed">
            I agree to the{' '}
            <a href="/privacy-policy" className="text-slate-900 hover:underline font-medium">
              Privacy Policy
            </a>{' '}
            and{' '}
            <a href="/terms" className="text-slate-900 hover:underline font-medium">
              Terms of Service
            </a>
            . *
          </span>
        </label>
      </div>

      <div className="flex space-x-4 pt-4">
        <button
          type="button"
          onClick={onPrevious}
          className="flex-1 bg-slate-100 text-slate-700 py-4 px-8 rounded-xl font-semibold hover:bg-slate-200 transition-all duration-200"
        >
          Previous
        </button>
        
        <motion.button
          type="button"
          onClick={onSubmit}
          disabled={!isValidStep || isSubmitting}
          className="flex-1 bg-slate-900 text-white py-4 px-8 rounded-xl font-semibold hover:bg-slate-800 focus:ring-4 focus:ring-slate-200 transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-slate-900"
          whileHover={{ scale: (isValidStep && !isSubmitting) ? 1.02 : 1 }}
          whileTap={{ scale: (isValidStep && !isSubmitting) ? 0.98 : 1 }}
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span>Submitting...</span>
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              <span>Submit Interest</span>
            </>
          )}
        </motion.button>
      </div>
    </motion.div>
  );
};