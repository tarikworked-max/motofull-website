import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { StorageNotice } from "@/components/storage-notice";
import "./globals.css";

const inter = Inter({ subsets: ["latin", "latin-ext"], variable: "--font-inter" });
const grotesk = Space_Grotesk({ subsets: ["latin", "latin-ext"], variable: "--font-grotesk" });

const siteUrl = "https://motofull.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "MotoFull — Workshop Management for Motorcycle Service",
    template: "%s | MotoFull",
  },
  description:
    "MotoFull is workshop management software for motorcycle service businesses. Customers, motorcycle history, work orders, inventory, maintenance reminders and AI-assisted diagnosis in one panel. Free 7-day demo.",
  keywords: [
    "motorcycle workshop software",
    "motorcycle service management",
    "workshop management software",
    "work order software",
    "motorcycle garage software",
    "MotoFull",
  ],
  openGraph: {
    type: "website",
    locale: "en",
    url: siteUrl,
    siteName: "MotoFull",
    title: "MotoFull — Workshop Management for Motorcycle Service",
    description:
      "Customers, motorcycle history, work orders, inventory and AI-assisted diagnosis in one panel. Free 7-day demo.",
  },
  twitter: {
    card: "summary_large_image",
    title: "MotoFull — Workshop Management for Motorcycle Service",
    description:
      "Workshop management software for motorcycle service businesses. Start a free 7-day demo.",
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "MotoFull",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description:
    "Workshop management software for motorcycle service businesses: work orders, customer management, inventory, AI-assisted diagnosis, multi-location support.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    description: "Free 7-day demo. No card required.",
  },
  publisher: {
    "@type": "Organization",
    name: "MotoFull",
    url: siteUrl,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${grotesk.variable}`}>
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <StorageNotice />
      </body>
    </html>
  );
}
