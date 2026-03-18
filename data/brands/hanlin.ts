// data/brands/hanlin.ts
import { Product } from "../products";

export const hanlinProducts: Product[] = [
  {
    id: "hanlin-gzp-370a",
    brand: "翰林航宇",
    category: "壓片機",
    name: "GZP-370A High Speed Rotary Tablet Press",
    name_zh: "GZP-370A 系列高速旋轉壓片機",
    image: "/images/products/gzp-370a.jpg", // 對應您上傳的 gzp-370a.jpg
    series: "GZP-370A 系列",
    tags: ["單出料", "經典旗艦", "100kN", "cGMP"],
    searchKeywords: "高速壓片機, 自動打錠機, 翰林航宇, GZP-370A, 旋轉式壓片機",
    description: "GZP-370A 為旋轉式單出料高速壓片機，是翰林最為經典的旗艦產品。搭載超大直徑主壓輪，特別容易壓製中藥顆粒、濕法與乾法製粒物料，適用範圍廣且成型效果極佳。",
    application: ["中西藥顆粒壓片", "普通圓片", "異形片", "單雙面刻字片", "卡通片"],
    features: [
      "最大主壓力達 100kN，具備預壓、主壓兩次壓力成型",
      "接液部金屬採用 SS316L，符合最高 cGMP 規範",
      "全套西門子控制系統，支援自動片重調整與故障診斷",
      "壓片室 360° 全開啟設計，無死角易於清潔維護"
    ],
    specs: {
      "最大壓力": "100 kN",
      "收率": "99% 以上",
      "控制系統": "西門子 PLC + 10吋彩色觸控螢幕",
      "片重精度": "平均差異 ≦ ±2%"
    },
    models: [
      { name: "GZP-26A", "沖模數量": "26", "最高產能": "171,000 tablets/hr" },
      { name: "GZP-32A", "沖模數量": "32", "最高產能": "211,000 tablets/hr" },
      { name: "GZP-40A", "沖模數量": "40", "最高產能": "264,000 tablets/hr" },
      { name: "GZP-52A", "沖模數量": "52", "最高產能": "343,000 tablets/hr" }
    ]
  },
  {
    id: "hanlin-gzp-460",
    brand: "翰林航宇",
    category: "壓片機",
    name: "GZP-460 High Speed Rotary Tablet Press",
    name_zh: "GZP-460 系列伺服型高速壓片機",
    image: "/images/products/gzp-460.png", // 💡 修改處：對應您上傳的 gzp-460.png
    series: "GZP-460 系列",
    tags: ["伺服驅動", "高自動化", "乾粉直壓", "21CFR Part 11"],
    searchKeywords: "伺服壓片機, 高速打錠機, 工控機系統, 乾粉直壓, GZP-460",
    description: "GZP-460 具備極高的自動化程度。主、預壓輪直徑均達 φ310mm，成型時間比一般壓輪長約 10%，對於乾粉直壓及可壓性較差的物料（如中藥粉末）具有顯著優勢。",
    application: ["大批量生產", "乾粉直壓製程", "單層片", "環形片", "異形片"],
    features: [
      "採用伺服直驅電機與伺服計量，壓力與片重控制極其精確",
      "主預壓輪結構相同，壓力均可達 100kN",
      "配備 21吋西門子工業 PC，符合 21CFR Part 11 電子記錄規範",
      "三艙隔離與四立柱框架結構，運行極其穩定且噪音低"
    ],
    specs: {
      "壓輪直徑": "φ310 mm",
      "最大壓力": "100 kN",
      "主電機功率": "15 kW",
      "控制系統": "西門子工業 PC (工控機)"
    },
    models: [
      { name: "GZP-31", "沖頭數": "31", "最大產能": "186,000 tablets/hr" },
      { name: "GZP-38", "沖頭數": "38", "最大產能": "228,000 tablets/hr" },
      { name: "GZP-47", "沖頭數": "47", "最大產能": "282,000 tablets/hr" }
    ]
  },
  {
    id: "hanlin-hp535",
    brand: "翰林航宇",
    category: "壓片機",
    name: "HP535 Series Rotary Tablet Press",
    name_zh: "HP535 系列雙出料準高速壓片機",
    image: "/images/products/hp535.jpg", // 對應您上傳的 hp535.jpg
    series: "HP535 系列",
    tags: ["雙出料", "雙層片選配", "最高35萬片/hr", "高性價比"],
    searchKeywords: "雙出料壓片機, 雙層片打錠機, 產能翻倍, HP535",
    description: "HP535 採用雙出料設計，產能翻倍，最高產量可達每小時 35 萬片。特殊「騎縫式」中模緊定技術可防止偏心斷沖，並具備優異的自動潤滑系統。",
    application: ["大型藥廠量產", "雙層片生產 (選配)", "圓形片", "異形片"],
    features: [
      "雙邊加料、雙邊壓片與出料，極大化生產效率",
      "騎縫式中模緊定設計，同軸度高，顯著延長模具壽命",
      "自動稀油潤滑系統，可透過 PLC 自由設定潤滑間隔與油量",
      "符合歐洲 CE 標準，採用德國高強度防靜電有機玻璃護罩"
    ],
    specs: {
      "最高產量": "351,360 片/小時",
      "主壓力": "100 kN",
      "預壓力": "30 kN",
      "主電機": "7.5 kW (西門子/ABB)"
    },
    models: [
      { name: "HP-39", "沖頭數": "39", "最大產能": "224,640 tablets/hr" },
      { name: "HP-47", "沖頭數": "47", "最大產能": "270,720 tablets/hr" },
      { name: "HP-61", "沖頭數": "61", "最大產能": "351,360 tablets/hr" }
    ]
  }
];