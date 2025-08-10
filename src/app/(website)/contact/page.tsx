// app/contact/page.tsx
import ContactForm from "@/components/sections/contact/ContactForm";
import StructuredData from "@/components/seo/StructuredData";

export default function ContactPage() {
  return (
    <>
      {/* Structured data for contact page */}
      <StructuredData pageType="contact" />
      
      <div className="min-h-1/2">
        {/* Contact Form Section */}
        <div className="w-full">
          <ContactForm />
        </div>
        
        {/* Map Section */}
        <div className="w-full px-4 sm:px-6 lg:px-8 py-16">
          <div className="w-full">
            <div className="mb-12 text-center">
              <h2 className="text-2xl  md:text-3xl lg:text-4xl xl:text-5xl mb-8 bg-gradient-to-r from-[rgb(140,46,71)] to-[rgb(120,40,65)] bg-clip-text text-transparent">
                Explore Our HEAD OFFICE
              </h2>
              
              {/* Responsive iframe container with reduced height */}
              <div className="w-full h-64 sm:h-80 lg:h-96 lg:px-16 mx-auto mt-12">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6730.11321233954!2d72.77498645385508!3d33.710925085000895!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38dfa10bb0202d23%3A0x8c4cc62d68970a6f!2sFaisal%20Hills%20B%20Block!5e0!3m2!1sen!2s!4v1752037965832!5m2!1sen!2s"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}