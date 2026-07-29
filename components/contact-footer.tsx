"use client";

import { Mail, MapPin, MessageCircle, Phone, Send } from "lucide-react";
import { useState } from "react";
import { useDemo } from "./demo-modal";
import { Logo, Reveal, SectionHeading } from "./ui";

/* --- Contact --- */
export function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <section id="iletisim" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          eyebrow="İletişim"
          title={
            <>
              Servisinizi <span className="text-gradient">geleceğe taşıyalım</span>
            </>
          }
          subtitle="Formu doldurun; ekibimiz 1 iş günü içinde arayıp size özel bir demo planlasın."
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-5">
          {/* form */}
          <Reveal className="lg:col-span-3">
            <div className="glass-strong rounded-3xl p-8">
              {sent ? (
                <div className="flex flex-col items-center gap-3 py-16 text-center">
                  <Send className="h-12 w-12 text-accent" />
                  <h3 className="font-display text-2xl font-bold text-frost">Mesajınız iletildi!</h3>
                  <p className="text-mist">En kısa sürede dönüş yapacağız.</p>
                </div>
              ) : (
                <form
                  className="grid gap-5 sm:grid-cols-2"
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSent(true);
                  }}
                >
                  <label className="flex flex-col gap-1.5 text-sm font-medium text-frost">
                    Ad Soyad
                    <input required name="name" placeholder="Adınız"
                      className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-frost placeholder:text-mist/50 outline-none transition focus:border-accent/60 focus:ring-2 focus:ring-accent/20" />
                  </label>
                  <label className="flex flex-col gap-1.5 text-sm font-medium text-frost">
                    Servis Adı
                    <input required name="workshop" placeholder="Servisinizin adı"
                      className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-frost placeholder:text-mist/50 outline-none transition focus:border-accent/60 focus:ring-2 focus:ring-accent/20" />
                  </label>
                  <label className="flex flex-col gap-1.5 text-sm font-medium text-frost">
                    Telefon
                    <input required type="tel" name="phone" placeholder="05xx xxx xx xx"
                      className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-frost placeholder:text-mist/50 outline-none transition focus:border-accent/60 focus:ring-2 focus:ring-accent/20" />
                  </label>
                  <label className="flex flex-col gap-1.5 text-sm font-medium text-frost">
                    E-posta
                    <input type="email" name="email" placeholder="ornek@servis.com"
                      className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-frost placeholder:text-mist/50 outline-none transition focus:border-accent/60 focus:ring-2 focus:ring-accent/20" />
                  </label>
                  <label className="flex flex-col gap-1.5 text-sm font-medium text-frost sm:col-span-2">
                    Mesajınız
                    <textarea name="message" rows={4} placeholder="Servisinizden ve ihtiyaçlarınızdan kısaca bahsedin..."
                      className="resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-frost placeholder:text-mist/50 outline-none transition focus:border-accent/60 focus:ring-2 focus:ring-accent/20" />
                  </label>
                  <button
                    type="submit"
                    className="rounded-xl bg-accent px-8 py-3.5 font-semibold text-white transition hover:bg-accent-soft glow-orange sm:col-span-2"
                  >
                    Demo Talebini Gönder
                  </button>
                </form>
              )}
            </div>
          </Reveal>

          {/* info */}
          <Reveal delay={0.1} className="lg:col-span-2">
            <div className="flex h-full flex-col gap-4">
              {[
                { icon: Phone, label: "Telefon", value: "+90 (212) 000 00 00" },
                { icon: MessageCircle, label: "WhatsApp", value: "+90 (5xx) xxx xx xx" },
                { icon: Mail, label: "E-posta", value: "info@motofull.com" },
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
                  <p className="font-semibold text-frost">İstanbul, Türkiye</p>
                  <p className="text-xs text-mist">Harita yakında burada</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* --- Footer --- */
const footerCols = [
  {
    title: "Ürün",
    links: ["Özellikler", "AI Teşhis", "QR Takip", "Çoklu Şube", "Planlar"],
  },
  {
    title: "Şirket",
    links: ["Hakkımızda", "Blog", "Kariyer", "Basın Kiti", "İletişim"],
  },
  {
    title: "Yasal",
    links: ["Gizlilik Politikası", "Kullanım Şartları", "KVKK Aydınlatma Metni", "Çerez Politikası"],
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
              Motosiklet servis merkezleri için işletim sistemi. Kağıt defterlerden bulut
              teknolojisine — atölyenizi geleceğe taşıyın.
            </p>
            <div className="mt-6 flex gap-3">
              {["X", "in", "ig", "yt"].map((s) => (
                <a
                  key={s}
                  href="#"
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
                  <li key={l}>
                    <a href="#" className="text-sm text-mist transition hover:text-accent-soft">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 sm:flex-row">
          <p className="text-sm text-mist">
            © {new Date().getFullYear()} MotoFull. Tüm hakları saklıdır.
          </p>
          <p className="text-xs text-mist/60">Motosiklet servisleri için ❤ ile geliştirildi.</p>
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
      <button
        onClick={open}
        className="w-full rounded-xl bg-accent py-3.5 font-semibold text-white glow-orange"
      >
        Ücretsiz Demo Talep Et
      </button>
    </div>
  );
}
