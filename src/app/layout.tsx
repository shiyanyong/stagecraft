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
  metadataBase: new URL("https://stagecraft-1u3.pages.dev"),
  title:
    "StageCraft | Training-Free VLA Robotics Optimization with VLM Reasoning",
  description:
    "StageCraft improves Vision-Language-Action robot success rate without retraining by using Vision-Language Model reasoning to detect failure-inducing distractors and optimize environments before execution.",
  keywords: [
    "StageCraft",
    "VLA robotics optimization",
    "Vision Language Action",
    "Vision-Language-Action failure mitigation",
    "robot manipulation improvement without training",
    "training-free robotics optimization",
    "VLM reasoning",
    "distractor removal",
    "Embodied AI",
    "RLBench",
    "SmolVLA",
    "Pi0.5",
  ],
  openGraph: {
    title:
      "StageCraft | Training-Free VLA Robotics Optimization with VLM Reasoning",
    description:
      "A plug-and-play VLM reasoning system that improves VLA robot execution by detecting distractors and optimizing the environment before action.",
    url: "https://stagecraft-1u3.pages.dev",
    siteName: "StageCraft",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "StageCraft | Training-Free VLA Robotics Optimization with VLM Reasoning",
    description:
      "Improve Vision-Language-Action robot success without policy retraining.",
  },
  alternates: {
    canonical: "https://stagecraft-1u3.pages.dev",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
