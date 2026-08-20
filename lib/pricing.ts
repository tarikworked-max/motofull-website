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
  id: 'demo' | 'pro' | 'enterprise';
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
export const HIDE_PUBLIC_PRICES = false;

/** Pazar — fiyat bu ikisine gore degisir. */
export type Market = 'EU' | 'US';

/** Pazar -> para birimi. */
export const MARKET_CURRENCY: Record<Market, Currency> = { EU: 'EUR', US: 'USD' };

/**
 * Amerika pazari sayilan ulkeler (ISO 3166-1 alpha-2).
 * backend/src/utils/pricing.js icindeki liste ile AYNI olmalidir.
 */
const US_MARKET_COUNTRIES = new Set([
  'US', 'CA', 'MX',
  'AR', 'BO', 'BR', 'CL', 'CO', 'CR', 'CU', 'DO', 'EC', 'GT', 'HN',
  'HT', 'JM', 'NI', 'PA', 'PE', 'PR', 'PY', 'SV', 'UY', 'VE',
]);

/**
 * Ulke kodundan pazari cozer.
 *
 * Bilinmeyen ulke Avrupa'ya duser: iki fiyattan DUSUK olani. Yanlislikla
 * fazla ucret istemek, az istemekten daha kotudur.
 */
export function marketFromCountry(country?: string | null): Market {
  if (!country || country.length !== 2) return 'EU';
  return US_MARKET_COUNTRIES.has(country.toUpperCase()) ? 'US' : 'EU';
}

export const PLANS: Plan[] = [
  {
    id: 'demo',
    name: 'Demo',
    tagline: 'Try MotoFull with sample workshop data',
    price: null, // ucretsiz
    /**
     * Demo kapsami ACIKCA yazilir. "Sinirli deneme" gibi mugalak bir
     * ifade, kullanicinin limite carptigi anda surpriz olur; sayilar
     * onceden gorunurse limit bir kisitlama degil, bilinen bir sinir olur.
     */
    features: [
      'Full panel access for 7 days',
      'Opens with sample customers, motorcycles and work orders',
      'Work orders and service records',
      'Catalogue access limited to 40 motorcycle models',
      'OBD diagnostics: 3 sessions',
      'Inventory: up to 3 items',
      'Service templates: up to 2',
      'No card required',
    ],
    /**
     * Sayilar backend/src/models/Tenant.js -> PLAN_DEFAULTS.demo ile
     * AYNI olmalidir. Ayrisirsa musteriye soz verilen kapsam ile
     * sunucunun uyguladigi kapsam birbirini tutmaz.
     */
    limits: {
      customers: '5 customers',
      records: '50 work orders / month',
      ai: '10 AI analyses / month',
      users: '1 user',
    },
  },
  {
    id: 'pro',
    name: 'Pro',
    tagline: 'For growing, multi-user workshops',
    highlight: true,
    /**
     * Yillik fiyat = aylik x 10 (iki ay bedava). Bu oran pazarlama
     * metnine ELLE yazilmaz; monthsFree() buradan hesaplar.
     */
    price: {
      TRY: { monthly: 3499, yearly: 34990 },
      EUR: { monthly: 99, yearly: 990 },
      USD: { monthly: 149, yearly: 1490 },
    },
    features: [
      'Unlimited customers, work orders and users',
      'OBD/ECU fault diagnosis',
      'AI assistant and document reading',
      'Voice work-order entry',
      'Service templates',
      'Advanced reports',
      'Priority support',
    ],
    limits: { customers: 'Unlimited customers', records: 'Unlimited work orders', ai: 'Unlimited AI analyses', users: 'Unlimited users' },
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
 * TARAYICI TAHMINI — YALNIZCA SON CARE.
 *
 * KULLANMA: pazar (ve dolayisiyla fiyat) sunucuda, ziyaretcinin IP
 * ulkesinden cozulur (marketFromCountry + app/page.tsx). Buradaki
 * tahmin dil ve saat dilimine bakar; ikisi de kullanici tarafindan
 * degistirilebilir, yani fiyati kullanicinin kendisi secebilirdi.
 *
 * Yalnizca cografi bilginin hic olmadigi durumlar icin durur.
 *
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
