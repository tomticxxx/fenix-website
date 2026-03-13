"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  // 控制手機版選單開關的狀態
  const [isOpen, setIsOpen] = useState(false);

  // 點擊選項後自動關閉選單，提升使用者體驗
  const closeMenu = () => setIsOpen(false);

  return (
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
        
        {/* 電腦版選單區 (md:flex 表示桌面端顯示，預設隱藏) */}
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
          
          <a 
            href="https://line.me/ti/p/~tomticxxx" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-[#06C755] text-white px-5 py-2.5 rounded-full text-sm font-bold flex items-center gap-2 hover:opacity-90 transition-all shadow-md active:scale-95"
          >
            <span className="text-lg">💬</span> LINE 詢問
          </a>
        </div>

        {/* 手機版按鈕區 (md:hidden 表示桌面端隱藏) */}
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
            <Link href="/ai-search" onClick={closeMenu} className="text-lg text-blue-600 bg-blue-50 p-3 rounded-xl flex justify-between items-center">
              AI 設備搜尋 <span>🔍</span>
            </Link>
            <Link href="/contact" onClick={closeMenu} className="text-lg hover:text-blue-600 border-b border-slate-50 pb-2">
              聯絡我們
            </Link>
            
            {/* 手機版 LINE 按鈕 - 改為大色塊點擊更方便 */}
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
  );
}