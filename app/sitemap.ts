import type { MetadataRoute } from 'next';
import { company } from '@/lib/company';

/**
 * /saha kasten dışarıda: dış bir adrese yönlendiriyor, indekslenecek içeriği yok.
 */
const routes: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] }[] = [
  { path: '/', priority: 1, changeFrequency: 'weekly' },
  /* Kurumsal kimlik sayfasi — yasal metinlerden daha sik degisir
     (adres/unvan guncellemesi), bu yuzden 'monthly'. */
  { path: '/hakkimizda', priority: 0.6, changeFrequency: 'monthly' },
  /* Satın alma sayfası — fiyat değişebildiği için yasal metinlerden
     daha sık güncellenir. */
  { path: '/abonelik', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/privacy', priority: 0.5, changeFrequency: 'yearly' },
  { path: '/kvkk', priority: 0.5, changeFrequency: 'yearly' },
  { path: '/kullanim-sartlari', priority: 0.5, changeFrequency: 'yearly' },
  { path: '/mesafeli-satis', priority: 0.4, changeFrequency: 'yearly' },
  { path: '/iade-ve-cayma', priority: 0.4, changeFrequency: 'yearly' },
  { path: '/cerez-politikasi', priority: 0.3, changeFrequency: 'yearly' },
  { path: '/alt-isleyiciler', priority: 0.3, changeFrequency: 'yearly' },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return routes.map(({ path, priority, changeFrequency }) => ({
    url: `${company.websiteUrl}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
