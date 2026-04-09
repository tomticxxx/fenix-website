"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from "framer-motion";
import AISearch from "@/components/AISearch";
import { products, Product } from "../data/products"; 

import { 
  Settings, 
  ShieldCheck, 
  Zap, 
  ArrowRight, 
  Globe, 
  Users, 
  Clock, 
  CheckCircle2,
  Cpu,
  Microscope,
  Package,
  Layers
} from "lucide-react";

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });
import robotAnim from "../public/animations/hero-robot.json";

// 品牌配置配色 - RGS 修正為 Fuchsia 以區隔 SKY 藍色
const brandConfigs: { [key: string]: { color: string; bg: string; text: string } } = {
  "SKY SOFTGEL": { color: "bg-blue-600", bg: "bg-blue-50", text: "text-blue-600" },
  "蘇州瀚隆 (HALO)": { color: "bg-emerald-500", bg: "bg-emerald-50", text: "text-emerald-500" },
  "韓國 LEIDEX": { color: "bg-pink-500", bg: "bg-pink-50", text: "text-pink-500" },
  "日本 FREUND": { color: "bg-orange-500", bg: "bg-orange-50", text: "text-orange-500" },
  "中國指標品牌": { color: "bg-red-600", bg: "bg-red-50", text: "text-red-600" },
  // ✅ RGS 調整為 fuchsia (洋紫)，避免視覺上與 SKY 藍色接近
  "RGS (Italy)": { color: "bg-fuchsia-500", bg: "bg-fuchsia-50", text: "text-fuchsia-500" },
  "GELKO": { color: "bg-slate-700", bg: "bg-slate-100", text: "text-slate-700" }, 
};

