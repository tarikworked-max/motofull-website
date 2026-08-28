"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Building2, ChevronDown, Rocket, Warehouse } from "lucide-react";
import { useState } from "react";
import { useDemo } from "./demo-modal";
import { Reveal, SectionHeading } from "./ui";
import { company } from "@/lib/company";
import { PLANS, TRIAL_DAYS, MARKET_CURRENCY, formatPrice, type Market } from "@/lib/pricing";
import type { LivePricing } from "@/lib/livePricing";

/* --- Testimonials --- KALDIRILDI (kalici karar)
   Burada 15 KURGUSAL musteri gorusu vardi: uydurma isimler, uydurma
   atolyeler, uydurma sehirler. Kartlarda "Demo Example" etiketi olsa
   bile bir referans duvari, ziyaretcide dolandiricilik hissi
   yaratiyordu ve kullanici bunu acikca bildirdi.
   Yerine components/trust.tsx geldi: dogrulanabilir sirket bilgisi ve
   acik bir "ne iddia ETMIYORUZ" bolumu.
   GERI EKLEMEYIN. Gercek, adiyla yayinlanmasina IZIN VERILMIS bir
   musteri gorusu geldiginde trust.tsx icine, kaynagiyla eklenir. */


/* --- Pricing ---
   Fiyatlar lib/pricing.ts'ten okunur; burada sayı yazılmaz. Aynı fiyatı
   iki yerde tutmak, birinde değiştirip diğerini unutmak demektir —
   gösterilen tutarla tahsil edilen tutarın ayrışması tüketici hukuku
   sorunudur. */
const PLAN_ICONS: Record<string, typeof Rocket> = {
  starter: Rocket,
  pro: Warehouse,
  enterprise: Building2,
};

/**
 * Fiyat bolumu.
 *
 * `market` SUNUCUDAN gelir (app/page.tsx, ziyaretcinin IP ulkesi).
 * Bilesen icinde tahmin YAPILMAZ: tarayici dili/saat dilimi kullanici
 * tarafindan degistirilebilir, yani fiyati kullanici secebilirdi.
 */
