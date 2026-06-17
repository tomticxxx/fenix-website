'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function BioAsiaPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  // 響應式視窗寬度狀態
  const [windowWidth, setWindowWidth] = useState(1200);

  // 獨立控制左右按鈕與關閉鍵的懸停狀態（Hover）
  const [isBtnHoveredZh, setIsBtnHoveredZh] = useState(false);
  const [isBtnHoveredEn, setIsBtnHoveredEn] = useState(false);
  const [isCloseHovered, setIsCloseHovered] = useState(false);

  useEffect(() => {
    setMounted(true);

    // 處理客戶端視窗尺寸監聽
    if (typeof window !== 'undefined') {
      setWindowWidth(window.innerWidth);
      const handleResize = () => setWindowWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  useEffect(() => {
    // 設定下線時間：2026年7月20日 00:00:00
    const expiryDate = new Date('2026-07-20T00:00:00').getTime();
    const now = new Date().getTime();

    if (now > expiryDate) return;

    // 路由高頻跳出邏輯：僅在首頁彈出
    if (pathname === '/') {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 3000);

      return () => clearTimeout(timer);
    } else {
      setIsOpen(false);
    }
  }, [pathname]);

  // 行事曆快捷加入觸發器（點擊直接帶入大展與展位資訊）
  const handleAddToCalendar = (e: React.MouseEvent) => {
    e.stopPropagation(); // 防止點擊觸發 overlay 關閉
    
    const eventTitle = encodeURIComponent("2026 亞洲美容保養．生技保健大展 | 恆達機械 K202");
    const eventDates = "20260716T020000Z/20260719T100000Z"; // UTC時間（對應台灣 10:00 - 18:00）
    const eventDetails = encodeURIComponent("展位編號：K202 (恆達機械)。現場展示頂尖軟膠囊製造技術與核心模具工藝，Fenix 團隊提供全程現場技術支援。");
    const eventLocation = encodeURIComponent("台北南港展覽館 1 館 1 樓 (國外廠商區), 115台北市南港區經貿二路1號");
    
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${eventTitle}&dates=${eventDates}&details=${eventDetails}&location=${eventLocation}`;
    
    window.open(googleCalendarUrl, '_blank');
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  if (!mounted || !isOpen) return null;

  // 判斷是否為手機/行動裝置尺寸（斷點設為 768px）
  const isMobile = windowWidth < 768;

  return (
    <div style={styles.overlay} onClick={(e) => e.target === e.currentTarget && handleClose()}>
      <div 
        style={{
          ...styles.cardContainer,
          flexDirection: isMobile ? 'column' : 'row', // 手機版改為上下堆疊
          maxHeight: isMobile ? '85vh' : '92vh',
          borderRadius: isMobile ? '20px' : '28px'
        }}
      >
        
        {/* 頂級極簡圓形關閉按鈕 */}
        <button 
          style={{
            ...styles.closeBtn,
            top: isMobile ? '12px' : '18px',
            right: isMobile ? '14px' : '20px',
            color: isCloseHovered ? '#0f172a' : '#94a3b8',
            backgroundColor: isCloseHovered ? '#e2e8f0' : '#f1f5f9',
            transform: isCloseHovered ? 'rotate(90deg) scale(1.05)' : 'rotate(0deg) scale(1)'
          }} 
          onClick={handleClose}
          onMouseEnter={() => setIsCloseHovered(true)}
          onMouseLeave={() => setIsCloseHovered(false)}
        >
          &times;
        </button>

        {/* ==================== 左半面：中文卡片 ==================== */}
        <div style={{ ...styles.panel, padding: isMobile ? '32px 24px 20px 24px' : '44px 40px' }}>
          <div>
            <div style={styles.tag}>2026 亞洲美容保養．生技保健大展</div>
            <h2 style={{ ...styles.title, fontSize: isMobile ? '20px' : '23px' }}>恆達機械 (Hedagel) 盛大參展</h2>
            <h3 style={styles.subtitle}>Fenix 團隊現場技術支援</h3>
            
            <div style={{ ...styles.infoBox, minHeight: isMobile ? 'auto' : '105px' }}>
              <div style={styles.infoRow}>
                <p style={styles.infoText}><strong>📅 日期：</strong>2026 / 7 / 16 (四) - 7 / 19 (日)</p>
                <button onClick={handleAddToCalendar} style={styles.calendarMiniBtn}>
                  🗓️ 加到行事曆
                </button>
              </div>
              <p style={styles.infoText}><strong>📍 地點：</strong>台北南港展覽館 1 館 1 樓 (國外廠商區)</p>
              <p style={{ ...styles.infoText, ...styles.highlight }}><strong>🔥 展位編號：K202 (恆達機械)</strong></p>
            </div>
            
            <p style={styles.desc}>
              現場將展示國際領先的軟膠囊製造技術，並精選實機與核心模具工藝。<strong>Fenix (元堉企業)</strong> 技術團隊將全程駐點，為台灣地區客戶提供最即時的銷售諮詢與在地售後服務。
            </p>
          </div>
          
          {/* 中文按鈕 */}
          <a 
            href="/bio-asia-2026?lang=zh" 
            style={{
              ...styles.btn,
              backgroundColor: isBtnHoveredZh ? '#e65c00' : '#ff6600',
              transform: isBtnHoveredZh ? 'translateY(-1px)' : 'translateY(0)',
              boxShadow: isBtnHoveredZh ? '0 6px 20px rgba(255, 102, 0, 0.35)' : '0 4px 12px rgba(255, 102, 0, 0.15)',
              fontSize: isMobile ? '13.5px' : '14.5px',
              padding: isMobile ? '12px 20px' : '14px 24px'
            }}
            onMouseEnter={() => setIsBtnHoveredZh(true)}
            onMouseLeave={() => setIsBtnHoveredZh(false)}
          >
            預約現場洽談 ／ 索取最新型錄 ➔
          </a>
        </div>

        {/* 中間邀請函對折虛擬線 */}
        <div 
          style={{
            ...styles.foldLine,
            borderLeft: isMobile ? 'none' : '1px dashed #cbd5e1',
            borderTop: isMobile ? '1px dashed #cbd5e1' : 'none',
            margin: isMobile ? '10px 24px' : '40px 0',
            height: isMobile ? '1px' : 'auto',
            width: isMobile ? 'auto' : '1px'
          }}
        >
          <span 
            style={{
              ...styles.foldBadge,
              transform: isMobile ? 'translate(-50%, -50%) scale(0.85)' : 'translate(-50%, -50%)',
              top: isMobile ? '0' : '50%',
              left: '50%'
            }}
          >
            BIO ASIA
          </span>
        </div>

        {/* ==================== 右半面：英文卡片 ==================== */}
        <div style={{ ...styles.panel, padding: isMobile ? '20px 24px 32px 24px' : '44px 40px' }}>
          <div>
            <div style={styles.tagEn}>BIO ASIA-TAIWAN 2026 EXPO</div>
            <h2 style={{ ...styles.titleEn, fontSize: isMobile ? '20px' : '23px' }}>Hedagel Grand Exhibition</h2>
            <h3 style={styles.subtitleEn}>On-site Technical Support by Fenix</h3>
            
            <div style={{ ...styles.infoBox, minHeight: isMobile ? 'auto' : '105px' }}>
              <div style={styles.infoRow}>
                <p style={styles.infoTextEn}><strong>📅 Date:</strong> July 16 (Thu) - 19 (Sun), 2026</p>
                <button onClick={handleAddToCalendar} style={styles.calendarMiniBtn}>
                  🗓️ Add to Calendar
                </button>
              </div>
              <p style={styles.infoTextEn}><strong>📍 Venue:</strong> TaiNEX 1, 1F (International Exhibitors Zone)</p>
              <p style={{ ...styles.infoTextEn, ...styles.highlightEn }}><strong>🔥 Booth No: K202 (Hedagel)</strong></p>
            </div>
            
            <p style={styles.descEn}>
              Discover our world-leading encapsulation technologies, high-precision tooling, and live machinery demonstrations. The <strong>Fenix Enterprise</strong> expert engineering team will be on-site to provide immediate technical consultations and comprehensive local support.
            </p>
          </div>
          
          {/* 英文按鈕 */}
          <a 
            href="/bio-asia-2026?lang=en" 
            style={{
              ...styles.btnEn,
              backgroundColor: isBtnHoveredEn ? '#e65c00' : '#ff6600',
              transform: isBtnHoveredEn ? 'translateY(-1px)' : 'translateY(0)',
              boxShadow: isBtnHoveredEn ? '0 6px 20px rgba(255, 102, 0, 0.35)' : '0 4px 12px rgba(255, 102, 0, 0.15)',
              fontSize: isMobile ? '13px' : '14px',
              padding: isMobile ? '12px 20px' : '14px 24px'
            }}
            onMouseEnter={() => setIsBtnHoveredEn(true)}
            onMouseLeave={() => setIsBtnHoveredEn(false)}
          >
            Book a Meeting / Request Catalog ➔
          </a>
        </div>

      </div>
    </div>
  );
}

// 全球領先 Bento 雙面卡片架構樣式表
const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(15, 23, 42, 0.75)', 
    backdropFilter: 'blur(8px)', 
    zIndex: 99999,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '16px', 
  } as React.CSSProperties,
  cardContainer: {
    backgroundColor: '#ffffff',
    width: '100%',
    maxWidth: '960px', 
    boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.3)',
    position: 'relative',
    display: 'flex',
    overflowY: 'auto',
  } as React.CSSProperties,
  closeBtn: {
    position: 'absolute',
    border: 'none',
    fontSize: '22px',
    cursor: 'pointer',
    width: '34px',
    height: '34px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    lineHeight: '1',
    zIndex: 10,
    transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
    outline: 'none',
  } as React.CSSProperties,
  
  panel: {
    flex: '1 1 420px', 
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between', 
    minWidth: '280px',
    boxSizing: 'border-box', // 防呆：確保 Padding 不會撐破寬度
  } as React.CSSProperties,

  foldLine: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    boxSizing: 'border-box',
  } as React.CSSProperties,
  foldBadge: {
    position: 'absolute',
    backgroundColor: '#ffffff',
    color: '#64748b',
    fontSize: '9px',
    fontWeight: '700',
    padding: '4px 10px',
    borderRadius: '20px',
    border: '1px solid #e2e8f0',
    letterSpacing: '0.12em',
    whiteSpace: 'nowrap',
  } as React.CSSProperties,

  // 中文區細部元素
  tag: {
    fontSize: '13px',
    color: '#ff6600', 
    fontWeight: '700',
    marginBottom: '8px',
    letterSpacing: '0.02em',
  } as React.CSSProperties,
  title: {
    color: '#0f172a',
    margin: '0 0 6px 0',
    fontWeight: '800',
    lineHeight: '1.35',
  } as React.CSSProperties,
  subtitle: {
    fontSize: '15px',
    color: '#475569',
    margin: '0 0 20px 0',
    fontWeight: '500',
  } as React.CSSProperties,

  // 英文區細部元素
  tagEn: {
    fontSize: '12px',
    color: '#ff6600', 
    fontWeight: '700',
    marginBottom: '8px',
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
  } as React.CSSProperties,
  titleEn: {
    color: '#0f172a',
    margin: '0 0 6px 0',
    fontWeight: '800',
    lineHeight: '1.35',
  } as React.CSSProperties,
  subtitleEn: {
    fontSize: '14px',
    color: '#475569',
    margin: '0 0 20px 0',
    fontWeight: '500',
  } as React.CSSProperties,

  // 資訊區
  infoBox: {
    backgroundColor: '#f8fafc',
    padding: '14px',
    borderRadius: '12px',
    textAlign: 'left',
    marginBottom: '20px',
    border: '1px solid #f1f5f9',
    boxSizing: 'border-box',
  } as React.CSSProperties,
  infoRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '6px',
  } as React.CSSProperties,
  calendarMiniBtn: {
    backgroundColor: '#ffffff',
    border: '1px solid #cbd5e1',
    borderRadius: '6px',
    padding: '3px 8px',
    fontSize: '11px',
    fontWeight: '600',
    color: '#475569',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    outline: 'none',
  } as React.CSSProperties,
  infoText: {
    margin: '4px 0',
    fontSize: '13px',
    color: '#334155',
    lineHeight: '1.5',
  } as React.CSSProperties,
  infoTextEn: {
    margin: '4px 0',
    fontSize: '12.5px',
    color: '#334155',
    lineHeight: '1.5',
  } as React.CSSProperties,
  highlight: {
    color: '#ff6600', 
    fontWeight: '800',
  } as React.CSSProperties,
  highlightEn: {
    color: '#ff6600',
    fontWeight: '800',
  } as React.CSSProperties,

  // 敘述區
  desc: {
    fontSize: '13px',
    color: '#475569',
    lineHeight: '1.75',
    marginBottom: '24px',
    textAlign: 'justify',
  } as React.CSSProperties,
  descEn: {
    fontSize: '12.5px',
    color: '#475569',
    lineHeight: '1.7',
    marginBottom: '24px',
    textAlign: 'justify',
  } as React.CSSProperties,

  // 中文按鈕樣式
  btn: {
    display: 'block',
    color: '#ffffff',
    textDecoration: 'none',
    borderRadius: '12px',
    fontWeight: '700',
    textAlign: 'center',
    transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
    letterSpacing: '0.02em',
  } as React.CSSProperties,
  
  // 英文按鈕樣式
  btnEn: {
    display: 'block',
    color: '#ffffff',
    textDecoration: 'none',
    borderRadius: '12px',
    fontWeight: '700',
    textAlign: 'center',
    transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
    letterSpacing: '0.01em',
  } as React.CSSProperties,
};