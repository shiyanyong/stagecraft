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
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-8 sm:py-20">
      <p className="text-xs uppercase tracking-[0.36em] text-[#5F7687]">
        Natural Soda Water Store
      </p>
      <div className="mt-6 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
        <h1 className="max-w-4xl text-4xl font-semibold leading-tight text-[#102A43] sm:text-6xl lg:text-7xl">
          选择适合饮用场景的天然苏打水
        </h1>
        <div className="flex w-fit items-center gap-3 border border-[#B8C7D3]/70 bg-white/70 px-4 py-3 text-xs tracking-[0.12em] text-[#5A7182]">
          <SlidersHorizontal className="h-4 w-4" />
          {filteredProducts.length} / {products.length} 款商品
          {synced ? " · 已同步后台" : ""}
        </div>
      </div>

      <div className="mt-10 space-y-5 border-y border-[#B8C7D3]/45 py-5">
        <FilterGroup
          label="规格"
          options={[allOption, ...scaleOptions]}
          value={scale}
          onChange={(value) => setScale(value as typeof allOption | Scale)}
        />
        <FilterGroup
          label="分类"
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
            className="overflow-hidden border border-[#B8C7D3]/45 bg-white/82 shadow-[0_18px_45px_rgba(76,139,170,0.10)] transition hover:-translate-y-1 hover:border-[#8FA8B8]"
          >
            <Link
              href={`/products/${item.slug}`}
              className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8C7D3]"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-[#DDEFF8]">
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
                    className={`border px-3 py-1.5 text-xs tracking-[0.16em] backdrop-blur ${statusStyles[item.status]}`}
                  >
                    {item.status}
                  </span>
                  <span className="border border-white/60 bg-white/75 px-3 py-1.5 text-xs text-[#557086] backdrop-blur">
                    {item.scene}
                  </span>
                </div>
              </div>
            </Link>
            <div className="p-5 sm:p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="truncate text-xs tracking-[0.22em] text-[#7C94A5]">
                    {item.name}
                  </p>
                  <h2 className="mt-2 text-xl font-semibold text-[#102A43] sm:text-2xl">
                    {item.cnName}
                  </h2>
                </div>
                <p className="shrink-0 text-xl font-semibold text-[#526A7C]">
                  {formatPrice(item.price)}
                </p>
              </div>
              <p className="mt-4 line-clamp-2 min-h-[3.1rem] text-sm leading-6 text-[#5A7182]">
                {item.description}
              </p>
              <div className="mt-5 grid grid-cols-2 gap-2 text-xs text-[#5A7182]">
                <Spec label="规格" value={item.scale} />
                <Spec label="包装" value={item.size} />
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {item.materialKeywords.slice(0, 3).map((keyword) => (
                  <span
                    key={keyword}
                    className="border border-[#B8C7D3]/45 bg-[#F5FBFF] px-2.5 py-1.5 text-xs text-[#5A7182]"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
              <div className="mt-6 grid gap-3 sm:grid-cols-[1fr_auto]">
                <Link
                  href={`/products/${item.slug}`}
                  className="inline-flex h-12 items-center justify-center gap-2 border border-[#B8C7D3]/70 bg-white/60 px-4 text-xs tracking-[0.18em] text-[#526A7C] transition hover:border-[#8FA8B8] hover:bg-white"
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
        <div className="mt-12 border border-[#B8C7D3]/45 bg-white/80 p-8 text-[#5A7182]">
          暂无匹配商品。可以切换规格或分类，或联系客服确认批量采购方案。
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
      <p className="text-sm text-[#6D8495]">{label}</p>
      <div className="scrollbar-none flex gap-2 overflow-x-auto pb-1 sm:flex-wrap">
        {options.map((option) => {
          const active = option === value;
          return (
            <button
              key={option}
              type="button"
              onClick={() => onChange(option)}
              className={`min-h-11 shrink-0 border px-4 text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8C7D3] ${
                active
                  ? "border-[#B8C7D3] bg-[#B8C7D3] text-[#102A43]"
                  : "border-[#B8C7D3]/55 bg-white/60 text-[#5A7182] hover:border-[#8FA8B8] hover:bg-white"
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
    <div className="border border-[#B8C7D3]/45 bg-[#F5FBFF] p-3">
      <p className="text-[#7C94A5]">{label}</p>
      <p className="mt-1 line-clamp-1 text-[#102A43]">{value}</p>
    </div>
  );
}
