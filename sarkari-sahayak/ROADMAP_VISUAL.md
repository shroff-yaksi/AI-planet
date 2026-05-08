# Sarkari-Sahayak — Visual Roadmap

> Visual companion to [ROADMAP.md](./ROADMAP.md). All diagrams are Mermaid — they render natively on GitHub.

---

## Timeline (Gantt)

```mermaid
gantt
    title Sarkari-Sahayak — 16 weeks at 3-5 hr/week
    dateFormat YYYY-MM-DD
    axisFormat %b %d

    section Phase 0 · Foundations
    Setup Ollama + Next.js scaffold        :p0, 2026-05-11, 14d
    v0.0.1 release                          :milestone, after p0, 0d

    section Phase 1 · First Agent
    Mobile Update agent + RAG pipeline     :p1, after p0, 28d
    v0.1.0 release                          :milestone, after p1, 0d

    section Phase 2 · Multi-agent
    Refactor + Address Update agent        :p2, after p1, 21d
    v0.2.0 release                          :milestone, after p2, 0d

    section Phase 3 · Coverage
    Name + Photo agents + UX polish        :p3, after p2, 21d
    v0.3.0 release                          :milestone, after p3, 0d

    section Phase 4 · OSS Launch
    Docs + Vercel deploy + public launch   :p4, after p3, 28d
    v1.0.0 launch                           :milestone, after p4, 0d
```

**Estimated finish:** ~2026-08-30 (assuming you start 2026-05-11 and stay on pace)

---

## Phase progression (release tags)

```mermaid
flowchart LR
    A[<b>Phase 0</b><br/><code>v0.0.1</code><br/>Local LLM chat works] --> B[<b>Phase 1</b><br/><code>v0.1.0</code><br/>Mobile update agent]
    B --> C[<b>Phase 2</b><br/><code>v0.2.0</code><br/>+ Address update<br/>+ multi-agent arch]
    C --> D[<b>Phase 3</b><br/><code>v0.3.0</code><br/>+ Name + Photo<br/>+ UX polish]
    D --> E[<b>Phase 4</b><br/><code>v1.0.0</code><br/>Public launch 🚀]

    style A fill:#fef3c7,stroke:#92400e
    style B fill:#dbeafe,stroke:#1e40af
    style C fill:#dbeafe,stroke:#1e40af
    style D fill:#dbeafe,stroke:#1e40af
    style E fill:#dcfce7,stroke:#166534
```

---

## What's in vs. out for v1

```mermaid
mindmap
  root((Sarkari-Sahayak v1))
    In Scope
      Aadhaar Mobile Update
      Aadhaar Address Update
      Aadhaar Name Correction
      Aadhaar Photo Update
      Web app (browser)
      English only
      Local Ollama LLM
      Citations to UIDAI
    Out of Scope
      Hindi / Gujarati
      WhatsApp / Voice
      Other gov processes
      User accounts
      Form auto-fill
      Document upload
      Payments
```

---

## System architecture (target)

```mermaid
flowchart TB
    User[👤 User] -->|asks question| UI[Next.js Chat UI]
    UI -->|POST /api/chat| API[API Route]
    API -->|classify| Router{Intent Router}
    Router -->|mobile?| AgentM[Mobile Update Agent]
    Router -->|address?| AgentA[Address Update Agent]
    Router -->|name?| AgentN[Name Correction Agent]
    Router -->|photo?| AgentP[Photo Update Agent]

    AgentM & AgentA & AgentN & AgentP -->|embed query| Embed[nomic-embed-text]
    Embed -->|top-k chunks| VDB[(LanceDB<br/>vector store)]
    VDB -->|context| LLM[Ollama<br/>Llama 3.1 8B]
    LLM -->|answer + citations| API
    API -->|stream response| UI

    Ingest[scripts/ingest.ts] -->|chunks + embeddings| VDB
    Raw[(data/raw/<br/>UIDAI PDFs & HTML)] -->|read| Ingest

    style User fill:#fef3c7
    style LLM fill:#dcfce7
    style VDB fill:#e0e7ff
    style Raw fill:#fce7f3
```

---

## Risk × Time map

```mermaid
quadrantChart
    title Risks — manage the top-right urgently
    x-axis Low Likelihood --> High Likelihood
    y-axis Low Impact --> High Impact
    quadrant-1 Critical
    quadrant-2 Plan ahead
    quadrant-3 Monitor
    quadrant-4 Mitigate
    Hallucinated answers: [0.7, 0.95]
    Scope creep: [0.85, 0.75]
    3-5 hr/week too tight: [0.75, 0.85]
    UIDAI policy changes: [0.5, 0.7]
    Local LLM too weak: [0.55, 0.5]
    Burnout: [0.5, 0.8]
```

---

*Edit these diagrams when reality diverges from the plan. Keep this in sync with [ROADMAP.md](./ROADMAP.md).*
