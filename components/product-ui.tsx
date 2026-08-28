"use client";

/**
 * product-ui.tsx — Urunun GERCEK ekranlarinin yuksek sadakatli kopyalari.
 *
 * NEDEN BU DOSYA VAR:
 * Onceki surumde tek bir basit "dashboard" cizimi vardi (dashboard-mockup.tsx)
 * ve ayni cizim hem hero'da hem panel bolumunde tekrar kullaniliyordu. Ayni
 * ucuz gorseli iki kez gostermek, urunun kendisini de ucuz gosteriyordu.
 *
 * Burada panelin gercekten sahip oldugu ekranlar (Dashboard, Is emri,
 * Motosiklet gecmisi, Stok, AI teshis, Musteri takip) ayri ayri, gercek
 * bir uygulamanin yogunlugunda cizilir.
 *
 * DURUSTLUK KURALI: buradaki veriler SENTETIK ornek veridir ve arayuzde
 * "sample data" olarak etiketlenir. Gercek musteri verisi ya da
 * dogrulanmamis basari rakami GOSTERILMEZ.
 */

import { motion } from "framer-motion";
import {
  Bell,
  Bike,
  Boxes,
  BrainCircuit,
  CalendarClock,
  Check,
  ChevronRight,
  ClipboardList,
  FileBarChart,
  LayoutDashboard,
  QrCode,
  Search,
  Sparkles,
  TriangleAlert,
  Users,
  Wrench,
} from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";

/* ───────────────────────── ortak parcalar ───────────────────────── */

const NAV = [
  { id: "dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { id: "workorder", icon: ClipboardList, label: "Work orders" },
  { id: "history", icon: Bike, label: "Motorcycles" },
  { id: "inventory", icon: Boxes, label: "Inventory" },
  { id: "ai", icon: BrainCircuit, label: "AI diagnosis" },
  { id: "tracking", icon: QrCode, label: "Rider tracking" },
] as const;

export type ScreenId = (typeof NAV)[number]["id"];

const SECONDARY_NAV = [
  { icon: Users, label: "Customers" },
  { icon: CalendarClock, label: "Reminders" },
  { icon: FileBarChart, label: "Reports" },
];

type Tone = "amber" | "emerald" | "sky" | "rose";

function Badge({ tone, children }: { tone: Tone; children: ReactNode }) {
  const tones: Record<Tone, string> = {
    amber: "text-amber-300 bg-amber-400/12 border-amber-400/20",
    emerald: "text-emerald-300 bg-emerald-400/12 border-emerald-400/20",
    sky: "text-sky-300 bg-sky-400/12 border-sky-400/20",
    rose: "text-rose-300 bg-rose-400/12 border-rose-400/20",
  };
  return (
    <span className={`shrink-0 rounded-full border px-2 py-0.5 text-[9px] font-semibold ${tones[tone]}`}>
      {children}
    </span>
  );
}

function Panel({ title, right, children }: { title: string; right?: ReactNode; children: ReactNode }) {
  return (
    <div className="overflow-hidden rounded-xl border border-white/8 bg-white/[0.025]">
      <div className="flex items-center justify-between gap-2 border-b border-white/8 px-3 py-2">
        <p className="text-[11px] font-semibold text-frost">{title}</p>
        {right}
      </div>
      {children}
    </div>
  );
}

/* Deger yavasca hedefe sayan kucuk sayac — ekranlar "canli" hissettirir.
 *
 * SUNUCUDA ve ilk boyamada DOGRU deger basilir, 0 degil. Sayac yalnizca
 * tarayicida, animasyon istenen durumda geriye alinip ileri sayar.
 * Boylece JavaScript calismasa, sekme arka planda olsa ya da kullanici
 * "hareketi azalt" dediyse ziyaretci ekranda "0" gormez. */
function LiveNumber({ to }: { to: number }) {
  const [n, setN] = useState(to);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let start = 0;
    setN(0);
    const tick = (t: number) => {
      if (!start) start = t;
      const p = Math.min(1, (t - start) / 900);
      setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    /* EMNIYET AGI. requestAnimationFrame yalnizca sayfa kare uretirken
       calisir; sekme arka plandaysa ya da tarayici kareleri kisiyorsa
       hic tetiklenmeyebilir. O durumda ziyaretci "0 acik is emri" gorur
       — animasyonsuz bir sayidan cok daha kotusu. Gercek zamanli sayac
       1,5 sn sonra sayiyi zorla yerine oturtur. */
    const safety = window.setTimeout(() => {
      cancelAnimationFrame(raf);
      setN(to);
    }, 1500);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(safety);
      /* Animasyon yarida kesilirse (ekran degisti, sekme kapandi)
         ekranda yarim bir sayi kalmasin. */
      setN(to);
    };
  }, [to]);

  return <>{n.toLocaleString("en-GB")}</>;
}

