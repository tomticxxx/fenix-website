// data/brands/halo.ts
import { Product } from "../products";

export const haloProducts: Product[] = [
  {
    id: "halo-cmc-series",
    brand: "蘇州瀚隆 (HALO)",
    category: "重量檢測機",
    name: "CMC High Precision Capsule/Tablet Checkweigher",
    name_zh: "CMC 高精度全自動膠囊/片劑稱重檢測機",
    series: "CMC Series",
    tags: ["±1.0mg精度", "單元擴展式結構", "21 CFR Part 11", "軍事級軟體算法"],
    description: "CMC 系列採用創新的「單元擴展式結構」與「無限並聯」工作模式，主機最高可同時控制 1024 台單機，能對不同數量的膠囊與片劑進行全數稱重檢查。適合大規模生產在線全檢，能精確剔除重量不合格產品，提高產品收率。",
    application: ["車間大規模生產在線稱重", "高價值藥品品質控制", "自動化無人產線", "充填機/壓片機調試階段監控"],
    features: [
      "核心部件採用高精密電磁平衡式稱重傳感器與 DSP 高速處理系統",
      "軍事航空級零點追蹤與動態補償軟體算法，抗干擾能力極強",
      "創新的「良品、不良品、未檢品」三通道設計，解決異常停機時的排版問題，消除誤判",
      "積木式搭建定位結構，更換膠囊型號無需工具拆裝，定位精準無誤",
      "具備生產配方管理、豐富的數據統計、查詢及列印功能，符合 21 CFR Part 11"
    ],
    specs: {
      "型號與效率": "CMC±1: 600 pcs/min\nCMC±2: 750 pcs/min",
      "動態精度": "CMC±1: ±1.0mg\nCMC±2: ±2.0mg",
      "適用型號": "000# - 5# 膠囊、SA/SB 等所有型號及常規片劑",
      "稱重範圍": "20 mg - 2,000 mg",
      "解析度": "0.1 mg",
      "電壓/氣源": "220V/50Hz, 6-8bar",
      "外形尺寸/重量": "190 x 350 x 1480 mm / 60kg"
    }
  },
  {
    id: "halo-s-cmc-series",
    brand: "蘇州瀚隆 (HALO)",
    category: "重量檢測機",
    name: "S-CMC Small Scale Auto Checkweigher",
    name_zh: "S-CMC 小型全自動膠囊/片劑稱重檢測機",
    series: "S-CMC Series",
    tags: ["離線/在線兩用", "PU腳輪移動式", "高性價比入門款"],
    description: "S-CMC 為 CMC 全檢機的入門產品，具備靈活的工作方式與多種用途。它可對充填機運轉一圈產出的產品進行逐粒稱重檢測，比人工抽檢高出百倍抽樣量，更有效地監控品質波動。",
    application: ["小批量全檢", "離線/在線抽樣稱重", "充填壓片設備穩定性監控"],
    features: [
      "可單機使用或與生產設備連線，當抽樣時間到時自動蜂鳴提醒人工加料",
      "體積小不佔空間，配有 PU 腳輪，便於車間內靈活移動",
      "人機介面同步顯示每通道重量值，並以綠/紅色直方圖直觀顯示合格與否",
      "模具通用性強（如 00#和 0# 通用），減少模具數量並降低成本",
      "動態補償算法確保在震動環境下仍能穩定、快速且精確地稱重"
    ],
    specs: {
      "型號與效率": "S-CMC±1mg: 900 pcs/min\nS-CMC±2mg: 1200 pcs/min",
      "動態精度": "S-CMC±1mg: ±1.0mg\nS-CMC±2mg: ±2.0mg",
      "適用型號": "000# - 5# 膠囊及大多數片劑",
      "稱重範圍": "20 mg - 2,000 mg",
      "解析度": "0.1 mg",
      "外形尺寸": "490 x 350 x 1480 mm"
    }
  },
  {
    id: "halo-smc-series",
    brand: "蘇州瀚隆 (HALO)",
    category: "重量抽檢機",
    name: "SMC Desktop Sampling Checkweigher",
    name_zh: "SMC 桌上型膠囊/片劑粒重抽檢機",
    series: "SMC Series",
    tags: ["桌上型設計", "SPC 質量控制", "自動繪製趨勢圖"],
    description: "SMC 採用桌上型設計，小巧易用，能有效監測生產過程中藥品重量的變化情況。它大幅降低了人員勞動強度，從根本上杜絕了人工出錯，確保數據完整性與審計追蹤。",
    application: ["生產過程質量控制 (SPC)", "自動化抽檢替代人工", "符合 cGMP 合規性生產"],
    features: [
      "可按設定時間、數量自動抽樣檢測，自動記錄數據並繪製粒重統計分佈圖",
      "當發現粒重超標時自動剔除不合格品並報警提醒操作人員",
      "具備三級密碼管理系統，統計資訊一鍵完成列印，支持 PDF 生成",
      "豐富的外接接口（太網、USB、COM口、無線 WiFi），便於遠程監控",
      "全面滿足 cGMP 合規性，數據符合 21CFR-11 完整性規範"
    ],
    specs: {
      "型號與效率": "SMC-4: 240 pcs/min\nSMC-3: 180 pcs/min\nSMC-2: 120 pcs/min",
      "動態精度": "SMC-4: ±2.0mg\nSMC-3: ±2.0mg\nSMC-2: ±2.0mg",
      "顯示精度": "0.1 mg",
      "適用範圍": "膠囊、片劑",
      "電源/重量": "220V/50Hz / 38 kg",
      "外形尺寸": "520 x 300 x 550 mm"
    }
  }
];