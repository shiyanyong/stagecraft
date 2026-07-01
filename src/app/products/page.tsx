import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { ProductCatalog } from "@/components/product-catalog";
import { buttonVariants } from "@/components/ui/button";

export const metadata = {
  title: "商品目录 | STAGECRAFT 模型场景地台商城",
  description:
    "按比例、场景和库存状态筛选 STAGECRAFT 模型场景地台，浏览工业车库、赛车场、城市街景、加油站、军事基地与科幻未来系列。",
};

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0A] text-white">
      <SiteHeader />
      <ProductCatalog />
      <section className="border-t border-white/10 bg-[#111111] py-16 sm:py-20">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 px-4 sm:px-8 lg:flex-row lg:items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.36em] text-[#D4B483]">
              Custom Match
            </p>
            <h2 className="mt-5 text-3xl font-semibold sm:text-4xl">
              不确定模型适合哪款地台？
            </h2>
            <p className="mt-5 max-w-2xl leading-7 text-white/55">
              告诉我们模型比例、展示柜尺寸和想要的场景氛围，可为你推荐组合或定制模块。
            </p>
          </div>
          <Link href="/cart" className={buttonVariants()}>
            查看购物车
          </Link>
        </div>
      </section>
    </main>
  );
}
