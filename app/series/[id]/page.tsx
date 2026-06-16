import { Metadata } from "next";
import { products } from "../../../data/products";
import SeriesDetailClient from "./SeriesDetailClient";

interface Props {
  // 🚀 Next.js 15 規範：params 必須是 Promise
  params: Promise<{ id: string }>;
}

/**
 * 🎯 主動出擊 0: 預先生成所有靜態路徑，提升 SEO 並防止 404
 */
export async function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }));
}

// 🎯 主動出擊 1: 讓搜尋引擎直接抓到高價值的標題與描述
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // 🚀 關鍵修正：await Promise 並轉換小寫比對
  const { id } = await params;
  const safeId = id.toLowerCase();
  const product = products.find((p) => p.id === safeId);

  if (!product) return { title: "設備資料未找到 | Fenix Enterprise 元堉技術顧問" };

  const brand = product.brand;
  const category = product.category;
  const nameZh = product.name_zh;
  const series = product.series || product.name;

  return {
    title: `${brand} ${category} | ${series} ${nameZh} 台灣代理 - Fenix Enterprise`,
    description: `元堉技術顧問 (Fenix Enterprise) 專業代理 ${brand} ${category}。提供 ${series} ${nameZh} 之技術規格諮詢、GMP 規範對接、在地安裝與售後維修服務。`,
    keywords: [
      ...(product.tags || []),
      `${brand} 台灣代理`,
      `${category} 台灣`,
      `${brand} 維修`,
      "製藥機械代理",
      "真空輸送機",
      "打錠機壓力優化"
    ],
    openGraph: {
      title: `${brand} ${category} 台灣總代理 - ${nameZh}`,
      description: `了解 ${brand} ${series} 的專業性能參數與元堉技術支援。`,
      images: [product.image || "/og-image.jpg"],
    },
  };
}

// 🚀 關鍵修正：組件改為 async function 以 await params
export default async function Page({ params }: Props) {
  const { id } = await params;
  const safeId = id.toLowerCase();
  const product = products.find((p) => p.id === safeId);
  
  // 即使找不到資料，也將處理過的 safeId 傳給 Client 端顯示錯誤訊息
  if (!product) return <SeriesDetailClient id={safeId} />;

  // 🎯 主動出擊 2: 讓 AI (ChatGPT/Claude/Gemini) 識別代理商實體關係
  const jsonLd = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": `${product.brand} ${product.series || product.name}`,
    "image": product.image,
    "description": product.description,
    "brand": {
      "@type": "Brand",
      "name": product.brand
    },
    "offers": {
      "@type": "Offer",
      "areaServed": "Taiwan",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "元堉技術顧問 Fenix Enterprise",
        "url": "https://fenixmech.com",
        "logo": "https://fenixmech.com/logo.png",
        "contactPoint": {
          "@type": "ContactPoint",
          "contactType": "technical support",
          "areaServed": "TW",
          "availableLanguage": ["Chinese", "English"]
        }
      }
    }
  };

  return (
    <>
      {/* 注入結構化資料，這對 AI 判定你是該品牌的台灣窗口至關重要 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SeriesDetailClient id={safeId} />
    </>
  );
}