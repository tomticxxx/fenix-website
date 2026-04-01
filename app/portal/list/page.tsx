'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

// 定義設備清單，增加檔案屬性模擬「檔案總管」感
const machineDocs = [
  { 
    id: 'GZP-460', 
    title: 'GZP-460 系列高速壓片機 投影片介紹', 
    pages: '20 Pages',
    size: '14.2 MB',
    type: 'TECHNICAL_SLIDES',
    path: '/portal/gzp460' 
  },
  { 
    id: 'ZPT-370', 
    title: 'ZPT-370 系列旋轉式壓片機 投影片介紹', 
    pages: '20 Pages',
    size: '11.5 MB',
    type: 'TECHNICAL_SLIDES',
    path: '/portal/zpt370' 
  }
];

export default function DocumentListPage() {
  const router = useRouter();

  const handleLogout = () => {
    sessionStorage.removeItem('fenix_auth');
    router.push('/portal');
  };

  return (
    <div className="min-h-screen bg-[#050505] text-blue-500 font-mono p-6 md:p-12 relative overflow-hidden">
      
      {/* 背景裝飾：極簡網格 */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{ 
          backgroundImage: 'linear-gradient(#4facfe 1px, transparent 1px), linear-gradient(90deg, #4facfe 1px, transparent 1px)', 
          backgroundSize: '30px 30px' 
        }} 
      />

      {/* 頂部標題區 */}
      <div className="max-w-6xl mx-auto mb-12 flex justify-between items-end border-b border-blue-900/30 pb-8 relative z-10">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-xl font-bold tracking-[0.2em] text-white flex items-center gap-3">
            <div className="w-2 h-6 bg-blue-600" />
            FENIX_CLOUD / FILE_EXPLORER
          </h1>
          <p className="text-[10px] text-blue-900 mt-2 tracking-[0.3em] font-bold uppercase">
            元堉企業有限公司 // 內部技術文獻管理系統
          </p>
        </motion.div>

        <button 
          onClick={handleLogout}
          className="text-[10px] px-4 py-1 border border-blue-900/50 hover:bg-red-950/20 hover:border-red-900 hover:text-red-500 transition-all font-bold tracking-widest uppercase"
        >
          [ Sign_Out ]
        </button>
      </div>

      {/* 類檔案總管清單 */}
      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* 表頭 */}
        <div className="grid grid-cols-12 px-6 py-3 text-[10px] font-black bg-blue-950/20 text-blue-900 uppercase tracking-[0.2em] border-b border-blue-900/20">
          <div className="col-span-7 md:col-span-8">File_Name</div>
          <div className="col-span-2 text-center hidden md:block">Pages</div>
          <div className="col-span-2 text-center hidden md:block">Size</div>
          <div className="col-span-5 md:col-span-2 text-right">Status</div>
        </div>

        {/* 檔案項目 */}
        <div className="mt-2 space-y-1">
          {machineDocs.map((doc, index) => (
            <motion.div
              key={doc.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Link href={doc.path}>
                <div className="grid grid-cols-12 items-center px-6 py-4 border-b border-blue-900/10 hover:bg-blue-600/5 group cursor-pointer transition-all">
                  
                  {/* 檔案名稱與圖示 */}
                  <div className="col-span-7 md:col-span-8 flex items-center gap-4">
                    <div className="w-8 h-8 flex items-center justify-center border border-blue-900/30 group-hover:border-blue-500 transition-colors">
                      <svg className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-300 group-hover:text-white transition-colors">
                        {doc.title}
                      </div>
                      <div className="text-[9px] text-blue-900 mt-1 uppercase">
                        ID: {doc.id} / TYPE: {doc.type}
                      </div>
                    </div>
                  </div>

                  {/* 頁數 */}
                  <div className="col-span-2 text-center text-xs text-blue-900 hidden md:block font-bold">
                    {doc.pages}
                  </div>

                  {/* 大小 */}
                  <div className="col-span-2 text-center text-xs text-blue-900 hidden md:block font-bold">
                    {doc.size}
                  </div>

                  {/* 動作按鈕 */}
                  <div className="col-span-5 md:col-span-2 text-right">
                    <span className="text-[10px] font-black px-2 py-1 border border-blue-900/30 text-blue-900 group-hover:text-blue-400 group-hover:border-blue-400 transition-all uppercase tracking-tighter">
                      Open_Access_
                    </span>
                  </div>

                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 底部狀態列 */}
      <div className="max-w-6xl mx-auto mt-20 pt-6 border-t border-blue-900/10 flex justify-between items-center opacity-40">
        <div className="text-[9px] font-bold tracking-widest uppercase">
          System_Core: Ready // Location: Taipei_Office
        </div>
        <div className="text-[9px] font-bold tracking-[0.4em] uppercase">
          © FENIX ENTERPRISE CO., LTD.
        </div>
      </div>

    </div>
  );
}