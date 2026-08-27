"use client";

import { ShieldCheck } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

/**
 * StorageNotice — tarayıcı depolaması BİLDİRİMİ (onay kapısı DEĞİL).
 *
 * NEDEN ONAY KAPISI DEĞİL: MotoFull sitesi yalnızca ZORUNLU tarayıcı
 * depolaması kullanıyor — oturum, dil tercihi, sekme içi sayfa sayacı.
 * Reklam çerezi, sosyal medya pikseli, Google Analytics ya da başka bir
 * harici analitik aracı YOK (bkz. /cerez-politikasi). Ziyaret sayımı
 * kendi sunucumuzda ve ham IP saklanmadan yapılıyor.
 *
 * Talep edilen hizmetin çalışması için zorunlu olan depolama, GDPR ve
 * KVKK kapsamında ÖNCEDEN ONAY GEREKTİRMEZ. Bu yüzden burada
 * "Tümünü kabul et / Reddet / Tercihleri yönet" üçlüsü YOKTUR:
 *
 *   1. Reddedilecek isteğe bağlı bir şey olmadığı için "Reddet" düğmesi
 *      hiçbir şey yapmazdı — çalışmayan bir düğme koymak, ziyaretçiye
 *      seçim sunuyormuş gibi görünüp aslında sunmamaktır.
 *   2. "Analitik" ve "Pazarlama" kategorileri göstermek, var olmayan bir
 *      takibi VAR gibi sunardı. Bu, kendi gizlilik duruşumuzu olduğundan
 *      kötü göstermek olurdu.
 *
 * Bu bileşen SİTEYE ANALİTİK EKLENDİĞİ GÜN yetersiz kalır. O gün
 * yapılacak şey buraya sahte kategori eklemek değil, gerçek bir onay
 * kapısı kurmak ve isteğe bağlı betikleri onay gelene kadar YÜKLEMEMEKTİR.
 *
 * NEDEN framer-motion KULLANILMIYOR (sitenin geri kalanı kullanıyor):
 * Bu bileşen önce `AnimatePresence` + `motion.aside` ile yazıldı ve
 * tarayıcıda İKİ kez bozuldu — çıkış animasyonu düğümü DOM'dan
 * kaldırmadı, ardından giriş animasyonu hiç çalışmadı (framer-motion 11
 * + React 19). Derleme ve tip denetimi ikisinde de TEMİZDİ; hatalar
 * yalnızca sayfa açılıp odak denenerek görüldü. Sabit konumlu, iki
 * durumu olan bir bildirim için CSS geçişi hem yeter hem de bu
 * belirsizliği tamamen ortadan kaldırır.
 */

/**
 * Bildirimin kapatıldığını hatırlayan anahtar.
 *
 * DİKKAT: Bu kalem /cerez-politikasi sayfasındaki depolama tablosunda da
 * LİSTELENMİŞTİR. O sayfanın değeri, kullanılan her kalemi eksiksiz
 * saymasından geliyor; bildirimin kendisi listede olmayan bir kalem
 * yazsaydı sayfa kendi iddiasını çürütürdü.
 */
const STORAGE_KEY = "motofull_storage_notice";

/** Geçiş süresi (ms). Aşağıdaki `duration-300` ile AYNI olmalı. */
const TRANSITION_MS = 300;

