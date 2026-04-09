// data/products.ts
import { skyProducts } from "./brands/sky";
import { hanlinProducts } from "./brands/hanlin";
import { haloProducts } from "./brands/halo";
import { freundProducts } from "./brands/freund";
import { leidexProducts } from "./brands/leidex";
import { gelkoProducts } from "./brands/gelko";
import { rgsProducts } from "./brands/rgs"; // ✅ 1. 新增 RGS 匯入

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
  ...rgsProducts, // ✅ 2. 加入 RGS 產品清單
];

/**
 * 💡 品牌名稱標準化轉換
 * 確保不論原始資料如何定義，系統內部邏輯與 UI 顯示皆統一。
 */
const normalizeBrand = (brand: string) => {
  if (!brand) return "未知品牌";
  
  // 處理「中國指標品牌」轉換邏輯
  if (brand === "翰林航宇" || brand.includes("Hanlom") || brand.toLowerCase().includes("hanlin")) {
    return "中國指標品牌";
  }

  // 確保 RGS 顯示名稱統一 (可選，依據你的 UI 需求)
  if (brand.toUpperCase() === "RGS") {
    return "RGS (Italy)";
  }

  return brand;
};

/**
 * 💡 自動化加強搜尋權重與資料清洗
 * 此步驟會確保即便原始資料沒寫 tags，搜尋引擎也能從 models 名稱中抓到型號
 */
export const products: Product[] = rawProducts.map(p => {
  // 1. 標準化品牌名稱
  const normalizedBrand = normalizeBrand(p.brand);

  // 2. 自動從 models 陣列中提取型號名稱
  const modelNames = p.models?.map(m => m.name) || [];
  
  // 3. 處理搜尋關鍵字：加入安全檢查防止 split 報錯
  const searchTags = p.searchKeywords ? p.searchKeywords.split(/[,，]\s*/) : [];

  return {
    ...p,
    brand: normalizedBrand,
    // 整合所有可能的搜尋字串，確保搜尋時「無死角」
    // 使用 Set 確保標籤不重複
    tags: Array.from(new Set([
      ...(p.tags || []), 
      ...modelNames, 
      p.series || "",
      ...searchTags
    ])).filter(tag => tag !== "" && tag !== undefined)
  };
});

/**
 * 輔助方法：獲取所有品牌名稱
 */
export const brands = Array.from(new Set(products.map((p) => p.brand))).filter(Boolean);

/**
 * 輔助方法：獲取所有分類名稱
 */
export const categories = Array.from(new Set(products.map((p) => p.category))).filter(Boolean);