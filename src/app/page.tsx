"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  Box,
  MoveHorizontal,
  PackageOpen,
  Rotate3D,
  ShoppingBag,
} from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { buttonVariants } from "@/components/ui/button";
import {
  assets,
  comboModules,
  formatPrice,
  previewAngles,
  previewModels,
  products,
  series,
  statusStyles,
} from "@/lib/site-data";

const heroPreviewItems = [
  {
    model: "1:64 车模",
    short: "车模",
    title: "工业车库地台",
    scene: "Industrial Bay 01",
    scale: "1:64 / 1:43",
    price: "¥698 - ¥868",
    image: assets.industrialGarage,
    objectPosition: "50% center",
    tagPosition: "left-[46%] top-[44%]",
    framePosition: "left-[43%] top-[32%] h-[38%] w-[42%]",
    description: "适合跑车、改装车与工业陈列主题",
  },
  {
    model: "1:18 高达",
    short: "高达",
    title: "科幻未来地台",
    scene: "Future Metro 06",
    scale: "1:18 / 1:24",
    price: "¥928 - ¥998",
    image: assets.futureMetro,
    objectPosition: "50% center",
    tagPosition: "right-[18%] top-[30%]",
    framePosition: "right-[10%] top-[18%] h-[58%] w-[54%]",
    description: "适合机甲、概念模型与冷光展示柜",
  },
  {
    model: "1:24 坦克",
    short: "坦克",
    title: "军事基地地台",
    scene: "Military Outpost 05",
    scale: "1:24 / 1:18",
    price: "¥928 起",
    image: assets.militaryOutpost,
    objectPosition: "50% center",
    tagPosition: "left-[18%] top-[48%]",
    framePosition: "left-[12%] top-[34%] h-[46%] w-[55%]",
    description: "适合坦克、装甲车与基地陈列主题",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0A0A0A] text-white">
      <SiteHeader />
      <Hero />
      <CategoryEntry />
      <BestSellers />
      <ModelPreview />
      <BeforeAfter />
      <SceneComposer />
      <StorageDemo />
      <Product360 />
      <ExploreMore />
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
      transition={{ duration: 0.68, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function HeroPreviewer({
  activePreview,
  setActivePreview,
}: {
  activePreview: number;
  setActivePreview: (index: number) => void;
}) {
  const current = heroPreviewItems[activePreview];

  return (
    <Reveal>
      <div className="overflow-hidden border border-white/10 bg-black/50 p-3 shadow-[0_28px_80px_rgba(0,0,0,0.35)] backdrop-blur md:p-5">
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          {heroPreviewItems.map((item, index) => {
            const isActive = activePreview === index;

            return (
              <button
                key={item.model}
                type="button"
                onClick={() => setActivePreview(index)}
                aria-pressed={isActive}
                className={`min-h-20 border px-4 py-4 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4B483] sm:text-center ${
                  isActive
                    ? "border-[#D4B483]/70 bg-[#D4B483]/14 text-white"
                    : "border-white/10 bg-white/[0.035] text-white/58 hover:border-white/25 hover:bg-white/[0.07] hover:text-white"
                }`}
              >
                <span className="block text-base font-medium">{item.model}</span>
                <span
                  className={`mt-2 block text-xs ${
                    isActive ? "text-[#D4B483]" : "text-white/38"
                  }`}
                >
                  推荐 {item.short} 展示
                </span>
              </button>
            );
          })}
        </div>

        <div className="relative mt-4 overflow-hidden bg-[#080808]">
          <div className="relative aspect-[16/10] min-h-[260px] sm:aspect-[16/9]">
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
                  alt={`${current.title} 交互式场景预览`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  style={{ objectPosition: current.objectPosition }}
                />
              </motion.div>
            </AnimatePresence>

            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.08)_0%,rgba(0,0,0,0.12)_50%,rgba(0,0,0,0.72)_100%)]" />
            <motion.div
              aria-hidden="true"
              className="absolute inset-y-0 -left-1/3 w-1/3 bg-[linear-gradient(90deg,transparent,rgba(255,235,190,0.16),transparent)]"
              animate={{ x: ["0%", "420%"] }}
              transition={{
                duration: 5.8,
                repeat: Infinity,
                repeatDelay: 2.8,
                ease: "easeInOut",
              }}
            />
            <motion.div
              key={`${current.title}-tag`}
              className={`absolute ${current.tagPosition} hidden border border-[#D4B483]/65 bg-black/55 px-3 py-2 text-xs text-[#F3D7A7] backdrop-blur sm:block`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
            >
              当前推荐地台
            </motion.div>
            <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6">
              <div className="border border-white/10 bg-black/55 p-4 backdrop-blur">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.28em] text-[#D4B483]">
                      {current.scene}
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold">
                      {current.title}
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-white/55">
                      {current.description}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-sm sm:min-w-52">
                    <div className="border border-white/10 bg-white/[0.035] p-3">
                      <p className="text-white/36">适配比例</p>
                      <p className="mt-1 text-white">{current.scale}</p>
                    </div>
                    <div className="border border-white/10 bg-white/[0.035] p-3">
                      <p className="text-white/36">价格区间</p>
                      <p className="mt-1 text-[#D4B483]">{current.price}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

function HeroPreviewerClean({
  activePreview,
  setActivePreview,
}: {
  activePreview: number;
  setActivePreview: (index: number) => void;
}) {
  const current = heroPreviewItems[activePreview];

  return (
    <Reveal>
      <div className="overflow-hidden border border-white/10 bg-black/50 p-3 shadow-[0_28px_80px_rgba(0,0,0,0.35)] backdrop-blur md:p-5">
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          {heroPreviewItems.map((item, index) => {
            const isActive = activePreview === index;

            return (
              <button
                key={item.model}
                type="button"
                onClick={() => setActivePreview(index)}
                aria-pressed={isActive}
                className={`min-h-20 border px-4 py-4 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4B483] sm:text-center ${
                  isActive
                    ? "border-[#D4B483]/70 bg-[#D4B483]/14 text-white"
                    : "border-white/10 bg-white/[0.035] text-white/58 hover:border-white/25 hover:bg-white/[0.07] hover:text-white"
                }`}
              >
                <span className="block text-base font-medium">{item.model}</span>
                <span
                  className={`mt-2 block text-xs ${
                    isActive ? "text-[#D4B483]" : "text-white/38"
                  }`}
                >
                  推荐 {item.short} 展示
                </span>
              </button>
            );
          })}
        </div>

        <div className="relative mt-4 overflow-hidden bg-[#080808]">
          <div className="relative aspect-[16/10] min-h-[260px] sm:aspect-[16/9]">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.title}
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 1.03, x: 18 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.985, x: -14 }}
                transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
              >
                <Image
                  src={current.image}
                  alt={`${current.title} 轮播展示`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  style={{ objectPosition: current.objectPosition }}
                />
              </motion.div>
            </AnimatePresence>

            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.02)_0%,rgba(0,0,0,0.04)_58%,rgba(0,0,0,0.18)_100%)]" />
            <motion.div
              aria-hidden="true"
              className="absolute inset-y-0 -left-1/3 w-1/3 bg-[linear-gradient(90deg,transparent,rgba(255,235,190,0.14),transparent)]"
              animate={{ x: ["0%", "420%"] }}
              transition={{
                duration: 5.8,
                repeat: Infinity,
                repeatDelay: 2.8,
                ease: "easeInOut",
              }}
            />
            <div className="absolute inset-x-0 bottom-4 flex justify-center gap-2">
              {heroPreviewItems.map((item, index) => (
                <button
                  key={item.title}
                  type="button"
                  aria-label={`切换到 ${item.title}`}
                  onClick={() => setActivePreview(index)}
                  className={`h-1.5 rounded-full transition ${
                    activePreview === index
                      ? "w-8 bg-[#D4B483]"
                      : "w-2 bg-white/35 hover:bg-white/65"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

function Hero() {
  const [activePreview, setActivePreview] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActivePreview((current) => (current + 1) % heroPreviewItems.length);
    }, 4200);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="hero-scene relative overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={assets.hero}
          alt="模型车搭配工业车库地台展示效果"
          fill
          priority
          sizes="100vw"
          className="hero-depth-bg object-cover"
        />
        <div className="hero-ambient-glow absolute inset-0" />
        <div className="hero-light-sweep absolute inset-y-0 right-[-24%] w-[42%]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#0A0A0A_0%,rgba(10,10,10,0.84)_42%,rgba(10,10,10,0.18)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,10,10,0)_62%,#0A0A0A_100%)]" />
      </div>
      <div className="relative mx-auto grid min-h-[720px] max-w-7xl gap-10 px-4 py-16 sm:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.38em] text-[#D4B483]">
            Diorama Base Store
          </p>
          <h1 className="mt-7 max-w-3xl text-4xl font-semibold leading-tight sm:text-6xl lg:text-7xl">
            给模型一个能被收藏的场景
          </h1>
          <p className="mt-6 max-w-xl text-base leading-8 text-white/64 sm:text-lg">
            从车模到高达、坦克，按比例和场景选择地台。加入购物车，整理你的展示方案。
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/products" className={buttonVariants()}>
              进入商品页 <ShoppingBag className="h-4 w-4" />
            </Link>
            <Link href="/cases" className={buttonVariants({ variant: "secondary" })}>
              查看玩家案例
            </Link>
          </div>
        </Reveal>
        <HeroPreviewerClean
          activePreview={activePreview}
          setActivePreview={setActivePreview}
        />
        <Reveal className="hidden border border-white/10 bg-black/45 p-4 backdrop-blur md:p-5">
          <div className="grid grid-cols-3 gap-3 text-center">
            {["1:64 车模", "1:18 高达", "1:24 坦克"].map((item) => (
              <div key={item} className="border border-white/10 bg-white/[0.04] p-4">
                <p className="text-sm text-white/72">{item}</p>
                <p className="mt-2 text-xs text-[#D4B483]">可筛选</p>
              </div>
            ))}
          </div>
          <div className="relative mt-4 aspect-[16/9] overflow-hidden bg-[#111]">
            <Image
              src={assets.gallery}
              alt="多款模型场景地台展示"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function CategoryEntry() {
  return (
    <section className="bg-[#0A0A0A] py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <SectionTitle eyebrow="Categories" title="按场景进入商品页" />
        <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
          {series.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                href="/products"
                key={item.name}
                className="group border border-white/10 bg-[#111111] p-4 transition hover:border-[#D4B483]/50 hover:bg-[#171717]"
              >
                <Icon className="h-7 w-7 text-[#D4B483]" />
                <h3 className="mt-6 text-lg font-semibold">{item.name}</h3>
                <p className="mt-2 text-xs leading-5 text-white/45">{item.fit}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function BestSellers() {
  return (
    <section className="bg-[#111111] py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <SectionTitle eyebrow="Best Sellers" title="热销地台" />
          <Link href="/products" className={buttonVariants({ variant: "secondary" })}>
            查看全部商品
          </Link>
        </div>
        <div className="mt-9 grid gap-5 md:grid-cols-3">
          {products.slice(0, 3).map((item) => (
            <Link
              href={`/products/${item.slug}`}
              key={item.slug}
              className="group overflow-hidden border border-white/10 bg-[#0A0A0A] transition hover:-translate-y-1 hover:border-[#D4B483]/50"
            >
              <div className="relative aspect-[16/10]">
                <Image
                  src={item.image}
                  alt={`${item.cnName}热销商品图`}
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
                <p className="text-xs tracking-[0.18em] text-white/40">{item.name}</p>
                <h3 className="mt-2 text-2xl font-semibold">{item.cnName}</h3>
                <div className="mt-4 flex items-center justify-between gap-3">
                  <p className="text-[#D4B483]">{formatPrice(item.price)}</p>
                  <p className="text-sm text-white/45">{item.scale}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function ModelPreview() {
  const [model, setModel] = useState(0);
  const [angle, setAngle] = useState(0);
  const selected = previewModels[model];
  const Icon = selected.icon;

  return (
    <section className="bg-[#0A0A0A] py-16 sm:py-24">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <Reveal>
          <SectionTitle eyebrow="Match Preview" title="模型搭配预览" />
          <p className="mt-5 max-w-xl leading-8 text-white/56">
            切换模型和角度，快速判断地台是否承载你的收藏主题。
          </p>
          <div className="mt-8 flex flex-wrap gap-2">
            {previewModels.map((item, index) => (
              <button
                key={item.name}
                onClick={() => setModel(index)}
                className={`min-h-11 border px-4 text-sm transition ${
                  model === index
                    ? "border-[#D4B483] bg-[#D4B483] text-black"
                    : "border-white/12 text-white/62 hover:border-white/35 hover:text-white"
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {previewAngles.map((item, index) => (
              <button
                key={item}
                onClick={() => setAngle(index)}
                className={`min-h-10 border px-3 text-xs transition ${
                  angle === index
                    ? "border-white/60 text-white"
                    : "border-white/10 text-white/45 hover:text-white"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </Reveal>
        <Reveal className="border border-white/10 bg-[#111111] p-4">
          <div className="relative aspect-[16/10] overflow-hidden bg-black">
            <Image
              src={model === 0 ? assets.hero : assets.gallery}
              alt={`${selected.name}搭配地台效果预览`}
              fill
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="object-cover transition duration-500"
              style={{
                objectPosition: `${32 + model * 24}% ${50 + angle * 8}%`,
                transform: `scale(${1 + angle * 0.04})`,
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5">
              <Icon className="h-8 w-8 text-[#D4B483]" />
              <h3 className="mt-4 text-3xl font-semibold">{selected.name}</h3>
              <p className="mt-2 text-white/55">
                {selected.scale} / {selected.priceNote} / {previewAngles[angle]}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function BeforeAfter() {
  const [position, setPosition] = useState(52);

  return (
    <section className="bg-[#111111] py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <SectionTitle eyebrow="Before / After" title="同一个模型，展示感完全不同" />
        <div className="relative mt-9 aspect-[16/10] overflow-hidden border border-white/10 bg-black sm:aspect-[16/8]">
          <Image
            src={assets.comparison}
            alt="模型直接摆放与搭配地台后的拖拽对比"
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div
            className="absolute inset-0 bg-black/50 backdrop-grayscale"
            style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
          />
          <div className="absolute top-0 h-full w-px bg-white/80" style={{ left: `${position}%` }} />
          <div
            className="absolute top-1/2 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/40 bg-black/60 backdrop-blur"
            style={{ left: `${position}%` }}
          >
            <MoveHorizontal className="h-5 w-5" />
          </div>
          <input
            aria-label="拖动查看地台前后效果"
            className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
            type="range"
            min="18"
            max="82"
            value={position}
            onChange={(event) => setPosition(Number(event.target.value))}
          />
        </div>
      </div>
    </section>
  );
}

function SceneComposer() {
  const [selected, setSelected] = useState<string[]>(["路灯模块", "背景墙"]);
  const basePrice = 698;
  const total = useMemo(
    () =>
      basePrice +
      comboModules
        .filter((item) => selected.includes(item.name))
        .reduce((sum, item) => sum + item.price, 0),
    [selected],
  );

  function toggle(name: string) {
    setSelected((current) =>
      current.includes(name)
        ? current.filter((item) => item !== name)
        : [...current, name],
    );
  }

  return (
    <section className="bg-[#0A0A0A] py-16 sm:py-24">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-8 lg:grid-cols-[1fr_1fr]">
        <Reveal>
          <SectionTitle eyebrow="Scene Composer" title="场景组合器" />
          <p className="mt-5 leading-8 text-white/56">
            添加路灯、背景墙、维修工具等模块，实时查看套餐内容和价格。
          </p>
          <div className="mt-8 grid grid-cols-2 gap-3">
            {comboModules.map((item) => {
              const Icon = item.icon;
              const active = selected.includes(item.name);
              return (
                <button
                  key={item.name}
                  onClick={() => toggle(item.name)}
                  className={`min-h-24 border p-4 text-left transition ${
                    active
                      ? "border-[#D4B483] bg-[#D4B483]/10"
                      : "border-white/10 bg-[#111111] hover:border-white/30"
                  }`}
                >
                  <Icon className="h-6 w-6 text-[#D4B483]" />
                  <p className="mt-4 font-medium">{item.name}</p>
                  <p className="mt-1 text-sm text-white/45">+{formatPrice(item.price)}</p>
                </button>
              );
            })}
          </div>
        </Reveal>
        <Reveal className="border border-white/10 bg-[#111111] p-4">
          <div className="relative aspect-[16/10] overflow-hidden bg-black">
            <Image
              src={assets.hero}
              alt="组合模块实时预览"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/30" />
            {selected.map((item, index) => (
              <span
                key={item}
                className="absolute border border-[#D4B483]/50 bg-black/65 px-3 py-2 text-xs text-[#D4B483] backdrop-blur"
                style={{ left: 24 + index * 18 + "%", top: 18 + index * 13 + "%" }}
              >
                {item}
              </span>
            ))}
          </div>
          <div className="mt-5 flex items-center justify-between">
            <div>
              <p className="text-sm text-white/42">套餐预估</p>
              <p className="mt-1 text-3xl font-semibold text-[#D4B483]">
                {formatPrice(total)}
              </p>
            </div>
            <Link href="/products" className={buttonVariants()}>
              去商品页
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function StorageDemo() {
  const [packed, setPacked] = useState(false);

  return (
    <section className="bg-[#111111] py-16 sm:py-24">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
        <Reveal>
          <SectionTitle eyebrow="Storage Demo" title="展开展示，合上收纳" />
          <p className="mt-5 leading-8 text-white/56">
            地台可在展示状态与收纳状态之间切换，适合桌面、柜内和拍摄场景反复使用。
          </p>
          <button
            onClick={() => setPacked((value) => !value)}
            className={buttonVariants({ className: "mt-8" })}
          >
            {packed ? "展开展示" : "切换收纳"} {packed ? <PackageOpen className="h-4 w-4" /> : <Box className="h-4 w-4" />}
          </button>
        </Reveal>
        <Reveal className="relative min-h-[320px] overflow-hidden border border-white/10 bg-[#0A0A0A] p-6">
          <motion.div
            animate={{
              scale: packed ? 0.72 : 1,
              rotateX: packed ? 12 : 0,
              y: packed ? 36 : 0,
            }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto aspect-[16/9] max-w-2xl overflow-hidden bg-black"
          >
            <Image
              src={assets.gallery}
              alt="地台展开与收纳状态演示"
              fill
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="object-cover"
            />
          </motion.div>
          <p className="mt-5 text-center text-sm tracking-[0.2em] text-white/48">
            {packed ? "收纳状态：减少占用，等待下一次搭配" : "展示状态：即摆即用，适合拍摄与陈列"}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function Product360() {
  const [rotation, setRotation] = useState(45);

  return (
    <section className="bg-[#0A0A0A] py-16 sm:py-24">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-8 lg:grid-cols-[1fr_1fr] lg:items-center">
        <Reveal className="border border-white/10 bg-[#111111] p-5">
          <div className="relative aspect-square overflow-hidden bg-black">
            <Image
              src={assets.hero}
              alt="360 度产品展示"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              style={{
                objectPosition: `${30 + rotation / 3}% center`,
                transform: `scale(1.08) rotate(${(rotation - 45) / 90}deg)`,
              }}
            />
            <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-black/65 px-3 py-2 text-xs text-white/70 backdrop-blur">
              <Rotate3D className="h-4 w-4 text-[#D4B483]" />
              拖动下方滑杆查看角度
            </div>
          </div>
          <input
            aria-label="旋转查看产品角度"
            type="range"
            min="0"
            max="100"
            value={rotation}
            onChange={(event) => setRotation(Number(event.target.value))}
            className="mt-5 w-full accent-[#D4B483]"
          />
        </Reveal>
        <Reveal>
          <SectionTitle eyebrow="360 Product View" title="看清纹理、边界与灯光" />
          <p className="mt-5 leading-8 text-white/56">
            通过旋转视角检查地台高度、边缘、旧化纹理和灯光层次，减少购买前的不确定感。
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function ExploreMore() {
  return (
    <section className="bg-[#111111] py-16 sm:py-24">
      <div className="mx-auto grid max-w-7xl gap-5 px-4 sm:px-8 lg:grid-cols-2">
        <Link
          href="/cases"
          className="group border border-white/10 bg-[#0A0A0A] p-6 transition hover:border-[#D4B483]/50"
        >
          <p className="text-xs uppercase tracking-[0.32em] text-[#D4B483]">
            Cases
          </p>
          <h2 className="mt-4 text-3xl font-semibold">玩家案例</h2>
          <p className="mt-4 leading-7 text-white/55">
            查看不同模型与地台的搭配方式，后续可替换成长方形对比图片。
          </p>
        </Link>
        <Link
          href="/packages"
          className="group border border-white/10 bg-[#0A0A0A] p-6 transition hover:border-[#D4B483]/50"
        >
          <p className="text-xs uppercase tracking-[0.32em] text-[#D4B483]">
            Bundles
          </p>
          <h2 className="mt-4 text-3xl font-semibold">套餐推荐</h2>
          <p className="mt-4 leading-7 text-white/55">
            对比基础版、进阶版、收藏版的内容差异，快速选择合适组合。
          </p>
        </Link>
      </div>
    </section>
  );
}

function BrandStory() {
  return (
    <section className="bg-[#0A0A0A] py-16 sm:py-24">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-8 lg:grid-cols-[1fr_1fr] lg:items-center">
        <Reveal className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={assets.gallery}
            alt="STAGECRAFT 模型地台品牌故事展示"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </Reveal>
        <Reveal>
          <SectionTitle eyebrow="Brand Story" title="不是摆件，是展示系统" />
          <p className="mt-6 leading-8 text-white/60">
            STAGECRAFT 把模型收藏中最耗时的布景、旧化、摄影构图提前完成。你只需要选择比例和场景，把模型放上去，就能得到更完整的收藏展示效果。
          </p>
          <Link href="/products" className={buttonVariants({ className: "mt-8" })}>
            开始选择地台
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

function CompanyFooter() {
  const footerGroups = [
    {
      title: "品牌服务",
      links: ["商品目录", "场景定制", "企业陈列", "摄影合作"],
    },
    {
      title: "购买支持",
      links: ["发货与包装", "售后说明", "保养建议", "常见问题"],
    },
    {
      title: "收藏者计划",
      links: ["新品预订", "玩家案例", "会员档案", "线下展陈"],
    },
  ];

  return (
    <footer className="border-t border-white/10 bg-[#070707]">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-8 sm:py-16 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <p className="text-sm font-semibold tracking-[0.32em] text-white">
            STAGECRAFT
          </p>
          <p className="mt-5 max-w-xl text-sm leading-7 text-white/55">
            由上海森曜微缩艺术有限公司虚构运营，专注于预制模型场景地台、收藏级展示系统与模型摄影布景方案。
          </p>
          <div className="mt-8 grid gap-3 text-sm text-white/58 sm:grid-cols-2">
            <p>公司名称：上海森曜微缩艺术有限公司</p>
            <p>客服电话：400-821-1936</p>
            <p>联系邮箱：service@stagecraft-mini.com</p>
            <p>展厅地址：上海市徐汇区衡山路 318 号 4F</p>
            <p>工作时间：周一至周五 10:00-18:30</p>
            <p>备案信息：沪ICP备2026041936号-1</p>
          </div>
          <p className="mt-8 text-xs leading-6 text-white/35">
            以上公司与备案信息为演示用虚构内容，用于完善网站底部信息展示。
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-3">
          {footerGroups.map((group) => (
            <div key={group.title}>
              <h3 className="text-sm font-medium text-[#D4B483]">
                {group.title}
              </h3>
              <ul className="mt-4 space-y-3 text-sm text-white/48">
                {group.links.map((item) => (
                  <li key={item}>
                    <span className="transition hover:text-white">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-5 text-xs text-white/36 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>© 2026 STAGECRAFT. All rights reserved.</p>
          <p>Premium Miniature Diorama Base Store</p>
        </div>
      </div>
    </footer>
  );
}

function SectionTitle({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-[0.36em] text-[#D4B483]">
        {eyebrow}
      </p>
      <h2 className="mt-4 text-3xl font-semibold leading-tight sm:text-5xl">
        {title}
      </h2>
    </div>
  );
}
