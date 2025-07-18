// types/contact.ts
export interface ContactFormData {
  fullName: string;
  email: string;
  phoneNumber: string;
  purposeOfInquiry: string;
  apartmentType: string;
  moveInDate: string;
  message: string;
  marketingConsent: boolean;
  privacyConsent: boolean;
}

export interface ContactInfo {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  primary: string;
  secondary?: string;
  description?: string;
}

// constants/contact.ts
export const purposeOfInquiry = [
  { value: 'buy', label: 'Buy Property' },
  { value: 'sell', label: 'Sell Property' },
  { value: 'rent', label: 'Rent Property' },
  { value: 'investment', label: 'Investment Inquiry' },
  { value: 'consultation', label: 'General Consultation' },
];

export const apartmentTypes = [
  { value: 'one-bedroom', label: 'One Bedroom Apartment' },
  { value: 'two-bedroom', label: 'Two Bedroom Apartment' },
  { value: 'studio', label: 'Studio Apartment' },
  { value: 'penthouse', label: 'Penthouse' },
];