"use client";

import { Mail, MapPin, Send } from "lucide-react";
import { useState } from "react";
import { useDemo } from "./demo-modal";
import { Logo, Reveal, SectionHeading } from "./ui";
import { PaymentTrust } from "./payment-trust";
import { company, filledOr, isFilled, formattedAddress } from "@/lib/company";
import { submitContactRequest } from "@/lib/contact";
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

  /**
   * Gönderim mantığı lib/contact.ts'te tek yerde tutulur — "Talk to us"
   * modalı da aynı yardımcıyı kullanır. İki kopya tutmak, birinde
   * düzeltip diğerini unutmak demekti; modal tam bu yüzden uzun süre
   * sahte başarı gösterdi.
   */
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);

    setStatus('sending');
    // Telefon TOPLANMIYOR: tüm iletişim e-posta üzerinden yürüyor.
    // Sunucu `fullName` ve (`phone` VEYA `email`) istiyor; e-posta
    // artık formda zorunlu olduğu için bu koşul sağlanır.
    const result = await submitContactRequest({
      fullName: String(fd.get('name') || ''),
      email: String(fd.get('email') || ''),
      workshop: String(fd.get('workshop') || ''),
      message: String(fd.get('message') || ''),
    });

    if (result.ok) {
      setStatus('sent');
      return;
    }

    setStatus('error');
    setErrorMsg(
      result.reason === 'not-configured' && isFilled(company.email)
        ? result.message + ' Please email us directly at ' + company.email + '.'
        : result.message
    );
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
                  {/* Telefon alanı kaldırıldı — iletişim yalnızca e-posta.
                      E-posta bu yüzden ZORUNLU: sunucu ad soyad ve en az
                      bir iletişim kanalı istiyor. */}
                  <label className="flex flex-col gap-1.5 text-sm font-medium text-frost sm:col-span-2">
                    Email
                    <input required type="email" name="email" placeholder="you@workshop.com"
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
              {/* Doldurulmamis iletisim kanali GOSTERILMEZ; ziyaretciye
                  "TODO: ..." yazmaktansa hic gostermemek dogrudur. */}
              {/* Telefon ve WhatsApp kartları KALDIRILDI — kurumsal
                  iletişim yalnızca e-posta üzerinden yürüyor. */}
              {[
                { icon: Mail, label: "Email", value: company.email },
              ].filter((c) => isFilled(c.value)).map((c) => (
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
              {/* ── SATICI KİMLİĞİ ────────────────────────────────
                  iyzico'nun başvuru koşulu, ana sayfada DOĞRUDAN
                  erişilebilir bir iletişim bölümü ister ve içeriğini
                  tek tek sayar: ad / vergi no / adres, KEP, e-posta,
                  telefon. Önceden burada YALNIZCA e-posta vardı;
                  satıcının kim olduğu ana sayfada hiç yazmıyordu.

                  Doldurulmamış alan HİÇ RENDER EDİLMEZ (isFilled).
                  Eksik bir satırı göstermemek doğrudur: uydurma bir
                  numara ya da "TODO" yazmak, eksik olmasından çok daha
                  ağır bir kusurdur. */}
              <div className="glass rounded-2xl p-5">
                <p className="mb-3 text-xs uppercase tracking-widest text-mist">
                  Seller information
                </p>
                <dl className="space-y-1.5 text-sm">
                  {([
                    ['Trade name', filledOr(company.legalName, company.brandName)],
                    ['Tax office / no', isFilled(company.taxNo)
                      ? [company.taxOffice, company.taxNo].filter(isFilled).join(' / ')
                      : ''],
                    ['Address', formattedAddress()],
                    ['Phone', company.phone],
                    ['KEP', company.kepAddress],
                    ['Email', company.email],
                  ] as [string, string][])
                    .filter(([, v]) => isFilled(v))
                    .map(([label, value]) => (
                      <div key={label} className="flex flex-col gap-0.5 sm:flex-row sm:gap-3">
                        <dt className="min-w-[128px] shrink-0 text-mist">{label}</dt>
                        <dd className="text-frost/90">{value}</dd>
                      </div>
                    ))}
                </dl>
              </div>

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
      /* Hakkımızda TÜRKÇEDİR ve öyle etiketlenir: iyzico incelemesi
         Türkçe bir "Hakkımızda" sayfası arar. Etiketi "About" yapmak
         bağlantıyı İngilizce bir sayfa sanmaya yol açardı. */
      { label: "Hakkımızda (Turkish)", href: "/hakkimizda" },
      { label: "Abonelik ve ödeme (Turkish)", href: "/abonelik" },
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
              {/* Yalnızca adresi girilmiş hesaplar gösterilir (LinkedIn bilerek yok) */}
              {([
                ["Instagram", company.social.instagram, <svg key="ig" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg>],
                ["Facebook", company.social.facebook, <svg key="fb" viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true"><path d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.5-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H7.8v3h2.6V21h3.1z" /></svg>],
              ] as const)
                .filter(([, href]) => !!href)
                .map(([label, href, icon]) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`MotoFull on ${label}`}
                  className="glass flex h-10 items-center gap-2 rounded-xl px-4 text-sm font-semibold text-mist transition hover:border-accent/40 hover:text-accent"
                >
                  {icon}
                  {label}
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
        {/* ÖDEME GÜVEN ŞERİDİ — ana sayfanın altbilgisinde.
            iyzico incelemecisi GİRİŞ YAPMADAN, alan adını açıp aşağı
            inerek "iyzico ile Öde", Visa ve Mastercard logolarını
            görebilmeli.

            Neden altbilgi: fiyat bölümüne koymak, fiyatları görmeden
            aşağı kaydıran bir incelemecide gözden kaçabilirdi;
            altbilgi her ziyaretin sonunda aynı yerde.

            Yasal sayfalar bu altbilgiyi KULLANMIYOR (legal-layout kendi
            sade altbilgisini çiziyor). Türkçe karşılığı /hakkimizda
            sayfasında `lang="tr"` ile duruyor. */}
        <PaymentTrust lang="en" className="mt-14" />

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 sm:flex-row">
          <p className="text-sm text-mist">
            © {new Date().getFullYear()} {filledOr(company.legalName, company.brandName)}. All rights reserved.
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
        href={company.panelUrl + '/demo-kayit'}
        className="block w-full rounded-xl bg-accent py-3.5 text-center font-semibold text-white glow-orange"
      >
        {`Start ${TRIAL_DAYS}-day demo`}
      </a>
    </div>
  );
}
