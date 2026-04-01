'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function TechPortalPage() {
  const [code, setCode] = useState('');
  const [status, setStatus] = useState('SYSTEM READY');
  const router = useRouter();

  // 進入頁面時，確保清除簡報模式可能殘留的 body 樣式
  useEffect(() => {
    document.body.style.overflow = 'auto';
    // 如果你有設定特定的 style ID 也可以在此移除
    const presentationStyle = document.getElementById('fenix-zpt-layout-v14');
    if (presentationStyle) presentationStyle.remove();
  }, []);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'VERIFYING...') return;

    setStatus('VERIFYING...');

    setTimeout(() => {
      // 統一密碼設定
      if (code === '131420') {
        // 授權成功：存入臨時通行證 (瀏覽器關閉即失效)
        sessionStorage.setItem('fenix_auth', 'authorized_session_' + Date.now());
        router.push('/portal/list');
      } else {
        setStatus('ACCESS DENIED');
        setCode('');
        setTimeout(() => setStatus('SYSTEM READY'), 2000);
      }
    }, 800);
  };

  const handleExit = () => {
    // 使用 window.location.href 而非 router.push
    // 這樣可以確保回到首頁時，整個頁面的 Layout (Header/Footer) 重新啟動，並清除所有簡報樣式
    window.location.href = '/';
  };

  return (
    <div className="h-screen w-full bg-black text-blue-500 font-mono flex items-center justify-center overflow-hidden relative">
      
      {/* 背景裝飾 */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none" 
        style={{ 
          backgroundImage: 'linear-gradient(#1e3a8a 1px, transparent 1px), linear-gradient(90deg, #1e3a8a 1px, transparent 1px)', 
          backgroundSize: '40px 40px' 
        }} 
      />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 w-full max-w-md p-10 border border-blue-900/50 bg-black/80 backdrop-blur-md shadow-[0_0_50px_rgba(30,58,138,0.3)]"
      >
        <div className="mb-10 space-y-2 text-center">
          <div className="flex justify-center items-center space-x-3 mb-4">
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse" />
            <h1 className="text-xl font-black tracking-[0.4em] text-white italic">TECH PORTAL</h1>
          </div>
          <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-blue-900 to-transparent" />
          <p className="text-[10px] tracking-widest text-blue-800 uppercase pt-2">
            Internal Technical Service Portal
          </p>
        </div>

        <form onSubmit={handleVerify} className="space-y-8">
          <div className="space-y-4">
            <label className="text-[10px] text-blue-400/50 block tracking-[0.3em] text-center">
              ENTER ACCESS KEY
            </label>
            <input 
              type="password"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="••••••"
              autoComplete="off"
              className="w-full bg-transparent border-b border-blue-900 py-4 text-3xl text-center focus:outline-none focus:border-blue-400 transition-all tracking-[0.5em] text-white"
              autoFocus
            />
          </div>

          <button 
            type="submit"
            disabled={status === 'VERIFYING...'}
            className="w-full py-4 border border-blue-900 hover:border-blue-400 hover:bg-blue-950/30 transition-all text-xs tracking-[0.4em] font-bold disabled:opacity-50"
          >
            {status}
          </button>
        </form>

        <div className="mt-12 flex justify-between items-center text-[9px] text-blue-900 font-bold tracking-tighter">
          <span>ENCRYPTION: AES-256</span>
          <span>ESTABLISHED: 2026.03</span>
        </div>
      </motion.div>

      {/* 修改後的 Exit 按鈕 */}
      <button 
        onClick={handleExit}
        className="absolute bottom-10 text-[10px] text-slate-500 hover:text-white transition-colors tracking-widest border-b border-slate-800 hover:border-white pb-1"
      >
        RETURN TO OFFICIAL SITE
      </button>

      <div className="absolute bottom-4 right-4 text-[8px] text-blue-900/30 uppercase tracking-[0.2em]">
        Fenix Enterprise // Secure Terminal
      </div>
    </div>
  );
}