import type { Metadata, Viewport } from 'next';
import { Fraunces, Inter } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/components/cart/CartProvider';

const fraunces = Fraunces({
  subsets: ['latin', 'vietnamese'],
  variable: '--font-serif',
  display: 'swap',
  style: ['normal', 'italic'],
});

const inter = Inter({
  subsets: ['latin', 'vietnamese'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'rom&nd Việt Nam — Juicy Lasting Tint | Son Tint Bóng Căng Mọng Thuần Khiết',
  description: 'Khám phá dòng son tint bóng Juicy Lasting Tint từ rom&nd. Sắc màu trái cây tươi tắn, hiệu ứng bóng gương trong veo và lớp màu bền đẹp suốt cả ngày.',
  openGraph: {
    title: 'rom&nd Việt Nam — Juicy Lasting Tint',
    description: 'Son tint bóng căng mọng chuẩn phong cách Hàn Quốc. Chiết xuất trái cây tự nhiên, mọng nước và không bết dính.',
    images: ['https://romandbeauty.com/cdn/shop/files/JuicyLastingTint_Lifestyle.png'],
  },
};

export const viewport: Viewport = {
  themeColor: '#FAF3EA',
  colorScheme: 'light',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={`${fraunces.variable} ${inter.variable} bg-[#FAF3EA]`}>
      <body className="bg-[#FAF3EA] text-[#241B15] font-sans antialiased selection:bg-[#E8B4A6] selection:text-[#241B15]">
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}

