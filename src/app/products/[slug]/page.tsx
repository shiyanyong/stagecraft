import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Droplets, PackageCheck, ShieldCheck, Truck } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { AddToCartButton } from "@/components/add-to-cart-button";
import { InquiryForm } from "@/components/inquiry-form";
import {
  assets,
  detailIcons,
  formatPrice,
  getProduct,
  products,
  statusStyles,
} from "@/lib/site-data";
import { buttonVariants } from "@/components/ui/button";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return products.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProduct(slug);

  if (!product) {
    return {};
  }

  return {
    title: `${product.cnName} | 御罕泉天然苏打水官方商城`,
    description: product.description,
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProduct(slug);

  if (!product) {
    notFound();
  }

  const related = products
    .filter((item) => item.slug !== product.slug)
    .slice(0, 3);

  return (
    <main className="min-h-screen bg-[#EEF8FF] text-[#102A43]">
      <SiteHeader />

      <section className="mx-auto grid max-w-7xl gap-10 px-4 pb-16 pt-8 sm:px-8 sm:pb-24 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
        <div className="overflow-hidden border border-[#B8C7D3]/45 bg-white/72 shadow-[0_20px_60px_rgba(76,139,170,0.12)] lg:sticky lg:top-24">
          <div className="relative aspect-[4/3] sm:aspect-[4/5] lg:aspect-[5/6]">
            <Image
              src={product.image}
              alt={`${product.cnName}商品大图`}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 52vw"
              className="object-cover"
              style={{ objectPosition: product.objectPosition }}
            />
            <span
              className={`absolute left-4 top-4 border px-3 py-2 text-xs tracking-[0.18em] backdrop-blur ${statusStyles[product.status]}`}
            >
              {product.status}
            </span>
          </div>
        </div>

        <div className="pt-2 lg:pt-12">
          <Link
            href="/products"
            className="text-sm text-[#6D8495] transition hover:text-[#102A43]"
          >
            返回商品目录
          </Link>
          <p className="mt-8 text-xs uppercase tracking-[0.36em] text-[#5F7687]">
            {product.scene} / Natural Soda Water
          </p>
          <h1 className="mt-6 text-4xl font-semibold leading-tight sm:text-6xl">
            {product.cnName}
          </h1>
          <p className="mt-3 text-xl text-[#7C94A5]">{product.name}</p>
          <p className="mt-6 max-w-2xl text-base leading-8 text-[#5A7182] sm:text-lg">
            {product.description}
          </p>

          <div className="mt-7 flex flex-wrap gap-2">
            {["天然弱碱", "无糖饮用", ...product.scales].map((tag) => (
              <span
                key={tag}
                className="border border-[#B8C7D3]/55 bg-white/70 px-3 py-2 text-xs tracking-[0.14em] text-[#5A7182]"
              >
                {tag}
              </span>
            ))}
          </div>

          <dl className="mt-10 divide-y divide-[#B8C7D3]/45 border-y border-[#B8C7D3]/45">
            {[
              ["包装规格", product.size],
              ["适配规格", product.scale],
              ["产品组成", product.material],
              ["饮用场景", product.style],
              ["适合人群", product.fit],
            ].map(([label, value]) => (
              <div
                key={label}
                className="grid gap-2 py-4 sm:grid-cols-[120px_1fr] sm:gap-4"
              >
                <dt className="text-sm text-[#7C94A5]">{label}</dt>
                <dd className="text-base leading-7 text-[#102A43]">{value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <span className="text-3xl font-semibold text-[#526A7C]">
              {formatPrice(product.price)}
            </span>
            <AddToCartButton slug={product.slug} className="sm:ml-auto" />
            <Link href="/cart" className={buttonVariants({ variant: "secondary" })}>
              去购物车
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white/58 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <div className="grid gap-5 lg:grid-cols-3">
            {[Droplets, ShieldCheck, PackageCheck].map((Icon, index) => (
              <article key={Icon.name} className="border-t border-[#B8C7D3]/55 pt-7">
                <Icon className="h-8 w-8 text-[#6D8495]" />
                <h2 className="mt-8 text-2xl font-semibold">
                  {["天然苏打水", "低负担饮用", "箱装配送"][index]}
                </h2>
                <p className="mt-4 leading-7 text-[#5A7182]">
                  {
                    [
                      "适合日常饮用、餐配和办公补水，口感清爽不厚重。",
                      "无糖配方，低钠或含气规格可按饮用习惯选择。",
                      "箱装发货，订单确认后会同步后台库存和发货流程。",
                    ][index]
                  }
                </p>
              </article>
            ))}
          </div>

          <div className="mt-16 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="relative aspect-[16/9] overflow-hidden bg-[#DDEFF8]">
              <Image
                src={assets.comparison}
                alt={`${product.cnName}饮用场景示例`}
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover"
              />
            </div>
            <div className="border border-[#B8C7D3]/45 bg-white/82 p-6 sm:p-8">
              <Truck className="h-8 w-8 text-[#6D8495]" />
              <h2 className="mt-10 text-3xl font-semibold">购买信息</h2>
              <InfoList
                items={[
                  ["发货周期", product.shipTime],
                  ["包装内容", "产品本体、箱装防潮包装、批次信息"],
                  ["售后说明", product.afterSale],
                  ["储存提示", product.care],
                ]}
              />
            </div>
          </div>
        </div>
      </section>

      <section id="purchase" className="bg-[#EEF8FF] py-16 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.36em] text-[#5F7687]">
              Inquiry
            </p>
            <h2 className="mt-5 text-4xl font-semibold sm:text-5xl">
              加入询价清单
            </h2>
            <p className="mt-5 leading-8 text-[#5A7182]">
              留下采购数量、城市或使用场景，我们会确认库存、箱规和发货周期。
            </p>
            <div className="mt-8 border border-[#B8C7D3]/45 bg-white/82 p-6">
              <div className="flex items-start justify-between gap-5">
                <div>
                  <p className="text-xs tracking-[0.22em] text-[#7C94A5]">
                    {product.name}
                  </p>
                  <h3 className="mt-2 text-2xl font-semibold">{product.cnName}</h3>
                  <p className="mt-3 text-[#5A7182]">
                    {product.status} / {product.size}
                  </p>
                </div>
                <p className="text-2xl font-semibold text-[#526A7C]">
                  {formatPrice(product.price)}
                </p>
              </div>
            </div>
          </div>
          <InquiryForm productName={product.cnName} />
        </div>
      </section>

      <section className="bg-white/58 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <p className="text-xs uppercase tracking-[0.36em] text-[#5F7687]">
            Related Products
          </p>
          <h2 className="mt-5 text-4xl font-semibold sm:text-5xl">相关推荐</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {related.map((item, index) => {
              const Icon = detailIcons[index];
              return (
                <Link
                  href={`/products/${item.slug}`}
                  key={item.slug}
                  className="group block overflow-hidden border border-[#B8C7D3]/45 bg-white/82 transition hover:border-[#8FA8B8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8C7D3]"
                >
                  <div className="relative aspect-[16/10]">
                    <Image
                      src={item.image}
                      alt={`${item.cnName}相关推荐`}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition duration-700 group-hover:scale-105"
                      style={{ objectPosition: item.objectPosition }}
                    />
                    <span
                      className={`absolute left-3 top-3 border px-2.5 py-1.5 text-xs backdrop-blur ${statusStyles[item.status]}`}
                    >
                      {item.status}
                    </span>
                  </div>
                  <div className="p-5">
                    <Icon className="h-7 w-7 text-[#6D8495]" />
                    <h3 className="mt-6 text-xl font-semibold">{item.cnName}</h3>
                    <p className="mt-3 text-sm text-[#5A7182]">
                      {formatPrice(item.price)} / {item.scale}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}

function InfoList({ items }: { items: Array<[string, string]> }) {
  return (
    <dl className="mt-8 space-y-5">
      {items.map(([label, value]) => (
        <div key={label} className="border-t border-[#B8C7D3]/45 pt-5">
          <dt className="text-sm text-[#7C94A5]">{label}</dt>
          <dd className="mt-2 leading-7 text-[#102A43]">{value}</dd>
        </div>
      ))}
    </dl>
  );
}
