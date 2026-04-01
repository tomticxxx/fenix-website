'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    // 1. 如果目前就在密碼門戶頁 (/portal)，直接放行，否則會陷入無限循環跳轉
    if (pathname === '/portal') {
      setAuthorized(true);
      return;
    }

    // 2. 檢查瀏覽器 Session 中是否有存入通行證 (fenix_auth)
    const isAuth = sessionStorage.getItem('fenix_auth');

    if (!isAuth) {
      // 3. 發現沒有通行證，立刻強制彈回密碼輸入頁
      console.warn('Unauthorized access detected. Redirecting to portal...');
      router.replace('/portal');
    } else {
      // 4. 有通行證，允許渲染內容
      setAuthorized(true);
    }
  }, [pathname, router]);

  // 重要：在驗證完成前，畫面保持全黑或顯示載入中
  // 這樣即便別人輸入網址，也絕對看不到後面的 list 或簡報內容，連一秒鐘的閃現都不會有
  if (!authorized && pathname !== '/portal') {
    return <div className="h-screen w-full bg-black flex items-center justify-center font-mono text-blue-900">SECURE ACCESS INITIALIZING...</div>;
  }

  return <>{children}</>;
}