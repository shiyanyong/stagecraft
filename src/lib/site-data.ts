import {
  Archive,
  Building2,
  Camera,
  Car,
  Factory,
  Gauge,
  Grid3X3,
  Hammer,
  LampDesk,
  Shield,
  Sparkles,
  Warehouse,
  Wrench,
} from "lucide-react";

export const assets = {
  hero: "/images/hero-industrial-diorama.png",
  industrialGarage: "/images/industrial-garage-base.png",
  racePit: "/images/race-pit-base.png",
  urbanStreet: "/images/urban-street-base.png",
  fuelStop: "/images/fuel-stop-base.png",
  militaryOutpost: "/images/military-outpost-base.png",
  futureMetro: "/images/future-metro-base.png",
  gallery: "/images/series-gallery-dioramas.png",
  comparison: "/images/comparison-story-diorama.png",
};

export type ProductStatus = "现货" | "预订" | "小批量";
export type Scale = "1:64" | "1:43" | "1:24" | "1:18";

export const statusStyles: Record<ProductStatus, string> = {
  现货: "border-emerald-300/45 bg-emerald-300/10 text-emerald-200",
  预订: "border-sky-300/45 bg-sky-300/10 text-sky-200",
  小批量: "border-[#D4B483]/55 bg-[#D4B483]/10 text-[#D4B483]",
};

export const scaleOptions: Scale[] = ["1:64", "1:43", "1:24", "1:18"];

export const sceneCategories = [
  "工业车库",
  "赛车场",
  "城市街景",
  "加油站",
  "军事基地",
  "科幻未来",
];

export const products = [
  {
    slug: "industrial-bay-01",
    name: "Industrial Bay 01",
    cnName: "工业车库地台",
    scene: "工业车库",
    price: 698,
    image: assets.industrialGarage,
    objectPosition: "50% center",
    size: "320 × 180 × 52 mm",
    scales: ["1:64", "1:43"] as Scale[],
    scale: "1:64 / 1:43 车模",
    material: "树脂基底、哑光水泥涂层、金属件细节",
    materialKeywords: ["水泥肌理", "金属边框", "旧化地面"],
    style: "工业仓储 / 黑钢 / 混凝土边界",
    status: "现货" as ProductStatus,
    fit: "跑车、改装车、工程车辆",
    shipTime: "现货 48 小时内发出",
    care: "软毛刷除尘，避免长期暴晒和水洗。",
    afterSale: "签收 7 日内支持非人为瑕疵补发配件。",
    description: "黑钢、混凝土与仓储边界构成的收藏级工业场景。",
  },
  {
    slug: "race-pit-02",
    name: "Race Pit 02",
    cnName: "赛车场维修区",
    scene: "赛车场",
    price: 868,
    image: assets.racePit,
    objectPosition: "50% center",
    size: "360 × 220 × 60 mm",
    scales: ["1:64", "1:43"] as Scale[],
    scale: "1:64 / 1:43 赛车",
    material: "树脂平台、金属支架、工具墙细节",
    materialKeywords: ["工具墙", "维修平台", "赛道标线"],
    style: "赛道维修区 / 专业车队 / 工具墙",
    status: "预订" as ProductStatus,
    fit: "赛车、改装车、维修场景",
    shipTime: "预订款 10-15 个工作日发出",
    care: "工具件可拆卸，建议收纳时单独放置。",
    afterSale: "运输损坏提供一次免费补件。",
    description: "为赛车收藏设计的维修区氛围，适合成组展示。",
  },
  {
    slug: "urban-street-03",
    name: "Urban Street 03",
    cnName: "城市街景地台",
    scene: "城市街景",
    price: 628,
    image: assets.urbanStreet,
    objectPosition: "50% center",
    size: "300 × 180 × 45 mm",
    scales: ["1:64", "1:43", "1:24"] as Scale[],
    scale: "1:64 / 1:43 / 1:24",
    material: "树脂路面、微缩路缘、旧化墙面",
    materialKeywords: ["路缘石", "旧化墙面", "街道路面"],
    style: "城市边角 / 水泥路缘 / 街头光影",
    status: "现货" as ProductStatus,
    fit: "街车、跑车、可动人偶",
    shipTime: "现货 48 小时内发出",
    care: "避免尖锐物刮擦路面旧化涂层。",
    afterSale: "支持到货破损补发或换新。",
    description: "把模型放进城市边角的故事里，适合日常陈列。",
  },
  {
    slug: "fuel-stop-04",
    name: "Fuel Stop 04",
    cnName: "复古加油站地台",
    scene: "加油站",
    price: 758,
    image: assets.fuelStop,
    objectPosition: "50% center",
    size: "340 × 210 × 56 mm",
    scales: ["1:64", "1:43", "1:24"] as Scale[],
    scale: "1:64 / 1:43 / 1:24",
    material: "树脂地面、立式油泵、灯箱模块",
    materialKeywords: ["油泵", "灯箱", "旧化瓷砖"],
    style: "复古油站 / 暖光 / 公路收藏",
    status: "小批量" as ProductStatus,
    fit: "经典车、越野车、摩托模型",
    shipTime: "小批量款 5-7 个工作日发出",
    care: "灯箱模块请使用低压电源，避免潮湿环境。",
    afterSale: "灯光模块 30 日内质保。",
    description: "适合公路题材收藏，带来更明确的年代与地点感。",
  },
  {
    slug: "military-outpost-05",
    name: "Military Outpost 05",
    cnName: "军事基地地台",
    scene: "军事基地",
    price: 928,
    image: assets.militaryOutpost,
    objectPosition: "50% center",
    size: "420 × 260 × 72 mm",
    scales: ["1:24", "1:18"] as Scale[],
    scale: "1:24 / 1:18 坦克与机甲",
    material: "复合树脂、沙土肌理、可拆背景墙",
    materialKeywords: ["沙土肌理", "掩体墙", "军用标识"],
    style: "军事基地 / 沙土 / 可拆掩体",
    status: "预订" as ProductStatus,
    fit: "坦克、装甲车、高达机体",
    shipTime: "预订款 15-20 个工作日发出",
    care: "沙土肌理为手工旧化，避免湿布擦拭。",
    afterSale: "大型件支持运输保险与破损补件。",
    description: "为坦克、机甲和军事题材模型提供强叙事背景。",
  },
  {
    slug: "future-metro-06",
    name: "Future Metro 06",
    cnName: "科幻未来地台",
    scene: "科幻未来",
    price: 998,
    image: assets.futureMetro,
    objectPosition: "50% center",
    size: "360 × 200 × 68 mm",
    scales: ["1:64", "1:24", "1:18"] as Scale[],
    scale: "1:64 / 1:24 / 1:18",
    material: "半哑光树脂、冷光细节、模块化边框",
    materialKeywords: ["冷光件", "模块边框", "金属灰"],
    style: "未来城市 / 冷光 / 概念展示",
    status: "小批量" as ProductStatus,
    fit: "概念车、高达、科幻机甲",
    shipTime: "小批量款 7-10 个工作日发出",
    care: "透明冷光件可用镜头布轻擦。",
    afterSale: "灯光模块 30 日内质保。",
    description: "适合概念车与机甲的未来展示环境，像展馆装置。",
  },
];

