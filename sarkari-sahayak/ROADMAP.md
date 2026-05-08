# Sarkari-Sahayak — Roadmap

*Last updated: 2026-05-08*

## What we're building

An open-source AI assistant that helps Indians navigate **Aadhaar update processes** step-by-step, answering questions in plain language with citations to official UIDAI sources.

**Why:** ChatGPT/Google answers about Indian gov processes are often outdated or too generic. Real people — especially those less comfortable with English forms — need a focused, trustworthy, citation-backed guide for one painful task at a time. There is no good open-source alternative today.

---

## Success criteria for v1.0

A user can:

- Ask "I changed my house, what do I need to update my Aadhaar address?" and get a complete checklist
- See exactly which documents are accepted (with names, not vague categories)
- Know the fees, expected timeline, and where to go (online vs. enrolment center)
- Click a citation to verify against the official UIDAI source

We will know we succeeded if **5+ real people in Surat** can use it to actually complete an Aadhaar update without further help.

---

## Locked constraints (decided 2026-05-08)

| Decision | Choice |
|---|---|
| Developer | 1 person, intermediate skill, learning-first |
| Time available | 3-5 hours / week |
| Interface | Web app (browser chat) |
| Language v1 | English only |
| Budget | $0 — fully local LLM via Ollama |
| Scope v1 | All 4 Aadhaar updates (mobile, address, name, photo), shipped **one at a time** |

---

## Tech stack & rationale

| Layer | Choice | Why |
|---|---|---|
| Frontend | Next.js 15 (App Router) + Tailwind + shadcn/ui | Industry-standard, lots of learning material, great DX |
| Backend | Next.js API routes | Same project, no separate server. Simpler. |
| Language | TypeScript | Catches more bugs while learning, better intellisense |
| LLM | Ollama running Llama 3.1 8B (or Phi-3 if RAM-constrained) | Free, runs on your laptop, real "production" experience |
| Embeddings | `nomic-embed-text` via Ollama | Free, fast, good quality |
| Vector store | LanceDB (local file) | Zero-setup, no Docker, just works |
| Persistence | SQLite (only if needed for history) | File-based, simple |
| Hosting | Local for v1 → Vercel + Groq free tier for v2 | Fits $0 budget |

**You'll learn through this stack:** Next.js App Router, RAG end-to-end, embeddings, prompt engineering, modular agent design, OSS practices, deployment.

---

## Folder structure (target — built up over phases)

```
sarkari-sahayak/
├── README.md
├── ROADMAP.md           ← this file
├── LICENSE              ← MIT
├── CONTRIBUTING.md      ← Phase 4
├── IDEAS.md             ← parking lot for "wouldn't it be cool if..."
├── .gitignore
├── package.json
├── app/
│   ├── layout.tsx
│   ├── page.tsx         ← landing
│   ├── chat/page.tsx    ← main chat UI
│   └── api/
│       └── chat/route.ts
├── lib/
│   ├── llm.ts           ← Ollama wrapper
│   ├── rag.ts           ← retrieval logic
│   ├── embeddings.ts
│   └── agents/
│       ├── registry.ts
│       ├── mobile-update.ts
│       ├── address-update.ts
│       ├── name-correction.ts
│       └── photo-update.ts
├── data/
│   ├── raw/             ← original UIDAI PDFs/HTML
│   └── processed/       ← chunked & embedded
├── scripts/
│   ├── ingest.ts        ← scrape → chunk → embed
│   └── eval.ts          ← run golden Q&A against the system
└── docs/
    ├── architecture.md
    ├── adding-a-process.md
    └── data-sources.md
```

---

## Roadmap (phased)

**Total: ~16 weeks at 3-5 hr/week ≈ 60-72 hours**

Each phase ends with a tagged GitHub release. If you miss a phase deadline by more than 1.5×, **re-scope rather than grind**.

### Phase 0 — Foundations (Weeks 1-2 · 8-10 hr)

**Goal:** local "hello world" chat with Ollama running.

- [ ] Install Ollama; pull `llama3.1:8b` and `nomic-embed-text`
- [ ] Verify your laptop can run inference (≥16GB RAM ideal; if less, use `phi3:mini`)
- [ ] `npx create-next-app@latest sarkari-sahayak` — TypeScript + Tailwind + App Router
- [ ] Install shadcn/ui, set up base components (button, input, card)
- [ ] Build minimal chat page: input + scrolling message list
- [ ] Wire `/api/chat` route to call Ollama (start non-streaming, add streaming later)
- [ ] Initial git commit; create public GitHub repo with MIT license

**Learning focus:** Next.js App Router, API routes, Ollama API, basic streaming.

**Done when:** you can type "hello" in the browser and get a reply from local Llama.

**Tag: `v0.0.1`**

### Phase 1 — First agent: Mobile Number Update (Weeks 3-6 · 16-20 hr)

**Goal:** ship a real working assistant for one Aadhaar process. We start with mobile-number update because its data scope is smallest — perfect for learning the RAG pipeline without drowning in content.

- [ ] Collect data into `data/raw/mobile-update/`: UIDAI official PDFs, FAQ pages, fee structure, form download links
- [ ] Save originals (PDF, archived HTML) — don't just bookmark, originals disappear
- [ ] Write `scripts/ingest.ts`: load PDFs → chunk (200-500 tokens, ~50 token overlap) → embed via Ollama → store in LanceDB
- [ ] Implement `lib/rag.ts`: query → embed → retrieve top-k chunks (k=5 default)
- [ ] Update `/api/chat` to: retrieve chunks → inject into prompt → call LLM → return answer + sources
- [ ] Render citations in UI: each fact links back to source URL/PDF
- [ ] Write 10-15 "golden questions" + expected answers in `scripts/eval.ts`
- [ ] Iterate on prompt: tone, citation format, "I don't know" behavior when retrieval is weak

