"use client";

import { motion } from "framer-motion";
import { ArrowRight, BellRing, PlayCircle, QrCode, ShieldCheck, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { useDemo } from "./demo-modal";
import { AppWindow } from "./product-ui";
import { Magnetic } from "./ui";
import { TRIAL_DAYS } from "@/lib/pricing";

/* Hero
   NOT: Burada "250+ aktif servis", "48.000+ is emri", "%98 memnuniyet"
   seklinde dogrulanmamis sayilar vardi. Bu iddialarin depoda hicbir
   kaniti yok; kanitsiz sosyal kanit yaniltici reklamdir. Kaldirildi.
   Yerine yalnizca urunun GERCEKTEN yaptigi isler yaziliyor.
   Gercek olcumler elde edildiginde buraya kaynagiyla birlikte eklenebilir. */

/* Doner basli kelime — sayfaya hareket katar ama IDDIA eklemez:
   hepsi urunun gercekten tuttugu kayit turleri. */
const ROTATING = ["service history.", "work orders.", "parts and stock.", "customer records.", "the whole workshop."];

const capabilities = [
  "Customer & motorcycle records",
  "Digital work orders",
  "Mileage-based service history",
  "Parts and inventory",
  "AI diagnosis assistant",
  "Maintenance reminders",
  "Rider status tracking",
  "PDF job sheets",
];

export function Hero() {
  const { open } = useDemo();
  const [wordIdx, setWordIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setWordIdx((i) => (i + 1) % ROTATING.length), 2600);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative overflow-hidden pb-20 pt-36 sm:pt-44">
      {/* backdrop — sabit lekeler yerine yavas suzulen aurora */}
      <div className="grid-bg absolute inset-0" aria-hidden="true" />
      <div className="aurora left-1/2 top-[-280px] h-[560px] w-[880px] -translate-x-1/2 bg-accent/15" aria-hidden="true" />
      <div className="aurora aurora-slow right-[-160px] top-[380px] h-[420px] w-[420px] bg-electric/12" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="glass mb-6 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm text-mist"
          >
            <span className="live-dot h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Live and running at panel.motofull.com.tr
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-4xl font-bold leading-[1.08] tracking-tight text-frost sm:text-6xl lg:text-7xl"
          >
            One place for your
            <br />
            {/* Sabit yukseklik: kelime degisirken sayfa ziplamasin. */}
            <span className="relative mt-1 inline-flex h-[1.15em] w-full items-center justify-center overflow-hidden">
              {ROTATING.map((w, i) => (
                <motion.span
                  key={w}
                  aria-hidden={i !== wordIdx}
                  initial={false}
                  animate={
                    i === wordIdx
                      ? { opacity: 1, y: "0%", filter: "blur(0px)" }
                      : { opacity: 0, y: "60%", filter: "blur(6px)" }
                  }
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  className="text-gradient absolute whitespace-nowrap"
                >
                  {w}
                </motion.span>
              ))}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 max-w-2xl text-lg leading-relaxed text-mist sm:text-xl"
          >
            MotoFull is workshop management built for motorcycle service. Customers, bikes, work
            orders, parts and history stay in one panel — so your team stops retyping the same
            details and starts every job with the full picture.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-9 flex flex-col items-center gap-4 sm:flex-row"
          >
            <Magnetic>
              <button
                onClick={open}
                className="pulse-ring glow-orange group relative flex items-center gap-2 rounded-2xl bg-accent px-8 py-4 text-base font-semibold text-white transition hover:bg-accent-soft"
              >
                Start {TRIAL_DAYS}-day demo
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </Magnetic>
            <a
              href="#panel"
              className="glass flex items-center gap-2 rounded-2xl px-7 py-4 text-base font-medium text-frost transition hover:border-white/20 hover:bg-white/8"
            >
              <PlayCircle className="h-5 w-5 text-accent" />
              Walk through the panel
            </a>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-4 flex items-center gap-2 text-sm text-mist"
          >
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            Free for {TRIAL_DAYS} days. No card required, nothing to cancel.
          </motion.p>
        </div>

        {/* Dogrulanmamis istatistik yerine, kayan gercek yetenek seridi. */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="marquee-mask relative mt-12 overflow-hidden"
        >
          <div className="animate-marquee flex w-max gap-2.5">
            {[...capabilities, ...capabilities].map((c, i) => (
              <span
                key={`${c}-${i}`}
                className="glass whitespace-nowrap rounded-full px-4 py-2 text-xs font-medium text-mist sm:text-sm"
              >
                {c}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Panel gorseli — artik gercek yogunlukta bir uygulama penceresi. */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto mt-14 max-w-5xl"
        >
          <div className="absolute inset-x-10 -top-6 h-full rounded-3xl bg-accent/20 blur-3xl" aria-hidden="true" />
          {/* Hero'da gezinme KAPALI: dikkat CTA'dan kaymasin.
              Gezilebilir tur asagida, #panel bolumunde. */}
          <AppWindow screen="dashboard" interactive={false} compact />

          {/* floating cards */}
          <div className="glass animate-float-slow absolute -left-6 top-24 hidden w-52 rounded-2xl p-4 xl:block">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent/15 text-accent">
                <Sparkles className="h-5 w-5" />
              </span>
              <div>
                <p className="text-xs font-semibold text-frost">AI diagnosis</p>
                <p className="text-[11px] text-mist">P0301 — misfire, plug first</p>
              </div>
            </div>
          </div>
          <div className="glass animate-float-slower absolute -right-8 top-52 hidden w-56 rounded-2xl p-4 xl:block">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-400/15 text-emerald-400">
                <BellRing className="h-5 w-5" />
              </span>
              <div>
                <p className="text-xs font-semibold text-frost">Rider notified</p>
                <p className="text-[11px] text-mist">&quot;Your motorcycle is ready&quot;</p>
              </div>
            </div>
          </div>
          <div className="glass animate-float-slow absolute -bottom-6 left-16 hidden w-48 rounded-2xl p-4 xl:block">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-electric/15 text-electric">
                <QrCode className="h-5 w-5" />
              </span>
              <div>
                <p className="text-xs font-semibold text-frost">Status link opened</p>
                <p className="text-[11px] text-mist">One less phone call</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
