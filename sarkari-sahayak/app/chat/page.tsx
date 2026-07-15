"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { askLlm } from "./actions";
import type { ChatMessage } from "@/lib/llm";
import {
  ArrowUpRight,
  CheckSeal,
  CitationChip,
  GroundingBadge,
  SourceCard,
  type Source,
} from "../_ui/citation";

// Screen 2 — Chat (§6). Phase 0 answers are ungrounded, so live replies render as plain
// notes (honestly labelled). The empty state teaches the citation contract with a worked,
// clearly-labelled example — the wedge the user is here for. Citation wiring lands in Phase 1.

const EXAMPLE_QUESTIONS = [
  "What documents do I need to update my Aadhaar address?",
  "How much does an Aadhaar mobile number update cost?",
  "Can I update my Aadhaar photo online?",
];

const DEMO_SOURCES: Source[] = [
  {
    rank: 1,
    title: "UIDAI — Documents accepted as Proof of Address",
    host: "uidai.gov.in",
    url: "https://uidai.gov.in",
    snippet:
      "Accepted Proof of Address documents include passport, bank statement, ration card, voter ID, and registered rent agreement.",
    lastVerified: "2026-05-02",
  },
];

export default function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const listEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    listEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, pending]);

  async function send(question: string) {
    const trimmed = question.trim();
    if (!trimmed || pending) return;

    setError(null);
    const next: ChatMessage[] = [...messages, { role: "user", content: trimmed }];
    setMessages(next);
    setInput("");
    setPending(true);

    const result = await askLlm(next);
    if (result.ok) {
      setMessages([...next, { role: "assistant", content: result.reply }]);
    } else {
      setError(result.message);
    }
    setPending(false);
  }

  const isEmpty = messages.length === 0;

  return (
    <div className="flex flex-1 flex-col">
      {/* header */}
      <header className="sticky top-0 z-10 border-b border-hairline bg-paper/85 backdrop-blur">
        <div className="mx-auto flex w-full max-w-3xl items-center justify-between px-4 py-3">
          <Link href="/" className="wordmark text-base">
            Sarkari<span className="mark-dot">·</span>Sahayak
          </Link>
          <span className="inline-flex items-center gap-1.5 rounded-pill border border-hairline bg-surface-0 px-2.5 py-1 text-xs font-medium text-ink-500">
            <CheckSeal className="h-3.5 w-3.5 text-citation" />
            Citation-first
          </span>
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-4">
        <div className="flex flex-1 flex-col gap-5 overflow-y-auto py-6">
          {isEmpty ? (
            <EmptyState onPick={send} pending={pending} />
          ) : (
            messages.map((m, i) => (
              <Message key={i} role={m.role} content={m.content} />
            ))
          )}

          {pending && <Thinking />}

          {error && (
            <div
              role="alert"
              className="rounded-md border border-error/25 bg-surface-0 px-4 py-3 text-sm text-error"
            >
              {error}
            </div>
          )}

          <div ref={listEndRef} />
        </div>

        {/* composer */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
          className="sticky bottom-0 pb-4 pt-2"
        >
          <div className="flex items-end gap-2 rounded-lg border border-hairline bg-surface-0 p-2 shadow-[var(--shadow-card)] transition-shadow focus-within:shadow-[var(--shadow-focus)]">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  send(input);
                }
              }}
              rows={1}
              placeholder="Ask about an Aadhaar update…"
              aria-label="Your question"
              maxLength={1000}
              className="max-h-40 min-h-[36px] flex-1 resize-none bg-transparent px-2 py-2 text-ink-900 outline-none placeholder:text-ink-400"
            />
            <button
              type="submit"
              disabled={pending || !input.trim()}
              aria-label="Send question"
              className="inline-flex h-[44px] min-w-[44px] items-center justify-center gap-1.5 rounded-md bg-teal px-4 font-medium text-surface-0 transition-colors hover:bg-teal-700 disabled:opacity-40"
            >
              <SendIcon className="h-4 w-4" />
            </button>
          </div>
          <p className="mt-2 px-1 text-xs text-ink-400">
            Early foundations build — answers aren&apos;t yet grounded in cited
            UIDAI sources. Not an official UIDAI service.
          </p>
        </form>
      </div>
    </div>
  );
}

