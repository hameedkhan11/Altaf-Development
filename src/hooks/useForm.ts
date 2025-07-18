"use client";
import React, { useState } from "react";

// Types
interface FormData {
  name: string;
  email: string;
  phone: string;
  countryCode: string;
  message: string;
  preferredContact: string;
}

interface Country {
  code: string;
  name: string;
  flag: string;
}

interface ApiResponse {
  success: boolean;
  message?: string;
  error?: string;
  code?: string;
  messageId?: string;
}

// Custom Hook for Contact Form Logic
export const useContactForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    countryCode: "+92", // Default to Pakistan
    message: "",
    preferredContact: "whatsapp", // Default to WhatsApp
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const countries: Country[] = [
    { code: "+92", name: "Pakistan", flag: "🇵🇰" },
    { code: "+971", name: "UAE", flag: "🇦🇪" },
    { code: "+1", name: "USA", flag: "🇺🇸" },
    { code: "+966", name: "Saudi Arabia", flag: "🇸🇦" },
    { code: "+44", name: "UK", flag: "🇬🇧" },
    { code: "+91", name: "India", flag: "🇮🇳" },
    { code: "+86", name: "China", flag: "🇨🇳" },
    { code: "+81", name: "Japan", flag: "🇯🇵" },
    { code: "+49", name: "Germany", flag: "🇩🇪" },
    { code: "+33", name: "France", flag: "🇫🇷" },
  ];

  const contactModes = [
    { value: "whatsapp", label: "WhatsApp", icon: "📱" },
    { value: "call", label: "Call", icon: "📞" },
    { value: "email", label: "Email", icon: "📧" },
  ];

  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear status when user starts typing
    if (submitStatus.type) {
      setSubmitStatus({ type: null, message: '' });
    }
  };

  const validateForm = (): boolean => {
    if (!formData.name.trim()) {
      setSubmitStatus({ type: 'error', message: 'Please enter your name.' });
      return false;
    }

    if (!formData.email.trim()) {
      setSubmitStatus({ type: 'error', message: 'Please enter your email address.' });
      return false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setSubmitStatus({ type: 'error', message: 'Please enter a valid email address.' });
      return false;
    }

    if (!formData.phone.trim()) {
      setSubmitStatus({ type: 'error', message: 'Please enter your phone number.' });
      return false;
    }

    // Phone validation
    const phoneRegex = /^[0-9+\-\s()]{7,20}$/;
    if (!phoneRegex.test(formData.phone)) {
      setSubmitStatus({ type: 'error', message: 'Please enter a valid phone number.' });
      return false;
    }

    if (!formData.message.trim()) {
      setSubmitStatus({ type: 'error', message: 'Please enter your message.' });
      return false;
    }

    if (formData.message.trim().length < 10) {
      setSubmitStatus({ type: 'error', message: 'Please provide a more detailed message (at least 10 characters).' });
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data: ApiResponse = await response.json();

      if (data.success) {
        setSubmitStatus({
          type: 'success',
          message: data.message || 'Thank you for your message! Our luxury property consultant will contact you within 24 hours.',
        });

        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          countryCode: "+92",
          message: "",
          preferredContact: "whatsapp",
        });
      } else {
        // Handle different error codes
        let errorMessage = data.error || 'Something went wrong. Please try again.';
        
        switch (data.code) {
          case 'RATE_LIMIT_EXCEEDED':
            errorMessage = 'Too many requests. Please wait a few minutes before trying again.';
            break;
          case 'VALIDATION_ERROR':
            errorMessage = 'Please check all required fields and try again.';
            break;
          case 'EMAIL_AUTH_ERROR':
          case 'EMAIL_CONNECTION_ERROR':
            errorMessage = 'Email service is temporarily unavailable. Please try again later.';
            break;
          case 'CONFIG_ERROR':
            errorMessage = 'Service is temporarily unavailable. Please try again later.';
            break;
          default:
            errorMessage = data.error || 'Something went wrong. Please try again.';
        }

        setSubmitStatus({
          type: 'error',
          message: errorMessage,
        });
      }
    } catch (error) {
      console.error('Form submission error:', error);
      
      if (error instanceof TypeError && error.message.includes('fetch')) {
        setSubmitStatus({
          type: 'error',
          message: 'Network error. Please check your connection and try again.',
        });
      } else {
        setSubmitStatus({
          type: 'error',
          message: 'Something went wrong. Please try again later.',
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const clearStatus = () => {
    setSubmitStatus({ type: null, message: '' });
  };

  return {
    formData,
    isSubmitting,
    submitStatus,
    countries,
    contactModes,
    handleInputChange,
    handleSubmit,
    clearStatus,
  };
};