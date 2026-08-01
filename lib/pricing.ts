/**
 * pricing.ts — Paket ve fiyat tanımlarının TEK kaynağı.
 *
 * Fiyat sayfası, satın alma akışı ve ödeme sağlayıcısına gönderilen
 * tutarlar buradan okunur. Fiyatı iki yerde tutmak, birinde değiştirip
 * diğerini unutmak demektir — müşteriye gösterilen tutarla tahsil edilen
 * tutarın ayrışması ciddi bir tüketici hukuku sorunudur.
 *
 * PARA BİRİMİ SEÇİMİ: Ziyaretçinin bulunduğu bölgeye göre seçilir.
 * Türkiye → TRY, ABD/Kanada → USD, diğer → EUR.
 */

export type Currency = 'TRY' | 'EUR' | 'USD';
export type Period = 'monthly' | 'yearly';

export interface PlanPrice {
  monthly: number;
  yearly: number;
}

export interface Plan {
  /** Sistemdeki paket anahtarı — Tenant.planType ile aynı olmalı. */
  id: 'starter' | 'pro' | 'enterprise';
  name: string;
  tagline: string;
  /** null = fiyat yok, teklif usulü. */
  price: Record<Currency, PlanPrice> | null;
  highlight?: boolean;
  features: string[];
  /** Paket kapsamı — panel tarafındaki usageLimits ile tutarlı olmalı. */
  limits: { customers: string; records: string; ai: string; users: string };
}

export const CURRENCY_META: Record<Currency, { symbol: string; locale: string; suffix?: string }> = {
  TRY: { symbol: '₺', locale: 'tr-TR' },
  EUR: { symbol: '€', locale: 'de-DE' },
  USD: { symbol: '$', locale: 'en-US' },
};

export const PLANS: Plan[] = [
  {
    id: 'starter',
    name: 'Başlangıç',
    tagline: 'Tek şubeli servisler için',
    price: {
      TRY: { monthly: 500, yearly: 4000 },
      EUR: { monthly: 39, yearly: 390 },
      USD: { monthly: 39, yearly: 390 },
    },
    features: [
      'İş emri ve fatura yönetimi',
      'Müşteri ve araç kayıtları',
      'QR ile müşteri takip linki',
      'Stok yönetimi',
      'Bakım hatırlatmaları',
      'PDF servis raporu',
      'E-posta desteği',
    ],
    limits: { customers: '100 müşteri', records: 'Aylık 300 iş emri', ai: 'Aylık 50 YZ analizi', users: '2 kullanıcı' },
  },
  {
    id: 'pro',
    name: 'Pro',
    tagline: 'Büyüyen ve çok kullanıcılı servisler için',
    highlight: true,
    price: {
      TRY: { monthly: 750, yearly: 6000 },
      EUR: { monthly: 59, yearly: 590 },
      USD: { monthly: 59, yearly: 590 },
    },
    features: [
      'Başlangıç paketindeki her şey',
      'OBD/ECU arıza teşhisi',
      'Yapay zekâ asistanı ve belge okuma',
      'Sesli iş emri girişi',
      'Servis şablonları',
      'Gelişmiş raporlar',
      'Öncelikli destek',
    ],
    limits: { customers: '500 müşteri', records: 'Aylık 2.000 iş emri', ai: 'Aylık 300 YZ analizi', users: '5 kullanıcı' },
  },
  {
    id: 'enterprise',
    name: 'Kurumsal',
    tagline: 'Çok şubeli zincirler ve bayiler için',
    price: null, // teklif usulü
    features: [
      'Pro paketindeki her şey',
      'Sınırsız müşteri, iş emri ve kullanıcı',
      'Çok şubeli yönetim',
      'Özel entegrasyonlar',
      'Kurulum ve veri taşıma desteği',
      'Özel hizmet seviyesi anlaşması (SLA)',
      'Atanmış müşteri temsilcisi',
    ],
    limits: { customers: 'Sınırsız', records: 'Sınırsız', ai: 'Sınırsız', users: 'Sınırsız' },
  },
];

/** Deneme süresi — kart bilgisi istenmez. */
export const TRIAL_DAYS = 14;

/** Fiyatı yerel biçimde yazar. */
export function formatPrice(amount: number, currency: Currency): string {
  const meta = CURRENCY_META[currency];
  return new Intl.NumberFormat(meta.locale, {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Yıllık alımda kaç ay bedava geliyor.
 * Pazarlama metninde "2 ay bedava" gibi bir ifade kullanılacaksa bu
 * fonksiyondan okunmalı — elle yazılan oran fiyat değişince yanlış kalır
 * ve yanıltıcı reklam sayılabilir.
 */
export function monthsFree(price: PlanPrice): number {
  const full = price.monthly * 12;
  const saved = full - price.yearly;
  return Math.round((saved / price.monthly) * 10) / 10;
}

/** Yıllık alımdaki indirim yüzdesi. */
export function yearlyDiscountPercent(price: PlanPrice): number {
  const full = price.monthly * 12;
  return Math.round(((full - price.yearly) / full) * 100);
}

/**
 * Ziyaretçinin para birimini tahmin eder.
 * Sunucuda çalışmaz (locale tarayıcıdan okunur); bileşen içinde
 * useEffect ile çağrılmalı, ilk render TRY ile yapılmalıdır.
 */
export function guessCurrency(): Currency {
  if (typeof navigator === 'undefined') return 'TRY';
  const locale = navigator.language || '';
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';

  if (locale.startsWith('tr') || tz === 'Europe/Istanbul') return 'TRY';
  if (/^en-(US|CA)/i.test(locale) || tz.startsWith('America/')) return 'USD';
  return 'EUR';
}
