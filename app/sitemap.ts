import type { MetadataRoute } from 'next';
import { company } from '@/lib/company';

/**
 * /saha kasten dışarıda: dış bir adrese yönlendiriyor, indekslenecek içeriği yok.
 */
const routes: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] }[] = [
  { path: '/', priority: 1, changeFrequency: 'weekly' },
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
