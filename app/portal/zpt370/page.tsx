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
    id: "01", tag: "HIGH-SPEED PRECISION", title: "ZPT-370 高速壓片機", 
    subtitle: "精密、穩定、高效：現代化製藥生產的核心驅動力", 
    items: ["單面出料高速旋轉壓片系統", "符合 GAMP5 與 GMP 國際標準", "最大產量可達 343,000 片/小時"], 
    image: "/zpt370-main.jpg", theme: "from-slate-900 to-blue-900", isCover: true 
  },
  { 
    id: "02", tag: "CORE CAPACITY", title: "強悍的壓縮動力", 
    subtitle: "100kN 主壓與 20kN 預壓的完美組合", 
    items: ["預壓系統有效排除粉末空氣，預防裂片", "主壓達 100kN，輕鬆應對大片劑與難壓物料", "雙壓設計確保錠劑硬度與品質的高度一致"], 
    image: "/zpt-pressure.jpg", theme: "from-blue-900 to-slate-900" 
  },
  { 
    id: "03", tag: "VERSATILITY", title: "多樣化模具適應性", 
    subtitle: "支援 D/B/BB/HLS14 等多種國際規格", 
    items: ["ZPT-52 (HLS14) 專為高產量需求設計", "換盤與換模具過程簡化，縮短批次切換時間", "沖盤經過特殊熱處理，耐磨性提升 50%"], 
    image: "/zpt-turret.jpg", theme: "from-slate-900 to-indigo-950" 
  },
  { 
    id: "04", tag: "SIEMENS BRAIN", title: "西門子自動化控制", 
    subtitle: "穩定可靠的工業級 S7-200 SMART PLC", 
    items: ["西門子 7 吋高色彩觸控螢幕，操作直觀", "整合主電機與加料電機雙變頻調速系統", "數據讀取與參數設定毫秒級響應"], 
    image: "/siemens-control.jpg", theme: "from-indigo-950 to-slate-900" 
  },
  { 
    id: "05", tag: "PRODUCTION FLOW", title: "五段式精密壓片工序", 
    subtitle: "從填料到出片的極致優化路徑", 
    items: ["涵蓋：供料、計量、預壓、主壓、出片", "每段工序均可精確微調，確保重量誤差極小", "軌道設計平滑，減少沖頭運行震動與磨損"], 
    image: "/zpt-process.jpg", theme: "from-slate-900 to-blue-950" 
  },
  { 
    id: "06", tag: "FEEDING TECH", title: "變頻強迫餵料系統", 
    subtitle: "解決高速生產下的填充死角", 
    items: ["獨立變頻電機驅動，靈活調整餵料速度", "封閉式結構設計，徹底減少粉塵揚散", "適用於流動性不佳的複合粉末與顆粒"], 
    image: "/zpt-feeder.jpg", theme: "from-blue-950 to-slate-950" 
  },
  { 
    id: "07", tag: "SAFETY FIRST", title: "全方位連鎖安全保護", 
    subtitle: "保護操作者與設備的每一道防線", 
    items: ["具備主壓過載、上沖過緊、下沖過緊停機保護", "變頻器異常與電機過流自動偵測告警", "配置斷相、油位與擋塊多重電子感應"], 
    image: "/zpt-safety.jpg", theme: "from-slate-950 to-black" 
  },
  { 
    id: "08", tag: "CLEAN DESIGN", title: "GMP 潔淨室構造", 
    subtitle: "無死角設計，讓清潔更輕鬆", 
    items: ["生產區與傳動區完全物理隔離", "所有接觸物料零件皆採用 SS316L 或無毒材料", "全透明防護窗提供 360 度觀察視角"], 
    image: "/zpt-interior.jpg", theme: "from-black to-slate-900" 
  },
  { 
    id: "09", tag: "DATA INTEGRITY", title: "符合 CFR Part 11", 
    subtitle: "數位化的數據完整性解決方案", 
    items: ["分層級密碼管理權限，確保操作可追溯", "內建故障診斷系統，自動記錄警報歷史", "支援製程參數配方存儲，一鍵切換生產"], 
    image: "/zpt-software.jpg", theme: "from-slate-900 to-blue-900" 
  },
  { 
    id: "10", tag: "LUBRICATION", title: "智慧中央潤滑系統", 
    subtitle: "自動維護，延長軌道與沖頭壽命", 
    items: ["定時定量自動供油，確保關鍵摩擦點潤滑", "降低運轉噪音並減少機械發熱", "油路系統與生產區隔離，防止潤滑油污染藥片"], 
    image: "/zpt-lubrication.jpg", theme: "from-blue-900 to-slate-900" 
  },
  { 
    id: "11", tag: "VACUUM LOADER", title: "真空上料配套 (ZKSL-180)", 
    subtitle: "實現物料傳輸的全自動化", 
    items: ["正壓氣源驅動真空發生器，無塵化補料", "PLC 聯動控制，料位感應自動啟停", "易拆式過濾袋，清洗方便且符合衛生標準"], 
    image: "/zpt-vacuum.jpg", theme: "from-slate-900 to-indigo-950" 
  },
  { 
    id: "12", tag: "DUST EXTRACTION", title: "專用工業吸塵系統", 
    subtitle: "維持壓片室內負壓狀態的關鍵", 
    items: ["3kW 高流量抽吸，與產量高度匹配", "防靜電過濾袋，有效攔截細微粉塵", "帶腳輪移動設計，靈活配合現場佈置"], 
    image: "/zpt-dust.jpg", theme: "from-indigo-950 to-slate-950" 
  },
  { 
    id: "13", tag: "INSPECTION", title: "上向式除粉與金檢", 
    subtitle: "確保出廠每一片藥錠的純淨與安全", 
    items: ["SZ-300B 提升式除粉機，長路徑高效震動", "可加裝金屬偵測器，剔除不慎混入的微小金屬", "全不鏽鋼機身，與壓片機同步連動"], 
    image: "/zpt-deduster.jpg", theme: "from-slate-950 to-black" 
  },
  { 
    id: "14", tag: "PRECISION SPECS", title: "技術指標詳解 (I)", 
    subtitle: "追求極限的物理規格", 
    items: ["最大片徑：25mm (D型) / 13mm (BB型)", "填充深度可達 18mm，適應各種錠劑規格", "轉速範圍 22 - 110 RPM 連續可調"], 
    image: "/zpt-specs-1.jpg", theme: "from-black to-blue-950" 
  },
  { 
    id: "15", tag: "PRECISION SPECS", title: "技術指標詳解 (II)", 
    subtitle: "產能與功率的平衡", 
    items: ["主電機 7.5kW 強大動力輸出", "壓縮空氣需求 0.6MPa，耗量 <0.4m³/min", "整機重量 3800kg，保證高速下運行穩定"], 
    image: "/zpt-specs-2.jpg", theme: "from-blue-950 to-slate-900" 
  },
  { 
    id: "16", tag: "BATCH CONTROL", title: "啟停剔廢邏輯", 
    subtitle: "降低啟動階段的藥粉損耗", 
    items: ["內建「延時剔廢」功能，穩定前不入良品倉", "一鍵自動批剔廢，配合生產批次管理", "高響應電磁閥控制，反應速度低於 10ms"], 
    image: "/zpt-rejection.jpg", theme: "from-slate-900 to-indigo-950" 
  },
  { 
    id: "17", tag: "MAINTENANCE", title: "人性化維修設計", 
    subtitle: "降低運維成本的技術細節", 
    items: ["快裝式刮粉板與供料器，拆卸僅需幾秒鐘", "電控櫃與機身分體式規劃，散熱更佳", "易損件通用化設計，備品庫存成本低"], 
    image: "/zpt-maint.jpg", theme: "from-indigo-950 to-slate-950" 
  },
  { 
    id: "18", tag: "VALIDATION", title: "GMP 驗證支持", 
    subtitle: "完整的書面與現場測試文件", 
    items: ["提供 URS 響應表與 DQ/IQ/OQ/PQ 模板", "材質證明書 (Mill Certificates) 齊全", "FAT 與 SAT 驗證紀錄協助"], 
    image: "/zpt-docs.jpg", theme: "from-slate-950 to-black" 
  },
  { 
    id: "19", tag: "SUMMARY", title: "為何選擇 ZPT-370?", 
    subtitle: "穩定與性價比的極致平衡", 
    items: ["100kN 壓力規格對標國際一線機種", "西門子控制系統降低故障率與維護門檻", "靈活的輔機配置，滿足全自動產線需求"], 
    image: "/zpt-summary.jpg", theme: "from-black to-blue-900" 
  },
  { 
    id: "20", tag: "YOUR PARTNER", title: "元堉企業有限公司", 
    subtitle: "專業機電碩士背景，為您的生產線保駕護航", 
    items: ["專精軟膠囊與硬錠生產設備代理", "提供從廠房設計到驗證的一站式服務", "電機工程碩士團隊，在地化技術支援"], 
    image: "/fenix-contact.jpg", theme: "from-blue-900 to-black", isFinal: true 
  }
];

