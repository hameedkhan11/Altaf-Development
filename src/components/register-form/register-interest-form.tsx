// components/contact/contact-form.tsx
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
  const baseClasses = "w-full border border-white/20 rounded-lg px-3 py-2 sm:py-3 text-white placeholder-gray-400 focus:outline-none focus:border-white/40 transition-all duration-200 text-sm sm:text-base";
  
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
    <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-xl mx-auto p-4 sm:p-6 text-white">
      <div className="mb-4 sm:mb-6">
        <h2 className="text-lg sm:text-xl md:text-4xl mb-2 text-white">
            Let&apos;s Talk with us
        </h2>
      </div>

      <div className="space-y-3 sm:space-y-4">
        {/* Name and Email side by side */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <Input
            type="tel"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="rounded-sm bg-neutral-600 placeholder:text-white/90"
          />
          <div className="rounded-sm bg-neutral-600 px-3 py-2 sm:py-3">
            <p className="text-white text-sm">Preferred mode of contact</p>
            <div className="flex flex-wrap items-center gap-x-2">
              <label className="flex items-center justify-center space-x-0.5 cursor-pointer">
                <input
                  type="radio"
                  name="preferredContact"
                  value="email"
                  checked={formData.preferredContact === 'email'}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-white border border-white"
                />
                <span className="text-white text-xs">Email</span>
              </label>
              <label className="flex items-center space-x-0.5 cursor-pointer">
                <input
                  type="radio"
                  name="preferredContact"
                  value="whatsapp"
                  checked={formData.preferredContact === 'whatsapp'}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-white border border-white/20 focus:ring-white/40 focus:ring-2"
                />
                <span className="text-white text-xs">WhatsApp</span>
              </label>
              <label className="flex items-center space-x-0.5 cursor-pointer">
                <input
                  type="radio"
                  name="preferredContact"
                  value="call"
                  checked={formData.preferredContact === 'call'}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-white"
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
          rows={6}
        />

        {/* Newsletter checkbox */}
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            name="receiveOffers"
            checked={formData.receiveOffers}
            onChange={handleInputChange}
            className="w-4 h-4 rounded border border-white/20 text-white focus:ring-white/40 focus:ring-2"
          />
          <label htmlFor="receiveOffers" className="text-sm sm:text-base text-white cursor-pointer">
            I would like to receive latest offers and Blog Posts
          </label>
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="w-full bg-white text-black hover:bg-gray-100 cursor-pointer font-semibold py-2.5 sm:py-3 rounded-lg transition-all duration-200 disabled:opacity-50 text-sm sm:text-base inline-flex items-center justify-center"
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-3 w-3 sm:h-4 sm:w-4 border-2 border-black border-t-transparent mr-2"></div>
              Sending...
            </>
          ) : (
            <>
              <Send className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
              Send Message
            </>
          )}
        </button>
      </div>
    </div>
  );
}