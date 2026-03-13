"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from "framer-motion";
import AISearch from "@/components/AISearch";
// 確保已安裝：npm install lucide-react lottie-react framer-motion
import { 
  Settings, 
  ShieldCheck, 
  Zap, 
  ArrowRight, 
  Globe, 
  Users, 
  Clock, 
  CheckCircle2,
  Activity,
  BarChart3,
  Cpu
} from "lucide-react";

// 動態匯入 Lottie
const Lottie = dynamic(() => import('lottie-react'), { ssr: false });
import robotAnim from "../public/animations/hero-robot.json";

// 1. 定義品牌配置
const brandConfigs: { [key: string]: { color: string; bg: string } } = {
  "SKY SOFTGEL": { color: "bg-blue-600", bg: "bg-blue-50" },
  "蘇州瀚隆 (HALO)": { color: "bg-emerald-500", bg: "bg-emerald-50" },
  "韓國 LEIDEX": { color: "bg-pink-500", bg: "bg-pink-50" },
  "FREUND": { color: "bg-orange-500", bg: "bg-orange-50" },
  "翰林航宇": { color: "bg-red-600", bg: "bg-red-50" },
};

// 輪播產品數據清單
const productSlides = [
  { model: "SKY SV-3000", type: "Servo Softgel System", value: "207,360", unit: "ea / hr", color: "from-blue-600 to-indigo-700" },
  { model: "HALO CMC-2", type: "High Precision Checkweigher", value: "±0.3", unit: "mg Precision", color: "from-emerald-600 to-teal-700" },
  { model: "FREUND Granulator", type: "Fluid Bed System", value: "99.9", unit: "% Yield", color: "from-orange-600 to-red-700" },
  { model: "LEIDEX Lipstick", type: "Auto Filling Line", value: "2,400", unit: "pcs / hr", color: "from-pink-600 to-rose-700" },
];

