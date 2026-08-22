"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { MessageCircle, X, Send, ChevronRight, Building2 } from "lucide-react";
import { trackEvent } from "@/hooks/useGoogleAnalytics";
import { trackFbEvent } from "@/hooks/useFacebookPixel";

const BRAND = "rgb(140,46,71)";

type Step =
  | "welcome"
  | "name"
  | "email"
  | "phone"
  | "inquiry"
  | "contact-preference"
  | "submitting"
  | "complete";

interface ChatMessage {
  id: string;
  role: "bot" | "user";
  text: string;
}

interface FormState {
  name: string;
  email: string;
  phone: string;
  countryCode: string;
  message: string;
  preferredContact: string;
}

const COUNTRIES = [
  { code: "+92", flag: "🇵🇰" },
  { code: "+971", flag: "🇦🇪" },
  { code: "+1", flag: "🇺🇸" },
  { code: "+966", flag: "🇸🇦" },
  { code: "+44", flag: "🇬🇧" },
  { code: "+968", flag: "🇴🇲" },
  { code: "+86", flag: "🇨🇳" },
  { code: "+974", flag: "🇶🇦" },
];

const CONTACT_OPTIONS = [
  { value: "whatsapp", label: "WhatsApp" },
  { value: "call", label: "Phone Call" },
  { value: "email", label: "Email" },
];

const STEP_ORDER: Step[] = [
  "welcome",
  "name",
  "email",
  "phone",
  "inquiry",
  "contact-preference",
];

function getBotPrompt(step: Step, name?: string): string {
  switch (step) {
    case "welcome":
      return "Welcome to Altaf Developments. I will connect you with one of our property consultants for luxury residences in Faisal Hills, Islamabad.";
    case "name":
      return "To begin, may I have your full name?";
    case "email":
      return `Thank you, ${name}. What is the best email address to reach you?`;
    case "phone":
      return "Please share your contact number. A member of our sales team will follow up personally.";
    case "inquiry":
      return "What would you like to know about? You may ask about availability, pricing, payment plans, or scheduling a site visit.";
    case "contact-preference":
      return "How would you prefer our consultant to contact you?";
    default:
      return "";
  }
}

