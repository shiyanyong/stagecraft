import Image from "next/image";
import Link from "next/link";
import { Heart, Search } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { playerCases } from "@/lib/site-data";

export const metadata = {
  title: "饮用案例 | 御罕泉天然苏打水官方商城",
  description:
    "查看御罕泉天然苏打水在家庭餐桌、办公室、商务接待、聚会冰饮和企业会议中的使用案例。",
};

export default function CasesPage() {
  return (
    <main className="min-h-screen bg-[#EEF8FF] text-[#102A43]">
      <SiteHeader />
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-8 sm:py-24">
        <p className="text-xs uppercase tracking-[0.36em] text-[#5F7687]">
          Customer Cases
        </p>
        <div className="mt-6 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <h1 className="max-w-4xl text-4xl font-semibold leading-tight sm:text-6xl lg:text-7xl">
            饮用场景案例
          </h1>
          <Link
            href="/products"
            className="inline-flex h-12 items-center justify-center gap-2 border border-[#B8C7D3]/70 bg-white/70 px-5 text-sm font-medium tracking-[0.16em] text-[#526A7C] transition hover:bg-[#B8C7D3] hover:text-[#102A43]"
          >
            <Search className="h-4 w-4" />
            按场景选商品
          </Link>
        </div>
        <p className="mt-6 max-w-3xl leading-8 text-[#5A7182]">
          这里展示不同饮用场景下的规格选择。图片容器继续使用 4:3 长方形，后续可直接替换为真实饮品场景或前后对比图。
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {playerCases.map((item, index) => (
            <article
              key={item.title}
              className="overflow-hidden border border-[#B8C7D3]/45 bg-white/82 transition hover:border-[#8FA8B8]"
            >
              <div className="relative aspect-[4/3] bg-[#DDEFF8]">
                <Image
                  src={item.image}
                  alt={`${item.title}案例图`}
                  fill
                  sizes="(max-width: 1280px) 50vw, 33vw"
                  className="object-cover"
                />
                <div className="absolute left-4 top-4 border border-white/60 bg-white/75 px-3 py-2 text-xs tracking-[0.16em] text-[#526A7C] backdrop-blur">
                  CASE {String(index + 1).padStart(2, "0")}
                </div>
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-semibold">{item.title}</h2>
                <div className="mt-5 flex items-center justify-between">
                  <span className="inline-flex items-center gap-2 text-sm text-[#5A7182]">
                    <Heart className="h-4 w-4 text-[#6D8495]" />
                    {item.likes}
                  </span>
                  <Link href="/products" className="text-sm text-[#526A7C]">
                    查看同类商品
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
