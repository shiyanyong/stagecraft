"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Droplets, ShieldCheck, Truck } from "lucide-react";
import { AddToCartButton } from "@/components/add-to-cart-button";
import { SiteHeader } from "@/components/site-header";
import { useStorefrontProducts } from "@/components/storefront-products-provider";
import { buttonVariants } from "@/components/ui/button";
import {
  assets,
  comboModules,
  formatPrice,
  packages,
  playerCases,
  previewModels,
  series,
  statusStyles,
} from "@/lib/site-data";

const heroPreviewItems = [
  {
    tab: "日常饮用",
    title: "御罕泉天然苏打水 330ml",
    subtitle: "适合家庭餐桌、办公室和日常补水",
    meta: "330ml / 12瓶箱装",
    price: "¥89 起",
    image: assets.hero,
  },
  {
    tab: "聚会冰饮",
    title: "御罕泉气泡苏打水 330ml",
    subtitle: "无糖、清爽、有轻盈气泡感",
    meta: "330ml / 12瓶箱装",
    price: "¥99 起",
    image: assets.hero,
  },
  {
    tab: "家庭囤货",
    title: "御罕泉家庭箱装 500ml",
    subtitle: "适合长期饮用、茶水间和福利采购",
    meta: "500ml / 24瓶箱装",
    price: "¥168 起",
    image: assets.hero,
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#EEF8FF] text-[#102A43]">
      <SiteHeader />
      <Hero />
      <CategoryEntry />
      <BestSellers />
      <UsePreview />
      <BeforeAfter />
      <BundleSection />
      <CaseSection />
      <BrandStory />
      <CompanyFooter />
    </main>
  );
}