export default function LeadChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<Step>("welcome");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    countryCode: "+92",
    message: "",
    preferredContact: "whatsapp",
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, step, scrollToBottom]);

  useEffect(() => {
    if (isOpen && step !== "submitting" && step !== "complete") {
      const timer = setTimeout(() => inputRef.current?.focus(), 150);
      return () => clearTimeout(timer);
    }
  }, [isOpen, step]);

  const addMessage = (role: "bot" | "user", text: string) => {
    setMessages((prev) => [
      ...prev,
      { id: `${Date.now()}-${Math.random()}`, role, text },
    ]);
  };

  const openChat = () => {
    setIsOpen(true);
    if (messages.length === 0) {
      addMessage("bot", getBotPrompt("welcome"));
    }
  };

  const closeChat = () => {
    setIsOpen(false);
    setError("");
  };

  const resetChat = () => {
    setStep("welcome");
    setMessages([]);
    setInputValue("");
    setError("");
    setForm({
      name: "",
      email: "",
      phone: "",
      countryCode: "+92",
      message: "",
      preferredContact: "whatsapp",
    });
    addMessage("bot", getBotPrompt("welcome"));
  };

  const advanceToStep = (nextStep: Step, nameOverride?: string) => {
    setStep(nextStep);
    const prompt = getBotPrompt(nextStep, nameOverride ?? form.name);
    if (prompt) addMessage("bot", prompt);
  };

  const validateCurrentStep = (): boolean => {
    setError("");

    if (step === "name") {
      if (!inputValue.trim()) {
        setError("Please enter your full name.");
        return false;
      }
      if (inputValue.trim().length < 2) {
        setError("Please enter a valid name.");
        return false;
      }
    }

    if (step === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(inputValue.trim())) {
        setError("Please enter a valid email address.");
        return false;
      }
    }

    if (step === "phone") {
      const phoneRegex = /^[0-9+\-\s()]{7,20}$/;
      if (!phoneRegex.test(inputValue.trim())) {
        setError("Please enter a valid phone number.");
        return false;
      }
    }

    if (step === "inquiry") {
      if (!inputValue.trim() || inputValue.trim().length < 5) {
        setError("Please share a brief inquiry (at least 5 characters).");
        return false;
      }
    }

    return true;
  };

  const submitLead = async (updatedForm: FormState) => {
    setStep("submitting");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...updatedForm,
          emailSubscription: false,
        }),
      });

      const data = await response.json();

      if (data.success) {
        trackEvent("generate_lead", {
          category: "conversion",
          label: "chatbot_lead_success",
          value: 5000,
          currency: "PKR",
          country_code: updatedForm.countryCode,
          preferred_contact: updatedForm.preferredContact,
          lead_source: "website_chatbot",
          page_url:
            typeof window !== "undefined" ? window.location.pathname : "",
        });

        trackFbEvent("Lead", {
          content_name: "chatbot_widget",
          value: 5000,
          currency: "PKR",
        });

        setStep("complete");
        addMessage(
          "bot",
          "Thank you for your interest. A luxury property consultant from Altaf Developments will contact you within 24 hours."
        );
      } else {
        setStep("contact-preference");
        setError(
          data.error || "Something went wrong. Please try again."
        );
      }
    } catch {
      setStep("contact-preference");
      setError("Network error. Please check your connection and try again.");
    }
  };

  const handleContinue = () => {
    if (step === "welcome") {
      advanceToStep("name");
      return;
    }

    if (!validateCurrentStep()) return;

    const currentIndex = STEP_ORDER.indexOf(step);
    const nextStep = STEP_ORDER[currentIndex + 1];

    if (step === "name") {
      const name = inputValue.trim();
      setForm((prev) => ({ ...prev, name }));
      addMessage("user", name);
      setInputValue("");
      advanceToStep("email", name);
      return;
    }

    if (step === "email") {
      setForm((prev) => ({ ...prev, email: inputValue.trim() }));
      addMessage("user", inputValue.trim());
      setInputValue("");
      advanceToStep("phone");
      return;
    }

    if (step === "phone") {
      const phoneDisplay = `${form.countryCode} ${inputValue.trim()}`;
      setForm((prev) => ({ ...prev, phone: inputValue.trim() }));
      addMessage("user", phoneDisplay);
      setInputValue("");
      advanceToStep("inquiry");
      return;
    }

    if (step === "inquiry") {
      setForm((prev) => ({ ...prev, message: inputValue.trim() }));
      addMessage("user", inputValue.trim());
      setInputValue("");
      advanceToStep("contact-preference");
      return;
    }

    if (step === "contact-preference" && nextStep) {
      // handled by contact option buttons
    }
  };

  const handleContactSelect = (value: string, label: string) => {
    const updatedForm = { ...form, preferredContact: value };
    setForm(updatedForm);
    addMessage("user", label);
    submitLead(updatedForm);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey && step !== "inquiry") {
      e.preventDefault();
      handleContinue();
    }
  };

  const showInput =
    step === "name" ||
    step === "email" ||
    step === "phone" ||
    step === "inquiry";

  return (
    <div className="fixed bottom-5 right-3 z-[60] flex flex-col items-end gap-3">
      {/* Chat panel */}
      {isOpen && (
        <div
          className="w-[calc(100vw-2.5rem)] sm:w-[380px] h-[520px] max-h-[calc(100vh-7rem)] bg-white rounded-2xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300"
          role="dialog"
          aria-label="Property inquiry chat"
        >
          {/* Header */}
          <div
            className="px-4 py-3.5 flex items-center justify-between shrink-0"
            style={{ backgroundColor: BRAND }}
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-white font-medium text-sm leading-tight">
                  Altaf Developments
                </p>
                <p className="text-white/75 text-xs">Property Consultant</p>
              </div>
            </div>
            <button
              onClick={closeChat}
              className="text-white/80 hover:text-white transition-colors p-1 rounded-md hover:bg-white/10"
              aria-label="Close chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-gray-50/80">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "text-white rounded-br-md"
                      : "bg-white text-gray-800 shadow-sm border border-gray-100 rounded-bl-md"
                  }`}
                  style={
                    msg.role === "user" ? { backgroundColor: BRAND } : undefined
                  }
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {step === "submitting" && (
              <div className="flex justify-start">
                <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-md shadow-sm border border-gray-100 flex items-center gap-2">
                  <div
                    className="w-2 h-2 rounded-full animate-bounce"
                    style={{ backgroundColor: BRAND, animationDelay: "0ms" }}
                  />
                  <div
                    className="w-2 h-2 rounded-full animate-bounce"
                    style={{ backgroundColor: BRAND, animationDelay: "150ms" }}
                  />
                  <div
                    className="w-2 h-2 rounded-full animate-bounce"
                    style={{ backgroundColor: BRAND, animationDelay: "300ms" }}
                  />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input area */}
          <div className="shrink-0 border-t border-gray-100 bg-white p-3">
            {error && (
              <p className="text-red-600 text-xs mb-2 px-1">{error}</p>
            )}

            {step === "welcome" && (
              <button
                onClick={handleContinue}
                className="w-full flex items-center justify-center gap-2 text-white text-sm font-medium py-3 rounded-xl transition-opacity hover:opacity-90"
                style={{ backgroundColor: BRAND }}
              >
                Begin Inquiry
                <ChevronRight className="w-4 h-4" />
              </button>
            )}

            {showInput && (
              <div className="space-y-2">
                {step === "phone" && (
                  <div className="flex gap-2">
                    <select
                      value={form.countryCode}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          countryCode: e.target.value,
                        }))
                      }
                      className="px-2 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[rgb(140,46,71)] bg-white shrink-0"
                      aria-label="Country code"
                    >
                      {COUNTRIES.map((c) => (
                        <option key={c.code} value={c.code}>
                          {c.flag} {c.code}
                        </option>
                      ))}
                    </select>
                    <input
                      ref={inputRef as React.RefObject<HTMLInputElement>}
                      type="tel"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Phone number"
                      className="flex-1 px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[rgb(140,46,71)]"
                    />
                  </div>
                )}

                {step === "inquiry" ? (
                  <textarea
                    ref={inputRef as React.RefObject<HTMLTextAreaElement>}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="e.g. I am interested in a 2-bedroom apartment..."
                    rows={3}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[rgb(140,46,71)] resize-none"
                  />
                ) : (
                  step !== "phone" && (
                    <input
                      ref={inputRef as React.RefObject<HTMLInputElement>}
                      type={step === "email" ? "email" : "text"}
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder={
                        step === "name"
                          ? "Full name"
                          : step === "email"
                            ? "Email address"
                            : ""
                      }
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[rgb(140,46,71)]"
                    />
                  )
                )}

                <button
                  onClick={handleContinue}
                  className="w-full flex items-center justify-center gap-2 text-white text-sm font-medium py-2.5 rounded-xl transition-opacity hover:opacity-90"
                  style={{ backgroundColor: BRAND }}
                >
                  Continue
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {step === "contact-preference" && (
              <div className="grid grid-cols-1 gap-2">
                {CONTACT_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    onClick={() =>
                      handleContactSelect(option.value, option.label)
                    }
                    className="w-full text-sm py-2.5 px-4 rounded-xl border-2 transition-all hover:text-white"
                    style={{
                      borderColor: BRAND,
                      color: BRAND,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = BRAND;
                      e.currentTarget.style.color = "white";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent";
                      e.currentTarget.style.color = BRAND;
                    }}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}

            {step === "complete" && (
              <button
                onClick={resetChat}
                className="w-full text-sm py-2.5 rounded-xl border-2 transition-colors hover:text-white font-medium cursor-pointer"
                style={{ borderColor: BRAND, color: BRAND }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = BRAND;
                  e.currentTarget.style.color = "white";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = BRAND;
                }}
              >
                Start New Inquiry
              </button>
            )}
          </div>
        </div>
      )}

      {/* Toggle button */}
      {!isOpen && (
        <button
          onClick={openChat}
          className="group flex items-center gap-2.5 text-white pl-4 pr-5 py-3.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          style={{ backgroundColor: BRAND }}
          aria-label="Open property inquiry chat"
        >
          <MessageCircle className="w-5 h-5" />
          <span className="text-sm font-medium hidden sm:inline cursor-pointer">
            Speak with Us
          </span>
        </button>
      )}
    </div>
  );
}
