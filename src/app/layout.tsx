// app/layout.tsx
import "./globals.css";
import { Poppins } from "next/font/google";
import { Metadata } from "next";
import LenisProvider from "@/hooks/lenis";
import WhatsAppButton from "@/components/whatsapp/Whatsapp";
import GoogleAnalytics from "@/components/layout/GoogleAnalytics";
import FAQSchema from "@/components/seo/FAQSchema";
import AnalyticsTracker from "@/components/seo/analytics-provider";
import FacebookPixel from "@/components/seo/FacebookPixel";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://altafdevelopments.com"
  ),
  title: {
    default: "Altaf Developments - Luxury Apartments in Faisal Hills Islamabad",
    template: "%s | Altaf Developments",
  },
  description:
    "Altaf Developments builds with purpose—creating luxury one and two bedroom apartments in Faisal Hills, Islamabad. We specialize in exceptional spaces that meet real needs, uplift communities, and inspire lasting change.",
  keywords: [
    "Altaf Developments",
    "luxury apartments",
    "Faisal Hills",
    "Islamabad",
    "one bedroom apartments",
    "two bedroom apartments",
    "real estate",
    "property development",
    "premium residential",
    "Pakistan property",
  ],
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://altafdevelopments.com",
    siteName: "Altaf Developments",
    title: "Altaf Developments - Luxury Apartments in Faisal Hills Islamabad",
    description:
      "Premium one and two bedroom apartments in Faisal Hills, Islamabad. Exceptional luxury living spaces by Altaf Developments with modern amenities and contemporary design.",
    images: [
      {
        url: "https://res.cloudinary.com/dqv6swyul/image/upload/f_auto,q_auto,w_1200,h_800/v1750140482/Booking1_rg1bhs.jpg",
        width: 1200,
        height: 800,
        alt: "Altaf Developments office exterior building",
      },
      {
        url: "https://res.cloudinary.com/dqv6swyul/image/upload/f_auto,q_auto,w_1200,h_800/v1753876189/Altaf_website_image_landscape_2_fxo3d3.jpg",
        width: 1200,
        height: 800,
        alt: "Altaf Developments company owner portrait",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@Altafdevelpmnts",
    creator: "@Altafdevelpmnts",
    title: "Altaf Developments - Luxury Apartments in Faisal Hills Islamabad",
    description:
      "Premium one and two bedroom apartments in Faisal Hills, Islamabad. Exceptional luxury living spaces with modern amenities.",
    images: [
      {
        url: "https://res.cloudinary.com/dqv6swyul/image/upload/f_auto,q_auto,w_1000,h_1000/v1753816245/FINAL_IMAGE_FOR_WEBSITE_SQUARE_1X1_ji4fnn.jpg",
        width: 1000,
        height: 1000,
        alt: "Altaf Developments owner profile photo",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "Real Estate Development",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <GoogleAnalytics />
        <FacebookPixel />
        <FAQSchema />
      </head>
      <body className={`${poppins.variable} antialiased font-light`}>
        <AnalyticsTracker />
        <LenisProvider />
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}
