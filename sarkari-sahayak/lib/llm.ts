/**
 * LLM wrapper — the single place the app talks to a model.
 *
 * v1 runs fully local via Ollama (LLM_PROVIDER=ollama, $0 budget). A Groq free-tier
 * branch arrives in Phase 4; keep this the only module that knows the provider.
 *
 * Phase 0 ships non-streaming `chat` (decision A3 — non-streaming first, streaming later)
 * plus `checkOllama` for the health route. Retrieval/citation live in lib/rag.ts +
 * lib/citation.ts (Phase 1) — this module stays provider-only.
 */

export type ChatRole = "system" | "user" | "assistant";

export interface ChatMessage {
  role: ChatRole;
  content: string;
}

type LlmProvider = "ollama" | "groq";

const PROVIDER = (process.env.LLM_PROVIDER ?? "ollama") as LlmProvider;
const OLLAMA_BASE_URL = process.env.OLLAMA_BASE_URL ?? "http://localhost:11434";
const LLM_MODEL = process.env.LLM_MODEL ?? "llama3.1:8b";

/** Raised when the model provider is unreachable or returns an error (maps to `llm_unavailable`, HTTP 503). */
export class LlmUnavailableError extends Error {
  constructor(message: string, options?: { cause?: unknown }) {
    super(message, options);
    this.name = "LlmUnavailableError";
  }
}

/**
 * Send a chat completion and return the assistant's reply text. Non-streaming.
 * Throws {@link LlmUnavailableError} if the provider can't be reached.
 */
export async function chat(messages: ChatMessage[]): Promise<string> {
  if (PROVIDER !== "ollama") {
    throw new LlmUnavailableError(
      `LLM_PROVIDER "${PROVIDER}" is not wired yet — only "ollama" is supported in v1.`,
    );
  }

  let res: Response;
  try {
    res = await fetch(`${OLLAMA_BASE_URL}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ model: LLM_MODEL, messages, stream: false }),
      cache: "no-store",
    });
  } catch (cause) {
    throw new LlmUnavailableError(
      `Could not reach Ollama at ${OLLAMA_BASE_URL}. Is \`ollama serve\` running?`,
      { cause },
    );
  }

  if (!res.ok) {
    throw new LlmUnavailableError(
      `Ollama returned ${res.status} for model "${LLM_MODEL}". Is it pulled (\`ollama pull ${LLM_MODEL}\`)?`,
    );
  }

  const data = (await res.json()) as { message?: { content?: string } };
  const content = data.message?.content?.trim();
  if (!content) {
    throw new LlmUnavailableError("Ollama returned an empty response.");
  }
  return content;
}

/** Liveness probe for the active provider — used by GET /api/health. Never throws. */
export async function checkOllama(): Promise<boolean> {
  if (PROVIDER !== "ollama") return false;
  try {
    const res = await fetch(`${OLLAMA_BASE_URL}/api/tags`, {
      cache: "no-store",
      signal: AbortSignal.timeout(2000),
    });
    return res.ok;
  } catch {
    return false;
  }
}
