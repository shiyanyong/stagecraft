"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { products as staticProducts, type ProductStatus, type Scale } from "@/lib/site-data";

type StaticProduct = (typeof staticProducts)[number];
type SyncedProduct = {
  id: string;
  sku: string;
  name: string;
  category: string;
  description: string;
  image: string;
  price: number;
  currentStock: number;
  reservedStock: number;
  status: "Active" | "Draft" | "Hidden" | "Archived";
  updatedAt?: string;
};

type StorefrontProductsValue = {
  products: StaticProduct[];
  findProduct: (slug: string) => StaticProduct | undefined;
  synced: boolean;
  refreshProducts: () => Promise<void>;
};

const StorefrontProductsContext = createContext<StorefrontProductsValue | null>(null);
const liveStorefrontDataEndpoint = "/api/storefront-products";
const storefrontDataEndpoint = "/storefront-products.json";
const localAdminEndpoint = "http://127.0.0.1:5173/api/storefront-products";

const staticSlugByAdminId: Record<string, string> = {
  "p-classic": "yuhanquan-classic-330",
  "p-sparkling": "yuhanquan-sparkling-330",
  "p-low-sodium": "yuhanquan-low-sodium-500",
  "p-glass": "yuhanquan-glass-275",
  "p-family": "yuhanquan-family-pack",
  "p-custom": "yuhanquan-business-gift",
  "p-garage": "yuhanquan-classic-330",
  "p-racing": "yuhanquan-sparkling-330",
  "p-city": "yuhanquan-low-sodium-500",
  "p-fuel": "yuhanquan-glass-275",
  "p-military": "yuhanquan-family-pack",
  "p-future": "yuhanquan-business-gift",
};

function slugify(input: string) {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function mapStatus(product: SyncedProduct): ProductStatus {
  if (product.status === "Draft") return "预订";
  if (product.currentStock - product.reservedStock <= 24) return "小批量";
  return "现货";
}

function inferScales(category: string): Scale[] {
  if (category.includes("玻璃") || category.includes("礼盒")) return ["275ml", "330ml", "箱装"];
  if (category.includes("家庭") || category.includes("低钠")) return ["500ml", "箱装"];
  return ["330ml", "箱装"];
}

function toStorefrontProduct(product: SyncedProduct, index: number): StaticProduct {
  const fallback = staticProducts[index % staticProducts.length];
  const scales = inferScales(product.category);
  const slug = staticSlugByAdminId[product.id] ?? slugify(product.sku || product.id || product.name);
  const available = Math.max(product.currentStock - product.reservedStock, 0);

  return {
    ...fallback,
    slug,
    name: product.sku || product.name,
    cnName: product.name,
    scene: product.category,
    price: product.price,
    image: fallback.image,
    objectPosition: "50% center",
    scales,
    scale: scales.join(" / "),
    status: mapStatus(product),
    description: product.description || fallback.description,
    shipTime:
      product.status === "Draft"
        ? "预订商品，确认后按批次安排生产与发货"
        : `可售库存约 ${available} 件，确认订单后安排发货`,
  } as StaticProduct;
}

export function StorefrontProductsProvider({ children }: { children: ReactNode }) {
  const [dynamicProducts, setDynamicProducts] = useState<StaticProduct[] | null>(null);

  const refreshProducts = async () => {
    try {
      let response = await fetch(`${liveStorefrontDataEndpoint}?t=${Date.now()}`, { cache: "no-store" });
      if (!response.ok) {
        response = await fetch(`${storefrontDataEndpoint}?t=${Date.now()}`, { cache: "no-store" });
      }
      if (!response.ok) {
        response = await fetch(localAdminEndpoint, { cache: "no-store" });
      }
      if (!response.ok) return;
      const payload = (await response.json()) as { products?: SyncedProduct[] };
      if (!Array.isArray(payload.products)) return;
      const visibleProducts = payload.products
        .filter((product) => product.status === "Active" || product.status === "Draft")
        .map(toStorefrontProduct);
      setDynamicProducts(visibleProducts.length ? visibleProducts : null);
    } catch {
      setDynamicProducts(null);
    }
  };

  useEffect(() => {
    void refreshProducts();
    const timer = window.setInterval(refreshProducts, 5000);
    return () => window.clearInterval(timer);
  }, []);

  const value = useMemo<StorefrontProductsValue>(() => {
    const activeProducts = dynamicProducts ?? staticProducts;
    return {
      products: activeProducts,
      findProduct: (slug) => activeProducts.find((product) => product.slug === slug),
      synced: dynamicProducts !== null,
      refreshProducts,
    };
  }, [dynamicProducts]);

  return (
    <StorefrontProductsContext.Provider value={value}>
      {children}
    </StorefrontProductsContext.Provider>
  );
}

export function useStorefrontProducts() {
  const context = useContext(StorefrontProductsContext);
  if (!context) {
    throw new Error("useStorefrontProducts must be used within StorefrontProductsProvider");
  }
  return context;
}
