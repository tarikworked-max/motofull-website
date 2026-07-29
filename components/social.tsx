"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Building2, ChevronDown, Rocket, Star, Warehouse } from "lucide-react";
import { useState } from "react";
import { useDemo } from "./demo-modal";
import { Reveal, SectionHeading } from "./ui";

/* --- Testimonials --- */
const testimonials = [
  {
    name: "Serkan Aydın",
    role: "Moto Garage İstanbul · Kurucu",
    initials: "SA",
    text: "20 yıllık defter alışkanlığını bir haftada bıraktık. Artık müşteri aradığında geçmişi saniyesinde açıyorum. Müşteriler 'siz kurumsal olmuşsunuz' diyor.",
  },
  {
    name: "Elif Kaya",
    role: "İki Teker Servis · İşletme Müdürü",
    initials: "EK",
    text: "Bakım hatırlatma SMS'leri sayesinde geri dönen müşteri oranımız gözle görülür şekilde arttı. Sistem kendini ilk ay ödedi.",
  },
  {
    name: "Murat Demir",
    role: "RPM Motosiklet · Baş Teknisyen",
    initials: "MD",
    text: "AI teşhis özellikle nadir gördüğümüz modellerde çok işe yarıyor. Kontrol sırası öneriyor, deneme yanılmayla parça değiştirme devri bitti.",
  },
];

export function Testimonials() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          eyebrow="Referanslar"
          title={
            <>
              Servis sahipleri <span className="text-gradient">ne diyor?</span>
            </>
          }
        />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.08}>
              <figure className="card-hover glass flex h-full flex-col rounded-3xl p-8">
                <div className="mb-4 flex gap-1" aria-label="5 üzerinden 5 yıldız">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-accent text-accent" />
                  ))}
                </div>
                <blockquote className="flex-1 leading-relaxed text-frost">
                  &ldquo;{t.text}&rdquo;
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-white/8 pt-5">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-accent to-accent-soft font-display text-sm font-bold text-white">
                    {t.initials}
                  </span>
                  <div>
                    <p className="font-semibold text-frost">{t.name}</p>
                    <p className="text-xs text-mist">{t.role}</p>
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

/* --- Pricing --- */
const plans = [
  {
    icon: Rocket,
    name: "Starter",
    tag: "Küçük atölyeler",
    features: ["1 kullanıcı", "Müşteri & araç kayıtları", "Dijital iş emirleri", "Temel raporlar", "E-posta destek"],
    highlight: false,
  },
  {
    icon: Warehouse,
    name: "Professional",
    tag: "Büyüyen servisler",
    features: ["5 kullanıcıya kadar", "AI teşhis asistanı", "Stok & tedarikçi yönetimi", "QR takip + SMS hatırlatma", "Öncelikli destek"],
    highlight: true,
  },
  {
    icon: Building2,
    name: "Enterprise",
    tag: "Zincir & yetkili servisler",
    features: ["Sınırsız kullanıcı", "Çoklu şube yönetimi", "Özel entegrasyonlar", "Gelişmiş analiz & API", "Özel müşteri temsilcisi"],
    highlight: false,
  },
];

export function Pricing() {
  const { open } = useDemo();
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
          subtitle="Tek kişilik atölyeden çok şubeli zincire kadar. Size uygun planı birlikte belirleyelim."
        />
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {plans.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.08}>
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
                  <p.icon className="h-6 w-6" />
                </span>
                <h3 className="font-display text-2xl font-bold text-frost">{p.name}</h3>
                <p className="mt-1 text-sm text-mist">{p.tag}</p>
                <ul className="mt-6 flex-1 space-y-3">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-sm text-frost">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={open}
                  className={`mt-8 w-full rounded-xl px-6 py-3.5 font-semibold transition ${
                    p.highlight
                      ? "bg-accent text-white hover:bg-accent-soft"
                      : "glass text-frost hover:border-accent/40"
                  }`}
                >
                  Bize Ulaşın
                </button>
              </div>
            </Reveal>
          ))}
        </div>
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
