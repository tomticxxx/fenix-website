import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
// @ts-ignore：強制跳過 CSS 檔案的型別宣告檢查，徹底消除 TS(2882) 紅字
import "./globals.css";
import Script from "next/script";

// 引入組件
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FloatingConcierge from "../components/FloatingConcierge";
import ClientLayoutWrapper from "../components/ClientLayoutWrapper";
// 引入展覽彈出視窗組件
import BioAsiaPopup from "../components/BioAsiaPopup";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// 網站元數據設定 (Server Component 專屬，確保 Google 搜尋正常)
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
            $crisp.push(['do', 'chat:hide']);
          `}
        </Script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-sans`}
      >
        {/* 將 Navbar/Footer 作為 Props 傳入 Wrapper，由 Wrapper 決定是否顯示 */}
        <ClientLayoutWrapper 
          navbar={<Navbar />} 
          footer={<Footer />} 
          concierge={<FloatingConcierge />}
        >
          <main className="min-h-screen">
            {children}
            
            {/* 塞在 main 裡面、children 的最下方，確保百分之百被載入並執行 */}
            <BioAsiaPopup />
          </main>
        </ClientLayoutWrapper>
      </body>
    </html>
  );
}