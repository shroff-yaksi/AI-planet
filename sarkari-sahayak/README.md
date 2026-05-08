# Sarkari-Sahayak

> Part of [**AI-Planet**](../README.md) — the first building. An open-source AI assistant that helps Indians navigate Aadhaar update processes step-by-step, in plain language, with citations to official UIDAI sources.

**Status:** In development — see [ROADMAP.md](./ROADMAP.md) and [ROADMAP_VISUAL.md](./ROADMAP_VISUAL.md).

## Why this exists

ChatGPT and Google answers about Indian government processes are often outdated or too generic. Real people — especially those less comfortable with English forms — need a focused, citation-backed guide for one painful task at a time.

Sarkari-Sahayak starts with **Aadhaar updates** (mobile, address, name, photo). Every answer is grounded in official UIDAI documents and shows its source.

## Place in AI-Planet

This is **Building 1** of [AI-Planet](../README.md). The architecture, RAG pipeline, and OSS workflow we build here become the foundation that future buildings (Passport Office, Bank, Hospital, …) will reuse. See the [master roadmap](../ROADMAP.md) for the long-term picture.

## What makes this different

- **Citation-first:** every claim links to the official source. No hallucinated rules.
- **Free to run:** uses local LLMs (Ollama) — no API costs.
- **Pluggable:** adding a new process is one file. The architecture welcomes contributions.
- **Honest:** when the system isn't sure, it says so and points to the official resource instead of guessing.

## Stack

- Next.js 15 (App Router) + TypeScript + Tailwind + shadcn/ui
- Ollama running locally (Llama 3.1 8B)
- LanceDB (local vector store)
- Embeddings via `nomic-embed-text`

## Getting started

*Coming once Phase 0 is complete — see [ROADMAP.md](./ROADMAP.md).*

## Contributing

Building 1 is solo for now. Once Building 2 begins (see [`../ROADMAP.md`](../ROADMAP.md)), the AI-Planet agent-pack format will stabilize and contribution docs will go live at the project root.

## License

MIT (planned)
