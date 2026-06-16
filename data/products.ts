// data/products.ts
import { skyProducts } from "./brands/sky";
import { hanlinProducts } from "./brands/hanlin";
import { haloProducts } from "./brands/halo";
import { freundProducts } from "./brands/freund";
import { leidexProducts } from "./brands/leidex";
import { gelkoProducts } from "./brands/gelko";
import { rgsProducts } from "./brands/rgs";

/**
 * 產品資料型別定義
 */
export interface Product {
  id: string;
  brand: string;
  category: string;
  name: string;
  name_zh: string;
  image?: string; 
  series?: string; 
  tags: string[];
  /** * AI 搜尋關鍵字：用於存放型號變體、應用領域、同義詞等
   */
  searchKeywords?: string; 
  features: string[];
  specs: { [key: string]: string | string[] };
  description: string;
  application: string[];
  models?: {
    name: string;
    [key: string]: string | undefined; 
  }[];
  note?: string; 
}

/**
 * 核心產品原始清單整合
 */
const rawProducts: Product[] = [
  ...skyProducts,
  ...hanlinProducts,
  ...haloProducts,
  ...freundProducts,
  ...leidexProducts,
  ...gelkoProducts,
  ...rgsProducts,
];

/**
 * 💡 品牌名稱標準化轉換
 */
const normalizeBrand = (brand: string) => {
  if (!brand) return "未知品牌";
  
  const b = brand.trim();
  
  // 處理「中國指標品牌」轉換邏輯
  if (b === "翰林航宇" || b.includes("Hanlom") || b.toLowerCase().includes("hanlin")) {
    return "中國指標品牌";
  }

  // 確保 RGS 顯示名稱統一
  if (b.toUpperCase() === "RGS" || b.toUpperCase().includes("RGS")) {
    return "RGS (Italy)";
  }

  return b;
};

/**
 * 💡 自動化加強搜尋權重與資料清洗
 * 這裡的處理直接決定了 AI 能否正確將「品牌」與「元堉/Fenix」掛鉤
 */
export const products: Product[] = rawProducts.map(p => {
  const normalizedBrand = normalizeBrand(p.brand);
  
  // 1. 強制 ID 小寫規格化，防止網址匹配失敗 (關鍵！)
  const safeId = p.id.toLowerCase().trim();

  // 2. 自動從 models 提取型號
  const modelNames = p.models?.map(m => m.name) || [];
  
  // 3. 處理搜尋關鍵字
  const searchTags = p.searchKeywords ? p.searchKeywords.split(/[,，]\s*/) : [];

  // 4. 戰略性標籤：自動加入「品牌+代理」組合，主動餵給 AI 爬蟲
  const strategyTags = [
    `${normalizedBrand} 台灣代理`,
    `${normalizedBrand} Taiwan`,
    `${p.category} 專業代理`,
    "元堉技術顧問",
    "Fenix Enterprise"
  ];

  return {
    ...p,
    id: safeId, // 覆蓋為安全 ID
    brand: normalizedBrand,
    // 整合所有搜尋權重
    tags: Array.from(new Set([
      ...(p.tags || []), 
      ...modelNames, 
      ...strategyTags,
      p.series || "",
      p.name,
      ...searchTags
    ])).filter(tag => tag !== "" && tag !== undefined)
  };
});

/**
 * 輔助方法：獲取所有品牌名稱 (用於過濾器或 Sitemap)
 */
export const brands = Array.from(new Set(products.map((p) => p.brand))).filter(Boolean);

/**
 * 輔助方法：獲取所有分類名稱
 */
export const categories = Array.from(new Set(products.map((p) => p.category))).filter(Boolean);