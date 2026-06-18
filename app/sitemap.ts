import { MetadataRoute } from 'next';
import { products } from '@/data/products'; // 確保路徑指向你的產品資料

export default function sitemap(): MetadataRoute.Sitemap {
  // 統一使用帶 www 的官方網址
  const baseUrl = 'https://www.fenixmech.com';

  // 自動生成產品詳細頁的路徑
  const productEntries = products.map((product) => ({
    url: `${baseUrl}/series/${product.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // 固定頁面路徑與生技展專頁
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.5,
    },
    // 新增 2026 生技展中文專頁
    {
      url: `${baseUrl}/bio-asia-2026?lang=zh`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    // 新增 2026 生技展英文專頁
    {
      url: `${baseUrl}/bio-asia-2026?lang=en`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    ...productEntries,
  ];
}