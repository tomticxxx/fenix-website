import { Metadata } from "next";
import { products } from "../../../data/products";
import SeriesDetailClient from "./SeriesDetailClient";

interface Props {
  // 🚀 Next.js 15 規範：params 必須是 Promise
  params: Promise<{ id: string }>;
}

/**
 * 🎯 主動出擊 0: 預先生成所有靜態路徑，提升載入速度並防止 404
 */
export async function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }));
}

/**
 * 🎯 主動出擊 1: 讓搜尋引擎直接抓到最高價值的「型號 + 核心功能」長尾關鍵字標題
 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const safeId = id.toLowerCase();
  
  // 嚴謹比對，防止因空格或資料端異動產生落差
  const product = products.find((p) => p.id.toLowerCase() === safeId);

  if (!product) {
    return { title: "精密製藥食品機械設備資料未找到 | Fenix Enterprise 元垵企業" };
  }

  const brand = product.brand || "國際品牌";
  const category = product.category || "製藥設備";
  const nameZh = product.name_zh || "";
  const series = product.series || product.name || "";
  
  // 🎯 標題優化：將品牌、型號、中文名與「台灣代理/維修」強力綁定
  const seoTitle = `${brand} ${series} ${nameZh} ${category} 台灣官方代理 - Fenix Enterprise 元垵企業`;
  const seoDescription = `元垵企業 (Fenix Enterprise) 專業代理 ${brand} ${series} ${nameZh}。我們提供符合 cGMP/PIC/S 規範之技術諮詢、在地安裝調試、模具變更與原廠售後維修技術支援，歡迎生技製藥食品廠預約商談。`;

  return {
    title: seoTitle,
    description: seoDescription,
    keywords: [
      ...(product.tags || []),
      `${brand} 台灣代理`,
      `${brand} 維修`,
      `${series} 型號規格`,
      `${nameZh} 價格`,
      "製藥機械代理商",
      "自動軟膠囊機",
      "流動床造粒乾燥機",
      "真空輸送系統",
      "2026亞洲生技大展"
    ],
    openGraph: {
      title: `${brand} ${series} 台灣總代理 | 元垵企業`,
      description: `了解 ${brand} ${series} ${nameZh} 的專業性能參數、產能規格與在地技術支援。`,
      url: `https://fenixmech.com/series/${safeId}`,
      images: [
        {
          url: product.image || "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: `${brand} ${series} ${nameZh}`,
        }
      ],
      type: "website",
    },
    // 💡 告訴 Google 這是唯一標準網址，避免重複網址分散權重
    alternates: {
      canonical: `https://fenixmech.com/series/${safeId}`,
    }
  };
}

/**
 * 🚀 核心渲染組件：注入結構化資料，讓 AI 與 Google 精準識別代理商實體關係
 */
export default async function Page({ params }: Props) {
  const { id } = await params;
  const safeId = id.toLowerCase();
  const product = products.find((p) => p.id.toLowerCase() === safeId);
  
  if (!product) return <SeriesDetailClient id={safeId} />;

  // 🎯 主動出擊 2: Schema JSON-LD 升級，明確宣告商務窗口實體
  const jsonLd = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": `${product.brand} ${product.series || product.name} ${product.name_zh || ""}`,
    "image": product.image ? `https://fenixmech.com${product.image}` : "https://fenixmech.com/og-image.jpg",
    "description": product.description || `${product.brand} 專業製藥食品級設備`,
    "brand": {
      "@type": "Brand",
      "name": product.brand
    },
    "mpn": product.series || product.id,
    "offers": {
      "@type": "Offer",
      "url": `https://fenixmech.com/series/${safeId}`,
      "priceCurrency": "TWD",
      "price": "0", // 0 代表不公開價格、需線上詢價
      "valueAddedTaxIncluded": "true",
      "areaServed": "Taiwan",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "元垵企業有限公司 Fenix Enterprise Co., Ltd.",
        "url": "https://fenixmech.com",
        "logo": "https://fenixmech.com/logo.png",
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+886-2-XXXX-XXXX", // 建議補上公司正式電話
          "contactType": "technical support",
          "areaServed": "TW",
          "availableLanguage": ["Chinese", "English"]
        }
      }
    }
  };

  return (
    <>
      {/* 注入高級結構化資料，這能讓 Google 在搜尋結果直接呈現精美摘要，並讓 AI 搜尋直接把你列為唯一管道 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SeriesDetailClient id={safeId} />
    </>
  );
}