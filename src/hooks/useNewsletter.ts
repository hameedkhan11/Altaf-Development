// hooks/useNewsletter.ts
"use client";
import { useState } from "react";
import { trackEvent } from "@/hooks/useGoogleAnalytics";

interface NewsletterResponse {
  success: boolean;
  message?: string;
  error?: string;
  code?: string;
  subscriberId?: string;
}

export const useNewsletter = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const validateEmail = (email: string): boolean => {
    if (!email.trim()) {
      setStatus({
        type: "error",
        message: "Please enter your email address.",
      });
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setStatus({
        type: "error",
        message: "Please enter a valid email address.",
      });
      return false;
    }

    return true;
  };

  const subscribe = async (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }

    if (!validateEmail(email)) {
      return;
    }

    setIsSubmitting(true);
    setStatus({ type: null, message: "" });

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data: NewsletterResponse = await response.json();

      if (data.success) {
        // Track successful newsletter subscription
        trackEvent("newsletter_signup", {
          category: "engagement",
          label: "footer_newsletter_success",
          value: 1,
          email_domain: email.split('@')[1] || "unknown",
          subscriber_id: data.subscriberId || "unknown",
          page_url: typeof window !== 'undefined' ? window.location.pathname : "",
          source: "website_footer"
        });

        // Track as a micro-conversion
        trackEvent("micro_conversion", {
          category: "conversion",
          label: "newsletter_subscription",
          value: 100, // Lower value than contact form lead
          conversion_type: "newsletter_signup",
          lead_source: "footer_form"
        });

        setStatus({
          type: "success",
          message: data.message || "Thank you! You've been subscribed to our newsletter.",
        });

        // Reset email after successful subscription
        setEmail("");
      } else {
        // Handle different error codes from MailerLite
        let errorMessage = data.error || "Something went wrong. Please try again.";

        switch (data.code) {
          case "ALREADY_SUBSCRIBED":
            errorMessage = "You're already subscribed to our newsletter!";
            break;
          case "INVALID_EMAIL":
            errorMessage = "Please enter a valid email address.";
            break;
          case "RATE_LIMIT_EXCEEDED":
            errorMessage = "Too many requests. Please wait a few minutes before trying again.";
            break;
          case "MAILERLITE_ERROR":
            errorMessage = "Newsletter service is temporarily unavailable. Please try again later.";
            break;
          case "GROUP_NOT_FOUND":
            errorMessage = "Newsletter service configuration error. Please contact support.";
            break;
          default:
            errorMessage = data.error || "Something went wrong. Please try again.";
        }

        // Track newsletter subscription failure
        trackEvent("newsletter_signup_failed", {
          category: "engagement",
          label: "footer_newsletter_error",
          value: 0,
          error_code: data.code || "unknown",
          error_message: errorMessage,
          email_domain: email.split('@')[1] || "unknown",
          page_url: typeof window !== 'undefined' ? window.location.pathname : ""
        });

        setStatus({
          type: "error",
          message: errorMessage,
        });
      }
    } catch (error) {
      console.error("Newsletter subscription error:", error);

      let errorMessage = "Something went wrong. Please try again later.";
      let errorCode = "network_error";

      if (error instanceof TypeError && error.message.includes("fetch")) {
        errorMessage = "Network error. Please check your connection and try again.";
        errorCode = "fetch_error";
      }

      // Track network/unexpected errors
      trackEvent("newsletter_signup_failed", {
        category: "engagement", 
        label: "footer_newsletter_network_error",
        value: 0,
        error_code: errorCode,
        error_message: errorMessage,
        page_url: typeof window !== 'undefined' ? window.location.pathname : ""
      });

      setStatus({
        type: "error",
        message: errorMessage,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const clearStatus = () => {
    setStatus({ type: null, message: "" });
  };

  const handleEmailChange = (newEmail: string) => {
    setEmail(newEmail);
    // Clear status when user starts typing
    if (status.type) {
      clearStatus();
    }
  };

  return {
    email,
    setEmail: handleEmailChange,
    isSubmitting,
    status,
    subscribe,
    clearStatus,
  };
};