"use client";

/**
 * trust.tsx — "Bu gercek bir sirket, gercek bir urun" bolumu.
 *
 * NEDEN: Onceki surumde bu bosluk 15 KURGUSAL musteri gorusuyle
 * doldurulmustu (Manchester'dan James, Stuttgart'tan Andrea...). Kart
 * uzerinde "Demo Example" yazsa bile, uydurma isim ve sehirlerle dolu
 * bir referans duvari ziyaretciye "dolandirici" hissi verir — kullanici
 * bunu acikca soyledi. O bolum KALDIRILDI.
 *
 * Yerine gecen sey daha guclu: uydurulamayacak seyler. Yasal unvan,
 * calisan alan adlari, urunun gercekten yaptigi/yapmadigi isler ve
 * "sahte yorum yayinlamiyoruz" taahhudu.
 *
 * BURAYA ASLA: dogrulanmamis musteri sayisi, memnuniyet yuzdesi,
 * uydurma referans, "1000+ atolye bize guveniyor" turu ifade.
 */

import { motion } from "framer-motion";
import {
  BadgeCheck,
  Database,
  FileText,
  Globe2,
  Lock,
  MessageSquareOff,
  Scale,
  ServerCog,
  ShieldCheck,
} from "lucide-react";
import { company, isFilled } from "@/lib/company";
import { Reveal, SectionHeading } from "./ui";

/* Uydurulamayacak, dogrulanabilir gercekler. */
const facts = [
  {
    icon: Scale,
    label: "Legal entity",
    value: company.legalName,
    note: "A registered company, not an anonymous landing page.",
  },
  {
    icon: Globe2,
    label: "Where the product lives",
    value: "panel.motofull.com.tr",
    note: "The working panel is online right now — the demo signs you into it.",
  },
  {
    icon: FileText,
    label: "Published legal terms",
    value: "Terms, privacy, KVKK, distance sales, refunds",
    note: "All linked in the footer, all readable before you pay anything.",
  },
  {
    icon: BadgeCheck,
    label: "How you can check us",
    value: company.email,
    note: "Written questions get written answers. Ask before you commit.",
  },
];

/* Guvenlik/veri tarafi — somut, kontrol edilebilir ifadeler. */
const safeguards = [
  {
    icon: Lock,
    title: "Encrypted in transit",
    desc: "Every connection to the panel runs over HTTPS. No workshop data travels in the clear.",
  },
  {
    icon: Database,
    title: "One tenant, one wall",
    desc: "Each workshop is a separate tenant. A query scoped to your workshop cannot reach another one's records.",
  },
  {
    icon: ServerCog,
    title: "Backed up, not improvised",
    desc: "Records are backed up regularly, so a broken laptop at the counter is not a lost service history.",
  },
  {
    icon: ShieldCheck,
    title: "Your data is yours",
    desc: "Cancel and your records are not held hostage. We do not sell workshop or customer data to anyone.",
  },
];

/* Ne SOYLEMEDIGIMIZ — iddiayi daraltmak, en guclu guven sinyalidir. */
const honesty = [
  {
    no: "We do not publish customer testimonials we cannot prove.",
    yes: "When real workshops agree to be named, their words go here — with their name on them.",
  },
  {
    no: "We do not quote success percentages or time savings.",
    yes: "You will not find a “saves 40% of admin time” claim anywhere on this site, because nobody measured it.",
  },
  {
    no: "The AI assistant does not decide repairs.",
    yes: "It suggests where to look first. The technician decides — and that is written on the screen too.",
  },
  {
    no: "We do not ask for a card to start.",
    yes: "The demo runs without payment details, so there is nothing to cancel if you walk away.",
  },
];

export function Trust() {
  const showLegalName = isFilled(company.legalName);

  return (
    <section id="guven" className="relative overflow-hidden py-24 sm:py-32">
      <div className="aurora aurora-slow left-[-10%] top-1/4 h-[420px] w-[520px] bg-electric/10" aria-hidden="true" />
      <div className="aurora right-[-8%] top-1/2 h-[380px] w-[460px] bg-accent/10" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          eyebrow="Who is behind this"
          title={
            <>
              A real company shipping <span className="text-gradient">a real product</span>
            </>
          }
          subtitle="Software sold to a workshop should be checkable before it is trusted. So here is everything you can verify about us without taking our word for it."
        />

        {/* Dogrulanabilir gercekler seridi */}
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {facts.map((f, i) => (
            <Reveal key={f.label} delay={i * 0.07}>
              <div className="glass card-hover sheen h-full rounded-2xl p-6">
                <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-accent/12 text-accent">
                  <f.icon className="h-5 w-5" />
                </span>
                <p className="text-[11px] font-semibold uppercase tracking-widest text-mist">{f.label}</p>
                <p className="mt-1.5 break-words font-display text-base font-bold leading-snug text-frost">
                  {f.label === "Legal entity" && !showLegalName ? "Registered company" : f.value}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-mist">{f.note}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Durustluk sozlesmesi — yapmadiklarimiz / karsiligi */}
        <Reveal>
          <div className="mt-12 overflow-hidden rounded-3xl border border-accent/25 bg-accent/[0.05]">
            <div className="flex items-center gap-3 border-b border-accent/20 px-6 py-5 sm:px-8">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent">
                <MessageSquareOff className="h-5 w-5" />
              </span>
              <div>
                <h3 className="font-display text-lg font-bold text-frost">What you will not find on this site</h3>
                <p className="text-sm text-mist">
                  The claims we refuse to make are the reason you can trust the ones we do.
                </p>
              </div>
            </div>

            <div className="grid gap-px bg-white/8 sm:grid-cols-2">
              {honesty.map((h, i) => (
                <motion.div
                  key={h.no}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ delay: i * 0.06, duration: 0.5 }}
                  className="bg-ink/60 p-6 sm:p-7"
                >
                  <p className="font-display text-[15px] font-semibold leading-snug text-frost">{h.no}</p>
                  <p className="mt-2.5 text-sm leading-relaxed text-mist">{h.yes}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Guvenlik */}
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {safeguards.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.06}>
              <div className="glass card-hover h-full rounded-2xl p-6">
                <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-400/12 text-emerald-300">
                  <s.icon className="h-5 w-5" />
                </span>
                <h3 className="mb-2 font-display text-lg font-semibold text-frost">{s.title}</h3>
                <p className="text-sm leading-relaxed text-mist">{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
