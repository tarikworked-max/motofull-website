"use client";

import { Mail, MapPin, MessageCircle, Phone, Send } from "lucide-react";
import { useState } from "react";
import { useDemo } from "./demo-modal";
import { Logo, Reveal, SectionHeading } from "./ui";
import { company } from "@/lib/company";
import { TRIAL_DAYS } from "@/lib/pricing";

/* --- Contact --- */
/**
 * Contact
 *
 * ONEMLI: Bu form ONCEDEN hicbir yere gondermiyordu; onSubmit yalnizca
 * setSent(true) yapiyor ve ziyaretciye "mesajiniz iletildi" deniyordu.
 * Yani gelen her talep sessizce kayboluyordu.
 *
 * Simdi backend'deki MEVCUT uc noktaya gonderiyor:
 *   POST {NEXT_PUBLIC_API_URL}/api/public/contact
 * (IP basina saatte 5 istek sinirli, sunucu tarafinda dogrulanip
 *  ContactRequest olarak kaydediliyor — yeni altyapi eklenmedi.)
 *
 * API adresi tanimli degilse form BASARILI GORUNMEZ; ziyaretciye
 * dogrudan e-posta adresi gosterilir. Ulasmayan bir mesaji
 * "iletildi" diye gostermek kabul edilemez.
 */
