import Link from "next/link";
import { Check } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { buttonVariants } from "@/components/ui/button";
import { packages } from "@/lib/site-data";

export const metadata = {
  title: "套餐推荐 | 御罕泉天然苏打水官方商城",
  description:
    "对比御罕泉日常饮用装、家庭囤货装和商务定制装，选择适合家庭、办公室、餐饮和企业采购的天然苏打水组合。",
};

export default function PackagesPage() {
  return (
    <main className="min-h-screen bg-[#EEF8FF] text-[#102A43]">
      <SiteHeader />
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-8 sm:py-24">
        <p className="text-xs uppercase tracking-[0.36em] text-[#5F7687]">
          Bundles
        </p>
        <h1 className="mt-6 max-w-4xl text-4xl font-semibold leading-tight sm:text-6xl lg:text-7xl">
          套餐推荐
        </h1>
        <p className="mt-6 max-w-3xl leading-8 text-[#5A7182]">
          按饮用频率和采购场景选择箱装组合。日常饮用装适合尝试，家庭囤货装适合高频饮用，商务定制装适合会议、礼赠和渠道采购。
        </p>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {packages.map((item, index) => (
            <article
              key={item.name}
              className={`border p-6 sm:p-8 ${
                index === 1
                  ? "border-[#8FA8B8] bg-[#DFF2FC]"
                  : "border-[#B8C7D3]/45 bg-white/82"
              }`}
            >
              <p className="text-sm text-[#5F7687]">{item.highlight}</p>
              <h2 className="mt-4 text-3xl font-semibold">{item.name}</h2>
              <p className="mt-5 text-4xl font-semibold text-[#526A7C]">{item.price}</p>
              <ul className="mt-8 space-y-4 text-[#5A7182]">
                {item.content.map((line) => (
                  <li key={line} className="flex gap-3">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#6D8495]" />
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
