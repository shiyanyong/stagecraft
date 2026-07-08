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
      <div className="border border-emerald-500/25 bg-emerald-50 p-8 text-[#102A43]">
        <CheckCircle2 className="h-8 w-8 text-emerald-600" />
        <h3 className="mt-5 text-2xl font-semibold">询价信息已记录</h3>
        <p className="mt-3 leading-7 text-[#5A7182]">
          我们会按你留下的联系方式确认 {productName} 的库存、箱规、发货周期和采购建议。
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="border border-[#B8C7D3]/45 bg-white/82 p-6 sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="姓名 / 称呼" name="name" placeholder="例如：陈先生" />
        <Field label="联系方式" name="contact" placeholder="微信 / 手机 / 邮箱" />
      </div>
      <label className="mt-5 block">
        <span className="text-sm text-[#5A7182]">数量或备注</span>
        <textarea
          name="message"
          rows={5}
          placeholder="例如：想采购 500ml 家庭箱装 20 箱，用于办公室茶水间。"
          className="mt-2 w-full resize-none border border-[#B8C7D3]/55 bg-[#F7FCFF] px-4 py-3 text-[#102A43] outline-none transition placeholder:text-[#93A8B6] focus:border-[#8FA8B8] focus:ring-1 focus:ring-[#B8C7D3]"
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
      <span className="text-sm text-[#5A7182]">{label}</span>
      <input
        name={name}
        required
        placeholder={placeholder}
        className="mt-2 h-12 w-full border border-[#B8C7D3]/55 bg-[#F7FCFF] px-4 text-[#102A43] outline-none transition placeholder:text-[#93A8B6] focus:border-[#8FA8B8] focus:ring-1 focus:ring-[#B8C7D3]"
      />
    </label>
  );
}
