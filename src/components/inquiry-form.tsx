"use client";

import { FormEvent, useState } from "react";
import { CheckCircle2, Send } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

export function InquiryForm({ productName }: { productName: string }) {
  const [sent, setSent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
  }

  if (sent) {
    return (
      <div className="border border-emerald-300/30 bg-emerald-300/10 p-8">
        <CheckCircle2 className="h-8 w-8 text-emerald-200" />
        <h3 className="mt-5 text-2xl font-semibold">询价信息已记录</h3>
        <p className="mt-3 leading-7 text-white/60">
          我们会按你留下的联系方式确认 {productName} 的库存、发货周期和搭配建议。
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="border border-white/10 bg-[#111111] p-6 sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="姓名 / 称呼" name="name" placeholder="例如：陈先生" />
        <Field label="联系方式" name="contact" placeholder="微信 / 手机 / 邮箱" />
      </div>
      <label className="mt-5 block">
        <span className="text-sm text-white/62">数量或备注</span>
        <textarea
          name="message"
          rows={5}
          placeholder="例如：想买 1:64 工业车库地台 2 件，搭配跑车展示。"
          className="mt-2 w-full resize-none border border-white/12 bg-black/35 px-4 py-3 text-white outline-none transition placeholder:text-white/28 focus:border-[#D4B483] focus:ring-1 focus:ring-[#D4B483]"
        />
      </label>
      <button className={buttonVariants({ className: "mt-6 w-full" })}>
        提交询价 <Send className="h-4 w-4" />
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  placeholder,
}: {
  label: string;
  name: string;
  placeholder: string;
}) {
  return (
    <label className="block">
      <span className="text-sm text-white/62">{label}</span>
      <input
        name={name}
        required
        placeholder={placeholder}
        className="mt-2 h-12 w-full border border-white/12 bg-black/35 px-4 text-white outline-none transition placeholder:text-white/28 focus:border-[#D4B483] focus:ring-1 focus:ring-[#D4B483]"
      />
    </label>
  );
}
