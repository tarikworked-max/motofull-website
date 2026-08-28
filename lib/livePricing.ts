/**
 * livePricing.ts — Canlı fiyatları sunucudan okur.
 *
 * NEDEN: Fiyat artık panelden yönetiliyor (PricingConfig). Bu sitenin
 * kendi PLANS tablosunu göstermesi, yönetici zam yaptığında sitede eski
 * fiyatın kalması demekti — gösterilen tutarla tahsil edilen tutarın
 * ayrışması yalnızca hata değil, tüketici hukuku sorunudur.
 *
 * SİTE AYRI BİR DEPO VE AYRI BİR DAĞITIM. Bu yüzden fiyat derleme
 * anında gömülmez, İSTEK ANINDA okunur; panelden yapılan değişiklik
 * bu siteyi yeniden dağıtmadan yayına girer.
 *
 * ÜÇ EMNİYET KURALI:
 *
 *  1. KISA ZAMAN AŞIMI. Backend Render'da ve soğuk başlangıcı ~22 saniye
 *     sürebiliyor. Fiyat çağrısının ana sayfayı bu kadar bekletmesi
 *     kabul edilemez; 3 saniyede kesilir.
 *  2. YEDEĞE DÜŞME. Çağrı başarısızsa koddaki PLANS tablosu kullanılır.
 *     Fiyatsız bir satış sayfası, biraz bayat fiyattan daha kötüdür.
 *  3. ÜLKE BAŞLIĞI İLETİLİR. Pazar (ve dolayısıyla para birimi)
 *     sunucuda çözülür. İletilmezse herkes Avrupa fiyatını görürdü.
 */
import type { Currency, Market } from './pricing';
import { PLANS, MARKET_CURRENCY, TRIAL_DAYS } from './pricing';

/** Sunucudan gelen tek paketin fiyat bilgisi. */
export interface LivePlanPrice {
  id: string;
  /** Müşterinin ödeyeceği aylık tutar (indirim UYGULANMIŞ). */
  amount: number | null;
  /** İndirim öncesi aylık tutar — üstü çizili gösterim için. */
  originalAmount: number | null;
  yearly: number | null;
  yearlyOriginal: number | null;
  currency: Currency;
  contactOnly: boolean;
  discounted: boolean;
}

export interface LiveCampaign {
  badge: { tr: string; en: string };
  discountType: 'percent' | 'fixed';
  discountValue: number;
  appliesTo: string[];
  endsAt: string | null;
}

export interface LivePricing {
  currency: Currency;
  trialDays: number;
  campaign: LiveCampaign | null;
  /** Paket kimliği → fiyat. Eksik paket sayfada statik tabloya düşer. */
  byPlan: Record<string, LivePlanPrice>;
  /** Fiyat gerçekten sunucudan mı geldi — hata ayıklama ve testler için. */
  live: boolean;
}

/** Sunucuya ulaşılamadığında koddaki tablodan üretilen yanıt. */
function fallback(market: Market): LivePricing {
  const currency = MARKET_CURRENCY[market];
  const byPlan: Record<string, LivePlanPrice> = {};

  for (const p of PLANS) {
    const price = p.price ? p.price[currency] : null;
    byPlan[p.id] = {
      id: p.id,
      amount: price ? price.monthly : null,
      originalAmount: price ? price.monthly : null,
      yearly: price ? price.yearly : null,
      yearlyOriginal: price ? price.yearly : null,
      currency,
      contactOnly: !p.price,
      discounted: false,
    };
  }

  return { currency, trialDays: TRIAL_DAYS, campaign: null, byPlan, live: false };
}

/**
 * Canlı fiyatları getirir.
 *
 * @param market  Ziyaretçinin pazarı — yedeğe düşülürse para birimi bundan gelir.
 * @param country Ziyaretçinin ülke kodu; sunucunun pazarı çözmesi için iletilir.
 */
export async function getLivePricing(market: Market, country?: string | null): Promise<LivePricing> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) return fallback(market);

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 3000);

  try {
    const res = await fetch(`${apiUrl.replace(/\/$/, '')}/api/public/pricing`, {
      signal: controller.signal,
      headers: country ? { 'x-vercel-ip-country': country } : {},
      /* 60 saniye önbellek: fiyat dakikada bir değişen bir veri değil,
         ama kampanya bittiğinde sayfanın günlerce bayat kalmaması gerek. */
      next: { revalidate: 60 },
    });
    if (!res.ok) return fallback(market);

    const data = await res.json();
    if (!data || data.success !== true || !Array.isArray(data.plans)) return fallback(market);

    const byPlan: Record<string, LivePlanPrice> = {};
    for (const p of data.plans) {
      byPlan[p.id] = {
        id: p.id,
        amount: p.amount ?? null,
        originalAmount: p.originalAmount ?? p.amount ?? null,
        yearly: p.yearly ?? null,
        yearlyOriginal: p.yearlyOriginal ?? p.yearly ?? null,
        currency: (p.currency as Currency) || MARKET_CURRENCY[market],
        contactOnly: !!p.contactOnly,
        discounted: !!p.discounted,
      };
    }

    return {
      currency: (data.currency as Currency) || MARKET_CURRENCY[market],
      trialDays: typeof data.trialDays === 'number' ? data.trialDays : TRIAL_DAYS,
      campaign: data.campaign || null,
      byPlan,
      live: true,
    };
  } catch {
    /* Zaman aşımı, ağ hatası, bozuk JSON — hepsi aynı sonuca varır:
       satış sayfası fiyatsız kalmasın. Sessizce yedeğe düşülür. */
    return fallback(market);
  } finally {
    clearTimeout(timer);
  }
}