**Learning focus:** RAG end-to-end, chunking, prompt engineering, evaluation discipline.

**Done when:** the assistant correctly answers all 15 golden mobile-update questions with valid citations.

**Tag: `v0.1.0`** ← first real release, share with one friend for feedback

### Phase 2 — Multi-agent architecture (Weeks 7-9 · 10-12 hr)

**Goal:** generalize the codebase so adding a new sub-process is a small, contained task.

- [ ] Refactor: extract an `Agent` interface (system prompt + data path + golden Qs)
- [ ] Build `agents/registry.ts` so adding an agent = adding one file
- [ ] Add intent router: "which sub-process is this question about?" — start with keyword routing, upgrade to a small LLM classifier if needed
- [ ] Add second agent: Address Update (full pipeline — collect data, ingest, golden Qs)
- [ ] Update UI: optional process selector (auto-route by default, manual override available)

**Learning focus:** multi-agent design, intent classification, separation of concerns.

**Done when:** address + mobile both work; adding a 3rd agent is mechanical (<2 hr of work).

**Tag: `v0.2.0`**

### Phase 3 — Complete coverage + UX polish (Weeks 10-12 · 12-15 hr)

**Goal:** all 4 sub-processes work, UI feels real.

- [ ] Add Name Correction agent (data + golden Qs)
- [ ] Add Photo/Biometric Update agent (data + golden Qs)
- [ ] UX polish: loading states, empty states, error handling, mobile-responsive
- [ ] Landing page explaining the project + disclaimer
- [ ] Write `docs/adding-a-process.md` — onboarding for contributors
- [ ] Set up GitHub Action: run golden Qs on every PR (basic regression eval)

**Learning focus:** UX states, accessibility basics, GitHub Actions, evaluating LLM outputs in CI.

**Tag: `v0.3.0`**

### Phase 4 — OSS launch (Weeks 13-16 · 10-15 hr)

**Goal:** the project is genuinely usable AND others can contribute.

- [ ] Proper README: what it is, screenshots, demo video, quick-start, screenshots
- [ ] CONTRIBUTING.md: how to add an agent, code style, PR process
- [ ] Architecture doc with diagrams (`docs/architecture.md`)
- [ ] Migrate to Groq's free tier (Llama 3.1 70B free) so you can deploy publicly to Vercel without local compute
- [ ] Deploy to Vercel — get a public URL
- [ ] Soft launch: 5-10 friends/family in Surat, gather feedback in person
- [ ] Public launch: post on r/india, r/opensource, Hacker News, Twitter/LinkedIn

**Learning focus:** OSS hygiene, technical writing, deployment, marketing/community.

**Tag: `v1.0.0`**

---

## Out of scope for v1 (deliberately)

These are tempting and will kill the timeline. Park them in `IDEAS.md`, not the codebase:

- Hindi / Gujarati support
- WhatsApp / mobile / voice interfaces
- User accounts, history, login
- Other gov processes (passport, PAN, RTI)
- Form auto-fill or document upload
- Payments / fee handling
- Analytics dashboards
- Vector DB swap to Pinecone / Weaviate / etc.

When v1 ships, pick **ONE** of these for v1.1. Not all.

---

## Risk register

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| UIDAI policies change mid-project | Medium | High | Version `data/raw/`; add "last verified" date per agent |
| Local LLM too weak for nuanced answers | Medium | Medium | Have a fallback path: switch to Groq free tier (Llama 70B) anytime |
| 3-5 hr/week is too tight, project stalls | High | High | Phases are independent; each has a release tag; never let a phase drag past 1.5× estimate without re-scoping |
| Hallucinated answers about real laws/forms | High | Critical | Every answer must cite source chunks; if retrieval is weak, default to "I'm not sure — here's the official UIDAI link" |
| Scope creep ("just one more feature...") | High | High | Write all "wouldn't it be cool if..." into `IDEAS.md` immediately, never the code |
| Burnout / motivation dip | Medium | High | Phase tags = visible progress; share v0.1.0 release with someone who'll cheer |

---

## Data sources to start collecting (Phase 1 prep)

Save originals — don't just link, gov sites change without notice.

- UIDAI official site: <https://uidai.gov.in>
- Aadhaar enrolment & update document list (official PDF)
- Aadhaar fee structure
- Document validity rules
- Local enrolment center directory for Surat / Gujarat
- UIDAI FAQ pages (these are gold — already structured Q&A)

---

## How to measure progress

Each phase has a binary "done when" line. If you hit it, ship the tag.

If you miss two phase deadlines in a row: **stop and re-plan**. The phase is too big, the time estimate was wrong, or motivation is dipping. Adjust the roadmap rather than grind.

---

## Learning resources

- Next.js App Router — <https://nextjs.org/learn>
- Ollama library — <https://ollama.com/library/llama3.1>
- RAG fundamentals — <https://www.pinecone.io/learn/series/rag/> (provider-agnostic)
- LanceDB quickstart — <https://lancedb.github.io/lancedb/>
- shadcn/ui — <https://ui.shadcn.com>
- Open source guides — <https://opensource.guide/>

---

*This roadmap is a living document. When reality diverges from the plan, edit it — that's the point.*
