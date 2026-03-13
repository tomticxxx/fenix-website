import { Product } from "../products";

export const freundProducts: Product[] = [
  // 1. VFC 實驗室系列
  {
    id: "freund-vfc-lab",
    brand: "日本 FREUND",
    category: "流體床造粒乾燥機",
    series: "VFC FLO-COATER® (Lab)",
    name: "Laboratory Series Fluid Beds",
    name_zh: "實驗室型流體床造粒乾燥機",
    description: "VFC-LAB 系列是極具彈性的研發級系統。具備標準乾燥、頂噴與底噴功能。其獨特設計將產品容器與 Wurster 插件整合，結合專利 GRANUREX® 技術，無須額外組件即可實現快速切換與清洗。",
    tags: ["實驗研發型", "造粒", "乾燥", "包衣", "Wurster", "GRANUREX"],
    features: [
      "Flexible Configurations: 靈活的頂噴、底噴與轉盤配置",
      "Removable Cartridge Filters: 可拆卸式濾筒設計",
      "Self-Contained System: 獨立一體式系統設計",
      "Color Touch Screen Controls: 彩色觸控介面",
      "COMPU™ Control System: 符合 21 CFR Part 11 規範",
      "Smart-Safe™ Containment: 可選配高致敏性物料防護系統"
    ],
    application: ["製藥研發 (R&D)", "微膠囊包衣", "功能性食品開發"],
    specs: {
      "製程能力": "Drying, Top Spray, Bottom Spray",
      "控制系統": "COMPU™ System (21 CFR Part 11)",
      "備註": "標記 * 之型號代表需選配特定容器以進行減量處理"
    },
    models: [
      { name: "VFC-LAB Micro", capacity: "200mL - 1.2L", wurster: "40mL - 1.2L", granurex: "-", air: "40 - 180 L/min", spray: "0.5 - 10 mL/min" },
      { name: "VFC-LAB Mini", capacity: "2.5L", wurster: "2.5L", granurex: "-", air: "23 - 40 m³/hr", spray: "1.4 - 50 mL/min" },
      { name: "VFC-LAB 1*", capacity: "0.63 - 4L", wurster: "1.4 - 3.7L", granurex: "1.5L", air: "150 m³/hr", spray: "1.4 - 50 mL/min" },
      { name: "VFC-LAB 3*", capacity: "2 - 20L", wurster: "1.4 - 9L", granurex: "10L", air: "280 m³/hr", spray: "1.25 - 110 mL/min" },
      { name: "VFC-LAB 3XL*", capacity: "4 - 27L", wurster: "1.4 - 20.6L", granurex: "10L", air: "425 m³/hr", spray: "1.25 - 110 mL/min" }
    ]
  },

  // 2. VFC 生產系列
  {
    id: "freund-vfc-production",
    brand: "日本 FREUND",
    category: "流體床造粒乾燥機",
    series: "VFC FLO-COATER® (Production)",
    name: "Production Series Fluid Beds",
    name_zh: "量產型流體床造粒乾燥機",
    description: "VFC 生產型系統採用模組化設計，確保驗證程序精簡化。能執行乾燥、造粒、包衣、層疊 (Layering) 與球化 (Spheronize)。",
    tags: ["大型量產型", "自動化", "大容量"],
    features: [
      "Optimized Geometries: 最佳化幾何結構設計",
      "Non-Inflatable Seal Design: 非充氣式密封設計",
      "Multiple Discharge Options: 多樣化自動出料系統",
      "COMPU™ Control System: 符合 21 CFR Part 11 規範"
    ],
    application: ["商業化量產", "顆粒球化", "層疊包衣 (Layering)"],
    specs: {
      "製程能力": "Dry, Granulate, Coat, Layer, Spheronize, Instantize",
      "材質規格": "SUS316L (觸物料件)"
    },
    models: [
      { name: "VFC-30/X", capacity: "100 - 120L", wurster: "-", granurex: "-", air: "3,000 m³/hr" },
      { name: "VFC-60/X", capacity: "220 - 250L", wurster: "-", granurex: "-", air: "4,500 m³/hr" },
      { name: "VFC-120/X", capacity: "420 - 500L", wurster: "-", granurex: "-", air: "6,000 m³/hr" },
      { name: "VFC-200/X", capacity: "660 - 800L", wurster: "-", granurex: "-", air: "8,000 m³/hr" },
      { name: "VFC-300/X", capacity: "1,200 - 1,570L", wurster: "-", granurex: "-", air: "9,500 m³/hr" },
      { name: "VFC-500/X", capacity: "1,570 - 1,900L", wurster: "-", granurex: "-", air: "12,000 m³/hr" },
      { name: "VFC-5M/X", capacity: "6 - 27L", wurster: "12 - 22L", granurex: "10L", air: "750 m³/hr" },
      { name: "VFC-15M/X", capacity: "20 - 60L", wurster: "22 - 50L", granurex: "10L", air: "1,500 m³/hr" },
      { name: "VFC-30M/X", capacity: "45 - 120L", wurster: "22 - 165L", granurex: "10 - 50L", air: "3,000 m³/hr" },
      { name: "VFC-60M/X", capacity: "100 - 250L", wurster: "165 - 570L", granurex: "50 - 140L", air: "4,500 m³/hr" },
      { name: "VFC-120M/X", capacity: "220 - 500L", wurster: "260 - 570L", granurex: "140L", air: "6,000 m³/hr" },
      { name: "VFC-200M/X", capacity: "420 - 800L", wurster: "570 - 970L", granurex: "140 - 370L", air: "8,000 m³/hr" },
      { name: "VFC-300M/X", capacity: "660 - 1,570L", wurster: "970L", granurex: "370L", air: "9,500 m³/hr" },
      { name: "VFC-500M/X", capacity: "1,200 - 1,900L", wurster: "970L", granurex: "370L", air: "12,000 m³/hr" }
    ]
  },

  // 3. Granurex 系列 (依據 PDF 新增)
  {
    id: "freund-granurex",
    brand: "日本 FREUND",
    category: "多功能轉盤造粒機",
    series: "Granurex® (GX)",
    name: "Multi-Functional Rotor Processor",
    name_zh: "多功能轉盤造粒機",
    description: "進化型 All-in-One 系統，單一設備即可完成從濕式造粒到乾燥的全過程。採用專利錐形轉盤 (Conical Rotor) 與 Slit Air 技術，能產出粒徑分佈極其均勻且高密度的球形顆粒，並支援粉末或微顆粒的精密包衣。",
    tags: ["多功能", "轉盤造粒", "精密包衣", "高效乾燥"],
    features: [
      "Conical Rotor: 獨特錐形轉盤設計，產生動態粒子運動並提高產能",
      "Slit Air: 均勻空氣分佈確保包衣均勻度並防止結塊",
      "MOV-A-BLO: 自動乾燥裝置，可將乾燥空氣直接送入產品床",
      "Significant Process Simplification: 簡化製程並大幅節省安裝空間",
      "High density & Spherical granules: 產出高密度、球形度佳的顆粒"
    ],
    application: ["濕式與離心造粒", "微顆粒精密包衣", "DDS 控釋劑型開發", "高效乾燥製程"],
    specs: {
      "主要功能": "Granulating, Coating, Drying",
      "產品特性": "Uniform size distribution, No sieving required",
      "適用物料": "Pharmaceuticals, Foods, Fine Chemicals"
    },
    models: [
      { name: "GX-20", capacity: "0.5 - 1.0 kg", rotor_dia: "200 mm", motor: "0.4 kw", air: "0.2 - 0.6 m³/min" },
      { name: "GX-40", capacity: "3 - 7 kg", rotor_dia: "400 mm", motor: "0.75 kw", air: "3 - 5 m³/min" },
      { name: "GX-65", capacity: "15 - 30 kg", rotor_dia: "650 mm", motor: "2.2 kw", air: "10 - 15 m³/min" },
      { name: "GX-85", capacity: "30 - 60 kg", rotor_dia: "850 mm", motor: "5.5 kw", air: "20 - 30 m³/min" },
      { name: "GX-95", capacity: "45 - 90 kg", rotor_dia: "950 mm", motor: "5.5 kw", air: "30 - 35 m³/min" },
      { name: "GX-105", capacity: "60 - 120 kg", rotor_dia: "1050 mm", motor: "7.5 kw", air: "35 - 40 m³/min" },
      { name: "GX-125", capacity: "100 - 200 kg", rotor_dia: "1250 mm", motor: "7.5 kw", air: "40 - 50 m³/min" }
    ]
  },

  // 4. GMX / GMXB 高剪切混合造粒機
  {
    id: "freund-gmx",
    brand: "日本 FREUND",
    category: "濕式造粒機",
    series: "GRANUMEIST® (GMX/GMXB)",
    name: "High Shear Mixers",
    name_zh: "高剪切混合造粒機",
    description: "專為粉末的高效均質濕式造粒設計，產出流動性與壓縮性優異的中高密度顆粒。支援水相與溶劑製程。",
    tags: ["濕式造粒", "高剪切", "均質混合", "One-Pot"],
    features: [
      "Simple Scalability: 具備簡單的產能放大特性",
      "Unique Mixer Shaft Seal: 獨特的攪拌軸密封設計",
      "One-Pot Processing: 支援單鍋法製程技術",
      "COMPU™ Control System with 21 CFR Part 11*"
    ],
    application: ["高效均質造粒", "高密度顆粒生產", "API 濕式混合"],
    specs: {
      "壓力配置": "可執行 12-Bar 壓力防爆配置",
      "溫控功能": "可選配夾層鍋 (Jacketed bowls)",
      "安裝方式": "可選配入牆式 (In-Wall) 安裝"
    },
    models: [
      { name: "GMX-LAB Micro", bowl_capacity: "1, 4 L", speed: "30 - 1550 RPM" },
      { name: "GMX-LAB Mini", bowl_capacity: "4, 8 L", speed: "75 - 715 RPM" },
      { name: "GMX-25", bowl_capacity: "25 L", speed: "43 - 425 RPM" },
      { name: "GMX-75", bowl_capacity: "75 L", speed: "30 - 300 RPM" },
      { name: "GMX Production", bowl_capacity: "150 - 1,800 L", speed: "23 - 100 RPM" },
      { name: "GMXB-LAB Micro", bowl_capacity: "1, 2, 4, 6 L", speed: "455 - 1100 RPM" },
      { name: "GMXB-LAB Mini", bowl_capacity: "4, 6, 10 L", speed: "51 - 720 RPM" },
      { name: "GMXB-Pilot", bowl_capacity: "10, 25, 65 L", speed: "40 - 485 RPM" },
      { name: "GMXB Production", bowl_capacity: "100 - 3,000 L", speed: "7.5 - 75 RPM" }
    ]
  },

  // 5. VHC HI-COATER 包衣機
  {
    id: "freund-vhc",
    brand: "日本 FREUND",
    category: "包衣機",
    series: "VHC HI-COATER®",
    name: "Tablet Coating System",
    name_zh: "高效能包衣機",
    description: "全球領先的全多孔轉鼓包衣系統，結合先進噴霧技術與可換式擋板，確保各種包衣需求的高效穩定。",
    tags: ["糖衣", "膜衣", "全多孔轉鼓"],
    features: [
      "10-100% Capacity Range",
      "Elongated Pans: 提供長型轉鼓選擇",
      "Minitab Pans: 微錠專用小型轉鼓",
      "Manifold Spray Bar with Anti-Beading Spray Guns"
    ],
    application: ["膜衣錠", "糖衣錠", "緩釋劑型包衣"],
    specs: {
      "轉鼓類型": "Fully perforated drums (全多孔式)",
      "噴槍系統": "Modular Design Manifold Spray Bar"
    },
    models: [
      { name: "LDCS-Micro", range: "0.05 - 1 L", guns: "1", air: "25 – 85 m³/hr" },
      { name: "LDCS", range: "0.05 - 8 L", guns: "1", air: "17 – 170 m³/hr" },
      { name: "LDCS-Plus", range: "0.15 - 20 L", guns: "1", air: "51 – 510 m³/hr" },
      { name: "LDCS-Pilot", range: "1.1 - 55 L", guns: "1-2", air: "200 – 1,000 m³/hr" },
      { name: "LDCS-Pro", range: "2 - 150 L", guns: "1-3", air: "255 – 1,700 m³/hr" },
      { name: "VHC-Multi", range: "11.5 - 1,070 L", guns: "4 - 8", air: "850 – 11,900 m³/hr" },
      { name: "VHC (FP)", range: "20 - 1,800 L", guns: "4 - 12", air: "2,124 – 11,900 m³/hr" },
      { name: "VHC (IP)", range: "90 - 1,500 L", guns: "4 - 12", air: "1,480 – 8,155 m³/hr" }
    ]
  },

  // 6. TFC 乾式造粒機
  {
    id: "freund-tfc",
    brand: "日本 FREUND",
    category: "乾式造粒機",
    series: "TFC ROLL COMPACTION",
    name: "Roll Compactor",
    name_zh: "乾式造粒機",
    description: "連續式直接壓縮系統，使用單錐形垂直螺桿送料，顯著改善物料流動性並最小化細粉率。",
    tags: ["乾式造粒", "滾壓", "熱敏感"],
    features: [
      "Single Tapered Vertical Screw",
      "Constant Force Design",
      "Gap Measurement & Optional Control",
      "Rasping Star Mill: 產量可達 700kg/h"
    ],
    application: ["熱敏感物料", "濕敏感物料", "提高粉末裝填密度"],
    specs: {
      "設計架構": "Cantilevered Rolls (懸臂式滾輪)",
      "備註": "TFC-LAB Micro* 為目前市場上最小型的滾壓機"
    },
    models: [
      { name: "TFC-LAB Micro*", range: "5g - 1 kg/hr", speed: "1 - 4 RPM", force: "13.2 KN" },
      { name: "TFC-220", range: "1 - 30 kg/hr", speed: "2 - 17 RPM", force: "50.4 KN" },
      { name: "TFC-520", range: "5 - 130 kg/hr", speed: "3 - 25.5 RPM", force: "136 KN" },
      { name: "TFC-1230", range: "100 - 400 kg/hr", speed: "2 - 17 RPM", force: "284.7 KN" },
      { name: "TF-1540**", range: "200 - 700 kg/hr", speed: "2 - 17 RPM", force: "374 KN" }
    ]
  }
];