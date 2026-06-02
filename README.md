# AI-Planet

> An open-source virtual town where each **building** is a specialist AI agent for a real-world domain. Walk into the building you need — get precise, citation-backed help.

Generic chatbots hallucinate about Indian government, banking, and health processes. AI-Planet gives you a **specialist** per domain, grounded in real documents from authoritative sources, with every claim cited. When it isn't sure, it says so and links the official source.

**Building 1 = [Sarkari-Sahayak](./sarkari-sahayak)** — an Aadhaar-updates assistant (mobile, address, name, photo).

| # | Building | Domain | Status |
|---|---|---|---|
| 1 | [Sarkari-Sahayak](./sarkari-sahayak) | Aadhaar updates | 🔄 In progress |
| 2 | Passport Office | Apply / renew | ⬜ Planned |
| 3 | Bank | Financial literacy | ⬜ Planned |
| 4 | Hospital | Medical info | ⬜ Planned |

**Stack:** Next.js 15 + TypeScript + Tailwind + shadcn/ui + Ollama (local LLM, Llama 3.1 8B) + LanceDB (per-agent local vector store).

**Wedge:** one painful task, done brilliantly, with citations. Not a general chatbot — a focused guide for *one* process at a time, where being correct and verifiable matters more than being broad. When retrieval is weak the agent says "I'm not sure" and links the official source instead of guessing.

**Docs:** Machine-readable contracts live in [contracts/](./contracts). Full plan & spec: kept in the portfolio `planning/` workspace (not in this public repo).

License: MIT.
