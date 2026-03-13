"use client";

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import emailjs from '@emailjs/browser';

export default function ContactPage() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState("");
  const address = "106台北市大安區忠孝東路四段169號12樓之4";

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    // ======================================================
    // 💡 提醒：請記得將下方的 TEMPLATE_ID 與 PUBLIC_KEY 填入
    // ======================================================
    const SERVICE_ID = "service_x4hiwml"; 
    const TEMPLATE_ID = "template_12mz6a4"; 
    const PUBLIC_KEY = "p5QMMQNx4Xd4Dwt58";
    // ======================================================

    if (formRef.current) {
      emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY)
        .then(() => {
          setStatus("success");
          alert("詢價信已成功發送！我們會儘速聯繫您。");
          formRef.current?.reset();
        }, (error) => {
          console.error("發送失敗:", error);
          setStatus("error");
          alert("發送失敗，請直接使用 LINE 或電話聯繫。");
        });
    }
  };

  const contactMethods = [
    { 
      icon: "📍", 
      title: "台北總部", 
      details: [address], 
      action: "地圖導航", 
      link: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}` 
    },
    { 
      icon: "📞", 
      title: "電話聯繫", 
      details: ["(02) 2751-2786", "週一至週五 09:00-18:00"], 
      action: "立即撥打", 
      link: "tel:0227512786" 
    },
    { 
      icon: "💬", 
      title: "LINE 詢問", 
      details: ["ID: @tomticxxx", "專業技術窗口"], 
      action: "加入好友", 
      link: "https://line.me/ti/p/~tomticxxx" 
    },
    { 
      icon: "✉️", 
      title: "電子郵件", 
      details: ["fenixco@gmail.com", "24h 內回覆"], 
      action: "發送郵件", 
      link: "mailto:fenixco@gmail.com" 
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-16 px-4 relative overflow-hidden">
      {/* 背景裝飾 Logo (需確保 public/logo.png 存在) */}
      <div className="absolute -right-20 -bottom-20 w-[600px] h-[600px] opacity-[0.03] animate-blob pointer-events-none">
        <Image src="/logo.png" alt="" fill className="object-contain" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* 標題區 */}
        <div className="text-center mb-16 animate-fadeInDown">
          <h1 className="text-5xl font-black text-slate-900 mb-4">
            聯絡我們 <span className="text-blue-600">Contact</span>
          </h1>
          <div className="w-20 h-1.5 bg-blue-600 mx-auto rounded-full"></div>
        </div>

        {/* 聯絡快捷卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {contactMethods.map((method, index) => (
            <a 
              key={index} 
              href={method.link} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="group bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all animate-fadeInUp"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="text-4xl mb-4 text-center group-hover:animate-bounce">{method.icon}</div>
              <h3 className="font-bold text-slate-800 text-center mb-4 text-lg">{method.title}</h3>
              <div className="text-slate-500 text-sm text-center leading-relaxed min-h-[48px]">
                {method.details.map((text, idx) => <p key={idx}>{text}</p>)}
              </div>
              <span className="block mt-6 w-full py-2 rounded-xl bg-slate-50 text-slate-700 text-xs font-black group-hover:bg-blue-600 group-hover:text-white transition-all text-center uppercase tracking-widest">
                {method.action}
              </span>
            </a>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* 左側地圖：精確圖標標註 */}
          <div className="h-[500px] rounded-[2.5rem] overflow-hidden border-8 border-white shadow-xl">
            <iframe 
              src={`https://maps.google.com/maps?q=${encodeURIComponent(address)}&t=&z=16&ie=UTF8&iwloc=&output=embed`}
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy"
              className="grayscale hover:grayscale-0 transition-all duration-700"
            ></iframe>
          </div>

          {/* 右側詢價表單 */}
          <div className="bg-white rounded-[2.5rem] p-10 shadow-xl border border-slate-100">
            <h2 className="text-3xl font-bold mb-2 text-slate-800 tracking-tight">快速詢價表單</h2>
            <p className="text-slate-500 mb-8">請留下您的需求，元堉 EE 技術團隊將竭誠為您服務。</p>
            
            <form ref={formRef} onSubmit={sendEmail} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" name="user_name" placeholder="您的姓名 *" required className="w-full px-5 py-3 rounded-xl bg-slate-50 border border-slate-200 outline-none focus:border-blue-500 transition-all" />
                <input type="text" name="company_name" placeholder="公司名稱" className="w-full px-5 py-3 rounded-xl bg-slate-50 border border-slate-200 outline-none focus:border-blue-500 transition-all" />
              </div>
              <input type="email" name="user_email" placeholder="電子郵件 *" required className="w-full px-5 py-3 rounded-xl bg-slate-50 border border-slate-200 outline-none focus:border-blue-500 transition-all" />
              <input type="tel" name="user_phone" placeholder="聯絡電話" className="w-full px-5 py-3 rounded-xl bg-slate-50 border border-slate-200 outline-none focus:border-blue-500 transition-all" />
              <textarea name="message" placeholder="請描述您的設備需求（型號、產能或諮詢項目）" rows={4} required className="w-full px-5 py-3 rounded-xl bg-slate-50 border border-slate-200 outline-none focus:border-blue-500 transition-all resize-none"></textarea>
              
              <button 
                type="submit" 
                disabled={status === "sending"}
                className={`w-full py-4 rounded-xl font-bold text-white transition-all ${status === "sending" ? "bg-slate-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-200 active:scale-[0.98]"}`}
              >
                {status === "sending" ? "處理中..." : "確認送出詢問單"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}