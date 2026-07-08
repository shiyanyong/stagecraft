"use client";

import { useMemo, useState, type FormEvent } from "react";
import { Bot, MessageCircle, Send, X } from "lucide-react";
import { useStorefrontProducts } from "@/components/storefront-products-provider";

type ChatMessage = {
  role: "assistant" | "user";
  content: string;
};

const starterQuestions = [
  "日常饮用选 330ml 还是 500ml？",
  "低钠苏打水适合哪些人？",
  "企业采购怎么选箱规？",
];

export function AICustomerService() {
  const { products } = useStorefrontProducts();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        "你好，我是御罕泉 AI 客服。可以帮你按饮用场景、规格、预算和库存状态选择天然苏打水。",
    },
  ]);

  const productContext = useMemo(
    () =>
      products.map((product) => ({
        slug: product.slug,
        name: product.name,
        cnName: product.cnName,
        price: product.price,
        status: product.status,
        scale: product.scale,
        size: product.size,
        scene: product.scene,
        description: product.description,
      })),
    [products],
  );

  async function sendMessage(text: string) {
    const content = text.trim();
    if (!content || loading) return;

    const nextMessages: ChatMessage[] = [...messages, { role: "user", content }];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/ai-customer-service", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: nextMessages,
          products: productContext,
          currentPath: window.location.pathname,
        }),
      });
      const result = await response.json().catch(() => null);
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content:
            result?.reply ||
            "AI 客服暂时无法连接，请稍后再试，或通过页面底部联系客服。",
        },
      ]);
    } catch {
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content: "AI 客服暂时无法连接，请稍后再试。",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void sendMessage(input);
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 sm:bottom-6 sm:right-6">
      {open ? (
        <section className="w-[calc(100vw-2rem)] max-w-[390px] overflow-hidden border border-[#B8C7D3]/55 bg-[#F7FCFF]/96 text-[#102A43] shadow-2xl shadow-sky-900/15 backdrop-blur">
          <header className="flex items-center justify-between border-b border-[#B8C7D3]/45 bg-white/82 px-4 py-3">
            <div className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center border border-[#B8C7D3]/55 bg-[#DFF2FC] text-[#526A7C]">
                <Bot className="h-4 w-4" />
              </span>
              <div>
                <strong className="block text-sm">御罕泉 AI 客服</strong>
                <span className="text-xs text-[#6D8495]">商品推荐 / 库存咨询 / 采购建议</span>
              </div>
            </div>
            <button
              type="button"
              aria-label="关闭 AI 客服"
              onClick={() => setOpen(false)}
              className="grid h-9 w-9 place-items-center border border-[#B8C7D3]/55 text-[#6D8495] transition hover:bg-white hover:text-[#102A43]"
            >
              <X className="h-4 w-4" />
            </button>
          </header>

          <div className="max-h-[420px] space-y-3 overflow-y-auto px-4 py-4">
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <p
                  className={`max-w-[82%] whitespace-pre-wrap rounded-none border px-3 py-2 text-sm leading-6 ${
                    message.role === "user"
                      ? "border-[#B8C7D3] bg-[#B8C7D3] text-[#102A43]"
                      : "border-[#B8C7D3]/45 bg-white/75 text-[#5A7182]"
                  }`}
                >
                  {message.content}
                </p>
              </div>
            ))}
            {loading ? (
              <p className="inline-flex border border-[#B8C7D3]/45 bg-white/75 px-3 py-2 text-sm text-[#6D8495]">
                正在思考...
              </p>
            ) : null}
          </div>

          <div className="border-t border-[#B8C7D3]/45 px-4 py-3">
            <div className="mb-3 flex gap-2 overflow-x-auto pb-1">
              {starterQuestions.map((question) => (
                <button
                  key={question}
                  type="button"
                  onClick={() => void sendMessage(question)}
                  className="shrink-0 border border-[#B8C7D3]/45 bg-white/70 px-3 py-2 text-xs text-[#5A7182] transition hover:border-[#8FA8B8] hover:bg-white"
                >
                  {question}
                </button>
              ))}
            </div>
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="输入你想咨询的问题"
                className="h-11 min-w-0 flex-1 border border-[#B8C7D3]/55 bg-white/75 px-3 text-sm text-[#102A43] outline-none transition placeholder:text-[#93A8B6] focus:border-[#8FA8B8]"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="grid h-11 w-11 place-items-center bg-[#B8C7D3] text-[#102A43] transition hover:bg-[#D8E4EC] disabled:cursor-not-allowed disabled:opacity-45"
                aria-label="发送消息"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </section>
      ) : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="flex h-14 items-center gap-3 border border-[#B8C7D3]/70 bg-[#B8C7D3] px-5 text-sm font-medium text-[#102A43] shadow-2xl shadow-sky-900/15 transition hover:bg-[#D8E4EC] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8C7D3]"
        >
          <MessageCircle className="h-5 w-5" />
          AI 客服
        </button>
      )}
    </div>
  );
}
