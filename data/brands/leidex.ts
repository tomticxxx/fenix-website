// data/brands/leidex.ts
import { Product } from "../products";

export const leidexProducts: Product[] = [
  {
    id: "leidex-lfm",
    brand: "韓國 LEIDEX",
    category: "充填機",
    name: "Automatic Lipstick Filling Machine",
    name_zh: "全自動口紅/護唇膏充填機",
    series: "LFM Series",
    tags: ["口紅充填", "矽膠模", "精密溫控", "化妝品設備"],
    description: "具備精密溫控攪拌桶，確保料體均勻不分層，支持矽膠模或金屬模充填，產出表面完美的彩妝產品。",
    application: ["口紅生產", "護唇膏充填", "防曬膏製作"],
    features: ["伺服驅動充填頭", "快速冷卻隧道系統", "自動化脫模機構"],
    specs: {
      "產能": "40 - 60 支/分鐘",
      "充填精度": "±0.1g",
      "料桶容量": "30L (具備攪拌與溫控)"
    }
  },
  {
    id: "leidex-ppm",
    brand: "韓國 LEIDEX",
    category: "壓粉機",
    name: "Automatic Compact Powder Press Machine",
    name_zh: "全自動粉餅/眼影壓粉機",
    series: "PPM Series",
    tags: ["壓粉", "粉餅", "眼影", "異形粉盒"],
    description: "提供多段式壓力控制，確保粉餅表面細緻平整。適用於圓形、方形及各種複雜異形粉盒。",
    application: ["粉餅生產", "眼影壓製", "腮紅成型"],
    features: ["伺服壓力補償技術", "自動送盒與取盒系統", "精密布料機構"],
    specs: {
      "最大壓力": "150 bar",
      "生產效率": "20-30 盒/分鐘",
      "壓力穩定度": "±1%"
    }
  }
];