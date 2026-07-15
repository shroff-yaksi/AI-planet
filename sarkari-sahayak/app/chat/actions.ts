"use server";

import { chat, LlmUnavailableError, type ChatMessage } from "@/lib/llm";

/**
 * Phase 0 chat glue: pass the conversation to the local model and return its reply.
 *
 * This is the "hello world" loop that proves Ollama is wired end-to-end. Grounded
 * retrieval and citations arrive with POST /v1/ask in Phase 1 (lib/rag.ts +
 * lib/citation.ts); until then the UI is labelled as an early build without citations.
 */

export type AskResult =
  | { ok: true; reply: string }
  | { ok: false; code: "llm_unavailable" | "internal_error"; message: string };

// Foundations-only persona. The citation-first system prompt lives in lib/prompt.ts (Phase 1).
const SYSTEM_PROMPT: ChatMessage = {
  role: "system",
  content:
    "You are Sarkari-Sahayak, a calm, plain-spoken helper for Indian Aadhaar update processes. " +
    "Answer in short, concrete sentences. If you are unsure, say so plainly rather than guessing. " +
    "You are an independent open-source assistant, not an official UIDAI service.",
};

export async function askLlm(history: ChatMessage[]): Promise<AskResult> {
  try {
    const reply = await chat([SYSTEM_PROMPT, ...history]);
    return { ok: true, reply };
  } catch (err) {
    if (err instanceof LlmUnavailableError) {
      return {
        ok: false,
        code: "llm_unavailable",
        message:
          "The assistant is temporarily unavailable. Please try again shortly.",
      };
    }
    return {
      ok: false,
      code: "internal_error",
      message: "Something went wrong on our side. Please try again.",
    };
  }
}
