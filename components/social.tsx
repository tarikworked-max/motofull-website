"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Building2, ChevronDown, Rocket, Warehouse } from "lucide-react";
import { useState } from "react";
import { useDemo } from "./demo-modal";
import { Reveal, SectionHeading } from "./ui";
import { company } from "@/lib/company";
import { PLANS, TRIAL_DAYS, MARKET_CURRENCY, formatPrice, type Market } from "@/lib/pricing";

/* --- Testimonials ---
   ÖNEMLİ / IMPORTANT: Bu bölümdeki 15 görüş KURGUSALDIR. Gerçek MotoFull
   müşterisi değildir. Her kart UI'da açıkça "Demo Example" olarak
   etiketlenir ve bölüm açıklaması da bunu belirtir. "Trusted by",
   "Our customers", "Verified customer" gibi doğrulanmamış güven
   ifadeleri KULLANILMAZ — kanıtı olmayan sosyal kanıt yanıltıcı reklamdır.
   Gerçek referanslar geldiğinde bu dizi onlarla değiştirilmelidir. */
type Testimonial = {
  name: string;
  role: string;
  workshop: string;
  location: string;
  initials: string;
  text: string;
  /** Öne çıkarılan MotoFull yeteneği — her kart farklı bir faydayı anlatır. */
  focus: string;
};

const testimonials: Testimonial[] = [
  {
    name: "James Whitfield", role: "Owner", workshop: "Whitfield Moto Works",
    location: "Manchester, United Kingdom", initials: "JW", focus: "Customer history",
    text: "A rider walks in and I pull up every service we have ever done on that bike in seconds. No more asking customers to repeat their details at the counter.",
  },
  {
    name: "Andrea Bergmann", role: "Workshop Manager", workshop: "Bergmann Zweirad",
    location: "Stuttgart, Germany", initials: "AB", focus: "Work orders",
    text: "Creating a work order used to mean rewriting the same customer and bike details every time. Now it is picked from the record and the job sheet is ready before the rider sits down.",
  },
  {
    name: "Luca Ferretti", role: "Founder", workshop: "Officina Ferretti",
    location: "Bologna, Italy", initials: "LF", focus: "Service history",
    text: "Our history used to live in three notebooks and a spreadsheet. Having one searchable record per motorcycle changed how quickly we can quote a repeat job.",
  },
  {
    name: "Carmen Ruiz", role: "Service Advisor", workshop: "Talleres Ruiz Motos",
    location: "Valencia, Spain", initials: "CR", focus: "Customer updates",
    text: "The public tracking link stopped the constant phone calls asking if the bike is ready. Customers check the status themselves and we get on with the work.",
  },
  {
    name: "Elodie Marchand", role: "Co-owner", workshop: "Atelier Deux Roues",
    location: "Lyon, France", initials: "EM", focus: "Maintenance reminders",
    text: "Follow-up services were the thing we always forgot. Reminders mean the next service is scheduled instead of quietly lost.",
  },
  {
    name: "Marcus Delaney", role: "Shop Owner", workshop: "Delaney Cycle Service",
    location: "Austin, United States", initials: "MD", focus: "Returning customers",
    text: "Searching by phone number or plate finds a returning customer instantly. That alone removed a few minutes from every single intake.",
  },
  {
    name: "Priya Raman", role: "Operations Lead", workshop: "Northline Moto",
    location: "Toronto, Canada", initials: "PR", focus: "Multiple technicians",
    text: "With several technicians on the floor, seeing who is on which job removed most of the shouting across the workshop.",
  },
  {
    name: "Khalid Al-Rashid", role: "General Manager", workshop: "Desert Wheels Service",
    location: "Dubai, United Arab Emirates", initials: "KA", focus: "Multiple locations",
    text: "Running two locations from one panel means I can see both workloads without driving between them.",
  },
  {
    name: "Kenji Nakamura", role: "Head Technician", workshop: "Nakamura Moto Garage",
    location: "Osaka, Japan", initials: "KN", focus: "Technical context",
    text: "Seeing the previous repair before opening the engine matters. The technician gets the context instead of starting from a blank page.",
  },
  {
    name: "Sarah Whitcombe", role: "Owner", workshop: "Southside Motorcycles",
    location: "Melbourne, Australia", initials: "SW", focus: "Inventory",
    text: "Parts used on a job come straight off the stock count. We stopped discovering shortages halfway through a service.",
  },
  {
    name: "Rafael Moreira", role: "Founder", workshop: "Oficina Moreira Motos",
    location: "Sao Paulo, Brazil", initials: "RM", focus: "Paperless intake",
    text: "We moved off paper job cards and messaging threads. Everything about a job now lives in one place instead of four.",
  },
  {
    name: "Valeria Cruz", role: "Service Manager", workshop: "Taller Cruz Motos",
    location: "Guadalajara, Mexico", initials: "VC", focus: "Reporting",
    text: "At the end of the month I can actually see what we did and what it earned, without rebuilding it from receipts.",
  },
  {
    name: "Thabo Mokoena", role: "Owner", workshop: "Mokoena Moto Care",
    location: "Johannesburg, South Africa", initials: "TM", focus: "Small workshops",
    text: "We are a three-person shop. I expected something built for big dealerships, but we were running real jobs through it the same week.",
  },
  {
    name: "Sanne de Vries", role: "Workshop Lead", workshop: "De Vries Motoren",
    location: "Utrecht, Netherlands", initials: "SV", focus: "Tablet friendly",
    text: "The technicians use it on a tablet at the bench rather than walking back to a desktop to write anything down.",
  },
  {
    name: "Wei Lin Tan", role: "Director", workshop: "Lion City Moto",
    location: "Singapore", initials: "WT", focus: "AI assistance",
    text: "For models we rarely see, the assistant suggests where to look first. It is a starting point for diagnosis, not a replacement for the technician.",
  },
];

