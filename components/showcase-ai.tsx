"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Brain, Gauge, ShieldCheck, Timer, Zap } from "lucide-react";
import { useRef } from "react";
import { useDemo } from "./demo-modal";
import { DashboardMockup } from "./dashboard-mockup";
import { Reveal, SectionHeading } from "./ui";

/* --- Laptop dashboard showcase with scroll parallax --- */
export function DashboardShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const rotateX = useTransform(scrollYProgress, [0, 0.45], [16, 0]);
  const y = useTransform(scrollYProgress, [0, 0.45], [60, 0]);

  return (
    <section id="panel" className="relative overflow-hidden py-24 sm:py-32">
      <div
        className="absolute left-1/2 top-24 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-electric/10 blur-[150px]"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          eyebrow="The panel"
          title={
            <>
              Built to be used <span className="text-gradient-blue">during a busy day</span>
            </>
          }
          subtitle="No buried menus. The screens a workshop actually needs, reachable while the bike is on the lift."
        />

        <div ref={ref} className="mt-16" style={{ perspective: "1200px" }}>
          <motion.div style={{ rotateX, y }} className="mx-auto max-w-5xl will-change-transform">
            {/* laptop frame */}
            <div className="rounded-t-3xl border border-white/10 bg-gradient-to-b from-slate-700/60 to-slate-900/80 p-2.5 sm:p-4">
              <DashboardMockup />
            </div>
            <div className="mx-auto h-4 w-full max-w-5xl rounded-b-2xl bg-gradient-to-b from-slate-600/70 to-slate-800/70" />
            <div className="mx-auto h-1.5 w-40 rounded-b-xl bg-slate-700/60" />
          </motion.div>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-3">
          {[
            { icon: Zap, title: "Quick to open", desc: "Screens load fast enough to use between jobs, not after them." },
            { icon: Gauge, title: "The day at a glance", desc: "Open jobs, work in progress and low stock on one screen." },
            { icon: ShieldCheck, title: "Your data stays yours", desc: "Encrypted connection, regular backups, and strict separation between workshops." },
          ].map((f, i) => (
            <Reveal key={f.title} delay={i * 0.08}>
              <div className="glass card-hover h-full rounded-2xl p-6 text-center">
                <span className="mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-electric/12 text-electric">
                  <f.icon className="h-5 w-5" />
                </span>
                <h3 className="mb-1.5 font-display font-semibold text-frost">{f.title}</h3>
                <p className="text-sm text-mist">{f.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --- AI section --- */
const aiChat = [
  { role: "user", text: "Honda CB650R throwing a P0301. It misfires at idle." },
  {
    role: "ai",
    text: "P0301 is a cylinder 1 misfire. On this engine the usual order to check is: (1) worn spark plug, (2) failing ignition coil, (3) blocked injector. Swap the cylinder 1 plug with cylinder 3, clear the code and re-read it — if the misfire follows the plug, you have your answer.",
  },
  { role: "user", text: "Plug replaced, code cleared. Thanks!" },
];

export function AISection() {
  const { open } = useDemo();

  return (
    <section id="ai" className="relative overflow-hidden py-24 sm:py-32">
      <div
        className="absolute right-[-120px] top-1/3 h-[420px] w-[420px] rounded-full bg-accent/12 blur-[140px]"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div>
            <SectionHeading
              align="left"
              eyebrow="AI assistance"
              title={
                <>
                  A second opinion for <span className="text-gradient">the technician</span>
                </>
              }
              subtitle="MotoFull reads fault codes and complaints against make and model specific knowledge, then suggests where to look first. It does not replace the technician's judgement — it shortens the search."
            />
            <ul className="mt-8 space-y-4">
              {[
                { icon: Timer, title: "Faster first check", desc: "Likely causes in a sensible order, instead of starting from scratch." },
                { icon: ShieldCheck, title: "Fewer parts swapped blindly", desc: "Checking in the right order avoids replacing parts that were never faulty." },
                { icon: Brain, title: "Useful on unfamiliar models", desc: "Most valuable on the bikes your workshop sees only once or twice a year." },
              ].map((b) => (
                <li key={b.title} className="flex gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/12 text-accent">
                    <b.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-semibold text-frost">{b.title}</h3>
                    <p className="text-sm text-mist">{b.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
            <button
              onClick={open}
              className="mt-9 rounded-2xl bg-accent px-7 py-3.5 font-semibold text-white transition hover:bg-accent-soft glow-orange"
            >
              See how it works
            </button>
          </div>

          {/* chat mock */}
          <Reveal>
            <div className="glass-strong rounded-3xl p-6 sm:p-8">
              <div className="mb-5 flex items-center gap-3 border-b border-white/8 pb-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/15 text-accent">
                  <Brain className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-display font-semibold text-frost">MotoFull AI assistant</p>
                  <p className="flex items-center gap-1.5 text-xs text-mist">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Online
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                {aiChat.map((m, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.25, duration: 0.5 }}
                    className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                      m.role === "user"
                        ? "ml-auto rounded-br-md bg-accent/90 text-white"
                        : "rounded-bl-md border border-white/8 bg-white/[0.05] text-frost"
                    }`}
                  >
                    {m.text}
                  </motion.div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
