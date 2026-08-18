"use client";

import { motion } from "framer-motion";
import { BellRing, PlayCircle, QrCode, Sparkles } from "lucide-react";
import { useDemo } from "./demo-modal";
import { DashboardMockup } from "./dashboard-mockup";
import { Magnetic } from "./ui";
import { TRIAL_DAYS } from "@/lib/pricing";

/* Hero
   NOT: Burada "250+ aktif servis", "48.000+ is emri", "%98 memnuniyet"
   seklinde dogrulanmamis sayilar vardi. Bu iddialarin depoda hicbir
   kaniti yok; kanitsiz sosyal kanit yaniltici reklamdir. Kaldirildi.
   Yerine yalnizca urunun GERCEKTEN yaptigi isler yaziliyor.
   Gercek olcumler elde edildiginde buraya kaynagiyla birlikte eklenebilir. */

const capabilities = [
  "Customer & motorcycle records",
  "Work orders",
  "Service history",
  "Inventory",
  "Maintenance reminders",
];

export function Hero() {
  const { open } = useDemo();

  return (
    <section className="relative overflow-hidden pb-20 pt-36 sm:pt-44">
      {/* backdrop */}
      <div className="grid-bg absolute inset-0" aria-hidden="true" />
      <div
        className="absolute left-1/2 top-[-260px] h-[560px] w-[860px] -translate-x-1/2 rounded-full bg-accent/15 blur-[140px]"
        aria-hidden="true"
      />
      <div
        className="absolute right-[-160px] top-[420px] h-[380px] w-[380px] rounded-full bg-electric/10 blur-[120px]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="glass mb-6 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm text-mist"
          >
            <Sparkles className="h-4 w-4 text-accent" />
            Built for motorcycle workshops worldwide
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-4xl font-bold leading-[1.08] tracking-tight text-frost sm:text-6xl lg:text-7xl"
          >
            Workshop management
            <br />
            <span className="text-gradient">for motorcycle service.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 max-w-2xl text-lg leading-relaxed text-mist sm:text-xl"
          >
            MotoFull keeps customers, motorcycles, service history, work orders and parts in
            one place — so your team stops retyping the same details and starts every job with
            the full picture.
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
                className="pulse-ring relative rounded-2xl bg-accent px-8 py-4 text-base font-semibold text-white transition hover:bg-accent-soft glow-orange"
              >
                Start {TRIAL_DAYS}-day demo
              </button>
            </Magnetic>
            <a
              href="#panel"
              className="glass flex items-center gap-2 rounded-2xl px-7 py-4 text-base font-medium text-frost transition hover:border-white/20 hover:bg-white/8"
            >
              <PlayCircle className="h-5 w-5 text-accent" />
              See how it works
            </a>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-4 text-sm text-mist"
          >
            Free for {TRIAL_DAYS} days. No card required.
          </motion.p>

          {/* Dogrulanmamis istatistik yerine gercek yetenek listesi. */}
          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-11 flex flex-wrap items-center justify-center gap-2.5"
          >
            {capabilities.map((c) => (
              <li
                key={c}
                className="glass rounded-full px-4 py-2 text-xs font-medium text-mist sm:text-sm"
              >
                {c}
              </li>
            ))}
          </motion.ul>
        </div>

        {/* dashboard visual */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto mt-16 max-w-4xl"
        >
          <div
            className="absolute inset-x-10 -top-6 h-full rounded-3xl bg-accent/20 blur-3xl"
            aria-hidden="true"
          />
          <DashboardMockup />

          {/* floating cards */}
          <div className="glass animate-float-slow absolute -left-6 top-16 hidden w-52 rounded-2xl p-4 lg:block">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent/15 text-accent">
                <Sparkles className="h-5 w-5" />
              </span>
              <div>
                <p className="text-xs font-semibold text-frost">AI diagnosis</p>
                <p className="text-[11px] text-mist">P0301 — misfire detected</p>
              </div>
            </div>
          </div>
          <div className="glass animate-float-slower absolute -right-8 top-40 hidden w-56 rounded-2xl p-4 lg:block">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-400/15 text-emerald-400">
                <BellRing className="h-5 w-5" />
              </span>
              <div>
                <p className="text-xs font-semibold text-frost">Customer notified</p>
                <p className="text-[11px] text-mist">&quot;Your motorcycle is ready&quot;</p>
              </div>
            </div>
          </div>
          <div className="glass animate-float-slow absolute -bottom-6 left-16 hidden w-48 rounded-2xl p-4 lg:block">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-electric/15 text-electric">
                <QrCode className="h-5 w-5" />
              </span>
              <div>
                <p className="text-xs font-semibold text-frost">QR tracking</p>
                <p className="text-[11px] text-mist">Customer checked the status</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
