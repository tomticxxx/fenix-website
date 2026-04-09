"use client";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { products } from "../../../data/products";
import Link from "next/link";
import { 
  ChevronLeft, 
  Check, 
  Table, 
  Activity, 
  Cpu, 
  Settings, 
  MessageSquareQuote, 
  ShieldCheck 
} from "lucide-react";

// 品牌色彩配置 - 統一全站視覺
const brandConfigs: { [key: string]: { color: string, bg: string, btn: string, border: string } } = {
  "SKY SOFTGEL": { color: "text-blue-600", bg: "bg-blue-50", btn: "bg-blue-600", border: "border-blue-200" },
  "中國指標品牌": { color: "text-red-600", bg: "bg-red-50", btn: "bg-red-600", border: "border-red-200" },
  "蘇州瀚隆 (HALO)": { color: "text-emerald-600", bg: "bg-emerald-50", btn: "bg-emerald-600", border: "border-emerald-200" },
  "日本 FREUND": { color: "text-orange-600", bg: "bg-orange-50", btn: "bg-orange-600", border: "border-orange-200" },
  "RGS (Italy)": { color: "text-fuchsia-600", bg: "bg-fuchsia-50", btn: "bg-fuchsia-600", border: "border-fuchsia-200" },
  "韓國 LEIDEX": { color: "text-pink-600", bg: "bg-pink-50", btn: "bg-pink-600", border: "border-pink-200" },
  "GELKO": { color: "text-slate-700", bg: "bg-slate-100", btn: "bg-slate-700", border: "border-slate-200" },
};

// 補全所有可能出現的規格標籤，包含壓片機與 RGS 真空設備
const labelMap: { [key: string]: string } = {
  capacity: "處理量 / Capacity",
  air: "進氣風量 / Air Volume",
  spray: "噴霧量 / Spray Rate",
  speed: "轉速 / Speed",
  force: "主壓壓力 / Main Pressing Force",
  pre_force: "預壓壓力 / Pre Pressing Force",
  evaporation: "水分蒸發量 / Evaporation",
  range: "適用範圍 / Range",
  power: "總功率 / Power",
  weight: "機台重量 / Weight",
  gas_vol: "氣體流量 / Airflow", // RGS 關鍵參數
  dimensions: "設備尺寸 / Dimensions",
  steam: "蒸汽消耗量 / Steam",
  heater: "加熱功率 / Heater",
  vacuum: "真空度 / Vacuum",     // RGS 關鍵參數
  material: "主體材質 / Material",
  die_type: "模具規格 / Die Type",
  filling_accuracy: "充填精度 / Accuracy",
  turret_stations: "沖數 / Stations",
  max_tablet_diam: "最大片徑 / Max Tablet Diam.",
  max_filling_depth: "最大充填深度 / Filling Depth",
  max_capacity: "產能上限 / Max Output",
};

