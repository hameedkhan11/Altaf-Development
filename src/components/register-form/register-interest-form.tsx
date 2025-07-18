// components/register-form/register-interest-form.tsx
"use client";

import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Send } from "lucide-react";
import { FormFieldWrapper } from "@/components/ui/form-field-wrapper";
import { PhoneInput } from "./phone-input";
import {
  ApartmentTypeSelector,
  ApartmentSizeSelector,
} from "./apartment-selector";
import { useRegisterForm } from "@/hooks/useRegisterForm";
import { AnimatedH1, AnimatedP } from "../ui/text-animations";

export function RegisterInterestForm() {
  const { form, onSubmit, isSubmitting } = useRegisterForm();

  return (
    <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto bg-black/40 backdrop-blur- rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/10 font-optima text-white">
      <div className="mb-4 sm:mb-6">
        <AnimatedH1 wordByWord={true} duration={0.6} className="text-lg sm:text-xl md:text-2xl  mb-2 text-white">
          Register Your Interest
        </AnimatedH1>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-3 sm:space-y-4 font-optima"
        >
          <FormFieldWrapper
            control={form.control}
            name="fullName"
            label="Full Name"
          >
            <Input
              placeholder="Enter your full name"
              className="bg-black/30 border-white/20 placeholder:text-gray-400 focus:border-white/40 py-3 sm:py-4 md:py-5 text-sm sm:text-base"
              {...form.register("fullName")}
            />
          </FormFieldWrapper>

          <FormFieldWrapper
            control={form.control}
            name="email"
            label="Email Address"
          >
            <Input
              type="email"
              placeholder="Enter your email"
              className="bg-black/30 border-white/20 className placeholder:text-gray-400 focus:border-white/40 py-3 sm:py-4 md:py-5 text-sm sm:text-base"
              {...form.register("email")}
            />
          </FormFieldWrapper>

          <div className="text-white text-start">
            <label className="font-medium text-sm">Phone Number</label>
            <PhoneInput
              countryCode={form.watch("countryCode")}
              phoneNumber={form.watch("phone")}
              onCountryChange={(value) => form.setValue("countryCode", value)}
              onPhoneChange={(value) => form.setValue("phone", value)}
            />
            {form.formState.errors.countryCode && (
              <AnimatedP className="text-red-400 text-xs sm:text-sm mt-1">
                {form.formState.errors.countryCode.message}
              </AnimatedP>
            )}
            {form.formState.errors.phone && (
              <AnimatedP className="text-red-400 text-xs sm:text-sm mt-1">
                {form.formState.errors.phone.message}
              </AnimatedP>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <FormFieldWrapper
              control={form.control}
              name="apartmentType"
              label="Apartment Type"
            >
              <ApartmentTypeSelector
                value={form.watch("apartmentType")}
                onValueChange={(value) =>
                  form.setValue("apartmentType", value as "one-bed" | "two-bed")
                }
              />
            </FormFieldWrapper>

            <FormFieldWrapper
              control={form.control}
              name="apartmentSize"
              label="Size Preference"
            >
              <ApartmentSizeSelector
                value={form.watch("apartmentSize")}
                onValueChange={(value) =>
                  form.setValue(
                    "apartmentSize",
                    value as "compact" | "standard" | "premium"
                  )
                }
              />
            </FormFieldWrapper>
          </div>

          <FormFieldWrapper
            control={form.control}
            name="message"
            label="Message (Optional)"
          >
            <Textarea
              placeholder="Tell us about your preferences or any questions..."
              className="bg-black/30 border-white/20 className placeholder:text-gray-400 focus:border-white/40 resize-none h-16 sm:h-20 overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/20 hover:scrollbar-thumb-white/30 text-sm sm:text-base"
              {...form.register("message")}
            />
          </FormFieldWrapper>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-white text-black hover:bg-gray-100 cursor-pointer font-semibold py-2.5 sm:py-3 rounded-lg transition-all duration-200 disabled:opacity-50 text-sm sm:text-base"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-3 w-3 sm:h-4 sm:w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Send className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                Submit Interest
              </>
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}