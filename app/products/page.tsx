"use client";
import { useState, useEffect } from "react";
import { products, Product } from "../../data/products";
import Link from "next/link";
import { ChevronRight, Activity } from "lucide-react";

/**
 * ✅ 品牌配置：已對齊 RGS (Italy) 與 中國指標品牌
 */
const brandConfigs: { [key: string]: { id: string, name: string, color: string, bg: string, btn: string } } = {
  "SKY SOFTGEL": { id: "sky-softgel", name: "SKY SOFTGEL", color: "text-blue-600", bg: "bg-blue-50", btn: "bg-blue-600" },
  "日本 FREUND": { id: "japan-freund", name: "日本 FREUND", color: "text-orange-600", bg: "bg-orange-50", btn: "bg-orange-600" },
  "中國指標品牌": { id: "china-brand", name: "中國指標品牌", color: "text-red-600", bg: "bg-red-50", btn: "bg-red-600" },
  "蘇州瀚隆 (HALO)": { id: "halo-pharma", name: "蘇州瀚隆", color: "text-emerald-600", bg: "bg-emerald-50", btn: "bg-emerald-600" },
  "RGS (Italy)": { id: "rgs-vacuum", name: "RGS (Italy)", color: "text-fuchsia-500", bg: "bg-fuchsia-50", btn: "bg-fuchsia-500" },
  "韓國 LEIDEX": { id: "korea-leidex", name: "LEIDEX", color: "text-pink-600", bg: "bg-pink-50", btn: "bg-pink-600" },
  "GELKO": { id: "gelko-seamless", name: "GELKO", color: "text-slate-700", bg: "bg-slate-100", btn: "bg-slate-700" },
};

