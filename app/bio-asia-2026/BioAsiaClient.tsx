"use client";

import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';

export default function BioAsiaClient() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState("");
  const [selectedDemands, setSelectedDemands] = useState<string[]>([]);

  // 處理複選框需求項目的變動
  const handleCheckboxChange = (demand: string) => {
    setSelectedDemands(prev => 
      prev.includes(demand) ? prev.filter(item => item !== demand) : [...prev, demand]
    );
  };

  // 寄送展覽預約信件邏輯
  const sendBioAsiaEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setStatus("sending");

    // 沿用您的 EmailJS 配置
    const SERVICE_ID = "service_x4hiwml"; 
    const TEMPLATE_ID = "template_12mz6a4"; 
    const PUBLIC_KEY = "p5QMMQNx4Xd4Dwt58";

    // 1. 從原生表單中動態取得輸入值
    const formData = new FormData(formRef.current);
    const companyName = formData.get('company_name') as string || '無特別填寫';
    const userName = formData.get('user_name') as string;
    const userPhone = formData.get('user_phone') as string || '無特別填寫';
    const userEmail = formData.get('user_email') as string;
    const customMemo = formData.get('custom_memo') as string || '無特別填寫備註';

    // 2. 組裝動態的 message 內容
    const demandsText = selectedDemands.length > 0 
      ? `【客戶勾選的需求項目】：\n${selectedDemands.map(d => `- ${d}`).join('\n')}`
      : '【客戶勾選的需求項目】：無特別勾選';
    
    const combinedMessage = `★ 本信件來自【2026 生技展覽專頁】預約表單 ★\n\n${demandsText}\n\n【具體需求或備註說明】：\n${customMemo}`;

    // 3. 封裝傳送給 EmailJS 模板的參數變數 (請對照您 EmailJS 網頁後台 Template 的 {{變數名稱}})
    const templateParams = {
      company_name: companyName,
      user_name: userName,
      user_phone: userPhone,
      user_email: userEmail,
      message: combinedMessage, // 整合好的完整需求文字
    };

    // 4. 改用 emailjs.send 確保動態組裝的 message 能 100% 正確送出
    emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)
      .then(() => {
        setStatus("success");
        alert("展覽現場洽談預約與型錄索取已成功送出！Fenix 技術團隊將儘速與您聯繫。");
        formRef.current?.reset();
        setSelectedDemands([]);
      }, (error) => {
        console.error("發送失敗:", error);
        setStatus("error");
        alert("預約發送失敗，請直接使用 LINE 或電話聯繫 Fenix 窗口。");
      });
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden">
        
        {/* Banner 標頭區 */}
        <div className="bg-gradient-to-r from-blue-900 to-slate-800 text-white px-8 py-12 text-center">
          <p className="text-teal-400 font-bold uppercase tracking-wider text-sm mb-2">2026 BIO Asia-Taiwan</p>
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-4">亞洲美容保養．生技保健大展</h1>
          <p className="text-xl text-slate-300 font-light">恆達機械 (Hedagel) 盛大參展 × Fenix 團隊現場技術支援</p>
        </div>

        {/* 展會核心資訊 */}
        <div className="p-8 border-b border-slate-100">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
            <div className="p-4 bg-blue-50 rounded-xl">
              <h3 className="text-blue-900 font-bold mb-1">📅 展出日期</h3>
              <p className="text-slate-700">2026 / 7 / 16 (四) — 7 / 19 (日)</p>
              <p className="text-xs text-slate-500 mt-1 block">10:00 AM ~ 6:00 PM</p>
              <p className="text-xs text-orange-600 font-medium mt-0.5">(最後一日至 5:00 PM)</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-xl">
              <h3 className="text-blue-900 font-bold mb-1">📍 展出地點</h3>
              <p className="text-slate-700">台北南港展覽館 1 館 1 樓</p>
              <p className="text-xs text-slate-500 mt-1">台北市南港區經貿二路1號 (國外廠商區)</p>
            </div>
            <div className="p-4 bg-orange-50 rounded-xl border border-orange-200">
              <h3 className="text-orange-700 font-bold mb-1">🔥 展位編號</h3>
              <p className="text-xl font-black text-orange-600">K202 (恒達机械)</p>
              <p className="text-xs text-slate-500 mt-1">歡迎蒞臨現場交流實機工藝</p>
            </div>
          </div>

          {/* 大會官方進場參觀申請按鈕 */}
          <div className="mt-8 text-center">
            <a 
              href="https://www.chanchao.com.tw/entryApply.asp?id=DMCB2026" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-8 rounded-full shadow-md transition-all transform hover:-translate-y-0.5 active:translate-y-0 text-base sm:text-lg"
            >
              🎟️ 點此申請大會【免費入場券】(移至展昭官方系統)
            </a>
            <p className="text-slate-400 text-xs mt-2">※ 參觀登記手續完成後，展期即可憑 QR Code 掃描快速入場</p>
          </div>
        </div>

        {/* 平面圖標示與尋找指南 */}
        <div className="p-8 bg-slate-50 border-b border-slate-100">
          <h2 className="text-xl font-bold text-slate-800 mb-3 flex items-center gap-2">
            🗺️ 展位位置指引 (南港 1 館 1 樓)
          </h2>
          <p className="text-slate-600 text-sm leading-relaxed mb-4">
            今年大展規模龐大，恆達機械與 Fenix 團隊位於 <strong>1 樓的「國外廠商區」</strong>。為了方便您快速找到我們，建議您可以提前對照大會官方公布的最新平面圖。
          </p>
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
            <h4 className="font-bold text-slate-800 text-sm mb-2 text-center md:text-left">📍 攤位尋找小撇步：</h4>
            <ul className="text-xs text-slate-600 space-y-2 list-disc pl-4 leading-relaxed">
              <li>進入南港展覽館 1 館 1 樓後，請直接往 <strong>K 區（國外廠商區）</strong>走。</li>
              <li>我們的展位號碼為 <strong>K202</strong>，主要展示先進軟膠囊機設備及核心模具技術。</li>
              <li>您可以點擊下方連結，對照大會官方大圖，更精準鎖定現場攤位動線。</li>
            </ul>
            <div className="mt-4 text-center md:text-left">
              <a 
                href="https://www.chanchao.com.tw/exhibitionfiles/floorplan/large/DMCB2026_0.jpg" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center text-xs font-bold text-blue-600 hover:text-blue-800 hover:underline gap-1"
              >
                🔍 點此放大查看大會官方【現場大版面展位動線圖】 ➔
              </a>
            </div>
          </div>
        </div>

        {/* 參展焦點亮點說明與專業技術內文優化 */}
        <div className="p-8 space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-800 mb-4 border-l-4 border-blue-900 pl-3">現場展示焦點</h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              元堉企業 (Fenix) 長期引進國際頂尖生產設備。本次大展，我們特別攜手領先的軟膠囊設備專家<strong>恆達機械 (Hedagel)</strong> 盛大參展，針對生技保健、美容保養大廠提供高效能、高精度的產線解決方案。
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="border border-slate-200 rounded-xl p-5 hover:border-blue-500 transition-colors bg-white shadow-sm">
                <span className="text-2xl mb-2 block">⚙️</span>
                <h4 className="font-bold text-slate-800 mb-2">精密軟膠囊製造成套設備</h4>
                <p className="text-slate-600 text-sm leading-relaxed mb-3">
                  展示具備高度穩定性與精密計量的軟膠囊生產實機，滿足高產能與嚴格生技製藥品管標準。
                </p>
                <ul className="text-xs text-slate-500 space-y-1 list-disc pl-4 border-t border-slate-100 pt-2.5">
                  <li>醫藥食品級微量高精度充填柱塞泵</li>
                  <li>自動膠皮冷卻與自動對線節能控制系統</li>
                  <li>適用高黏度、懸浮物等複雜內容物劑型生產</li>
                </ul>
              </div>
              <div className="border border-slate-200 rounded-xl p-5 hover:border-blue-500 transition-colors bg-white shadow-sm">
                <span className="text-2xl mb-2 block">📐</span>
                <h4 className="font-bold text-slate-800 mb-2">高精度客製化模具工藝</h4>
                <p className="text-slate-600 text-sm leading-relaxed mb-3">
                  同步呈現多款精密核心模具，滿足各種特殊形狀、客製化膠囊外觀與高效壓模需求。
                </p>
                <ul className="text-xs text-slate-500 space-y-1 list-disc pl-4 border-t border-slate-100 pt-2.5">
                  <li>高硬度、抗磨損客製化軟膠囊滾模模具</li>
                  <li>特殊外觀形狀設計，優化封口牢固度與良率</li>
                  <li>精密加工工藝，大幅縮短現場換模與校正時間</li>
                </ul>
              </div>
            </div>
          </div>

          {/* 專業問答 FAQ 區塊 */}
          <div className="border-t border-slate-100 pt-6">
            <h3 className="text-base font-bold text-slate-800 mb-3 flex items-center gap-1.5">
              <span className="text-blue-900">💡</span> 2026 生技大展：產線諮詢與型錄索取常見問題
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-600 leading-relaxed">
              <div className="bg-slate-50/50 p-3.5 rounded-xl border border-slate-100">
                <p className="font-bold text-slate-800 mb-1">Q：若展覽期間不便前往，如何索取恆達機械 (Hedagel) 最新型錄？</p>
                <p className="text-slate-500">A：您可直接利用下方【商務洽談回函】勾選索取型錄，Fenix 技術專員將於 24 小時內將完整設備規格書與成套產線解決方案發送至您的電子信箱。</p>
              </div>
              <div className="bg-slate-50/50 p-3.5 rounded-xl border border-slate-100">
                <p className="font-bold text-slate-800 mb-1">Q：現場提供哪些製藥與生技保健產線的升級諮詢？</p>
                <p className="text-slate-500">A：Fenix 專業團隊將在 K202 展位現場進駐，提供軟膠囊機設備產能優化、客製化膠囊滾模開發、以及自動化生產線售後維護等全方位技術支援。</p>
              </div>
            </div>
          </div>

          <div className="max-w-2xl mx-auto bg-white border border-slate-200/80 rounded-2xl shadow-md p-6 sm:p-8 relative">
            
            {/* 右上角商務回條標籤 */}
            <div className="absolute top-4 right-6 text-slate-300 text-xs tracking-widest uppercase select-none hidden sm:block">
              Reply Slip / 參展回函
            </div>

            <div className="text-center mb-6">
              <h2 className="text-xl font-bold text-slate-800 tracking-tight">2026 生技大展參展商務回函</h2>
              <p className="text-slate-400 text-xs mt-1">敬愛的貴賓您好，若您欲預約現場洽談或索取技術資料，請撥冗填寫此回條：</p>
            </div>
            
            <form ref={formRef} onSubmit={sendBioAsiaEmail} className="space-y-4">

              {/* 回函選項 */}
              <div>
                <span className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wider">回函事由 (可複選)</span>
                <div className="grid grid-cols-1 gap-2">
                  
                  <label className={`flex items-center text-xs font-medium rounded-lg px-4 py-2.5 border transition-all cursor-pointer select-none ${
                    selectedDemands.includes("預約 7/16 - 7/19 現場攤位商務洽談")
                      ? "bg-blue-50 text-blue-900 border-blue-400 font-semibold"
                      : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                  }`}>
                    <input 
                      type="checkbox" 
                      checked={selectedDemands.includes("預約 7/16 - 7/19 現場攤位商務洽談")} 
                      onChange={() => handleCheckboxChange("預約 7/16 - 7/19 現場攤位商務洽談")} 
                      className="rounded border-slate-300 text-blue-900 mr-2.5 h-4 w-4 focus:ring-0 focus:ring-offset-0" 
                    /> 
                    <span>欲預約 7/16 - 7/19 現場攤位商務洽談</span>
                  </label>

                  <label className={`flex items-center text-xs font-medium rounded-lg px-4 py-2.5 border transition-all cursor-pointer select-none ${
                    selectedDemands.includes("索取恆達機械 (Hedagel) 最新型錄電子檔")
                      ? "bg-blue-50 text-blue-900 border-blue-400 font-semibold"
                      : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                  }`}>
                    <input 
                      type="checkbox" 
                      checked={selectedDemands.includes("索取恆達機械 (Hedagel) 最新型錄電子檔")} 
                      onChange={() => handleCheckboxChange("索取恆達機械 (Hedagel) 最新型錄電子檔")} 
                      className="rounded border-slate-300 text-blue-900 mr-2.5 h-4 w-4 focus:ring-0 focus:ring-offset-0" 
                    /> 
                    <span>欲索取恆達機械 (Hedagel) 最新型錄電子檔</span>
                  </label>

                  <label className={`flex items-center text-xs font-medium rounded-lg px-4 py-2.5 border transition-all cursor-pointer select-none ${
                    selectedDemands.includes("需要工程師針對既有膠囊產線進行售後或升級諮詢")
                      ? "bg-blue-50 text-blue-900 border-blue-400 font-semibold"
                      : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                  }`}>
                    <input 
                      type="checkbox" 
                      checked={selectedDemands.includes("需要工程師針對既有膠囊產線進行售後或升級諮詢")} 
                      onChange={() => handleCheckboxChange("需要工程師針對既有膠囊產線進行售後或升級諮詢")} 
                      className="rounded border-slate-300 text-blue-900 mr-2.5 h-4 w-4 focus:ring-0 focus:ring-offset-0" 
                    /> 
                    <span>需工程師針對既有膠囊產線進行售後/升級諮詢</span>
                  </label>

                </div>
              </div>

              {/* 貴賓聯絡資料 */}
              <div className="pt-2 border-t border-slate-100">
                <span className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wider">貴賓聯絡資料</span>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <input 
                      type="text" 
                      name="company_name" 
                      placeholder="公司名稱"
                      className="w-full border border-slate-200 rounded-lg p-2.5 bg-white text-sm text-slate-800 placeholder-slate-400 outline-none focus:border-blue-500 transition-all" 
                    />
                  </div>
                  <div>
                    <input 
                      type="text" 
                      name="user_name" 
                      required 
                      placeholder="聯絡人姓名 *"
                      className="w-full border border-slate-200 rounded-lg p-2.5 bg-white text-sm text-slate-800 placeholder-slate-400 outline-none focus:border-blue-500 transition-all" 
                    />
                  </div>
                  <div>
                    <input 
                      type="tel" 
                      name="user_phone" 
                      placeholder="聯絡電話"
                      className="w-full border border-slate-200 rounded-lg p-2.5 bg-white text-sm text-slate-800 placeholder-slate-400 outline-none focus:border-blue-500 transition-all" 
                    />
                  </div>
                  <div>
                    <input 
                      type="email" 
                      name="user_email" 
                      required 
                      placeholder="電子信箱 *"
                      className="w-full border border-slate-200 rounded-lg p-2.5 bg-white text-sm text-slate-800 placeholder-slate-400 outline-none focus:border-blue-500 transition-all" 
                    />
                  </div>
                </div>
              </div>

              {/* 備註說明 */}
              <div>
                <textarea 
                  id="custom_memo" 
                  name="custom_memo" 
                  rows={2} 
                  className="w-full border border-slate-200 rounded-lg p-2.5 bg-white text-xs text-slate-800 placeholder-slate-400 outline-none focus:border-blue-500 transition-all resize-none" 
                  placeholder="其他具體需求或備註說明 (如預計前往時間、特別想了解的機器型號...)"
                ></textarea>
              </div>

              {/* 提交按鈕 */}
              <div className="pt-1">
                <button 
                  type="submit" 
                  disabled={status === "sending"}
                  className={`w-full py-2.5 px-4 rounded-lg font-bold text-white transition-all shadow-sm transform active:scale-[0.99] tracking-wider text-sm ${
                    status === "sending" 
                      ? "bg-slate-400 cursor-not-allowed" 
                      : "bg-orange-500 hover:bg-orange-600"
                  }`}
                >
                  {status === "sending" ? "傳送回函中..." : "確認送出參展回函"}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* 頁尾 */}
        <div className="bg-slate-100 px-8 py-4 text-center text-xs text-slate-500">
          元堉企業有限公司 Fenix Enterprise Co., Ltd. 版權所有 © 2026
        </div>
      </div>
    </div>
  );
}