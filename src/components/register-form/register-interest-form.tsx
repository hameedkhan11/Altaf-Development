// components/contact/contact-form.tsx (Updated to use the hook)
"use client";
            
import { useContactForm } from "@/hooks/useForm";
import { Send } from "lucide-react";

// Reusable Input Component
interface InputProps {
  type?: 'text' | 'email' | 'tel' | 'textarea';
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLTextAreaElement>) => void;
  onFocus?: () => void;
  required?: boolean;
  rows?: number;
  className?: string;
}

const Input = ({ type = 'text', name, placeholder, value, onChange, onFocus, required = false, rows, className = "" }: InputProps) => {
  const baseClasses = "w-full border border-white/20 rounded-lg px-2 xs:px-3 py-2 sm:py-3 text-black placeholder-gray-400 focus:outline-none focus:border-white/40 transition-all duration-200 text-xs xs:text-sm sm:text-base";
  
  if (type === 'textarea') {
    return (
      <textarea
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        required={required}
        rows={rows || 4}
        className={`${baseClasses} resize-none ${className}`}
      />
    );
  }

  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onFocus={onFocus}
      required={required}
      className={`${baseClasses} ${className}`}
    />
  );
};

export function ContactForm() {
  const {
    formData,
    isSubmitting,
    submitStatus,
    countries,
    contactModes,
    handleInputChange,
    handleSubmit,
  } = useContactForm();

  return (
    <div className="w-full max-w-xs xs:max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-xl 2xl:max-w-2xl mx-auto p-3 xs:p-4 sm:p-6 text-white">
      <div className="mb-3 xs:mb-4 sm:mb-6">
        <h2 className="text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl mb-2 text-white leading-tight">
          Step Inside Your Future Home
        </h2>
      </div>

      {/* Status Messages */}
      {submitStatus.type && (
        <div className={`mb-4 p-3 rounded-lg text-sm ${
          submitStatus.type === 'success' 
            ? 'bg-green-600/20 border border-green-500/30 text-green-200' 
            : 'bg-red-600/20 border border-red-500/30 text-red-200'
        }`}>
          {submitStatus.message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-2 xs:space-y-3 sm:space-y-4">
        {/* Name and Email side by side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 xs:gap-3 sm:gap-4">
          <Input
            type="text"
            name="name"
            placeholder="Your name*"
            className="rounded-xs bg-white placeholder:text-black"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
          <Input
            type="email"
            name="email"
            placeholder="E-mail address*"
            className="rounded-xs bg-white placeholder:text-black"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Phone with Country Code and Preferred Contact Mode side by side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 xs:gap-3 sm:gap-4">
          <div className="w-full border border-white/20 rounded-sm bg-neutral-600 flex focus-within:border-white/40 transition-all duration-200">
            <select
              name="countryCode"
              value={formData.countryCode}
              onChange={handleInputChange}
              className="rounded-xs bg-white text-black pl-1 xs:pl-2 pr-4 py-2 sm:py-3 text-xs xs:text-sm sm:text-base focus:outline-none appearance-none bg-no-repeat bg-[url('data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 fill=%27none%27 viewBox=%270 0 20 20%27%3e%3cpath stroke=%27%23ffffff%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27 stroke-width=%271.5%27 d=%27m6 8 4 4 4-4%27/%3e%3c/svg%3e')] bg-[length:0.75rem_0.75rem] bg-[right_0.25rem_center]"
            >
              {countries.map((country) => (
                <option key={country.code} value={country.code} className="bg-neutral-700">
                  {country.flag} {country.code}
                </option>
              ))}
            </select>
            <input
              type="tel"
              name="phone"
              placeholder="Phone*"
              value={formData.phone}
              onChange={handleInputChange}
              required
              className="flex-1 rounded-xs bg-white placeholder:text-black px-2 xs:px-3 py-2 sm:py-3 text-xs xs:text-sm sm:text-base focus:outline-none"
            />
          </div>
          <div className="rounded-xs bg-white px-2 xs:px-3 py-2 sm:py-3">
            <p className="text-black text-xs xs:text-sm mb-1 xs:mb-2">Preferred mode of contact</p>
            <div className="flex xs:flex-row flex-wrap items-start xs:items-center gap-1 xs:gap-x-2">
              {contactModes.map((mode) => (
                <label key={mode.value} className="flex items-center space-x-1 cursor-pointer">
                  <input
                    type="radio"
                    name="preferredContact"
                    value={mode.value}
                    checked={formData.preferredContact === mode.value}
                    onChange={handleInputChange}
                    className="w-3 h-3 xs:w-4 xs:h-4 text-black border border-white/20 focus:ring-white/40 focus:ring-2"
                  />
                  <span className="text-black text-xs">{mode.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Message in separate column */}
        <Input
          type="textarea"
          name="message"
          placeholder="Message*"
          className="rounded-xs bg-white placeholder:text-black"
          value={formData.message}
          onChange={handleInputChange}
          required
          rows={7}
        />

        {/* Newsletter checkbox */}
        <div className="flex items-start xs:items-center space-x-2 xs:space-x-3">
          <input
            type="checkbox"
            name="emailSubscription"
            checked={formData.emailSubscription}
            onChange={handleInputChange}
            className="w-3 h-3 xs:w-4 xs:h-4 mt-1 xs:mt-0 rounded border border-white/20 text-white focus:ring-white/40 focus:ring-2 flex-shrink-0"
          />
          <label htmlFor="emailSubscription" className="text-xs xs:text-sm sm:text-base text-white cursor-pointer leading-tight">
            I would like to receive latest offers and Blog Posts
          </label>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          aria-label="Send message"
          className="w-full bg-white text-black hover:bg-gray-100 cursor-pointer font-semibold py-2 xs:py-2.5 sm:py-3 rounded-lg transition-all duration-200 disabled:opacity-50 text-xs xs:text-sm sm:text-base inline-flex items-center justify-center"
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-3 w-3 xs:h-4 xs:w-4 border-2 border-black border-t-transparent mr-1 xs:mr-2"></div>
              Sending...
            </>
          ) : (
            <>
              <Send className="mr-1 xs:mr-2 h-3 w-3 xs:h-4 xs:w-4" />
              Send Message
            </>
          )}
        </button>
      </form>
    </div>
  );
}