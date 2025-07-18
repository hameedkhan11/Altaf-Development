// lib/validations/form.ts
import { z } from 'zod';

export const registerInterestSchema = z.object({
  fullName: z
    .string()
    .min(2, 'Full name must be at least 2 characters')
    .max(50, 'Full name must not exceed 50 characters')
    .regex(/^[a-zA-Z\s]+$/, 'Full name should only contain letters and spaces'),
  
  email: z
    .string()
    .email('Please enter a valid email address')
    .min(1, 'Email is required'),
  
  countryCode: z
    .string()
    .min(1, 'Please select a country'),
  
  phone: z
    .string()
    .min(7, 'Phone number must be at least 7 digits')
    .max(15, 'Phone number must not exceed 15 digits')
    .regex(/^[\d\s\-\(\)]+$/, 'Please enter a valid phone number'),
  
  apartmentType: z
    .enum(['one-bed', 'two-bed'], {
      required_error: 'Please select an apartment type',
    }),
  
  apartmentSize: z
    .enum(['compact', 'standard', 'premium'], {
      required_error: 'Please select an apartment size',
    }),
  
  message: z
    .string()
    .max(500, 'Message must not exceed 500 characters')
    .optional(),
});

export type RegisterInterestFormData = z.infer<typeof registerInterestSchema>;