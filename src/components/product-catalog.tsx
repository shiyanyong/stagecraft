"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, SlidersHorizontal } from "lucide-react";
import { AddToCartButton } from "@/components/add-to-cart-button";
import { useStorefrontProducts } from "@/components/storefront-products-provider";
import {
  formatPrice,
  scaleOptions,
  sceneCategories,
  statusStyles,
  type ProductStatus,
  type Scale,
} from "@/lib/site-data";

const allOption = "全部";
const statusOptions = [
  allOption,
  "现货",
  "预订",
  "小批量",
] as Array<typeof allOption | ProductStatus>;

const statusClass = "border-[#D4B483]/55 bg-[#D4B483]/10 text-[#D4B483]";

export function ProductCatalog() {
  const [scale, setScale] = useState<typeof allOption | Scale>(allOption);
  const [scene, setScene] = useState(allOption);
  const [status, setStatus] = useState<typeof allOption | ProductStatus>(allOption);
  const { products, synced } = useStorefrontProducts();

  const activeScenes = useMemo(() => {
    return Array.from(new Set([...sceneCategories, ...products.map((item) => item.scene)]));
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      const scaleMatched = scale === allOption || item.scales.includes(scale);
      const sceneMatched = scene === allOption || item.scene === scene;
      const statusMatched = status === allOption || item.status === status;
      return scaleMatched && sceneMatched && statusMatched;
    });
  }, [products, scale, scene, status]);

  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-8 sm:py-24">
      <p className="text-xs uppercase tracking-[0.36em] text-[#D4B483]">
        Shop Diorama Bases
      </p>
      <div className="mt-6 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
        <h1 className="max-w-4xl text-4xl font-semibold leading-tight sm:text-6xl lg:text-7xl">
          选择适合你模型的场景地台
        </h1>
        <div className="flex w-fit items-center gap-3 border border-white/15 px-4 py-3 text-xs tracking-[0.12em] text-white/55">
          <SlidersHorizontal className="h-4 w-4" />
          {filteredProducts.length} / {products.length} 款商品
          {synced ? " · 已同步后台" : ""}
        </div>
      </div>

      <div className="mt-10 space-y-5 border-y border-white/10 py-5">
        <FilterGroup
          label="比例"
          options={[allOption, ...scaleOptions]}
          value={scale}
          onChange={(value) => setScale(value as typeof allOption | Scale)}
        />
        <FilterGroup
          label="场景"
          options={[allOption, ...activeScenes]}
          value={scene}
          onChange={setScene}
        />
        <FilterGroup
          label="状态"
          options={statusOptions}
          value={status}
          onChange={(value) => setStatus(value as typeof allOption | ProductStatus)}
        />
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {filteredProducts.map((item) => (
          <article
            key={item.slug}
            className="overflow-hidden border border-white/10 bg-[#111111] transition hover:-translate-y-1 hover:border-[#D4B483]/50"
          >
            <Link
              href={`/products/${item.slug}`}
              className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4B483]"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-black">
                <Image
                  src={item.image}
                  alt={`${item.cnName}商品图`}
                  fill
                  sizes="(max-width: 1280px) 50vw, 33vw"
                  className="object-cover transition duration-700 group-hover:scale-105"
                  style={{ objectPosition: item.objectPosition }}
                />
                <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-3 p-3">
                  <span
                    className={`border px-3 py-1.5 text-xs tracking-[0.16em] backdrop-blur ${statusStyles[item.status] ?? statusClass}`}
                  >
                    {item.status}
                  </span>
                  <span className="border border-white/15 bg-black/55 px-3 py-1.5 text-xs text-white/70 backdrop-blur">
                    {item.scene}
                  </span>
                </div>
              </div>
            </Link>
            <div className="p-5 sm:p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="truncate text-xs tracking-[0.22em] text-white/38">
                    {item.name}
                  </p>
                  <h2 className="mt-2 text-xl font-semibold sm:text-2xl">
                    {item.cnName}
                  </h2>
                </div>
                <p className="shrink-0 text-xl font-semibold text-[#D4B483]">
                  {formatPrice(item.price)}
                </p>
              </div>
              <p className="mt-4 line-clamp-2 min-h-[3.1rem] text-sm leading-6 text-white/56">
                {item.description}
              </p>
              <div className="mt-5 grid grid-cols-2 gap-2 text-xs text-white/58">
                <Spec label="比例" value={item.scale} />
                <Spec label="尺寸" value={item.size} />
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {item.materialKeywords.slice(0, 3).map((keyword) => (
                  <span
                    key={keyword}
                    className="border border-white/10 px-2.5 py-1.5 text-xs text-white/48"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
              <div className="mt-6 grid gap-3 sm:grid-cols-[1fr_auto]">
                <Link
                  href={`/products/${item.slug}`}
                  className="inline-flex h-12 items-center justify-center gap-2 border border-white/15 px-4 text-xs tracking-[0.18em] text-white/70 transition hover:border-[#D4B483] hover:text-[#D4B483]"
                >
                  查看详情 <ArrowRight className="h-4 w-4" />
                </Link>
                <AddToCartButton slug={item.slug} className="w-full sm:w-auto" />
              </div>
            </div>
          </article>
        ))}
      </div>

      {filteredProducts.length === 0 ? (
        <div className="mt-12 border border-white/10 bg-[#111111] p-8 text-white/60">
          暂无匹配商品。可以切换比例或场景，或联系定制对应尺寸。
        </div>
      ) : null}
    </section>
  );
}

function FilterGroup({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-[70px_1fr] sm:items-center">
      <p className="text-sm text-white/42">{label}</p>
      <div className="scrollbar-none flex gap-2 overflow-x-auto pb-1 sm:flex-wrap">
        {options.map((option) => {
          const active = option === value;
          return (
            <button
              key={option}
              type="button"
              onClick={() => onChange(option)}
              className={`min-h-11 shrink-0 border px-4 text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4B483] ${
                active
                  ? "border-[#D4B483] bg-[#D4B483] text-black"
                  : "border-white/12 bg-white/[0.03] text-white/62 hover:border-white/32 hover:text-white"
              }`}
              aria-pressed={active}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-white/10 p-3">
      <p className="text-white/35">{label}</p>
      <p className="mt-1 line-clamp-1 text-white/72">{value}</p>
    </div>
  );
}
