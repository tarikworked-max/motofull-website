import Image from "next/image";

/**
 * payment-trust.tsx — ODEME GUVEN SERIDI.
 *
 * NEDEN VAR: iyzico uye isyeri basvurusu, web sitesinde "iyzico ile
 * Ode", Visa ve Mastercard logolarinin GORUNUR olmasini sart kosuyor
 * (docs.iyzico.com/ek-bilgiler/iyzico-logo-paketi). Basvuru panosu bu
 * uc maddeyi eksik olarak isaretlemisti.
 *
 * ── GORSELLER RESMI PAKETTEN, BIREBIR ─────────────────────────────
 *
 * Her iki dosya da iyzico'nun kendi yayinladigi logo paketinden
 * cikarildi ve BAYT BAYT degistirilmedi:
 *
 *   public/payment/iyzico-ile-ode.svg    ← Tr_White_Horizontal
 *   public/payment/iyzico-logo-band.svg  ← footer White/logo_band_white
 *
 * LOGO YENIDEN CIZILMEZ. Harflerden "Visa" yazmak ya da benzer bir
 * amblem uretmek marka ihlalidir ve inceleme sirasinda reddedilir.
 * Ayni ilke MotoFull'un kendi logosunda da gecerli (bkz. ui.tsx).
 *
 * ── SERITTEKI TROY VE AMEX ────────────────────────────────────────
 *
 * Resmi serit TEK PARCADIR: iyzico + Visa + Mastercard + Troy + Amex
 * ayni SVG icinde gelir ve Visa/Mastercard markalarinin baska bir
 * resmi kaynagi YOKTUR. Serit KIRPILMADI — lisansli bir marka
 * gorselini duzenlemek iyzico'nun kendi kurallarina aykiridir.
 *
 * Bu yuzden baslik "sunlari kabul ediyoruz" DEMEZ. Serit, odemenin
 * iyzico altyapisi uzerinden alindigini soyler; MotoFull'un hangi kart
 * ailelerini kabul ettigine dair bir iddia DEGILDIR. Kabul listesi gibi
 * yazsaydik, hesapta acik olmayan bir kart ailesini vaat etmis olurduk.
 *
 * ── DIL ───────────────────────────────────────────────────────────
 *
 * Metin BILESENE GOMULU DEGILDIR; `lang` ile secilir. Sitede ayri bir
 * i18n cercevesi yok — pazarlama sayfasi Ingilizce, yasal sayfalar
 * Turkce (bkz. legal-layout.tsx `lang` prop'u). Ayni desen burada da
 * uygulaniyor, yeni bir altyapi kurulmadi.
 */

const COPY = {
  tr: {
    heading: "Güvenli ödeme",
    note: "Ödemeler lisanslı ödeme kuruluşu iyzico altyapısı üzerinden alınır. Kart bilgileriniz iyzico'nun ödeme formunda girilir ve MotoFull sunucularına hiçbir zaman ulaşmaz.",
    payAlt: "iyzico ile Öde",
    bandAlt: "iyzico, Visa ve Mastercard ile güvenli ödeme",
  },
  en: {
    heading: "Secure payment",
    note: "Payments are processed by iyzico, a licensed payment institution. Card details are entered on iyzico's own payment form and never reach MotoFull's servers.",
    payAlt: "Pay with iyzico",
    bandAlt: "Secure payment with iyzico, Visa and Mastercard",
  },
} as const;

export function PaymentTrust({
  lang = "en",
  className = "",
}: {
  lang?: "tr" | "en";
  className?: string;
}) {
  const t = COPY[lang];

  return (
    <section
      aria-label={t.heading}
      className={`glass rounded-2xl border border-white/10 p-6 sm:p-7 ${className}`}
    >
      <h2 className="font-display text-sm font-semibold uppercase tracking-widest text-mist">
        {t.heading}
      </h2>

      {/* Markalar.
          ORANTI KORUMASI — `h-*` DEGIL, `max-h-*` + `max-w-full`.
          Sabit yukseklik verilirse dar ekranda `max-w-full` genisligi
          keser ama yukseklik sabit kalir ve logo YATAY EZILIR: 456x32
          serit 320px'te 14.25 yerine 9.58 orana dusuyordu. Iki eksende
          de "en fazla" demek, tarayiciya oranti korunarak kucultme
          izni verir. Olculdu: 320/375/414/768/1024/1440. */}
      <div className="mt-5 flex flex-col items-start gap-5">
        {/* "iyzico ile Ode" — basvurunun acikca istedigi logo. */}
        <Image
          src="/payment/iyzico-ile-ode.svg"
          alt={t.payAlt}
          width={210}
          height={31}
          className="h-auto w-auto max-h-7 max-w-full sm:max-h-8"
          /* Denetimci sayfayi actiginda GORMELI: tembel yukleme,
             altbilgiye hic kaydirmayan bir incelemede logoyu
             yuklenmemis birakabilirdi. */
          loading="eager"
          /* SVG optimizasyondan gecmez: resmi gorsel BIREBIR sunulur. */
          unoptimized
        />

        {/* Visa + Mastercard (+ iyzico, Troy, Amex) — resmi serit.
            ALT ALTA, yan yana DEGIL: seridin solunda da kucuk bir
            "iyzico ile Ode" var ve iki logo yan yana konunca ayni marka
            iki kez tekrarlanmis gibi duruyordu. Alt alta dizilince
            ustteki "odemeyi kim aliyor", alttaki "hangi kart aileleri"
            sorusunu yanitlayan iki AYRI ifade olarak okunuyor. */}
        <Image
          src="/payment/iyzico-logo-band.svg"
          alt={t.bandAlt}
          width={456}
          height={32}
          className="h-auto w-auto max-h-6 max-w-full sm:max-h-7"
          loading="eager"
          unoptimized
        />
      </div>

      <p className="mt-5 max-w-2xl text-sm leading-relaxed text-mist">{t.note}</p>
    </section>
  );
}