/* ------------------------------ empty state ----------------------------- */
function EmptyState({
  onPick,
  pending,
}: {
  onPick: (q: string) => void;
  pending: boolean;
}) {
  return (
    <div className="flex flex-1 flex-col justify-center gap-7 py-6">
      <div className="flex flex-col gap-2">
        <h1 className="font-display text-3xl text-ink-900">
          What can I help you check?
        </h1>
        <p className="text-ink-500">
          Ask about an Aadhaar update. Every answer will link back to the official
          UIDAI source — like this:
        </p>
      </div>

      {/* worked example — teaches the citation contract before the first question */}
      <figure className="rounded-lg border border-hairline bg-surface-0 p-4 shadow-[var(--shadow-card)]">
        <div className="mb-3 flex items-center gap-2">
          <span className="agent-avatar h-7 w-7 text-[13px]">S</span>
          <GroundingBadge count={1} />
        </div>
        <p className="text-ink-900">
          For an address update you&apos;ll need one valid Proof of Address — for
          example a passport, bank statement, or voter ID
          <CitationChip n={1} title={DEMO_SOURCES[0].title} />.
        </p>
        <div className="mt-3">
          <SourceCard source={DEMO_SOURCES[0]} />
        </div>
        <figcaption className="mt-3 text-xs text-ink-400">
          Illustrative — click a source to open the official page in a new tab.
        </figcaption>
      </figure>

      {/* example questions */}
      <div className="flex flex-col gap-2.5">
        <p className="text-xs font-medium uppercase tracking-wide text-ink-400">
          Try one of these
        </p>
        {EXAMPLE_QUESTIONS.map((q) => (
          <button
            key={q}
            onClick={() => onPick(q)}
            disabled={pending}
            className="group flex items-center justify-between gap-3 rounded-md border border-hairline bg-surface-0 px-4 py-3 text-left text-ink-900 transition-all hover:border-teal hover:bg-teal-50 disabled:opacity-50"
          >
            <span>{q}</span>
            <ArrowUpRight className="h-4 w-4 flex-none text-ink-400 transition-colors group-hover:text-teal" />
          </button>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------- messages ------------------------------- */
function Message({ role, content }: { role: string; content: string }) {
  const isUser = role === "user";
  if (isUser) {
    return (
      <div className="msg-enter flex justify-end">
        <div className="max-w-[85%] rounded-lg rounded-br-sm bg-teal px-4 py-2.5 text-surface-0">
          <p className="whitespace-pre-wrap">{content}</p>
        </div>
      </div>
    );
  }
  return (
    <div className="msg-enter flex justify-start gap-3">
      <span className="agent-avatar mt-0.5">S</span>
      <div className="min-w-0 max-w-[85%] rounded-lg rounded-tl-sm border border-hairline bg-surface-0 px-4 py-3 shadow-[var(--shadow-card)]">
        <p className="whitespace-pre-wrap text-ink-900">{content}</p>
        {/* Phase 0: ungrounded. Once /v1/ask returns citations, the answer renders
            with inline CitationChips + SourceCards here (or an UncertainCard). */}
      </div>
    </div>
  );
}

function Thinking() {
  return (
    <div className="msg-enter flex items-center gap-3" aria-live="polite">
      <span className="agent-avatar">S</span>
      <div className="inline-flex items-center gap-2 rounded-lg rounded-tl-sm border border-hairline bg-surface-0 px-4 py-3 text-sm text-ink-500 shadow-[var(--shadow-card)]">
        <span className="think-dot" />
        <span className="think-dot" />
        <span className="think-dot" />
        <span>Reading the sources…</span>
      </div>
    </div>
  );
}

/* -------------------------------- icons --------------------------------- */
function SendIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      aria-hidden
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3.5 10h11M10 5.5l4.5 4.5-4.5 4.5" />
    </svg>
  );
}
