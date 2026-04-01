'use client';

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Footer() {
  const [clickCount, setClickCount] = useState(0);
  const router = useRouter();

  // 隱形暗門觸發邏輯
  const handleSecretClick = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);

    // 設定連點 3 下觸發跳轉
    if (newCount >= 3) {
      router.push('/portal');
      setClickCount(0);
    }
  };

  // 安全機制：3秒後自動重置點擊次數，防止長時間累積誤觸
  useEffect(() => {
    if (clickCount > 0) {
      const timer = setTimeout(() => setClickCount(0), 3000);
      return () => clearTimeout(timer);
    }
  }, [clickCount]);

  return (
    <footer className="bg-slate-900 text-slate-500 py-10 px-6 border-t border-slate-800 font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-y-10 md:gap-x-8">
        
        {/* 左側：品牌資訊 */}
        <div className="col-span-1 md:col-span-2 space-y-4">
          <div className="space-y-1">
            <h3 className="text-white text-lg font-black tracking-tighter">元堉企業有限公司</h3>
            <p className="text-[10px] text-blue-500/60 font-bold tracking-[0.2em] uppercase">Fenix Enterprise Co., Ltd.</p>
          </div>
          
          <p className="text-xs leading-relaxed max-w-sm opacity-80 font-normal">
            專業代理製藥、食品、化妝品生產線設備。憑藉電機工程碩士背景與 30 年實務經驗，提供系統整合、邏輯分析及 OQ/IQ 驗收一站式技術服務。
          </p>

          <div className="pt-3 border-t border-slate-800 w-fit space-y-1">
            <p className="text-[10px] tracking-widest uppercase opacity-40">Business Information</p>
            <p className="text-xs text-slate-400">統一編號：84796559</p>
            <p className="text-[10px] text-slate-500 flex items-center gap-1.5 italic">
              <span className="text-[8px]">●</span> 專業誠信 · 技術領先 · 永續服務
            </p>
          </div>
        </div>
        
        {/* 中間：快速連結 */}
        <div className="hidden md:block md:pl-6">
          <h4 className="text-white font-bold mb-5 text-xs uppercase tracking-[0.2em]">快速連結</h4>
          <ul className="space-y-3.5 text-xs">
            <li>
              <Link href="/products" className="hover:text-blue-400 transition-colors flex items-center gap-2">
                <span className="text-[8px] opacity-30">▶</span> 所有設備清單
              </Link>
            </li>
            <li>
              <Link href="/ai-search" className="hover:text-blue-400 transition-colors flex items-center gap-2">
                <span className="text-[8px] opacity-30">▶</span> AI 智能設備搜尋
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-blue-400 transition-colors flex items-center gap-2">
                <span className="text-[8px] opacity-30">▶</span> 索取技術文件
              </Link>
            </li>
          </ul>
        </div>

        {/* 右側：聯絡資訊 */}
        <div className="space-y-5">
          <h4 className="text-white font-bold mb-5 text-xs uppercase tracking-[0.2em]">聯絡資訊</h4>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="text-[10px] opacity-40 font-mono w-6">TEL</span>
              <a href="tel:0227512786" className="text-xs text-slate-400 hover:text-white transition-colors">02-2751-2786</a>
            </div>
            
            <div className="flex items-start gap-4">
              <span className="text-[10px] opacity-40 font-mono w-6 pt-0.5">ADD</span>
              <span className="text-xs text-slate-400 leading-relaxed flex-1 tracking-tight">
                106 台北市大安區忠孝東路四段 169 號 12 樓之 4
              </span>
            </div>

            <div className="pt-2">
              <span className="px-2 py-1 border border-slate-700 rounded text-[9px] text-slate-500 uppercase tracking-wider">
                Mon - Fri 09:00 - 18:00
              </span>
            </div>
          </div>
        </div>
      </div>
      
      {/* 底部：版權宣告與隱私權 */}
      <div className="max-w-7xl mx-auto border-t border-slate-800/50 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6">
          <p className="text-[10px] tracking-[0.15em] opacity-30 uppercase select-none">
            © 2026 FENIX ENTERPRISE CO., LTD
            <span 
              onClick={handleSecretClick}
              className="cursor-default px-1" // 寬度極小，僅點擊最後一個點有效
            >
              .
            </span>
          </p>
          <Link href="/privacy" className="text-[10px] text-slate-500 hover:text-blue-400 transition-colors underline decoration-slate-800 underline-offset-4">
            隱私權保護政策 Privacy Policy
          </Link>
        </div>
        
        {/* 標語 */}
        <span className="text-[10px] text-slate-600 font-medium tracking-[0.3em] uppercase hidden md:block">
          Professional · Integrity · Engineering
        </span>
      </div>
    </footer>
  );
}