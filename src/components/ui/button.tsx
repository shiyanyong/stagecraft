import * as React from "react";
import { cn } from "@/lib/utils";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
};

export function buttonVariants({
  className,
  variant = "primary",
}: {
  className?: string;
  variant?: ButtonProps["variant"];
} = {}) {
  return cn(
    "inline-flex h-12 items-center justify-center gap-2 rounded-none border px-6 text-sm font-medium tracking-[0.18em] uppercase transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4B483] disabled:pointer-events-none disabled:opacity-50",
    variant === "primary" &&
      "border-[#D4B483] bg-[#D4B483] text-[#0A0A0A] hover:bg-[#E5C693]",
    variant === "secondary" &&
      "border-white/25 bg-white/5 text-white hover:border-white/45 hover:bg-white/10",
    variant === "ghost" &&
      "border-transparent bg-transparent text-white/70 hover:text-white",
    className,
  );
}

export function Button({
  className,
  variant = "primary",
  ...props
}: ButtonProps) {
  return (
    <button
      className={buttonVariants({ className, variant })}
      {...props}
    />
  );
}
