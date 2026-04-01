'use client';

import React from 'react';
import { usePathname } from 'next/navigation';

interface WrapperProps {
  children: React.ReactNode;
  navbar: React.ReactNode;
  footer: React.ReactNode;
  concierge: React.ReactNode;
}

export default function ClientLayoutWrapper({ 
  children, 
  navbar, 
  footer, 
  concierge 
}: WrapperProps) {
  const pathname = usePathname();
  
  // 判定目前是否進入 Portal 系統
  const isPortal = pathname?.startsWith('/portal');

  // 如果是 Portal (暗門)，我們只回傳 children (即 main 內容)，完全不渲染傳進來的 navbar 等組件
  if (isPortal) {
    return (
      <div className="bg-black min-h-screen">
        {children}
      </div>
    );
  }

  // 如果是一般官網，則正常組合顯示
  return (
    <>
      {navbar}
      {children}
      {footer}
      {concierge}
    </>
  );
}