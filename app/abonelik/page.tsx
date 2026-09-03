import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { company, formattedAddress } from '@/lib/company';
import { PaymentTrust } from '@/components/payment-trust';
import { getLivePricing } from '@/lib/livePricing';
import {
  MARKET_CURRENCY,
  PLANS,
  TRIAL_DAYS,
  formatPrice,
  marketFromCountry,
  type Currency,
} from '@/lib/pricing';

/**
 * abonelik/page.tsx — SATIN ALMA VE ÖDEME SAYFASI (site tarafı).
 *
 * NEDEN VAR: iyzico üye işyeri başvurusunda incelemeciye YALNIZCA bu
 * alan adı verildi; panel adresi verilmedi. Dolayısıyla "ne satılıyor,
 * kaça satılıyor, parayı kim tahsil ediyor, hangi kartlar geçiyor,
 * sözleşmeler nerede" sorularının tamamı BU SAYFADAN yanıtlanabilmeli.
 * Ana sayfadaki fiyat bölümü pazarlama dilindedir; burası ticari
 * bilgilendirme sayfasıdır.
 *
 * ── DİL: TÜRKÇE ───────────────────────────────────────────────────
 *
 * Sitenin pazarlama yüzeyi İngilizce, ticari/hukuki yüzeyi Türkçe
 * (mesafeli satış, KVKK, iade, Hakkımızda). Bu sayfa ikinci gruba
 * girer: 6502 sayılı kanun kapsamında ön bilgilendirme yapar ve
 * Türk tüketiciye Türkçe sunulmalıdır.
 *
 * ── KART BİLGİSİ BU SAYFADA İSTENMEZ ──────────────────────────────
 *
 * Burada kart formu YOKTUR ve olmamalıdır. Kart verisi yalnızca
 * iyzico'nun kendi formunda girilir; MotoFull sunucuları kart
 * bilgisine hiç dokunmaz (PCI kapsamına girmemenin tek yolu budur).
 * Buraya "sahte" bir kart alanı koymak hem kullanıcıyı yanıltır hem
 * de incelemede ağır bir bulgudur.
 *
 * ── NEDEN ÖNCE HESAP ──────────────────────────────────────────────
 *
 * Abonelik bir SERVİSE açılır. Hangi servise açılacağı bilinmeden
 * tahsilat yapmak, parayı alıp kime yetki vereceğini bilmemek
 * demektir. Bu yüzden akış: paket seç → hesap oluştur → iyzico
 * ödeme formu → panel.
 */

export const metadata: Metadata = {
  alternates: { canonical: '/abonelik' },
  title: 'Abonelik ve Ödeme',
  description:
    'MotoFull abonelik paketleri, fiyatları ve ödeme adımları. Ödemeler lisanslı ödeme kuruluşu iyzico altyapısı üzerinden alınır.',
};

/**
 * Pro paketin kapsamı — TÜRKÇE.
 *
 * `PLANS[].features` KULLANILMIYOR: o liste İngilizce pazarlama
 * metnidir ve bu sayfa 6502 kapsamında Türkçe ön bilgilendirme yapar.
 * Türkçe bir satın alma sayfasında "Voice work-order entry" yazmak
 * karışık dilli bir sözleşme öncesi bilgilendirme demekti.
 *
 * Kapsam `lib/pricing.ts` içindeki Pro tanımıyla AYNI olmalıdır;
 * ayrışırsa iki sayfada farklı şey vaat edilmiş olur.
 */
const PRO_KAPSAM = [
  'Sınırsız müşteri, iş emri ve kullanıcı',
  'OBD/ECU arıza teşhisi',
  'Yapay zekâ asistanı ve belge okuma',
  'Sesle iş emri girişi',
  'Servis şablonları ve gelişmiş raporlar',
] as const;

/** Ön bilgilendirme satırı. */
function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1 border-b border-white/10 py-3 last:border-b-0 sm:flex-row sm:gap-4">
      <span className="min-w-[190px] text-sm font-semibold text-white">{label}</span>
      <span className="text-sm leading-relaxed text-frost/85">{value}</span>
    </div>
  );
}

