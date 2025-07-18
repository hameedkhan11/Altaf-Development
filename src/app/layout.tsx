import { SmoothScrollProvider } from "@/hooks/lenis";
import "./globals.css";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

// Add this to your app/layout.tsx or create a new one if it doesn't exist
import { Metadata } from "next";
import AnimationProvider from "@/components/ui/animation-provider";

export const metadata: Metadata = {
  // Set the metadataBase to your production URL or localhost for development
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),
  title: {
    default: "Altaf Development",
    template: "%s | Altaf Development",
  },
  description: "Premium property listings and real estate services",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_SITE_URL || "http://localhost:3000",
    siteName: "Estate Properties",
  },
  twitter: {
    card: "summary_large_image",
    site: "@your-twitter-handle",
    creator: "@your-twitter-handle",
  },
};

// Alternative: Add this to your next.config.js if you prefer
// const nextConfig = {
//   experimental: {
//     mdxRs: true,
//   },
//   images: {
//     domains: ['your-image-domain.com'],
//   },
//   // This is one way to set metadata base but the above method is preferred
// };

// export default nextConfig;
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} antialiased font-light`}>
        <AnimationProvider>
          <SmoothScrollProvider>{children}</SmoothScrollProvider>
        </AnimationProvider>
      </body>
    </html>
  );
}
