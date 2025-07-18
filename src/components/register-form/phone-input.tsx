// components/register-form/phone-input.tsx
'use client';

import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';
import { ChevronDown } from 'lucide-react';
import { COUNTRIES } from '@/lib/constants';

interface PhoneInputProps {
  countryCode: string;
  phoneNumber: string;
  onCountryChange: (value: string) => void;
  onPhoneChange: (value: string) => void;
}

export function PhoneInput({
  countryCode,
  phoneNumber,
  onCountryChange,
  onPhoneChange,
}: PhoneInputProps) {
  const selectedCountry = COUNTRIES.find(country => country.code === countryCode);
  
  // Auto-populate dial code when country changes
  const handleCountryChange = (value: string) => {
    const country = COUNTRIES.find(c => c.code === value);
    if (country) {
      onCountryChange(value);
      // Only set dial code if phone number is empty or already contains a dial code
      if (!phoneNumber || phoneNumber.startsWith('+')) {
        onPhoneChange(country.dialCode + ' ');
      }
    }
  };
  
  return (
    <div className="relative">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10 py-5">
        <Select value={countryCode} onValueChange={handleCountryChange}>
          <SelectTrigger className="border-0 bg-transparent p-0 h-auto w-auto focus:ring-0 [&>svg]:hidden ">
            <div className="flex items-center gap-1 ">
              <span className=" text-white">{selectedCountry?.flag}</span>
              <ChevronDown className="h-3 w-3 opacity-50 text-white" />
            </div>
          </SelectTrigger>
          <SelectContent 
            className="bg-black/95 border-white/20 max-h-[160px] overflow-y-auto"
            sideOffset={4}
          >
            {COUNTRIES.map((country) => (
              <SelectItem 
                key={country.code}
                value={country.code}
                className="text-white hover:bg-white focus:bg-white/80 cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <span>{country.flag}</span>
                  <span>{country.name}</span>
                  <span className="text-gray-400">({country.dialCode})</span>
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <Input
        type="tel"
        placeholder="Enter phone number"
        value={phoneNumber}
        onChange={(e) => onPhoneChange(e.target.value)}
        className="bg-black/30 border-white/20 text-white placeholder:text-gray-400 focus:border-white/40 pl-12"
      />
    </div>
  );
}