export default async function AbonelikPage() {
  /* Pazar ve fiyat, ana sayfayla AYNI kaynaktan okunur. İki sayfada
     farklı fiyat göstermek, satın alma anında güven kaybettirir. */
  const h = await headers();
  const country = h.get('x-vercel-ip-country');
  const market = marketFromCountry(country);
  const live = await getLivePricing(market, country);

  const pro = PLANS.find((p) => p.id === 'pro');
  const livePro = live.byPlan?.pro;

  const currency: Currency = livePro?.currency ?? live.currency ?? MARKET_CURRENCY[market];
  const monthly = livePro?.amount ?? pro?.price?.[currency]?.monthly ?? null;
  const yearly = livePro?.yearly ?? pro?.price?.[currency]?.yearly ?? null;

  return (
    <main lang="tr" className="min-h-screen bg-ink text-frost">
      <div className="mx-auto max-w-3xl px-5 py-14 sm:py-20">
        <a
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-mist transition-colors hover:text-accent"
        >
          ← MotoFull ana sayfa
        </a>

        <h1 className="mt-8 font-display text-3xl font-bold text-white sm:text-4xl">
          Abonelik ve Ödeme
        </h1>
        <p className="mt-3 leading-relaxed text-mist">
          MotoFull, motosiklet servis işletmeleri için bulut tabanlı bir servis
          yönetim yazılımıdır. Aşağıda satın alma öncesinde bilmeniz gereken
          bilgiler yer alır.
        </p>

        {/* ── 1) Paket ve fiyat ─────────────────────────────────── */}
        <section className="mt-12">
          <h2 className="font-display text-lg font-bold text-white">1. Paket ve fiyat</h2>

          <div className="glass mt-4 rounded-2xl p-6">
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <div>
                <p className="font-display text-xl font-bold text-white">MotoFull Pro</p>
                <p className="mt-1 text-sm text-mist">
                  Sınırsız müşteri, iş emri ve kullanıcı
                </p>
              </div>
              {monthly !== null && (
                <div className="text-right">
                  <p className="font-display text-2xl font-bold text-accent">
                    {formatPrice(monthly, currency)}
                    <span className="text-base font-medium text-mist"> / ay</span>
                  </p>
                  {yearly !== null && (
                    <p className="mt-0.5 text-xs text-mist">
                      Yıllık ödemede {formatPrice(yearly, currency)} / yıl
                    </p>
                  )}
                </div>
              )}
            </div>

            <ul className="mt-5 space-y-2 border-t border-white/10 pt-5">
              {PRO_KAPSAM.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm text-frost/85">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                  {f}
                </li>
              ))}
            </ul>

            <p className="mt-5 text-xs leading-relaxed text-mist">
              Fiyatlara KDV dahildir. Abonelik, seçtiğiniz döneme göre aylık veya
              yıllık olarak yenilenir; dilediğiniz zaman panelden iptal
              edebilirsiniz. Ödeme alınmadan önce{' '}
              <strong className="text-frost">{TRIAL_DAYS} gün ücretsiz deneme</strong>{' '}
              kullanabilirsiniz — deneme için kart bilgisi istenmez.
            </p>
          </div>
        </section>

        {/* ── 2) Ödeme adımları ─────────────────────────────────── */}
        <section className="mt-12">
          <h2 className="font-display text-lg font-bold text-white">2. Ödeme nasıl yapılır</h2>

          <ol className="mt-4 space-y-3">
            {[
              {
                t: 'Hesabınızı oluşturun',
                d: 'Abonelik bir servis işletmesine tanımlanır; bu yüzden önce işletme hesabı açılır.',
              },
              {
                t: 'Paketi seçip ödemeye geçin',
                d: 'Hesap açıldıktan sonra abonelik ekranından paketi onaylarsınız.',
              },
              {
                t: 'iyzico’nun güvenli ödeme formunda ödersiniz',
                d: 'Kart bilgileriniz iyzico tarafından alınır ve MotoFull sunucularına hiçbir zaman ulaşmaz.',
              },
              {
                t: 'Panele dönersiniz',
                d: 'Ödeme doğrulandığında paketiniz açılır ve panele yönlendirilirsiniz.',
              },
            ].map((s, i) => (
              <li key={s.t} className="glass flex gap-4 rounded-xl p-4">
                <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-accent/15 text-sm font-bold text-accent">
                  {i + 1}
                </span>
                <div>
                  <p className="text-sm font-semibold text-white">{s.t}</p>
                  <p className="mt-0.5 text-sm leading-relaxed text-mist">{s.d}</p>
                </div>
              </li>
            ))}
          </ol>

          <a
            href={`${company.panelUrl}/demo-kayit?next=/subscription`}
            className="mt-6 block w-full rounded-xl bg-accent px-6 py-4 text-center font-semibold text-white transition hover:bg-accent-soft"
          >
            Hesap oluştur ve ödemeye geç
          </a>
          <p className="mt-3 text-center text-xs text-mist">
            Hesabınız var mı?{' '}
            <a href={company.panelUrl} className="text-accent hover:underline">
              Panele giriş yapın
            </a>
          </p>
        </section>

        {/* ── 3) Ödeme yöntemleri ───────────────────────────────── */}
        <section className="mt-12">
          <h2 className="font-display text-lg font-bold text-white">3. Ödeme yöntemleri</h2>
          <PaymentTrust lang="tr" className="mt-4" />
        </section>

        {/* ── 4) Satıcı bilgileri ───────────────────────────────── */}
        <section className="mt-12">
          <h2 className="font-display text-lg font-bold text-white">4. Satıcı bilgileri</h2>
          <p className="mt-2 text-sm leading-relaxed text-mist">
            6502 sayılı Tüketicinin Korunması Hakkında Kanun kapsamında ön
            bilgilendirme.
          </p>

          <div className="glass mt-4 rounded-2xl px-6 py-2">
            <Row label="Satıcı" value={company.legalName} />
            <Row label="Adres" value={formattedAddress()} />
            <Row
              label="Vergi dairesi / no"
              value={`${company.taxOffice} — ${company.taxNo}`}
            />
            <Row
              label="E-posta"
              value={
                <a href={`mailto:${company.email}`} className="text-accent hover:underline">
                  {company.email}
                </a>
              }
            />
            <Row
              label="Satışa konu hizmet"
              value="MotoFull servis yönetim yazılımı — süreli kullanım aboneliği (elektronik ortamda ifa edilir)"
            />
            <Row label="Ödeme kuruluşu" value="iyzico (iyzi Ödeme Hizmetleri A.Ş.)" />
          </div>
        </section>

        {/* ── 5) Sözleşmeler ────────────────────────────────────── */}
        <section className="mt-12">
          <h2 className="font-display text-lg font-bold text-white">5. Sözleşmeler</h2>
          <p className="mt-2 text-sm leading-relaxed text-mist">
            Satın alma işlemini tamamlamadan önce aşağıdaki metinleri
            okuyabilirsiniz. Ödeme adımında onayınız alınır.
          </p>
          <ul className="mt-4 space-y-2">
            {([
              ['Mesafeli Satış Sözleşmesi', '/mesafeli-satis'],
              ['İade ve Cayma Hakkı', '/iade-ve-cayma'],
              ['Kullanım Şartları', '/kullanim-sartlari'],
              ['KVKK Aydınlatma Metni', '/kvkk'],
            ] as const).map(([label, href]) => (
              <li key={href}>
                <a
                  href={href}
                  className="glass block rounded-xl px-4 py-3 text-sm font-medium text-frost transition hover:border-accent/40 hover:text-accent-soft"
                >
                  {label} →
                </a>
              </li>
            ))}
          </ul>
        </section>

        <p className="mt-12 border-t border-white/10 pt-6 text-sm text-mist">
          Sorularınız için:{' '}
          <a href={`mailto:${company.email}`} className="text-accent hover:underline">
            {company.email}
          </a>
        </p>
      </div>
    </main>
  );
}
