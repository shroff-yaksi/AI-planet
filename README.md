# AI-Planet

> An open-source virtual town where each **building** is a specialist AI agent for a real-world domain. Walk into the building you need — get precise, citation-backed help.

**Status:** Building 1 (Sarkari-Sahayak) in development. See [ROADMAP.md](./ROADMAP.md) for the master plan.

## The idea

Generic chatbots give generic answers. AI-Planet gives you a **specialist** for each domain — government processes, banking, healthcare, agriculture, and more — each grounded in real documents from authoritative sources, with every claim cited.

The town concept solves three problems with general-purpose AI:

- **Specificity** — a focused agent grounded in domain documents gives precise, current, citable answers.
- **Discoverability** — a "town" gives an obvious mental map: "I need bank help, I'll go to the bank."
- **Contributors** — anyone can ship a new building (agent pack) without rewriting the platform.

## Buildings

| # | Building | Domain | Status |
|---|---|---|---|
| 1 | [Sarkari-Sahayak](./sarkari-sahayak) | Aadhaar updates | 🚧 In progress |
| 2 | Passport Office | Passport apply / renew | 📋 Planned |
| 3 | Bank | Financial literacy, loan math, fraud awareness | 📋 Planned |
| 4 | Hospital | Medical info, OPD navigation, ABHA | 📋 Planned |
| 5+ | Community-driven | … | 🌱 Future |

Full long-term plan: **[ROADMAP.md](./ROADMAP.md)**
Cross-building wishlist: **[IDEAS.md](./IDEAS.md)**

## Stack (shared across buildings)

- Next.js 15 + TypeScript + Tailwind + shadcn/ui
- Ollama (local LLM — Llama 3.1 8B)
- LanceDB (local vector store)
- A pluggable "agent pack" format (matures from Building 2 onward)

## Why this matters

In India and many emerging markets, navigating bureaucracy, finance, and healthcare is painful. Generic AI hallucinates. **Specialist, citation-backed AI grounded in local documents** can genuinely help — and being open source means anyone can verify, improve, and extend it.

## Principles

These apply to every building.

1. **Citations are non-negotiable.** Every claim links to its source.
2. **"I don't know" beats "I'll guess."** Default to honest uncertainty + the official link.
3. **One building works brilliantly before the next starts.** No half-built buildings.
4. **Adding a building must stay easy.** If it isn't, refactor before scaling.
5. **Real users, not demos.** Each building must have at least one real user before counting as shipped.
6. **Free / local first.** Anyone should be able to run AI-Planet without paying for APIs.

## License

MIT (planned)

## Contributing

Currently solo development through Building 1. Once Building 2 begins, the agent-pack format will stabilize and `CONTRIBUTING.md` will land — at which point we open up to community-built buildings.

For now, see the active building: **[Sarkari-Sahayak](./sarkari-sahayak)**.
