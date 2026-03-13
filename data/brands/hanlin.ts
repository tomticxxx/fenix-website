// data/brands/hanlin.ts
import { Product } from "../products";

export const hanlinProducts: Product[] = [
  {
    id: "hanlin-gzp-series",
    brand: "翰林航宇",
    category: "壓片機",
    name: "GZP High Speed Rotary Tablet Press",
    name_zh: "GZP 系列高速旋轉壓片機",
    series: "GZP Series",
    tags: ["GZP-26", "GZP-32", "GZP-45", "壓片機", "高速生產", "cGMP"],
    description: "翰林航宇旗艦機種，專為製藥廠大規模生產設計。具備壓力自動監測系統與快速更換轉檯設計。",
    application: ["中西藥錠劑", "保健食品壓錠", "工業錠劑"],
    features: [
      "壓力自動監測與廢品自動剔除",
      "符合 cGMP 標準的結構設計",
      "三層緩衝震動抑制技術",
      "可選配雙層壓片功能"
    ],
    specs: {
      "最大壓力": "80 kN",
      "最大充填深度": "18 mm",
      "最大片徑": "25 mm (圓形片)",
      "電源": "380V, 50Hz, 3Phase"
    },
    // 預留 models 欄位，方便你之後填入正確數據
    models: [
      { 
        name: "GZP-26", 
        "沖模數量": "26", 
        "最高產能": "110,000 tablets/hr",
        "機台重量": "2800 kg"
      },
      { 
        name: "GZP-32", 
        "沖模數量": "32", 
        "最高產能": "138,000 tablets/hr",
        "機台重量": "2950 kg"
      },
      { 
        name: "GZP-45", 
        "沖模數量": "45", 
        "最高產能": "210,000 tablets/hr",
        "機台重量": "3100 kg"
      }
    ]
  }
];