function Reveal({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.64, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function Hero() {
  const [active, setActive] = useState(0);
  const current = heroPreviewItems[active];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActive((value) => (value + 1) % heroPreviewItems.length);
    }, 4200);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(126,174,201,0.22),transparent_28%),linear-gradient(135deg,#F7FCFF_0%,#E6F6FF_48%,#F8FBFD_100%)]" />
      <div className="relative mx-auto grid min-h-[calc(100vh-80px)] max-w-7xl gap-10 px-4 py-12 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.42em] text-[#5F7687]">
            Yuhanquan Natural Soda Water
          </p>
          <h1 className="mt-8 max-w-3xl text-5xl font-semibold leading-[1.05] text-[#102A43] sm:text-7xl">
            给日常饮水一点清爽矿物感
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-[#5A7182]">
            御罕泉专注天然苏打水，提供经典原味、低钠、含气、玻璃瓶和企业定制规格。官网下单后，订单和库存会同步进入后台系统。
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link href="/products" className={buttonVariants()}>
              进入商品页 <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/packages" className={buttonVariants({ variant: "secondary" })}>
              查看箱装套餐
            </Link>
          </div>
        </Reveal>

        <Reveal className="overflow-hidden border border-[#B8C7D3]/50 bg-white/70 p-4 shadow-[0_28px_80px_rgba(76,139,170,0.16)] backdrop-blur">
          <div className="grid grid-cols-3 gap-2">
            {heroPreviewItems.map((item, index) => {
              const isActive = active === index;
              return (
                <button
                  key={item.tab}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setActive(index)}
                  className={`min-h-20 border px-3 py-4 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8C7D3] sm:text-center ${
                    isActive
                      ? "border-[#B8C7D3] bg-[#B8C7D3]/45 text-[#102A43]"
                      : "border-[#B8C7D3]/45 bg-white/55 text-[#6D8495] hover:bg-white"
                  }`}
                >
                  <span className="block text-sm font-medium sm:text-base">{item.tab}</span>
                  <span className="mt-2 block text-xs">{item.meta}</span>
                </button>
              );
            })}
          </div>

          <div className="relative mt-4 overflow-hidden bg-[#DDEFF8]">
            <div className="relative aspect-[16/10] min-h-[300px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.title}
                  className="absolute inset-0"
                  initial={{ opacity: 0, scale: 1.025, x: 18 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.985, x: -14 }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Image
                    src={current.image}
                    alt={`${current.title}展示图`}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </motion.div>
              </AnimatePresence>
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(238,248,255,0.05)_0%,rgba(238,248,255,0.12)_42%,rgba(238,248,255,0.88)_100%)]" />
              <motion.div
                aria-hidden="true"
                className="absolute inset-y-0 -left-1/3 w-1/3 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.34),transparent)]"
                animate={{ x: ["0%", "430%"] }}
                transition={{ duration: 5.8, repeat: Infinity, repeatDelay: 2.8, ease: "easeInOut" }}
              />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <div className="border border-white/70 bg-white/78 p-4 backdrop-blur">
                  <p className="text-xs uppercase tracking-[0.3em] text-[#5F7687]">{current.tab}</p>
                  <h2 className="mt-2 text-2xl font-semibold text-[#102A43]">{current.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-[#5A7182]">{current.subtitle}</p>
                  <div className="mt-4 flex flex-wrap gap-2 text-sm text-[#526A7C]">
                    <span className="border border-[#B8C7D3]/60 bg-white/70 px-3 py-2">{current.meta}</span>
                    <span className="border border-[#B8C7D3]/60 bg-white/70 px-3 py-2">{current.price}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function CategoryEntry() {
  return (
    <section className="border-y border-[#B8C7D3]/45 bg-white/58 py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {series.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href="/products"
                className="group border border-[#B8C7D3]/45 bg-white/70 p-6 transition hover:-translate-y-1 hover:border-[#8FA8B8] hover:bg-white"
              >
                <Icon className="h-7 w-7 text-[#6D8495]" />
                <h2 className="mt-6 text-2xl font-semibold text-[#102A43]">{item.name}</h2>
                <p className="mt-3 leading-7 text-[#5A7182]">{item.fit}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function BestSellers() {
  const { products } = useStorefrontProducts();
  const bestSellers = products.slice(0, 3);

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-8 sm:py-24">
      <Reveal>
        <p className="text-xs uppercase tracking-[0.36em] text-[#5F7687]">Best Sellers</p>
        <h2 className="mt-5 text-4xl font-semibold text-[#102A43] sm:text-5xl">热销苏打水</h2>
      </Reveal>
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {bestSellers.map((item) => (
          <article key={item.slug} className="overflow-hidden border border-[#B8C7D3]/45 bg-white/82 shadow-[0_18px_45px_rgba(76,139,170,0.10)]">
            <Link href={`/products/${item.slug}`} className="group block">
              <div className="relative aspect-[16/10] bg-[#DDEFF8]">
                <Image src={item.image} alt={item.cnName} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition duration-700 group-hover:scale-105" />
                <span className={`absolute left-3 top-3 border px-3 py-1.5 text-xs ${statusStyles[item.status]}`}>{item.status}</span>
              </div>
            </Link>
            <div className="p-5">
              <p className="text-xs tracking-[0.22em] text-[#7C94A5]">{item.name}</p>
              <h3 className="mt-2 text-2xl font-semibold text-[#102A43]">{item.cnName}</h3>
              <p className="mt-3 line-clamp-2 leading-7 text-[#5A7182]">{item.description}</p>
              <div className="mt-6 flex items-center justify-between gap-3">
                <span className="text-xl font-semibold text-[#526A7C]">{formatPrice(item.price)}</span>
                <AddToCartButton slug={item.slug} className="h-11 px-4 text-xs" />
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function UsePreview() {
  const [selected, setSelected] = useState(0);
  const modulesTotal = useMemo(
    () => comboModules.slice(0, selected + 2).reduce((sum, item) => sum + item.price, 0),
    [selected],
  );

  return (
    <section className="bg-[#DFF2FC] py-16 sm:py-24">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.36em] text-[#5F7687]">Scenario Preview</p>
          <h2 className="mt-5 text-4xl font-semibold text-[#102A43] sm:text-5xl">
            按场景选择规格
          </h2>
          <p className="mt-5 leading-8 text-[#5A7182]">
            日常饮用、聚会冰饮、家庭囤货，对应的容量和箱规不同。你可以像原来的商品预览一样切换推荐方案。
          </p>
        </Reveal>
        <Reveal className="border border-[#B8C7D3]/45 bg-white/78 p-5">
          <div className="grid gap-3 sm:grid-cols-3">
            {previewModels.map((item, index) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => setSelected(index)}
                  className={`border p-5 text-left transition ${
                    selected === index
                      ? "border-[#8FA8B8] bg-[#B8C7D3]/35"
                      : "border-[#B8C7D3]/45 bg-white/70 hover:bg-white"
                  }`}
                >
                  <Icon className="h-6 w-6 text-[#5F7687]" />
                  <p className="mt-4 text-xl font-semibold text-[#102A43]">{item.name}</p>
                  <p className="mt-2 text-sm text-[#5A7182]">{item.scale} · {item.priceNote}</p>
                </button>
              );
            })}
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {comboModules.slice(0, selected + 2).map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.name} className="flex items-center justify-between border border-[#B8C7D3]/45 bg-[#F7FCFF] p-4">
                  <span className="inline-flex items-center gap-3 text-[#102A43]">
                    <Icon className="h-5 w-5 text-[#6D8495]" />
                    {item.name}
                  </span>
                  <span className="font-semibold text-[#526A7C]">{formatPrice(item.price)}</span>
                </div>
              );
            })}
          </div>
          <div className="mt-5 flex items-center justify-between border border-[#B8C7D3]/55 bg-white p-5">
            <span className="text-[#5A7182]">推荐组合预算</span>
            <strong className="text-2xl text-[#102A43]">{formatPrice(modulesTotal)}</strong>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function BeforeAfter() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-8 sm:py-24">
      <Reveal>
        <p className="text-xs uppercase tracking-[0.36em] text-[#5F7687]">Before / After</p>
        <h2 className="mt-5 text-4xl font-semibold text-[#102A43] sm:text-5xl">
          从临时买水到稳定补货
        </h2>
      </Reveal>
      <div className="mt-10 grid gap-5 lg:grid-cols-2">
        {[
          ["没有计划", "临时采购、规格混乱、库存难以判断。", assets.comparison],
          ["有了御罕泉", "按规格下单，官网订单进入后台，库存与补货建议形成闭环。", assets.gallery],
        ].map(([title, text, image]) => (
          <article key={title} className="overflow-hidden border border-[#B8C7D3]/45 bg-white/78">
            <div className="relative aspect-[16/9]">
              <Image src={image} alt={title} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
            </div>
            <div className="p-6">
              <h3 className="text-3xl font-semibold text-[#102A43]">{title}</h3>
              <p className="mt-3 leading-7 text-[#5A7182]">{text}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function BundleSection() {
  return (
    <section className="bg-white/58 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.36em] text-[#5F7687]">Bundles</p>
          <h2 className="mt-5 text-4xl font-semibold text-[#102A43] sm:text-5xl">箱装套餐推荐</h2>
        </Reveal>
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {packages.map((item, index) => (
            <article key={item.name} className={`border p-6 ${index === 1 ? "border-[#8FA8B8] bg-[#DFF2FC]" : "border-[#B8C7D3]/45 bg-white/78"}`}>
              <p className="text-sm text-[#5F7687]">{item.highlight}</p>
              <h3 className="mt-4 text-3xl font-semibold text-[#102A43]">{item.name}</h3>
              <p className="mt-5 text-4xl font-semibold text-[#526A7C]">{item.price}</p>
              <ul className="mt-8 space-y-3 text-[#5A7182]">
                {item.content.map((line) => <li key={line}>· {line}</li>)}
              </ul>
              <Link href="/packages" className={buttonVariants({ className: "mt-8 w-full", variant: index === 1 ? "primary" : "secondary" })}>
                查看套餐
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function CaseSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-8 sm:py-24">
      <Reveal>
        <p className="text-xs uppercase tracking-[0.36em] text-[#5F7687]">Cases</p>
        <h2 className="mt-5 text-4xl font-semibold text-[#102A43] sm:text-5xl">饮用场景案例</h2>
      </Reveal>
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {playerCases.slice(0, 3).map((item) => (
          <Link key={item.title} href="/cases" className="group overflow-hidden border border-[#B8C7D3]/45 bg-white/78">
            <div className="relative aspect-[4/3]">
              <Image src={item.image} alt={item.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition duration-700 group-hover:scale-105" />
            </div>
            <div className="p-5">
              <h3 className="text-2xl font-semibold text-[#102A43]">{item.title}</h3>
              <p className="mt-3 text-[#5A7182]">{item.likes} 人收藏这个搭配</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function BrandStory() {
  return (
    <section className="bg-[#DFF2FC] py-16 sm:py-24">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.36em] text-[#5F7687]">Brand Story</p>
          <h2 className="mt-5 text-4xl font-semibold text-[#102A43] sm:text-5xl">
            一瓶更适合长期饮用的天然苏打水
          </h2>
        </Reveal>
        <Reveal>
          <p className="text-lg leading-9 text-[#5A7182]">
            御罕泉希望把天然苏打水做成稳定、清爽、易复购的日常饮品。官网负责真实销售转化，后台负责商品、订单、库存和未来 AI 补货建议，让“卖水”这件事从前台到后台形成闭环。
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {[
              [Droplets, "天然弱碱"],
              [ShieldCheck, "低负担饮用"],
              [Truck, "库存联动"],
            ].map(([Icon, label]) => {
              const TypedIcon = Icon as typeof Droplets;
              return (
                <div key={String(label)} className="border border-[#B8C7D3]/45 bg-white/70 p-5">
                  <TypedIcon className="h-6 w-6 text-[#6D8495]" />
                  <p className="mt-4 font-semibold text-[#102A43]">{label as string}</p>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function CompanyFooter() {
  return (
    <footer className="border-t border-[#B8C7D3]/45 bg-[#F7FCFF] py-12">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 text-sm text-[#5A7182] sm:px-8 lg:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <h2 className="text-2xl font-semibold tracking-[0.18em] text-[#102A43]">御罕泉</h2>
          <p className="mt-4 max-w-md leading-7">
            御罕泉天然苏打水有限公司，专注天然苏打水、箱装饮用水与企业定制饮品服务。
          </p>
        </div>
        <div>
          <h3 className="font-semibold text-[#102A43]">联系信息</h3>
          <p className="mt-4 leading-7">客服电话：400-800-2036</p>
          <p className="leading-7">邮箱：service@yuhanquan.example</p>
          <p className="leading-7">地址：黑龙江省安达市御泉路 88 号</p>
        </div>
        <div>
          <h3 className="font-semibold text-[#102A43]">服务说明</h3>
          <p className="mt-4 leading-7">支持家庭箱装、企业采购、会议用水和定制礼盒咨询。</p>
          <p className="mt-2 leading-7">页面信息为演示品牌资料，可按真实公司信息替换。</p>
        </div>
      </div>
    </footer>
  );
}