export function StorageNotice() {
  /**
   * `mounted` = DOM'da mı · `closing` = kapanış geçişi oynuyor mu.
   *
   * İKİSİ AYRI: kapanış geçişinin oynayabilmesi için düğümün geçiş
   * boyunca DOM'da kalması, geçiş bitince de KESİNLİKLE kaldırılması
   * gerekiyor. Tek durumla bunun ikisi birden yapılamaz.
   *
   * Kaldırma neden şart: kapatılmış ama DOM'da kalan bildirim gözle
   * görünmez olsa bile "Understood" düğmesi ve politika bağlantısı SEKME
   * SIRASINDA kalır; klavyeyle gezen ziyaretçi görünmeyen bir denetime
   * düşer. Bu hata bir kez gerçekten yaşandı ve tarayıcıda odak
   * denenerek yakalandı — derleme temiz olduğu için gözden kaçıyordu.
   */
  const [mounted, setMounted] = useState(false);
  const [closing, setClosing] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    /* Depolama erişimi engellenmiş olabilir (gizli sekme katı ayarlar,
       kurumsal politika). Bu durumda bildirim gösterilmez: okuyamadığımız
       için kapatıldığını da kaydedemeyiz ve her gezinmede yeniden
       belirip ziyaretçiyi rahatsız ederdi. */
    try {
      if (!window.localStorage.getItem(STORAGE_KEY)) setMounted(true);
    } catch {
      /* sessizce geç — bildirim gösterilmez */
    }
  }, []);

  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  const dismiss = useCallback(() => {
    setClosing(true);
    try {
      window.localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* yazamadıysak bildirim bir sonraki ziyarette tekrar çıkar;
         kabul edilebilir, alternatifi çökmek olurdu */
    }
    /* Geçiş bitince DOM'dan çık. */
    timer.current = setTimeout(() => setMounted(false), TRANSITION_MS);
  }, []);

  /* Esc ile kapatma — fare kullanmayan ziyaretçi için. Bileşen bir
     iletişim kutusu OLMADIĞI için odak hapsedilmez: sayfanın önüne
     geçmeyen bir bildirimde odağı hapsetmek gezinmeyi engellerdi. */
  useEffect(() => {
    if (!mounted) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") dismiss();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mounted, dismiss]);

  if (!mounted) return null;

  return (
    <aside
      /* role="region" + erişilebilir ad: ekran okuyucu bunu atlanabilir
         bir bölge olarak duyurur. Uyarı (alert) DEĞİL — acil bir durum
         yok ve alert okumayı böler. */
      role="region"
      aria-label="Browser storage notice"
      className={[
        "fixed inset-x-0 bottom-0 z-50 flex justify-center p-4 sm:p-6",
        /**
         * GİRİŞ ANİMASYONU YOK — BİLİNÇLİ.
         *
         * Önce framer-motion ile, sonra CSS animasyonuyla denendi;
         * ikisinde de bildirim `opacity: 0` ile GÖRÜNMEZ kaldı (biri
         * hiç oynamadı, diğeri ilk karesinde dondu). Derleme ve tip
         * denetimi her seferinde temizdi.
         *
         * Bu bileşenin tek işi GÖRÜLMEK. Görünürlüğü, oynayacağı garanti
         * olmayan bir animasyonun son karesine bağlamak kabul edilebilir
         * bir ödünleşme değil: animasyon oynamazsa bildirim yok demektir.
         * Bu yüzden bildirim doğrudan görünür halde belirir.
         *
         * ÇIKIŞ geçişi kalabilir: kullanıcı düğmeye bastığında sekme
         * kesinlikle etkindir ve DOM'dan kaldırma zaten animasyona değil
         * zamanlayıcıya bağlıdır — geçiş oynamasa bile bildirim kapanır.
         */
        "transition-[opacity,transform] duration-300 ease-out",
        "motion-reduce:transition-none",
        closing ? "translate-y-6 opacity-0" : "translate-y-0 opacity-100",
      ].join(" ")}
    >
      <div className="flex w-full max-w-3xl flex-col gap-4 rounded-2xl border border-white/12 bg-card/95 p-5 shadow-2xl backdrop-blur-md sm:flex-row sm:items-center sm:gap-5 sm:p-6">
        <ShieldCheck
          className="h-6 w-6 shrink-0 text-accent sm:h-7 sm:w-7"
          aria-hidden="true"
        />

        <p className="flex-1 text-sm leading-relaxed text-mist">
          <span className="font-semibold text-frost">
            No tracking on this site.
          </span>{" "}
          MotoFull uses only the browser storage needed to keep you signed in
          and remember your language. No advertising cookies, no social pixels,
          no third-party analytics.{" "}
          <a
            href="/cerez-politikasi"
            className="font-semibold text-accent-soft underline underline-offset-4 transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Cookie policy (Turkish)
          </a>
          .
        </p>

        <button
          type="button"
          onClick={dismiss}
          className="shrink-0 rounded-full bg-accent px-6 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-accent-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          Understood
        </button>
      </div>
    </aside>
  );
}
