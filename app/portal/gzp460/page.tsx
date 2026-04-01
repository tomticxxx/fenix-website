'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

// 定義投影片的資料結構類型
interface SlideItem {
  id: string;
  tag: string;
  title: string;
  subtitle: string;
  items: string[];
  image: string;
  theme: string;
  isCover?: boolean;
  isFinal?: boolean;
}

const slides: SlideItem[] = [
  { 
    id: "01", tag: "ULTIMATE PERFORMANCE", title: "GZP-460 高速壓片機", 
    subtitle: "新一代高效製藥生產平台：超越標準、追求極致良率", 
    items: ["對標歐洲一線大廠研發標準", "310mm 超大壓輪技術", "符合 PIC/S GMP 與數據完整性規範"], 
    image: "/gzp460-main.jpg", theme: "from-slate-950 to-blue-900", isCover: true 
  },
  { 
    id: "02", tag: "CORE ADVANTAGE I", title: "310mm 超大壓輪", 
    subtitle: "技術規格面的絕對碾壓 (對標台廠 250mm)", 
    items: ["提供更長的「保壓時間」，有效排除粉末空氣", "徹底解決中藥或高黏度粉末的「裂片」痛點", "主壓與預壓均達 100kN，確保錠劑硬度一致"], 
    image: "/compression-roller.jpg", theme: "from-blue-900 to-slate-900" 
  },
  { 
    id: "03", tag: "CORE ADVANTAGE II", title: "SS316L 頂級選材", 
    subtitle: "符合最嚴苛的藥典與潔淨度要求", 
    items: ["與物料接觸部位全採用 SS316L 不鏽鋼", "沖盤表面經雷射淬火，硬度與耐磨度大幅提升", "轉盤具備優異的抗腐蝕性，適合多樣化藥品生產"], 
    image: "/turret-detail.jpg", theme: "from-slate-900 to-indigo-950" 
  },
  { 
    id: "04", tag: "INTELLIGENT CONTROL", title: "單片壓力監測系統", 
    subtitle: "實現「零誤差」的自動化生產管理", 
    items: ["精密感應器捕捉每一沖壓力波動，精度達 0.1kN", "系統自動分析壓力波形，即時反饋調整片重", "確保長時間高速運轉下，單片差異控制在 ±3% 內"], 
    image: "/pressure-monitoring.jpg", theme: "from-indigo-950 to-slate-900" 
  },
  { 
    id: "05", tag: "WASTE REJECTION", title: "高精準單片剔廢", 
    subtitle: "節省昂貴藥粉，降低良品損失率", 
    items: ["高速氣動剔廢門，精確鎖定壓力異常之單片藥錠", "無需停機抽檢，不合格品 100% 自動分離", "大幅提升收率，年度節省成本極為可觀"], 
    image: "/rejection-system.jpg", theme: "from-slate-900 to-blue-950" 
  },
  { 
    id: "06", tag: "FEEDING SYSTEM", title: "三槳強迫餵料器", 
    subtitle: "解決高速生產下的填充不均難題", 
    items: ["獨立變頻控制，與轉盤速度精確同步", "特殊內部設計，減少物料粘附與發熱", "針對流動性差的粉末提供穩定的充填量"], 
    image: "/forced-feeder.jpg", theme: "from-blue-950 to-slate-950" 
  },
  { 
    id: "07", tag: "COMPLIANCE", title: "21 CFR Part 11 合規", 
    subtitle: "數據完整性與審計追蹤的完美方案", 
    items: ["四級權限管理，確保操作安全與數據不可篡改", "完整紀錄操作紀錄 (Audit Trail)，輕鬆應對稽查", "支援電子簽章與自動化數據備份"], 
    image: "/software-interface.jpg", theme: "from-slate-950 to-black" 
  },
  { 
    id: "08", tag: "MECHANICAL DESIGN", title: "一體化高剛性機架", 
    subtitle: "追求極致震動控制，延長設備壽命", 
    items: ["高強度鑄鐵底座，吸收高頻運轉下的微震動", "機械區與電子區完全隔離，防護等級高", "低噪音運行環境，提升生產現場操作舒適度"], 
    image: "/frame-structure.jpg", theme: "from-black to-slate-900" 
  },
  { 
    id: "09", tag: "QUICK CHANGEOVER", title: "模組化快速換模", 
    subtitle: "將停機時間降至最低，提升稼動率", 
    items: ["沖頭軌道模組化設計，拆裝無需繁雜工具", "配備專用液壓移動小車，安全且高效", "換模與清潔時間相較傳統機種縮短 50%"], 
    image: "/change-over-cart.jpg", theme: "from-slate-900 to-blue-900" 
  },
  { 
    id: "10", tag: "SANITARY", title: "三艙物理隔離設計", 
    subtitle: "徹底杜絕交叉污染與滲油風險", 
    items: ["壓片室全密封，與傳動機構完全隔離", "負壓循環設計，有效回收生產過程中的粉塵", "無死角圓弧設計，符合極簡清潔 (Easy Cleaning)"], 
    image: "/isolation-cabin.jpg", theme: "from-blue-900 to-slate-900" 
  },
  { 
    id: "11", tag: "LUBRICATION", title: "智慧稀油潤滑系統", 
    subtitle: "自動化維護，確保關鍵部件長效運轉", 
    items: ["中央集中供油，分段監控流量與油壓", "沖桿末端微量潤滑，防止過度噴灑污染藥粉", "系統自動預警油位不足，減少人為疏失"], 
    image: "/lubrication-system.jpg", theme: "from-slate-900 to-indigo-950" 
  },
  { 
    id: "12", tag: "POWER DRIVE", title: "伺服直驅技術", 
    subtitle: "動力系統的結構性突破", 
    items: ["取消傳統同步帶與減速機，動力傳輸更穩定", "極高的定位精度，確保轉盤運行流暢度", "減少易損件更換，降低長期維修成本"], 
    image: "/servo-drive.jpg", theme: "from-indigo-950 to-slate-950" 
  },
  { 
    id: "13", tag: "HMI INTERFACE", title: "21\" 工業級智慧中控", 
    subtitle: "直觀操控，掌握生產每一秒", 
    items: ["高解析度全彩觸控螢幕，圖形化數據展示", "具備配方存儲功能，換品種一鍵快速讀取", "實時顯示壓力趨勢圖與警報日誌"], 
    image: "/hmi-panel.jpg", theme: "from-slate-950 to-black" 
  },
  { 
    id: "14", tag: "SAFETY", title: "全方位安全連鎖", 
    subtitle: "符合國際 CE 標準的人機安全承諾", 
    items: ["全透明防爆護門，任何開啟動作自動停機", "多點配置緊急停止開關，響應速度極快", "電控系統具備過載與短路保護機制"], 
    image: "/safety-door.jpg", theme: "from-black to-blue-950" 
  },
  { 
    id: "15", tag: "VALIDATION", title: "完整的驗證體系", 
    subtitle: "協助藥廠快速通過認證", 
    items: ["提供標準 DQ / IQ / OQ / PQ 驗證文件", "附帶關鍵零件材質證明與熱處理報告", "完整的 FAT 與 SAT 驗證紀錄"], 
    image: "/validation-docs.jpg", theme: "from-blue-950 to-slate-900" 
  },
  { 
    id: "16", tag: "AUXILIARY", title: "真空上料系統 (ZKSL-180)", 
    subtitle: "全密閉物料輸送，無塵化廠房核心", 
    items: ["壓縮空氣驅動，無震動、低噪音設計", "PLC 智能控制，自動補料確保生產不中斷", "符合 GMP 要求之不鏽鋼材質與快裝連接"], 
    image: "/vacuum-loader.jpg", theme: "from-slate-900 to-indigo-950" 
  },
  { 
    id: "17", tag: "POST-PROCESSING", title: "上向式除粉與偵測", 
    subtitle: "高品質成品錠劑的最後一道防線", 
    items: ["高效除粉震動盤，徹底清除藥錠表面浮粉", "選配高靈敏金屬偵測器，確保 100% 產品安全", "高度可調，完美與壓片機出料口對接"], 
    image: "/de-duster.jpg", theme: "from-indigo-950 to-slate-950" 
  },
  { 
    id: "18", tag: "TECHNICAL SPECS", title: "核心技術參數表", 
    subtitle: "超越同級設備的高標準性能", 
    items: ["最大產量：400,000 錠/小時", "最大主壓力：100 kN | 預壓力：100 kN", "沖盤轉速：10 - 100 RPM"], 
    image: "/specs-table.jpg", theme: "from-slate-950 to-black" 
  },
  { 
    id: "19", tag: "COMPARISON", title: "核心競爭優勢", 
    subtitle: "與市場常規機種的關鍵技術對比", 
    items: ["壓輪更大 (310mm) -> 保壓更久，解決裂片痛點", "材質更優 (SS316L) -> 耐用度與合規性更高", "監測更強 (單片剔廢) -> 顯著提升產品收率"], 
    image: "/comparison-graph.jpg", theme: "from-black to-blue-900" 
  },
  { 
    id: "20", tag: "CONTACT US", title: "元堉企業有限公司", 
    subtitle: "專業機電碩士背景，提供精確技術支援", 
    items: ["電機工程碩士團隊技術支援", "在地化快速維護與備品供應", "協助廠房產線規劃與自動化升級"], 
    image: "/fenix-team.jpg", theme: "from-blue-900 to-black", isFinal: true 
  }
];

