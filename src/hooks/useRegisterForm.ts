// hooks/use-register-form.ts
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { registerInterestSchema, type RegisterInterestFormData } from '@/lib/validation/form';

export function useRegisterForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<RegisterInterestFormData>({
    resolver: zodResolver(registerInterestSchema),
    defaultValues: {
      fullName: '',
      email: '',
      countryCode: 'PK',
      phone: '',
      apartmentType: 'one-bed',
      apartmentSize: 'standard',
      message: '',
    },
  });

  const onSubmit = async (data: RegisterInterestFormData) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success('Thank you for your interest! We will contact you soon.');
      form.reset({
        fullName: '',
        email: '',
        countryCode: 'PK',
        phone: '',
        apartmentType: 'one-bed',
        apartmentSize: 'standard',
        message: '',
      });
    } catch (error) {
      console.error('Submission error:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    form,
    onSubmit,
    isSubmitting,
  };
}
