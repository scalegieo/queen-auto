"use client";

import Link from "next/link";
import { FormEvent, useEffect, useRef, useState } from "react";
import { Bot, MessageCircle, Send, X } from "lucide-react";
import { cn } from "@/lib/format";

type Msg = { role: "user" | "assistant"; content: string };
type Cta = { label: string; href: string };

const STARTERS = [
  "SUVs under $45k",
  "I need financing",
  "Schedule a test drive",
  "Se habla Español?",
];

function renderContent(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*|\/inventory\/[a-z0-9-]+)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-text">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("/inventory/")) {
      return (
        <Link
          key={i}
          href={part}
          className="font-medium text-green underline underline-offset-2"
        >
          View
        </Link>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

export function SalesAgent() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [cta, setCta] = useState<Cta | null>({
    label: "Get Pre-Approved",
    href: "/financing",
  });
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      content:
        "Welcome to Queen Auto Sales — you get the royal treatment here. I can help you find a car, get pre-approved, or schedule a visit. What are you looking for?",
    },
  ]);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open, loading]);

  async function send(text: string) {
    const content = text.trim();
    if (!content || loading) return;

    const nextMessages: Msg[] = [...messages, { role: "user", content }];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });
      const data = (await res.json()) as { reply?: string; cta?: Cta };
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content:
            data.reply ??
            "Thanks — a team member can help if you call or apply for financing.",
        },
      ]);
      if (data.cta) setCta(data.cta);
    } catch {
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content: "Connection issue. Please try again or call us.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    void send(input);
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          "fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full bg-green px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-green/25 transition hover:bg-green-bright pulse-ring",
          open && "pointer-events-none opacity-0",
        )}
        aria-label="Open Queen AI sales assistant"
      >
        <MessageCircle className="h-5 w-5" />
        <span className="hidden sm:inline">Ask Queen AI</span>
      </button>

      <div
        className={cn(
          "glass-light fixed bottom-5 right-5 z-50 flex w-[min(100vw-1.5rem,24rem)] flex-col overflow-hidden rounded-3xl transition-all duration-300",
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none translate-y-4 opacity-0",
        )}
        style={{ height: "min(34rem, calc(100svh - 6rem))" }}
        role="dialog"
        aria-label="Queen AI sales assistant"
        aria-hidden={!open}
      >
        <div className="flex items-center justify-between bg-black px-4 py-3 text-white">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green">
              <Bot className="h-4 w-4" />
            </div>
            <div>
              <p className="text-sm font-semibold">Queen AI</p>
              <p className="text-[11px] text-white/55">Sales assistant · Online</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="rounded-full p-1.5 text-white/70 hover:bg-white/10 hover:text-white"
            aria-label="Close chat"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1 space-y-3 overflow-y-auto bg-bg-elevated px-3 py-4">
          {messages.map((m, i) => (
            <div
              key={`${m.role}-${i}`}
              className={cn(
                "max-w-[90%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-wrap",
                m.role === "assistant"
                  ? "bg-white text-text shadow-sm"
                  : "ml-auto bg-green text-white",
              )}
            >
              {m.role === "assistant" ? renderContent(m.content) : m.content}
            </div>
          ))}
          {loading && (
            <div className="w-fit rounded-2xl bg-white px-3.5 py-2.5 text-sm text-muted shadow-sm">
              Typing…
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {messages.length < 3 && (
          <div className="flex flex-wrap gap-2 border-t border-border bg-white px-3 py-2">
            {STARTERS.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => void send(s)}
                className="rounded-full border border-border px-2.5 py-1 text-[11px] font-medium text-muted transition hover:border-green hover:text-green"
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {cta && (
          <div className="border-t border-border bg-white px-3 py-2">
            <Link href={cta.href} className="btn-primary w-full !py-2.5 text-xs" onClick={() => setOpen(false)}>
              {cta.label}
            </Link>
          </div>
        )}

        <form onSubmit={onSubmit} className="flex gap-2 border-t border-border bg-white p-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about cars or financing…"
            className="input-field !rounded-full !py-2.5"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-green text-white transition hover:bg-green-bright disabled:opacity-40"
            aria-label="Send message"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>
    </>
  );
}
