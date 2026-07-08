import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { CartProvider } from "@/components/cart-provider";
import { StorefrontProductsProvider } from "@/components/storefront-products-provider";
import { AICustomerService } from "@/components/ai-customer-service";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mowork.xyz"),
  title: "御罕泉 | 天然苏打水官方商城",
  description:
    "御罕泉提供天然苏打水、低钠苏打水、气泡苏打水、玻璃瓶装、家庭箱装与企业定制用水，支持官网下单与后台库存订单联动。",
  keywords: [
    "御罕泉",
    "天然苏打水",
    "低钠苏打水",
    "气泡苏打水",
    "弱碱性饮用水",
    "苏打水商城",
    "家庭箱装饮用水",
    "企业定制饮用水",
  ],
  openGraph: {
    title: "御罕泉 | 天然苏打水官方商城",
    description: "清爽、低负担、适合家庭与商务场景的天然苏打水。",
    images: ["/images/yuhanquan-hero-wide.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <StorefrontProductsProvider>
          <CartProvider>
            {children}
            <AICustomerService />
          </CartProvider>
        </StorefrontProductsProvider>
      </body>
    </html>
  );
}
