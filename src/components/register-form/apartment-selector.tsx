// components/register-form/apartment-selector.tsx
'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { APARTMENT_SIZES, APARTMENT_TYPES } from '@/lib/constants';

interface ApartmentTypeSelectorProps {
  value: string;
  onValueChange: (value: string) => void;
}

export function ApartmentTypeSelector({ value, onValueChange }: ApartmentTypeSelectorProps) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="bg-black/30  border-white/20 text-white placeholder:text-gray-400 focus:border-white/40">
        <SelectValue placeholder="Select apartment type" />
      </SelectTrigger>
      <SelectContent className="bg-black/95 border-white/20 text-sm">
        {APARTMENT_TYPES.map((type) => (
          <SelectItem 
            key={type.value} 
            value={type.value}
            className="text-white hover:bg-white/90 focus:bg-white/90 "
          >
            {type.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

interface ApartmentSizeSelectorProps {
  value: string;
  onValueChange: (value: string) => void;
}

export function ApartmentSizeSelector({ value, onValueChange }: ApartmentSizeSelectorProps) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="bg-black/30 border-white/20 text-white placeholder:text-gray-400 focus:border-white/40">
        <SelectValue placeholder="Select apartment size" />
      </SelectTrigger>
      <SelectContent className="bg-black/95 border-white/20 hover:text-black">
        {APARTMENT_SIZES.map((size) => (
          <SelectItem 
            key={size.value} 
            value={size.value}
            className="text-white text-sm hover:bg-white/90 focus:bg-white/90 "
          >
            <div className="flex flex-col items-start text-sm">
              <span className='text-sm'>{size.label}</span>
              <span className="text-xs">{size.description}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}