export default function SeriesDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const product = products.find((p) => p.id === id);

  // SEO: 動態修改頁面標題
  useEffect(() => {
    if (product) {
      document.title = `${product.name_zh} | ${product.brand} - 元堉技術顧問`;
    }
  }, [product]);

  if (!product) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">找不到產品資料</h2>
        <Link href="/products" className="text-blue-600 underline font-black">返回產品列表</Link>
      </div>
    </div>
  );

  const config = brandConfigs[product.brand] || { color: "text-slate-900", bg: "bg-slate-50", btn: "bg-slate-900", border: "border-slate-200" };

  const getTechnicalNote = () => {
    if (product.note) return product.note;
    const defaultNotes: { [key: string]: string } = {
      "日本 FREUND": "FREUND 具備專利進氣流道設計，能確保製劑過程極高均勻度。元堉協助原廠技術對接與在地安裝點檢。",
      "SKY SOFTGEL": "SKY 軟膠囊系統以高精密充填聞名。元堉協助原廠模具選配與補償設定，確保符合 GMP 規範。",
      "中國指標品牌": "針對高速打錠壓力穩定性進行優化。元堉技術團隊提供安裝驗證 (IQ/OQ/PQ) 支援，確保大批量生產良率與設備穩定運轉。",
      "蘇州瀚隆 (HALO)": "具備優異充填精度控制。元堉提供粉體、顆粒充填模組選配建議，確保產線運作不中斷。",
      "韓國 LEIDEX": "針對化妝品料體提供多樣噴頭配置。元堉協助容器形狀選型對接與自動化產線整合規劃。",
      "RGS (Italy)": "RGS 義大利原廠製造，專為粉體輸送設計。元堉提供與打錠機、混合機的連通方案與自動補料電眼整合技術。"
    };
    return defaultNotes[product.brand] || "規格由原廠提供，標準配置依生產需求調整。元堉提供原廠技術對接、售後安裝與維修服務。";
  };

  const displayTitle = product.series || product.name;

  return (
    <div className="min-h-screen bg-white pb-24 text-slate-900">
      {/* 1. 頂部標題區 */}
      <div className={`${config.bg} py-16 px-6 border-b ${config.border} relative overflow-hidden`}>
        <div className="max-w-7xl mx-auto relative z-10">
          <Link href="/products" className="inline-flex items-center text-slate-500 hover:text-slate-900 transition-colors mb-10 font-black text-xs uppercase tracking-widest group">
            <ChevronLeft className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" /> 返回設備清單
          </Link>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-4xl">
              <div className={`inline-block px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-6 border ${config.border} ${config.color} bg-white shadow-sm`}>
                {product.brand} • {product.category}
              </div>
              <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter leading-tight italic">
                {displayTitle}
              </h1>
              <div className="flex items-center gap-4">
                <div className={`h-1 w-12 ${config.btn} rounded-full`}></div>
                <h2 className="text-2xl font-bold text-slate-500">{product.name_zh}</h2>
              </div>
            </div>
            <Link href="/contact" className={`${config.btn} text-white px-10 py-5 rounded-2xl font-black shadow-2xl hover:brightness-110 hover:scale-105 transition-all active:scale-95 flex items-center gap-3 shrink-0`}>
              索取詳細技術規格書 <ChevronLeft className="w-4 h-4 rotate-180" />
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 mb-24">
          
          <div className="lg:col-span-2 space-y-16">
            <section>
              <h2 className="text-3xl font-black mb-8 flex items-center gap-3">
                <Cpu className={`w-8 h-8 ${config.color}`} /> 技術設計特點
              </h2>
              <p className="text-slate-500 leading-relaxed text-xl mb-12 font-medium border-l-4 pl-6 border-slate-100 whitespace-pre-line">
                {product.description}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {product.features.map((feature, index) => (
                  <div key={index} className="flex items-start p-6 bg-slate-50 rounded-[2.5rem] border border-slate-100 hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                    <div className={`w-8 h-8 rounded-xl ${config.bg} flex items-center justify-center shrink-0 mr-4 group-hover:scale-110 transition-transform`}>
                      <Check className={`w-5 h-5 ${config.color}`} />
                    </div>
                    <span className="text-slate-700 font-bold leading-snug pt-1">{feature}</span>
                  </div>
                ))}
              </div>
            </section>

            {Object.keys(product.specs).length > 0 && (
              <section>
                <h2 className="text-3xl font-black mb-8 flex items-center gap-3">
                  <Settings className={`w-8 h-8 ${config.color}`} /> 共通技術參數
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-2">
                  {Object.entries(product.specs).map(([key, value], idx) => (
                    <div key={idx} className="flex justify-between items-center py-5 border-b border-slate-100 hover:bg-slate-50/50 px-2 transition-colors">
                      <span className="text-slate-400 font-bold text-sm tracking-widest uppercase shrink-0">{labelMap[key] || key}</span>
                      <span className="text-slate-900 font-black text-right ml-4 whitespace-pre-line leading-relaxed">
                        {Array.isArray(value) ? value.join("\n") : value}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
          
          {/* 右側：圖片與產業應用 */}
          <div className="space-y-8">
            {product.image && (
              <div className="relative aspect-square w-full flex items-center justify-center rounded-[2.5rem] bg-slate-50/50 border border-slate-100 p-6 shadow-sm group overflow-hidden transition-all duration-500 hover:shadow-xl hover:border-slate-200">
                <img 
                  src={product.image} 
                  alt={`${product.brand} - ${product.name_zh}`}
                  className="w-full h-full object-contain z-10 transition-all duration-700 ease-in-out group-hover:scale-110 filter group-hover:drop-shadow-2xl"
                />
                <div className={`absolute inset-0 ${config.bg} opacity-20 blur-3xl group-hover:opacity-40 transition-opacity duration-700`}></div>
              </div>
            )}

            <div className={`p-8 rounded-[2.5rem] border ${config.border} ${config.bg} hover:shadow-lg transition-shadow`}>
              <h3 className={`text-lg font-black mb-6 ${config.color} flex items-center gap-2`}>
                 <Activity className="w-5 h-5" /> 適用產業應用
              </h3>
              <div className="flex flex-wrap gap-2">
                {product.application.map((app, index) => (
                  <span key={index} className="px-3 py-1.5 bg-white text-slate-700 font-black rounded-lg text-xs border border-slate-100 shadow-sm hover:border-slate-300 transition-colors">
                    {app}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-8 bg-slate-900 rounded-[2.5rem] text-white relative overflow-hidden group">
              <MessageSquareQuote className="w-8 h-8 text-slate-600 mb-4 group-hover:text-white/40 transition-colors" />
              <h3 className="text-lg font-black mb-3 italic">元堉技術支援備註</h3>
              <p className="text-slate-400 text-xs leading-relaxed font-medium whitespace-pre-line">
                {getTechnicalNote()}
              </p>
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.1em]">Distributor & Maintenance Support</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3. 型號規格對照表 */}
        {product.models && product.models.length > 0 && product.models[0] && (
          <div className="mb-24">
            <div className="flex items-center gap-4 mb-10">
              <Table className={`w-10 h-10 ${config.color}`} />
              <div>
                <h2 className="text-3xl font-black leading-none">型號規格詳細對照表</h2>
                <p className="text-slate-400 font-bold tracking-widest text-[10px] uppercase mt-2">Technical Data Matrix</p>
              </div>
            </div>
            
            <div className="overflow-hidden rounded-[3rem] border border-slate-100 shadow-2xl bg-white">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[900px]">
                  <thead>
                    <tr className="bg-slate-900 text-white">
                      <th className="p-8 font-black text-[11px] uppercase tracking-widest sticky left-0 bg-slate-900 z-20 border-r border-white/5">型號 Model</th>
                      {Object.keys(product.models[0]).filter(k => k !== 'name').map((key) => (
                        <th key={key} className="p-8 font-black text-[11px] uppercase tracking-widest border-l border-white/10 text-center whitespace-nowrap">
                          {labelMap[key] || key}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="text-slate-700">
                    {product.models.map((model, idx) => (
                      <tr key={idx} className="border-b border-slate-50 hover:bg-slate-50/80 transition-colors group">
                        <td className="p-8 font-black text-slate-900 bg-white sticky left-0 z-10 border-r border-slate-100 group-hover:bg-slate-50 transition-colors italic shadow-[2px_0_10px_rgba(0,0,0,0.05)]">
                          <div className="flex items-center gap-3">
                            <div className={`w-2 h-2 rounded-full ${config.btn} group-hover:scale-150 transition-transform`}></div>
                            {model.name}
                          </div>
                        </td>
                        {Object.entries(model).filter(([k]) => k !== 'name').map(([key, value], vIdx) => {
                          // ✅ 強化核心性能欄位：包含 產能、沖數、壓力、真空度、流量
                          const isCoreSpec = ['capacity', 'turret_stations', 'force', 'max_capacity', 'vacuum', 'gas_vol'].includes(key);
                          return (
                            <td key={vIdx} className="p-8 text-center border-l border-slate-50 font-mono font-black text-sm whitespace-pre-line leading-normal">
                              <span className={isCoreSpec ? `${config.color}` : 'text-slate-500'}>
                                {value || "—"}
                              </span>
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        <div className="bg-slate-900 rounded-[4rem] p-16 text-center text-white relative overflow-hidden shadow-2xl group">
          <div className="relative z-10">
            <h2 className="text-4xl font-black mb-6 tracking-tight italic">需要針對型號進行更詳細的選配？</h2>
            <Link href="/contact" className={`${config.btn} text-white px-16 py-6 rounded-2xl font-black text-xl inline-flex items-center gap-4 hover:brightness-110 hover:scale-105 transition-all shadow-2xl mt-4 active:scale-95`}>
              立即連繫技術顧問 <ChevronLeft className="rotate-180 w-6 h-6" />
            </Link>
          </div>
          <div className={`absolute -right-20 -bottom-20 w-64 h-64 ${config.btn} opacity-10 blur-[100px] group-hover:opacity-20 transition-opacity duration-700`}></div>
        </div>
      </div>
    </div>
  );
}