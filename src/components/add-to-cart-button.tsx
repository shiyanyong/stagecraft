"use client";

import { useState } from "react";
import { Check, ShoppingBag } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { useCart } from "@/components/cart-provider";

export function AddToCartButton({
  slug,
  className,
  label = "加入购物车",
}: {
  slug: string;
  className?: string;
  label?: string;
}) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  return (
    <button
      type="button"
      className={buttonVariants({ className, variant: added ? "secondary" : "primary" })}
      onClick={() => {
        addItem(slug);
        setAdded(true);
        window.setTimeout(() => setAdded(false), 1600);
      }}
    >
      {added ? "已加入" : label}
      {added ? <Check className="h-4 w-4" /> : <ShoppingBag className="h-4 w-4" />}
    </button>
  );
}
