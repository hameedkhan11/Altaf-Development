'use client';

import { useState, type FormEvent } from 'react';
import { ArrowRight, CheckCircle2, RotateCcw } from 'lucide-react';

type FormData = {
  apartment: string;
  paymentPlan: string;
  purchaseTiming: string;
  contactMethod: string;
  fullName: string;
  phone: string;
  email: string;
  city: string;
  consent: boolean;
};

const initialForm: FormData = {
  apartment: '',
  paymentPlan: '',
  purchaseTiming: '',
  contactMethod: 'WhatsApp',
  fullName: '',
  phone: '',
  email: '',
  city: '',
  consent: false,
};

const apartments = [
  { value: 'Studio apartment — PKR 10M to 13M', label: 'Studio apartment', sublabel: 'PKR 10–13 million' },
  { value: '1 Bedroom apartment', label: '1 Bedroom', sublabel: 'Ask for pricing' },
  { value: '2 Bedroom apartment', label: '2 Bedroom', sublabel: 'Ask for pricing' },
];

const fieldClass =
  'mt-2 block min-h-12 w-full rounded-xl border border-[#e5dadd] bg-white px-4 py-3 text-sm text-[#332b2d] outline-none transition-colors placeholder:text-[#9a9194] focus:border-[#8c2e47] focus:ring-2 focus:ring-[#8c2e47]/10';
const labelClass = 'block text-sm font-medium text-[#423537]';

