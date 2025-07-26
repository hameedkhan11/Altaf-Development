"use client";
import { useContactForm } from "@/hooks/useForm";
import { ContactHero } from "./ContactHero";
import { CldImage } from "next-cloudinary";
import { Button } from "@/components/ui/button";
import { ContactInfoCard } from "./ContactInfo";

// Main ContactForm Component
const ContactForm = () => {
  const {
    formData,
    isSubmitting,
    countries,
    contactModes,
    handleInputChange,
    handleSubmit,
  } = useContactForm();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      {/* Hero Section */}
      <ContactHero />

      {/* Contact Form Section */}
      <div className="py-6 sm:py-8 lg:py-12 px-3 sm:px-4 lg:px-8 xl:px-16">
        <div className="mx-auto">
          <div className="text-center mt-4 sm:mt-6 lg:mt-8">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl mb-1 sm:mb-2">Register Your Interest</h2>
            <p className="font-optima text-xs sm:text-sm md:text-base px-2 sm:px-0">
              Complete this form and our luxury property consultant will contact
              you personally.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 xl:gap-12 items-start mt-6 sm:mt-8 lg:mt-16">
            {/* Left Side - CldImage */}
            <div className="bg-white rounded-sm border border-slate-200 order-2 lg:order-1 mt-4">
              <CldImage
                src="Contact_aucys5"
                alt="Luxury Property"
                width={600}
                height={400}
                className="w-full h-auto rounded-lg object-cover"
                crop="fill"
                gravity="auto"
              />
            </div>

            {/* Right Side - Contact Form */}
            <div className="bg-white p-3 sm:p-4 lg:p-6 order-1 lg:order-2">
              <div className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 lg:gap-5">
                  {/* Name Field */}
                  <div className="">
                    <label className="block mb-1 sm:mb-2 text-xs sm:text-sm lg:text-base">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full bg-transparent border-b-2 border-neutral-900 focus:border-[rgb(140,46,71)] outline-none text-xs sm:text-sm lg:text-base py-1 sm:py-2 lg:py-3 px-0 transition-all duration-300 placeholder-slate-400 font-optima"
                      placeholder="Enter your full name"
                    />
                  </div>

                  {/* Email Field */}
                  <div className="space-y-1 sm:space-y-2">
                    <label className="block font-optima mb-1 sm:mb-2 text-xs sm:text-sm lg:text-base">E-mail</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full bg-transparent border-b-2 border-neutral-900 focus:border-[rgb(140,46,71)] outline-none text-xs sm:text-sm lg:text-base py-1 sm:py-2 lg:py-3 px-0 transition-all duration-300 placeholder-slate-400 font-optima"
                      placeholder="Enter your email address"
                    />
                  </div>
                </div>

                {/* Phone Field with Country Code */}
                <div className="space-y-1 sm:space-y-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 lg:gap-5">
                    {/* Phone Label */}
                    <div>
                      <label className="block font-optima mb-1 sm:mb-2 text-xs sm:text-sm lg:text-base">Phone</label>
                    </div>
                    {/* Prefer Mode of Contact Label */}
                    <div>
                      <label className="block mb-1 sm:mb-2 text-xs sm:text-sm lg:text-base">Prefer Mode of Contact</label>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 lg:gap-5">
                    {/* Phone Input */}
                    <div className="flex gap-1 sm:gap-2">
                      <select
                        name="countryCode"
                        value={formData.countryCode}
                        onChange={handleInputChange}
                        className="border-b-2 border-neutral-900 focus:border-[rgb(140,46,71)] outline-none font-optima text-xs sm:text-sm lg:text-base py-1 sm:py-2 lg:py-3 px-0 transition-all duration-300 min-w-0 flex-shrink-0 bg-transparent"
                      >
                        {countries.map((country) => (
                          <option
                            key={country.code}
                            value={country.code}
                            className="bg-white text-xs sm:text-sm lg:text-base"
                          >
                            {country.flag} {country.code}
                          </option>
                        ))}
                      </select>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="flex-1 min-w-0 bg-transparent border-b-2 border-neutral-900 focus:border-[rgb(140,46,71)] outline-none text-slate-900 text-xs sm:text-sm lg:text-base py-1 sm:py-2 lg:py-3 px-0 transition-all duration-300 placeholder-neutral-400 font-optima"
                        placeholder="Enter your phone No"
                      />
                    </div>
                    
                    {/* Prefer Mode of Contact Options */}
                    <div className="flex gap-2 sm:gap-3 flex-wrap">
                      {contactModes.map((mode) => (
                        <label
                          key={mode.value}
                          className="flex items-center gap-1 cursor-pointer"
                        >
                          <input
                            type="radio"
                            name="preferredContact"
                            value={mode.value}
                            checked={formData.preferredContact === mode.value}
                            onChange={handleInputChange}
                            className="w-3 h-3 sm:w-4 sm:h-4 text-[rgb(140,46,71)] flex-shrink-0"
                          />
                          <span className="text-xs sm:text-sm whitespace-nowrap">
                            {mode.label}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Message Field */}
                <div className="space-y-1 sm:space-y-2">
                  <label className="block font-optima text-xs sm:text-sm lg:text-base font-medium mb-1 sm:mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={2}
                    className="w-full bg-transparent border-b-2 border-neutral-900 focus:border-[rgb(140,46,71)] outline-none text-xs sm:text-sm lg:text-base py-1 sm:py-2 lg:py-3 px-0 transition-all duration-300 placeholder-slate-700 resize-none font-optima"
                    placeholder="Tell us about your property requirements..."
                  />
                </div>

                {/* Email Subscription Checkbox */}
                <div className="space-y-1 sm:space-y-2">
                  <label className="flex items-start gap-2 sm:gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="emailSubscription"
                      checked={formData.emailSubscription || false}
                      onChange={handleInputChange}
                      className="w-3 h-3 sm:w-4 sm:h-4 text-[rgb(140,46,71)] border-2 rounded-sm mt-0.5 flex-shrink-0"
                    />
                    <span className="text-xs sm:text-sm lg:text-baseleading-tight">
                      I would like to receive latest offers and blog posts on my email
                    </span>
                  </label>
                </div>

                {/* Submit Button */}
                <div className="flex justify-center pt-3 sm:pt-4 lg:pt-5">
                  <Button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="bg-[rgb(140,46,71)] font-light text-white hover:bg-transparent hover:text-[rgb(140,46,71)] py-3 sm:py-4 lg:py-5 px-4 sm:px-6 lg:px-8 w-full rounded-full text-sm sm:text-base lg:text-lg transition-all duration-300 ease-in transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none border-2 border-transparent cursor-pointer hover:border-[rgb(140,46,71)]"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2 justify-center">
                        <div className="animate-spin rounded-full h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5 border-b-2 border-slate-900"></div>
                        <span className="text-xs sm:text-sm lg:text-base">Sending...</span>
                      </div>
                    ) : (
                      "Send Message"
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Contact Information */}
        <ContactInfoCard />
      </div>
    </div>
  );
};

export default ContactForm;