import { headers } from "next/headers";
import { marketFromCountry } from "@/lib/pricing";
import { getLivePricing } from "@/lib/livePricing";
import { DemoProvider } from "@/components/demo-modal";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Problem, Solution } from "@/components/problem-solution";
import { Features } from "@/components/features";
import { AISection, DashboardShowcase } from "@/components/showcase-ai";
import { BeforeAfter, Workflow } from "@/components/workflow-stats";
import { FAQ, Pricing, Testimonials } from "@/components/social";
import { Contact, Footer, StickyCTA } from "@/components/contact-footer";

/**
 * PAZAR SUNUCUDA COZULUR.
 *
 * Vercel her istege ziyaretcinin ulkesini `x-vercel-ip-country` olarak
 * ekler. Fiyati tarayicidaki dil/saat dilimine gore secseydik kullanici
 * kendi fiyatini secebilirdi; bu degerler serbestce degistirilebilir.
 *
 * Baslik yoksa marketFromCountry Avrupa'ya (dusuk fiyata) duser.
 */
export default async function Home() {
  const country = (await headers()).get("x-vercel-ip-country");
  const market = marketFromCountry(country);

  /* Fiyat SUNUCUDAN, istek aninda okunur — panelden yapilan degisiklik
     bu siteyi yeniden dagitmadan yayina girsin diye. Cagri basarisiz
     olursa getLivePricing koddaki tabloya duser; sayfa hicbir durumda
     fiyatsiz kalmaz ve bu cagri icin beklemez (3 sn zaman asimi). */
  const live = await getLivePricing(market, country);

  return (
    <DemoProvider>
      <Navbar />
      <main>
        <Hero />
        <Problem />
        <Solution />
        <Features />
        <DashboardShowcase />
        <AISection />
        <Workflow />
        <BeforeAfter />
        <Testimonials />
        <Pricing market={market} live={live} />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <StickyCTA />
    </DemoProvider>
  );
}
