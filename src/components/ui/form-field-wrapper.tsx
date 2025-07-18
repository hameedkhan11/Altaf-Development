// components/ui/form-field-wrapper.tsx
import { ReactNode } from 'react';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Control, FieldPath, FieldValues } from 'react-hook-form';

interface FormFieldWrapperProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  children: ReactNode;
  className?: string;
}

export function FormFieldWrapper<T extends FieldValues>({
  control,
  name,
  label,
  children,
  className,
}: FormFieldWrapperProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({  }) => (
        <FormItem className={className}>
          <FormLabel className="text-white font-medium">
            {label}
          </FormLabel>
          <FormControl>
            {children}
          </FormControl>
          <FormMessage className="text-red-400" />
        </FormItem>
      )}
    />
  );
}