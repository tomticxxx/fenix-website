// data/brands/gelko.ts
import { Product } from "../products";

export const gelkoProducts: Product[] = [
  {
    id: "gelko-gsc-series",
    brand: "GELKO",
    category: "無縫軟膠囊機 (滴丸)",
    name: "Seamless Softgel Machine",
    name_zh: "全自動無縫軟膠囊機 (滴丸機)",
    series: "GK-GSC Series",
    image: "/images/products/gelko-gsc.png", // 請確保此路徑下有對應圖片
    tags: ["Seamless", "Softgel", "Dropping", "滴丸", "無縫膠囊", "GSC", "Cigarette beads"],
    searchKeywords: "GSC1000 GSC3000 滴丸機 無縫 軟膠囊 菸草濾嘴珠 葉黃素油 魚油滴丸 GK-GSC",
    description: "GK-GSC 系列是專為生產微型圓球狀軟膠囊設計的尖端設備。不同於傳統壓片機，它採用物理性的重力噴射技術 (Gravity & Jet Stream)，能實現瞬時充填與封裝，且具備極高的充填精確度與膠囊皮材利用率。",
    features: [
      "Move Beyond Technology: 獨家重力與噴射流精密成型技術",
      "極致微型化：可穩定生產 Φ1mm 至 Φ10mm 的極小膠囊",
      "高產能輸出：單線速度最高可達每秒 50 顆",
      "多層包覆技術：支援單層、雙層、甚至四層無縫封裝 (Double, Triple, Quadruple)",
      "GMP 合規設計：符合國際製藥級標準，易於清潔維護",
      "低損耗：相比傳統轉籠式壓片，皮材損耗大幅降低"
    ],
    application: [
      "製藥 (Pharma Medicine)",
      "菸草爆珠 (Cigarette beads)",
      "口氣清新珠 (Fresh breath mint)",
      "營養保健品 (Nutraceutical pill)",
      "化妝品 (Cosmetics)",
      "香精油珠 (Fragrance scent pills)"
    ],
    // 根據 PDF 規格表整理的型號資料
    models: [
      { 
        name: "GK-GSC1000", 
        lane: "1 (R&D)", 
        size: "1mm - 8mm", 
        speed: "40 Seamless/sec", 
        power: "6Kw", 
        dimension: "1,400 x 2,700 x 2,150 mm" 
      },
      { 
        name: "GK-GSC3000 (3-Lane)", 
        lane: "3", 
        size: "1mm - 10mm", 
        speed: "50 Seamless/sec", 
        power: "18Kw", 
        dimension: "1,350 x 2,625 x 2,080 mm" 
      },
      { 
        name: "GK-GSC3000 (6-Lane)", 
        lane: "6", 
        size: "1mm - 10mm", 
        speed: "50 Seamless/sec", 
        power: "36Kw", 
        dimension: "1,300 x 2,625 x 2,080 mm" 
      }
    ],
    // 根據 PDF 第一頁整理的粒徑與充填參考數據，已進行分行優化
    specs: {
      "粒徑範圍": "1mm - 10mm",
      "重量參考 (Weight)": "Φ1: 0.52mg\nΦ5: 65.45mg\nΦ10: 523.6mg",
      "充填量 (Content)": "Φ1: 0.05~0.47mg\nΦ5: 6.54~58.9mg\nΦ10: 52.36~471.24mg",
      "電源供應": "220V/380V, 50/60Hz/3PH",
      "壓縮空氣": "5-8 Bar",
      "技術原理": "Gravity & Jet Stream (重力與噴射流)"
    },
    note: "若需特殊多層結構 (三層/四層) 封裝，請聯繫元堉技術團隊進行評估。"
  }
];