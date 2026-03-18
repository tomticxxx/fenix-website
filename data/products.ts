// data/products.ts
import { skyProducts } from "./brands/sky";
import { hanlinProducts } from "./brands/hanlin";
import { haloProducts } from "./brands/halo";
import { freundProducts } from "./brands/freund";
import { leidexProducts } from "./brands/leidex";

/**
 * 產品資料型別定義
 */
export interface Product {
  id: string;
  brand: string;
  category: string;
  name: string;
  name_zh: string;
  image?: string; // 💡 關鍵修正：加入 image 屬性，解決編譯錯誤
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
];

/**
 * 💡 自動化加強搜尋權重
 * 此步驟會確保即便原始資料沒寫 tags，搜尋引擎也能從 models 名稱中抓到型號
 */
export const products: Product[] = rawProducts.map(p => {
  // 自動從 models 陣列中提取型號名稱
  const modelNames = p.models?.map(m => m.name) || [];
  
  return {
    ...p,
    // 整合所有可能的搜尋字串，確保搜尋時「無死角」
    tags: Array.from(new Set([
      ...p.tags, 
      ...modelNames, 
      p.series || "",
      p.searchKeywords || ""
    ])).filter(tag => tag !== "")
  };
});

/**
 * 輔助方法：獲取所有品牌名稱
 */
export const brands = Array.from(new Set(products.map((p) => p.brand)));

/**
 * 輔助方法：獲取所有分類名稱
 */
export const categories = Array.from(new Set(products.map((p) => p.category)));