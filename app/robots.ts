import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/private/', // 如果有不對外公開的後台路徑再填入
    },
    sitemap: 'https://fenixmech.com/sitemap.xml',
  };
}