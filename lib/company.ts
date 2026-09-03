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
  /**
   * Satıcının yasal kimliği — sözleşmelerde geçen ad.
   *
   * KAYNAK: vergi levhası (Karadeniz V.D., 03.08.2026).
   *
   * ŞAHIS İŞLETMESİ: levhada "TİCARET ÜNVANI" alanı BOŞTUR; satıcı
   * gerçek kişinin kendisidir. Bu yüzden burada tüzel bir unvan değil,
   * levhadaki AD SOYAD yazar. Önceden "MotoFull Software Teknoloji
   * Anonim Şirketi" yazıyordu — böyle bir tüzel kişi yok; iyzico
   * incelemesinde levhayla karşılaştırıldığında tek başına ret
   * sebebiydi.
   *
   * "MotoFull" markadır, satıcı değildir (bkz. brandName).
   */
  legalName: 'Muhammet Tarık Kılıç',
  /** Markanın günlük kullanılan adı. */
  brandName: 'MotoFull',

  /**
   * ŞAHIS İŞLETMESİ — ticaret sicil ve MERSİS YOK.
   *
   * Boş dize bilinçlidir: `isFilled()` bunu "doldurulmamış" sayar ve
   * ilgili satır hiç render edilmez. "TODO:" yazmak "eksik, sonra
   * doldurulacak" demektir; burada doldurulacak bir şey YOKTUR ve
   * uydurma bir numara yazmak vergi levhasıyla çelişirdi.
   */
  tradeRegistryNo: '',
  mersisNo: '',

  /**
   * Vergi levhasındaki bilgiler.
   *
   * ⛔ T.C. KİMLİK NUMARASI BURAYA YAZILMAZ.
   *
   * Levhada TCKN de yer alır ama o ÖZEL NİTELİKLİ KİŞİSEL VERİDİR.
   * Web sitesinde yayınlamak KVKK ihlalidir ve kimlik hırsızlığına
   * kapı açar. iyzico'ya belge zaten doğrudan yükleniyor; kimlik
   * numarasının ayrıca sitede durmasına ihtiyaç yoktur.
   *
   * Mesafeli satışta satıcının tanınabilir olması için ad-soyad,
   * adres, vergi dairesi ve vergi numarası YETERLİDİR.
   */
  taxOffice: 'Karadeniz Vergi Dairesi',
  taxNo: '5520594438',

  /* ── İletişim ───────────────────────────────────────────────── */
  address: {
    /* Vergi levhasındaki iş yeri adresiyle BİREBİR. Kapı numarası
       levhada "12/1C İç Kapı No: 4" biçiminde; kısaltılmış bir adres
       (örn. "12/C") belgeyle karşılaştırıldığında tutmazdı. */
    line: 'Kanuni Mah. İstiklal Cad. No: 12/1C İç Kapı No: 4',
    district: 'Ortahisar',
    city: 'Trabzon',
    /* Posta kodu levhada YOK. Trabzon/Ortahisar için bir kod tahmin
       etmek, belgeyle karşılaştırıldığında tutmayabilirdi;
       `formattedAddress()` boş alanı atlar. */
    postalCode: '',
    country: 'Türkiye',
  },
  /**
   * TELEFON/WHATSAPP KASTEN YOK.
   *
   * Ürün kararı: tüm müşteri iletişimi e-posta üzerinden yürür.
   * Buraya bir numara eklenirse altbilgide ve mesafeli satış
   * sözleşmesinde otomatik görünür — o yüzden alanın kendisi
   * kaldırıldı, boş bırakılmadı. Boş bir alan "doldurulmayı bekleyen
   * eksik" gibi okunur; olmayan alan kararı belli eder.
   *
   * Mesafeli satış sözleşmesinde satıcı iletişimi olarak e-posta
   * yeterlidir (6502 sk. kapsamında erişilebilir kalıcı veri
   * sağlayıcısı). Yayın öncesi avukat incelemesi şartı değişmedi.
   */

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
  websiteUrl: 'https://www.motofull.com.tr',
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

/**
 * Altbilgi ve sözleşmelerde kullanılan tek satırlık adres.
 *
 * BOŞ ALAN ATLANIR. Posta kodu girilmemişse eskiden çıktıda çift
 * boşluk ve başıboş bir virgül kalıyordu ("…, /Trabzon"); eksik veriyi
 * biçim hatasına çevirmek, adresi hatalı gösterir.
 */
export function formattedAddress(): string {
  const a = company.address;
  const locality = [a.postalCode, [a.district, a.city].filter(isFilled).join('/')]
    .filter(isFilled)
    .join(' ');

  return [a.line, locality, a.country].filter(isFilled).join(', ');
}

/**
 * Şirket bilgileri hâlâ doldurulmamış mı?
 * Yasal sayfalar bu durumda görünür bir uyarı gösterir — böylece
 * yayına yanlışlıkla "TODO" yazan bir sözleşmeyle çıkılmaz.
 */
export function hasPlaceholders(): boolean {
  return JSON.stringify(company).includes('TODO');
}
