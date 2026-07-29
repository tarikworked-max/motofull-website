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
  { icon: Bike, title: "Müşteri gelir", desc: "Plaka okutulur, geçmişi anında ekranda." },
  { icon: ClipboardList, title: "İş emri açılır", desc: "Şikayet ve işlemler 30 saniyede kayıtta." },
  { icon: UserCheck, title: "Teknisyen atanır", desc: "İş, uygun ustanın panelinde belirir." },
  { icon: Wrench, title: "Onarım yapılır", desc: "AI teşhis desteğiyle hızlı ve doğru." },
  { icon: Boxes, title: "Stok güncellenir", desc: "Kullanılan parçalar otomatik düşer." },
  { icon: MessageCircle, title: "Müşteri bilgilenir", desc: "\"Aracınız hazır\" SMS'i otomatik gider." },
  { icon: Receipt, title: "Fatura kesilir", desc: "Parça + işçilik tek tıkla PDF faturada." },
  { icon: CheckCircle2, title: "Servis tamamlanır", desc: "Kayıt araç geçmişine işlenir." },
  { icon: CalendarClock, title: "Bakım hatırlatılır", desc: "Zamanı gelince müşteri geri çağrılır." },
];

export function Workflow() {
  return (
    <section id="surec" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          eyebrow="İş Akışı"
          title={
            <>
              Kapıdan girişten <span className="text-gradient">bakım hatırlatmasına</span>
            </>
          }
          subtitle="MotoFull ile bir servis kaydının yolculuğu. Her adım otomatik, hiçbir şey unutulmaz."
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
                      Adım {i + 1}
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
  "Kayıtlar dağınık defterlerde",
  "Müşteri arayıp durum soruyor",
  "Bakım zamanı unutuluyor",
  "Stok sayımı elle, hatalı",
  "Ay sonu ciro belirsiz",
  "Garanti kaydı yok, tartışma var",
];
const after = [
  "Her kayıt bulutta, aranabilir",
  "Müşteri QR ile kendisi takip ediyor",
  "Sistem otomatik SMS hatırlatıyor",
  "Stok gerçek zamanlı ve doğru",
  "Ciro ve kârlılık tek ekranda",
  "Dijital geçmiş, tam güven",
];

export function BeforeAfter() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          eyebrow="Dönüşüm"
          title={
            <>
              Sadece yazılım değil, <span className="text-gradient">dönüşüm</span>
            </>
          }
          subtitle="MotoFull'a geçen servisler için değişen şey sadece araçlar değil — işin kendisi."
        />
        <div className="mx-auto mt-14 grid max-w-4xl gap-6 md:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-3xl border border-red-500/20 bg-red-500/[0.04] p-8">
              <h3 className="mb-6 font-display text-xl font-bold text-red-300">MotoFull&apos;dan önce</h3>
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
              <h3 className="mb-6 font-display text-xl font-bold text-accent-soft">MotoFull ile</h3>
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

/* --- Stats --- */
export function Stats() {
  const stats = [
    { value: 12000, suffix: "+", label: "Saat kazandırıldı" },
    { value: 48000, suffix: "+", label: "Tamamlanan onarım" },
    { value: 98, suffix: "%", label: "Müşteri memnuniyeti" },
    { value: 37, suffix: "%", label: "Verimlilik artışı" },
  ];
  return (
    <section className="relative border-y border-white/5 bg-navy/40 py-16 sm:py-20">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-10 px-5 lg:grid-cols-4 lg:px-8">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08} className="text-center">
            <p className="font-display text-4xl font-bold text-gradient sm:text-5xl">
              <Counter value={s.value} suffix={s.suffix} />
            </p>
            <p className="mt-2 text-sm text-mist">{s.label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