export default function Home() {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);

  useEffect(() => {
    const shuffled = [...products].sort(() => 0.5 - Math.random());
    setFeaturedProducts(shuffled.slice(0, 5));
  }, []);

  const getTitleSizeClass = (text: string = "") => {
    if (text.length > 25) return "text-lg md:text-xl";
    if (text.length > 15) return "text-xl md:text-2xl";
    return "text-2xl md:text-3xl";
  };

  const getPrimarySpec = (product: Product) => {
    const s = product.specs;
    return s.speed || s.output || s.capacity || s.accuracy || s.force || "專業生產配置";
  };

  useEffect(() => {
    if (featuredProducts.length === 0) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredProducts.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [featuredProducts]);

  const brandsList = [
    { name: "SKY SOFTGEL", id: "sky-softgel", color: "text-blue-500", desc: "軟膠囊專利技術" },
    { name: "日本 FREUND", id: "japan-freund", color: "text-orange-500", desc: "精密造粒技術" },
    { name: "中國指標品牌", id: "china-brand", color: "text-red-600", desc: "高速壓片權威" },
    { name: "蘇州瀚隆", id: "halo-pharma", color: "text-emerald-500", desc: "±0.3mg 高精度檢重" },
    // ✅ 品牌牆同步改色
    { name: "RGS (Italy)", id: "rgs-vacuum", color: "text-fuchsia-500", desc: "真空輸送系統" },
    { name: "LEIDEX", id: "korea-leidex", color: "text-pink-500", desc: "彩妝精密充填" },
    { name: "GELKO", id: "gelko-seamless", color: "text-slate-700", desc: "無縫軟膠囊技術" },
  ];

  const stats = [
    { label: "技術傳承", value: "30+ Years", icon: <Clock className="w-5 h-5" /> },
    { label: "全球標竿品牌", value: "7 大核心", icon: <Globe className="w-5 h-5" /> }, 
    { label: "EE 工程背景", value: "專業驗收", icon: <Users className="w-5 h-5" /> },
    { label: "售後實績", value: "500+ Cases", icon: <Zap className="w-5 h-5" /> },
  ];

  const handleBrandClick = (brandId: string) => {
    router.push(`/products#${brandId}`);
  };

  return (
    <div className="min-h-screen bg-white selection:bg-blue-100 font-sans">
      {/* --- Hero Section --- */}
      <section className="bg-[#020617] py-28 md:py-40 px-6 relative overflow-hidden text-white border-b border-slate-800">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/10 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/3 animate-pulse"></div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
          <div className="text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-black tracking-widest uppercase mb-6">
              <ShieldCheck className="w-4 h-4" /> EE 工程背景三十載 · 技術把關
            </div>
            <h1 className="text-5xl md:text-8xl font-black mb-8 leading-[1.1] tracking-tighter">
              元堉企業<span className="text-white/30 text-5xl md:text-6xl font-medium ml-2">有限公司</span><br/>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400 font-extrabold">
                尖端技術代理
              </span>
            </h1>
            <p className="text-slate-400 text-lg md:text-xl mb-12 max-w-xl leading-relaxed font-medium">
              連結義、日、韓、中頂尖製藥與彩妝設備。我們憑藉電機電子 (EE) 專業背景，為您把關現場 SAT 驗收與維護細節。從真空輸送、造粒到全自動軟膠囊線，建構高精密的產線核心。
            </p>
            <div className="flex flex-wrap gap-5 mb-16">
              <Link href="/products" className="group bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-2xl font-black transition-all flex items-center gap-3 shadow-2xl shadow-blue-900/40">
                探索全系列設備清單 <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/contact" className="bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 text-white px-8 py-4 rounded-2xl font-black transition-all">
                技術諮詢 / 詢價
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-white/10 pt-10">
              {stats.map((s, i) => (
                <div key={i}>
                  <div className="text-blue-400 mb-1">{s.icon}</div>
                  <div className="text-2xl font-black tabular-nums">{s.value}</div>
                  <div className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="hidden lg:block relative group">
            <div className="relative w-full aspect-square rounded-[4rem] border border-white/10 bg-slate-900/40 backdrop-blur-3xl p-10 flex flex-col overflow-hidden">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                  <span className="text-[10px] font-black tracking-[0.2em] text-emerald-500 font-mono">LIVE_TECH_FEED</span>
                </div>
                <div className="flex gap-2">
                  <Cpu className="w-4 h-4 text-blue-500/50" /><Settings className="w-4 h-4 text-white/20 animate-spin-slow" />
                </div>
              </div>
              <div className="flex-grow flex items-center justify-center relative">
                <div className="w-full scale-110"><Lottie animationData={robotAnim} loop={true} /></div>
              </div>
              <div className="mt-4 relative h-44">
                <AnimatePresence mode="wait">
                  {featuredProducts.length > 0 && (
                    <motion.div
                      key={currentSlide}
                      initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}
                      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute inset-0 bg-white/5 backdrop-blur-xl p-7 rounded-[2.5rem] shadow-2xl border border-white/10 flex items-center gap-6 group/slide overflow-hidden"
                    >
                      <div className={`absolute -right-16 -bottom-16 w-48 h-48 rounded-full blur-[60px] opacity-30 transition-colors duration-1000 ${brandConfigs[featuredProducts[currentSlide].brand]?.color || 'bg-slate-600'}`}></div>
                      <div className="flex-grow relative z-10 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          <span className={`px-2.5 py-0.5 rounded text-[10px] font-black text-white uppercase tracking-widest ${brandConfigs[featuredProducts[currentSlide].brand]?.color || 'bg-slate-700'}`}>
                            {featuredProducts[currentSlide].brand.includes("翰林") ? "中國指標品牌" : featuredProducts[currentSlide].brand}
                          </span>
                        </div>
                        <h3 className={`font-black text-white italic tracking-tighter mb-1 leading-tight ${getTitleSizeClass(featuredProducts[currentSlide].series || featuredProducts[currentSlide].name)}`}>
                          {featuredProducts[currentSlide].series || featuredProducts[currentSlide].name}
                        </h3>
                        <p className="text-[11px] text-white/70 font-bold tracking-widest uppercase mb-4 truncate">{featuredProducts[currentSlide].name_zh}</p>
                        <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-xl border border-white/10 backdrop-blur-sm">
                          <Zap className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                          <span className="text-sm font-black text-white tabular-nums">{getPrimarySpec(featuredProducts[currentSlide])}</span>
                        </div>
                      </div>
                      {featuredProducts[currentSlide].image && (
                        <div className="w-32 h-32 bg-white rounded-3xl flex items-center justify-center shrink-0 overflow-hidden shadow-inner bg-gradient-to-br from-white to-slate-50 mr-8">
                          <img src={featuredProducts[currentSlide].image} alt={featuredProducts[currentSlide].name_zh} className="w-[85%] h-[85%] object-contain" />
                        </div>
                      )}
                      <Link href={`/series/${featuredProducts[currentSlide].id}`} className="absolute bottom-6 right-6 bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-all z-20 border-2 border-slate-900">
                        <ArrowRight className="w-6 h-6" />
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- AI 搜尋區 --- */}
      <section className="relative -mt-16 z-20 px-6">
        <div className="max-w-4xl mx-auto bg-white rounded-[2.5rem] shadow-2xl p-4 border border-slate-100">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="flex h-3 w-3 relative"><span className="animate-ping absolute h-full w-full rounded-full bg-blue-400 opacity-75"></span><span className="relative rounded-full h-3 w-3 bg-blue-500"></span></span>
              <p className="text-sm font-black text-slate-800 tracking-tight">FENIX AI 專業設備技術檢索</p>
            </div>
            <AISearch />
          </div>
        </div>
      </section>

      {/* --- 品牌牆 --- */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-center text-slate-400 text-xs font-black tracking-[0.4em] uppercase mb-16">Global Technical Partners / 國際技術合作夥伴</p>
          <div className="grid grid-cols-2 md:grid-cols-7 gap-4 items-center">
            {brandsList.map((b) => (
              <button key={b.name} onClick={() => handleBrandClick(b.id)} className="group text-center flex flex-col items-center">
                <div className={`text-lg md:text-xl font-black transition-all duration-500 group-hover:scale-110 mb-2 ${b.color} opacity-40 group-hover:opacity-100 whitespace-nowrap`}>
                  {b.name}
                </div>
                <div className="text-[8px] text-slate-500 font-bold opacity-0 group-hover:opacity-100 transition-all uppercase tracking-tighter">{b.desc}</div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* --- 核心技術領域 --- */}
      <section className="py-32 bg-slate-50 px-6 rounded-[4rem] md:rounded-[6rem] mx-2 md:mx-6 border border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">核心製程技術服務</h2>
            <p className="text-slate-500 text-lg font-medium leading-relaxed">我們不只提供機器，更提供基於電機電子 (EE) 專業的製程優化建議，確保每一台代理設備都能在現場發揮最大效能。</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                label: "壓丸與無縫滴丸", brandKey: "SKY SOFTGEL", icon: <Layers className="w-8 h-8" />, 
                desc: "整合 SKY SOFTGEL 全自動生產線與 GELKO 無縫滴丸技術，提供從原料配製到成品封裝的完整軟膠囊方案。", 
                items: ["SKY 全伺服軟膠囊機", "GELKO 無縫滴丸系統", "高良率精密模具開發"] 
              },
              { 
                label: "抽粉造粒與打錠", brandKey: "日本 FREUND", icon: <Settings className="w-8 h-8" />, 
                desc: "結合 RGS 真空輸送、FREUND 流體床造粒與中國指標品牌高速壓片技術，打造極致效率的粉體處理與錠劑生產線。", 
                items: ["RGS 工業真空輸送", "FREUND 高階造粒技術", "中國高速精密壓片機"] 
              },
              { 
                label: "高精度在線檢重", brandKey: "蘇州瀚隆 (HALO)", icon: <Microscope className="w-8 h-8" />, 
                desc: "專注於 ±0.3mg 極限精準度，透過 EE 工程技術優化訊噪比，確保製藥生產符合最嚴苛的數據完整性規範。", 
                items: ["±0.3mg 高動態檢重", "符合數據完整性要求", "高速自動剔除邏輯控制"] 
              },
              { 
                label: "彩妝精密充填", brandKey: "韓國 LEIDEX", icon: <Zap className="w-8 h-8" />, 
                desc: "引進韓國 LEIDEX 彩妝製程設備，涵蓋口紅充填、粉餅壓製等精密工藝，實現自動化與美學製程的完美結合。", 
                items: ["自動口紅充填生產線", "精密粉餅壓製系統", "多色共擠充填技術"] 
              },
            ].map((expert) => {
              const config = brandConfigs[expert.brandKey] || { color: "bg-slate-700" };
              return (
                <div key={expert.label} className="bg-white p-10 rounded-[3rem] shadow-sm hover:shadow-2xl transition-all border border-slate-100 group flex flex-col">
                  <div className={`w-14 h-14 ${config.color} rounded-2xl flex items-center justify-center text-white mb-6 group-hover:rotate-12 transition-all`}>{expert.icon}</div>
                  <h3 className="text-xl font-black text-slate-900 mb-4">{expert.label}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-6 font-medium italic">{expert.desc}</p>
                  <div className="space-y-3 mt-auto pt-6 border-t border-slate-100">
                    {expert.items.map(item => (
                      <div key={item} className="flex items-center gap-2 text-xs font-bold text-slate-700"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> {item}</div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* --- CTA Section --- */}
      <section className="py-24 px-6 relative">
        <div className="max-w-6xl mx-auto bg-slate-900 rounded-[4rem] p-16 md:p-24 text-white text-center relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-black mb-8">從工程維度優化產線</h2>
            <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto font-medium mb-12">元堉技術團隊提供從選型到現場驗收的全程支援。無論是粉體輸送或精密彩妝充填，我們與您並肩解決製程難題。</p>
            <div className="flex flex-col md:flex-row justify-center items-center gap-8">
              <div className="text-left">
                <p className="text-slate-500 text-xs font-black uppercase tracking-widest mb-1">Technical Support</p>
                <p className="text-3xl font-black tabular-nums">02-2751-2786</p>
              </div>
              <Link href="/contact" className="bg-blue-600 text-white px-12 py-5 rounded-[2.5rem] font-black hover:bg-blue-500 transition-all shadow-xl">立即取得技術建議</Link>
            </div>
          </div>
        </div>
      </section>

      <style jsx global>{`
        .animate-spin-slow { animation: spin 20s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}