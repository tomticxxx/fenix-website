import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";

// 1. 引入組件
import Navbar from "../components/Navbar";
import Footer from "../components/Footer"; // 👈 新增：引入 Footer 組件
import FloatingConcierge from "../components/FloatingConcierge";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// 網站元數據設定
export const metadata: Metadata = {
  title: "元堉企業 FENIX ENTERPRISE | 專業製藥與彩妝設備領航者",
  description: "代理日、韓、中頂尖製藥與彩妝設備。憑藉 EE 電機電子背景，提供從軟膠囊製造、高精度檢重到自動化產線的專業技術服務。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW" suppressHydrationWarning>
      <head>
        {/* Crisp 客服系統初始化腳本 */}
        <Script id="crisp-widget" strategy="afterInteractive">
          {`
            window.$crisp = [];
            window.CRISP_WEBSITE_ID = "c24d6fbe-1fb1-41cb-93fd-bf0627423053"; 
            (function() {
              var d = document;
              var s = d.createElement("script");
              s.src = "https://client.crisp.chat/l.js";
              s.async = 1;
              d.getElementsByTagName("head")[0].appendChild(s);
            })();
            // 隱藏 Crisp 原生按鈕，交由 Alex 組件控制
            $crisp.push(['do', 'chat:hide']);
          `}
        </Script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-sans`}
      >
        {/* 導覽列 */}
        <Navbar />
        
        {/* 頁面主要內容 */}
        <main className="min-h-screen">
          {children}
        </main>

        {/* 底部資訊欄 - 放置在內容之後 */}
        <Footer /> 

        {/* 人工客服引導組件 */}
        <FloatingConcierge />
      </body>
    </html>
  );
}