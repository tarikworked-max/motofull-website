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
    tab: "Müşteri",
    title: "Müşteri Yönetimi",
    desc: "Tüm müşterileriniz, iletişim bilgileri ve araçları tek ekranda. Aradığınız kaydı saniyeler içinde bulun.",
    benefits: ["Plaka veya isimle anında arama", "Müşteri başına sınırsız araç kaydı", "İletişim geçmişi ve notlar"],
    preview: { title: "Müşteri Kartı", lines: ["Ahmet Yılmaz · 0532 *** ** **", "2 araç · 14 servis kaydı", "Son ziyaret: 12 Temmuz 2026"] },
  },
  {
    id: "isemri",
    icon: ClipboardList,
    tab: "İş Emri",
    title: "İş Emirleri",
    desc: "Kabul edilen her motosiklet için dijital iş emri. Durum, teknisyen, parça ve işçilik — hepsi tek kayıtta.",
    benefits: ["Durum akışı: Kabul → Serviste → Hazır", "Parça ve işçilik kalemleri otomatik toplanır", "Tek tıkla PDF servis formu"],
    preview: { title: "İş Emri #2841", lines: ["Honda CB650R · 34 ABC 123", "Periyodik bakım + balata", "Teknisyen: Mehmet · Durum: Serviste"] },
  },
  {
    id: "arac",
    icon: Bike,
    tab: "Araç Geçmişi",
    title: "Araç ve Servis Geçmişi",
    desc: "Her motosikletin km bazlı tam servis geçmişi. Yıllar sonra bile hangi işlemin ne zaman yapıldığını görün.",
    benefits: ["Marka/model/yıl katalog entegrasyonu", "Km bazlı bakım kronolojisi", "Garanti kapsamı takibi"],
    preview: { title: "Yamaha MT-07 · 2023", lines: ["24.350 km · 8 servis kaydı", "Son işlem: Zincir seti değişimi", "Sonraki bakım: 28.000 km"] },
  },
  {
    id: "stok",
    icon: Boxes,
    tab: "Stok",
    title: "Yedek Parça Stoğu",
    desc: "Parça giriş-çıkışı otomatik. Kritik seviyeye düşen parçalar için sistem sizi uyarır, sipariş asla gecikmez.",
    benefits: ["İş emrine eklenen parça stoktan düşer", "Kritik stok uyarıları", "Tedarikçi ve maliyet takibi"],
    preview: { title: "Stok Durumu", lines: ["Fren balatası (EBC) · 12 adet", "Yağ filtresi (HF204) · 3 adet ⚠", "10W-40 motor yağı · 28 litre"] },
  },
  {
    id: "ai",
    icon: Sparkles,
    tab: "AI Teşhis",
    title: "AI Teşhis Asistanı",
    desc: "Arıza kodunu veya şikayeti yazın; yapay zeka marka ve modele özel olası nedenleri ve çözüm adımlarını sıralasın.",
    benefits: ["OBD arıza kodu analizi", "Markaya özel bilgi tabanı", "Deneyimli ustanın dijital yardımcısı"],
    preview: { title: "AI Analiz · P0301", lines: ["Silindir 1 ateşleme hatası", "Olası: buji, bobin, enjektör", "Önerilen kontrol sırası hazır"] },
  },
  {
    id: "rapor",
    icon: FileBarChart,
    tab: "Raporlar",
    title: "Raporlar ve Analiz",
    desc: "Ciro, iş hacmi, teknisyen performansı ve en çok kullanılan parçalar — kararlarınızı veriyle alın.",
    benefits: ["Günlük / aylık ciro görünümü", "Teknisyen performans karşılaştırması", "PDF ve Excel dışa aktarım"],
    preview: { title: "Temmuz Özeti", lines: ["Ciro: ₺186.400 (%22 ↑)", "Tamamlanan iş: 96", "Ort. teslim süresi: 1,8 gün"] },
  },
  {
    id: "qr",
    icon: QrCode,
    tab: "QR Takip",
    title: "QR ile Müşteri Takibi",
    desc: "Servise bırakılan her motosiklet için QR kod. Müşteri okutup aracının durumunu kendi telefonundan izler.",
    benefits: ["Telefonla durum sorma trafiği biter", "Şeffaflık müşteri güvenini artırır", "Teslimde otomatik bildirim"],
    preview: { title: "Müşteri Görünümü", lines: ["34 ABC 123 · Serviste", "Balata değişimi tamamlandı ✓", "Tahmini teslim: Bugün 17:00"] },
  },
  {
    id: "sube",
    icon: Building2,
    tab: "Çoklu Şube",
    title: "Çoklu Şube ve Bulut",
    desc: "İster tek atölye ister 10 şube. Tüm veriler bulutta, her cihazdan erişilebilir, şubeler arası tam izolasyon.",
    benefits: ["Multi-tenant SaaS mimarisi", "Şube bazlı yetkilendirme", "Otomatik yedekleme ve senkronizasyon"],
    preview: { title: "Şube Görünümü", lines: ["Kadıköy · 14 açık iş emri", "Ankara · 9 açık iş emri", "Toplam ciro: ₺412K / ay"] },
  },
];

export function Features() {
  const [active, setActive] = useState(features[0]);

  return (
    <section id="ozellikler" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          eyebrow="Modüller"
          title={
            <>
              Servisinizin ihtiyacı olan <span className="text-gradient">her şey</span>
            </>
          }
          subtitle="MotoFull bir yazılım değil; atölyenizin dijital işletim sistemi. Her modül sahada, gerçek servis ihtiyaçlarıyla şekillendi."
        />

        {/* tabs */}
        <Reveal className="mt-12">
          <div className="flex flex-wrap justify-center gap-2" role="tablist" aria-label="Özellik modülleri">
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
