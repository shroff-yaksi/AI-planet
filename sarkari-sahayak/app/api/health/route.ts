import { NextResponse } from "next/server";
import { checkOllama } from "@/lib/llm";

// GET /api/health — liveness + Ollama reachability. Wire shape per contracts/openapi.yaml:
// { "status": "ok", "ollamaReachable": true }. Always 200: the app is alive even if Ollama is down.
export const dynamic = "force-dynamic";

export async function GET() {
  const ollamaReachable = await checkOllama();
  return NextResponse.json({ status: "ok", ollamaReachable });
}
