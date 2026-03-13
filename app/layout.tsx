import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// 1. 引入導覽列組件
import Navbar from "../components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// 2. 修改網站顯示的名稱與描述 (SEO基礎)
export const metadata: Metadata = {
  title: "元堉企業 FENIX ENTERPRISE | 專業製藥設備供應商",
  description: "代理 SKY SOFTGEL 等各類軟膠囊製造機與重量選別設備",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // 3. 加入 suppressHydrationWarning 解決 Bybit 插件報錯
    <html lang="zh-TW" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* 4. 把 Navbar 放在最上面，這樣每個分頁都會看到它 */}
        <Navbar />
        
        {/* 頁面主要內容 */}
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}