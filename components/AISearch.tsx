"use client";

import React, { useState, useEffect } from 'react';
import { products, Product } from '../data/products';
import Link from 'next/link';

// 1. 定義品牌色彩配置中心 (與產品頁保持一致)
const brandConfigs: { [key: string]: { color: string, bg: string, border: string, btn: string, shadow: string } } = {
  "SKY SOFTGEL": { 
    color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-600", 
    btn: "bg-blue-600", shadow: "shadow-blue-900/10" 
  },
  "翰林航宇": { 
    color: "text-red-600", bg: "bg-red-50", border: "border-red-600", 
    btn: "bg-red-600", shadow: "shadow-red-900/10" 
  },
  "蘇州瀚隆 (HALO)": { 
    color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-600", 
    btn: "bg-emerald-600", shadow: "shadow-emerald-900/10" 
  },
  "日本 FREUND": { 
    color: "text-orange-600", bg: "bg-orange-50", border: "border-orange-600", 
    btn: "bg-orange-600", shadow: "shadow-orange-900/10" 
  },
  "韓國 LEIDEX": { 
    color: "text-pink-600", bg: "bg-pink-50", border: "border-pink-600", 
    btn: "bg-pink-600", shadow: "shadow-pink-900/10" 
  },
};

export default function AISearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (query.trim().length > 0) {
      setIsSearching(true);
      const timer = setTimeout(() => {
        const lowerQuery = query.toLowerCase();
        const allProducts = (products as Product[]) || [];
        
        const filtered = allProducts.filter(p => {
          const nameZh = p.name_zh?.toLowerCase() || "";
          const nameEn = p.name?.toLowerCase() || "";
          const brand = p.brand?.toLowerCase() || "";
          const category = p.category?.toLowerCase() || "";
          const description = p.description?.toLowerCase() || "";

          const tagsMatch = p.tags?.some(tag => tag.toLowerCase().includes(lowerQuery)) || false;
          const featuresMatch = p.features?.some(f => f.toLowerCase().includes(lowerQuery)) || false;
          const appMatch = Array.isArray(p.application) 
            ? p.application.some(a => a.toLowerCase().includes(lowerQuery))
            : (p.application as string)?.toLowerCase()?.includes(lowerQuery) || false;

          const specsMatch = p.specs ? Object.values(p.specs).some(s => 
            String(s).toLowerCase().includes(lowerQuery)
          ) : false;

          return (
            nameZh.includes(lowerQuery) ||
            nameEn.includes(lowerQuery) ||
            brand.includes(lowerQuery) ||
            category.includes(lowerQuery) ||
            description.includes(lowerQuery) ||
            tagsMatch ||
            featuresMatch ||
            appMatch ||
            specsMatch
          );
        });
        
        setResults(filtered);
        setIsSearching(false);
      }, 300); 
      return () => clearTimeout(timer);
    } else {
      setResults([]);
      setIsSearching(false);
    }
  }, [query]);

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* 搜尋框區塊 */}
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-400 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
        <div className="relative">
          <input
            type="text"
            className="w-full px-6 py-5 bg-white rounded-xl border-none focus:ring-2 focus:ring-blue-500 shadow-inner text-lg outline-none pr-12 text-slate-900 font-medium"
            placeholder="搜尋設備關鍵字：如 SV-3000、壓片機、SKY..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <div className="absolute right-4 top-5 text-2xl flex items-center">
            {isSearching ? (
              <span className="flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
              </span>
            ) : query ? (
              <button onClick={() => setQuery('')} className="text-slate-300 hover:text-slate-500 text-sm bg-slate-100 p-1 rounded-full">✕</button>
            ) : <span className="text-slate-300">🔍</span>}
          </div>
        </div>
      </div>

      {/* 搜尋結果區 */}
      <div className="mt-8 space-y-4 min-h-[100px]">
        {isSearching && (
          <div className="flex items-center justify-center space-x-2 text-blue-600 font-bold py-10 animate-pulse">
            <span className="tracking-widest uppercase text-xs">Fenix AI 正在分析技術參數...</span>
          </div>
        )}

        {!isSearching && results.length > 0 && (
          <div className="animate-fadeInUp">
            <p className="text-[10px] font-black text-slate-400 mb-4 px-2 uppercase tracking-[0.2em]">
              MATCHED {results.length} TECHNICAL SOLUTIONS
            </p>
            <div className="space-y-4">
              {results.map((product) => {
                // 獲取該產品所屬品牌的顏色配置
                const config = brandConfigs[product.brand] || { 
                  color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-600", btn: "bg-blue-600" 
                };

                return (
                  <div 
                    key={product.id}
                    className={`p-6 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all hover:-translate-y-1 group border-l-4`}
                    style={{ borderLeftColor: config.border.includes('blue') ? '#2563eb' : 
                                             config.border.includes('red') ? '#dc2626' : 
                                             config.border.includes('emerald') ? '#10b981' : 
                                             config.border.includes('orange') ? '#f97316' : '#db2777' }}
                  >
                    <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`text-[10px] font-black text-white px-2 py-0.5 rounded tracking-tighter uppercase ${config.btn}`}>
                            {product.brand}
                          </span>
                          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{product.category}</span>
                        </div>
                        <h4 className="font-bold text-xl text-slate-800 transition-colors">
                          {product.name_zh}
                        </h4>
                        <p className="text-xs text-slate-400 font-medium italic mb-2 uppercase">{product.name}</p>
                        
                        <div className="flex flex-wrap gap-2 mt-4">
                          {product.tags?.slice(0, 6).map(tag => (
                            <span key={tag} className={`text-[9px] border px-2 py-0.5 rounded-md font-bold ${config.bg} ${config.color} ${config.border.replace('border-', 'border-')}/20`}>
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-row md:flex-col gap-2 w-full md:w-auto">
                        <Link 
                          href={`/series/${product.id}`} 
                          className={`flex-1 whitespace-nowrap text-xs font-black text-white px-6 py-3 rounded-xl transition-all text-center shadow-lg ${config.btn} hover:brightness-110 active:scale-95`}
                        >
                          進入系列
                        </Link>
                        <Link 
                          href="/contact" 
                          className="flex-1 whitespace-nowrap text-xs font-bold bg-white border border-slate-200 text-slate-700 px-6 py-3 rounded-xl hover:bg-slate-50 transition-all text-center"
                        >
                          詢價
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 無結果導引 */}
        {query && !isSearching && results.length === 0 && (
          <div className="text-center py-16 bg-white rounded-3xl border-2 border-dashed border-slate-100">
            <div className="text-4xl mb-4">🔬</div>
            <p className="text-slate-800 font-bold">未找到匹配設備</p>
            <p className="text-slate-400 text-sm mt-2">若需特殊規格，請直接聯繫元堉技術團隊</p>
            <Link href="/contact" className="inline-block mt-6 px-6 py-2 bg-blue-50 text-blue-600 rounded-full text-xs font-bold hover:bg-blue-600 hover:text-white transition-all">
              諮詢技術專家 →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}