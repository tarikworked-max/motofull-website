"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Building2, ChevronDown, Rocket, Warehouse } from "lucide-react";
import { useEffect, useState } from "react";
import { useDemo } from "./demo-modal";
import { Reveal, SectionHeading } from "./ui";
import { company } from "@/lib/company";
import {
  PLANS, TRIAL_DAYS, formatPrice, guessCurrency,
  monthsFree, yearlyDiscountPercent,
  type Currency, type Period,
} from "@/lib/pricing";

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

export function Pricing() {
  const { open } = useDemo();
  const [period, setPeriod] = useState<Period>("yearly");
  // İlk render sunucuda da çalıştığı için TRY ile başlar; ziyaretçinin
  // gerçek para birimi istemcide belirlenir (hydration uyuşmazlığı olmasın).
  const [currency, setCurrency] = useState<Currency>("TRY");
  useEffect(() => setCurrency(guessCurrency()), []);

  return (
    <section id="fiyatlar" className="relative py-24 sm:py-32">
      <div
        className="absolute left-1/2 top-1/2 h-[420px] w-[680px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/8 blur-[150px]"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          eyebrow="Planlar"
          title={
            <>
              Her ölçekte servise <span className="text-gradient">uygun plan</span>
            </>
          }
          subtitle={`${TRIAL_DAYS} gün ücretsiz deneyin — kredi kartı istemiyoruz. Beğenmezseniz hiçbir şey ödemezsiniz.`}
        />

        {/* Dönem ve para birimi seçimi */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <div className="glass inline-flex rounded-xl p-1" role="group" aria-label="Fatura dönemi">
            {([
              ["monthly", "Aylık"],
              ["yearly", "Yıllık"],
            ] as const).map(([id, label]) => (
              <button
                key={id}
                onClick={() => setPeriod(id)}
                aria-pressed={period === id}
                className={`rounded-lg px-5 py-2 text-sm font-semibold transition ${
                  period === id ? "bg-accent text-white" : "text-mist hover:text-frost"
                }`}
              >
                {label}
                {id === "yearly" && (
                  <span className="ml-2 rounded bg-emerald-500/20 px-1.5 py-0.5 text-[10px] font-bold text-emerald-300">
                    avantajlı
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Para birimi seçici bilinçli olarak YOK: ziyaretçiye yalnızca
              kendi pazarının fiyatı gösterilir. Farklı pazarlara farklı
              fiyat uygulanıyor; hepsini yan yana göstermek hem kafa
              karıştırır hem "neden onlara daha ucuz" sorusunu doğurur. */}
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {PLANS.map((p, i) => {
            const Icon = PLAN_ICONS[p.id] ?? Rocket;
            const price = p.price?.[currency];
            const amount = price ? (period === "yearly" ? price.yearly : price.monthly) : null;

            return (
              <Reveal key={p.id} delay={i * 0.08}>
                <div
                  className={`card-hover relative flex h-full flex-col rounded-3xl p-8 ${
                    p.highlight
                      ? "border border-accent/40 bg-accent/[0.07] glow-orange"
                      : "glass"
                  }`}
                >
                  {p.highlight && (
                    <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-accent px-4 py-1 text-xs font-bold text-white">
                      En Popüler
                    </span>
                  )}
                  <span className={`mb-5 flex h-12 w-12 items-center justify-center rounded-2xl ${p.highlight ? "bg-accent text-white" : "bg-accent/12 text-accent"}`}>
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="font-display text-2xl font-bold text-frost">{p.name}</h3>
                  <p className="mt-1 text-sm text-mist">{p.tagline}</p>

                  {/* Fiyat */}
                  <div className="mt-6 min-h-[92px]">
                    {amount !== null && price ? (
                      <>
                        <div className="flex items-baseline gap-1.5">
                          <span className="font-display text-4xl font-bold text-frost">
                            {formatPrice(amount, currency)}
                          </span>
                          <span className="text-sm text-mist">
                            /{period === "yearly" ? "yıl" : "ay"}
                          </span>
                        </div>
                        {period === "yearly" ? (
                          <p className="mt-1.5 text-xs text-emerald-300">
                            %{yearlyDiscountPercent(price)} indirim — yaklaşık {monthsFree(price)} ay bedava
                          </p>
                        ) : (
                          <p className="mt-1.5 text-xs text-mist">
                            Yıllık ödemede %{yearlyDiscountPercent(price)} indirim
                          </p>
                        )}
                        <p className="mt-1 text-[11px] text-mist/70">KDV dahil değildir.</p>
                      </>
                    ) : (
                      <>
                        <span className="font-display text-3xl font-bold text-frost">Teklif usulü</span>
                        <p className="mt-1.5 text-xs text-mist">
                          İhtiyacınıza göre birlikte belirleyelim.
                        </p>
                      </>
                    )}
                  </div>

                  {/* Kapsam */}
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

                  {/* Kurumsal dışında herkes önce ücretsiz denemeye girer;
                      ödeme, deneme bitiminde panel içinde alınır. */}
                  {p.price ? (
                    <a
                      href={`${company.panelUrl}/hesap/kayit?plan=${p.id}&period=${period}`}
                      className={`mt-8 block w-full rounded-xl px-6 py-3.5 text-center font-semibold transition ${
                        p.highlight
                          ? "bg-accent text-white hover:bg-accent-soft"
                          : "glass text-frost hover:border-accent/40"
                      }`}
                    >
                      {TRIAL_DAYS} gün ücretsiz dene
                    </a>
                  ) : (
                    <button
                      onClick={open}
                      className="glass mt-8 w-full rounded-xl px-6 py-3.5 font-semibold text-frost transition hover:border-accent/40"
                    >
                      Teklif alın
                    </button>
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>

        <p className="mt-8 text-center text-xs text-mist">
          Kredi kartı bilgisi deneme için istenmez. Ödeme adımında kart bilgileriniz
          doğrudan lisanslı ödeme kuruluşuna iletilir, sunucularımıza hiç ulaşmaz.{" "}
          <a href="/iade-ve-cayma" className="text-accent hover:underline">
            14 gün koşulsuz iade
          </a>{" "}
          ·{" "}
          <a href="/mesafeli-satis" className="text-accent hover:underline">
            Mesafeli satış sözleşmesi
          </a>
        </p>
        <Reveal className="mt-8 text-center">
          <p className="text-sm text-mist">
            Fiyatlar servis büyüklüğüne göre belirlenir. Demo görüşmesinde net teklif alırsınız.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* --- FAQ --- */
const faqs = [
  {
    q: "MotoFull'u kullanmak için teknik bilgi gerekiyor mu?",
    a: "Hayır. MotoFull, WhatsApp kullanabilen herkesin 1 günde öğrenebileceği sadelikte tasarlandı. Kurulumda ekibimiz tüm verilerinizin aktarımında ve eğitimde yanınızda olur.",
  },
  {
    q: "Mevcut kağıt kayıtlarımı sisteme aktarabilir miyim?",
    a: "Evet. Müşteri ve araç listelerinizi Excel'den toplu içe aktarabilirsiniz. Dilerseniz geçiş sürecinde veri girişini ekibimiz sizin için yapar.",
  },
  {
    q: "İnternet kesilirse verilerim kaybolur mu?",
    a: "Hayır. Tüm veriler bulutta güvenle saklanır ve otomatik yedeklenir. İnternet geldiğinde kaldığınız yerden devam edersiniz; hiçbir kayıt kaybolmaz.",
  },
  {
    q: "AI teşhis gerçekten işe yarıyor mu?",
    a: "AI, arıza kodlarını ve şikayetleri marka/modele özel bilgi tabanıyla analiz ederek olası nedenleri kontrol sırasıyla listeler. Karar her zaman ustanındır; AI süreci hızlandırır ve deneme-yanılmayı azaltır.",
  },
  {
    q: "Birden fazla şubem var, hepsini tek yerden yönetebilir miyim?",
    a: "Evet. Enterprise planında tüm şubelerinizi tek panelden izler, şube bazlı yetki ve raporlama yaparsınız. Her şubenin verisi birbirinden tamamen izole tutulur.",
  },
  {
    q: "Sözleşme veya taahhüt var mı?",
    a: "Uzun vadeli taahhüt zorunluluğu yoktur. Aylık kullanır, dilediğiniz zaman ayrılabilirsiniz. Verilerinizi her zaman dışa aktarabilirsiniz — veri sizindir.",
  },
];

export function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  return (
    <section id="sss" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-5 lg:px-8">
        <SectionHeading
          eyebrow="SSS"
          title={
            <>
              Merak <span className="text-gradient">edilenler</span>
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
