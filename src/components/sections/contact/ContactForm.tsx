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
    submitStatus,
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
            <p className="text-xs sm:text-sm md:text-base px-2 sm:px-0">
              Complete this form and our luxury property consultant will contact
              you personally.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 xl:gap-12 items-start mt-6 sm:mt-8 lg:mt-16">
            {/* Left Side - CldImage */}
            <div className=" order-2 lg:order-1 mt-4">
              <CldImage
                src="Contact_aucys5"
                alt="Luxury Property"
                width={600}
                height={480}
                className="w-full h-auto rounded-lg object-cover"
                crop="fill"
                gravity="auto"
                aria-label="Luxury Property"
              />
            </div>

            {/* Right Side - Contact Form */}
            <div className="bg-white p-3 sm:p-4 lg:p-6 order-1 lg:order-2">
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Status Message */}
                {submitStatus.type && (
                  <div className={`p-3 rounded-md text-sm ${
                    submitStatus.type === 'success' 
                      ? 'bg-green-50 text-green-800 border border-green-200' 
                      : 'bg-red-50 text-red-800 border border-red-200'
                  }`}>
                    {submitStatus.message}
                  </div>
                )}

                {/* First Row - Name and Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-3 border border-gray-300 focus:outline-none text-sm mt-0.5"
                      placeholder="Your Name"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-3 border border-gray-300 focus:outline-none text-sm"
                      placeholder="Email Address"
                      required
                    />
                  </div>
                </div>

                {/* Second Row - Phone */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Phone
                  </label>
                  <div className="flex gap-2">
                    <select
                      name="countryCode"
                      value={formData.countryCode}
                      onChange={handleInputChange}
                      className="px-3 py-3 border border-gray-300 focus:outline-none  text-sm min-w-0 flex-shrink-0"
                    >
                      {countries.map((country) => (
                        <option
                          key={country.code}
                          value={country.code}
                          className="text-sm"
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
                      className="flex-1 px-3 py-3 border border-gray-300 focus:outline-none text-sm"
                      placeholder="Enter your phone No"
                    />
                  </div>
                </div>

                {/* Third Row - Preferred Mode of Contact */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Preferred Mode of Contact
                  </label>
                  <div className="flex gap-4 flex-wrap">
                    {contactModes.map((mode) => (
                      <label
                        key={mode.value}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="preferredContact"
                          value={mode.value}
                          checked={formData.preferredContact === mode.value}
                          onChange={handleInputChange}
                          className="w-4 h-4 text-blue-600"
                        />
                        <span className="text-sm text-gray-700">
                          {mode.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Fourth Row - Message */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Your Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={6}
                    cols={50}
                    className="w-full px-3 py-3 border border-gray-300 focus:outline-none text-sm resize-none"
                    placeholder="Your Message"
                    required
                  />
                </div>

                {/* Email Subscription Checkbox */}
                <div className="space-y-2">
                  <label className="flex items-start gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      name="emailSubscription"
                      checked={formData.emailSubscription || false}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-blue-600 border-2 rounded mt-0.5 flex-shrink-0"
                    />
                    <span className="text-sm text-gray-700 leading-tight">
                      I would like to receive latest offers and blog posts on my email
                    </span>
                  </label>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    aria-label="Send Message"
                    className="bg-[rgb(140,46,71)] font-light text-white hover:bg-transparent hover:text-[rgb(140,46,71)] py-3 sm:py-4 lg:py-5 px-4 sm:px-6 lg:px-8 w-full text-sm sm:text-base lg:text-lg transition-all duration-300 ease-in transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none border-2 border-transparent cursor-pointer hover:border-[rgb(140,46,71)]"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2 justify-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        <span>Sending...</span>
                      </div>
                    ) : (
                      "Send Message"
                    )}
                  </Button>
                </div>
              </form>
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