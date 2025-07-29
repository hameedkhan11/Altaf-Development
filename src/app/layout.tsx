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
    process.env.NEXT_PUBLIC_SITE_URL || "http://altafdevelopments.com"
  ),
  title: {
    default: "Altaf Developments",
    template: "%s | Altaf Developments",
  },
  description: "Premium property listings and real estate services in Pakistan",
  keywords: [
    "real estate",
    "property",
    "development",
    "Pakistan",
    "premium properties",
  ],
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_SITE_URL || "http://altafdevelopments.com",
    siteName: "Altaf Developments",
    title: "Altaf Developments - Premium Real Estate",
    description:
      "Premium property listings and real estate services in Pakistan",
  },
  twitter: {
    card: "summary_large_image",
    site: "@altaf_developments", // Update with actual Twitter handle
    creator: "@altaf_developments",
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
