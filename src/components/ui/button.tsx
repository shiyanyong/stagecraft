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
    "inline-flex h-12 items-center justify-center gap-2 rounded-none border px-6 text-sm font-medium tracking-[0.16em] uppercase transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8C7D3] disabled:pointer-events-none disabled:opacity-50",
    variant === "primary" &&
      "border-[#B8C7D3] bg-[#B8C7D3] text-[#102A43] hover:bg-[#D8E4EC]",
    variant === "secondary" &&
      "border-[#B8C7D3]/70 bg-white/65 text-[#526A7C] hover:border-[#90A4B3] hover:bg-white",
    variant === "ghost" &&
      "border-transparent bg-transparent text-[#557086] hover:text-[#102A43]",
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
