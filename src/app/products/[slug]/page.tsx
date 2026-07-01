import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Camera, Check, Grid3X3, PackageCheck, Ruler } from "lucide-react";
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
    title: `${product.cnName} | STAGECRAFT 模型场景地台商城`,
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
    <main className="min-h-screen bg-[#0A0A0A] text-white">
      <SiteHeader />

      <section className="mx-auto grid max-w-7xl gap-10 px-4 pb-16 pt-8 sm:px-8 sm:pb-24 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
        <div className="overflow-hidden bg-[#111111] lg:sticky lg:top-24">
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
            className="text-sm text-white/45 transition hover:text-[#D4B483]"
          >
            返回商品目录
          </Link>
          <p className="mt-8 text-xs uppercase tracking-[0.36em] text-[#D4B483]">
            {product.scene} / Collector Grade Base
          </p>
          <h1 className="mt-6 text-4xl font-semibold leading-tight sm:text-6xl">
            {product.cnName}
          </h1>
          <p className="mt-3 text-xl text-white/42">{product.name}</p>
          <p className="mt-6 max-w-2xl text-base leading-8 text-white/62 sm:text-lg">
            {product.description}
          </p>

          <div className="mt-7 flex flex-wrap gap-2">
            {["Photography Ready", "Modular", ...product.scales].map((tag) => (
              <span
                key={tag}
                className="border border-white/15 px-3 py-2 text-xs tracking-[0.14em] text-white/56"
              >
                {tag}
              </span>
            ))}
          </div>

          <dl className="mt-10 divide-y divide-white/10 border-y border-white/10">
            {[
              ["尺寸", product.size],
              ["适配比例", product.scale],
              ["材质", product.material],
              ["场景风格", product.style],
              ["适合模型", product.fit],
            ].map(([label, value]) => (
              <div
                key={label}
                className="grid gap-2 py-4 sm:grid-cols-[120px_1fr] sm:gap-4"
              >
                <dt className="text-sm text-white/38">{label}</dt>
                <dd className="text-base leading-7 text-white/78">{value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <span className="text-3xl font-semibold text-[#D4B483]">
              {formatPrice(product.price)}
            </span>
            <AddToCartButton slug={product.slug} className="sm:ml-auto" />
            <Link href="/cart" className={buttonVariants({ variant: "secondary" })}>
              去购物车
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-[#111111] py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <div className="grid gap-5 lg:grid-cols-3">
            {[Camera, Ruler, PackageCheck].map((Icon, index) => (
              <article key={Icon.name} className="border-t border-white/12 pt-7">
                <Icon className="h-8 w-8 text-[#D4B483]" />
                <h2 className="mt-8 text-2xl font-semibold">
                  {["细节纹理", "展示场景", "收纳切换"][index]}
                </h2>
                <p className="mt-4 leading-7 text-white/56">
                  {
                    [
                      "保留手工旧化层次，近距离拍摄也能看到材质变化。",
                      "适配桌面陈列、收藏柜、摄影布景与短视频展示。",
                      "地台独立成型，展示完成后可直接收纳或更换模型。",
                    ][index]
                  }
                </p>
              </article>
            ))}
          </div>

          <div className="mt-16 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="relative aspect-[16/9] overflow-hidden bg-black">
              <Image
                src={assets.comparison}
                alt={`${product.cnName}搭配效果示例`}
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover"
              />
            </div>
            <div className="bg-[#171717] p-6 sm:p-8">
              <Grid3X3 className="h-8 w-8 text-[#D4B483]" />
              <h2 className="mt-10 text-3xl font-semibold">购买信息</h2>
              <InfoList
                items={[
                  ["发货周期", product.shipTime],
                  ["包装内容", "地台本体、防尘包装、搭配建议卡"],
                  ["售后说明", product.afterSale],
                  ["保养提示", product.care],
                ]}
              />
            </div>
          </div>
        </div>
      </section>

      <section id="purchase" className="bg-[#0A0A0A] py-16 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.36em] text-[#D4B483]">
              Inquiry
            </p>
            <h2 className="mt-5 text-4xl font-semibold sm:text-5xl">
              加入询价清单
            </h2>
            <p className="mt-5 leading-8 text-white/56">
              留下模型比例、数量或展示需求，我们会确认库存、发货周期和推荐搭配。
            </p>
            <div className="mt-8 border border-white/10 bg-[#111111] p-6">
              <div className="flex items-start justify-between gap-5">
                <div>
                  <p className="text-xs tracking-[0.22em] text-white/40">
                    {product.name}
                  </p>
                  <h3 className="mt-2 text-2xl font-semibold">{product.cnName}</h3>
                  <p className="mt-3 text-white/50">
                    {product.status} / {product.size}
                  </p>
                </div>
                <p className="text-2xl font-semibold text-[#D4B483]">
                  {formatPrice(product.price)}
                </p>
              </div>
            </div>
          </div>
          <InquiryForm productName={product.cnName} />
        </div>
      </section>

      <section className="bg-[#111111] py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <p className="text-xs uppercase tracking-[0.36em] text-[#D4B483]">
            Related Bases
          </p>
          <h2 className="mt-5 text-4xl font-semibold sm:text-5xl">相关推荐</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {related.map((item, index) => {
              const Icon = detailIcons[index];
              return (
                <Link
                  href={`/products/${item.slug}`}
                  key={item.slug}
                  className="group block overflow-hidden border border-white/10 bg-[#0A0A0A] transition hover:border-[#D4B483]/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4B483]"
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
                    <Icon className="h-7 w-7 text-[#D4B483]" />
                    <h3 className="mt-6 text-xl font-semibold">{item.cnName}</h3>
                    <p className="mt-3 text-sm text-white/50">
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

function InfoList({ items }: { items: string[][] }) {
  return (
    <ul className="mt-8 space-y-5 text-white/64">
      {items.map(([label, value]) => (
        <li key={label} className="flex gap-3 leading-7">
          <Check className="mt-1 h-5 w-5 shrink-0 text-[#D4B483]" />
          <span>
            <span className="text-white">{label}：</span>
            {value}
          </span>
        </li>
      ))}
    </ul>
  );
}