export function Contact() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const sent = status === 'sent';

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const fullName = String(fd.get('name') || '').trim();
    const phone = String(fd.get('phone') || '').trim();
    const email = String(fd.get('email') || '').trim();
    const workshop = String(fd.get('workshop') || '').trim();
    const message = String(fd.get('message') || '').trim();

    if (!apiUrl) {
      setStatus('error');
      setErrorMsg(
        'The contact form is not connected yet. Please email us directly at ' + company.email + '.'
      );
      return;
    }

    setStatus('sending');
    try {
      const res = await fetch(apiUrl.replace(/\/+$/, '') + '/api/public/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          phone,
          email,
          subject: workshop ? 'Website enquiry — ' + workshop : 'Website enquiry',
          message,
          requestType: 'demo',
          audience: 'servis',
          source: 'website',
          landingPath: typeof window !== 'undefined' ? window.location.pathname : '/',
        }),
      });

      if (res.ok) {
        setStatus('sent');
        return;
      }

      const data = await res.json().catch(() => null);
      setStatus('error');
      setErrorMsg(
        res.status === 429
          ? 'Too many requests from this connection. Please try again later, or email us at ' + company.email + '.'
          : (data && data.message) || 'We could not send your message. Please email us at ' + company.email + '.'
      );
    } catch {
      setStatus('error');
      setErrorMsg('We could not reach the server. Please email us at ' + company.email + '.');
    }
  }

  return (
    <section id="iletisim" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          eyebrow="Contact"
          title={
            <>
              Tell us about <span className="text-gradient">your workshop</span>
            </>
          }
          subtitle="Send us a few details and we will get back to you within one business day."
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-5">
          {/* form */}
          <Reveal className="lg:col-span-3">
            <div className="glass-strong rounded-3xl p-8">
              {sent ? (
                <div className="flex flex-col items-center gap-3 py-16 text-center">
                  <Send className="h-12 w-12 text-accent" />
                  <h3 className="font-display text-2xl font-bold text-frost">Message sent</h3>
                  <p className="text-mist">We will get back to you within one business day.</p>
                </div>
              ) : (
                <form className="grid gap-5 sm:grid-cols-2" onSubmit={handleSubmit}>
                  <label className="flex flex-col gap-1.5 text-sm font-medium text-frost">
                    Full name
                    <input required name="name" placeholder="Your name"
                      className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-frost placeholder:text-mist/50 outline-none transition focus:border-accent/60 focus:ring-2 focus:ring-accent/20" />
                  </label>
                  <label className="flex flex-col gap-1.5 text-sm font-medium text-frost">
                    Workshop name
                    <input required name="workshop" placeholder="Your workshop"
                      className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-frost placeholder:text-mist/50 outline-none transition focus:border-accent/60 focus:ring-2 focus:ring-accent/20" />
                  </label>
                  <label className="flex flex-col gap-1.5 text-sm font-medium text-frost">
                    Phone
                    <input required type="tel" name="phone" placeholder="+00 000 000 0000"
                      className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-frost placeholder:text-mist/50 outline-none transition focus:border-accent/60 focus:ring-2 focus:ring-accent/20" />
                  </label>
                  <label className="flex flex-col gap-1.5 text-sm font-medium text-frost">
                    Email
                    <input type="email" name="email" placeholder="you@workshop.com"
                      className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-frost placeholder:text-mist/50 outline-none transition focus:border-accent/60 focus:ring-2 focus:ring-accent/20" />
                  </label>
                  <label className="flex flex-col gap-1.5 text-sm font-medium text-frost sm:col-span-2">
                    Message
                    <textarea name="message" rows={4} placeholder="Tell us briefly about your workshop and what you need."
                      className="resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-frost placeholder:text-mist/50 outline-none transition focus:border-accent/60 focus:ring-2 focus:ring-accent/20" />
                  </label>
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="rounded-xl bg-accent px-8 py-3.5 font-semibold text-white transition hover:bg-accent-soft glow-orange disabled:cursor-not-allowed disabled:opacity-60 sm:col-span-2"
                  >
                    {status === 'sending' ? 'Sending…' : 'Send message'}
                  </button>
                  {status === 'error' && (
                    <p role="alert" className="text-sm text-red-300 sm:col-span-2">
                      {errorMsg}
                    </p>
                  )}
                </form>
              )}
            </div>
          </Reveal>

          {/* info */}
          <Reveal delay={0.1} className="lg:col-span-2">
            <div className="flex h-full flex-col gap-4">
              {[
                { icon: Phone, label: "Phone", value: company.phone },
                { icon: MessageCircle, label: "WhatsApp", value: company.phone },
                { icon: Mail, label: "Email", value: company.email },
              ].map((c) => (
                <div key={c.label} className="glass card-hover flex items-center gap-4 rounded-2xl p-5">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/12 text-accent">
                    <c.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-mist">{c.label}</p>
                    <p className="font-semibold text-frost">{c.value}</p>
                  </div>
                </div>
              ))}
              {/* map placeholder */}
              <div className="glass relative flex-1 overflow-hidden rounded-2xl min-h-[180px]">
                <div className="grid-bg absolute inset-0" aria-hidden="true" />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-center">
                  <MapPin className="h-8 w-8 text-accent" />
                  <p className="font-semibold text-frost">Serving workshops worldwide</p>
                  <p className="text-xs text-mist">Remote onboarding and support</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* --- Footer ---
   Bağlantıların tamamı gerçek bir hedefe gider. Önceden hepsi href="#"
   idi; ölü yasal bağlantı, ödeme alan bir sitede uyum sorunudur —
   tüketicinin sözleşmeye ulaşabilmesi zorunludur. Var olmayan sayfalar
   (blog, kariyer, basın kiti) listeden çıkarıldı; yokken listelemek
   ölü bağlantıdan daha kötü. */
const footerCols = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "/#ozellikler" },
      { label: "AI diagnosis", href: "/#ai" },
      { label: "The panel", href: "/#panel" },
      { label: "How it works", href: "/#surec" },
      { label: "Plans", href: "/#fiyatlar" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Contact", href: "/#iletisim" },
      { label: "FAQ", href: "/#sss" },
      { label: "Workshop panel login", href: "https://panel.motofull.com.tr" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy notice (KVKK, Turkish)", href: "/kvkk" },
      { label: "Privacy Policy (EN)", href: "/privacy" },
      { label: "Terms of use (Turkish)", href: "/kullanim-sartlari" },
      { label: "Distance sales agreement (Turkish)", href: "/mesafeli-satis" },
      { label: "Refunds and withdrawal (Turkish)", href: "/iade-ve-cayma" },
      { label: "Cookie policy (Turkish)", href: "/cerez-politikasi" },
      { label: "Sub-processors (Turkish)", href: "/alt-isleyiciler" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-navy/60">
      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Logo />
            <p className="mt-4 max-w-sm leading-relaxed text-mist">
              Workshop management software for motorcycle service businesses — customer
              records, service history and parts in one place.
            </p>
            <div className="mt-6 flex gap-3">
              {/* Yalnızca adresi girilmiş hesaplar gösterilir */}
              {([
                ["X", company.social.x],
                ["in", company.social.linkedin],
                ["ig", company.social.instagram],
                ["yt", company.social.youtube],
              ] as const)
                .filter(([, href]) => !!href)
                .map(([s, href]) => (
                <a
                  key={s}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Sosyal medya: ${s}`}
                  className="glass flex h-10 w-10 items-center justify-center rounded-xl text-sm font-bold text-mist transition hover:border-accent/40 hover:text-accent"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>
          {footerCols.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h3 className="mb-4 font-display font-semibold text-frost">{col.title}</h3>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className="text-sm text-mist transition hover:text-accent-soft">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 sm:flex-row">
          <p className="text-sm text-mist">
            © {new Date().getFullYear()} {company.legalName}. All rights reserved.
          </p>
          <p className="text-xs text-mist/60">Built for motorcycle service businesses.</p>
        </div>
      </div>
    </footer>
  );
}

/* --- Sticky mobile CTA --- */
export function StickyCTA() {
  const { open } = useDemo();
  return (
    <div className="glass-strong fixed inset-x-0 bottom-0 z-[70] border-t border-white/10 p-3 lg:hidden">
      <a
        href={company.panelUrl + '/hesap/kayit?plan=demo'}
        className="block w-full rounded-xl bg-accent py-3.5 text-center font-semibold text-white glow-orange"
      >
        {`Start ${TRIAL_DAYS}-day demo`}
      </a>
    </div>
  );
}