export default function ProductsPage() {
  const [activeBrand, setActiveBrand] = useState("ALL");
  const brandKeys = Object.keys(brandConfigs);
  const brandsMenu = ["ALL", ...brandKeys];

  // 錨點捲動處理
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 500);
      }
    }
  }, []);

  // 1. 基礎過濾與分組
  const filteredProducts = activeBrand === "ALL" 
    ? products 
    : products.filter(p => p.brand === activeBrand);

  const groupedByBrand = filteredProducts.reduce((acc, product) => {
    if (!acc[product.brand]) acc[product.brand] = [];
    acc[product.brand].push(product);
    return acc;
  }, {} as Record<string, Product[]>);

  // 2. 依照 brandConfigs 定義的順序決定渲染列表
  const displayBrands = activeBrand === "ALL" 
    ? brandKeys.filter(key => groupedByBrand[key]) 
    : [activeBrand];

  return (
    <div className="min-h-screen bg-slate-50 py-20 px-4 md:px-10">
      <div className="max-w-7xl mx-auto">
        
        {/* 標題區 */}
        <div className="text-center mb-16 pt-10">
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-6 tracking-tight">
            設備清單 <span className="text-blue-600 italic">PORTFOLIO</span>
          </h1>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg font-medium">
            三十年電機電子 (EE) 專業背景，嚴選全球最穩定生產系統。
          </p>
        </div>

        {/* 品牌導航 Tabs */}
        <div className="sticky top-24 z-30 mb-20 overflow-hidden">
          <div className="flex flex-nowrap overflow-x-auto justify-start md:justify-center gap-2 py-4 bg-slate-50/80 backdrop-blur-md px-2 rounded-3xl scrollbar-hide no-scrollbar">
            {brandsMenu.map(brandKey => {
              const config = brandConfigs[brandKey];
              const isAll = brandKey === "ALL";
              const isActive = activeBrand === brandKey;
              const displayName = isAll ? "全部" : (config?.name || brandKey);

              return (
                <button
                  key={brandKey}
                  onClick={() => setActiveBrand(brandKey)}
                  className={`whitespace-nowrap px-4 py-2.5 rounded-xl font-black text-xs md:text-sm transition-all border-2 shrink-0 ${
                    isActive 
                      ? isAll 
                        ? "bg-black text-white border-black shadow-lg scale-105"
                        : `${config.btn} text-white border-transparent shadow-lg scale-105`
                      : "bg-white text-slate-400 border-transparent hover:border-slate-200"
                  }`}
                >
                  {displayName}
                </button>
              );
            })}
          </div>
        </div>

        {/* 渲染各品牌區塊 */}
        {displayBrands.map((brandName) => {
          const items = groupedByBrand[brandName];
          if (!items) return null;
          const config = brandConfigs[brandName] || { id: brandName, name: brandName, color: "text-slate-600", bg: "bg-slate-100", btn: "bg-slate-900" };
          
          return (
            <div key={brandName} id={config.id} className="mb-32 scroll-mt-40 animate-fadeIn">
              <div className="flex items-center gap-6 mb-12">
                <h2 className={`text-3xl md:text-5xl font-black tracking-tighter ${config.color}`}>
                  {config.name}
                </h2>
                <div className="h-[2px] flex-grow rounded-full bg-slate-200"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {items.map((product) => {
                  const displaySeries = product.series || product.category;
                  const firstLetter = displaySeries.charAt(0).toUpperCase();

                  return (
                    <div key={product.id} className="group bg-white rounded-[2.5rem] shadow-sm overflow-hidden border border-slate-100 hover:shadow-2xl transition-all duration-500 flex flex-col">
                      
                      {/* 卡片頭部 */}
                      <div className={`h-40 ${config.bg} relative flex items-center justify-center p-6`}>
                        <span className={`absolute text-8xl font-black opacity-10 select-none -right-4 -bottom-4 ${config.color}`}>
                          {firstLetter}
                        </span>
                        <div className="z-10 text-center">
                           <div className={`text-[9px] font-black tracking-widest uppercase mb-2 ${config.color}`}>{product.category}</div>
                           <div className="text-slate-900 text-xl font-black leading-tight">{displaySeries}</div>
                        </div>
                      </div>

                      {/* 卡片內容區 */}
                      <div className="p-7 flex-grow flex flex-col">
                        <div className="mb-4">
                          <h3 className="text-lg font-bold text-slate-800">{product.name_zh}</h3>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{product.name}</p>
                        </div>
                        
                        <p className="text-slate-500 text-xs leading-relaxed mb-6 line-clamp-2 font-medium">
                          {product.description}
                        </p>

                        {/* 規格摘要：✅ 已修正欄位顯示邏輯，支援 RGS 的 gas_vol */}
                        {product.models && product.models.length > 0 && (
                          <div className={`mb-5 rounded-xl ${config.bg} p-3 border border-white/50`}>
                            <div className="flex items-center gap-2 mb-2 text-[9px] font-black text-slate-400 uppercase tracking-widest">
                              <Activity className="w-3 h-3" /> 技術參數預覽
                            </div>
                            <div className="space-y-1.5">
                              {product.models.slice(0, 2).map((m, idx) => (
                                <div key={idx} className="flex justify-between text-[10px] border-b border-white/60 pb-1 last:border-0">
                                  <span className="font-bold text-slate-600">{m.name}</span>
                                  <span className={`${config.color} font-black font-mono`}>
                                    {/* 優先顯示處理能力，次之顯示流量，再次之顯示馬力 */}
                                    {m.capacity || m.gas_vol || m.power || m.speed || "規格詳詢"}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* 標籤 */}
                        <div className="flex flex-wrap gap-1.5 mb-6">
                          {product.tags.slice(0, 3).map(tag => (
                            <span key={tag} className="text-[8px] bg-slate-50 text-slate-400 px-2 py-0.5 rounded border border-slate-100 font-bold italic">
                              #{tag}
                            </span>
                          ))}
                        </div>

                        <Link 
                          href={`/series/${product.id}`} 
                          className={`mt-auto block w-full text-center py-4 rounded-xl font-black text-sm transition-all border-2 text-white ${config.btn} shadow-md active:scale-95`}
                        >
                          詳細技術規格
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}

        {/* 底部聯繫 */}
        <div className="mt-20 text-center bg-slate-900 rounded-[3rem] p-10 md:p-16 text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-600/10 blur-[100px] -mr-40 -mt-40"></div>
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-black mb-6">需要專業產線規劃建議？</h2>
            <p className="text-slate-400 mb-10 text-sm">元堉技術顧問提供一對一設備選型諮詢，協助您對接全球尖端產線。</p>
            <Link href="/contact" className="inline-flex items-center gap-3 bg-blue-600 text-white px-10 py-4 rounded-xl font-black hover:bg-blue-500 transition-all shadow-xl">
              連繫技術顧問 <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}