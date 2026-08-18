/**
 * company.ts — Şirket ve yasal bilgilerin TEK kaynağı.
 *
 * ⚠️ DOLDURULMASI GEREKEN TEK DOSYA BUDUR.
 * Aşağıdaki `TODO` ile işaretli alanları kendi şirket bilgilerinle
 * değiştir; KVKK aydınlatma metni, gizlilik politikası, mesafeli satış
 * sözleşmesi, iade politikası ve site altbilgisi bu değerleri otomatik
 * kullanır. Metinlerin içinde ayrıca şirket adı aramana gerek yok.
 *
 * ⚖️ YASAL UYARI: Bu dosyanın beslediği sözleşme ve politika metinleri
 * sektör standardı taslaklardır, hukuki görüş değildir. Yayına almadan
 * önce bir avukata (Türkiye için KVKK ve 6502, AB satışı için GDPR ve
 * tüketici hukuku) inceletilmelidir.
 */

export const company = {
  /* ── Ticari kimlik ──────────────────────────────────────────── */
  /** Yasal ticaret unvanı — sözleşmelerde geçen tam ad. */
  legalName: 'Motofull Software',
  /** Markanın günlük kullanılan adı. */
  brandName: 'MotoFull',

  /** TODO: Ticaret sicil numarası */
  tradeRegistryNo: 'TODO: Ticaret Sicil No',
  /** TODO: MERSİS numarası (16 hane) */
  mersisNo: 'TODO: MERSİS No',
  /** TODO: Vergi dairesi ve vergi kimlik numarası */
  taxOffice: 'TODO: Vergi Dairesi',
  taxNo: 'TODO: Vergi Kimlik No',

  /* ── İletişim ───────────────────────────────────────────────── */
  address: {
    line: 'TODO: Açık adres (cadde, no, daire)',
    district: 'TODO: İlçe',
    city: 'TODO: İl',
    postalCode: 'TODO: Posta kodu',
    country: 'Türkiye',
  },
  phone: '+90 531 789 92 95',
  /** Genel iletişim adresi. */
  email: 'info@motofull.com.tr',
  /**
   * KVKK/GDPR başvurularının gideceği adres — ideal olarak genel
   * e-postadan ayrı olmalıdır.
   *
   * ŞU AN info@ kullanılıyor çünkü ayrı bir kvkk@ kutusunun mevcut
   * olduğu doğrulanmadı. KVKK başvuruları yasal süre içinde
   * yanıtlanmak zorundadır; var olmayan bir adres yayınlamak
   * başvuruların ulaşmaması demektir — bu, ayrı kutu olmamasından
   * daha ağır bir kusurdur.
   *
   * kvkk@motofull.com.tr açıldığında burası güncellenmelidir.
   */
  privacyEmail: 'info@motofull.com.tr',
  /** Destek talepleri. Ayrı destek kutusu açılınca güncellenmeli. */
  supportEmail: 'info@motofull.com.tr',

  /* ── Alan adları ────────────────────────────────────────────── */
  websiteUrl: 'https://motofull.com.tr',
  panelUrl: 'https://panel.motofull.com.tr',

  /**
   * Sosyal medya adresleri. Doldurulan ikonlar altbilgide görünür,
   * boş bırakılanlar hiç render edilmez — ödeme alan bir sitede
   * hiçbir yere gitmeyen ikon güven kaybettirir.
   */
  social: {
    x: '',
    linkedin: '',
    instagram: '',
    youtube: '',
  } as Record<string, string>,

  /* ── Veri koruma ────────────────────────────────────────────── */
  /**
   * KVKK Veri Sorumluları Sicili (VERBİS) kaydı.
   * Yıllık çalışan sayısı 50'den az VE yıllık mali bilanço 25 milyon TL'den
   * azsa ve ana faaliyet özel nitelikli veri işleme değilse VERBİS kaydı
   * zorunlu değildir. Kaydın varsa numarasını yaz, yoksa null bırak.
   */
  verbisNo: null as string | null,

  /**
   * AB'de temsilci (GDPR Md.27). AB'ye düzenli hizmet satacaksan ve AB'de
   * yerleşik değilsen bir temsilci atamak zorunludur. Atadıktan sonra
   * doldur; boşken AB pazarına satış yapılmamalı.
   */
  euRepresentative: null as { name: string; address: string; email: string } | null,

  /* ── Metin sürümleri ────────────────────────────────────────── */
  /** Yasal metinler her güncellendiğinde bu tarihi değiştir. */
  legalLastUpdated: '2026-08-01',
} as const;

/**
 * Bir alan gercekten doldurulmus mu?
 * "TODO:" ile isaretli sablon degerler DOLU SAYILMAZ — bunlarin
 * ziyaretciye gosterilmesi (ornegin altbilgide "TODO: Tam Ticaret
 * Unvani" yazmasi) yayina cikmis bir hatadir.
 */
export function isFilled(value?: string | null): boolean {
  return typeof value === 'string' && value.trim().length > 0 && !value.includes('TODO');
}

/** Doluysa degeri, degilse yedegi dondurur. */
export function filledOr(value: string, fallback: string): string {
  return isFilled(value) ? value : fallback;
}

/** Altbilgi ve sözleşmelerde kullanılan tek satırlık adres. */
export function formattedAddress(): string {
  const a = company.address;
  return `${a.line}, ${a.postalCode} ${a.district}/${a.city}, ${a.country}`;
}

/**
 * Şirket bilgileri hâlâ doldurulmamış mı?
 * Yasal sayfalar bu durumda görünür bir uyarı gösterir — böylece
 * yayına yanlışlıkla "TODO" yazan bir sözleşmeyle çıkılmaz.
 */
export function hasPlaceholders(): boolean {
  return JSON.stringify(company).includes('TODO');
}
