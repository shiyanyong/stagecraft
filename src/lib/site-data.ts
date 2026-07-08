import {
  Archive,
  Building2,
  Camera,
  Droplets,
  Gift,
  Grid3X3,
  PackageCheck,
  ShieldCheck,
  Snowflake,
  Sparkles,
  Truck,
} from "lucide-react";

export const assets = {
  hero: "/images/yuhanquan-hero-wide.png",
  industrialGarage: "/images/yuhanquan-product.png",
  racePit: "/images/yuhanquan-product.png",
  urbanStreet: "/images/yuhanquan-product.png",
  fuelStop: "/images/yuhanquan-product.png",
  militaryOutpost: "/images/yuhanquan-product.png",
  futureMetro: "/images/yuhanquan-product.png",
  gallery: "/images/series-gallery-dioramas.png",
  comparison: "/images/comparison-story-diorama.png",
};

export type ProductStatus = "现货" | "预订" | "小批量";
export type Scale = "275ml" | "330ml" | "500ml" | "箱装";

export const statusStyles: Record<ProductStatus, string> = {
  现货: "border-emerald-500/30 bg-emerald-50 text-emerald-700",
  预订: "border-sky-500/30 bg-sky-50 text-sky-700",
  小批量: "border-[#B8C7D3]/80 bg-[#F3F8FC] text-[#587083]",
};

export const scaleOptions: Scale[] = ["275ml", "330ml", "500ml", "箱装"];

export const sceneCategories = [
  "经典原味",
  "含气苏打水",
  "低钠苏打水",
  "玻璃瓶装",
  "家庭箱装",
  "企业定制",
];

export const products = [
  {
    slug: "yuhanquan-classic-330",
    name: "YHQ-CLASSIC-001",
    cnName: "御罕泉天然苏打水 330ml",
    scene: "经典原味",
    price: 89,
    image: assets.industrialGarage,
    objectPosition: "50% center",
    size: "330ml × 12 瓶",
    scales: ["330ml", "箱装"] as Scale[],
    scale: "330ml / 12瓶箱装",
    material: "天然苏打水、食品级 PET 瓶、银色防潮箱装",
    materialKeywords: ["天然弱碱", "清爽口感", "日常饮用"],
    style: "经典原味 / 家庭常备 / 餐桌饮水",
    status: "现货" as ProductStatus,
    fit: "适合家庭饮用、办公室补水、日常餐配",
    shipTime: "现货商品，确认订单后 24-48 小时内安排发货",
    care: "请置于阴凉干燥处，避免阳光直射和高温环境。",
    afterSale: "签收 7 日内如出现运输破损，可联系客服补发或处理。",
    description: "口感柔和的天然苏打水，适合日常饮用和家庭囤货。",
  },
  {
    slug: "yuhanquan-sparkling-330",
    name: "YHQ-SPARKLING-001",
    cnName: "御罕泉气泡苏打水 330ml",
    scene: "含气苏打水",
    price: 99,
    image: assets.racePit,
    objectPosition: "50% center",
    size: "330ml × 12 瓶",
    scales: ["330ml", "箱装"] as Scale[],
    scale: "330ml / 12瓶箱装",
    material: "天然苏打水、细密气泡、食品级 PET 瓶",
    materialKeywords: ["细密气泡", "无糖配方", "冰饮推荐"],
    style: "清爽气泡 / 聚会饮品 / 低负担替代",
    status: "现货" as ProductStatus,
    fit: "适合聚会、轻食、运动后冰饮和无糖饮品替代",
    shipTime: "现货商品，确认订单后 24-48 小时内安排发货",
    care: "含气产品请避免剧烈摇晃，开启前建议冷藏静置。",
    afterSale: "运输破损、漏液或箱体严重变形可联系客服处理。",
    description: "带有轻盈气泡感的天然苏打水，冰镇后口感更清爽。",
  },
  {
    slug: "yuhanquan-low-sodium-500",
    name: "YHQ-LOW-SODIUM-001",
    cnName: "御罕泉低钠苏打水 500ml",
    scene: "低钠苏打水",
    price: 109,
    image: assets.urbanStreet,
    objectPosition: "50% center",
    size: "500ml × 12 瓶",
    scales: ["500ml", "箱装"] as Scale[],
    scale: "500ml / 12瓶箱装",
    material: "低钠天然苏打水、大容量瓶装、防潮运输箱",
    materialKeywords: ["低钠", "大容量", "轻矿物感"],
    style: "低钠配方 / 运动补水 / 办公室常备",
    status: "现货" as ProductStatus,
    fit: "适合控钠人群、运动补水、办公室和会议用水",
    shipTime: "现货商品，确认订单后 24-48 小时内安排发货",
    care: "开瓶后建议尽快饮用，未开封产品请常温避光保存。",
    afterSale: "如收到异常批次或包装破损，可提供订单号协助核验。",
    description: "更低钠含量的大容量苏打水，适合高频饮用场景。",
  },
  {
    slug: "yuhanquan-glass-275",
    name: "YHQ-GLASS-001",
    cnName: "御罕泉玻璃瓶苏打水 275ml",
    scene: "玻璃瓶装",
    price: 128,
    image: assets.fuelStop,
    objectPosition: "50% center",
    size: "275ml × 12 瓶",
    scales: ["275ml", "箱装"] as Scale[],
    scale: "275ml / 12瓶箱装",
    material: "玻璃瓶、天然苏打水、银色礼盒运输保护",
    materialKeywords: ["玻璃瓶", "餐饮渠道", "冷藏口感"],
    style: "餐厅陈列 / 高端餐配 / 玻璃瓶质感",
    status: "小批量" as ProductStatus,
    fit: "适合餐饮门店、民宿、商务接待和礼盒组合",
    shipTime: "小批量备货，确认订单后 3-5 个工作日内发出",
    care: "玻璃瓶请轻拿轻放，冷藏后饮用口感更佳。",
    afterSale: "玻璃瓶运输破损支持按实际破损数量补发。",
    description: "更适合餐桌和接待场景的玻璃瓶苏打水，呈现更好的质感。",
  },
  {
    slug: "yuhanquan-family-pack",
    name: "YHQ-FAMILY-001",
    cnName: "御罕泉家庭箱装 500ml",
    scene: "家庭箱装",
    price: 168,
    image: assets.militaryOutpost,
    objectPosition: "50% center",
    size: "500ml × 24 瓶",
    scales: ["500ml", "箱装"] as Scale[],
    scale: "500ml / 24瓶箱装",
    material: "天然苏打水、加厚纸箱、整箱防潮包装",
    materialKeywords: ["家庭囤货", "整箱优惠", "稳定补水"],
    style: "家庭常备 / 整箱采购 / 长周期饮用",
    status: "预订" as ProductStatus,
    fit: "适合家庭囤货、办公室茶水间、企业员工福利",
    shipTime: "预订商品，确认后按批次安排生产与发货",
    care: "整箱存放请离地防潮，避免长期靠近热源。",
    afterSale: "支持批量订单对账、发票与破损补发协助。",
    description: "面向家庭和办公室高频饮水需求的整箱装规格。",
  },
  {
    slug: "yuhanquan-business-gift",
    name: "YHQ-CUSTOM-001",
    cnName: "御罕泉企业定制礼盒",
    scene: "企业定制",
    price: 298,
    image: assets.futureMetro,
    objectPosition: "50% center",
    size: "礼盒装 / 可定制",
    scales: ["275ml", "330ml", "箱装"] as Scale[],
    scale: "275ml / 330ml / 礼盒装",
    material: "玻璃瓶或 PET 瓶、礼盒包装、企业定制贴标",
    materialKeywords: ["企业定制", "礼盒包装", "批量采购"],
    style: "商务礼赠 / 品牌定制 / 活动用水",
    status: "预订" as ProductStatus,
    fit: "适合企业礼赠、会议用水、活动赞助和品牌联名",
    shipTime: "预订定制，确认设计与数量后排产发货",
    care: "定制包装请避免挤压，收货后建议按批次编号存放。",
    afterSale: "定制订单支持打样确认，非质量问题不支持无理由退换。",
    description: "适合商务礼赠和活动用水的御罕泉定制组合。",
  },
];

