"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, ChevronRight, ArrowLeft, CheckCircle2, QrCode, Loader2 } from "lucide-react";
import Image from "next/image";
import emailjs from '@emailjs/browser';

export default function FloatingConcierge() {
  const [isOpen, setIsOpen] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const [view, setView] = useState<"menu" | "form" | "success">("menu");
  const [isAlexVisible, setIsAlexVisible] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [isMobile, setIsMobile] = useState(false); // 新增：狀態管理
  
  // 表單狀態管理
  const [formData, setFormData] = useState({
    model: "",
    company: "",
    name: "",
    phone: "",
    email: "",
  });

  // 控制 LINE QR Code 彈窗顯隱 (電腦版使用)
  const [showLineQR, setShowLineQR] = useState(false);

  useEffect(() => {
    // 1. 偵測是否為行動裝置
    const checkMobile = () => {
      const userAgent = typeof navigator === "undefined" ? "" : navigator.userAgent;
      const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
      setIsMobile(mobile);
    };
    checkMobile();

    // 2. 初始提示計時器
    const timer = setTimeout(() => {
      if (!isOpen) setShowPrompt(true);
    }, 4000);

    if (typeof window !== "undefined") {
      // 3. Crisp 聊天室連動
      window.$crisp?.push(["on", "chat:closed", () => {
        window.$crisp.push(["do", "chat:hide"]); 
        setIsAlexVisible(true); 
      }]);

      window.$crisp?.push(["on", "chat:opened", () => {
        setIsAlexVisible(false); 
      }]);

      // 4. 接聽外部觸發 LINE 事件 (例如從頁面按鈕觸發)
      const handleRemoteOpenQR = () => {
        handleLineAction();
      };

      window.addEventListener("open-line-qr", handleRemoteOpenQR);

      return () => {
        clearTimeout(timer);
        window.removeEventListener("open-line-qr", handleRemoteOpenQR);
      };
    }

    return () => clearTimeout(timer);
  }, [isOpen]);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
    setShowPrompt(false);
    if (isOpen) setTimeout(() => setView("menu"), 500);
  };

  const handleOpenCrisp = () => {
    if (typeof window !== "undefined" && window.$crisp) {
      window.$crisp.push(['do', 'chat:show']);
      window.$crisp.push(['do', 'chat:open']);
      setIsOpen(false);
      setIsAlexVisible(false);
    }
  };

  // 處理 LINE 行動邏輯：判斷裝置跳轉或顯示 QR Code
  const handleLineAction = () => {
    const lineUrl = "https://line.me/ti/p/~@141vwved";
    
    if (isMobile) {
      // 手機版：直接跳轉喚起 LINE
      window.location.href = lineUrl;
    } else {
      // 電腦版：維持原樣顯示彈窗
      setShowLineQR(true);
      setIsOpen(false);
      setShowPrompt(false);
    }
  };

  // 處理詢價信發送
  const handleSendInquiry = async () => {
    if (!formData.name || !formData.email || !formData.model) {
      alert("請至少填寫姓名、電子郵件與設備需求內容。");
      return;
    }

    setIsSending(true);

    const SERVICE_ID = "service_x4hiwml"; 
    const TEMPLATE_ID = "template_12mz6a4"; 
    const PUBLIC_KEY = "p5QMMQNx4Xd4Dwt58";

    const templateParams = {
      user_name: formData.name,
      company_name: formData.company,
      user_email: formData.email,
      user_phone: formData.phone,
      message: `【設備型號/需求】：${formData.model}`,
      source: "來自 Alex AI 助手 (Floating Widget)"
    };

    try {
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
      setView("success");
      setFormData({ model: "", company: "", name: "", phone: "", email: "" });
    } catch (error) {
      console.error("Alex 發送失敗:", error);
      alert("發送失敗，請直接使用 LINE 或電話聯繫。");
    } finally {
      setIsSending(false);
    }
  };

  // 核心行動選項
  const actions = [
    { 
      label: "網頁即時諮詢", 
      icon: "💬", 
      onClick: handleOpenCrisp 
    },
    { 
      label: "LINE 專人對答", 
      icon: "🟢", 
      onClick: handleLineAction // 使用優化後的邏輯
    },
    { 
      label: "技術規格 / 詢價", 
      icon: <Send className="w-4 h-4 text-blue-600" />, 
      onClick: () => setView("form") 
    },
  ];

  return (
    <>
      <div className="fixed bottom-8 right-8 z-[9999] flex flex-col items-end font-sans">
        <AnimatePresence>
          {isAlexVisible && isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="mb-4 w-80 bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-slate-100 overflow-hidden"
            >
              <div className="bg-gradient-to-br from-slate-900 to-blue-900 p-8 text-white relative">
                <button onClick={toggleOpen} className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors border-none bg-transparent cursor-pointer">
                  <X className="w-5 h-5" />
                </button>
                <div className="flex flex-col items-center text-center">
                  <div className="relative mb-3">
                    <div className="w-32 h-32 rounded-full border-4 border-white/20 shadow-2xl overflow-hidden bg-slate-800 relative">
                      <Image src="/concierge-avatar.png" alt="Alex Avatar" fill className="object-cover scale-110" priority unoptimized />
                    </div>
                    <div className="absolute bottom-2 right-3 w-6 h-6 bg-emerald-500 border-4 border-slate-900 rounded-full">
                      <div className="w-full h-full bg-emerald-400 rounded-full animate-ping opacity-75"></div>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold tracking-tight">元堉技術顧問 Alex</h3>
                  <p className="text-blue-300 text-[10px] font-black tracking-[0.2em] uppercase mt-1 opacity-80">EE Technical Advisor</p>
                </div>
              </div>

              <div className="p-6 bg-slate-50 min-h-[300px]">
                <AnimatePresence mode="wait">
                  {view === "menu" && (
                    <motion.div key="menu" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }}>
                      <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm border border-slate-100 mb-6 relative">
                        <p className="text-sm text-slate-700 leading-relaxed font-semibold">
                          您好！我是 Alex。如果您在尋找特定的製藥設備或有技術規格需求，請隨時告訴我。
                        </p>
                        <div className="absolute top-0 -left-2 w-3 h-3 bg-white [clip-path:polygon(100%_0,100%_100%,0_0)]"></div>
                      </div>
                      <div className="space-y-2">
                        {actions.map((action, idx) => (
                          <div key={idx} onClick={action.onClick}>
                            <MenuButton action={action} />
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {view === "form" && (
                    <motion.div key="form" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="space-y-3">
                      <button onClick={() => setView("menu")} className="flex items-center gap-1 text-xs text-slate-400 hover:text-blue-600 mb-2 transition-colors border-none bg-transparent cursor-pointer">
                        <ArrowLeft size={14} /> 返回選單
                      </button>
                      <div className="space-y-2">
                        <input type="text" placeholder="設備型號 / 需求 *" value={formData.model} onChange={(e) => setFormData({...formData, model: e.target.value})} className="w-full p-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white" />
                        <input type="text" placeholder="公司名稱" value={formData.company} onChange={(e) => setFormData({...formData, company: e.target.value})} className="w-full p-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white" />
                        <input type="text" placeholder="聯絡人姓名 *" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full p-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white" />
                        <input type="tel" placeholder="聯絡電話" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full p-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white" />
                        <input type="email" placeholder="電子郵件 *" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full p-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white" />
                      </div>
                      <button 
                        onClick={handleSendInquiry} 
                        disabled={isSending}
                        className={`w-full text-white py-3 rounded-xl font-bold text-sm shadow-lg transition-all flex items-center justify-center gap-2 border-none cursor-pointer ${isSending ? 'bg-slate-400' : 'bg-blue-600 hover:bg-blue-700'}`}
                      >
                        {isSending ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                        {isSending ? "發送中..." : "送出詢價需求"}
                      </button>
                    </motion.div>
                  )}

                  {view === "success" && (
                    <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-10">
                      <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle2 size={32} />
                      </div>
                      <h4 className="font-bold text-slate-800 italic text-lg">Thank You!</h4>
                      <p className="text-sm text-slate-500 mt-2 font-medium">需求已送出，Alex 將儘速回覆您的 Gmail。</p>
                      <button onClick={() => setView("menu")} className="mt-8 text-sm text-blue-600 font-bold hover:underline bg-transparent border-none cursor-pointer">回到主選單</button>
                    </motion.div>
                  )}
                </AnimatePresence>
                <p className="text-center text-[10px] text-slate-400 mt-6 font-bold tracking-widest uppercase">快速回覆時間：09:00 - 18:00</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isAlexVisible && showPrompt && !isOpen && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} onClick={() => { setIsOpen(true); setShowPrompt(false); }} className="mb-4 bg-blue-600 text-white py-3 px-6 rounded-2xl rounded-br-none shadow-2xl cursor-pointer hover:bg-blue-500 transition-colors relative">
              <p className="text-sm font-black tracking-tight flex items-center gap-2">有設備需求？點我諮詢 Alex 👨‍🔧</p>
              <div className="absolute -bottom-2 right-0 w-4 h-4 bg-blue-600 [clip-path:polygon(100%_0,0_0,100%_100%)]"></div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isAlexVisible && (
            <motion.button initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0 }} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={toggleOpen} className={`w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-all duration-500 border-none cursor-pointer ${isOpen ? 'bg-slate-900 rotate-90' : 'bg-blue-600'}`}>
              {isOpen ? <X className="text-white w-8 h-8" /> : <MessageCircle className="text-white w-8 h-8" />}
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* --- 全螢幕 LINE QR Code 彈窗 (僅電腦版顯現) --- */}
      <AnimatePresence>
        {showLineQR && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/80 backdrop-blur-md z-[10001] flex items-center justify-center p-6"
            onClick={() => setShowLineQR(false)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              className="bg-white p-8 rounded-[3rem] max-w-sm w-full text-center shadow-[0_30px_60px_rgba(0,0,0,0.5)] border border-white/20 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={() => setShowLineQR(false)} className="absolute top-6 right-6 text-slate-300 hover:text-slate-600 transition-colors bg-transparent border-none cursor-pointer">
                <X size={24} />
              </button>
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <QrCode size={32} />
              </div>
              <h3 className="text-2xl font-black text-slate-800 mb-2 italic tracking-tight">Add Alex on LINE</h3>
              <p className="text-sm text-slate-500 mb-8 font-medium">掃描 QR Code 獲取藥機報價與技術手冊<br/><span className="text-blue-600 font-bold underline">Official ID: @141vwved</span></p>
              
              <div className="bg-white p-4 rounded-3xl mb-8 shadow-inner border border-slate-100 inline-block relative overflow-hidden group">
                <div className="absolute inset-0 border-[10px] border-emerald-500/5 rounded-3xl group-hover:border-emerald-500/10 transition-all"></div>
                <div className="relative w-48 h-48">
                  <Image src="/line-qr.png" alt="LINE QR Code" fill className="object-contain p-2" unoptimized />
                </div>
              </div>
              
              <button onClick={() => setShowLineQR(false)} className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-sm tracking-widest uppercase hover:bg-slate-800 transition-all shadow-lg active:scale-95 border-none cursor-pointer">
                關閉視窗
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function MenuButton({ action }: { action: any }) {
  return (
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
  );
}

declare global {
  interface Window {
    $crisp: any;
  }
}