// components/FormStepIndicator.tsx
"use client";

import { motion } from 'framer-motion';

interface FormStepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  steps: string[];
}

export const FormStepIndicator = ({ currentStep, totalSteps, steps }: FormStepIndicatorProps) => {
  return (
    <div className="flex items-center justify-between mb-8">
      {steps.map((step, index) => {
        const stepNumber = index + 1;
        const isActive = currentStep >= stepNumber;
        const isCompleted = currentStep > stepNumber;
        
        return (
          <div key={stepNumber} className="flex items-center flex-1">
            <div className="flex items-center">
              <motion.div 
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                  isActive 
                    ? 'bg-slate-900 text-white shadow-lg' 
                    : 'bg-slate-100 text-slate-400'
                }`}
                animate={{
                  scale: isActive ? 1.1 : 1,
                  backgroundColor: isActive ? '#0f172a' : '#f1f5f9'
                }}
                transition={{ duration: 0.3 }}
              >
                {isCompleted ? (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                ) : (
                  stepNumber
                )}
              </motion.div>
              <span className={`ml-3 text-sm font-medium transition-colors duration-300 ${
                isActive ? 'text-slate-900' : 'text-slate-500'
              }`}>
                {step}
              </span>
            </div>
            
            {index < totalSteps - 1 && (
              <div className="flex-1 mx-6 h-0.5 bg-slate-200 relative">
                <motion.div 
                  className="h-full bg-slate-900 transition-all duration-500"
                  initial={{ width: '0%' }}
                  animate={{ 
                    width: currentStep > stepNumber ? '100%' : '0%' 
                  }}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};