"use client";
import { useState, useEffect } from "react";
import { products, Product } from "../../data/products";
import Link from "next/link";
import { ChevronRight, Activity } from "lucide-react";

// 更新後的品牌色彩配置：確保 GELKO (鈦金灰) 與 ALL (純黑) 在視覺上有明確區隔
const brandConfigs: { [key: string]: { id: string, color: string, bg: string, btn: string, border: string } } = {
  "SKY SOFTGEL": { id: "sky-softgel", color: "text-blue-600", bg: "bg-blue-50", btn: "bg-blue-600", border: "border-blue-600" },
  "翰林航宇": { id: "hanlin-hangyu", color: "text-red-600", bg: "bg-red-50", btn: "bg-red-600", border: "border-red-600" },
  "蘇州瀚隆 (HALO)": { id: "halo-pharma", color: "text-emerald-600", bg: "bg-emerald-50", btn: "bg-emerald-600", border: "border-emerald-600" },
  "日本 FREUND": { id: "japan-freund", color: "text-orange-600", bg: "bg-orange-50", btn: "bg-orange-600", border: "border-orange-600" },
  "GELKO": { id: "gelko-seamless", color: "text-slate-700", bg: "bg-slate-100", btn: "bg-slate-700", border: "border-slate-700" }, // ✅ 鈦金灰
  "韓國 LEIDEX": { id: "korea-leidex", color: "text-pink-600", bg: "bg-pink-50", btn: "bg-pink-600", border: "border-pink-600" },
};

