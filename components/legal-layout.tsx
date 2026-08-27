import Link from 'next/link';
import { company, hasPlaceholders } from '@/lib/company';

/**
 * LegalPage — Tüm sözleşme ve politika sayfalarının ortak kabuğu.
 *
 * Pazarlama sayfasının efektlerinden bilinçli olarak arındırıldı:
 * yasal metin okunmak içindir, animasyon ve gradyan burada dikkat dağıtır.
 * Yüksek kontrast, geniş satır aralığı, sınırlı satır uzunluğu.
 */
export default function LegalPage({
  title,
  subtitle,
  children,
  lang = 'tr',
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  /** Kök layout <html lang="en"> ilan ediyor; Türkçe metinler bunu geçersiz kılmalı. */
  lang?: 'tr' | 'en';
}) {
  return (
    <main lang={lang} className="min-h-screen bg-ink text-frost">
      <div className="mx-auto max-w-3xl px-5 py-14 sm:py-20">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-mist hover:text-accent transition-colors"
        >
          ← MotoFull ana sayfa
        </Link>

        <h1 className="mt-8 font-display text-3xl sm:text-4xl font-bold text-white">{title}</h1>
        {subtitle && <p className="mt-3 text-mist leading-relaxed">{subtitle}</p>}

        <p className="mt-4 text-xs text-mist/70">
          Son güncelleme:{' '}
          {new Date(company.legalLastUpdated).toLocaleDateString('tr-TR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })}
        </p>

        {/* Şirket bilgileri doldurulmadan yayına çıkılmasını engelleyen uyarı */}
        {hasPlaceholders() && (
          <div className="mt-8 rounded-xl border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm font-semibold text-amber-300">
              ⚠️ Bu metin henüz yayına hazır değil
            </p>
            <p className="mt-1.5 text-sm text-amber-100/80 leading-relaxed">
              Şirket bilgileri <code className="rounded bg-black/30 px-1">lib/company.ts</code>{' '}
              dosyasında hâlâ doldurulmamış. Metinlerdeki &quot;TODO&quot; alanları
              gerçek bilgilerle değiştirilmeden bu sayfalar hukuken geçerli değildir.
            </p>
          </div>
        )}

        <article className="legal-body mt-10 space-y-6">{children}</article>

        <footer className="mt-16 border-t border-white/10 pt-6 text-sm text-mist">
          <p>
            Bu metinle ilgili sorularınız için:{' '}
            <a href={`mailto:${company.privacyEmail}`} className="text-accent hover:underline">
              {company.privacyEmail}
            </a>
          </p>
        </footer>
      </div>
    </main>
  );
}

/** Numaralı ana başlık. */
export function Section({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-3">
      <h2 className="font-display text-lg font-bold text-white">
        {n}. {title}
      </h2>
      <div className="space-y-3 text-[15px] leading-relaxed text-frost/90">{children}</div>
    </section>
  );
}

/** Tablo — veri kategorileri, saklama süreleri, alt işleyiciler için. */
export function Table({ head, rows }: { head: string[]; rows: React.ReactNode[][] }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-white/10">
      <table className="w-full text-left text-sm">
        <thead className="bg-white/5">
          <tr>
            {head.map((h) => (
              <th key={h} className="px-4 py-3 font-semibold text-white whitespace-nowrap">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-t border-white/10 align-top">
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-3 text-frost/85">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
