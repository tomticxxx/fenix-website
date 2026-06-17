"use client";

import React, { useState, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import emailjs from '@emailjs/browser';

// 建立內部核心畫面，用以安全處理 useSearchParams 
function BioAsiaClientContent() {
  const searchParams = useSearchParams();
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState("");
  const [selectedDemands, setSelectedDemands] = useState<string[]>([]);

  // 偵測目前語系 (預設為中文 'zh')
  const lang = searchParams.get('lang') === 'en' ? 'en' : 'zh';

  // 1. 中英文全站對照語系字典
  const dict = {
    zh: {
      expoBadge: "2026 BIO ASIA-TAIWAN",
      mainTitle: "亞洲美容保養．生技保健大展",
      subtitle: "恆達機械 (Hedagel) 盛大參展 × Fenix 團隊現場技術支援",
      
      card1Title: "📅 展出日期",
      card1Date: "2026 / 7 / 16 (四) — 7 / 19 (日)",
      card1Time: "10:00 AM ~ 6:00 PM",
      card1Note: "(最後一日至 5:00 PM)",
      card1Btn: "🗓️ 一鍵存入手機行事曆",
      
      card2Title: "📍 展出地點",
      card2Venue: "台北南港展覽館 1 館 1 樓",
      card2Addr: "台北市南港區經貿二路1號 (國外廠商區)",
      
      card3Title: "🔥 展位編號",
      card3Booth: "K202 (恒達机械)",
      card3Welcome: "歡迎蒞臨現場交流實機工藝",
      
      ticketBtn: "🎟️ 點此申請大會【免費入場券】(移至展昭官方系統)",
      ticketNote: "※ 參觀登記手續完成後，展期即可憑 QR Code 掃描快速入場",
      
      guideTitle: "🗺️ 展位位置指引 (南港 1 館 1 樓)",
      guideDesc: "今年大展規模龐大，恆達機械與 Fenix 團隊位於 1 樓的「國外廠商區」。為了方便您快速找到我們，建議您可以提前對照大會官方公布的最新平面圖。",
      guideTipTitle: "📍 攤位尋找小撇步：",
      guideTip1: "進入南港展覽館 1 館 1 樓後，請直接往 K 區（國外廠商區）走。",
      guideTip2: "我們的展位號碼為 K202，主要展示先進軟膠囊機設備及核心模具技術。",
      guideTip3: "您可以點擊下方連結，對照大會官方大圖，更精準鎖定現場攤位動線。",
      guideLink: "🔍 點此放大查看大會官方【現場大版面展位動線圖】 ➔",
      
      focusTitle: "現場展示焦點",
      focusDesc: "元堉企業 (Fenix) 長期引進國際頂尖生產設備。本次大展，我們特別攜手領先的軟膠囊設備專家恆達機械 (Hedagel) 盛大參展，針對生技保健、美容保養大廠提供高效能、高精度的產線解決方案。",
      
      bento1Title: "精密軟膠囊製造成套設備",
      bento1Desc: "展示具備高度穩定性與精密計量的軟膠囊生產實機，滿足高產能與嚴格生技製藥品管標準。",
      bento1Item1: "醫藥食品級微量高精度充填柱塞泵",
      bento1Item2: "自動膠皮冷卻與自動對線節能控制系統",
      bento1Item3: "適用高黏度、懸浮物等複雜內容物劑型生產",
      
      bento2Title: "高精度客製化模具工藝",
      bento2Desc: "同步呈現多款精密核心模具，滿足各種特殊形狀、客製化膠囊外觀與高效壓模需求。",
      bento2Item1: "高硬度、抗磨損客製化軟膠囊滾模模具",
      bento2Item2: "特殊外觀形狀設計，優化封口牢固度與良率",
      bento2Item3: "精密加工工藝，大幅縮短現場換模與校正時間",
      
      faqSectionTitle: "💡 2026 生技大展：產線諮詢與型錄索取常見問題",
      faq1Q: "Q：若展覽期間不便前往，如何索取恆達機械 (Hedagel) 最新型錄？",
      faq1A: "A：您可直接利用下方【商務洽談回函】勾選索取型錄，Fenix 技術專員將於 24 小時內將完整設備規格書與成套產線解決方案發送至您的電子信箱。",
      faq2Q: "Q：現場提供哪些製藥與生技保健產線的升級諮詢？",
      faq2A: "A：Fenix 專業團隊將在 K202 展位現場進駐，提供軟膠囊機設備產能優化、客製化膠囊滾模開發、以及自動化生產線售後維護等全方位技術支援。",
      
      formTitle: "2026 生技大展參展商務回函",
      formSub: "敬愛的貴賓您好，若您欲預約現場洽談或索取技術資料，請撥冗填寫此回條：",
      formReasonTitle: "回函事由 (可複選)",
      formReason1: "預約 7/16 - 7/19 現場攤位商務洽談",
      formReason2: "索取恆達機械 (Hedagel) 最新型錄電子檔",
      formReason3: "需要工程師針對既有膠囊產線進行售後或升級諮詢",
      formReason1Label: "欲預約 7/16 - 7/19 現場攤位商務洽談",
      formReason2Label: "欲索取恆達機械 (Hedagel) 最新型錄電子檔",
      formReason3Label: "需工程師針對既有膠囊產線進行售後/升級諮詢",
      
      formGuestTitle: "貴賓聯絡資料",
      phCompany: "公司名稱",
      phName: "聯絡人姓名 *",
      phPhone: "聯絡電話",
      phEmail: "電子信箱 *",
      phMemo: "其他具體需求或備註說明 (如預計前往時間、特別想了解的機器型號...)",
      btnSubmit: "確認送出參展回函",
      btnSending: "傳送回函中...",
      
      alertSuccess: "展覽現場洽談預約與型錄索取已成功送出！Fenix 技術團隊將儘速與您聯繫。",
      alertError: "預約發送失敗，請直接使用 LINE 或電話聯繫 Fenix 窗口。",
      copyright: "元堉企業有限公司 Fenix Enterprise Co., Ltd. 版權所有 © 2026"
    },
    en: {
      expoBadge: "2026 BIO ASIA-TAIWAN",
      mainTitle: "BIO ASIA-TAIWAN 2026 EXPO",
      subtitle: "Hedagel Grand Exhibition × Technical Support by Fenix Enterprise Team",
      
      card1Title: "📅 Exhibition Date",
      card1Date: "July 16 (Thu) — July 19 (Sun), 2026",
      card1Time: "10:00 AM ~ 6:00 PM",
      card1Note: "(Closes at 5:00 PM on the final day)",
      card1Btn: "🗓️ Add to Phone Calendar",
      
      card2Title: "📍 Exhibition Venue",
      card2Venue: "TaiNEX Hall 1, 1st Floor",
      card2Addr: "No. 1, Jingmao 2nd Rd., Nangang Dist., Taipei (International Zone)",
      
      card3Title: "🔥 Booth Number",
      card3Booth: "K202 (Hedagel)",
      card3Welcome: "Welcome to visit us for live machinery demonstration",
      
      ticketBtn: "🎟️ Apply for Official [Free E-Ticket] (Chanchao System)",
      ticketNote: "* Upon completing registration, you can fast-track entry using the official QR Code sent by the organizer",
      
      guideTitle: "🗺️ Booth Location Guide (TaiNEX Hall 1, 1F)",
      guideDesc: "This year's exhibition is exceptionally massive. Hedagel and the Fenix team are located in the 'International Exhibitors Area' on the 1st floor. To find us easily, we highly recommend checking the latest official floor plan map ahead of time.",
      guideTipTitle: "📍 Tips to Find Our Booth:",
      guideTip1: "After entering TaiNEX Hall 1 (1F), head straight towards Area K (International Exhibitors Area).",
      guideTip2: "Our booth number is K202, showcasing advanced softgel encapsulation machines and precision mould technologies.",
      guideTip3: "You can click the link below to view the large official map layout to lock down your path.",
      guideLink: "🔍 Click here to expand official [Exhibition Floor Plan Map] ➔",
      
      focusTitle: "Exhibition Highlights",
      focusDesc: "Fenix Enterprise is a premier long-term provider of high-end manufacturing equipment. For this premier biotech event, we are proud to collaborate with world-leading softgel machinery specialist Hedagel to deliver high-performance and high-precision production solutions for nutraceutical, cosmetic, and pharmaceutical factories.",
      
      bento1Title: "Advanced Softgel Encapsulation Systems",
      bento1Desc: "Live presentation of high-stability and precision-metering encapsulation machinery engineered to satisfy high-throughput and rigorous pharmaceutical QA/QC standards.",
      bento1Item1: "Pharma-food grade micro-volume high-precision injection plunger pumps",
      bento1Item2: "Automated gelatin ribbon cooling and alignment energy-saving control systems",
      bento1Item3: "Optimized for highly viscous materials, suspensions, and complex formulations",
      
      bento2Title: "High-Precision Custom Die Rolls & Tooling",
      bento2Desc: "Showcasing high-end custom core moulds tailored for diverse capsule shapes, optimized seam-sealing parameters, and high-efficiency manufacturing.",
      bento2Item1: "High-hardness, anti-abrasive specialized softgel die rolls",
      bento2Item2: "Custom geometry designs to maximize shell-sealing efficiency and yield rate",
      bento2Item3: "Advanced micro-machining finish to drastically minimize changeover downtime",
      
      faqSectionTitle: "💡 BIO Asia-Taiwan 2026: FAQ for Consultation & Catalog Request",
      faq1Q: "Q: If I cannot attend the expo in person, how can I request the latest Hedagel catalog?",
      faq1A: "A: You can use the form below to tick the catalog request option. A Fenix technical representative will dispatch full specifications and comprehensive line solutions to your email within 24 hours.",
      faq2Q: "Q: What kind of consulting support is provided at the booth?",
      faq2A: "A: The Fenix engineering specialists will be stationed full-time at Booth K202 to assist with softgel machine throughput optimization, custom die roll engineering, and local ongoing maintenance services.",
      
      formTitle: "Exhibition Inquiry & Business Reply Slip",
      formSub: "Dear Guests, if you would like to schedule an on-site meeting or request technical documentation, please take a moment to complete this form:",
      formReasonTitle: "Inquiry Purpose (Multiple Choice)",
      formReason1: "預約 7/16 - 7/19 現場攤位商務洽談",
      formReason2: "索取恆達機械 (Hedagel) 最新型錄電子檔",
      formReason3: "需要工程師針對既有膠囊產線進行售後或升級諮詢",
      formReason1Label: "Book a dedicated meeting slot during the expo (July 16-19)",
      formReason2Label: "Request the latest Hedagel softgel machinery electronic catalog",
      formReason3Label: "Require engineering consultation for existing encapsulation line upgrades",
      
      formGuestTitle: "Contact Information",
      phCompany: "Company Name",
      phName: "Full Name *",
      phPhone: "Contact Phone Number",
      phEmail: "Email Address *",
      phMemo: "Specific requirements or custom memos (e.g., your estimated arrival time, specific models of interest...)",
      btnSubmit: "Submit Reply Slip",
      btnSending: "Sending...",
      
      alertSuccess: "Your appointment and catalog request have been submitted successfully! The Fenix engineering team will get in touch with you shortly.",
      alertError: "Submission failed. Please contact the Fenix representative directly via phone or official channels.",
      copyright: "Fenix Enterprise Co., Ltd. All Rights Reserved. © 2026"
    }
  };

  const t = dict[lang];

  // 處理複選框需求項目的變動
  const handleCheckboxChange = (demand: string) => {
    setSelectedDemands(prev => 
      prev.includes(demand) ? prev.filter(item => item !== demand) : [...prev, demand]
    );
  };

  // 捷徑：一鍵加入 Google 行事曆
  const handleAddToCalendar = () => {
    const eventTitle = encodeURIComponent("2026 亞洲美容保養．生技保健大展 | 恒達机械 K202");
    const eventDates = "20260716T020000Z/20260719T100000Z"; 
    const eventDetails = encodeURIComponent("展位編號：K202 (恒達机械)。現場展示頂尖軟膠囊製造技術與核心模具工藝，Fenix 團隊提供全程現場技術支援。");
    const eventLocation = encodeURIComponent("台北南港展覽館 1 館 1 樓 (國外廠商區), 115台北市南港區經貿二路1號");
    
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${eventTitle}&dates=${eventDates}&details=${eventDetails}&location=${eventLocation}`;
    window.open(googleCalendarUrl, '_blank');
  };

  // 寄送展覽預約信件邏輯
  const sendBioAsiaEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setStatus("sending");

    const SERVICE_ID = "service_x4hiwml"; 
    const TEMPLATE_ID = "template_12mz6a4"; 
    const PUBLIC_KEY = "p5QMMQNx4Xd4Dwt58";

    const formData = new FormData(formRef.current);
    const companyName = formData.get('company_name') as string || (lang === 'en' ? 'Not specified' : '無特別填寫');
    const userName = formData.get('user_name') as string;
    const userPhone = formData.get('user_phone') as string || (lang === 'en' ? 'Not specified' : '無特別填寫');
    const userEmail = formData.get('user_email') as string;
    const customMemo = formData.get('custom_memo') as string || (lang === 'en' ? 'No custom notes' : '無特別填寫備註');

    // 依據目前填寫語系組裝對應的 message 格式
    const demandsText = selectedDemands.length > 0 
      ? (lang === 'en' ? `[Selected Demands]:\n${selectedDemands.map(d => `- ${d}`).join('\n')}` : `【客戶勾選的需求項目】：\n${selectedDemands.map(d => `- ${d}`).join('\n')}`)
      : (lang === 'en' ? '[Selected Demands]: None selected' : '【客戶勾選的需求項目】：無特別勾選');
    
    const combinedMessage = lang === 'en'
      ? `★ This message is from [BIO ASIA TAIWAN 2026 Expo Page - English Form] ★\n\n${demandsText}\n\n[Specific Details / Memo]:\n${customMemo}`
      : `★ 本信件來自【2026 生技展覽專頁】預約表單 ★\n\n${demandsText}\n\n【具體需求或備註說明】：\n${customMemo}`;

    const templateParams = {
      company_name: companyName,
      user_name: userName,
      user_phone: userPhone,
      user_email: userEmail,
      message: combinedMessage, 
    };

    emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)
      .then(() => {
        setStatus("success");
        alert(t.alertSuccess);
        formRef.current?.reset();
        setSelectedDemands([]);
      }, (error) => {
        console.error("發送失敗:", error);
        setStatus("error");
        alert(t.alertError);
      });
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden">
        
        {/* Banner 標頭區 */}
        <div className="bg-gradient-to-r from-blue-900 to-slate-800 text-white px-8 py-12 text-center">
          <p className="text-teal-400 font-bold uppercase tracking-wider text-sm mb-2">{t.expoBadge}</p>
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-4">{t.mainTitle}</h1>
          <p className="text-xl text-slate-300 font-light">{t.subtitle}</p>
        </div>

        {/* 展會核心資訊 */}
        <div className="p-8 border-b border-slate-100">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
            <div className="p-4 bg-blue-50 rounded-xl flex flex-column justify-between flex-wrap">
              <div className="w-full">
                <h3 className="text-blue-900 font-bold mb-1">{t.card1Title}</h3>
                <p className="text-slate-700 font-semibold text-sm sm:text-base">{t.card1Date}</p>
                <p className="text-xs text-slate-500 mt-1 block">{t.card1Time}</p>
                <p className="text-xs text-orange-600 font-medium mt-0.5">{t.card1Note}</p>
              </div>
              <button 
                onClick={handleAddToCalendar} 
                className="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-2 px-3 rounded-lg transition-colors"
              >
                {t.card1Btn}
              </button>
            </div>
            
            <div className="p-4 bg-blue-50 rounded-xl">
              <h3 className="text-blue-900 font-bold mb-1">{t.card2Title}</h3>
              <p className="text-slate-700 font-semibold">{t.card2Venue}</p>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">{t.card2Addr}</p>
            </div>
            
            <div className="p-4 bg-orange-50 rounded-xl border border-orange-200">
              <h3 className="text-orange-700 font-bold mb-1">{t.card3Title}</h3>
              <p className="text-xl font-black text-orange-600">{t.card3Booth}</p>
              <p className="text-xs text-slate-500 mt-1">{t.card3Welcome}</p>
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
              {t.ticketBtn}
            </a>
            <p className="text-slate-400 text-xs mt-2">{t.ticketNote}</p>
          </div>
        </div>

        {/* 平面圖標示與尋找指南 */}
        <div className="p-8 bg-slate-50 border-b border-slate-100">
          <h2 className="text-xl font-bold text-slate-800 mb-3 flex items-center gap-2">
            🗺️ {t.guideTitle}
          </h2>
          <p className="text-slate-600 text-sm leading-relaxed mb-4">
            {t.guideDesc}
          </p>
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
            <h4 className="font-bold text-slate-800 text-sm mb-2 text-center md:text-left">{t.guideTipTitle}</h4>
            <ul className="text-xs text-slate-600 space-y-2 list-disc pl-4 leading-relaxed">
              <li>{t.guideTip1}</li>
              <li>{t.guideTip2}</li>
              <li>{t.guideTip3}</li>
            </ul>
            <div className="mt-4 text-center md:text-left">
              <a 
                href="https://www.chanchao.com.tw/exhibitionfiles/floorplan/large/DMCB2026_0.jpg" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center text-xs font-bold text-blue-600 hover:text-blue-800 hover:underline gap-1"
              >
                {t.guideLink}
              </a>
            </div>
          </div>
        </div>

        {/* 參展焦點亮點說明 */}
        <div className="p-8 space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-800 mb-4 border-l-4 border-blue-900 pl-3">{t.focusTitle}</h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              {t.focusDesc}
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="border border-slate-200 rounded-xl p-5 hover:border-blue-500 transition-colors bg-white shadow-sm">
                <span className="text-2xl mb-2 block">⚙️</span>
                <h4 className="font-bold text-slate-800 mb-2">{t.bento1Title}</h4>
                <p className="text-slate-600 text-sm leading-relaxed mb-3">{t.bento1Desc}</p>
                <ul className="text-xs text-slate-500 space-y-1 list-disc pl-4 border-t border-slate-100 pt-2.5">
                  <li>{t.bento1Item1}</li>
                  <li>{t.bento1Item2}</li>
                  <li>{t.bento1Item3}</li>
                </ul>
              </div>
              
              <div className="border border-slate-200 rounded-xl p-5 hover:border-blue-500 transition-colors bg-white shadow-sm">
                <span className="text-2xl mb-2 block">📐</span>
                <h4 className="font-bold text-slate-800 mb-2">{t.bento2Title}</h4>
                <p className="text-slate-600 text-sm leading-relaxed mb-3">{t.bento2Desc}</p>
                <ul className="text-xs text-slate-500 space-y-1 list-disc pl-4 border-t border-slate-100 pt-2.5">
                  <li>{t.bento2Item1}</li>
                  <li>{t.bento2Item2}</li>
                  <li>{t.bento2Item3}</li>
                </ul>
              </div>
            </div>
          </div>

          {/* 專業問答 FAQ 區塊 */}
          <div className="border-t border-slate-100 pt-6">
            <h3 className="text-base font-bold text-slate-800 mb-3 flex items-center gap-1.5">
              <span className="text-blue-900">💡</span> {t.faqSectionTitle}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-600 leading-relaxed">
              <div className="bg-slate-50/50 p-3.5 rounded-xl border border-slate-100">
                <p className="font-bold text-slate-800 mb-1">{t.faq1Q}</p>
                <p className="text-slate-500">{t.faq1A}</p>
              </div>
              <div className="bg-slate-50/50 p-3.5 rounded-xl border border-slate-100">
                <p className="font-bold text-slate-800 mb-1">{t.faq2Q}</p>
                <p className="text-slate-500">{t.faq2A}</p>
              </div>
            </div>
          </div>

          {/* 商務回函表單區塊 */}
          <div className="max-w-2xl mx-auto bg-white border border-slate-200/80 rounded-2xl shadow-md p-6 sm:p-8 relative">
            
            {/* 右上角商務回條標籤 */}
            <div className="absolute top-4 right-6 text-slate-300 text-xs tracking-widest uppercase select-none hidden sm:block">
              {lang === 'en' ? 'Reply Slip / Inquiry' : 'Reply Slip / 參展回函'}
            </div>

            <div className="text-center mb-6">
              <h2 className="text-xl font-bold text-slate-800 tracking-tight">{t.formTitle}</h2>
              <p className="text-slate-400 text-xs mt-1">{t.formSub}</p>
            </div>
            
            <form ref={formRef} onSubmit={sendBioAsiaEmail} className="space-y-4">

              {/* 回函選項 */}
              <div>
                <span className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wider">{t.formReasonTitle}</span>
                <div className="grid grid-cols-1 gap-2">
                  
                  <label className={`flex items-center text-xs font-medium rounded-lg px-4 py-2.5 border transition-all cursor-pointer select-none ${
                    selectedDemands.includes(t.formReason1)
                      ? "bg-blue-50 text-blue-900 border-blue-400 font-semibold"
                      : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                  }`}>
                    <input 
                      type="checkbox" 
                      checked={selectedDemands.includes(t.formReason1)} 
                      onChange={() => handleCheckboxChange(t.formReason1)} 
                      className="rounded border-slate-300 text-blue-900 mr-2.5 h-4 w-4 focus:ring-0 focus:ring-offset-0" 
                    /> 
                    <span>{t.formReason1Label}</span>
                  </label>

                  <label className={`flex items-center text-xs font-medium rounded-lg px-4 py-2.5 border transition-all cursor-pointer select-none ${
                    selectedDemands.includes(t.formReason2)
                      ? "bg-blue-50 text-blue-900 border-blue-400 font-semibold"
                      : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                  }`}>
                    <input 
                      type="checkbox" 
                      checked={selectedDemands.includes(t.formReason2)} 
                      onChange={() => handleCheckboxChange(t.formReason2)} 
                      className="rounded border-slate-300 text-blue-900 mr-2.5 h-4 w-4 focus:ring-0 focus:ring-offset-0" 
                    /> 
                    <span>{t.formReason2Label}</span>
                  </label>

                  <label className={`flex items-center text-xs font-medium rounded-lg px-4 py-2.5 border transition-all cursor-pointer select-none ${
                    selectedDemands.includes(t.formReason3)
                      ? "bg-blue-50 text-blue-900 border-blue-400 font-semibold"
                      : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                  }`}>
                    <input 
                      type="checkbox" 
                      checked={selectedDemands.includes(t.formReason3)} 
                      onChange={() => handleCheckboxChange(t.formReason3)} 
                      className="rounded border-slate-300 text-blue-900 mr-2.5 h-4 w-4 focus:ring-0 focus:ring-offset-0" 
                    /> 
                    <span>{t.formReason3Label}</span>
                  </label>

                </div>
              </div>

              {/* 貴賓聯絡資料 */}
              <div className="pt-2 border-t border-slate-100">
                <span className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wider">{t.formGuestTitle}</span>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <input 
                      type="text" 
                      name="company_name" 
                      placeholder={t.phCompany}
                      className="w-full border border-slate-200 rounded-lg p-2.5 bg-white text-sm text-slate-800 placeholder-slate-400 outline-none focus:border-blue-500 transition-all" 
                    />
                  </div>
                  <div>
                    <input 
                      type="text" 
                      name="user_name" 
                      required 
                      placeholder={t.phName}
                      className="w-full border border-slate-200 rounded-lg p-2.5 bg-white text-sm text-slate-800 placeholder-slate-400 outline-none focus:border-blue-500 transition-all" 
                    />
                  </div>
                  <div>
                    <input 
                      type="tel" 
                      name="user_phone" 
                      placeholder={t.phPhone}
                      className="w-full border border-slate-200 rounded-lg p-2.5 bg-white text-sm text-slate-800 placeholder-slate-400 outline-none focus:border-blue-500 transition-all" 
                    />
                  </div>
                  <div>
                    <input 
                      type="email" 
                      name="user_email" 
                      required 
                      placeholder={t.phEmail}
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
                  placeholder={t.phMemo}
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
                  {status === "sending" ? t.btnSending : t.btnSubmit}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* 頁尾 */}
        <div className="bg-slate-100 px-8 py-4 text-center text-xs text-slate-500">
          {t.copyright}
        </div>
      </div>
    </div>
  );
}

// 用 Suspense 包裹，確保 Next.js 在 build 階段不會因為 searchParams 出現錯誤
export default function BioAsiaClient() {
  return (
    <Suspense fallback={<div className="text-center py-20 text-slate-500">Loading...</div>}>
      <BioAsiaClientContent />
    </Suspense>
  );
}