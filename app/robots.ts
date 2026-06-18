import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://www.fenixmech.com';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api/',       // 阻擋後端 API 路由，避免爬蟲浪費額度在非網頁內容
        '/_next/',     // 阻擋 Next.js 內部建置檔案（CSS/JS 靜態資源）
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}