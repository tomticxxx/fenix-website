"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, FileText, Send, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function FloatingConcierge() {
  const [isOpen, setIsOpen] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen) setShowPrompt(true);
    }, 4000); 
    return () => clearTimeout(timer);
  }, [isOpen]);

  const actions = [
    { 
      label: "LINE 專人對答", 
      icon: "💬", 
      href: "https://line.me/ti/p/~tomticxxx", 
      isExternal: true 
    },
    { 
      label: "技術規格 / 詢價", 
      icon: <Send className="w-4 h-4 text-blue-600" />, 
      href: "/contact", 
      isExternal: false 
    },
    { 
      label: "索取設備目錄", 
      icon: <FileText className="w-4 h-4 text-slate-600" />, 
      href: "/products", 
      isExternal: false 
    },
  ];

  return (
    <div className="fixed bottom-8 right-8 z-[9999] flex flex-col items-end font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="mb-4 w-80 bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-slate-100 overflow-hidden"
          >
            {/* 上半部：3D 頭像與背景 */}
            <div className="bg-gradient-to-br from-slate-900 to-blue-900 p-8 text-white relative">
              <button 
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-3">
                  {/* 頭像容器尺寸固定 w-32 h-32 */}
                  <div className="w-32 h-32 rounded-full border-4 border-white/20 shadow-2xl overflow-hidden bg-slate-800 relative">
                    <Image 
                      src="/concierge-avatar.png" 
                      alt="Alex Avatar" 
                      fill
                      className="object-cover scale-110" 
                      priority
                      unoptimized // 避開 Next.js 快取，確保看到最新裁切的圖片
                    />
                  </div>
                  {/* 在線狀態小綠點 (呼吸燈效果) */}
                  <div className="absolute bottom-2 right-3 w-6 h-6 bg-emerald-500 border-4 border-slate-900 rounded-full">
                    <div className="w-full h-full bg-emerald-400 rounded-full animate-ping opacity-75"></div>
                  </div>
                </div>
                <h3 className="text-xl font-bold tracking-tight">元堉技術顧問 Alex</h3>
                <p className="text-blue-300 text-[10px] font-black tracking-[0.2em] uppercase mt-1 opacity-80">EE Technical Advisor</p>
              </div>
            </div>

            {/* 下半部：對話氣泡與快速選項 */}
            <div className="p-6 bg-slate-50">
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm border border-slate-100 mb-6 relative"
              >
                <p className="text-sm text-slate-700 leading-relaxed font-semibold">
                  您好！我是 Alex。如果您在尋找特定的製藥設備或有技術規格需求，請隨時告訴我，我會為您提供專業建議。
                </p>
                <div className="absolute top-0 -left-2 w-3 h-3 bg-white [clip-path:polygon(100%_0,100%_100%,0_0)]"></div>
              </motion.div>

              <div className="space-y-2">
                {actions.map((action, idx) => (
                  <Link 
                    key={idx} 
                    href={action.href} 
                    target={action.isExternal ? "_blank" : "_self"}
                    className="block"
                  >
                    <motion.div
                      whileHover={{ x: 5, backgroundColor: "#f1f5f9" }}
                      className="flex items-center justify-between p-4 rounded-xl bg-white border border-slate-200 cursor-pointer shadow-sm group transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-lg w-5 flex justify-center">{action.icon}</span>
                        <span className="text-sm font-bold text-slate-800">{action.label}</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-blue-600 transition-colors" />
                    </motion.div>
                  </Link>
                ))}
              </div>
              
              <p className="text-center text-[10px] text-slate-400 mt-6 font-bold tracking-widest uppercase">
                快速回覆時間：09:00 - 18:00
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showPrompt && !isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            onClick={() => { setIsOpen(true); setShowPrompt(false); }}
            className="mb-4 bg-blue-600 text-white py-3 px-6 rounded-2xl rounded-br-none shadow-2xl cursor-pointer hover:bg-blue-500 transition-colors relative"
          >
            <p className="text-sm font-black tracking-tight flex items-center gap-2">
               有設備需求？點我諮詢 Alex 👨‍🔧
            </p>
            <div className="absolute -bottom-2 right-0 w-4 h-4 bg-blue-600 [clip-path:polygon(100%_0,0_0,100%_100%)]"></div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => { setIsOpen(!isOpen); setShowPrompt(false); }}
        className={`w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-all duration-500 ${isOpen ? 'bg-slate-900 rotate-90' : 'bg-blue-600'}`}
      >
        {isOpen ? <X className="text-white w-8 h-8" /> : <MessageCircle className="text-white w-8 h-8" />}
      </motion.button>
    </div>
  );
}