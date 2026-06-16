'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation'; // 引入 Next.js 路由勾子，精準控管首頁

export default function BioAsiaPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname(); // 取得當前網址路徑

  useEffect(() => {
    // 確保程式碼只在客戶端（瀏覽器）執行，避免 Next.js Hydration 錯誤
    setMounted(true);

    // 1. 設定下線時間：2026年7月20日 00:00:00
    const expiryDate = new Date('2026-07-20T00:00:00').getTime();
    const now = new Date().getTime();

    // 如果時間已經超過 7/20，直接結束，什麼都不做
    if (now > expiryDate) return;

    // 2. 路由與高頻率跳出邏輯
    // 拔除 24 小時 localStorage 限制，改為：只要是首頁，每次進來或重新整理就絕對跳出
    if (pathname === '/') {
      // 延遲 3 秒優雅跳出
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 3000);

      return () => clearTimeout(timer);
    } else {
      // 如果不是首頁（客戶點去其他產品或內頁），強制關閉並不跳出
      setIsOpen(false);
    }
  }, [pathname]); // 當網址路徑改變時（使用者切換頁面），重新執行檢查

  const handleClose = () => {
    // 單純關閉視窗，不寫入任何快取紀錄，確保下次進首頁還能繼續彈出
    setIsOpen(false);
  };

  // 如果尚未在客戶端掛載，或狀態為關閉，則不渲染任何 DOM
  if (!mounted || !isOpen) return null;

  return (
    <div style={styles.overlay} onClick={(e) => e.target === e.currentTarget && handleClose()}>
      <div style={styles.content}>
        {/* 關閉按鈕 */}
        <button style={styles.closeBtn} onClick={handleClose}>&times;</button>
        
        {/* 邀請函標頭與英文商務引導 */}
        <div style={styles.tag}>2026 亞洲美容保養．生技保健大展</div>
        <div style={styles.enTag}>Schedule a Meeting & Request Catalog</div>
        
        <h2 style={styles.title}>恆達機械 (Hedagel) 盛大參展</h2>
        <h3 style={styles.subtitle}>Fenix 團隊現場技術支援</h3>
        
        <hr style={styles.divider} />
        
        {/* 核心資訊方框 */}
        <div style={styles.infoBox}>
          <p style={styles.infoText}><strong>📅 日期：</strong>2026 / 7 / 16 (四) - 7 / 19 (日)</p>
          <p style={styles.infoText}><strong>📍 地點：</strong>台北南港展覽館 1 館 1 樓（國外廠商區）</p>
          <p style={{ ...styles.infoText, ...styles.highlight }}><strong>🔥 展位編號：K202 (恒達机械)</strong></p>
        </div>
        
        {/* 說明文字 */}
        <p style={styles.desc}>
          現場將展示國際領先的軟膠囊製造技術，並精選實機與核心模具工藝。Fenix 技術團隊將全程駐點，為台灣地區客戶提供最即時的銷售諮詢與在地售後服務。
        </p>
        
        {/* 行動呼籲按鈕 */}
        <a href="/bio-asia-2026" style={styles.btn}>
          預約現場洽談 ／ 索取最新型錄
        </a>
      </div>
    </div>
  );
}

// 嚴格遵循 React.CSSProperties 型別規範的樣式表
const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    zIndex: 99999,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  } as React.CSSProperties,
  content: {
    backgroundColor: '#ffffff',
    padding: '30px',
    borderRadius: '12px',
    width: '90%',
    maxWidth: '500px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
    position: 'relative',
    textAlign: 'center',
  } as React.CSSProperties,
  closeBtn: {
    position: 'absolute',
    top: '10px',
    right: '20px',
    background: 'none',
    border: 'none',
    fontSize: '28px',
    cursor: 'pointer',
    color: '#999',
  } as React.CSSProperties,
  tag: {
    fontSize: '14px',
    color: '#008080',
    fontWeight: 'bold',
    marginBottom: '2px',
  } as React.CSSProperties,
  enTag: {
    fontSize: '11px',
    color: '#64748b',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    marginBottom: '10px',
  } as React.CSSProperties,
  title: {
    fontSize: '24px',
    color: '#1a2b4c',
    margin: '0 0 5px 0',
    fontWeight: 'bold',
  } as React.CSSProperties,
  subtitle: {
    fontSize: '18px',
    color: '#555',
    margin: '0 0 15px 0',
  } as React.CSSProperties,
  divider: {
    border: 0,
    borderTop: '1px solid #eee',
    margin: '15px 0',
  } as React.CSSProperties,
  infoBox: {
    backgroundColor: '#f4f7f9',
    padding: '15px',
    borderRadius: '8px',
    textAlign: 'left',
    marginBottom: '15px',
  } as React.CSSProperties,
  infoText: {
    margin: '6px 0',
    fontSize: '15px',
    color: '#333',
  } as React.CSSProperties,
  highlight: {
    color: '#ff6600',
  } as React.CSSProperties,
  desc: {
    fontSize: '14px',
    color: '#666',
    lineHeight: '1.6',
    marginBottom: '25px',
    textAlign: 'justify',
  } as React.CSSProperties,
  btn: {
    display: 'block',
    backgroundColor: '#ff6600',
    color: '#fff',
    textDecoration: 'none',
    padding: '12px 20px',
    borderRadius: '6px',
    fontWeight: 'bold',
    textAlign: 'center',
  } as React.CSSProperties,
};