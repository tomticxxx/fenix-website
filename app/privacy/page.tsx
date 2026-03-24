"use client";

import React from 'react';
import Link from 'next/link';

export default function PrivacyPage() {
  const sections = [
    {
      title: "一、個資蒐集之目的",
      content: "當您使用本網站之「聯絡我們」、「快速詢價」或「AI 設備搜尋」等功能時，我們會請您提供姓名、公司名稱、電子郵件及聯絡電話。其目的僅用於進行設備報價、技術資料提供，以及針對您的需求進行後續技術諮詢服務。"
    },
    {
      title: "二、個資之保護與管理",
      content: "本公司僅由獲授權之技術與業務人員處理您的資料，嚴禁非經授權之存取。除非取得您的同意或法令另有規定，本公司絕不會將您的個資提供、交換、或出售給其他個人、團體、私人企業或公務機關。"
    },
    {
      title: "三、Cookie 之使用",
      content: "為了提供您最佳的服務，本網站會在您的電腦中放置並取用我們的 Cookie，若您不願接受 Cookie 的寫入，您可在您使用的瀏覽器功能項中設定隱私權等級為高，即可拒絕 Cookie 的寫入，但可能會導致網站某些功能無法正常執行。"
    },
    {
      title: "四、隱私權保護政策之修正",
      content: "本網站隱私權保護政策將因應需求隨時進行修正，修正後的條款將刊登於網站上，不另行個別通知。"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-20 px-6">
      <div className="max-w-3xl mx-auto bg-white p-10 md:p-16 rounded-[2.5rem] shadow-sm border border-slate-100">
        <h1 className="text-3xl font-black text-slate-900 mb-2">隱私權保護政策</h1>
        <p className="text-slate-400 text-sm mb-10 uppercase tracking-widest">Privacy Policy</p>
        
        <div className="space-y-10">
          <p className="text-slate-600 leading-relaxed">
            元堉企業有限公司（以下簡稱本公司）非常重視您的隱私權。為了讓您能夠安心使用本網站的各項服務與資訊，特此向您說明本網站的隱私權保護政策，以保障您的權益：
          </p>

          {sections.map((section, index) => (
            <section key={index} className="space-y-4">
              <h2 className="text-lg font-bold text-slate-800 flex items-center gap-3">
                <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
                {section.title}
              </h2>
              <p className="text-slate-600 leading-loose pl-5 text-sm md:text-base">
                {section.content}
              </p>
            </section>
          ))}
        </div>

        <div className="mt-16 pt-10 border-t border-slate-100 flex justify-between items-center">
          <Link href="/" className="text-blue-600 font-bold hover:underline text-sm">
            ← 回首頁
          </Link>
          <p className="text-slate-400 text-xs">最後更新日期：2026 年 3 月</p>
        </div>
      </div>
    </div>
  );
}