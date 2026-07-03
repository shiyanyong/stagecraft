"use client";

import { useMemo, useState, type FormEvent } from "react";
import { Bot, MessageCircle, Send, X } from "lucide-react";
import { useStorefrontProducts } from "@/components/storefront-products-provider";

type ChatMessage = {
  role: "assistant" | "user";
  content: string;
};

const starterQuestions = [
  "1:64 车模适合哪款地台？",
  "想拍照展示，推荐哪种场景？",
  "现货和预订有什么区别？",
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
        "你好，我是 STAGECRAFT AI 客服。可以帮你按模型比例、展示空间和拍摄需求推荐地台。",
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
        <section className="w-[calc(100vw-2rem)] max-w-[390px] overflow-hidden border border-[#D4B483]/30 bg-[#0A0A0A]/96 text-white shadow-2xl shadow-black/50 backdrop-blur">
          <header className="flex items-center justify-between border-b border-white/10 bg-[#111111] px-4 py-3">
            <div className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center border border-[#D4B483]/35 bg-[#D4B483]/12 text-[#D4B483]">
                <Bot className="h-4 w-4" />
              </span>
              <div>
                <strong className="block text-sm">STAGECRAFT AI 客服</strong>
                <span className="text-xs text-white/45">商品推荐 / 库存咨询 / 搭配建议</span>
              </div>
            </div>
            <button
              type="button"
              aria-label="关闭 AI 客服"
              onClick={() => setOpen(false)}
              className="grid h-9 w-9 place-items-center border border-white/10 text-white/58 transition hover:border-white/30 hover:text-white"
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
                      ? "border-[#D4B483]/40 bg-[#D4B483] text-black"
                      : "border-white/10 bg-white/[0.04] text-white/72"
                  }`}
                >
                  {message.content}
                </p>
              </div>
            ))}
            {loading ? (
              <p className="inline-flex border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-white/50">
                正在思考...
              </p>
            ) : null}
          </div>

          <div className="border-t border-white/10 px-4 py-3">
            <div className="mb-3 flex gap-2 overflow-x-auto pb-1">
              {starterQuestions.map((question) => (
                <button
                  key={question}
                  type="button"
                  onClick={() => void sendMessage(question)}
                  className="shrink-0 border border-white/10 px-3 py-2 text-xs text-white/55 transition hover:border-[#D4B483]/50 hover:text-[#D4B483]"
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
                className="h-11 min-w-0 flex-1 border border-white/12 bg-white/[0.03] px-3 text-sm text-white outline-none transition placeholder:text-white/28 focus:border-[#D4B483]"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="grid h-11 w-11 place-items-center bg-[#D4B483] text-black transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-45"
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
          className="flex h-14 items-center gap-3 border border-[#D4B483]/45 bg-[#D4B483] px-5 text-sm font-medium text-black shadow-2xl shadow-black/40 transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4B483]"
        >
          <MessageCircle className="h-5 w-5" />
          AI 客服
        </button>
      )}
    </div>
  );
}
