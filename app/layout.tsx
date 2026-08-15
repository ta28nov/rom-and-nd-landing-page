import type { Metadata, Viewport } from 'next';
import { Fraunces, Inter } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/components/cart/CartProvider';

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
  style: ['normal', 'italic'],
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'rom&nd — Juicy Lasting Tint | Nature-Inspired Lip Tint',
  description: 'Nature-inspired, fruit-toned lip tints with a glass-like shine that stains beautifully and lasts all day.',
  openGraph: {
    title: 'rom&nd — Juicy Lasting Tint',
    description: 'Discover Juicy Lasting Tint. Fruit-inspired pigment with glass-like radiant shine.',
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
    <html lang="en" className={`${fraunces.variable} ${inter.variable} bg-[#FAF3EA]`}>
      <body className="bg-[#FAF3EA] text-[#241B15] font-sans antialiased selection:bg-[#E8B4A6] selection:text-[#241B15]">
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
