import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight, MapPin, ShieldCheck } from 'lucide-react';
import AltafLogo from '@/components/layout/AltafLogo';
import RegistrationPreviewForm from '@/components/lead/RegistrationPreviewForm';

/**
 * Campaign landing page. Deliberately a preview until Fortify is connected.
 * Keep it out of search results while it is not accepting real enquiries.
 */
export const metadata: Metadata = {
  title: 'Register Your Interest — The Residences',
  description:
    'Register your interest in The Residences by Altaf Developments in Faisal Hills, Islamabad.',
  robots: { index: false, follow: false },
};

export default function RegisterLandingPage() {
  return (
    <main className="min-h-screen bg-[#faf8f6] text-[#302a2b]">
      <div className="mx-auto grid min-h-screen max-w-[1800px] lg:grid-cols-[minmax(0,0.94fr)_minmax(0,1.06fr)]">
        {/* Brand / campaign panel: the photograph is from the existing website. */}
        <section className="relative isolate flex min-h-[420px] flex-col overflow-hidden bg-[#322229] text-white sm:min-h-[480px] lg:sticky lg:top-0 lg:h-screen lg:min-h-[690px]">
          <Image
            src="/hero/blogs-hero-residences-elevation.png"
            alt="Architectural rendering of The Residences by Altaf Developments"
            fill
            priority
            sizes="(max-width: 1023px) 100vw, 48vw"
            className="-z-20 object-cover object-center"
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#22171d]/75 via-[#291b23]/25 to-[#190f16]/90" />
          <div className="flex items-center justify-between gap-4 px-6 pt-7 sm:px-10 sm:pt-9 lg:px-12">
            <Link href="/" className="inline-flex items-center" aria-label="Altaf Developments home">
              <AltafLogo className="h-auto w-40 text-white sm:w-48" />
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full border border-white/40 px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              <ArrowLeft className="size-3.5" /> Website
            </Link>
          </div>

          <div className="mt-auto max-w-2xl px-6 pb-12 pt-24 sm:px-10 sm:pb-14 lg:px-12 lg:pb-20">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] backdrop-blur-sm">
              <MapPin className="size-3.5" aria-hidden="true" /> Faisal Hills, Islamabad
            </div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.32em] text-white/80 sm:text-sm">The Residences</p>
            <h1 className="max-w-[570px] font-[family-name:var(--font-optima,Georgia)] text-[clamp(2.7rem,5vw,5.5rem)] leading-[1.06] tracking-[-0.025em] sm:leading-[1.04]" style={{ fontFamily: 'Optima, Georgia, serif' }}>
              Your next chapter starts here.
            </h1>
            <p className="mt-5 max-w-[480px] text-sm leading-7 text-white/85 sm:text-base">
              Discover thoughtfully designed apartment living. Tell us what you&apos;re looking for and we&apos;ll help you explore the possibilities.
            </p>
            <div className="mt-8 h-[2px] w-14 bg-[#e0b2b9]" />
            <div className="mt-5 flex items-center gap-2 text-xs tracking-wide text-white/75">
              <ArrowUpRight className="size-4" aria-hidden="true" /> An address to be proud of
            </div>
          </div>
        </section>

        {/* Deliberately no global website header/footer or opening animation: a focused ad destination. */}
        <section className="flex items-center justify-center px-5 py-11 sm:px-10 sm:py-16 lg:px-12 xl:px-20">
          <div className="w-full max-w-[630px]">
            <div className="mb-7 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#8c2e47]">
              <span className="h-[1px] w-8 bg-[#8c2e47]" /> The Residences
            </div>
            <h2 className="max-w-[550px] text-[clamp(2rem,3.4vw,3.5rem)] leading-[1.14] tracking-[-0.04em] text-[#3f2730]" style={{ fontFamily: 'Optima, Georgia, serif' }}>
              Register your interest
            </h2>
            <p className="mt-4 max-w-lg text-sm leading-7 text-[#6c6163]">
              Share your preferences below. Our sales team will be ready to guide you through the apartment options and payment plans when registration opens.
            </p>
            <div className="mt-7 rounded-xl border border-[#e8d4d7] bg-[#fff6f7] px-4 py-3 text-sm leading-6 text-[#793249]" role="note">
              <strong>Form preview only.</strong> Fortify CRM is not connected yet. This page does not send or save any information, and no Meta Lead conversion is fired.
            </div>

            <RegistrationPreviewForm />

            <div className="mt-8 flex items-start gap-3 border-t border-[#e9e1e1] pt-6 text-xs leading-6 text-[#7c7072]">
              <ShieldCheck className="mt-1 size-5 shrink-0 text-[#8c2e47]" aria-hidden="true" />
              <p>When the live form is connected, enquiries will be handled according to Altaf Developments&apos; privacy practices. This preview does not transmit your answers.</p>
            </div>
            <div className="mt-8 flex flex-wrap items-center justify-between gap-3 text-xs text-[#8c8384]">
              <span>© {new Date().getFullYear()} Altaf Developments</span>
              <Link href="/" className="underline underline-offset-4 transition-colors hover:text-[#8c2e47]">Return to main website</Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
