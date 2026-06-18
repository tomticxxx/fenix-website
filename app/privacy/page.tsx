import React from 'react';
import Link from 'next/link';

export default function PrivacyPage() {
  const sections = [
    {
      title: "一、個資蒐集之目的與類別",
      content: "當您使用本網站之「聯絡我們」、「快速詢價」或「AI 設備搜尋」等功能時，我們會請您提供姓名、公司名稱、職稱、電子郵件、聯絡電話及詢價需求。其目的用於進行精準設備報價、技術資料提供、確認代理授權範圍，以及針對您的工藝需求進行後續技術諮詢與售後服務。"
    },
    {
      title: "二、個資之利用期間、地區及對象",
      content: "本公司蒐集之個資僅於提供服務之必要期間內，於台灣地區及本公司商業合作之國外原廠設備製造商所在地（進行跨境技術諮詢與客製化設備評估時）進行必要之業務聯繫。本公司保留審核詢價資訊之權利，並得拒絕提供不實或惡意查詢之報價資料。"
    },
    {
      title: "三、個資之保護與安全管理",
      content: "本公司僅由獲授權之技術與業務人員處理您的資料，嚴禁非經授權之存取。除非取得您的同意、因業務必要提供予國外原廠、或法令另有規定，本公司絕不會將您的個資任意提供、交換、或出售給其他無關之第三人、團體或私人企業。"
    },
    {
      title: "四、行使個資當事人權利之方式",
      content: "依據個資法第3條規定，您就本公司保有之個人資料，享有查詢、閱覽、製給複製本、補充、更正、停止蒐集處理利用、或請求刪除之權利。若您欲行使上述權利，得隨時透過本網站之聯絡信箱或電話與本公司聯繫，我們將依法儘速處理。"
    },
    {
      title: "五、Cookie 之使用",
      content: "為了提供您最佳的網頁瀏覽與 AI 設備搜尋體驗，本網站會在您的電腦中放置並取用我們的 Cookie。若您不願接受 Cookie 的寫入，您可在您使用的瀏覽器功能項中設定隱私權等級為高，即可拒絕 Cookie 的寫入，但可能會導致網站某些優化功能或詢價系統無法正常執行。"
    },
    {
      title: "六、隱私權保護政策之修正",
      content: "本網站隱私權保護政策將因應國內法規變更及網站功能升級需求隨時進行修正，修正後的條款將直接刊登於本網頁上，不另行個別通知。"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-16 md:py-24 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto bg-white p-8 sm:p-12 md:p-16 rounded-3xl shadow-sm border border-slate-100">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight mb-2">隱私權保護政策</h1>
        <p className="text-slate-400 text-xs sm:text-sm mb-10 uppercase tracking-widest font-mono">Privacy Policy</p>
        
        <div className="space-y-10">
          <p className="text-slate-600 leading-relaxed text-sm md:text-base">
            元堉企業有限公司（以下簡稱本公司）非常重視您的隱私權。為了讓您能夠安心使用本網站的各項服務、客製化詢價與資訊系統，特此向您說明本網站的隱私權保護政策，以保障您的合法權益：
          </p>

          {sections.map((section, index) => (
            <section key={index} className="space-y-3">
              <h2 className="text-base md:text-lg font-bold text-slate-800 flex items-center gap-3">
                <span className="w-1.5 h-5 bg-blue-600 rounded-full shrink-0"></span>
                {section.title}
              </h2>
              <p className="text-slate-600 leading-relaxed pl-4.5 text-sm md:text-base text-justify">
                {section.content}
              </p>
            </section>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
          <Link href="/" className="text-blue-600 font-medium hover:text-blue-700 hover:underline text-sm transition-colors">
            ← 回首頁
          </Link>
          <p className="text-slate-400 text-xs font-mono">最後更新日期：2026 年 6 月</p>
        </div>
      </div>
    </div>
  );
}