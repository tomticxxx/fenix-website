// data/products.ts
import { skyProducts } from "./brands/sky";
import { hanlinProducts } from "./brands/hanlin";
import { haloProducts } from "./brands/halo";
import { freundProducts } from "./brands/freund";
import { leidexProducts } from "./brands/leidex";

/**
 * 產品資料型別定義
 * 修正重點：新增 searchKeywords 以支援進階 AI 搜尋，並將 series 設為選填
 */
export interface Product {
  id: string;
  brand: string;
  category: string;
  name: string;
  name_zh: string;
  series?: string; // 改為選填，避免沒有系列名稱的產品報錯
  tags: string[];
  /** * AI 搜尋關鍵字：用於存放型號、應用領域、同義詞等
   * 解決 ts(2322) 錯誤：'searchKeywords' does not exist in type 'Product'
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
  /** * 技術備註/代理商補充說明
   */
  note?: string; 
}

/**
 * 核心產品清單整合
 */
export const products: Product[] = [
  ...skyProducts,
  ...hanlinProducts,
  ...haloProducts,
  ...freundProducts,
  ...leidexProducts,
];

/**
 * 輔助方法：獲取所有品牌名稱（用於過濾按鈕）
 */
export const brands = Array.from(new Set(products.map((p) => p.brand)));

/**
 * 輔助方法：獲取所有分類名稱
 */
export const categories = Array.from(new Set(products.map((p) => p.category)));