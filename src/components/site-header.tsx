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
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0A0A0A]/92 backdrop-blur-xl">
      <div className="mx-auto grid min-h-[80px] max-w-7xl grid-cols-[1fr_auto] items-center gap-4 px-4 py-4 sm:px-8 lg:grid-cols-[1fr_auto_1fr]">
        <Link
          href="/"
          className="justify-self-start text-base font-semibold tracking-[0.3em] text-white transition hover:text-[#D4B483] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4B483] sm:text-lg"
        >
          STAGECRAFT
        </Link>

        <nav className="order-3 col-span-2 flex w-full items-center gap-1.5 overflow-x-auto rounded-full border border-white/12 bg-white/[0.055] p-1.5 text-sm font-medium tracking-[0.14em] text-white/68 shadow-[0_0_0_1px_rgba(255,255,255,0.02)_inset] md:order-none md:col-span-1 md:w-auto md:overflow-visible sm:text-[15px]">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex h-11 shrink-0 items-center justify-center rounded-full px-5 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4B483] sm:h-12 sm:px-6 ${
                isActive(pathname, item.href)
                  ? "bg-[#D4B483] text-black"
                  : "hover:bg-white/10 hover:text-white"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/cart"
          className={`relative inline-flex h-12 items-center gap-2 justify-self-end border px-5 text-sm font-medium tracking-[0.14em] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4B483] sm:h-[52px] sm:text-[15px] ${
            pathname === "/cart"
              ? "border-[#D4B483] bg-[#D4B483] text-black"
              : "border-[#D4B483]/45 bg-[#D4B483]/10 text-[#F3D7A7] hover:bg-[#D4B483] hover:text-black"
          }`}
        >
          <ShoppingBag className="h-5 w-5" />
          购物车
          {count > 0 ? (
            <span className="absolute -right-2 -top-2 grid h-5 min-w-5 place-items-center rounded-full bg-[#D4B483] px-1 text-[11px] font-semibold text-black">
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