export default function FenixZPT370Final() {
  const router = useRouter();
  const [idx, setIdx] = useState<number>(0);
  const [dir, setDir] = useState<number>(0);
  const [imgError, setImgError] = useState<boolean>(false);

  const next = useCallback(() => {
    setIdx((prev) => {
      if (prev < slides.length - 1) {
        setDir(1);
        setImgError(false);
        return prev + 1;
      }
      return prev;
    });
  }, []);

  const prev = useCallback(() => {
    setIdx((prev) => {
      if (prev > 0) {
        setDir(-1);
        setImgError(false);
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

    const styleId = 'fenix-zpt-layout-v14';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.innerHTML = `
        body { overflow: hidden !important; margin: 0; background: black; }
        .cursor-left { cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M19 12H5M12 19l-7-7 7-7'/%3E%3C/svg%3E") 16 16, w-resize; }
        .cursor-right { cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M5 12h14M12 5l7 7-7 7'/%3E%3C/svg%3E") 16 16, e-resize; }
        nav, footer, header, aside { display: none !important; }
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
            <div className="w-6 h-6 bg-gradient-to-tr from-blue-600 to-cyan-400 rounded-sm rotate-45 shadow-[0_0_15px_rgba(37,99,235,0.4)]" />
            <span className="text-4xl font-black tracking-[0.25em] bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-400">
              FENIX ENTERPRISE CO., LTD.
            </span>
          </div>
          <span className="text-[11px] font-medium tracking-[0.5em] text-blue-400/50 pl-10 uppercase italic">
            ZPT-370 Precision Engineering Solutions
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
              <span className="px-6 py-2 border-l-4 border-blue-500 bg-blue-500/10 text-blue-400 text-sm font-bold mb-10 inline-block tracking-[0.5em]">ZPT-370 HIGH-SPEED ROTARY</span>
              <h1 className="text-[8vw] font-black leading-none mb-8 uppercase tracking-tighter italic drop-shadow-2xl">{slides[idx].title}</h1>
              <p className="text-4xl font-extralight text-slate-300 tracking-widest max-w-5xl leading-relaxed">{slides[idx].subtitle}</p>
            </div>
          ) : (
            <div className="grid grid-cols-12 w-full items-center gap-16">
              
              {/* 文字區：固定 col-span-7 */}
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
                {/* 裝飾性背景 (頁碼浮水印) */}
                <div className="absolute inset-0 flex items-center justify-center text-[15vw] font-black text-white/[0.03] select-none italic pointer-events-none">
                  {slides[idx].id}
                </div>

                {/* 圖片容器 */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }} 
                  animate={{ opacity: imgError ? 0 : 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="relative group">
                    <div className="absolute -inset-4 bg-cyan-600/10 rounded-2xl blur-2xl group-hover:bg-cyan-600/20 transition-all duration-700" />
                    <div className="relative bg-slate-900/40 rounded-2xl p-4 backdrop-blur-md border border-white/10 shadow-2xl">
                      <div className="aspect-[4/5] bg-black/50 rounded-lg overflow-hidden flex items-center justify-center border border-white/5">
                        <img 
                          src={slides[idx].image} 
                          onError={() => setImgError(true)}
                          className="w-full h-full object-contain brightness-110 p-4" 
                          alt="technical-view" 
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
            <span className="text-[10px] tracking-[0.3em] text-blue-500 font-black mb-2 opacity-60 group-hover:opacity-100 uppercase">EXIT_HUB</span>
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
            TECHNICAL_ASSET // ZPT-370
          </div>
          <div className="text-3xl font-black italic tracking-tighter text-white/20 leading-none">
              PAGE {String(idx + 1).padStart(2, '0')} <span className="text-sm font-light opacity-50">/ {slides.length}</span>
          </div>
        </div>

      </div>

      <div className="absolute bottom-4 left-4 text-[8px] text-white/5 font-mono tracking-[0.2em] z-[111] uppercase">
        Encrypted_Session // REF: FX-ZPT-2026 // AUTH: SENIOR_MANAGER
      </div>

    </div>
  );
}