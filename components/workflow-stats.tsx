"use client";

import {
  Bike,
  Boxes,
  CalendarClock,
  CheckCircle2,
  ClipboardList,
  MessageCircle,
  Receipt,
  UserCheck,
  Wrench,
  X,
  Check,
} from "lucide-react";
import { Counter, Reveal, SectionHeading } from "./ui";

/* --- Workflow timeline --- */
const steps = [
  { icon: Bike, title: "The rider arrives", desc: "Search the plate and the full history is already on screen." },
  { icon: ClipboardList, title: "Work order opened", desc: "Complaint and planned jobs recorded in seconds, not retyped." },
  { icon: UserCheck, title: "Technician assigned", desc: "The job appears on the right technician's list." },
  { icon: Wrench, title: "Work is carried out", desc: "With previous service context and AI-assisted diagnosis at hand." },
  { icon: Boxes, title: "Inventory updated", desc: "Parts used on the job come off stock automatically." },
  { icon: MessageCircle, title: "Customer informed", desc: "The rider can follow the status instead of calling to ask." },
  { icon: Receipt, title: "Invoice produced", desc: "Parts and labour totalled into a PDF in one step." },
  { icon: CheckCircle2, title: "Service completed", desc: "The job is written into that motorcycle's permanent history." },
  { icon: CalendarClock, title: "Next service scheduled", desc: "The follow-up is reminded instead of quietly forgotten." },
];

export function Workflow() {
  return (
    <section id="surec" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          eyebrow="How it works"
          title={
            <>
              From arrival to <span className="text-gradient">the next service</span>
            </>
          }
          subtitle="How one job moves through MotoFull, from the moment the motorcycle arrives to the reminder that brings the rider back."
        />
        <div className="relative mx-auto mt-16 max-w-3xl">
          <div
            className="absolute bottom-4 left-[27px] top-4 w-px bg-gradient-to-b from-accent via-accent/40 to-transparent"
            aria-hidden="true"
          />
          <ol className="space-y-8">
            {steps.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.04}>
                <li className="relative flex items-start gap-5 pl-0">
                  <span className="glass relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-accent">
                    <s.icon className="h-6 w-6" />
                  </span>
                  <div className="glass card-hover flex-1 rounded-2xl px-6 py-4">
                    <p className="text-xs font-semibold uppercase tracking-widest text-accent-soft">
                      Step {i + 1}
                    </p>
                    <h3 className="mt-1 font-display text-lg font-semibold text-frost">{s.title}</h3>
                    <p className="mt-1 text-sm text-mist">{s.desc}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* --- Before / After --- */
const before = [
  "Records spread across notebooks",
  "Riders phone in to ask for status",
  "Follow-up services get forgotten",
  "Stock counted by hand, often wrong",
  "Month-end numbers rebuilt from receipts",
  "No warranty record, plenty of argument",
];
const after = [
  "Every record searchable in one place",
  "Riders check status from a tracking link",
  "The next service is scheduled and reminded",
  "Stock updates as parts are used",
  "Monthly figures available on one screen",
  "Full digital history, no disputes",
];

export function BeforeAfter() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          eyebrow="Before and after"
          title={
            <>
              What actually changes <span className="text-gradient">on the floor</span>
            </>
          }
          subtitle="The difference is not the software itself — it is how the working day runs."
        />
        <div className="mx-auto mt-14 grid max-w-4xl gap-6 md:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-3xl border border-red-500/20 bg-red-500/[0.04] p-8">
              <h3 className="mb-6 font-display text-xl font-bold text-red-300">Without MotoFull</h3>
              <ul className="space-y-4">
                {before.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-mist">
                    <X className="mt-0.5 h-5 w-5 shrink-0 text-red-400" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="glow-orange h-full rounded-3xl border border-accent/30 bg-accent/[0.06] p-8">
              <h3 className="mb-6 font-display text-xl font-bold text-accent-soft">With MotoFull</h3>
              <ul className="space-y-4">
                {after.map((a) => (
                  <li key={a} className="flex items-start gap-3 text-frost">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* KALDIRILDI — DOGRULANMAMIS IDDIA: Stats.
   Kanitlanamayan istatistik/musteri iddiasi yayinlanmaz. */
