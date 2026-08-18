"use client";

import {
  Bike,
  Boxes,
  Building2,
  Check,
  ClipboardList,
  Cloud,
  FileBarChart,
  QrCode,
  Sparkles,
  Users,
} from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal, SectionHeading } from "./ui";

const features = [
  {
    id: "musteri",
    icon: Users,
    tab: "Customers",
    title: "Customer management",
    desc: "Every customer, their contact details and their motorcycles on one screen. Find a returning rider in seconds.",
    benefits: ["Search by plate, name or phone", "Unlimited motorcycles per customer", "Contact history and notes"],
    preview: { title: "Customer record", lines: ["Sample customer · +•• ••• •• ••", "2 motorcycles · 14 service records", "Last visit: 12 July 2026"] },
  },
  {
    id: "isemri",
    icon: ClipboardList,
    tab: "Work orders",
    title: "Work orders",
    desc: "A digital work order for every motorcycle taken in. Status, technician, parts and labour in a single record.",
    benefits: ["Status flow: Received → In service → Ready", "Parts and labour totalled automatically", "One-click PDF service sheet"],
    preview: { title: "Work order #2841", lines: ["Honda CB650R · AB-12-CD", "Scheduled service + brake pads", "Technician assigned · In service"] },
  },
  {
    id: "arac",
    icon: Bike,
    tab: "History",
    title: "Motorcycle and service history",
    desc: "A full mileage-based history for every motorcycle, so you can see what was done and when — years later.",
    benefits: ["Make, model and year from the catalogue", "Mileage-based service timeline", "Warranty coverage tracking"],
    preview: { title: "Yamaha MT-07 · 2023", lines: ["24,350 km · 8 service records", "Last job: chain and sprocket set", "Next service due: 28,000 km"] },
  },
  {
    id: "stok",
    icon: Boxes,
    tab: "Inventory",
    title: "Parts and inventory",
    desc: "Stock moves as parts are used. Low levels are flagged before a missing part stops a job.",
    benefits: ["Parts on a work order come off stock", "Low-stock warnings", "Supplier and cost tracking"],
    preview: { title: "Stock levels", lines: ["Brake pads (EBC) · 12 in stock", "Oil filter (HF204) · 3 left ⚠", "10W-40 engine oil · 28 litres"] },
  },
  {
    id: "ai",
    icon: Sparkles,
    tab: "AI diagnosis",
    title: "AI diagnosis assistant",
    desc: "Enter a fault code or a complaint and get likely causes for that make and model, in a sensible order to check.",
    benefits: ["OBD fault-code analysis", "Make-specific knowledge base", "A decision aid, not a replacement"],
    preview: { title: "AI analysis · P0301", lines: ["Cylinder 1 misfire", "Likely: spark plug, coil, injector", "Suggested check order ready"] },
  },
  {
    id: "rapor",
    icon: FileBarChart,
    tab: "Reports",
    title: "Reports and analysis",
    desc: "Job volume, technician workload and the parts you use most — so month-end is not rebuilt from receipts.",
    benefits: ["Daily and monthly overview", "Workload by technician", "Export to PDF and Excel"],
    preview: { title: "Monthly summary", lines: ["Completed jobs: 96", "Average turnaround: 1.8 days", "Busiest service: scheduled maintenance"] },
  },
  {
    id: "qr",
    icon: QrCode,
    tab: "Tracking",
    title: "Customer status tracking",
    desc: "A tracking link for every motorcycle in the workshop, so the rider can check progress from their own phone.",
    benefits: ["Fewer status phone calls", "Visible progress builds trust", "Notification when the bike is ready"],
    preview: { title: "What the rider sees", lines: ["AB-12-CD · In service", "Brake pads replaced ✓", "Estimated ready: today 17:00"] },
  },
  {
    id: "sube",
    icon: Building2,
    tab: "Multi-location",
    title: "Multiple locations",
    desc: "One workshop or ten. Data is reachable from any device, and each location's records stay separate.",
    benefits: ["Separate tenant per business", "Per-location permissions", "Automatic backup and sync"],
    preview: { title: "Across locations", lines: ["Location A · 14 open work orders", "Location B · 9 open work orders", "Combined view for the owner"] },
  },
];

export function Features() {
  const [active, setActive] = useState(features[0]);

  return (
    <section id="ozellikler" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          eyebrow="Modules"
          title={
            <>
              Everything a workshop <span className="text-gradient">actually runs on</span>
            </>
          }
          subtitle="Each module covers one part of the working day. They share the same customer and motorcycle records, so nothing has to be entered twice."
        />

        {/* tabs */}
        <Reveal className="mt-12">
          <div className="flex flex-wrap justify-center gap-2" role="tablist" aria-label="Feature modules">
            {features.map((f) => (
              <button
                key={f.id}
                role="tab"
                aria-selected={active.id === f.id}
                onClick={() => setActive(f)}
                className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition ${
                  active.id === f.id
                    ? "bg-accent text-white glow-orange"
                    : "glass text-mist hover:text-frost"
                }`}
              >
                <f.icon className="h-4 w-4" />
                {f.tab}
              </button>
            ))}
          </div>
        </Reveal>

        {/* active feature */}
        <div className="mt-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="glass grid items-center gap-10 rounded-3xl p-8 sm:p-12 lg:grid-cols-2"
            >
              <div>
                <span className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/12 text-accent">
                  <active.icon className="h-7 w-7" />
                </span>
                <h3 className="mb-3 font-display text-2xl font-bold text-frost sm:text-3xl">
                  {active.title}
                </h3>
                <p className="mb-6 text-lg leading-relaxed text-mist">{active.desc}</p>
                <ul className="space-y-3">
                  {active.benefits.map((b) => (
                    <li key={b} className="flex items-start gap-3 text-frost">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/15">
                        <Check className="h-3.5 w-3.5 text-accent" />
                      </span>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>

              {/* mini preview card */}
              <div className="relative">
                <div className="absolute inset-6 rounded-3xl bg-accent/15 blur-2xl" aria-hidden="true" />
                <div className="glass-strong relative rounded-2xl p-6">
                  <div className="mb-4 flex items-center justify-between border-b border-white/8 pb-3">
                    <p className="font-display font-semibold text-frost">{active.preview.title}</p>
                    <span className="rounded-full bg-accent/15 px-2.5 py-1 text-[10px] font-semibold text-accent-soft">
                      MotoFull
                    </span>
                  </div>
                  <ul className="space-y-3">
                    {active.preview.lines.map((l) => (
                      <li
                        key={l}
                        className="rounded-xl border border-white/6 bg-white/[0.03] px-4 py-3 text-sm text-mist"
                      >
                        {l}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
