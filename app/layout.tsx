import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin", "latin-ext"], variable: "--font-inter" });
const grotesk = Space_Grotesk({ subsets: ["latin", "latin-ext"], variable: "--font-grotesk" });

const siteUrl = "https://motofull.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "MotoFull — Motosiklet Servisleri İçin İşletim Sistemi",
    template: "%s | MotoFull",
  },
  description:
    "MotoFull, motosiklet servis merkezleri için geliştirilmiş bulut tabanlı yönetim platformu. İş emirleri, müşteri yönetimi, stok, AI teşhis ve çok şubeli yapı — hepsi tek panelde.",
  keywords: [
    "motosiklet servis programı",
    "motosiklet servis yönetimi",
    "servis takip yazılımı",
    "iş emri yönetimi",
    "motosiklet atölye yazılımı",
    "MotoFull",
  ],
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: siteUrl,
    siteName: "MotoFull",
    title: "MotoFull — Motosiklet Servisleri İçin İşletim Sistemi",
    description:
      "Kağıt defterleri kapatın. İş emirleri, müşteriler, stok, AI teşhis ve raporlar — servisinizin tamamı tek panelde.",
  },
  twitter: {
    card: "summary_large_image",
    title: "MotoFull — Motosiklet Servisleri İçin İşletim Sistemi",
    description:
      "Motosiklet servis merkezleri için bulut tabanlı yönetim platformu. Demo talep edin.",
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
    "Motosiklet servis merkezleri için bulut tabanlı yönetim platformu: iş emirleri, müşteri yönetimi, stok takibi, AI teşhis, çok şubeli yapı.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "TRY",
    description: "Demo talebi ücretsizdir.",
  },
  publisher: {
    "@type": "Organization",
    name: "MotoFull",
    url: siteUrl,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className={`${inter.variable} ${grotesk.variable}`}>
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
