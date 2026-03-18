"use client";

import React, { useState, useEffect } from 'react';
import { products, Product } from '../data/products';
import Link from 'next/link';

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

  // 強化搜尋邏輯：移除符號，實現 SV-600 = SV600
  const normalize = (str: string) => str.toLowerCase().replace(/[^a-z0-9\u4e00-\u9fa5]/g, '');

  useEffect(() => {
    if (query.trim().length > 0) {
      setIsSearching(true);
      const timer = setTimeout(() => {
        const normalizedQuery = normalize(query);
        const allProducts = (products as Product[]) || [];
        
        const filtered = allProducts.filter(p => {
          // 1. 正規化基礎欄位
          const nameZh = normalize(p.name_zh || "");
          const nameEn = normalize(p.name || "");
          const brand = normalize(p.brand || "");
          const category = normalize(p.category || "");
          const description = p.description?.toLowerCase() || "";
          const series = p.series ? normalize(p.series) : "";
          
          // 2. 處理新增的 searchKeywords 欄位
          const keywordsMatch = p.searchKeywords ? normalize(p.searchKeywords).includes(normalizedQuery) : false;

          // 3. 標籤比對 (在 data/products.ts 中我們已經把 models 整合進 tags 了)
          const tagsMatch = p.tags?.some(tag => normalize(tag).includes(normalizedQuery)) || false;
          
          // 4. 其他細節比對
          const featuresMatch = p.features?.some(f => normalize(f).includes(normalizedQuery)) || false;
          const appMatch = Array.isArray(p.application) 
            ? p.application.some(a => normalize(a).includes(normalizedQuery))
            : normalize(p.application || "").includes(normalizedQuery);

          const specsMatch = p.specs ? Object.values(p.specs).some(s => 
            normalize(String(s)).includes(normalizedQuery)
          ) : false;

          return (
            nameZh.includes(normalizedQuery) ||
            nameEn.includes(normalizedQuery) ||
            brand.includes(normalizedQuery) ||
            category.includes(normalizedQuery) ||
            series.includes(normalizedQuery) ||
            description.includes(query.toLowerCase()) ||
            tagsMatch ||
            featuresMatch ||
            appMatch ||
            specsMatch ||
            keywordsMatch // 👈 支援您新加的關鍵字欄位
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
            placeholder="搜尋設備：如 SV-600、打錠機、FREUND..."
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
              <button onClick={() => setQuery('')} className="text-slate-300 hover:text-slate-500 text-sm bg-slate-100 p-1 rounded-full w-6 h-6 flex items-center justify-center">✕</button>
            ) : <span className="text-slate-300">🔍</span>}
          </div>
        </div>
      </div>

      {/* 搜尋結果區 */}
      <div className="mt-8 space-y-4 min-h-[100px]">
        {isSearching && (
          <div className="flex items-center justify-center space-x-2 text-blue-600 font-bold py-10 animate-pulse">
            <span className="tracking-widest uppercase text-xs">Fenix AI 正在分析技術資料...</span>
          </div>
        )}

        {!isSearching && results.length > 0 && (
          <div className="animate-fadeInUp">
            <p className="text-[10px] font-black text-slate-400 mb-4 px-2 uppercase tracking-[0.2em]">
              找到 {results.length} 項技術方案
            </p>
            <div className="space-y-4">
              {results.map((product) => {
                const config = brandConfigs[product.brand] || { 
                  color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-600", btn: "bg-blue-600" 
                };

                const getBorderColor = () => {
                  if (config.border.includes('blue')) return '#2563eb';
                  if (config.border.includes('red')) return '#dc2626';
                  if (config.border.includes('emerald')) return '#10b981';
                  if (config.border.includes('orange')) return '#f97316';
                  if (config.border.includes('pink')) return '#db2777';
                  return '#2563eb';
                };

                return (
                  <div 
                    key={product.id}
                    className={`p-6 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all hover:-translate-y-1 group border-l-4`}
                    style={{ borderLeftColor: getBorderColor() }}
                  >
                    <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`text-[10px] font-black text-white px-2 py-0.5 rounded tracking-tighter uppercase ${config.btn}`}>
                            {product.brand}
                          </span>
                          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{product.category}</span>
                        </div>
                        <h4 className="font-bold text-xl text-slate-800">
                          {product.name_zh}
                        </h4>
                        <p className="text-xs text-slate-400 font-medium italic mb-2 uppercase">{product.name}</p>
                        
                        <div className="flex flex-wrap gap-2 mt-4">
                          {/* 顯示前 6 個標籤，讓搜尋結果看起來豐富 */}
                          {product.tags?.slice(0, 6).map(tag => (
                            <span key={tag} className={`text-[9px] border px-2 py-0.5 rounded-md font-bold ${config.bg} ${config.color} border-current opacity-75`}>
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

        {query && !isSearching && results.length === 0 && (
          <div className="text-center py-16 bg-white rounded-3xl border-2 border-dashed border-slate-100">
            <div className="text-4xl mb-4">🔬</div>
            <p className="text-slate-800 font-bold">未找到匹配設備</p>
            <p className="text-slate-400 text-sm mt-2">請嘗試搜尋型號、品牌或製程關鍵字（如：膜衣、打錠）</p>
            <Link href="/contact" className="inline-block mt-6 px-6 py-2 bg-blue-50 text-blue-600 rounded-full text-xs font-bold hover:bg-blue-600 hover:text-white transition-all">
              聯繫技術顧問 →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}