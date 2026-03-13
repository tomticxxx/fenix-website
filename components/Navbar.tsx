"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  // 控制手機版選單開關的狀態
  const [isOpen, setIsOpen] = useState(false);

  // 點擊選項後自動關閉選單
  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <nav className="bg-white border-b sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-2 flex justify-between items-center">
          
          {/* 左側 LOGO 區 */}
          <Link href="/" className="flex items-center active:scale-95 transition-transform group" onClick={closeMenu}>
            <div className="relative h-14 w-56"> 
              <Image 
                src="/logo.png" 
                alt="元堉企業 FENIX" 
                fill
                className="object-contain object-left" 
                priority
              />
            </div>
          </Link>
          
          {/* 電腦版選單區 */}
          <div className="hidden md:flex space-x-10 items-center font-bold text-slate-600">
            <Link href="/" className="hover:text-blue-600 transition-colors text-sm">
              首頁
            </Link>
            <Link href="/products" className="hover:text-blue-600 transition-colors text-sm">
              產品清單
            </Link>
            <Link 
              href="/ai-search" 
              className="text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg text-sm border border-blue-100 hover:bg-blue-600 hover:text-white transition-all shadow-sm"
            >
              AI 設備搜尋
            </Link>
            <Link href="/contact" className="hover:text-blue-600 transition-colors text-sm">
              聯絡我們
            </Link>
            
            {/* 電腦版導航列的 LINE 按鈕 */}
            <a 
              href="https://line.me/ti/p/~tomticxxx" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-[#06C755] text-white px-5 py-2.5 rounded-full text-sm font-bold flex items-center gap-2 hover:opacity-90 transition-all shadow-md active:scale-95"
            >
              <span className="text-lg">💬</span> LINE 詢問
            </a>
          </div>

          {/* 手機版選單開關按鈕 */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-500 p-2 text-3xl focus:outline-none transition-colors hover:text-blue-600"
            >
              {isOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {/* 手機版收納選單展開區 */}
        {isOpen && (
          <div className="md:hidden bg-white border-t border-slate-100 shadow-xl animate-in slide-in-from-top duration-300">
            <div className="px-6 py-8 flex flex-col space-y-6 font-bold text-slate-700">
              <Link href="/" onClick={closeMenu} className="text-lg hover:text-blue-600 border-b border-slate-50 pb-2">
                首頁
              </Link>
              <Link href="/products" onClick={closeMenu} className="text-lg hover:text-blue-600 border-b border-slate-50 pb-2">
                產品清單
              </Link>
              <Link href="/ai-search" onClick={closeMenu} className="text-lg text-blue-600 bg-blue-50 p-3 rounded-xl flex justify-between items-center border border-blue-100">
                AI 設備搜尋 <span>🔍</span>
              </Link>
              <Link href="/contact" onClick={closeMenu} className="text-lg hover:text-blue-600 border-b border-slate-50 pb-2">
                聯絡我們
              </Link>
              
              <a 
                href="https://line.me/ti/p/~tomticxxx" 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={closeMenu}
                className="bg-[#06C755] text-white p-4 rounded-2xl text-center text-lg font-bold shadow-lg flex items-center justify-center gap-3 active:scale-95 transition-transform"
              >
                <span className="text-2xl">💬</span> 立即 LINE 詢問
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* --- 全域 LINE 懸浮按鈕 (Floating Button) --- */}
      <div className="fixed bottom-8 right-6 z-[60] flex flex-col items-end gap-3 group">
        {/* 懸浮對話提示（滑鼠移上去時顯示） */}
        <div className="bg-white text-slate-700 px-4 py-2 rounded-xl shadow-2xl border border-slate-100 text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity mb-2 hidden md:block">
           有設備需求？直接問我 👨‍🔧
        </div>
        
        <a 
          href="https://line.me/ti/p/~tomticxxx" 
          target="_blank" 
          rel="noopener noreferrer"
          className="relative flex items-center justify-center w-16 h-16 bg-[#06C755] rounded-full shadow-[0_8px_30px_rgb(6,199,85,0.4)] hover:scale-110 transition-transform active:scale-90 overflow-visible"
        >
          {/* 外圈動畫效果 */}
          <span className="absolute inset-0 rounded-full bg-[#06C755] animate-ping opacity-20"></span>
          
          {/* LINE 圖示文字 */}
          <span className="text-3xl text-white">💬</span>
          
          {/* 小紅點提示 */}
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500"></span>
          </span>
        </a>
      </div>
    </>
  );
}