export const series = [
  { name: "工业车库", fit: "跑车 / 改装车 / 工程车辆", icon: Factory },
  { name: "赛车场", fit: "赛车 / 维修区 / 车队主题", icon: Gauge },
  { name: "城市街景", fit: "街车 / 跑车 / 人偶", icon: Grid3X3 },
  { name: "加油站", fit: "经典车 / 越野车 / 公路题材", icon: Warehouse },
  { name: "军事基地", fit: "坦克 / 装甲车 / 高达", icon: Shield },
  { name: "科幻未来", fit: "概念车 / 机甲 / 科幻收藏", icon: Sparkles },
];

export const previewModels = [
  { name: "跑车", scale: "1:64", priceNote: "适合工业车库", icon: Car },
  { name: "高达", scale: "1:18", priceNote: "适合科幻未来", icon: Sparkles },
  { name: "坦克", scale: "1:24", priceNote: "适合军事基地", icon: Shield },
];

export const previewAngles = ["正面", "低角度", "俯视"];

export const comboModules = [
  { name: "路灯模块", price: 88, icon: LampDesk },
  { name: "背景墙", price: 168, icon: Building2 },
  { name: "维修工具", price: 128, icon: Wrench },
  { name: "旧化地贴", price: 58, icon: Hammer },
];

export const packages = [
  {
    name: "基础版",
    price: "¥628 起",
    content: ["预制地台 × 1", "防尘包装", "搭配建议卡"],
    highlight: "适合第一次入手",
  },
  {
    name: "进阶版",
    price: "¥898 起",
    content: ["预制地台 × 1", "灯光/墙面模块", "收纳盒"],
    highlight: "适合拍照和桌面陈列",
  },
  {
    name: "收藏版",
    price: "¥1288 起",
    content: ["大尺寸地台", "多模块组合", "编号收藏铭牌"],
    highlight: "适合主题收藏柜",
  },
];

export const playerCases = [
  { title: "银色跑车 × 工业车库", likes: 248, image: assets.hero },
  { title: "机甲 × 科幻未来", likes: 319, image: assets.gallery },
  { title: "坦克 × 军事基地", likes: 176, image: assets.comparison },
  { title: "复古轿车 × 加油站", likes: 221, image: assets.gallery },
  { title: "赛道涂装 × 维修区", likes: 287, image: assets.hero },
  { title: "概念车 × 未来都市", likes: 305, image: assets.gallery },
];

export const navItems = [
  { label: "首页", href: "/" },
  { label: "商品", href: "/products" },
  { label: "案例", href: "/cases" },
  { label: "套餐", href: "/packages" },
];

export const detailIcons = [Camera, Sparkles, Archive];

export function getProduct(slug: string) {
  return products.find((item) => item.slug === slug);
}

export function formatPrice(price: number) {
  return `¥${price.toLocaleString("zh-CN")}`;
}
