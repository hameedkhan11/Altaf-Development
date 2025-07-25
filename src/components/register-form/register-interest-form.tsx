// components/contact/contact-form.tsx (Updated for better responsiveness)
"use client";
            
import { useState } from "react";
import { Send } from "lucide-react";

// Reusable Input Component
interface InputProps {
  type?: 'text' | 'email' | 'tel' | 'textarea';
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  required?: boolean;
  rows?: number;
  className?: string;
}

const Input = ({ type = 'text', name, placeholder, value, onChange, required = false, rows, className = "" }: InputProps) => {
  const baseClasses = "w-full border border-white/20 rounded-lg px-2 xs:px-3 py-2 sm:py-3 text-white placeholder-gray-400 focus:outline-none focus:border-white/40 transition-all duration-200 text-xs xs:text-sm sm:text-base";
  
  if (type === 'textarea') {
    return (
      <textarea
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
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
      required={required}
      className={`${baseClasses} ${className}`}
    />
  );
};

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    preferredContact: 'email',
    message: '',
    receiveOffers: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      console.log('Form submitted:', formData);
      setIsSubmitting(false);
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        preferredContact: 'email',
        message: '',
        receiveOffers: false
      });
    }, 2000);
  };

  return (
    <div className="w-full max-w-xs xs:max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-xl 2xl:max-w-2xl mx-auto p-3 xs:p-4 sm:p-6 text-white">
      <div className="mb-3 xs:mb-4 sm:mb-6">
        <h2 className="text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl mb-2 text-white leading-tight">
          Step Inside Your Future Home
        </h2>
      </div>

      <div className="space-y-2 xs:space-y-3 sm:space-y-4">
        {/* Name and Email side by side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 xs:gap-3 sm:gap-4">
          <Input
            type="text"
            name="name"
            placeholder="Your name*"
            className="rounded-sm bg-neutral-600 placeholder:text-white/90"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
          <Input
            type="email"
            name="email"
            placeholder="E-mail address*"
            className="rounded-sm bg-neutral-600 placeholder:text-white/90"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Phone and Preferred Contact Mode side by side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 xs:gap-3 sm:gap-4">
          <Input
            type="tel"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="rounded-sm bg-neutral-600 placeholder:text-white/90"
          />
          <div className="rounded-sm bg-neutral-600 px-2 xs:px-3 py-2 sm:py-3">
            <p className="text-white text-xs xs:text-sm mb-1 xs:mb-2">Preferred mode of contact</p>
            <div className="flex  xs:flex-row flex-wrap items-start xs:items-center gap-1 xs:gap-x-2">
              <label className="flex items-center justify-start space-x-1 cursor-pointer">
                <input
                  type="radio"
                  name="preferredContact"
                  value="email"
                  checked={formData.preferredContact === 'email'}
                  onChange={handleInputChange}
                  className="w-3 h-3 xs:w-4 xs:h-4 text-white border border-white"
                />
                <span className="text-white text-xs">Email</span>
              </label>
              <label className="flex items-center space-x-1 cursor-pointer">
                <input
                  type="radio"
                  name="preferredContact"
                  value="whatsapp"
                  checked={formData.preferredContact === 'whatsapp'}
                  onChange={handleInputChange}
                  className="w-3 h-3 xs:w-4 xs:h-4 text-white border border-white/20 focus:ring-white/40 focus:ring-2"
                />
                <span className="text-white text-xs">WhatsApp</span>
              </label>
              <label className="flex items-center space-x-1 cursor-pointer">
                <input
                  type="radio"
                  name="preferredContact"
                  value="call"
                  checked={formData.preferredContact === 'call'}
                  onChange={handleInputChange}
                  className="w-3 h-3 xs:w-4 xs:h-4 text-white"
                />
                <span className="text-white text-xs">Call</span>
              </label>
            </div>
          </div>
        </div>

        {/* Message in separate column */}
        <Input
          type="textarea"
          name="message"
          placeholder="Message*"
          className="rounded-sm bg-neutral-600 placeholder:text-white/90"
          value={formData.message}
          onChange={handleInputChange}
          required
          rows={5}
        />

        {/* Newsletter checkbox */}
        <div className="flex items-start xs:items-center space-x-2 xs:space-x-3">
          <input
            type="checkbox"
            name="receiveOffers"
            checked={formData.receiveOffers}
            onChange={handleInputChange}
            className="w-3 h-3 xs:w-4 xs:h-4 mt-1 xs:mt-0 rounded border border-white/20 text-white focus:ring-white/40 focus:ring-2 flex-shrink-0"
          />
          <label htmlFor="receiveOffers" className="text-xs xs:text-sm sm:text-base text-white cursor-pointer leading-tight">
            I would like to receive latest offers and Blog Posts
          </label>
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={isSubmitting}
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
      </div>
    </div>
  );
}