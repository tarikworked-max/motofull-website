/**
 * contact.ts — Public iletişim/lead gönderiminin TEK kaynağı.
 *
 * Sitede iki form var (sayfa altındaki Contact bölümü ve "Talk to us"
 * modalı). İkisi de aynı backend uç noktasına gider. Gönderim mantığını
 * iki yerde tutmak, birinde düzeltip diğerini unutmak demektir — nitekim
 * modal tam bu yüzden uzun süre hiçbir yere göndermeden "aldık" dedi.
 *
 * Kullanılan uç nokta ZATEN VAR, yeni altyapı eklenmedi:
 *   POST {NEXT_PUBLIC_API_URL}/api/public/contact
 *   - IP başına saatte 5 istek (express-rate-limit)
 *   - Sunucu doğrulaması: fullName zorunlu, phone VEYA email zorunlu
 *   - Kayıt ContactRequest olarak saklanır
 *
 * DÜRÜSTLÜK KURALI: Bu fonksiyon yalnızca sunucu gerçekten 2xx
 * döndürdüğünde ok:true verir. Ulaşmayan bir mesajı "iletildi" diye
 * göstermek kabul edilemez.
 */

export type ContactFailure =
  | 'not-configured'
  | 'rate-limited'
  | 'invalid'
  | 'network'
  | 'server';

export type ContactResult =
  | { ok: true }
  | { ok: false; reason: ContactFailure; message: string };

export interface ContactInput {
  fullName: string;
  email?: string;
  phone?: string;
  workshop?: string;
  message?: string;
}

/** API adresi tanımlı mı? Form bunu bilmeden başarı gösteremez. */
export function isApiConfigured(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_API_URL);
}

export async function submitContactRequest(input: ContactInput): Promise<ContactResult> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    return {
      ok: false,
      reason: 'not-configured',
      message: 'The contact form is not connected yet.',
    };
  }

  const fullName = input.fullName.trim();
  const email = (input.email || '').trim();
  const phone = (input.phone || '').trim();

  // İstemci tarafı ön kontrol — sunucu doğrulamasının YERİNE geçmez,
  // yalnızca gereksiz isteği ve rate-limit tüketimini önler.
  if (!fullName) {
    return { ok: false, reason: 'invalid', message: 'Please enter your name.' };
  }
  if (!email && !phone) {
    return { ok: false, reason: 'invalid', message: 'Please enter an email address or a phone number.' };
  }

  const workshop = (input.workshop || '').trim();

  try {
    const res = await fetch(apiUrl.replace(/\/+$/, '') + '/api/public/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fullName,
        email,
        phone,
        subject: workshop ? 'Website enquiry — ' + workshop : 'Website enquiry',
        message: (input.message || '').trim(),
        requestType: 'demo',
        audience: 'servis',
        source: 'website',
        landingPath: typeof window !== 'undefined' ? window.location.pathname : '/',
      }),
    });

    if (res.ok) return { ok: true };

    if (res.status === 429) {
      return {
        ok: false,
        reason: 'rate-limited',
        message: 'Too many requests from this connection. Please try again in a little while.',
      };
    }

    const data = await res.json().catch(() => null);
    return {
      ok: false,
      reason: res.status >= 400 && res.status < 500 ? 'invalid' : 'server',
      message: (data && typeof data.message === 'string' && data.message)
        || 'We could not send your message. Please try again.',
    };
  } catch {
    return {
      ok: false,
      reason: 'network',
      message: 'We could not reach the server. Please check your connection and try again.',
    };
  }
}
