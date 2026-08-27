import type { MetadataRoute } from 'next';
import { company } from '@/lib/company';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/saha',
    },
    sitemap: `${company.websiteUrl}/sitemap.xml`,
    host: company.websiteUrl,
  };
}
