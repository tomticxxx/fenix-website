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
 * 🎯 主動出擊 1: 讓搜尋引擎與社群軟體抓到正確資訊
 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const safeId = id.toLowerCase();
  
  // 嚴謹比對，防止因空格或資料端異動產生落差
  const product = products.find((p) => p.id.toLowerCase() === safeId);

  if (!product) {
    return { title: "精密製藥食品機械設備資料未找到 | Fenix Enterprise 元堉企業" };
  }

  const brand = product.brand || "國際品牌";
  const category = product.category || "製藥設備";
  const nameZh = product.name_zh || "";
  const series = product.series || product.name || "";
  
  // 🎯 智慧防重複邏輯：避免出現「乾式造粒機 乾式造粒機」重複堆疊
  let displayCategory = category;
  if (
    (nameZh && category && (nameZh.includes(category) || category.includes(nameZh))) ||
    (series && category && (series.toLowerCase().includes(category.toLowerCase()) || category.toLowerCase().includes(series.toLowerCase())))
  ) {
    displayCategory = ""; // 發現重複時，清除獨立顯示的分類字詞
  }

  // 過濾掉空字串並用單個空格串接，組成漂亮乾淨的標題前綴
  const productTitleTokens = [brand, series, nameZh, displayCategory].filter(Boolean).join(" ");
  
  // 🎯 最終標題與描述（確保無錯字、無重複字）
  const seoTitle = `${productTitleTokens} 台灣官方代理 - Fenix Enterprise 元堉企業`;
  const seoDescription = `元堉企業 (Fenix Enterprise) 專業代理 ${brand} ${series} ${nameZh}。我們提供符合 cGMP/PIC/S 規範之技術諮詢、在地安裝調試、模具變更與原廠售後維修技術支援，歡迎生技製藥食品廠預約商談。`;

  // 🎯 網址統一加上 www. 確保權重集中
  const ogImageUrl = product.image 
    ? `https://www.fenixmech.com${product.image}`
    : "https://www.fenixmech.com/logo.png"; 

  return {
    title: seoTitle,
    description: seoDescription,
    keywords: [
      ...(product.tags || []),
      "台灣代理",
      "台灣總代理",
      `${brand} 台灣`,
      `${brand} 台灣代理`,
      `${brand} 維修`,
      `${nameZh || series} 規格`,
      "自動軟膠囊機",
      "流動床造粒乾燥機",
      "製藥機械代理商",
      "元堉企業",
      "2026亞洲生技大展"
    ],
    openGraph: {
      title: `${brand} ${series} 台灣總代理 | 元堉企業`,
      description: `了解 ${brand} ${series} ${nameZh} 的專業性能參數、產能規格與在地技術支援。`,
      url: `https://www.fenixmech.com/series/${safeId}`,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `${brand} ${series} ${nameZh || ""} - 元堉企業`,
        }
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${brand} ${series} 台灣總代理 | 元堉企業`,
      description: `了解 ${brand} ${series} ${nameZh} 的專業性能參數與元堉技術支援。`,
      images: [ogImageUrl],
    },
    // 💡 告訴 Google 這是唯一標準網址，避免重複網址分散權重
    alternates: {
      canonical: `https://www.fenixmech.com/series/${safeId}`,
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

  // 🎯 圖片絕對路徑同步優化 (帶 www.)
  const jsonLdImageUrl = product.image 
    ? `https://www.fenixmech.com${product.image}`
    : "https://www.fenixmech.com/logo.png";

  // 🎯 頂級工業設備目錄化改造：徹底拔除電商 offers 欄位
  const jsonLd = {
    "@context": "https://schema.org/",
    "@type": "ProductGroup", // ➔ 改為 ProductGroup（工業產品目錄系列），對齊 IMA/Syntegon 國際規格
    "name": `${product.brand} ${product.series || product.name} ${product.name_zh || ""}`,
    "image": jsonLdImageUrl,
    "description": product.description || `元堉企業代理之 ${product.brand} 專業級工業機械設備與售後技術方案`,
    "url": `https://www.fenixmech.com/series/${safeId}`,
    "brand": {
      "@type": "Brand",
      "name": product.brand
    },
    "mpn": product.series || product.id,
    // 💡 已完全移除 offers 欄位！從根源消滅 Google 對價格、運費、退換貨政策的死板盤問
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://www.fenixmech.com/series/${safeId}`
    }
  };

  return (
    <>
      {/* 注入符合 B2B 標準的結構化資料，不再觸發電商機制，確保網頁健康度 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SeriesDetailClient id={safeId} />
    </>
  );
}