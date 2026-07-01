import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { CartProvider } from "@/components/cart-provider";
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
  metadataBase: new URL("https://stagecraft.example"),
  title: "STAGECRAFT | 模型场景地台商城",
  description:
    "STAGECRAFT 提供可直接展示的模型场景地台、模块组合与收藏级展示方案，适配 1:64、1:43、1:24、1:18 模型。",
  keywords: [
    "模型地台",
    "微缩场景",
    "模型场景地台商城",
    "1:64 车模",
    "高达地台",
    "坦克地台",
    "收藏展示",
  ],
  openGraph: {
    title: "STAGECRAFT | 模型场景地台商城",
    description: "为模型搭建可展示、可拍摄、可收藏的场景。",
    images: ["/images/hero-industrial-diorama.png"],
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
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