export default function RegistrationPreviewForm() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [previewComplete, setPreviewComplete] = useState(false);

  function update<K extends keyof FormData>(key: K, value: FormData[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function handlePreviewSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // Preview intentionally does not send a request, persist PII, or trigger fbq('track', 'Lead').
    // Later: POST to /api/leads -> Fortify confirms -> trigger an appropriately consented Lead event.
    setPreviewComplete(true);
  }

  if (previewComplete) {
    return (
      <div className="mt-9 rounded-2xl border border-[#e5dadd] bg-white px-6 py-12 text-center shadow-[0_14px_40px_rgba(77,37,48,0.05)]" role="status" aria-live="polite">
        <CheckCircle2 className="mx-auto size-12 text-[#8c2e47]" aria-hidden="true" />
        <h3 className="mt-5 text-2xl text-[#422b32]" style={{ fontFamily: 'Optima, Georgia, serif' }}>Preview completed</h3>
        <p className="mx-auto mt-3 max-w-sm text-sm leading-7 text-[#6c6163]">
          Your form is ready for a design review. <strong>No information was submitted, saved, or sent to Fortify or Meta.</strong>
        </p>
        <button
          type="button"
          onClick={() => { setPreviewComplete(false); setForm(initialForm); }}
          className="mt-7 inline-flex items-center justify-center gap-2 rounded-full bg-[#8c2e47] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#74263c] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8c2e47]"
        >
          <RotateCcw className="size-4" /> Review the form again
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handlePreviewSubmit} className="mt-8 space-y-7" aria-label="Property interest registration preview">
      <fieldset>
        <legend className={labelClass}>Which type of apartment are you interested in? <span className="text-[#8c2e47]">*</span></legend>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          {apartments.map((option) => (
            <label
              key={option.value}
              className={`relative flex min-h-[88px] cursor-pointer flex-col justify-between rounded-xl border p-3.5 transition-all ${
                form.apartment === option.value
                  ? 'border-[#8c2e47] bg-[#fff5f7] ring-1 ring-[#8c2e47]'
                  : 'border-[#e5dadd] bg-white hover:border-[#b78090]'
              }`}
            >
              <input
                type="radio"
                name="apartment"
                value={option.value}
                checked={form.apartment === option.value}
                onChange={() => update('apartment', option.value)}
                required
                className="absolute right-3 top-3 size-4 accent-[#8c2e47]"
              />
              <span className="pr-5 text-sm font-semibold text-[#443236]">{option.label}</span>
              <span className="mt-2 text-[11px] leading-4 text-[#827679]">{option.sublabel}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="ad-payment" className={labelClass}>What is your preferred payment plan? <span className="text-[#8c2e47]">*</span></label>
          <select id="ad-payment" name="paymentPlan" required value={form.paymentPlan} onChange={(e) => update('paymentPlan', e.target.value)} className={fieldClass}>
            <option value="" disabled>Select a payment option</option>
            <option value="25% Downpayment with 4 Years Installments">25% down payment · 4-year installments</option>
            <option value="Full payment">Full payment</option>
            <option value="Discuss payment options">I&apos;d like to discuss payment options</option>
          </select>
        </div>
        <div>
          <label htmlFor="ad-timing" className={labelClass}>When are you planning to make a purchase? <span className="text-[#8c2e47]">*</span></label>
          <select id="ad-timing" name="purchaseTiming" required value={form.purchaseTiming} onChange={(e) => update('purchaseTiming', e.target.value)} className={fieldClass}>
            <option value="" disabled>Select a timeframe</option>
            <option value="Immediately">Immediately</option>
            <option value="Within 1–3 months">Within 1–3 months</option>
            <option value="Within 3–6 months">Within 3–6 months</option>
            <option value="Just exploring">Just exploring</option>
          </select>
        </div>
      </div>

      <fieldset>
        <legend className={labelClass}>How would you like us to contact you? <span className="text-[#8c2e47]">*</span></legend>
        <div className="mt-3 flex flex-wrap gap-3">
          {['WhatsApp', 'Phone Call', 'Email'].map((method) => (
            <label
              key={method}
              className={`cursor-pointer rounded-full border px-5 py-2.5 text-sm font-medium transition-colors ${
                form.contactMethod === method
                  ? 'border-[#8c2e47] bg-[#8c2e47] text-white'
                  : 'border-[#e5dadd] bg-white text-[#54484a] hover:border-[#8c2e47]'
              }`}
            >
              <input
                type="radio"
                name="contactMethod"
                value={method}
                checked={form.contactMethod === method}
                onChange={() => update('contactMethod', method)}
                className="sr-only"
              />
              {method}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="border-t border-[#e9e1e1] pt-6">
        <p className="mb-5 text-xs font-semibold uppercase tracking-[0.21em] text-[#8c2e47]">Your contact details</p>
        <div className="grid gap-x-5 gap-y-5 sm:grid-cols-2">
          <div>
            <label htmlFor="ad-full-name" className={labelClass}>Full name <span className="text-[#8c2e47]">*</span></label>
            <input id="ad-full-name" name="fullName" type="text" autoComplete="name" required maxLength={100} placeholder="Your full name" value={form.fullName} onChange={(e) => update('fullName', e.target.value)} className={fieldClass} />
          </div>
          <div>
            <label htmlFor="ad-phone" className={labelClass}>Phone / WhatsApp <span className="text-[#8c2e47]">*</span></label>
            <input id="ad-phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" required minLength={7} maxLength={22} placeholder="+92 300 1234567" value={form.phone} onChange={(e) => update('phone', e.target.value)} className={fieldClass} />
          </div>
          <div>
            <label htmlFor="ad-email" className={labelClass}>Email address</label>
            <input id="ad-email" name="email" type="email" autoComplete="email" maxLength={254} placeholder="you@example.com" value={form.email} onChange={(e) => update('email', e.target.value)} className={fieldClass} />
          </div>
          <div>
            <label htmlFor="ad-city" className={labelClass}>City <span className="text-[#8c2e47]">*</span></label>
            <input id="ad-city" name="city" type="text" autoComplete="address-level2" required maxLength={100} placeholder="Your city" value={form.city} onChange={(e) => update('city', e.target.value)} className={fieldClass} />
          </div>
        </div>
      </div>

      <label className="flex cursor-pointer items-start gap-3 text-xs leading-6 text-[#6f6567]">
        <input type="checkbox" name="consent" required checked={form.consent} onChange={(e) => update('consent', e.target.checked)} className="mt-1.5 size-4 shrink-0 accent-[#8c2e47]" />
        <span>I agree to be contacted by Altaf Developments about this enquiry through my selected contact method. <span className="text-[#8c2e47]">*</span></span>
      </label>

      <button
        type="submit"
        className="group flex min-h-14 w-full items-center justify-center gap-3 rounded-full bg-[#8c2e47] px-6 py-4 text-sm font-semibold tracking-wide text-white shadow-[0_8px_24px_rgba(140,46,71,0.19)] transition-all hover:bg-[#72243a] hover:shadow-[0_10px_26px_rgba(140,46,71,0.27)] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#8c2e47]"
      >
        Preview form submission <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
      </button>
      <p className="text-center text-xs leading-5 text-[#8a7b7f]">Preview only — this button does not transmit or store information.</p>
    </form>
  );
}
