"use client";

import { motion } from "framer-motion";
import { BellRing, PlayCircle, QrCode, Sparkles } from "lucide-react";
import { useDemo } from "./demo-modal";
import { DashboardMockup } from "./dashboard-mockup";
import { Counter, Magnetic } from "./ui";

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
            AI destekli servis yönetimi artık Türkiye&apos;de
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-4xl font-bold leading-[1.08] tracking-tight text-frost sm:text-6xl lg:text-7xl"
          >
            Motosiklet servisinizin
            <br />
            <span className="text-gradient">işletim sistemi.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 max-w-2xl text-lg leading-relaxed text-mist sm:text-xl"
          >
            İş emirleri, müşteriler, stok, AI teşhis ve raporlar — servisinizin tamamı tek
            panelde. Kağıt defterleri kapatın, atölyenizi geleceğe taşıyın.
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
                Demo Talep Et
              </button>
            </Magnetic>
            <a
              href="#panel"
              className="glass flex items-center gap-2 rounded-2xl px-7 py-4 text-base font-medium text-frost transition hover:border-white/20 hover:bg-white/8"
            >
              <PlayCircle className="h-5 w-5 text-accent" />
              Paneli İncele
            </a>
          </motion.div>

          {/* trust stats */}
          <motion.dl
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-12 grid grid-cols-3 gap-6 sm:gap-12"
          >
            {[
              { value: 250, suffix: "+", label: "Aktif servis" },
              { value: 48000, suffix: "+", label: "Tamamlanan iş emri" },
              { value: 98, suffix: "%", label: "Memnuniyet" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <dt className="sr-only">{s.label}</dt>
                <dd className="font-display text-2xl font-bold text-frost sm:text-3xl">
                  <Counter value={s.value} suffix={s.suffix} />
                </dd>
                <p className="mt-1 text-xs text-mist sm:text-sm">{s.label}</p>
              </div>
            ))}
          </motion.dl>
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
                <p className="text-xs font-semibold text-frost">AI Teşhis</p>
                <p className="text-[11px] text-mist">P0301 — Ateşleme hatası</p>
              </div>
            </div>
          </div>
          <div className="glass animate-float-slower absolute -right-8 top-40 hidden w-56 rounded-2xl p-4 lg:block">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-400/15 text-emerald-400">
                <BellRing className="h-5 w-5" />
              </span>
              <div>
                <p className="text-xs font-semibold text-frost">SMS gönderildi</p>
                <p className="text-[11px] text-mist">&quot;Motorunuz teslime hazır&quot;</p>
              </div>
            </div>
          </div>
          <div className="glass animate-float-slow absolute -bottom-6 left-16 hidden w-48 rounded-2xl p-4 lg:block">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-electric/15 text-electric">
                <QrCode className="h-5 w-5" />
              </span>
              <div>
                <p className="text-xs font-semibold text-frost">QR Takip</p>
                <p className="text-[11px] text-mist">Müşteri durumu görüntüledi</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
