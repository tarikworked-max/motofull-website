"use client";

import {
  AlertTriangle,
  BellOff,
  BookX,
  Boxes,
  Brain,
  CalendarClock,
  ClipboardList,
  Clock,
  FileWarning,
  MessageSquareOff,
  PackageSearch,
  QrCode,
  ShieldCheck,
  UserX,
} from "lucide-react";
import { Reveal, SectionHeading } from "./ui";

/* --- Trusted-by marquee --- */
/* KALDIRILDI — DOGRULANMAMIS IDDIA: TrustedBy.
   Kanitlanamayan istatistik/musteri iddiasi yayinlanmaz. */

/* --- Problem section --- */
const problems = [
  { icon: BookX, title: "Paper job cards", desc: "Records tear, go missing, and nobody can reconstruct what was done six months ago." },
  { icon: UserX, title: "Details retyped every visit", desc: "The phone number is on one note, the plate in another book, and the counter asks for both again." },
  { icon: CalendarClock, title: "Forgotten follow-ups", desc: "Nobody reminds the rider the next service is due, so it happens somewhere else." },
  { icon: PackageSearch, title: "Disconnected inventory", desc: "How many of that part are left? Nobody is sure, so the order is always late." },
  { icon: MessageSquareOff, title: "\"Is my bike ready yet?\"", desc: "The same phone call interrupts the workshop all day long." },
  { icon: FileWarning, title: "Warranty disputes", desc: "Which job was under warranty? No document, plenty of argument." },
  { icon: Clock, title: "Time lost to paperwork", desc: "Hours go into admin instead of the actual repair work." },
  { icon: AlertTriangle, title: "Human error", desc: "Wrong part, skipped step, forgotten promise — each one costs trust." },
];

export function Problem() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          eyebrow="The problem"
          title={
            <>
              Does this sound like <span className="text-gradient">your workshop</span>?
            </>
          }
          subtitle="Most motorcycle workshops still run on paper, memory and scattered messages. The cost is quiet: details retyped, follow-ups missed, and jobs nobody can reconstruct later."
        />
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {problems.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.05}>
              <div className="card-hover glass h-full rounded-2xl p-6">
                <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-red-500/10 text-red-400">
                  <p.icon className="h-5 w-5" />
                </span>
                <h3 className="mb-2 font-display text-lg font-semibold text-frost">{p.title}</h3>
                <p className="text-sm leading-relaxed text-mist">{p.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --- Solution section --- */
const solutions = [
  { icon: ClipboardList, title: "Digital work orders", desc: "Every job records who did what and when, so the sheet is ready before the rider sits down." },
  { icon: Brain, title: "AI-assisted diagnosis", desc: "Enter a fault code and get likely causes in a suggested check order — a starting point, not a verdict." },
  { icon: Boxes, title: "Connected inventory", desc: "Parts added to a work order come off stock automatically, and low stock is flagged before it stops a job." },
  { icon: BellOff, title: "Maintenance reminders", desc: "The next service is scheduled and the rider reminded, instead of quietly lost." },
  { icon: QrCode, title: "Customer status tracking", desc: "A public tracking link lets riders check status themselves — the interruption calls stop." },
  { icon: ShieldCheck, title: "Full service history", desc: "Every past job stays attached to the motorcycle, so the next technician starts with context." },
];

export function Solution() {
  return (
    <section className="relative py-24 sm:py-32">
      <div
        className="absolute left-1/2 top-1/2 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/8 blur-[160px]"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          eyebrow="The solution"
          title={
            <>
              One answer to each of them, <span className="text-gradient">in one panel</span>
            </>
          }
          subtitle="Each problem above has a direct answer in MotoFull — and a practical result on the workshop floor."
        />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {solutions.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.06}>
              <div className="card-hover glass group h-full rounded-2xl p-7">
                <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/12 text-accent transition group-hover:scale-110 group-hover:bg-accent/20">
                  <s.icon className="h-6 w-6" />
                </span>
                <h3 className="mb-2.5 font-display text-xl font-semibold text-frost">{s.title}</h3>
                <p className="leading-relaxed text-mist">{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
