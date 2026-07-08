"use client";

import { useMemo, useState, type FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Send, Trash2 } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { useCart } from "@/components/cart-provider";
import { useStorefrontProducts } from "@/components/storefront-products-provider";
import { buttonVariants } from "@/components/ui/button";
import { formatPrice } from "@/lib/site-data";

const storefrontOrderEndpoint = "/api/storefront-order";

const backendProductIds: Record<string, string> = {
  "yuhanquan-classic-330": "p-classic",
  "yuhanquan-sparkling-330": "p-sparkling",
  "yuhanquan-low-sodium-500": "p-low-sodium",
  "yuhanquan-glass-275": "p-glass",
  "yuhanquan-family-pack": "p-family",
  "yuhanquan-business-gift": "p-custom",
  "industrial-bay-01": "p-classic",
  "race-pit-02": "p-sparkling",
  "urban-street-03": "p-low-sodium",
  "fuel-stop-04": "p-glass",
  "military-outpost-05": "p-family",
  "future-metro-06": "p-custom",
};

type CustomerForm = {
  name: string;
  contact: string;
  city: string;
  note: string;
};

export default function CartPage() {
  const { items, subtotal, addItem, updateQuantity, removeItem, clearCart } =
    useCart();
  const { products, findProduct } = useStorefrontProducts();
  const [customer, setCustomer] = useState<CustomerForm>({
    name: "",
    contact: "",
    city: "",
    note: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const cartProducts = items
    .map((item) => ({
      item,
      product: findProduct(item.slug),
    }))
    .filter((entry): entry is {
      item: { slug: string; quantity: number };
      product: (typeof products)[number];
    } => Boolean(entry.product));

  const recommended = products
    .filter(
      (product) =>
        !cartProducts.some((entry) => entry.product.slug === product.slug),
    )
    .slice(0, 3);

  const backendOrderPayload = useMemo(() => {
    if (!cartProducts.length) return "";

    return JSON.stringify({
      source: "stagecraft-storefront",
      brand: "御罕泉",
      submittedAt: new Date().toISOString(),
      customer,
      amount: subtotal,
      items: cartProducts.map(({ item, product }) => ({
        productId: backendProductIds[product.slug] ?? product.slug,
        slug: product.slug,
        name: product.cnName,
        sku: product.name,
        quantity: item.quantity,
        price: product.price,
        image: product.image,
      })),
    });
  }, [cartProducts, customer, subtotal]);

  function updateCustomer<K extends keyof CustomerForm>(
    key: K,
    value: CustomerForm[K],
  ) {
    setCustomer((current) => ({ ...current, [key]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setSubmitError("");
    try {
      const response = await fetch(storefrontOrderEndpoint, {
        method: "POST",
        body: backendOrderPayload,
        headers: { "Content-Type": "application/json" },
      });
      const result = await response.json().catch(() => null);
      if (!response.ok || result?.ok === false) {
        throw new Error(result?.warning || "订单暂时未能同步到后台，请稍后重试。");
      }
      setSubmitted(true);
      clearCart();
    } catch (error) {
      setSubmitted(false);
      setSubmitError(error instanceof Error ? error.message : "订单暂时未能同步到后台，请稍后重试。");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#EEF8FF] text-[#102A43]">
      <SiteHeader />
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-8 sm:py-20">
        <p className="text-xs uppercase tracking-[0.36em] text-[#5F7687]">
          Cart
        </p>
        <h1 className="mt-5 text-4xl font-semibold sm:text-6xl">购物车</h1>

        {submitted ? (
          <div className="mt-8 border border-emerald-500/25 bg-emerald-50 p-5 text-emerald-800">
            订单已确认并同步至后台，购物车已清空。客服会根据库存和发货周期继续处理。
          </div>
        ) : null}

        {cartProducts.length === 0 ? (
          <EmptyCart recommended={recommended} addItem={addItem} />
        ) : (
          <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_380px]">
            <div className="space-y-4">
              {cartProducts.map(({ item, product }) => (
                <article
                  key={product.slug}
                  className="grid gap-4 border border-[#B8C7D3]/45 bg-white/82 p-4 transition hover:border-[#8FA8B8] sm:grid-cols-[160px_1fr] sm:p-5"
                >
                  <Link
                    href={`/products/${product.slug}`}
                    className="relative aspect-[16/10] overflow-hidden bg-[#DDEFF8] sm:aspect-square"
                  >
                    <Image
                      src={product.image}
                      alt={`${product.cnName}购物车商品图`}
                      fill
                      sizes="160px"
                      className="object-cover"
                      style={{ objectPosition: product.objectPosition }}
                    />
                  </Link>
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="text-xs tracking-[0.22em] text-[#7C94A5]">
                        {product.name}
                      </p>
                      <Link
                        href={`/products/${product.slug}`}
                        className="mt-2 block text-2xl font-semibold transition hover:text-[#526A7C]"
                      >
                        {product.cnName}
                      </Link>
                      <p className="mt-3 text-sm leading-6 text-[#5A7182]">
                        {product.scale} / {product.size}
                      </p>
                      <p className="mt-4 text-xl font-semibold text-[#526A7C]">
                        {formatPrice(product.price)}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <QuantityButton
                        label="减少数量"
                        onClick={() =>
                          updateQuantity(product.slug, item.quantity - 1)
                        }
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="h-4 w-4" />
                      </QuantityButton>
                      <span className="grid h-10 min-w-12 place-items-center border border-[#B8C7D3]/55 bg-[#F7FCFF] px-3">
                        {item.quantity}
                      </span>
                      <QuantityButton
                        label="增加数量"
                        onClick={() =>
                          updateQuantity(product.slug, item.quantity + 1)
                        }
                      >
                        <Plus className="h-4 w-4" />
                      </QuantityButton>
                      <button
                        type="button"
                        aria-label={`移除 ${product.cnName}`}
                        onClick={() => removeItem(product.slug)}
                        className="grid h-10 w-10 place-items-center border border-[#B8C7D3]/55 text-[#6D8495] transition hover:border-red-300/70 hover:text-red-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300/60"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <aside className="h-fit border border-[#B8C7D3]/45 bg-white/82 p-6 lg:sticky lg:top-24">
              <h2 className="text-2xl font-semibold">订单摘要</h2>
              <div className="mt-6 space-y-4 border-y border-[#B8C7D3]/45 py-6">
                <SummaryRow label="商品数量" value={`${items.length} 款`} />
                <SummaryRow label="商品小计" value={formatPrice(subtotal)} />
                <SummaryRow label="配送方式" value="客服确认" />
                <div className="flex justify-between text-xl font-semibold">
                  <span>预计合计</span>
                  <span className="text-[#526A7C]">
                    {formatPrice(subtotal)}
                  </span>
                </div>
              </div>
              <a
                href="#checkout"
                className={buttonVariants({ className: "mt-6 w-full" })}
              >
                确认订单 <Send className="h-4 w-4" />
              </a>
              <button
                type="button"
                onClick={clearCart}
                className="mt-3 h-11 w-full border border-[#B8C7D3]/55 text-sm text-[#5A7182] transition hover:border-[#8FA8B8] hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8C7D3]"
              >
                清空购物车
              </button>
              <p className="mt-5 text-sm leading-6 text-[#5A7182]">
                确认后系统会核对库存，并在后台生成订单与库存变化记录。
              </p>
            </aside>
          </div>
        )}
      </section>

      {cartProducts.length > 0 ? (
        <section
          id="checkout"
          className="border-t border-[#B8C7D3]/45 bg-white/58 py-12"
        >
          <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-xs uppercase tracking-[0.36em] text-[#5F7687]">
                Checkout
              </p>
              <h2 className="mt-4 text-3xl font-semibold sm:text-5xl">
                确认订单
              </h2>
              <p className="mt-5 max-w-xl leading-8 text-[#5A7182]">
                留下收货与联系方式，确认后订单会进入后台系统，库存会随订单扣减并等待处理。
              </p>
            </div>
            <form
              onSubmit={handleSubmit}
              className="grid gap-4 border border-[#B8C7D3]/45 bg-white/82 p-5 sm:grid-cols-2 sm:p-6"
            >
              <Field
                label="姓名 / 称呼"
                name="name"
                value={customer.name}
                placeholder="例如：陈先生"
                onChange={(value) => updateCustomer("name", value)}
              />
              <Field
                label="联系方式"
                name="contact"
                value={customer.contact}
                placeholder="手机 / 微信 / 邮箱"
                onChange={(value) => updateCustomer("contact", value)}
              />
              <Field
                label="收货城市"
                name="city"
                value={customer.city}
                placeholder="例如：上海"
                onChange={(value) => updateCustomer("city", value)}
              />
              <label className="block sm:col-span-2">
                <span className="text-sm text-[#5A7182]">订单备注</span>
                <textarea
                  name="note"
                  rows={5}
                  value={customer.note}
                  onChange={(event) => updateCustomer("note", event.target.value)}
                  placeholder="例如：希望工作日发货，企业采购需要发票。"
                  className="mt-2 w-full resize-none border border-[#B8C7D3]/55 bg-[#F7FCFF] px-4 py-3 text-[#102A43] outline-none transition placeholder:text-[#93A8B6] focus:border-[#8FA8B8]"
                />
              </label>
              {submitError ? (
                <p className="border border-red-300/60 bg-red-50 p-3 text-sm text-red-700 sm:col-span-2">
                  {submitError}
                </p>
              ) : null}
              <button
                type="submit"
                disabled={submitting || !backendOrderPayload}
                className={buttonVariants({ className: "sm:col-span-2" })}
              >
                {submitting ? "正在同步订单" : "确认订单"}
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </section>
      ) : null}
    </main>
  );
}

function EmptyCart({
  recommended,
  addItem,
}: {
  recommended: ReturnType<typeof useStorefrontProducts>["products"];
  addItem: (slug: string) => void;
}) {
  return (
    <div className="mt-10 border border-[#B8C7D3]/45 bg-white/82 p-6 sm:p-10">
      <h2 className="text-3xl font-semibold">购物车还是空的</h2>
      <p className="mt-4 max-w-2xl leading-8 text-[#5A7182]">
        可以先从热销箱装开始，加入购物车后再确认订单。
      </p>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {recommended.map((item) => (
          <article key={item.slug} className="border border-[#B8C7D3]/45 bg-[#F7FCFF] p-4">
            <div className="relative aspect-[16/10] overflow-hidden bg-[#DDEFF8]">
              <Image src={item.image} alt={item.cnName} fill sizes="33vw" className="object-cover" />
            </div>
            <h3 className="mt-4 text-xl font-semibold">{item.cnName}</h3>
            <p className="mt-2 text-[#5A7182]">{formatPrice(item.price)}</p>
            <button
              type="button"
              onClick={() => addItem(item.slug)}
              className={buttonVariants({ className: "mt-4 w-full" })}
            >
              加入购物车
            </button>
          </article>
        ))}
      </div>
    </div>
  );
}

function QuantityButton({
  label,
  disabled,
  onClick,
  children,
}: {
  label: string;
  disabled?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className="grid h-10 w-10 place-items-center border border-[#B8C7D3]/55 text-[#5A7182] transition hover:border-[#8FA8B8] hover:bg-white disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8C7D3]"
    >
      {children}
    </button>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 text-[#5A7182]">
      <span>{label}</span>
      <span className="text-[#102A43]">{value}</span>
    </div>
  );
}

function Field({
  label,
  name,
  value,
  placeholder,
  onChange,
}: {
  label: string;
  name: string;
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="text-sm text-[#5A7182]">{label}</span>
      <input
        required
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 h-12 w-full border border-[#B8C7D3]/55 bg-[#F7FCFF] px-4 text-[#102A43] outline-none transition placeholder:text-[#93A8B6] focus:border-[#8FA8B8]"
      />
    </label>
  );
}
