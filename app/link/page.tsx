import type { Metadata } from 'next';

/**
 * link/page.tsx — Instagram/Facebook "link in bio" landing page.
 *
 * NEDEN VAR: Instagram profilinde tek bir web sitesi alani var, ama
 * sosyal medya paketi hem ana siteye ("save", "site" CTA'lari) hem
 * demo kaydina ("demo" CTA'si) yonlendiriyor. Bio linki sadece ana
 * sayfaya gidince demo CTA'li gonderiler yanlis yere dusuyordu.
 *
 * Bu sayfa iki gercek hedefi listeler, ucuncu bir sey uydurmaz.
 * Instagram bio'daki website alani bu sayfaya guncellenir.
 */

export const metadata: Metadata = {
  robots: { index: false, follow: true },
  title: 'MotoFull — Links',
};

const LINKS = [
  {
    href: 'https://panel.motofull.com.tr/demo-kayit',
    title: 'Start your 7-day demo',
    sub: 'Try it with your own workshop data. No card required.',
    primary: true,
  },
  {
    href: 'https://www.motofull.com.tr',
    title: 'See how MotoFull works',
    sub: 'Product tour, screens, and what it does.',
    primary: false,
  },
];

export default function LinkInBioPage() {
  return (
    <main className="min-h-dvh bg-ink text-frost flex flex-col items-center px-6 py-16">
      <img src="/brand/logo.png" alt="MotoFull" className="h-9 w-auto mb-10" />
      <h1 className="font-display text-2xl font-semibold text-center mb-2">
        Workshop software for motorcycle service.
      </h1>
      <p className="text-mist text-center text-sm mb-10 max-w-xs">
        Customer &amp; bike records · Service history · Parts · OBD
      </p>
      <div className="w-full max-w-sm flex flex-col gap-4">
        {LINKS.map((l) => (
          <a
            key={l.href}
            href={l.href}
            className={
              'block rounded-2xl border px-6 py-5 text-center transition ' +
              (l.primary
                ? 'bg-gradient-to-r from-accent to-accent-soft text-ink border-transparent font-semibold'
                : 'border-white/15 bg-card hover:border-accent/50')
            }
          >
            <div className={l.primary ? 'text-base font-semibold' : 'text-base font-semibold text-frost'}>
              {l.title}
            </div>
            <div className={l.primary ? 'text-sm opacity-80 mt-1' : 'text-sm text-mist mt-1'}>{l.sub}</div>
          </a>
        ))}
      </div>
      <div className="flex gap-3 mt-8">
        <a href="https://www.instagram.com/motofull.official/" className="rounded-xl border border-white/15 bg-card px-5 py-2.5 text-sm font-semibold hover:border-accent/50">Instagram</a>
        <a href="https://www.facebook.com/profile.php?id=1298157223382721" className="rounded-xl border border-white/15 bg-card px-5 py-2.5 text-sm font-semibold hover:border-accent/50">Facebook</a>
      </div>
      <p className="text-mist text-xs mt-12">MotoFull &middot; www.motofull.com.tr</p>
    </main>
  );
}
