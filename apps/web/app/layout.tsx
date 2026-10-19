import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'BrewLite – Đặt cà phê không tiền mặt',
  description: 'Ứng dụng đặt đồ uống và thanh toán không dùng tiền mặt tại quầy',
  manifest: '/manifest.json',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#c27803',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body className="min-h-screen bg-stone-100 flex justify-center">
        {/* Mobile viewport container */}
        <div className="w-full max-w-md bg-stone-50 min-h-screen flex flex-col shadow-xl border-x border-stone-200 relative pb-20">
          {children}
        </div>
      </body>
    </html>
  );
}
