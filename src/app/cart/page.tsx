"use client";

import { useMemo, useState, type FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, Minus, Plus, Send, Trash2 } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { useCart } from "@/components/cart-provider";
import { buttonVariants } from "@/components/ui/button";
import { formatPrice, products } from "@/lib/site-data";

const inventoryAdminUrl =
  process.env.NEXT_PUBLIC_STAGECRAFT_ADMIN_URL ?? "http://127.0.0.1:5173/";

const backendProductIds: Record<string, string> = {
  "industrial-bay-01": "p-garage",
  "race-pit-02": "p-racing",
  "urban-street-03": "p-city",
  "fuel-stop-04": "p-fuel",
  "military-outpost-05": "p-military",
  "future-metro-06": "p-future",
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
  const [customer, setCustomer] = useState<CustomerForm>({
    name: "",
    contact: "",
    city: "",
    note: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [orderReceiverUrl, setOrderReceiverUrl] = useState("");

  const cartProducts = items
    .map((item) => ({
      item,
      product: products.find((product) => product.slug === item.slug),
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
      submittedAt: new Date().toISOString(),
      customer,
      amount: subtotal,
      items: cartProducts.map(({ item, product }) => ({
        productId: backendProductIds[product.slug],
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

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
    const encoded = encodeURIComponent(backendOrderPayload);
    const adminApiBase = inventoryAdminUrl.replace(/\/$/, "");
    setOrderReceiverUrl(
      `${adminApiBase}/api/storefront-order?payload=${encoded}`,
    );
    if (navigator.sendBeacon) {
      navigator.sendBeacon(
        `${adminApiBase}/api/storefront-order`,
        backendOrderPayload,
      );
    } else {
      fetch(`${adminApiBase}/api/storefront-order`, {
        method: "POST",
        mode: "no-cors",
        body: backendOrderPayload,
      }).catch(() => undefined);
    }
    clearCart();
  }

  return (
    <main className="min-h-screen bg-[#0A0A0A] text-white">
      <SiteHeader />
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-8 sm:py-20">
        <p className="text-xs uppercase tracking-[0.36em] text-[#D4B483]">
          Cart
        </p>
        <h1 className="mt-5 text-4xl font-semibold sm:text-6xl">购物车</h1>

        {cartProducts.length === 0 ? (
          <EmptyCart recommended={recommended} addItem={addItem} />
        ) : (
          <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_380px]">
            <div className="space-y-4">
              {cartProducts.map(({ item, product }) => (
                <article
                  key={product.slug}
                  className="grid gap-4 border border-white/10 bg-[#111111] p-4 transition hover:border-white/20 sm:grid-cols-[160px_1fr] sm:p-5"
                >
                  <Link
                    href={`/products/${product.slug}`}
                    className="relative aspect-[16/10] overflow-hidden bg-black sm:aspect-square"
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
                      <p className="text-xs tracking-[0.22em] text-white/38">
                        {product.name}
                      </p>
                      <Link
                        href={`/products/${product.slug}`}
                        className="mt-2 block text-2xl font-semibold transition hover:text-[#D4B483]"
                      >
                        {product.cnName}
                      </Link>
                      <p className="mt-3 text-sm leading-6 text-white/52">
                        {product.scale} / {product.size}
                      </p>
                      <p className="mt-4 text-xl font-semibold text-[#D4B483]">
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
                      <span className="grid h-10 min-w-12 place-items-center border border-white/12 px-3">
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
                        className="grid h-10 w-10 place-items-center border border-white/12 text-white/58 transition hover:border-red-300/50 hover:text-red-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300/60"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <aside className="h-fit border border-white/10 bg-[#111111] p-6 lg:sticky lg:top-24">
              <h2 className="text-2xl font-semibold">订单摘要</h2>
              <div className="mt-6 space-y-4 border-y border-white/10 py-6">
                <SummaryRow label="商品数量" value={`${items.length} 款`} />
                <SummaryRow label="商品小计" value={formatPrice(subtotal)} />
                <SummaryRow label="配送方式" value="客服确认" />
                <div className="flex justify-between text-xl font-semibold">
                  <span>预计合计</span>
                  <span className="text-[#D4B483]">
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
                className="mt-3 h-11 w-full border border-white/12 text-sm text-white/56 transition hover:border-white/30 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
              >
                清空购物车
              </button>
              <p className="mt-5 text-sm leading-6 text-white/42">
                确认后我们会根据订单内容核对库存、包装方式与发货周期。
              </p>
            </aside>
          </div>
        )}
      </section>

      {cartProducts.length > 0 ? (
        <section
          id="checkout"
          className="border-t border-white/10 bg-[#111111] py-12"
        >
          <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-xs uppercase tracking-[0.36em] text-[#D4B483]">
                Checkout
              </p>
              <h2 className="mt-4 text-3xl font-semibold sm:text-5xl">
                确认订单
              </h2>
              <p className="mt-5 max-w-xl leading-8 text-white/58">
                留下收货与联系方式，订单确认后将进入处理流程。我们会尽快核对库存并安排后续确认。
              </p>
            </div>
            <form
              onSubmit={handleSubmit}
              className="grid gap-4 border border-white/10 bg-[#0A0A0A] p-5 sm:grid-cols-2 sm:p-6"
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
              <label>
                <span className="text-sm text-white/62">订单来源</span>
                <input
                  value="StageCraft 官网购物车"
                  readOnly
                  className="mt-2 h-12 w-full border border-white/12 bg-white/[0.03] px-4 text-sm text-white/58 outline-none"
                />
              </label>
              <label className="sm:col-span-2">
                <span className="text-sm text-white/62">备注</span>
                <textarea
                  name="message"
                  rows={4}
                  value={customer.note}
                  onChange={(event) => updateCustomer("note", event.target.value)}
                  placeholder="想确认的数量、比例、场景组合或收货要求"
                  className="mt-2 w-full resize-none border border-white/12 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/28 focus:border-[#D4B483]"
                />
              </label>
              <button
                type="submit"
                className="inline-flex min-h-12 items-center justify-center gap-2 bg-[#D4B483] px-5 text-sm font-medium text-black transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4B483] sm:col-span-2"
              >
                确认订单 <Check className="h-4 w-4" />
              </button>
              {submitted ? (
                <p className="flex items-center gap-2 text-sm text-emerald-200 sm:col-span-2">
                  <Check className="h-4 w-4" />
                  订单已确认，我们会尽快核对库存并联系你。
                </p>
              ) : null}
            </form>
          </div>
        </section>
      ) : null}
      {orderReceiverUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          title="StageCraft order receiver"
          src={orderReceiverUrl}
          className="hidden"
          alt=""
          aria-hidden="true"
        />
      ) : null}
    </main>
  );
}

function EmptyCart({
  recommended,
  addItem,
}: {
  recommended: typeof products;
  addItem: (slug: string) => void;
}) {
  return (
    <div className="mt-10">
      <div className="border border-white/10 bg-[#111111] p-8 sm:p-12">
        <h2 className="text-2xl font-semibold">购物车还是空的</h2>
        <p className="mt-4 max-w-xl leading-8 text-white/56">
          先选择一款适合你模型比例和陈列空间的地台，加入后可统一确认订单。
        </p>
        <Link href="/products" className={buttonVariants({ className: "mt-8" })}>
          去选购地台
        </Link>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {recommended.map((product) => (
          <article key={product.slug} className="border border-white/10 bg-[#111111]">
            <Link
              href={`/products/${product.slug}`}
              className="relative block aspect-[16/10] overflow-hidden bg-black"
            >
              <Image
                src={product.image}
                alt={`${product.cnName}推荐商品图`}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition duration-700 hover:scale-105"
                style={{ objectPosition: product.objectPosition }}
              />
            </Link>
            <div className="p-5">
              <p className="text-xs tracking-[0.18em] text-white/38">
                {product.name}
              </p>
              <h3 className="mt-2 text-xl font-semibold">{product.cnName}</h3>
              <div className="mt-4 flex items-center justify-between gap-3">
                <span className="text-[#D4B483]">{formatPrice(product.price)}</span>
                <button
                  type="button"
                  onClick={() => addItem(product.slug)}
                  className="h-10 border border-white/12 px-3 text-sm text-white/70 transition hover:border-[#D4B483] hover:text-[#D4B483]"
                >
                  加入购物车
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-white/58">
      <span>{label}</span>
      <span>{value}</span>
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
    <label>
      <span className="text-sm text-white/62">{label}</span>
      <input
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 h-12 w-full border border-white/12 bg-white/[0.03] px-4 text-sm text-white outline-none transition placeholder:text-white/28 focus:border-[#D4B483]"
      />
    </label>
  );
}

function QuantityButton({
  children,
  label,
  disabled,
  onClick,
}: {
  children: React.ReactNode;
  label: string;
  disabled?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className="grid h-10 w-10 place-items-center border border-white/12 text-white/70 transition hover:border-[#D4B483] hover:text-[#D4B483] disabled:cursor-not-allowed disabled:opacity-35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4B483]"
    >
      {children}
    </button>
  );
}