export default function Home() {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);

  // 自動輪播邏輯 (每 3.5 秒)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % productSlides.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  const brands = [
    { name: "SKY SOFTGEL", id: "sky-softgel", color: "text-blue-500", desc: "軟膠囊專利技術" },
    { name: "FREUND", id: "japan-freund", color: "text-orange-500", desc: "日本造粒領先者" },
    { name: "翰林航宇", id: "hanlin-hangyu", color: "text-red-500", desc: "高速壓片權威" },
    { name: "蘇州瀚隆", id: "halo-pharma", color: "text-emerald-500", desc: "±0.3mg 高精度檢重" },
    { name: "LEIDEX", id: "korea-leidex", color: "text-pink-500", desc: "彩妝精密充填" },
  ];

  const stats = [
    { label: "專業代理", value: "30+ Years", icon: <Clock className="w-5 h-5" /> },
    { label: "精選品牌", value: "5 大核心", icon: <Globe className="w-5 h-5" /> }, 
    { label: "EE專業團隊", value: "技術底蘊", icon: <Users className="w-5 h-5" /> },
    { label: "售後維護", value: "500+", icon: <Zap className="w-5 h-5" /> },
  ];

  const handleBrandClick = (brandId: string) => {
    router.push(`/products#${brandId}`);
  };

  return (
    <div className="min-h-screen bg-white selection:bg-blue-100">
      {/* --- 英雄區 (Hero Section) --- */}
      <section className="bg-[#020617] py-28 md:py-40 px-6 relative overflow-hidden text-white">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/10 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/3 animate-pulse"></div>
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '50px 50px' }}></div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
          <div className="text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-black tracking-widest uppercase mb-6">
              <ShieldCheck className="w-4 h-4" /> EE 工程背景三十載 · 專業設備代理
            </div>
            
            <h1 className="text-5xl md:text-8xl font-black mb-8 leading-[1.1] tracking-tighter">
              元堉企業<span className="text-white/30 text-5xl md:text-6xl font-medium ml-2">有限公司</span><br/>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400">
                尖端技術代理
              </span>
            </h1>
            
            <p className="text-slate-400 text-lg md:text-xl mb-12 max-w-xl leading-relaxed font-medium">
              連結日本、韓國、大陸頂尖製藥與彩妝設備廠。我們深具電機電子 (EE) 專業背景，為您建構高精密、高產能的產線核心。
            </p>

            <div className="flex flex-wrap gap-5 mb-16">
              <Link href="/products" className="group bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-2xl font-black transition-all flex items-center gap-3 shadow-2xl shadow-blue-900/40">
                探索全設備清單 <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/contact" className="bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 text-white px-8 py-4 rounded-2xl font-black transition-all">
                技術諮詢 / 詢價
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-white/10 pt-10">
              {stats.map((s, i) => (
                <div key={i}>
                  <div className="text-blue-400 mb-1">{s.icon}</div>
                  <div className="text-2xl font-black">{s.value}</div>
                  <div className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* 右側：機器人與動態輪播卡片 */}
          <div className="hidden lg:block relative group">
            <div className="relative w-full aspect-square rounded-[4rem] border border-white/10 bg-slate-900/40 backdrop-blur-3xl p-10 flex flex-col overflow-hidden">
              
              {/* 頂部系統狀態 */}
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                  <span className="text-[10px] font-black tracking-[0.2em] text-emerald-500 font-mono">LIVE_DATA_FEED</span>
                </div>
                <div className="flex gap-2">
                  <Cpu className="w-4 h-4 text-blue-500/50" />
                  <Settings className="w-4 h-4 text-white/20 animate-spin-slow" />
                </div>
              </div>

              {/* 中間：Lottie 機器人動畫 */}
              <div className="flex-grow flex items-center justify-center relative">
                <div className="w-full scale-110">
                  <Lottie animationData={robotAnim} loop={true} />
                </div>
                <div className="absolute w-64 h-64 bg-blue-600/10 blur-[80px] rounded-full -z-10" />
              </div>

              {/* 底部：自動輪播數據卡片 */}
              <div className="mt-4 relative h-40">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className={`absolute inset-0 bg-gradient-to-br ${productSlides[currentSlide].color} p-8 rounded-[2.5rem] shadow-2xl border border-white/10`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[9px] font-bold text-white/60 tracking-[0.2em] uppercase">Current Monitoring</span>
                        </div>
                        <h3 className="text-2xl font-black text-white italic tracking-tighter">{productSlides[currentSlide].model}</h3>
                        <p className="text-[10px] text-white/70 font-bold tracking-widest uppercase">{productSlides[currentSlide].type}</p>
                      </div>
                      <BarChart3 className="w-6 h-6 text-white/30" />
                    </div>
                    <div className="mt-4 flex items-baseline gap-2">
                      <span className="text-4xl font-black text-white tabular-nums">{productSlides[currentSlide].value}</span>
                      <span className="text-xs font-bold text-white/60">{productSlides[currentSlide].unit}</span>
                    </div>
                  </motion.div>
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
              <span className="flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
              </span>
              <p className="text-sm font-black text-slate-800 tracking-tight">FENIX AI 專業設備檢索 (支援型號穿透)</p>
            </div>
            <AISearch />
          </div>
        </div>
      </section>

      {/* --- 品牌牆區 --- */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-center text-slate-400 text-xs font-black tracking-[0.4em] uppercase mb-16">
            Global Strategic Partners / 國際戰略夥伴
          </p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-12 items-center">
            {brands.map((b) => (
              <button key={b.name} onClick={() => handleBrandClick(b.id)} className="group text-center flex flex-col items-center">
                <div className={`text-2xl font-black transition-all duration-500 group-hover:scale-110 mb-2 ${b.color} opacity-40 group-hover:opacity-100`}>
                  {b.name}
                </div>
                <div className="text-[10px] text-slate-500 font-bold mt-2 opacity-0 group-hover:opacity-100 transition-all uppercase tracking-tighter">
                  {b.desc} →
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* --- 核心領域 --- */}
      <section className="py-32 bg-slate-50 px-6 rounded-[4rem] md:rounded-[6rem] mx-2 md:mx-6 border border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">全方位產線解決方案</h2>
            <p className="text-slate-500 text-lg font-medium leading-relaxed">
              憑藉電機電子專業背景，我們提供從研發到量產的高階設備導入與 SAT 驗收服務。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { label: "製藥生產設備", brandKey: "SKY SOFTGEL", icon: "💊", desc: "Freund 造粒、翰林壓片、SKY 軟膠囊，符合 cGMP 規範。", items: ["全伺服軟膠囊封裝", "流體床造粒乾燥", "高速旋轉壓片機"] },
              { label: "品質管控 (Halo Pharma)", brandKey: "蘇州瀚隆 (HALO)", icon: "⚖️", desc: "蘇州瀚隆檢重機，動態精度達 ±0.3mg，實現 100% 逐粒檢測。", items: ["±0.3mg 高精度檢重", "符合 21 CFR Part 11", "高速在線自動剔除"] },
              { label: "精密彩妝 (Leidex)", brandKey: "韓國 LEIDEX", icon: "💄", desc: "韓國精密彩妝設備，專為口紅與粉餅設計的自動化方案。", items: ["自動口紅充填線", "專利矽膠模技術", "精密真空壓粉"] },
            ].map((expert) => {
              const config = brandConfigs[expert.brandKey] || { color: "bg-slate-600", bg: "bg-slate-50" };
              return (
                <div key={expert.label} className="bg-white p-12 rounded-[3.5rem] shadow-sm hover:shadow-2xl transition-all border border-slate-100 group flex flex-col">
                  <div className={`w-16 h-16 ${config.color} rounded-3xl flex items-center justify-center text-white text-3xl mb-8 group-hover:rotate-12 transition-all`}>
                    {expert.icon}
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 mb-4">{expert.label}</h3>
                  <p className="text-slate-500 leading-relaxed mb-8 font-medium italic">{expert.desc}</p>
                  <div className="space-y-3 mt-auto pt-6 border-t border-slate-100">
                    {expert.items.map(item => (
                      <div key={item} className="flex items-center gap-2 text-sm font-bold text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-slate-300" /> {item}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* --- CTA --- */}
      <section className="py-24 px-6 relative">
        <div className="max-w-6xl mx-auto bg-slate-900 rounded-[4rem] p-16 md:p-24 text-white text-center relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_50%,#2563eb33,transparent_70%)]"></div>
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-black mb-8">準備好升級生產線了嗎？</h2>
            <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto font-medium mb-12">
              元堉技術工程團隊隨時待命，提供專業技術詢價與廠房規劃建議。
            </p>
            <div className="flex flex-col md:flex-row justify-center items-center gap-8">
              <p className="text-3xl font-black">02-2751-2786</p>
              <Link href="/contact" className="bg-blue-600 text-white px-12 py-5 rounded-[2.5rem] font-black hover:bg-blue-500 transition-all shadow-xl">
                立即取得專業報價
              </Link>
            </div>
          </div>
        </div>
      </section>

      <style jsx global>{`
        .animate-spin-slow { animation: spin 20s linear infinite; }
      `}</style>
    </div>
  );
}