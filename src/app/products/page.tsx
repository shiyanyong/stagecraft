import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { ProductCatalog } from "@/components/product-catalog";
import { buttonVariants } from "@/components/ui/button";

export const metadata = {
  title: "商品目录 | 御罕泉天然苏打水官方商城",
  description:
    "按规格、分类和库存状态筛选御罕泉天然苏打水，浏览经典原味、含气苏打水、低钠苏打水、玻璃瓶装、家庭箱装与企业定制产品。",
};

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-[#EEF8FF] text-[#102A43]">
      <SiteHeader />
      <ProductCatalog />
      <section className="border-t border-[#B8C7D3]/45 bg-white/58 py-16 sm:py-20">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 px-4 sm:px-8 lg:flex-row lg:items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.36em] text-[#5F7687]">
              Bulk Purchase
            </p>
            <h2 className="mt-5 text-3xl font-semibold sm:text-4xl">
              不确定该选哪种箱规？
            </h2>
            <p className="mt-5 max-w-2xl leading-7 text-[#5A7182]">
              可以先加入购物车确认订单，也可以通过客服说明家庭、办公、餐饮或企业采购需求，我们会按库存和补货周期给出建议。
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
