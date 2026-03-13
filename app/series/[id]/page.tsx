"use client";
import { useParams } from "next/navigation";
import { products, Product } from "../../../data/products";
import Link from "next/link";
import { ChevronLeft, Check, Table, Activity, Cpu, Settings, MessageSquareQuote, ShieldCheck } from "lucide-react";

// 品牌色彩配置
const brandConfigs: { [key: string]: { color: string, bg: string, btn: string, border: string } } = {
  "SKY SOFTGEL": { color: "text-blue-600", bg: "bg-blue-50", btn: "bg-blue-600", border: "border-blue-200" },
  "翰林航宇": { color: "text-red-600", bg: "bg-red-50", btn: "bg-red-600", border: "border-red-200" },
  "蘇州瀚隆 (HALO)": { color: "text-emerald-600", bg: "bg-emerald-50", btn: "bg-emerald-600", border: "border-emerald-200" },
  "日本 FREUND": { color: "text-orange-600", bg: "bg-orange-50", btn: "bg-orange-600", border: "border-orange-200" },
  "韓國 LEIDEX": { color: "text-pink-600", bg: "bg-pink-50", btn: "bg-pink-600", border: "border-pink-200" },
};

// 完整欄位名稱對照表 (優化：增加更多常見製藥機械欄位)
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
  gas_vol: "氣體消耗量 / Gas Volume",
  dimensions: "設備尺寸 / Dimensions",
  steam: "蒸汽消耗量 / Steam",
  heater: "加熱功率 / Heater",
  vacuum: "真空度 / Vacuum",
  material: "主體材質 / Material",
  die_type: "模具規格 / Die Type",
  filling_accuracy: "充填精度 / Accuracy",
};

