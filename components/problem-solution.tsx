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
const workshops = [
  "Moto Garage İstanbul",
  "İki Teker Servis",
  "RPM Motosiklet",
  "Vira Moto Ankara",
  "Torque Atölye",
  "Pist Dışı Garage",
  "Ege Moto Servis",
  "Redline Workshop",
  "Anadolu Moto Teknik",
  "Full Gaz Servis",
];

export function TrustedBy() {
  return (
    <section className="border-y border-white/5 bg-navy/40 py-10" aria-label="Bize güvenen servisler">
      <p className="mb-6 text-center text-xs font-semibold uppercase tracking-[0.2em] text-mist">
        Türkiye&apos;nin dört bir yanındaki servislerin tercihi
      </p>
      <div className="relative overflow-hidden" aria-hidden="true">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-ink to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-ink to-transparent" />
        <div className="animate-marquee flex w-max gap-12 pr-12">
          {[...workshops, ...workshops].map((w, i) => (
            <span
              key={i}
              className="whitespace-nowrap font-display text-lg font-semibold text-mist/50"
            >
              {w}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --- Problem section --- */
const problems = [
  { icon: BookX, title: "Kağıt defterler", desc: "Servis kayıtları yırtılıyor, kayboluyor, kimse geriye dönüp bulamıyor." },
  { icon: UserX, title: "Kaybolan müşteri bilgisi", desc: "Telefon numarası bir kağıtta, plaka başka bir deftere yazılmış." },
  { icon: CalendarClock, title: "Unutulan bakımlar", desc: "Müşteriye bakım zamanını hatırlatan yok — o da başka servise gidiyor." },
  { icon: PackageSearch, title: "Stok karmaşası", desc: "Hangi parçadan kaç adet kaldı? Kimse emin değil, sipariş hep gecikiyor." },
  { icon: MessageSquareOff, title: "İletişim kopukluğu", desc: "\"Motorum ne durumda?\" telefonları gün boyu işi bölüyor." },
  { icon: FileWarning, title: "Garanti takibi", desc: "Hangi işlem garantideydi? Belge yok, tartışma çok." },
  { icon: Clock, title: "Zaman kaybı", desc: "Günün saatleri evrak işine gidiyor; asıl işe, tamire vakit kalmıyor." },
  { icon: AlertTriangle, title: "İnsan hatası", desc: "Yanlış parça, atlanan işlem, unutulan söz — hepsi güven kaybettiriyor." },
];

export function Problem() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          eyebrow="Sorun"
          title={
            <>
              Atölyenizde her gün yaşanan <span className="text-gradient">kaos</span> tanıdık mı?
            </>
          }
          subtitle="Türkiye'deki motosiklet servislerinin çoğu hâlâ kağıt, kalem ve hafızayla yönetiliyor. Sonuç: kaybolan müşteri, kaçan gelir."
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
  { icon: ClipboardList, title: "Dijital iş emirleri", desc: "Her iş tek tıkla kayıt altında. Kim, ne zaman, hangi işlemi yaptı — hepsi izlenebilir." },
  { icon: Brain, title: "AI destekli teşhis", desc: "Arıza kodunu girin; yapay zeka marka ve modele özel olası nedenleri saniyeler içinde listelesin." },
  { icon: Boxes, title: "Akıllı stok takibi", desc: "Parça azaldığında sistem uyarır. İş emrine parça eklenince stok otomatik düşer." },
  { icon: BellOff, title: "Otomatik hatırlatmalar", desc: "Bakım zamanı gelen müşteriye sistem SMS gönderir. Müşteri geri gelir, siz kazanırsınız." },
  { icon: QrCode, title: "QR ile şeffaf takip", desc: "Müşteri telefonundan servis durumunu görür. \"Ne durumda?\" telefonları biter." },
  { icon: ShieldCheck, title: "Dijital servis geçmişi", desc: "Aracın tüm geçmişi tek ekranda. Garanti tartışması yok, güven tam." },
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
          eyebrow="Çözüm"
          title={
            <>
              MotoFull her sorunu <span className="text-gradient">tek panelde</span> çözer
            </>
          }
          subtitle="Dağınık defterlerin, unutulan işlerin ve stok karmaşasının yerine: modern, hızlı ve güvenilir tek bir sistem."
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
