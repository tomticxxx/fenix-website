"use client"; // 這是關鍵！AI 搜尋需要互動，必須加這一行

import AISearch from "@/components/AISearch";

export default function AISearchPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-black text-slate-900 mb-2">AI 智能設備搜尋</h1>
          <p className="text-slate-500">請輸入關鍵字（如：軟膠囊、重量、SKY），AI 將為您篩選合適設備</p>
        </div>
        
        {/* 呼叫剛才寫好的 AISearch 組件 */}
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100">
          <AISearch />
        </div>
      </div>
    </div>
  );
}