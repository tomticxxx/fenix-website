import { MetadataRoute } from 'next';
import { products } from '@/data/products'; // 確保路徑指向你的產品資料

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://fenixmech.com';

  // 自動生成產品詳細頁的路徑
  const productEntries = products.map((product) => ({
    url: `${baseUrl}/series/${product.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // 固定頁面路徑
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
    ...productEntries,
  ];
}