export default function FenixGZP460Final() {
  const router = useRouter();
  const [idx, setIdx] = useState<number>(0);
  const [dir, setDir] = useState<number>(0);
  const [imgError, setImgError] = useState<boolean>(false);

  // 導航函式
  const next = useCallback(() => {
    setIdx((prev) => {
      if (prev < slides.length - 1) {
        setDir(1);
        setImgError(false); // 切換頁面時重置錯誤狀態
        return prev + 1;
      }
      return prev;
    });
  }, []);

  const prev = useCallback(() => {
    setIdx((prev) => {
      if (prev > 0) {
        setDir(-1);
        setImgError(false); // 切換頁面時重置錯誤狀態
        return prev - 1;
      }
      return prev;
    });
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') next();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'Escape') router.push('/portal/list');
    };

    window.addEventListener('keydown', handleKeyDown);

    const styleId = 'fenix-master-layout-v14';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.innerHTML = `
        body { overflow: hidden !important; margin: 0; background: black; }
        .cursor-left { cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M19 12H5M12 19l-7-7 7-7'/%3E%3C/svg%3E") 16 16, w-resize; }
        .cursor-right { cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M5 12h14M12 5l7 7-7 7'/%3E%3C/svg%3E") 16 16, e-resize; }
        nav, footer, header, aside, #floating-concierge { display: none !important; }
      `;
      document.head.appendChild(style);
    }

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [next, prev, router]);

  return (
    <div className={`relative h-screen w-full overflow-hidden bg-gradient-to-br ${slides[idx].theme} text-white transition-all duration-1000 z-[9999]`}>
      
      {/* 標題 Logo */}
      <div className="absolute top-10 left-12 z-[110] select-none">
        <div className="flex flex-col">
          <div className="flex items-center space-x-3 mb-1">
            <div className="w-6 h-6 bg-gradient-to-tr from-blue-600 to-cyan-400 rounded-sm rotate-45 shadow-[0_0_15px_rgba(37,99,235,0.5)]" />
            <span className="text-4xl font-black tracking-[0.2em] bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-400">
              FENIX ENTERPRISE CO., LTD.
            </span>
          </div>
          <span className="text-[11px] font-medium tracking-[0.5em] text-blue-400/50 pl-10 uppercase italic">
            Professional Pharmaceutical Machinery Solution
          </span>
        </div>
      </div>

      {/* 交互導航層 */}
      <div className="absolute inset-0 z-[100] flex">
        <div className="w-1/2 h-full cursor-left" onClick={prev} />
        <div className="w-1/2 h-full cursor-right" onClick={next} />
      </div>

      {/* 右側快速索引 */}
      <div className="absolute right-12 top-1/2 -translate-y-1/2 z-[110] flex flex-col space-y-3">
        {slides.map((s, i) => (
          <button
            key={i}
            onClick={() => { setDir(i > idx ? 1 : -1); setIdx(i); setImgError(false); }}
            className={`group relative flex items-center justify-end transition-all duration-300 ${i === idx ? 'scale-110' : 'opacity-20 hover:opacity-100'}`}
          >
            <span className={`mr-4 text-[9px] font-mono tracking-widest transition-all whitespace-nowrap ${i === idx ? 'text-blue-400 opacity-100' : 'opacity-0 group-hover:opacity-100 text-slate-400'}`}>
              {i === idx ? s.tag : `P.${String(i + 1).padStart(2, '0')}`}
            </span>
            <div className={`h-[2px] transition-all duration-500 ${i === idx ? 'bg-blue-500 w-12' : 'bg-white w-4 group-hover:w-8'}`} />
          </button>
        ))}
      </div>

      {/* 內容渲染 */}
      <AnimatePresence mode="wait" custom={dir}>
        <motion.div
          key={idx}
          custom={dir}
          initial={{ opacity: 0, x: dir * 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: dir * -50 }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          className="relative h-full w-full flex items-center px-24"
        >
          {slides[idx].isCover ? (
            <div className="w-full text-left pl-12">
              <span className="px-6 py-2 border-l-4 border-blue-500 bg-blue-500/10 text-blue-400 text-sm font-bold mb-10 inline-block tracking-[0.5em]">GZP-460 SERIES SHOWCASE</span>
              <h1 className="text-[8vw] font-black leading-none mb-8 uppercase tracking-tighter italic drop-shadow-2xl">{slides[idx].title}</h1>
              <p className="text-4xl font-extralight text-slate-300 tracking-widest max-w-5xl leading-relaxed">{slides[idx].subtitle}</p>
            </div>
          ) : (
            <div className="grid grid-cols-12 w-full items-center gap-16">
              
              {/* 文字區：永遠固定 col-span-7，保證文字排版絕對不會因為圖片狀態而跳動 */}
              <div className="col-span-12 md:col-span-7 space-y-10">
                <motion.div initial={{ x: -20 }} animate={{ x: 0 }}>
                  <span className="text-blue-500 font-mono text-xl mb-4 block tracking-[0.5em] uppercase font-bold">{slides[idx].tag}</span>
                  <h2 className="text-7xl font-black mb-8 tracking-tight bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent italic">{slides[idx].title}</h2>
                  <p className="text-3xl text-slate-200 font-light leading-snug border-l-2 border-blue-900/50 pl-6">{slides[idx].subtitle}</p>
                </motion.div>
                <ul className="space-y-6">
                  {slides[idx].items.map((item, i) => (
                    <motion.li key={i} transition={{ delay: 0.2 + i * 0.1 }} className="flex items-start text-2xl text-slate-300">
                      <span className="mt-4 h-[2px] w-8 bg-blue-600 mr-6 shrink-0" />
                      <span className="font-light tracking-wide">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* 圖片與裝飾區：固定 col-span-5 */}
              <div className="hidden md:block col-span-5 relative">
                {/* 裝飾性背景 (補償機制)：當圖片失效時，顯示淡出的頁碼，維持視覺平衡 */}
                <div className="absolute inset-0 flex items-center justify-center text-[15vw] font-black text-white/[0.03] select-none italic pointer-events-none">
                  {slides[idx].id}
                </div>

                {/* 圖片容器：如果載入失敗，則透明度設為 0 */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }} 
                  animate={{ opacity: imgError ? 0 : 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="relative group">
                    <div className="absolute -inset-4 bg-blue-600/20 rounded-2xl blur-2xl group-hover:bg-blue-600/30 transition-all duration-700" />
                    <div className="relative bg-slate-900/50 rounded-2xl p-4 backdrop-blur-md border border-white/10 shadow-2xl">
                      <div className="aspect-[4/5] bg-black rounded-lg overflow-hidden flex items-center justify-center border border-white/5">
                        <img 
                          src={slides[idx].image} 
                          onError={() => setImgError(true)}
                          className="w-full h-full object-contain brightness-110 p-2" 
                          alt="tech-machinery" 
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* 底部導航與狀態欄 */}
      <div className="absolute bottom-12 left-12 right-12 z-[110] flex justify-between items-end pointer-events-none">
        <div className="flex items-center space-x-8 pointer-events-auto">
          <button 
            onClick={() => router.push('/portal/list')}
            className="flex flex-col group transition-all"
          >
            <span className="text-[10px] tracking-[0.3em] text-blue-500 font-black mb-2 opacity-60 group-hover:opacity-100">EXIT_HUB</span>
            <div className="h-[1px] w-full bg-blue-900 group-hover:bg-blue-500 transition-all" />
          </button>

          <div className="flex space-x-6 items-center border-l border-white/10 pl-8">
            <button onClick={prev} disabled={idx === 0} className={`group flex items-center justify-center w-12 h-12 border border-white/10 rounded-full transition-all ${idx === 0 ? 'opacity-0' : 'opacity-40 hover:opacity-100 hover:bg-blue-600 hover:border-blue-600'}`}>
              <span className="font-mono text-xl">{"<"}</span>
            </button>
            <button onClick={next} disabled={idx === slides.length - 1} className={`group flex items-center justify-center w-12 h-12 border border-white/10 rounded-full transition-all ${idx === slides.length - 1 ? 'opacity-0' : 'opacity-40 hover:opacity-100 hover:bg-blue-600 hover:border-blue-600'}`}>
              <span className="font-mono text-xl">{">"}</span>
            </button>
          </div>
        </div>

        <div className="text-right">
          <div className="font-mono text-[10px] tracking-[0.5em] text-blue-500/50 uppercase mb-2">
            TECHNICAL_ASSET // GZP-460
          </div>
          <div className="text-3xl font-black italic tracking-tighter text-white/20 leading-none">
              PAGE {String(idx + 1).padStart(2, '0')} <span className="text-sm font-light opacity-50">/ {slides.length}</span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-4 left-4 text-[8px] text-white/5 font-mono tracking-widest z-[111]">
        SECURE_DOCUMENT // REF: FX-460-2026 // AUTH: MANAGER
      </div>

    </div>
  );
}