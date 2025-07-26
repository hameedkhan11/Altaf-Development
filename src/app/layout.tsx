import React from "react";
// import AnimationProvider from "@/components/ui/animation-provider";
import "./globals.css";
import { Poppins } from "next/font/google";
import { Metadata } from "next";
import LenisProvider from "@/hooks/lenis";
import WhatsAppButton from "@/components/whatsapp/Whatsapp";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),
  title: {
    default: "Altaf Development",
    template: "%s | Altaf Development",
  },
  description: "Premium property listings and real estate services in Pakistan",
  keywords: [
    "real estate",
    "property",
    "development",
    "Pakistan",
    "premium properties",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
    siteName: "Altaf Development",
    title: "Altaf Development - Premium Real Estate",
    description:
      "Premium property listings and real estate services in Pakistan",
  },
  twitter: {
    card: "summary_large_image",
    site: "@altaf_development", // Update with actual Twitter handle
    creator: "@altaf_development",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} antialiased font-light`}>
        <LenisProvider>{children}</LenisProvider>
        <WhatsAppButton />
      </body>
    </html>
  );
}