export function Testimonials() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          eyebrow="Example customer stories"
          title={
            <>
              How a motorcycle workshop <span className="text-gradient">uses MotoFull</span>
            </>
          }
        />

        {/* Dürüstlük notu: kurgusal oldukları hem burada hem her kartta yazar. */}
        <p className="mx-auto mt-5 max-w-2xl text-center text-sm leading-relaxed text-mist">
          These are illustrative examples, not real customer references. They show the kind of
          day-to-day problems MotoFull is built to solve in motorcycle service businesses worldwide.
        </p>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={Math.min(i, 5) * 0.06}>
              <figure className="card-hover glass flex h-full flex-col rounded-3xl p-7">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <span className="rounded-full border border-white/12 bg-white/5 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-mist">
                    Demo Example
                  </span>
                  <span className="text-[11px] font-medium text-mist">{t.focus}</span>
                </div>

                <blockquote className="flex-1 text-[15px] leading-relaxed text-frost">
                  &ldquo;{t.text}&rdquo;
                </blockquote>

                <figcaption className="mt-6 flex items-center gap-3 border-t border-white/8 pt-5">
                  <span
                    aria-hidden="true"
                    className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-accent to-accent-soft font-display text-sm font-bold text-white"
                  >
                    {t.initials}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate font-semibold text-frost">{t.name}</p>
                    <p className="truncate text-xs text-mist">
                      {t.role} · {t.workshop}
                    </p>
                    <p className="truncate text-xs text-mist/80">{t.location}</p>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

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
export function Pricing({ market = "EU" }: { market?: Market }) {
  const currency = MARKET_CURRENCY[market];

  const { open } = useDemo();

  return (
    <section id="fiyatlar" className="relative py-24 sm:py-32">
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
          subtitle={`Start with a free ${TRIAL_DAYS}-day demo — no card required.`}
        />

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
                          Free for {TRIAL_DAYS} days
                        </span>
                        <p className="mt-1.5 text-xs text-mist">No card required.</p>
                      </>
                    ) : p.price ? (
                      <>
                        <span className="font-display text-4xl font-bold text-frost">
                          {formatPrice(p.price[currency].monthly, currency)}
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