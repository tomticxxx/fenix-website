// app/bio-asia-2026/page.tsx
import BioAsiaClient from './BioAsiaClient';

// 兼顧中英文的國際化 SEO 關鍵 Metadata
export const metadata = {
  title: '2026 亞洲生技大展 - 精密軟膠囊機設備與客製化模具工藝 | 元堉企業 Fenix Enterprise',
  description: '元堉企業 (Fenix) 攜手恆達機械 (Hedagel) 參展 2026 台灣亞洲生技大展 (BIO ASIA-TAIWAN)！展位 K202 展出醫藥食品級微量高精度充填柱塞泵、自動膠皮冷卻等精密軟膠囊成套設備與客製化滾模模具，歡迎線上預約現場商務洽談。 Discover world-leading softgel encapsulation technology and precision moulds by Hedagel & Fenix at Booth K202.',
  keywords: ['軟膠囊機', '2026生技展', '軟膠囊模具', '恆達機械', '元堉企業', 'Hedagel', 'Fenix Enterprise', 'Softgel Encapsulation Machine', 'Die Rolls', 'BIO ASIA TAIWAN 2026'],
};

export default function Page() {
  return <BioAsiaClient />;
}