/* ───────────────────────── ekranlar ───────────────────────── */

const WEEKS = [38, 52, 44, 61, 55, 72, 66, 83, 70, 88, 79, 94];

function DashboardScreen() {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
        {[
          { label: "Open work orders", value: 14, sub: "3 opened today", tone: "text-accent-soft" },
          { label: "In service now", value: 6, sub: "2 waiting for parts", tone: "text-amber-300" },
          { label: "Ready for pickup", value: 5, sub: "riders notified", tone: "text-emerald-300" },
          { label: "Low stock items", value: 3, sub: "reorder suggested", tone: "text-rose-300" },
        ].map((s) => (
          <div key={s.label} className="rounded-xl border border-white/8 bg-white/[0.03] p-3">
            <p className="text-[10px] leading-tight text-mist">{s.label}</p>
            <p className="font-display text-xl font-bold text-frost">
              <LiveNumber to={s.value} />
            </p>
            <p className={`text-[10px] ${s.tone}`}>{s.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-3 lg:grid-cols-[1.6fr_1fr]">
        <Panel title="Service volume" right={<span className="text-[10px] text-mist">last 12 weeks</span>}>
          <div className="flex h-24 items-end gap-1.5 p-3">
            {WEEKS.map((h, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${h}%` }}
                transition={{ delay: i * 0.035, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="flex-1 rounded-t-sm bg-gradient-to-t from-accent/25 to-accent"
              />
            ))}
          </div>
        </Panel>

        <Panel title="Today's schedule">
          <ul className="divide-y divide-white/5">
            {[
              { t: "09:30", d: "Honda CB650R · 12k service", s: "Done" },
              { t: "11:00", d: "Yamaha MT-07 · brake pads", s: "In bay 2" },
              { t: "14:15", d: "KTM 390 · diagnosis", s: "Queued" },
            ].map((r) => (
              <li key={r.t} className="flex items-center gap-2.5 px-3 py-2">
                <span className="w-9 shrink-0 font-mono text-[10px] text-accent-soft">{r.t}</span>
                <span className="min-w-0 flex-1 truncate text-[10.5px] text-frost">{r.d}</span>
                <span className="shrink-0 text-[9px] text-mist">{r.s}</span>
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      <Panel
        title="Active work orders"
        right={
          <span className="flex items-center gap-1.5 text-[10px] text-mist">
            <span className="live-dot h-1.5 w-1.5 rounded-full bg-emerald-400" /> updating
          </span>
        }
      >
        <div className="divide-y divide-white/5">
          {(
            [
              { id: "#2841", plate: "34 ABC 12", model: "Honda CB650R", job: "12,000 km scheduled service", tech: "A. Yıldız", status: "In service", tone: "amber" },
              { id: "#2840", plate: "06 MTF 07", model: "Yamaha MT-07", job: "Front brake pads + fluid", tech: "M. Kaya", status: "Ready", tone: "emerald" },
              { id: "#2839", plate: "35 KTM 39", model: "KTM 390 Duke", job: "Fault code P0301 · diagnosis", tech: "A. Yıldız", status: "Awaiting parts", tone: "sky" },
              { id: "#2838", plate: "16 BMW 12", model: "BMW R 1250 GS", job: "Chain, sprockets, oil change", tech: "S. Demir", status: "In service", tone: "amber" },
            ] as { id: string; plate: string; model: string; job: string; tech: string; status: string; tone: Tone }[]
          ).map((r) => (
            <div key={r.id} className="flex items-center gap-2.5 px-3 py-2">
              <span className="w-11 shrink-0 font-mono text-[10px] text-mist">{r.id}</span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[11px] font-medium text-frost">
                  {r.plate} · {r.model}
                </p>
                <p className="truncate text-[10px] text-mist">{r.job}</p>
              </div>
              <span className="hidden shrink-0 text-[10px] text-mist sm:block">{r.tech}</span>
              <Badge tone={r.tone}>{r.status}</Badge>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}

function WorkOrderScreen() {
  return (
    <div className="grid gap-3 lg:grid-cols-[1.35fr_1fr]">
      <div className="space-y-3">
        <div className="rounded-xl border border-accent/25 bg-accent/[0.06] p-3">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="font-display text-sm font-bold text-frost">Work order #2841</p>
              <p className="text-[10.5px] text-mist">Honda CB650R · 34 ABC 12 · 11,840 km</p>
            </div>
            <Badge tone="amber">In service</Badge>
          </div>
          <div className="mt-3 flex items-center gap-1.5">
            {["Received", "In service", "Ready", "Delivered"].map((s, i) => (
              <div key={s} className="flex-1">
                <div
                  className={`relative h-1 overflow-hidden rounded-full ${i <= 1 ? "bg-accent" : "bg-white/10"} ${
                    i === 1 ? "progress-slide" : ""
                  }`}
                />
                <p className={`mt-1 text-[8.5px] ${i <= 1 ? "text-accent-soft" : "text-mist"}`}>{s}</p>
              </div>
            ))}
          </div>
        </div>

        <Panel title="Jobs on this order" right={<span className="text-[10px] text-mist">4 lines</span>}>
          <div className="divide-y divide-white/5">
            {[
              { j: "Engine oil + filter change", d: "1.0 h", done: true },
              { j: "Valve clearance check", d: "1.5 h", done: true },
              { j: "Chain adjustment & lube", d: "0.4 h", done: false },
              { j: "Brake fluid replacement", d: "0.6 h", done: false },
            ].map((l) => (
              <div key={l.j} className="flex items-center gap-2.5 px-3 py-2">
                <span
                  className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border ${
                    l.done ? "border-emerald-400/40 bg-emerald-400/15 text-emerald-300" : "border-white/15"
                  }`}
                >
                  {l.done && <Check className="h-2.5 w-2.5" />}
                </span>
                <span className="flex-1 truncate text-[11px] text-frost">{l.j}</span>
                <span className="text-[10px] text-mist">{l.d}</span>
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="Parts used" right={<span className="text-[10px] text-accent-soft">deducted from stock</span>}>
          <div className="divide-y divide-white/5">
            {[
              { p: "Oil filter HF204", q: "1", c: "in stock" },
              { p: "10W-40 fully synthetic", q: "3.4 L", c: "in stock" },
              { p: "Brake fluid DOT 4", q: "0.5 L", c: "in stock" },
              { p: "Crush washer 12 mm", q: "1", c: "last 2 left" },
            ].map((r) => (
              <div key={r.p} className="flex items-center gap-2 px-3 py-1.5">
                <span className="flex-1 truncate text-[10.5px] text-frost">{r.p}</span>
                <span className="w-12 text-right text-[10px] text-mist">{r.q}</span>
                <span className="w-16 text-right text-[9px] text-mist">{r.c}</span>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      <div className="space-y-3">
        <Panel title="Rider">
          <div className="space-y-1.5 px-3 py-2.5 text-[10.5px]">
            <p className="font-medium text-frost">Sample Customer</p>
            <p className="text-mist">+•• ••• ••• ••  ·  2 motorcycles</p>
            <p className="text-mist">14 previous service records</p>
            <p className="text-mist">Last visit: 12 Mar 2026</p>
          </div>
        </Panel>

        <Panel title="Totals">
          <div className="space-y-1.5 px-3 py-2.5 text-[10.5px]">
            {[
              ["Labour (3.5 h)", "—"],
              ["Parts", "—"],
              ["Subtotal", "—"],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between text-mist">
                <span>{k}</span>
                <span>{v}</span>
              </div>
            ))}
            <div className="mt-1 flex justify-between border-t border-white/10 pt-2 text-frost">
              <span className="font-semibold">Total</span>
              <span className="text-[10px] text-mist">in your own currency</span>
            </div>
          </div>
        </Panel>

        <div className="rounded-xl border border-white/8 bg-white/[0.025] p-3">
          <p className="mb-2 text-[10.5px] font-semibold text-frost">One click from here</p>
          {["Generate PDF job sheet", "Send status link to rider", "Schedule next service"].map((a) => (
            <div
              key={a}
              className="mb-1.5 flex items-center justify-between rounded-lg border border-white/8 bg-white/[0.03] px-2.5 py-1.5 text-[10px] text-frost last:mb-0"
            >
              {a}
              <ChevronRight className="h-3 w-3 text-accent" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function HistoryScreen() {
  return (
    <div className="grid gap-3 lg:grid-cols-[1fr_1.4fr]">
      <div className="space-y-3">
        <div className="rounded-xl border border-white/8 bg-white/[0.03] p-3">
          <div className="flex items-center gap-2.5">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/12 text-accent">
              <Bike className="h-5 w-5" />
            </span>
            <div className="min-w-0">
              <p className="truncate font-display text-sm font-bold text-frost">Yamaha MT-07</p>
              <p className="truncate text-[10px] text-mist">2023 · 06 MTF 07 · VIN ••••••••</p>
            </div>
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {[
              { k: "Mileage", v: "24,350 km" },
              { k: "Records", v: "8" },
              { k: "Next due", v: "28,000 km" },
            ].map((s) => (
              <div key={s.k} className="rounded-lg border border-white/8 bg-white/[0.03] px-2 py-1.5">
                <p className="text-[9px] text-mist">{s.k}</p>
                <p className="text-[10.5px] font-semibold text-frost">{s.v}</p>
              </div>
            ))}
          </div>
        </div>

        <Panel title="Warranty">
          <div className="space-y-1.5 px-3 py-2.5 text-[10px]">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              <span className="text-frost">Chain kit — covered until 30,000 km</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-mist" />
              <span className="text-mist">Brake pads — coverage ended</span>
            </div>
          </div>
        </Panel>
      </div>

      <Panel title="Service history" right={<span className="text-[10px] text-mist">mileage based</span>}>
        <ol className="relative space-y-0 px-3 py-2">
          <span className="absolute bottom-4 left-[19px] top-4 w-px bg-gradient-to-b from-accent via-accent/30 to-transparent" />
          {[
            { km: "24,350", d: "12 Mar 2026", t: "Chain and sprocket set replaced", tech: "M. Kaya" },
            { km: "21,100", d: "04 Nov 2025", t: "Scheduled service · oil, filter, plugs", tech: "A. Yıldız" },
            { km: "18,420", d: "19 Jun 2025", t: "Front brake pads + fluid flush", tech: "M. Kaya" },
            { km: "12,050", d: "27 Jan 2025", t: "Fault code diagnosis · sensor replaced", tech: "S. Demir" },
            { km: "6,400", d: "08 Aug 2024", t: "First scheduled service", tech: "A. Yıldız" },
          ].map((r, i) => (
            <motion.li
              key={r.km}
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 * i, duration: 0.4 }}
              className="relative flex gap-3 py-2"
            >
              <span className="relative z-10 mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-accent/30 bg-ink text-accent">
                <Wrench className="h-2.5 w-2.5" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[11px] font-medium text-frost">{r.t}</p>
                <p className="truncate text-[9.5px] text-mist">
                  {r.km} km · {r.d} · {r.tech}
                </p>
              </div>
            </motion.li>
          ))}
        </ol>
      </Panel>
    </div>
  );
}

function InventoryScreen() {
  const items: { p: string; sku: string; stock: number; min: number; tone: Tone; s: string }[] = [
    { p: "Brake pads — EBC FA252HH", sku: "BP-252", stock: 12, min: 4, tone: "emerald", s: "Healthy" },
    { p: "Oil filter — HF204", sku: "OF-204", stock: 3, min: 6, tone: "rose", s: "Below minimum" },
    { p: "10W-40 fully synthetic (1 L)", sku: "OIL-1040", stock: 28, min: 10, tone: "emerald", s: "Healthy" },
    { p: "Chain 520 · 120 links", sku: "CH-520", stock: 5, min: 4, tone: "amber", s: "Watch" },
    { p: "Spark plug — CR9EIA-9", sku: "SP-CR9", stock: 2, min: 8, tone: "rose", s: "Reorder now" },
    { p: "Air filter — HFA4707", sku: "AF-4707", stock: 9, min: 4, tone: "emerald", s: "Healthy" },
  ];
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 rounded-xl border border-rose-400/25 bg-rose-500/[0.07] px-3 py-2">
        <TriangleAlert className="h-4 w-4 shrink-0 text-rose-300" />
        <p className="text-[10.5px] text-frost">
          <span className="font-semibold">2 parts below minimum.</span>{" "}
          <span className="text-mist">Flagged before a missing part stops a job.</span>
        </p>
      </div>
      <Panel title="Stock levels" right={<span className="text-[10px] text-mist">6 of 148 shown</span>}>
        <div className="divide-y divide-white/5">
          {items.map((it, i) => (
            <motion.div
              key={it.sku}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center gap-2.5 px-3 py-2"
            >
              <div className="min-w-0 flex-1">
                <p className="truncate text-[11px] font-medium text-frost">{it.p}</p>
                <p className="truncate font-mono text-[9.5px] text-mist">{it.sku}</p>
              </div>
              <div className="hidden w-24 shrink-0 sm:block">
                <div className="h-1 overflow-hidden rounded-full bg-white/10">
                  <div
                    className={`h-full rounded-full ${
                      it.tone === "rose" ? "bg-rose-400" : it.tone === "amber" ? "bg-amber-400" : "bg-emerald-400"
                    }`}
                    style={{ width: `${Math.min(100, (it.stock / (it.min * 2.5)) * 100)}%` }}
                  />
                </div>
              </div>
              <span className="w-10 shrink-0 text-right font-display text-[12px] font-bold text-frost">
                {it.stock}
              </span>
              <Badge tone={it.tone}>{it.s}</Badge>
            </motion.div>
          ))}
        </div>
      </Panel>
    </div>
  );
}

function AIScreen() {
  const lines = [
    { role: "tech", t: "Honda CB650R, 2021. Fault code P0301, misfires at idle." },
    {
      role: "ai",
      t: "P0301 is a cylinder 1 misfire. On this engine, check in this order: (1) worn or fouled spark plug, (2) failing ignition coil, (3) restricted injector. Fastest test: swap the cylinder 1 plug with cylinder 3, clear the code, re-read. If the misfire moves with the plug, you have your answer.",
    },
    { role: "tech", t: "Misfire followed the plug. Replaced and cleared." },
  ];
  return (
    <div className="grid gap-3 lg:grid-cols-[1.5fr_1fr]">
      <div className="flex flex-col overflow-hidden rounded-xl border border-white/8 bg-white/[0.025]">
        <div className="flex items-center gap-2 border-b border-white/8 px-3 py-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-accent/15 text-accent">
            <BrainCircuit className="h-3.5 w-3.5" />
          </span>
          <p className="text-[11px] font-semibold text-frost">Diagnosis assistant</p>
          <span className="ml-auto flex items-center gap-1.5 text-[9.5px] text-mist">
            <span className="live-dot h-1.5 w-1.5 rounded-full bg-emerald-400" /> connected
          </span>
        </div>
        <div className="space-y-2.5 p-3">
          {lines.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 + i * 0.3, duration: 0.4 }}
              className={`max-w-[88%] rounded-2xl px-3 py-2 text-[10.5px] leading-relaxed ${
                m.role === "tech"
                  ? "ml-auto rounded-br-md bg-accent/85 text-white"
                  : "rounded-bl-md border border-white/8 bg-white/[0.05] text-frost"
              }`}
            >
              {m.t}
            </motion.div>
          ))}
        </div>
        <p className="mt-auto border-t border-white/8 px-3 py-2 text-[9px] text-mist">
          A decision aid for the technician — not an automatic repair decision.
        </p>
      </div>

      <div className="space-y-3">
        <Panel title="Fault code read">
          <div className="space-y-2 px-3 py-2.5">
            <div className="flex items-baseline gap-2">
              <span className="font-display font-mono text-lg font-bold text-accent">P0301</span>
              <span className="text-[10px] text-mist">cylinder 1 misfire</span>
            </div>
            {[
              { c: "Spark plug", p: 62 },
              { c: "Ignition coil", p: 24 },
              { c: "Injector", p: 14 },
            ].map((r, i) => (
              <div key={r.c}>
                <div className="mb-1 flex justify-between text-[9.5px]">
                  <span className="text-frost">{r.c}</span>
                  <span className="text-mist">check {i + 1}</span>
                </div>
                <div className="h-1 overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${r.p}%` }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.15, duration: 0.6 }}
                    className="h-full rounded-full bg-gradient-to-r from-accent/50 to-accent"
                  />
                </div>
              </div>
            ))}
          </div>
        </Panel>
        <Panel title="Attached to">
          <p className="px-3 py-2.5 text-[10px] leading-relaxed text-mist">
            Work order <span className="text-frost">#2839</span> — the analysis is stored with the job, so the
            next technician sees what was already ruled out.
          </p>
        </Panel>
      </div>
    </div>
  );
}

function TrackingScreen() {
  return (
    <div className="grid gap-3 lg:grid-cols-[1fr_1.3fr]">
      {/* Telefon cercevesi — musterinin gordugu ekran. */}
      <div className="mx-auto w-full max-w-[220px] rounded-[1.6rem] border border-white/12 bg-black/50 p-2">
        <div className="overflow-hidden rounded-[1.2rem] border border-white/8 bg-navy">
          <div className="flex items-center justify-center border-b border-white/8 py-1.5">
            <span className="h-1 w-10 rounded-full bg-white/20" />
          </div>
          <div className="space-y-2.5 p-3">
            <p className="text-[9px] uppercase tracking-widest text-mist">Your motorcycle</p>
            <p className="font-display text-[13px] font-bold text-frost">Yamaha MT-07</p>
            <p className="text-[9.5px] text-mist">06 MTF 07 · order #2840</p>
            <div className="rounded-lg border border-emerald-400/25 bg-emerald-400/10 px-2.5 py-2">
              <p className="text-[10.5px] font-semibold text-emerald-300">Ready for pickup</p>
              <p className="text-[9px] text-mist">Today, 16:40</p>
            </div>
            <ul className="space-y-1.5">
              {["Received", "Diagnosis complete", "Brake pads replaced", "Road test done", "Ready for pickup"].map(
                (t) => (
                  <li key={t} className="flex items-center gap-1.5 text-[9.5px] text-frost">
                    <span className="flex h-3 w-3 items-center justify-center rounded-full bg-emerald-400/20 text-emerald-300">
                      <Check className="h-2 w-2" />
                    </span>
                    {t}
                  </li>
                ),
              )}
            </ul>
            <div className="flex items-center gap-2 rounded-lg border border-white/8 bg-white/[0.03] px-2 py-1.5">
              <QrCode className="h-6 w-6 shrink-0 text-accent" />
              <p className="text-[8.5px] leading-tight text-mist">Scan at the counter to collect</p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <Panel title="Why this exists">
          <p className="px-3 py-2.5 text-[10.5px] leading-relaxed text-mist">
            &ldquo;Is my bike ready yet?&rdquo; is the call that interrupts a workshop all day. The rider gets a
            link instead — they can see progress themselves, and the phone stops ringing.
          </p>
        </Panel>
        <Panel title="What the workshop controls">
          <div className="divide-y divide-white/5">
            {[
              "Which stages the rider can see",
              "Whether a notification is sent when work finishes",
              "Link expires after the motorcycle is collected",
              "No login needed for the rider — no account, no password",
            ].map((t) => (
              <div key={t} className="flex items-center gap-2 px-3 py-1.5 text-[10px] text-frost">
                <Check className="h-3 w-3 shrink-0 text-accent" />
                {t}
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  );
}

const SCREENS: Record<ScreenId, () => ReactNode> = {
  dashboard: DashboardScreen,
  workorder: WorkOrderScreen,
  history: HistoryScreen,
  inventory: InventoryScreen,
  ai: AIScreen,
  tracking: TrackingScreen,
};

const SCREEN_META: Record<ScreenId, { path: string; heading: string; note: string }> = {
  dashboard: { path: "/dashboard", heading: "Today at the workshop", note: "Open jobs, bays in use and low stock on one screen." },
  workorder: { path: "/work-orders/2841", heading: "Work order #2841", note: "Jobs, parts, technician and totals in a single record." },
  history: { path: "/motorcycles/mt-07", heading: "Motorcycle file", note: "Mileage-based history that survives staff changes." },
  inventory: { path: "/inventory", heading: "Parts and stock", note: "Stock moves as parts are used on a job." },
  ai: { path: "/assistant", heading: "AI diagnosis", note: "Likely causes in a sensible order to check." },
  tracking: { path: "/t/2840", heading: "Rider tracking link", note: "What your customer sees on their own phone." },
};

/* ───────────────────────── uygulama penceresi ───────────────────────── */

export function AppWindow({
  screen,
  onScreenChange,
  interactive = true,
  compact = false,
}: {
  screen: ScreenId;
  onScreenChange?: (s: ScreenId) => void;
  interactive?: boolean;
  compact?: boolean;
}) {
  const Screen = SCREENS[screen];
  const meta = SCREEN_META[screen];

  return (
    <div className="glass-strong noise relative overflow-hidden rounded-2xl text-left shadow-2xl shadow-black/60">
      {/* pencere ust cubugu */}
      <div className="flex items-center gap-2 border-b border-white/8 bg-white/[0.03] px-3 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
        <div className="ml-2 flex min-w-0 flex-1 items-center gap-2 rounded-md bg-black/30 px-2.5 py-1">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
          <span className="truncate font-mono text-[10px] text-mist">
            panel.motofull.com.tr<span className="text-frost">{meta.path}</span>
          </span>
        </div>
        <span className="hidden shrink-0 rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[9px] text-mist sm:block">
          sample data
        </span>
      </div>

      <div className="flex">
        {/* kenar cubugu */}
        <div
          className={`hidden shrink-0 flex-col border-r border-white/8 p-2.5 ${
            compact ? "sm:flex sm:w-36" : "sm:flex sm:w-44"
          }`}
        >
          <div className="mb-3 flex items-center gap-2 px-1.5">
            <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-accent text-[10px] font-bold text-white">
              M
            </span>
            <span className="font-display text-[11px] font-bold text-frost">MotoFull</span>
          </div>
          <div className="space-y-0.5">
            {NAV.map((item) => {
              const active = item.id === screen;
              const cls = `flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-[10.5px] font-medium transition ${
                active
                  ? "bg-accent/15 text-accent-soft"
                  : `text-mist ${interactive ? "hover:bg-white/5 hover:text-frost" : ""}`
              }`;
              const inner = (
                <>
                  <item.icon className="h-3.5 w-3.5 shrink-0" />
                  <span className="truncate">{item.label}</span>
                </>
              );
              return interactive ? (
                <button key={item.id} type="button" onClick={() => onScreenChange?.(item.id)} className={cls}>
                  {inner}
                </button>
              ) : (
                <div key={item.id} className={cls}>
                  {inner}
                </div>
              );
            })}
          </div>
          <div className="my-2.5 h-px bg-white/8" />
          <div className="space-y-0.5">
            {SECONDARY_NAV.map((item) => (
              <div key={item.label} className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-[10.5px] text-mist/70">
                <item.icon className="h-3.5 w-3.5 shrink-0" />
                <span className="truncate">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* icerik */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 border-b border-white/8 px-3 py-2">
            <div className="flex min-w-0 flex-1 items-center gap-2 rounded-lg border border-white/8 bg-white/[0.03] px-2.5 py-1.5">
              <Search className="h-3 w-3 shrink-0 text-mist" />
              <span className="truncate text-[10px] text-mist">Search plate, customer or work order…</span>
            </div>
            <span className="relative hidden h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-white/8 bg-white/[0.03] text-mist sm:flex">
              <Bell className="h-3 w-3" />
              <span className="absolute -right-0.5 -top-0.5 h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
            <span className="hidden h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-accent to-accent-soft text-[9px] font-bold text-white sm:flex">
              AY
            </span>
          </div>

          <div className="p-3">
            <div className="mb-3 flex items-end justify-between gap-3">
              <div className="min-w-0">
                <h4 className="truncate font-display text-[13px] font-bold text-frost">{meta.heading}</h4>
                <p className="truncate text-[10px] text-mist">{meta.note}</p>
              </div>
              <span className="hidden shrink-0 items-center gap-1.5 rounded-full border border-accent/25 bg-accent/10 px-2 py-0.5 text-[9px] font-semibold text-accent-soft lg:flex">
                <Sparkles className="h-2.5 w-2.5" /> live panel
              </span>
            </div>

            {/* AnimatePresence mode="wait" KULLANILMIYOR.
                Kullanilsaydi yeni ekran, eskisinin CIKIS animasyonu
                bitene kadar baglanmazdi; animasyon karesi gelmeyen bir
                durumda (sekme arka planda, sayfa donmus) baslik yeni
                ekrani soylerken govde eski ekranda kalir. Bu gercekten
                yasandi ve dogrulandi. `key` degisince React zaten
                yeniden baglar; giris animasyonu tek basina yeterli. */}
            <motion.div
              key={screen}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <Screen />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Ekranlar arasinda kendi kendine gecen, kullanici dokununca duran gezinti.
 */
export function ProductTour() {
  const [screen, setScreen] = useState<ScreenId>("dashboard");
  const [auto, setAuto] = useState(true);
  const idx = useRef(0);

  useEffect(() => {
    if (!auto) return;
    const t = setInterval(() => {
      idx.current = (idx.current + 1) % NAV.length;
      setScreen(NAV[idx.current].id);
    }, 5200);
    return () => clearInterval(t);
  }, [auto]);

  const pick = (s: ScreenId) => {
    setAuto(false);
    idx.current = NAV.findIndex((n) => n.id === s);
    setScreen(s);
  };

  return (
    <div>
      <div className="mb-5 flex flex-wrap justify-center gap-2">
        {NAV.map((n) => {
          const active = n.id === screen;
          return (
            <button
              key={n.id}
              type="button"
              onClick={() => pick(n.id)}
              aria-pressed={active}
              className={`relative flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition sm:text-sm ${
                active ? "bg-accent text-white shadow-lg shadow-accent/25" : "glass text-mist hover:text-frost"
              }`}
            >
              <n.icon className="h-3.5 w-3.5" />
              {n.label}
              {active && auto && (
                <motion.span
                  className="absolute inset-x-3 bottom-1 h-0.5 origin-left rounded-full bg-white/60"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 5.2, ease: "linear" }}
                />
              )}
            </button>
          );
        })}
      </div>

      <div onMouseEnter={() => setAuto(false)}>
        <AppWindow screen={screen} onScreenChange={pick} />
      </div>

      <p className="mt-4 text-center text-xs text-mist">
        These are the panel&apos;s own screens, filled with sample workshop data — not stock photography.
      </p>
    </div>
  );
}
