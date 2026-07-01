import Link from "next/link";
import { Check } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { buttonVariants } from "@/components/ui/button";
import { packages } from "@/lib/site-data";

export const metadata = {
  title: "套餐推荐 | STAGECRAFT 模型场景地台商城",
  description:
    "对比 STAGECRAFT 基础版、进阶版、收藏版套餐内容与价格，选择适合收藏展示的地台组合。",
};

export default function PackagesPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0A] text-white">
      <SiteHeader />
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-8 sm:py-24">
        <p className="text-xs uppercase tracking-[0.36em] text-[#D4B483]">
          Bundles
        </p>
        <h1 className="mt-6 max-w-4xl text-4xl font-semibold leading-tight sm:text-6xl lg:text-7xl">
          套餐推荐
        </h1>
        <p className="mt-6 max-w-3xl leading-8 text-white/58">
          按展示需求选择地台与模块组合。基础版适合入门，进阶版适合拍摄，收藏版适合主题收藏柜。
        </p>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {packages.map((item, index) => (
            <article
              key={item.name}
              className={`border p-6 sm:p-8 ${
                index === 1
                  ? "border-[#D4B483] bg-[#D4B483]/10"
                  : "border-white/10 bg-[#111111]"
              }`}
            >
              <p className="text-sm text-[#D4B483]">{item.highlight}</p>
              <h2 className="mt-4 text-3xl font-semibold">{item.name}</h2>
              <p className="mt-5 text-4xl font-semibold">{item.price}</p>
              <ul className="mt-8 space-y-4 text-white/64">
                {item.content.map((line) => (
                  <li key={line} className="flex gap-3">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#D4B483]" />
                    {line}
                  </li>
                ))}
              </ul>
              <Link
                href="/products"
                className={buttonVariants({
                  className: "mt-8 w-full",
                  variant: index === 1 ? "primary" : "secondary",
                })}
              >
                查看适配商品
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