export const series = [
  { name: "经典原味", fit: "日常饮用 / 家庭常备 / 餐桌饮水", icon: Droplets },
  { name: "含气苏打水", fit: "冰饮 / 聚会 / 无糖替代", icon: Sparkles },
  { name: "低钠苏打水", fit: "控钠人群 / 运动补水 / 办公室", icon: ShieldCheck },
  { name: "玻璃瓶装", fit: "餐饮渠道 / 接待 / 民宿", icon: Snowflake },
  { name: "家庭箱装", fit: "囤货 / 茶水间 / 福利采购", icon: PackageCheck },
  { name: "企业定制", fit: "礼盒 / 会议 / 活动用水", icon: Gift },
];

export const previewModels = [
  { name: "日常饮用", scale: "330ml", priceNote: "推荐经典原味", icon: Droplets },
  { name: "聚会冰饮", scale: "330ml", priceNote: "推荐气泡苏打水", icon: Sparkles },
  { name: "家庭囤货", scale: "500ml", priceNote: "推荐家庭箱装", icon: PackageCheck },
];

export const previewAngles = ["瓶装", "箱装", "礼盒"];

export const comboModules = [
  { name: "经典原味箱", price: 89, icon: Droplets },
  { name: "气泡苏打箱", price: 99, icon: Sparkles },
  { name: "低钠家庭箱", price: 109, icon: Truck },
  { name: "商务礼盒", price: 298, icon: Building2 },
];

export const packages = [
  {
    name: "日常饮用装",
    price: "¥89 起",
    content: ["330ml 天然苏打水 × 12", "防潮箱装", "适合家庭和办公室"],
    highlight: "适合第一次购买",
  },
  {
    name: "家庭囤货装",
    price: "¥168 起",
    content: ["500ml 天然苏打水 × 24", "整箱优惠", "支持周期补货建议"],
    highlight: "适合高频饮用",
  },
  {
    name: "商务定制装",
    price: "¥298 起",
    content: ["玻璃瓶或礼盒组合", "企业贴标", "会议与活动用水"],
    highlight: "适合礼赠和渠道采购",
  },
];

export const playerCases = [
  { title: "家庭餐桌 × 经典原味 330ml", likes: 248, image: assets.hero },
  { title: "办公室茶水间 × 低钠苏打水", likes: 319, image: assets.gallery },
  { title: "商务接待 × 玻璃瓶苏打水", likes: 176, image: assets.comparison },
  { title: "聚会冰饮 × 气泡苏打水", likes: 221, image: assets.gallery },
  { title: "企业会议 × 定制礼盒", likes: 287, image: assets.hero },
  { title: "家庭囤货 × 500ml 整箱装", likes: 305, image: assets.gallery },
];

export const navItems = [
  { label: "首页", href: "/" },
  { label: "商品", href: "/products" },
  { label: "案例", href: "/cases" },
  { label: "套餐", href: "/packages" },
];

export const detailIcons = [Camera, Archive, Grid3X3];

export function getProduct(slug: string) {
  return products.find((item) => item.slug === slug);
}

export function formatPrice(price: number) {
  return `¥${price.toLocaleString("zh-CN")}`;
}
