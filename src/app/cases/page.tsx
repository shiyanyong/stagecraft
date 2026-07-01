import Image from "next/image";
import Link from "next/link";
import { Heart, Search } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { playerCases } from "@/lib/site-data";

export const metadata = {
  title: "玩家案例 | STAGECRAFT 模型场景地台商城",
  description:
    "查看玩家模型与场景地台搭配案例，长方形图片结构便于后续替换为 Before / After 对比图。",
};

export default function CasesPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0A] text-white">
      <SiteHeader />
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-8 sm:py-24">
        <p className="text-xs uppercase tracking-[0.36em] text-[#D4B483]">
          Collector Cases
        </p>
        <div className="mt-6 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <h1 className="max-w-4xl text-4xl font-semibold leading-tight sm:text-6xl lg:text-7xl">
            玩家搭配案例
          </h1>
          <Link
            href="/products"
            className="inline-flex h-12 items-center justify-center gap-2 border border-[#D4B483]/45 bg-[#D4B483]/10 px-5 text-sm font-medium tracking-[0.16em] text-[#F3D7A7] transition hover:bg-[#D4B483] hover:text-black"
          >
            <Search className="h-4 w-4" />
            按案例选地台
          </Link>
        </div>
        <p className="mt-6 max-w-3xl leading-8 text-white/58">
          这里展示不同模型与地台的搭配效果。图片容器已统一为长方形，后续可以直接替换成左右对比图或横向展示图。
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {playerCases.map((item, index) => (
            <article
              key={item.title}
              className="overflow-hidden border border-white/10 bg-[#111111] transition hover:border-[#D4B483]/50"
            >
              <div className="relative aspect-[4/3] bg-black">
                <Image
                  src={item.image}
                  alt={`${item.title}案例图`}
                  fill
                  sizes="(max-width: 1280px) 50vw, 33vw"
                  className="object-cover"
                />
                <div className="absolute left-4 top-4 border border-white/15 bg-black/60 px-3 py-2 text-xs tracking-[0.16em] text-white/70 backdrop-blur">
                  CASE {String(index + 1).padStart(2, "0")}
                </div>
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-semibold">{item.title}</h2>
                <div className="mt-5 flex items-center justify-between">
                  <span className="inline-flex items-center gap-2 text-sm text-white/55">
                    <Heart className="h-4 w-4 text-[#D4B483]" />
                    {item.likes}
                  </span>
                  <Link href="/products" className="text-sm text-[#D4B483]">
                    查看同类地台
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
