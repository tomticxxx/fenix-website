import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// 1. 引入導覽列組件
import Navbar from "../components/Navbar";
// 2. 引入新的人工客服組件 (請確保你已建立 components/FloatingConcierge.tsx)
import FloatingConcierge from "../components/FloatingConcierge";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// 3. 修改網站顯示的名稱與描述 (加入 EE 背景等關鍵字，提升專業感)
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
    // 4. 加入 suppressHydrationWarning 解決插件報錯
    <html lang="zh-TW" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-sans`}
      >
        {/* 5. 把 Navbar 放在最上面，這樣每個分頁都會看到它 */}
        <Navbar />
        
        {/* 頁面主要內容 */}
        <main className="min-h-screen">
          {children}
        </main>

        {/* 6. 加入人工客服引導組件，放置在 main 之外確保 z-index 層級最高 */}
        <FloatingConcierge />
      </body>
    </html>
  );
}