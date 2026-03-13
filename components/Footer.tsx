import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-16 px-6 border-t border-slate-800">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2">
          <h3 className="text-white text-xl font-black mb-6">元堉企業有限公司</h3>
          <p className="text-sm leading-relaxed mb-6 max-w-sm">
            專業代理製藥、食品、化妝品機械設備。具備 30 年實戰經驗與電子工程技術背景，提供從設備選型到 SAT 驗收的一站式服務。
          </p>
          <p className="text-xs">統一編號：84443912</p>
        </div>
        
        <div>
          <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">快速連結</h4>
          <ul className="space-y-4 text-sm">
            <li><Link href="/products" className="hover:text-white">所有設備清單</Link></li>
            <li><Link href="/contact" className="hover:text-white">索取技術文件</Link></li>
            <li><Link href="/ai-search" className="hover:text-white">AI 智能設備搜尋</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">聯絡資訊</h4>
          <ul className="space-y-4 text-sm">
            <li>電話：02-2751-2786</li>
            <li>傳真：02-2771-5034</li>
            <li>地址：台北市松山區復興南路一段...</li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto border-t border-slate-800 mt-16 pt-8 text-xs text-center">
        © 2026 元堉企業有限公司 - Professional Machinery Agent. All Rights Reserved.
      </div>
    </footer>
  );
}