export function Pricing({ market = "EU", live }: { market?: Market; live?: LivePricing }) {
  /* Para birimi ve tutarlar SUNUCUDAN gelen canli yanittan okunur.
     `live` verilmezse (API ulasilamadi) koddaki tabloya dusulur —
     fiyatsiz bir satis sayfasi, biraz bayat fiyattan daha kotudur.

     BU YALNIZCA YEDEK YOLUN BIRIMI. Gercek etiket PAKET BASINA okunur
     (asagida `planCurrency`): sunucu bir paketin fiyatini baska bir
     birime dusurmus olabilir ve tutari ziyaretcinin pazar biriminde
     ETIKETLEMEK 99 EUR'yu "99 TL" gostermek demektir. */
  const currency = live?.currency ?? MARKET_CURRENCY[market];
  const trialDays = live?.trialDays ?? TRIAL_DAYS;
  const campaign = live?.campaign ?? null;

  const { open } = useDemo();

  return (
    <section id="fiyatlar" className="relative overflow-hidden py-24 sm:py-32">
      <div
        className="absolute left-1/2 top-1/2 h-[420px] w-[680px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/8 blur-[150px]"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          eyebrow="Plans"
          title={
            <>
              A plan for <span className="text-gradient">every workshop size</span>
            </>
          }
          subtitle={`Start with a free ${trialDays}-day demo — no card required.`}
        />

        {/* Kampanya rozeti. Sunucu kampanyayi YALNIZCA gecerliyse
            gonderir (tarih penceresi ve kapsam orada kontrol edildi),
            bu yuzden burada varlik kontrolu yeterlidir. Site Ingilizce
            oldugu icin Ingilizce metin; girilmemisse Turkcesine dusulur. */}
        {campaign && (campaign.badge.en || campaign.badge.tr) && (
          <div className="mt-8 flex justify-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-sm font-semibold text-emerald-300">
              {campaign.badge.en || campaign.badge.tr}
            </span>
          </div>
        )}

        {/* Fiyatlar ARTIK GOSTERILIYOR. Para birimi ziyaretcinin IP
            ulkesinden SUNUCUDA secilir; sayfada para birimi secici YOK —
            kullaniciya sectirmek, Amerika pazarindaki bir ziyaretcinin
            Avrupa fiyatini secmesi demekti.
            Su an yalnizca aylik tutar gosteriliyor; yillik fiyatlar
            lib/pricing.ts icinde hazir duruyor. */}

        <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {PLANS.map((p, i) => {
            const Icon = PLAN_ICONS[p.id] ?? Rocket;
            const isDemo = p.id === "demo";

            /* Canli fiyat varsa o gecerlidir; yoksa koddaki tabloya
               dusulur. `contactOnly` paketlerde tutar null kalir ve
               asagida "Contact us" gosterilir. */
            const lp = live?.byPlan[p.id];
            const staticPrice = p.price ? p.price[currency] : null;
            const monthly = lp
              ? (lp.contactOnly ? null : lp.amount)
              : (staticPrice ? staticPrice.monthly : null);
            const originalMonthly = lp ? lp.originalAmount : (staticPrice ? staticPrice.monthly : null);
            const discounted = !!(lp && lp.discounted);
            /* Tutarin KENDI birimi. Ust duzey `currency` ziyaretcinin
               pazar birimidir; sunucu o birimde fiyat bulamayip baska
               birime dusmus olabilir. */
            const planCurrency = lp ? lp.currency : currency;

            return (
              <Reveal key={p.id} delay={i * 0.08}>
                <div
                  className={`card-hover relative flex h-full flex-col rounded-3xl p-7 ${
                    p.highlight
                      ? "border border-accent/40 bg-accent/[0.07] glow-orange"
                      : "glass"
                  }`}
                >
                  {p.highlight && (
                    <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-accent px-4 py-1 text-xs font-bold text-white">
                      Most popular
                    </span>
                  )}
                  {isDemo && (
                    <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-emerald-500 px-4 py-1 text-xs font-bold text-white">
                      Free
                    </span>
                  )}

                  <span
                    className={`mb-5 flex h-12 w-12 items-center justify-center rounded-2xl ${
                      p.highlight ? "bg-accent text-white" : "bg-accent/12 text-accent"
                    }`}
                  >
                    <Icon className="h-6 w-6" />
                  </span>

                  <h3 className="font-display text-2xl font-bold text-frost">{p.name}</h3>
                  <p className="mt-1 text-sm text-mist">{p.tagline}</p>

                  {/* Fiyat alani.
                      Demo ucretsiz; Pro'da ziyaretcinin pazarindaki tutar;
                      Kurumsal'da UYDURMA rakam yerine "iletisime gecin". */}
                  <div className="mt-6 min-h-[76px]">
                    {isDemo ? (
                      <>
                        <span className="font-display text-3xl font-bold text-frost">
                          Free for {trialDays} days
                        </span>
                        <p className="mt-1.5 text-xs text-mist">No card required.</p>
                      </>
                    ) : monthly !== null ? (
                      <>
                        {/* Indirimliyse ESKI fiyat da gosterilir. Indirimi
                            yalnizca dusuk rakamla duyurmak, indirim
                            oldugunu gorunmez kilar. */}
                        {discounted && originalMonthly !== null && (
                          <span className="mr-2 font-display text-2xl font-bold text-mist line-through">
                            {formatPrice(originalMonthly, planCurrency)}
                          </span>
                        )}
                        <span className="font-display text-4xl font-bold text-frost">
                          {formatPrice(monthly, planCurrency)}
                        </span>
                        <span className="ml-1.5 text-sm text-mist">/ month</span>
                        <p className="mt-1.5 text-xs text-mist">
                          Billed monthly. Cancel anytime.
                        </p>
                      </>
                    ) : (
                      <>
                        <span className="font-display text-3xl font-bold text-frost">
                          Contact us
                        </span>
                        <p className="mt-1.5 text-xs text-mist">
                          Tell us your workshop size and we will scope it with you.
                        </p>
                      </>
                    )}
                  </div>

                  <ul className="mt-6 space-y-1.5 border-y border-white/10 py-4 text-xs text-mist">
                    <li>{p.limits.customers}</li>
                    <li>{p.limits.records}</li>
                    <li>{p.limits.ai}</li>
                    <li>{p.limits.users}</li>
                  </ul>

                  <ul className="mt-5 flex-1 space-y-3">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm text-frost">
                        <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  {isDemo ? (
                    <a
                      href={`${company.panelUrl}/demo-kayit`}
                      className="mt-8 block w-full rounded-xl bg-accent px-6 py-3.5 text-center font-semibold text-white transition hover:bg-accent-soft"
                    >
                      {`Start ${TRIAL_DAYS}-day demo`}
                    </a>
                  ) : (
                    <button
                      onClick={open}
                      className="glass mt-8 w-full rounded-xl px-6 py-3.5 font-semibold text-frost transition hover:border-accent/40"
                    >
                      Contact us
                    </button>
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>

        <p className="mt-10 text-center text-sm text-mist">
          Every paid plan starts with the same free {TRIAL_DAYS}-day demo.
        </p>
      </div>
    </section>
  );
}

/* --- FAQ ---
   Yalnizca urunun GERCEKTEN yaptigi seyler iddia edilir.
   Desteklenmeyen ozellik vaadi verilmez. */
const faqs = [
  {
    q: "Who is MotoFull for?",
    a: "Motorcycle workshops and service centres — from a single-bay independent shop to a multi-location business. It is built around motorcycle servicing specifically, not adapted from generic car garage software.",
  },
  {
    q: "Can a small workshop use it?",
    a: "Yes. A one or two person workshop can use the same customer records, work orders and service history as a larger shop. There is no minimum team size.",
  },
  {
    q: "Can I use MotoFull on a tablet?",
    a: "Yes. The panel is web based and responsive, so technicians can use it on a tablet at the bench instead of walking back to a desktop.",
  },
  {
    q: "Can I add a motorcycle that is not in the catalogue?",
    a: "Yes. The built-in catalogue is a starting point, but you can record any motorcycle manually with its own details, and it will still carry full service history.",
  },
  {
    q: "Can I find a returning customer quickly?",
    a: "Yes. You can search by customer name, phone number or vehicle and open their previous work without re-entering their details.",
  },
  {
    q: "How long is the demo?",
    a: `The demo runs for ${TRIAL_DAYS} days and does not require a card. It opens with sample workshop data so you can see how MotoFull behaves before entering anything real.`,
  },
  {
    q: `What happens after the ${TRIAL_DAYS} days?`,
    a: "Your demo access becomes restricted, but your data is not deleted automatically. If you continue on a paid plan, you keep what you entered.",
  },
  {
    q: "Is my customer data isolated from other workshops?",
    a: "Yes. Each workshop is a separate tenant and data is scoped to that tenant. One workshop cannot see another workshop's customers, vehicles or records.",
  },
  {
    q: "Can MotoFull be used outside Turkey?",
    a: "Yes. MotoFull is designed for motorcycle service businesses in any country. The public site and product interface are available in English.",
  },
  {
    q: "Does MotoFull handle inventory?",
    a: "Yes. You can track parts and stock, and link parts used to the work order they were consumed on.",
  },
  {
    q: "Does MotoFull support multiple technicians?",
    a: "Yes. Multiple users can work in the same workshop account, and work orders show who is handling which job. The number of users depends on your plan.",
  },
  {
    q: "What are the AI features?",
    a: "MotoFull includes an AI assistant and OBD/ECU fault-code support that suggest where to look first during diagnosis. It is a decision aid for the technician, not an automatic repair decision.",
  },
  {
    q: "Can I manage full service history?",
    a: "Yes. Every service record stays attached to the motorcycle, so the next technician can see what was done previously before opening the job.",
  },
  {
    q: "Do my customers get notified when work is finished?",
    a: "Yes. MotoFull can generate a public tracking link so customers can check the status of their motorcycle themselves instead of calling the workshop.",
  },
];

export function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  return (
    <section id="sss" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-5 lg:px-8">
        <SectionHeading
          eyebrow="FAQ"
          title={
            <>
              Frequently asked <span className="text-gradient">questions</span>
            </>
          }
        />
        <div className="mt-12 space-y-3">
          {faqs.map((f, i) => {
            const isOpen = openIdx === i;
            return (
              <Reveal key={f.q} delay={i * 0.04}>
                <div className={`glass overflow-hidden rounded-2xl transition ${isOpen ? "border-accent/30" : ""}`}>
                  <button
                    onClick={() => setOpenIdx(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  >
                    <span className="font-display font-semibold text-frost">{f.q}</span>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-accent transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <p className="px-6 pb-6 leading-relaxed text-mist">{f.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}