export default function SeriesDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const product = products.find((p) => p.id === id);

  if (!product) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">找不到產品資料</h2>
        <Link href="/products" className="text-blue-600 underline">返回產品列表</Link>
      </div>
    </div>
  );

  const config = brandConfigs[product.brand] || { color: "text-slate-900", bg: "bg-slate-50", btn: "bg-slate-900", border: "border-slate-200" };

  // 代理商專業技術備註邏輯 (優化：從 note 欄位讀取，若無則根據品牌顯示預設內容)
  const getTechnicalNote = () => {
    if (product.note) return product.note;

    const defaultNotes: { [key: string]: string } = {
      "日本 FREUND": "FREUND 具備專利之進氣流道設計，能確保製劑過程中極高的混合均勻度。元堉作為代理服務窗口，可協助客戶與日方原廠進行技術參數確認，並提供在地化的安裝與定期點檢服務。",
      "SKY SOFTGEL": "SKY 軟膠囊生產系統以高精密充填聞名。針對客戶之明膠配方或填充物料特性，元堉可協助對接原廠之精密模具選配與幫浦補償設定，並確保設備之機電整合符合 GMP 生產規範。",
      "翰林航宇": "翰林航宇系列強調打錠過程的壓力穩定性與耐用度。元堉技術團隊提供專業之安裝驗證 (IQ/OQ) 支援與原廠零件供應，確保設備在連續高速運轉下的生產良率。",
      "蘇州瀚隆 (HALO)": "HALO 膠囊充填系列具備優異的充填精度控制。元堉提供專業之製程選配建議（如粉體、顆粒、錠劑充填模組），並負責後續之技術教育訓練與故障排除，確保客戶產線運作不中斷。",
      "韓國 LEIDEX": "LEIDEX 填充設備針對化妝品料體特性提供多樣化噴頭配置。元堉可協助針對客戶容器形狀與料體黏稠度與原廠進行選型對接，提供完整之自動化產線整合規劃建議。"
    };

    return defaultNotes[product.brand] || "上述規格資訊由原廠提供，標準配置可能依生產需求調整。元堉提供完整之原廠技術對接、售後安裝與機電維修服務。如需詳細技術手冊或製程規劃建議，歡迎與我們連繫。";
  };

  // 處理標題顯示邏輯
  const displayTitle = product.series || product.name;

  return (
    <div className="min-h-screen bg-white pb-24 text-slate-900">
      {/* 1. 頂部標題區 */}
      <div className={`${config.bg} py-16 px-6 border-b ${config.border} relative overflow-hidden`}>
        <div className="max-w-7xl mx-auto relative z-10">
          <Link href="/products" className="inline-flex items-center text-slate-500 hover:text-slate-900 transition-colors mb-10 font-black text-xs uppercase tracking-widest group">
            <ChevronLeft className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" /> Back to Portfolio
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
            <Link href="/contact" className={`${config.btn} text-white px-10 py-5 rounded-2xl font-black shadow-2xl hover:brightness-110 transition-all active:scale-95 flex items-center gap-3 shrink-0`}>
              索取技術規格書 <ChevronLeft className="w-4 h-4 rotate-180" />
            </Link>
          </div>
        </div>
        <div className={`absolute -right-20 -bottom-20 text-[20rem] font-black ${config.color} opacity-[0.03] select-none uppercase`}>
          {product.brand.split(' ')[0]}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-20">
        {/* 2. 技術設計與共通規格 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 mb-24">
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-black mb-8 flex items-center gap-3">
              <Cpu className={`w-8 h-8 ${config.color}`} /> 技術設計特點
            </h2>
            <p className="text-slate-500 leading-relaxed text-xl mb-12 font-medium border-l-4 pl-6 border-slate-100 whitespace-pre-line">
              {product.description}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-20">
              {product.features.map((feature, index) => (
                <div key={index} className="flex items-start p-6 bg-slate-50 rounded-[2rem] border border-slate-100 hover:bg-white hover:shadow-xl transition-all group">
                  <div className={`w-8 h-8 rounded-xl ${config.bg} flex items-center justify-center shrink-0 mr-4 group-hover:scale-110 transition-transform`}>
                    <Check className={`w-5 h-5 ${config.color}`} />
                  </div>
                  <span className="text-slate-700 font-bold leading-snug pt-1">{feature}</span>
                </div>
              ))}
            </div>

            {/* 共通技術參數 */}
            {Object.keys(product.specs).length > 0 && (
              <div>
                <h2 className="text-3xl font-black mb-8 flex items-center gap-3">
                  <Settings className={`w-8 h-8 ${config.color}`} /> 共通技術參數
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-2">
                  {Object.entries(product.specs).map(([key, value], idx) => (
                    <div key={idx} className="flex justify-between items-center py-5 border-b border-slate-100">
                      <span className="text-slate-400 font-bold text-sm tracking-widest uppercase">{labelMap[key] || key}</span>
                      <span className="text-slate-900 font-black text-right ml-4 whitespace-pre-line">
                        {Array.isArray(value) ? value.join(" / ") : value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <div className="space-y-8">
            <div className={`p-10 rounded-[3rem] border-2 ${config.border} ${config.bg} shadow-sm`}>
              <h3 className={`text-xl font-black mb-8 ${config.color} flex items-center gap-2`}>
                 <Activity className="w-5 h-5" /> 適用產業應用
              </h3>
              <div className="flex flex-wrap gap-2">
                {product.application.map((app, index) => (
                  <span key={index} className="px-4 py-2 bg-white text-slate-700 font-black rounded-xl text-sm border border-slate-100 shadow-sm">
                    {app}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-10 bg-slate-900 rounded-[3rem] text-white relative overflow-hidden group">
              <div className="relative z-10">
                <MessageSquareQuote className="w-10 h-10 text-slate-500 mb-6 group-hover:text-blue-400 transition-colors" />
                <h3 className="text-xl font-black mb-4">技術支援備註</h3>
                <p className="text-slate-400 text-sm leading-relaxed font-medium whitespace-pre-line">
                  {getTechnicalNote()}
                </p>
                <div className="mt-8 pt-6 border-t border-white/10 flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  <span className="text-xs font-black text-slate-500 uppercase tracking-widest">Authorized Distributor Support</span>
                </div>
              </div>
              <div className={`absolute -right-4 -bottom-4 w-24 h-24 ${config.btn} opacity-10 blur-3xl`}></div>
            </div>
          </div>
        </div>

        {/* 3. 型號規格表 */}
        {product.models && product.models.length > 0 && (
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
                      <th className="p-8 font-black tracking-widest text-[11px] uppercase opacity-70 sticky left-0 bg-slate-900 z-10">型號 Model</th>
                      {Object.keys(product.models[0]).filter(k => k !== 'name').map((key) => (
                        <th key={key} className="p-8 font-black text-[11px] tracking-widest uppercase border-l border-white/10 text-center whitespace-nowrap">
                          {labelMap[key] || key}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="text-slate-700">
                    {product.models.map((model, idx) => (
                      <tr key={idx} className="border-b border-slate-50 hover:bg-slate-50/80 transition-colors group">
                        <td className="p-8 font-black text-slate-900 bg-white sticky left-0 z-10 group-hover:bg-slate-50 shadow-[4px_0_10px_rgba(0,0,0,0.02)] transition-colors">
                          <div className="flex items-center gap-3 italic">
                            <div className={`w-2 h-2 rounded-full ${config.btn}`}></div>
                            {model.name}
                          </div>
                        </td>
                        {Object.entries(model).filter(([k]) => k !== 'name').map(([key, value], vIdx) => (
                          <td key={vIdx} className="p-8 text-center border-l border-slate-50 font-mono font-black text-sm">
                            <span className={['capacity', 'range', 'force'].includes(key) ? `${config.color} text-base` : 'text-slate-500'}>
                              {value || "—"}
                            </span>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 4. 底部引導聯絡 */}
        <div className="bg-slate-900 rounded-[4rem] p-16 text-center text-white relative overflow-hidden shadow-2xl">
          <div className="relative z-10">
            <h2 className="text-4xl font-black mb-6 tracking-tight">需要針對您產線的客製選型建議？</h2>
            <p className="text-slate-400 mb-10 max-w-xl mx-auto font-medium text-lg leading-relaxed">
              作為授權代理商，我們提供從原廠技術對接、設備選型到售後維護的一站式服務。
            </p>
            <Link href="/contact" className={`${config.btn} text-white px-16 py-6 rounded-2xl font-black text-xl inline-flex items-center gap-4 hover:scale-105 transition-all shadow-2xl`}>
              立即連繫技術顧問 <ChevronLeft className="rotate-180 w-6 h-6" />
            </Link>
          </div>
          <div className={`absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none`}>
            <div className={`absolute top-10 left-10 w-64 h-64 rounded-full ${config.bg} blur-[120px]`}></div>
            <div className={`absolute bottom-10 right-10 w-64 h-64 rounded-full bg-blue-500 blur-[120px]`}></div>
          </div>
        </div>
      </div>
    </div>
  );
}