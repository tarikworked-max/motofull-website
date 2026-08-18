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
  id: 'demo' | 'starter' | 'pro' | 'enterprise';
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


/**
 * Halka acik pazarlama sayfasinda SAYISAL fiyat gosterilmez.
 * Fiyat altyapisi (PLANS[].price) SILINMEDI — panel/odeme tarafi
 * bunu okumaya devam eder. Burada yalnizca SUNUM kapatilir.
 * Public fiyat yayinlama karari verildiginde false yapilmasi yeterli.
 */
export const HIDE_PUBLIC_PRICES = true;

export const PLANS: Plan[] = [
  {
    id: 'demo',
    name: 'Demo',
    tagline: 'Try MotoFull with sample workshop data',
    price: null, // ucretsiz
    features: [
      'Full panel access for 7 days',
      'Opens with sample customers, motorcycles and work orders',
      'Work orders and service records',
      'Customer and motorcycle history',
      'Inventory basics',
      'No card required',
    ],
    limits: {
      customers: 'Limited sample workspace',
      records: 'Limited during demo',
      ai: 'Limited during demo',
      users: '1 user',
    },
  },
  {
    id: 'starter',
    name: 'Starter',
    tagline: 'For single-location workshops',
    price: {
      TRY: { monthly: 500, yearly: 4000 },
      EUR: { monthly: 39, yearly: 390 },
      USD: { monthly: 39, yearly: 390 },
    },
    features: [
      'Work orders and invoicing',
      'Customer and motorcycle records',
      'Public QR tracking link for customers',
      'Inventory management',
      'Maintenance reminders',
      'PDF service reports',
      'Email support',
    ],
    limits: { customers: '100 customers', records: '300 work orders / month', ai: '50 AI analyses / month', users: '2 users' },
  },
  {
    id: 'pro',
    name: 'Pro',
    tagline: 'For growing, multi-user workshops',
    highlight: true,
    price: {
      TRY: { monthly: 750, yearly: 6000 },
      EUR: { monthly: 59, yearly: 590 },
      USD: { monthly: 59, yearly: 590 },
    },
    features: [
      'Everything in Starter',
      'OBD/ECU fault diagnosis',
      'AI assistant and document reading',
      'Voice work-order entry',
      'Service templates',
      'Advanced reports',
      'Priority support',
    ],
    limits: { customers: '500 customers', records: '2,000 work orders / month', ai: '300 AI analyses / month', users: '5 users' },
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    tagline: 'For multi-location chains and dealers',
    price: null, // teklif usulü
    features: [
      'Everything in Pro',
      'Unlimited customers, work orders and users',
      'Multi-location management',
      'Custom integrations',
      'Onboarding and data migration support',
      'Dedicated service level agreement (SLA)',
      'Named account manager',
    ],
    limits: { customers: 'Unlimited', records: 'Unlimited', ai: 'Unlimited', users: 'Unlimited' },
  },
];

/** Deneme suresi — kart bilgisi istenmez.
    TEK DOGRULUK KAYNAGI. Panel/backend tarafindaki demo suresi de
    bu degerle ayni olmalidir (backend: Tenant.trialEndDate hesabi). */
export const TRIAL_DAYS = 7;

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
