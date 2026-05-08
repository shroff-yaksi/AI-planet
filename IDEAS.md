# AI-Planet — Ideas Parking Lot

> Anything that's *not* on the active roadmap goes here. Capture the idea without letting it derail the current phase. When finishing a building, decide which ideas earn promotion to the next slot.

## Future buildings (beyond the planned 4)

- 💻 **IT Firm** — coding help, debugging, framework choices, stack picker
- 🌾 **Farmer's Office** — crops, plant disease, weather, MSP, PM-KISAN
- 🏫 **School** — homework help, exam prep, scholarships, admissions
- 🏠 **Real Estate / Apartment** — rental laws, RERA, society bylaws, broker norms
- 📡 **Telecom Office** — TRAI complaints, DND, number portability, plans
- 🏪 **Surat Town Hall** — local civic processes (water, electricity, property tax)
- 🏛️ **More Gov Offices** — RTI, Voter ID, driving license, GST, caste/income/domicile certificates
- ⚖️ **Legal Aid** — basic legal terms, FIR filing, consumer court (with strong disclaimers)
- 💼 **Career Office** — resume help, interview prep, govt exam guidance
- 🚆 **Travel Desk** — IRCTC quirks, visa basics, airport processes
- 🎓 **University Help Desk** — UGC scholarships, NIRF rankings, course choices

## Future interfaces

- WhatsApp bot (Twilio or Meta Cloud API)
- Voice / IVR for elderly and low-literacy users
- Mobile app (React Native or Flutter)
- Telegram bot
- Browser extension (right-click any gov form → ask the assistant)
- Visual "town" map UI — the literal AI-Planet metaphor as a clickable interface

## Future languages

- Hindi (highest priority after English)
- Gujarati (Surti users)
- Marathi
- Tamil
- Bengali
- Telugu
- Kannada
- Punjabi

## Future platform features

- **Document upload + OCR validation** — paste your existing form, get errors flagged
- **Pre-filled form generation** — output a printable PDF
- **Enrolment / appointment booking** integration where APIs exist
- **User accounts + saved checklists** (only when we have multiple buildings worth saving across)
- **Reminders** — document expiry, application status check
- **Community-contributed agent packs** — third-party buildings
- **Eval leaderboard** — quality scores for each building, transparency on accuracy
- **Offline PWA support** — patchy connectivity is real
- **Agent-pack registry** — discover/install community buildings (npm-style)

## Architectural ideas

- Switch vector store (Qdrant / Weaviate / Pinecone) when scale demands it
- Move to a real agent framework (LangGraph) if multi-step reasoning becomes complex
- Add a moderation / safety layer
- Caching layer for repeated questions
- Multi-tenancy if hosted offering ever happens
- Citation verifier — separate model that checks if cited chunks support the claim
- Auto-update pipeline — re-scrape source docs on a schedule, diff against previous embeddings, flag changes

## Wild ideas (probably never, but worth capturing)

- Voice agent that calls government helplines on your behalf
- Video tutorials auto-generated from the agent's answer
- A "Surat-only" fork that pre-loads every local civic process
- Federated agent packs — community-run agents we can query without hosting them ourselves

---

*Add anything here that comes to mind. Promote to the master roadmap or a building's roadmap only when finishing a current phase.*
