import React from "react";
import { FaWhatsapp } from "react-icons/fa";

const WhatsAppButton = () => {
  const phoneNumber = "+923330777775";
  const message = "Hello! I'm interested in your properties.";
  
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed right-0.5 top-1/2 -translate-y-1/2 z-[9999] group"
      aria-label="Chat on WhatsApp"
    >
      <div className="bg-[rgb(140,46,71)] hover:bg-[rgb(146,50,76)] text-white p-3 sm:p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 relative">
        {/* WhatsApp Icon */}
        <FaWhatsapp className="w-4 h-4" />
        
        {/* Pulse animation */}
        <div className="absolute inset-0 rounded-full bg-[rgb(140,46,71)] animate-ping opacity-20"></div>
      </div>
      
      {/* Tooltip */}
      <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-[rgb(140,46,71)] text-white text-sm px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
        Chat with us on WhatsApp
        {/* Tooltip arrow */}
        <div className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-[rgb(140,46,71)]"></div>
      </div>
    </a>
  );
};

export default WhatsAppButton;