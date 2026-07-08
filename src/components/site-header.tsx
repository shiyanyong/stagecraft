"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag } from "lucide-react";
import { navItems } from "@/lib/site-data";
import { useCart } from "@/components/cart-provider";

export function SiteHeader() {
  const { count } = useCart();
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-[#B8C7D3]/45 bg-[#F7FCFF]/92 shadow-sm shadow-sky-100/50 backdrop-blur-xl">
      <div className="mx-auto grid min-h-[80px] max-w-7xl grid-cols-[1fr_auto] items-center gap-4 px-4 py-4 sm:px-8 lg:grid-cols-[1fr_auto_1fr]">
        <Link
          href="/"
          className="justify-self-start text-lg font-semibold tracking-[0.28em] text-[#123047] transition hover:text-[#5F7687] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8C7D3] sm:text-xl"
        >
          御罕泉
        </Link>

        <nav className="order-3 col-span-2 flex w-full items-center gap-1.5 overflow-x-auto rounded-full border border-[#B8C7D3]/55 bg-white/78 p-1.5 text-sm font-medium tracking-[0.14em] text-[#557086] shadow-[0_10px_35px_rgba(66,139,186,0.08)] md:order-none md:col-span-1 md:w-auto md:overflow-visible sm:text-[15px]">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex h-11 shrink-0 items-center justify-center rounded-full px-5 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8C7D3] sm:h-12 sm:px-6 ${
                isActive(pathname, item.href)
                  ? "bg-[#B8C7D3] text-[#102A43]"
                  : "hover:bg-[#E7F5FF] hover:text-[#123047]"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/cart"
          className={`relative inline-flex h-12 items-center gap-2 justify-self-end border px-5 text-sm font-medium tracking-[0.14em] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8C7D3] sm:h-[52px] sm:text-[15px] ${
            pathname === "/cart"
              ? "border-[#B8C7D3] bg-[#B8C7D3] text-[#102A43]"
              : "border-[#B8C7D3]/70 bg-white/70 text-[#526A7C] hover:bg-[#B8C7D3] hover:text-[#102A43]"
          }`}
        >
          <ShoppingBag className="h-5 w-5" />
          购物车
          {count > 0 ? (
            <span className="absolute -right-2 -top-2 grid h-5 min-w-5 place-items-center rounded-full bg-[#7EAEC9] px-1 text-[11px] font-semibold text-white">
              {count}
            </span>
          ) : null}
        </Link>
      </div>
    </header>
  );
}

function isActive(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}
