# MotoFull Website

MotoFull'un tanıtım/pazarlama sitesi. Next.js 15 (App Router) + TypeScript + Tailwind CSS v4 + Framer Motion + Lucide Icons.

## Komutlar

```bash
npm install
npm run dev     # http://localhost:3100
npm run build   # üretim derlemesi (tamamen statik çıktı)
npm start
```

## Yapı

```
app/
  layout.tsx        # SEO metadata, Open Graph, Twitter Card, JSON-LD, fontlar
  globals.css       # Tasarım sistemi (renk token'ları, glass, gradient, animasyonlar)
  page.tsx          # Bölümlerin birleştirildiği ana sayfa
components/
  ui.tsx            # Logo, Reveal (scroll animasyonu), SectionHeading, Counter, Magnetic buton
  demo-modal.tsx    # DemoProvider context + demo talep popup'ı
  navbar.tsx        # Yapışkan nav + mobil menü
  hero.tsx          # Hero, istatistik sayaçları, yüzen kartlar
  dashboard-mockup.tsx  # Elle çizilmiş panel mockup'ı (hero + laptop vitrini ortak kullanır)
  problem-solution.tsx  # Marquee (güven şeridi), Sorun, Çözüm
  features.tsx      # 8 modüllü sekmeli özellik vitrini
  showcase-ai.tsx   # Parallax laptop vitrini + AI teşhis sohbet mockup'ı
  workflow-stats.tsx    # 9 adımlı iş akışı, Önce/Sonra, sayaçlı istatistikler
  social.tsx        # Referanslar, Planlar (fiyatsız), SSS akordeonu
  contact-footer.tsx    # İletişim formu, bilgi kartları, footer, mobil yapışkan CTA
```

## Tasarım sistemi

- **Renkler:** `ink` (#04060c), `navy`, `surface`, `card` koyu zeminler; `accent` (#ff6b1a turuncu), `electric` (mavi), `frost`/`mist` metin tonları — hepsi `globals.css` içindeki `@theme` bloğunda.
- **Tipografi:** Inter (gövde) + Space Grotesk (`font-display`, başlıklar).
- **Efektler:** `.glass`, `.glass-strong`, `.text-gradient`, `.grid-bg`, `.glow-orange`, `.card-hover`, marquee/float/pulse animasyonları. `prefers-reduced-motion` destekli.

## Notlar / sonraki adımlar

- Demo ve iletişim formları şu an yalnızca ön yüzde "gönderildi" durumu gösterir — gerçek gönderim için bir API endpoint'i (ör. mevcut backend'e `POST /api/leads`) bağlanmalı.
- Telefon/WhatsApp numaraları ve sosyal medya linkleri placeholder.
- OG görseli (`opengraph-image.png`) eklenirse paylaşım kartları görselli olur.
- Referanslar ve istatistikler temsili içeriktir; gerçek müşteri verisiyle güncellenmeli.
