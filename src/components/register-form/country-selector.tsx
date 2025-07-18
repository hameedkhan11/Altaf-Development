// // components/register-form/country-selector.tsx
// 'use client';

// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { COUNTRIES } from '@/lib/constants';

// interface CountrySelectorProps {
//   value: string;
//   onValueChange: (value: string) => void;
// }

// export function CountrySelector({ value, onValueChange }: CountrySelectorProps) {
//   return (
//     <Select value={value} onValueChange={onValueChange}>
//       <SelectTrigger className="bg-black/30 border-white/20 text-white placeholder:text-gray-400 focus:border-white/40">
//         <SelectValue placeholder="Select your country" />
//       </SelectTrigger>
//       <SelectContent 
//         className="bg-black/95 border-white/20 max-h-[120px] overflow-y-auto"
//         sideOffset={4}
//       >
//         {COUNTRIES.map((country) => (
//           <SelectItem 
//             key={country.code}
//             value={country.code}
//             className="text-white hover:bg-white/10 focus:bg-white/20 cursor-pointer"
//           >
//             <span className="flex items-center gap-2">
//               <span>{country.flag}</span>
//               <span>{country.name}</span>
//               <span className="text-gray-400">({country.dialCode})</span>
//             </span>
//           </SelectItem>
//         ))}
//       </SelectContent>
//     </Select>
//   );
// }