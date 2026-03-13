// data/brands/sky.ts
import { Product } from "../products";

export const skyProducts: Product[] = [
  {
    id: "sky-sv-series", 
    brand: "SKY SOFTGEL",
    category: "軟膠囊機",
    name: "SV Auto Servo Series",
    name_zh: "SV 全自動伺服系列",
    series: "Auto Servo Series",
    // 強化搜尋標籤：加入具體型號與核心技術名詞
    tags: ["SV-R&D", "SV-600", "SV-1000", "SV-3000", "SV-5000", "全伺服", "藥品級", "SKY旗艦機", "Servo Control"],
    // 新增搜尋關鍵字：用於 AI 搜尋比對，涵蓋應用、型號與中文同義詞
    searchKeywords: "SV3000 SV1000 SV600 SVR&D 軟膠囊設備 魚油 維他命 藥廠 伺服馬達 高產能 精準填充 韓國製造",
    description: "SKY 旗艦伺服系列，涵蓋從研發型到超高產能機型。搭載全自動化技術，實現從模具對準、填充量補償到注射時機的全面伺服精密控制。",
    application: ["高價值藥品", "魚油/維他命保健品", "化妝品時空膠囊", "代工廠大規模量產"],
    features: [
      "模具對準自動化 (Auto Die roll zero point control)：無需手動設定，自動對齊",
      "填充重量自動補償 (Auto fill weight adjustment)：透過觸控螢幕輸入即可精準調整",
      "自動注射時機校準 (Auto injection timing adjustment)：雙側伺服獨立控制，確保封口品質",
      "CCD 膠皮厚度自動控制 (選配)：高精度檢測並自動調節膠皮厚度",
      "超大容量配方系統：可儲存超過十萬組生產參數，一鍵載入即可生產",
      "德國高品質伺服驅動系統：搭載高品質伺服馬達，確保長期運轉穩定性"
    ],
    specs: { 
      "控制系統": "進階 HMI 觸控螢幕 / PLC 控制",
      "填充精度": "高精度計量泵控制",
      "合模技術": "優質封口率，無需傳統時間齒齒輪",
      "合規性": "支援 CFR21 Part 11 (選配)"
    },
    models: [
      { name: "SV-R&D", "Max RPM": "6", "Die Roll Size (mm)": "100(dia) x 150(L)", "Oblong 5": "20,160", "Oval 3": "19,440" },
      { name: "SV-600", "Max RPM": "6", "Die Roll Size (mm)": "100(dia) x 150(L)", "Oblong 5": "60,480", "Oval 3": "87,480" },
      { name: "SV-1000", "Max RPM": "7", "Die Roll Size (mm)": "150(dia) x 250(L)", "Oblong 5": "172,200", "Oval 3": "275,520" },
      { name: "SV-3000", "Max RPM": "6", "Die Roll Size (mm)": "200(dia) x 300(L)", "Oblong 5": "237,600", "Oval 3": "369,360" },
      { name: "SV-5000", "Max RPM": "6", "Die Roll Size (mm)": "200(dia) x 360(L)", "Oblong 5": "297,000", "Oval 3": "447,120" }
    ]
  },
  {
    id: "sky-sv-afs-series",
    brand: "SKY SOFTGEL",
    category: "軟膠囊機",
    name: "SV AFS (Animal Free) Series",
    name_zh: "SV AFS 植物性膠囊專用系列",
    series: "Auto Servo AFS Series",
    tags: ["SV-3000 AFS", "SV-1000 AFS", "植物性膠囊", "澱粉膠皮", "無明膠", "Vegan"],
    searchKeywords: "AFS3000 AFS1000 素食膠囊 澱粉 鹿角菜膠 Halal 清真 認證 植物膠 軟膠囊機",
    description: "專為植物性膠皮研發。搭載 AFS 專利冷卻與送料系統，完美解決植物膠在高溫下的穩定性與成型挑戰。",
    application: ["素食產品 (Vegan)", "清真認證產品 (Halal)", "特殊植物膠配方"],
    features: [
      "AFS 專利熱膠處理技術：專為澱粉與鹿角菜膠設計的穩定循環系統", 
      "自動模具對準與填充補償：延續 SV 系列的高精度自動化優點",
      "十萬組配方儲存系統：針對不同植物膠材質優化參數管理",
      "封口壓力自動補償：確保植物膠膠囊封口處的強度與美觀"
    ],
    specs: { 
      "核心技術": "AFS 專利熱膠循環系統", 
      "適用材質": "澱粉 / 鹿角菜膠 / 植物性明膠",
      "專業建議": "植物膠因材質特性，建議生產轉速維持在 3 RPM 以達到最佳良率"
    },
    models: [
      { name: "SV-R&D AFS", "Max RPM": "3", "Die Roll Size (mm)": "100(dia) x 150(L)", "Oblong 5": "8,280", "Oval 3": "7,560" },
      { name: "SV-600 AFS", "Max RPM": "3", "Die Roll Size (mm)": "100(dia) x 150(L)", "Oblong 5": "20,700", "Oval 3": "26,460" },
      { name: "SV-1000 AFS", "Max RPM": "3", "Die Roll Size (mm)": "150(dia) x 250(L)", "Oblong 5": "56,700", "Oval 3": "80,640" },
      { name: "SV-3000 AFS", "Max RPM": "3", "Die Roll Size (mm)": "200(dia) x 300(L)", "Oblong 5": "93,060", "Oval 3": "131,580" },
      { name: "SV-5000 AFS", "Max RPM": "3", "Die Roll Size (mm)": "200(dia) x 360(L)", "Oblong 5": "118,440", "Oval 3": "162,540" }
    ]
  },
  {
    id: "sky-ss-series",
    brand: "SKY SOFTGEL",
    category: "軟膠囊機",
    name: "SS Mechanical Series",
    name_zh: "SS 傳統機械系列",
    series: "Old Mechanical Series",
    tags: ["SS-R&D", "SS-60T", "SS-100T", "SS-500T", "傳統機械", "高CP值", "經典款"],
    searchKeywords: "SS60T SS100T SS500T 傳統型 齒輪傳動 耐用 便宜 入門 軟膠囊 設備",
    description: "SKY 經典機械系列，採用穩定可靠的齒輪傳動結構。非常適合追求高耐用度與簡易維護的大規模標準化生產需求。",
    application: ["一般藥品生產", "大眾化保健食品", "高投資報酬率生產線"],
    features: [
      "傳統齒輪驅動系統：結構紮實，長期運作穩定性佳",
      "一鍵式自動化熔膠技術：簡化煮膠流程，降低人為誤差",
      "穩定膠皮供應系統：精確控制膠皮厚度與輸送穩定性",
      "支援 WIP & CIP 系統：符合 GMP 標準的自動清洗架構"
    ],
    specs: { 
      "核心傳動": "機械式齒輪驅動",
      "填充控制": "手動或半自動調節系統",
      "可選配項": "全自動煮膠系統與多樣化熔膠罐配置"
    },
    models: [
      { name: "SS-R&D", "Max RPM": "5", "Die Roll Size (mm)": "100(dia) x 150(L)", "Oblong 5": "8,400", "Oval 3": "8,400" },
      { name: "SS-60T", "Max RPM": "5", "Die Roll Size (mm)": "100(dia) x 150(L)", "Oblong 5": "50,400", "Oval 3": "75,600" },
      { name: "SS-100T", "Max RPM": "3.5", "Die Roll Size (mm)": "150(dia) x 250(L)", "Oblong 5": "94,710", "Oval 3": "137,760" },
      { name: "SS-500T", "Max RPM": "6", "Die Roll Size (mm)": "150(dia) x 250(L)", "Oblong 5": "162,360", "Oval 3": "236,160" }
    ]
  },
  {
    id: "sky-gelatin-cooking",
    brand: "SKY SOFTGEL",
    category: "煮膠系統",
    name: "Auto Gelatin Cooking System",
    name_zh: "全自動煮膠熔膠系統",
    series: "Gelatin System",
    tags: ["Cooking System", "Melting Tank", "One-touch", "WIP & CIP", "自動化"],
    searchKeywords: "煮膠機 熔膠罐 真空脫泡 甘油 投料 藥品級 膠液 GMP",
    description: "SKY 旗艦級全自動煮膠系統，採用 One-touch 一鍵式操作。全程監控溫度設定、真空脫泡與自動配方控制。",
    application: ["藥品級膠液製備", "大規模軟膠囊生產線", "精密配方管理"],
    features: [
      "自動配方管理：自動時間設定與配方儲存，確保每批膠液品質一致",
      "全自動真空與閥門系統：精密控制真空度，有效進行膠液脫泡",
      "自動稱重系統 (Load cell)：精確控制甘油、水與膠粉的投料比例",
      "符合 GMP 之清洗系統：支援自動化 WIP & CIP，換線清洗更便利"
    ],
    specs: { 
      "系統架構": "一鍵式全自動控制",
      "標準流程": "設定溫度 → 自動供水/甘油 → 自動投入膠粉 → 兩段式真空脫泡",
      "自動化程度": "PLC 全程監控並記錄 HMI 生產數據"
    },
    models: [
      { name: "Auto Gelatin Melting Tank", "Option": "Full Options", "Control": "HMI Touch Screen", "Capacity": "可根據客戶產能需求客製化" }
    ]
  },
  {
    id: "sky-tumbling-dryer",
    brand: "SKY SOFTGEL",
    category: "周邊設備",
    name: "High Speed Drying System",
    name_zh: "雙層高速乾燥轉籠系統",
    series: "Drying System",
    tags: ["Tumbling Dryer", "Double Deck", "高速乾燥", "溫濕度控制"],
    searchKeywords: "乾燥籠 轉籠 膠囊定型 雙層 垂直 節省空間 快速乾燥 溫濕度 控制",
    description: "專為大幅縮短乾燥時間設計。採雙層結構節省佔地空間，內建精確溫濕度控制與數位顯示系統，確保膠囊定型品質。",
    application: ["軟膠囊快速定型", "自動化乾燥製程"],
    features: [
      "極短乾燥時間：最快僅需 8 小時即可完成乾燥定型",
      "數位化溫濕度控制：精確顯示並調整轉籠內的生產環境",
      "空間優化設計：雙層垂直結構，提升單位面積產能效率",
      "縮短產品交期：快速定型有助於提升整體產線的周轉效率"
    ],
    specs: { 
      "標準乾燥效率": "約 8 小時 (依環境而異)",
      "系統配置": "雙層轉籠，具備同步控制與數位顯示功能"
    },
    models: [
      { name: "Standard Double Deck", "Drying Time": "8 Hours", "Control": "Digital Sync Display" }
    ]
  },
  {
    id: "sky-vision-inspection",
    brand: "SKY SOFTGEL",
    category: "周邊設備",
    name: "Auto Vision Inspection Machine",
    name_zh: "全自動視覺檢測機",
    series: "Inspection System",
    tags: ["Vision Inspection", "自動剔除", "品質控制", "200,000 caps/hr"],
    searchKeywords: "視覺檢驗 挑選機 藥品全檢 AI 檢測 顏色 形狀 異常 剔除 不良品",
    description: "高效率視覺 AI 檢測系統，可針對顏色、形狀異常及異物汙染進行自動化高速剔除，確保產品出廠品質。",
    application: ["藥品品質最終檢驗", "出口高標準品質控管", "取代人工全檢"],
    features: [
      "自動化視覺掃描：輕鬆監控產品品質，降低人工誤判風險",
      "多樣化檢測功能：支援各種形狀、顏色的軟膠囊檢測",
      "精確剔除機制：自動分離不同顏色、形狀或含有雜質的不良品",
      "完整生產報告：產能達每小時 20 萬顆，並產出批次追蹤報告"
    ],
    specs: { 
      "檢測產能": "200,000 capsules / hr",
      "控制系統": "高階視覺檢查控制模組",
      "剔除方式": "氣動自動剔除不合格品"
    },
    models: [
      { name: "Standard Vision Inspector", "Output": "200,000 caps/hr", "Control": "Automatic Quality Control" }
    ]
  },
  {
    id: "sky-slp-100",
    brand: "SKY SOFTGEL",
    category: "周邊設備",
    name: "Laser Printing Machine",
    name_zh: "SLP-100 雷射印字機",
    series: "Printing System",
    tags: ["SLP-100", "雷射印字", "非接觸印刷", "高精確度"],
    searchKeywords: "SLP100 雷射雕刻 印字機 防偽 膠囊印字 批號 追溯 品牌 標誌",
    description: "採用高科技非接觸式雷射印字技術，支援軟/硬膠囊。搭載伺服馬達驅動與視覺檢測系統，確保印字清晰穩定且不傷表面。",
    application: ["產品防偽印記", "品牌標誌識別", "藥品批號追溯"],
    features: [
      "高精度伺服驅動：確保膠囊傳輸位置極度精確",
      "換件快速簡便：人性化設計，更換產品規格僅需極短時間",
      "自動視覺監控 (選配)：具備 99.9% 準確率的高速視覺檢核",
      "即時品質監測：印字過程全程監控，自動挑選不清晰之產品"
    ],
    specs: { 
      "產能 (Oval 10)": "200,000 / hour",
      "產能 (Oblong 20)": "100,000 / hour",
      "適用範圍": "各種尺寸軟膠囊與硬膠囊"
    },
    models: [
      { name: "SLP-100", "Output (Oval 10)": "200,000/hr", "Output (Oblong 20)": "100,000/hr", "Technology": "Laser Marking" }
    ]
  },
  {
    id: "sky-blister-platen",
    brand: "SKY SOFTGEL",
    category: "包裝設備",
    name: "Auto Servo Blister Machine (Platen Type)",
    name_zh: "全自動伺服平板式泡殼包裝機",
    series: "SVB Platen Series",
    tags: ["SVB-1000", "SVB-4000", "SVB-5000", "PTP包裝", "平板密封", "節省耗材"],
    searchKeywords: "SVB1000 SVB4000 SVB5000 泡殼機 PTP 鋁箔包裝 平板式 藥片包裝 封口 節省材料",
    description: "採用先進平板式密封技術，有效減少包材浪費。歐式開放架構 (Balcony type) 符合 GMP 標準，維護清潔極為方便。",
    application: ["軟膠囊 PTP 鋁箔包裝", "錠劑/硬膠囊包裝", "大規模自動化生產"],
    features: [
      "大幅節省包裝成本：平板密封技術可減少 PVC-ALU 包材浪費",
      "零邊料浪費設計：降低包裝排間距，提高材料利用率",
      "全伺服馬達驅動：精確控制行程與成型穩定度",
      "符合 GMP 標準：採開放式陽台架構，隔離傳動區與包裝區"
    ],
    specs: { 
      "密封類型": "平板式密封 (Platen sealing)",
      "支援包材": "PVC, PVC/PVDC, Alu-Alu, PET, COC (0.25-0.40mm)",
      "進階選配": "視覺檢測系統、連線打碼機、符合 CFR21 Part 11"
    },
    models: [
      { name: "SVB-1000", "Output": "max 200 blister/min", "Forming area": "110 x 260 mm", "Punching speed": "max 50 times/min" },
      { name: "SVB-4000", "Output": "max 400 blister/min", "Forming area": "180 x 190 mm", "Punching speed": "max 200 cycles/min" },
      { name: "SVB-5000", "Output": "max 400 blister/min", "Forming area": "200 x 270 mm", "Punching speed": "max 200 cycles/min" }
    ]
  },
  {
    id: "sky-blister-rotary",
    brand: "SKY SOFTGEL",
    category: "包裝設備",
    name: "Auto Servo Blister Machine (Rotary Type)",
    name_zh: "全自動伺服滾筒式泡殼包裝機",
    series: "SVB Rotary Series",
    tags: ["SVB-400", "SVB-500", "滾筒式密封", "高速生產", "各種材性"],
    searchKeywords: "SVB400 SVB500 滾筒式 泡殼機 高速包裝 連續密封 錠劑 膠囊",
    description: "滾筒式密封技術專為連續、高速包裝作業量量身打造。產能強大且相容多種包材，並可選配視覺檢查系統。",
    application: ["高速錠劑/膠囊包裝", "大規模自動化包裝線", "各式複合包材適用"],
    features: [
      "高速連續密封：滾筒式結構可實現極高產出量",
      "包材相容性廣：完美支援 Alu, Paper, PVC, PVDC 等材質",
      "伺服馬達精確連動：確保高速運作下成型與封口的同步度",
      "快拆模具設計：簡化更換模具流程，減少停機時間"
    ],
    specs: { 
      "密封類型": "滾筒式連續密封 (Rotary sealing)",
      "控制系統": "PLC 控制與人性化觸控介面",
      "最高產量": "每分鐘最高 400 泡"
    },
    models: [
      { name: "SVB-400", "Output": "max 400 blister", "Forming area": "180 x 190 mm", "Machine Weight": "3,100 Kg" },
      { name: "SVB-500", "Output": "max 400 blister", "Forming area": "200 x 270 mm", "Machine Weight": "3,800 Kg" }
    ]
  },
  {
    id: "sky-auto-carton",
    brand: "SKY SOFTGEL",
    category: "包裝設備",
    name: "Auto Carton Packing Machine",
    name_zh: "全自動裝盒機",
    series: "SVC Series",
    tags: ["SVC-100", "SVC-200", "SVC-300", "裝盒機", "藥品包裝", "伺服驅動"],
    searchKeywords: "SVC100 SVC200 SVC300 裝盒 紙盒 包裝 自動裝盒 藥盒 說明書",
    description: "SKY 全自動裝盒機採用的開放式陽台架構，將傳動組件與包裝作業區完全分離。運作安靜且換線極速。",
    application: ["PTP 泡殼自動裝盒", "瓶裝/罐裝產品裝盒", "軟管或特殊形狀產品裝盒"],
    features: [
      "陽台式架構設計：機械驅動區與包裝衛生區隔離，清潔無死角",
      "高速穩定運轉：特殊成型機構，確保高速下紙盒成型品質",
      "低噪音設計：改善傳統機械噪音問題，維護維修極為便利",
      "數位調節器：具備數位指示，可快速進行不同規格規格調整",
      "多樣化推料系統：提供推桿式或轉塔式機構，對應不同產品特性"
    ],
    specs: { 
      "運作模式": "間歇式 (SVC-100) / 連續式 (SVC-200/300)",
      "封口選擇": "插口式 (Tuck-in) 或熱熔膠封口 (Hot melt)",
      "配套選配": "噴碼機、說明書摺疊機 (Leaflet folder)、自動入料系統"
    },
    models: [
      { name: "SVC-100", "Output (min)": "100", "Carton Width": "25-110 mm", "Required Power": "3.0 Kw + option" },
      { name: "SVC-200", "Output (min)": "200", "Carton Width": "30-90 mm", "Required Power": "5.5 Kw + option" },
      { name: "SVC-300", "Output (min)": "300", "Carton Width": "30-90 mm", "Required Power": "6.0 Kw + option" }
    ]
  },
  {
    id: "sky-cartoning-line-peripherals",
    brand: "SKY SOFTGEL",
    category: "周邊設備",
    name: "Cartoning Line Peripherals",
    name_zh: "裝盒線配套設備",
    series: "Packaging Line",
    tags: ["Weighing Checker", "Temper Proof", "Banding Machine", "Pillow Bag"],
    searchKeywords: "重量選別 重量檢測 防偽貼標 綑包機 枕式包裝 後段包裝 自動化 檢驗",
    description: "提供裝盒線完整的後段配套，涵蓋自動稱重校驗、防偽封標、綑包及枕式包裝，打造全自動包裝系統。",
    application: ["包裝線最終檢驗", "自動化二級包裝", "產品防偽與集體包裝"],
    features: [
      "自動稱重檢測儀：具備自動歸零追蹤與高精度高速秤重功能",
      "防偽貼標機：具備人性化操作介面與 PLC 同步控制",
      "自動綑包機：全伺服馬達驅動，速度高達每分鐘 30-60 綑",
      "自動枕式包裝機：適合各類盒裝或散裝產品的防護包裝"
    ],
    specs: { 
      "綑包效率": "30-60 bundles / min",
      "核心控制": "PLC 同步控制系統與人性化操作介面",
      "生產特點": "自動化程度高，大幅減少後段包裝人力需求"
    },
    models: [
      { name: "Weighing Checker", "Feature": "Auto Zero Tracking" },
      { name: "Temper Proof Machine", "Feature": "User friendly HMI" },
      { name: "Banding Machine", "Speed": "30-60 bundles/min" },
      { name: "Pillow Bag Machine", "Feature": "Auto Loading support" }
    ]
  },
  {
    id: "sky-smc-series",
    brand: "SKY SOFTGEL",
    category: "數粒設備",
    name: "Multi Counting Machine",
    name_zh: "高階多軌式數粒機",
    series: "SMC Series",
    tags: ["SMC-527SQ", "SMC-527D", "SMC-527S", "數粒機", "瓶裝線", "200 BPM"],
    searchKeywords: "SMC527SQ SMC527D SMC527S 數顆機 瓶裝 多軌道 精準計數 膠囊 錠劑 數粒",
    description: "SKY 進階多軌式數粒機，專為錠劑、軟硬膠囊設計。最高產能達 200 BPM，能與瓶裝產線完美連動，確保計數精準無誤。",
    application: ["保健食品/藥品瓶裝", "精密顆粒計數", "一體化瓶裝產線"],
    features: [
      "進階多軌數粒技術：多軌道同步運行，計數精準且不傷藥錠",
      "高效產能：最高可達每分鐘 200 瓶 (以100粒/瓶計)",
      "空間優化設計：機型緊湊，提升廠房空間利用效率",
      "高相容性：適用外徑 3-20mm 之各類錠劑與軟硬膠囊",
      "藥品級材質：接觸藥品部位均採用 SUS 316L 不鏽鋼"
    ],
    specs: { 
      "適用顆粒": "3-20mm 錠劑 / 膠囊 / 軟膠囊",
      "軌道配置": "12 / 24 / 32 軌供選擇",
      "最高產能": "200 BPM (SMC-527SQ)",
      "料斗容量": "40 - 70 公升"
    },
    models: [
      { name: "SMC-527SQ", "Track Qty": "32", "Max Output": "200 BPM", "Counting Speed": "16,000 tabs/min" },
      { name: "SMC-527D", "Track Qty": "24", "Max Output": "120 BPM", "Counting Speed": "12,000 tabs/min" },
      { name: "SMC-527S", "Track Qty": "12", "Max Output": "60 BPM", "Counting Speed": "6,000 tabs/min" }
    ]
  },
  {
    id: "sky-bottling-line",
    brand: "SKY SOFTGEL",
    category: "包裝設備",
    name: "Auto Bottling Line System",
    name_zh: "全自動瓶裝生產線系統",
    series: "Packaging Line",
    tags: ["理瓶機", "旋蓋機", "鋁箔封口", "貼標機", "自動化產線"],
    searchKeywords: "瓶裝線 旋蓋 鋁箔封口 理瓶機 洗瓶機 乾燥劑 貼標 自動化 生產線",
    description: "完整的自動化瓶裝方案，涵蓋從空瓶理瓶到最終貼標的核心工序，可靈活搭配 SMC 系列數粒機打造高效產線。",
    application: ["自動化瓶裝作業", "藥品與營養品包裝產線"],
    features: [
      "理瓶與洗瓶系統 (Unscrambler)：自動化整列瓶身並進行氣流吹洗",
      "乾燥劑投放 (Desiccant Inserter)：精確投放袋裝或罐裝乾燥劑",
      "塞棉/塞膜機 (Cotton/PE Inserter)：視需求投放棉花或 PE 膜保護藥錠",
      "旋蓋系統 (Rotary Capper)：支援各種蓋型的高速旋蓋機構",
      "鋁箔封口機 (Induction Sealer)：電磁感應封口，可選水冷或風冷系統",
      "自動貼標機 (Side Labeler)：精準側邊貼標，提升外包裝質感"
    ],
    specs: { 
      "全線控制": "PLC 同步連鎖控制系統",
      "適用瓶身直徑": "30-110mm",
      "產線整合": "可依據數粒機產能進行整線流量匹配"
    },
    models: [
      { name: "Rotary Capper", "Feature": "多頭旋蓋，支援螺紋蓋或壓蓋" },
      { name: "Induction Sealer", "Type": "電磁感應封口技術" },
      { name: "Unscrambler", "Feature": "自動氣流清洗瓶內異物" }
    ]
  }
];