export default function ProductsPage() {
  const [activeBrand, setActiveBrand] = useState("ALL");
  const brands = ["ALL", ...Object.keys(brandConfigs)];

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

  // 1. 基礎過濾
  const filteredProducts = activeBrand === "ALL" 
    ? products 
    : products.filter(p => p.brand === activeBrand);

  // 2. 建立分組
  const groupedByBrand = filteredProducts.reduce((acc, product) => {
    if (!acc[product.brand]) acc[product.brand] = [];
    acc[product.brand].push(product);
    return acc;
  }, {} as Record<string, Product[]>);

  return (
    <div className="min-h-screen bg-slate-50 py-20 px-4 md:px-10">
      <div className="max-w-7xl mx-auto">
        
        {/* 標題區 */}
        <div className="text-center mb-16 pt-10">
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-6 tracking-tight">
            設備清單 <span className="text-blue-600 italic">PORTFOLIO</span>
          </h1>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg font-medium leading-relaxed">
            三十年電機電子 (EE) 專業背景，為您篩選日本、韓國、大陸最穩定的製藥與彩妝生產系統。
          </p>
        </div>

        {/* 品牌導航 Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-24 sticky top-24 z-30 py-4 bg-slate-50/80 backdrop-blur-md px-4 rounded-3xl">
          {brands.map(brand => {
            const config = brandConfigs[brand];
            const isAll = brand === "ALL";
            const isActive = activeBrand === brand;

            return (
              <button
                key={brand}
                onClick={() => setActiveBrand(brand)}
                className={`px-8 py-3 rounded-2xl font-black transition-all border-2 ${
                  isActive 
                    ? isAll 
                      ? "bg-black text-white border-black shadow-xl scale-105" // ✅ 全部品牌選取時為純黑
                      : `${config.btn} text-white border-transparent shadow-xl scale-105`
                    : "bg-white text-slate-400 border-transparent hover:border-slate-200"
                }`}
              >
                {isAll ? "全部品牌" : brand}
              </button>
            );
          })}
        </div>

        {/* 渲染各品牌區塊 */}
        {Object.entries(groupedByBrand).map(([brandName, items]) => {
          const config = brandConfigs[brandName] || { id: brandName, color: "text-slate-600", bg: "bg-slate-100", btn: "bg-slate-900" };
          
          return (
            <div key={brandName} id={config.id} className="mb-32 scroll-mt-40 animate-fadeIn">
              <div className="flex items-center gap-6 mb-12">
                <h2 className={`text-4xl md:text-5xl font-black tracking-tighter ${config.color}`}>{brandName}</h2>
                <div className="h-[3px] flex-grow rounded-full bg-slate-200"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {items.map((product) => {
                  const displaySeries = product.series || product.category;
                  const firstLetter = displaySeries.charAt(0).toUpperCase();

                  return (
                    <div key={product.id} className="group bg-white rounded-[3rem] shadow-sm overflow-hidden border border-slate-100 hover:shadow-2xl transition-all duration-500 flex flex-col">
                      
                      {/* 卡片頭部 */}
                      <div className={`h-48 ${config.bg} relative flex items-center justify-center p-8`}>
                        <span className={`absolute text-[12rem] font-black opacity-10 select-none -right-10 -bottom-10 ${config.color}`}>
                          {firstLetter}
                        </span>
                        <div className="z-10 text-center">
                           <div className={`text-[10px] font-black tracking-[0.3em] uppercase mb-3 ${config.color}`}>{product.category}</div>
                           <div className="text-slate-900 text-2xl font-black leading-tight">{displaySeries}</div>
                        </div>
                      </div>

                      {/* 卡片內容區 */}
                      <div className="p-8 flex-grow flex flex-col">
                        <div className="mb-4">
                          <h3 className="text-xl font-bold text-slate-800 mb-1">{product.name_zh}</h3>
                          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{product.name}</p>
                        </div>
                        
                        <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-2 font-medium">
                          {product.description}
                        </p>

                        {/* 規格摘要區塊 */}
                        {product.models && product.models.length > 0 && (
                          <div className={`mb-6 rounded-2xl ${config.bg} p-4 border border-white/50`}>
                            <div className="flex items-center gap-2 mb-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                              <Activity className="w-3 h-3 text-slate-400" /> 技術參數預覽
                            </div>
                            <div className="space-y-2">
                              {product.models.slice(0, 3).map((m, idx) => (
                                <div key={idx} className="flex justify-between text-[11px] border-b border-white/60 pb-1 last:border-0">
                                  <span className="font-bold text-slate-600">{m.name}</span>
                                  <span className={`${config.color} font-black font-mono uppercase`}>
                                    {m.speed || m.lane || m.capacity || m.range || "詳見規格"}
                                  </span>
                                </div>
                              ))}
                              {product.models.length > 3 && (
                                <div className="text-[9px] text-center text-slate-400 pt-1 font-bold">
                                  + 另有 {product.models.length - 3} 種配置
                                </div>
                              )}
                            </div>
                          </div>
                        )}

                        {/* 標籤 */}
                        <div className="flex flex-wrap gap-2 mb-8">
                          {product.tags.slice(0, 3).map(tag => (
                            <span key={tag} className="text-[9px] bg-slate-50 text-slate-400 px-2 py-1 rounded-md border border-slate-100 font-black italic">
                              #{tag}
                            </span>
                          ))}
                        </div>

                        <Link 
                          href={`/series/${product.id}`} 
                          className={`mt-auto block w-full text-center py-5 rounded-2xl font-black transition-all border-2 text-white ${config.btn} shadow-lg active:scale-95`}
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
        <div className="mt-20 text-center bg-slate-900 rounded-[4rem] p-12 md:p-20 text-white relative overflow-hidden shadow-3xl">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] -mr-64 -mt-64"></div>
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-black mb-8 leading-tight">需要專業的<br/>產線規劃建議？</h2>
            <p className="text-slate-400 mb-12 font-medium">從實驗室研發到量產規模，元堉技術顧問為您提供一對一設備選型諮詢。</p>
            <Link href="/contact" className="inline-flex items-center gap-4 bg-blue-600 text-white px-10 md:px-16 py-5 md:py-6 rounded-2xl font-black hover:bg-blue-500 transition-all text-lg md:text-xl shadow-2xl">
              連繫技術顧問 <ChevronRight className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}