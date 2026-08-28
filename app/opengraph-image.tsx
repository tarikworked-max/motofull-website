import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'MotoFull — Workshop Management for Motorcycle Service';

/**
 * Sosyal paylaşım kartı.
 *
 * NEDEN GEREKLİ: `twitter:card` `summary_large_image` olduğu için
 * görsel zorunlu; yoksa her paylaşım boş kart olarak render oluyordu.
 *
 * LOGO TEK KAYNAK: Panel, mobil ve bu site AYNI marka dosyasını
 * kullanır (frontend/src/assets/brand/motofull-wordmark.png ile
 * birebir aynı bayt). Burada harflerden logo ÜRETİLMEZ — üretilen bir
 * işaret gerçek logoya benzemez ve marka üç yüzeyde ayrışır.
 *
 * Dosya çalışma anında okunup gömülür: ImageResponse dış adres
 * çağıramaz, `src` mutlaka data URI olmalıdır.
 */
export default async function OpengraphImage() {
  const logo = await readFile(join(process.cwd(), 'public', 'brand', 'logo.png'));
  const logoSrc = `data:image/png;base64,${logo.toString('base64')}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '0 90px',
          background: '#0a1120',
          backgroundImage:
            'radial-gradient(circle at 80% 15%, rgba(255,107,26,0.22), transparent 55%)',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} alt="MotoFull" width={340} height={61} style={{ marginBottom: 44 }} />

        <div
          style={{
            color: '#e6edf7',
            fontSize: 62,
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: -2,
            maxWidth: 900,
          }}
        >
          Workshop management for motorcycle service
        </div>
        <div style={{ color: '#94a3b8', fontSize: 29, marginTop: 26, maxWidth: 860 }}>
          Work orders, customers, inventory and AI-assisted diagnosis in one panel.
        </div>
        <div style={{ color: '#ff8c42', fontSize: 25, marginTop: 38, fontWeight: 600 }}>
          Free 7-day demo — no card required
        </div>
      </div>
    ),
    size
  );
}
