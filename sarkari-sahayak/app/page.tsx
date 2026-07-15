import Link from "next/link";
import {
  ArrowUpRight,
  CheckSeal,
  CitationChip,
  GroundingBadge,
  SourceCard,
  UncertainCard,
  type Source,
} from "./_ui/citation";

// Screen 1 — Landing (§6). Thesis: an answer you can verify. The hero IS the wedge —
// a worked example of a cited answer with its source cards. Teal primary + ghost only;
// persistent "not UIDAI" disclaimer. Sample content below is illustrative (labelled).

const DEMO_SOURCES: Source[] = [
  {
    rank: 1,
    title: "UIDAI — Update Mobile Number in Aadhaar",
    host: "uidai.gov.in",
    url: "https://uidai.gov.in",
    snippet:
      "To update your mobile number, visit any Aadhaar Seva Kendra. No document is required for a mobile number update.",
    lastVerified: "2026-05-02",
  },
  {
    rank: 2,
    title: "UIDAI — Fee Schedule for Aadhaar Updates",
    host: "uidai.gov.in",
    url: "https://uidai.gov.in",
    snippet:
      "A fee of Rs. 50 (inclusive of GST) is applicable for a biometric or contact-detail update at the enrolment centre.",
    lastVerified: "2026-05-02",
  },
];

export default function LandingPage() {
  return (
    <div className="flex flex-1 flex-col">
      {/* top bar */}
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5">
        <span className="wordmark text-lg">
          Sarkari<span className="mark-dot">·</span>Sahayak
        </span>
        <nav className="flex items-center gap-1 text-sm">
          <Link
            href="/chat"
            className="inline-flex min-h-[44px] items-center rounded-md px-3 font-medium text-teal transition-colors hover:bg-teal-50"
          >
            Open the assistant
          </Link>
        </nav>
      </header>

      {/* hero */}
      <main className="mx-auto grid w-full max-w-6xl flex-1 items-center gap-12 px-6 py-10 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:py-16">
        {/* left — the pitch */}
        <section className="flex flex-col gap-6">
          <span className="inline-flex w-fit items-center gap-2 rounded-pill border border-teal-100 bg-teal-50 px-3 py-1 text-sm font-medium text-teal">
            <CheckSeal className="h-4 w-4" />
            Every claim links to an official source
          </span>

          <h1 className="font-display text-4xl leading-[1.08] text-ink-900 sm:text-5xl">
            Aadhaar answers you can{" "}
            <em className="not-italic text-teal">actually check.</em>
          </h1>

          <p className="max-w-xl text-lg text-ink-700">
            Ask what documents, fees, and steps a mobile, address, name, or photo
            update needs. Sarkari-Sahayak answers in plain language and links every
            claim to the official UIDAI source — and when it isn&apos;t sure, it
            says so instead of guessing.
          </p>

          <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center">
            <Link
              href="/chat"
              className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-md bg-teal px-6 font-medium text-surface-0 shadow-[var(--shadow-card)] transition-colors hover:bg-teal-700"
            >
              Start asking
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <a
              href="#how"
              className="inline-flex min-h-[48px] items-center justify-center rounded-md px-5 font-medium text-teal transition-colors hover:bg-teal-50"
            >
              How it works
            </a>
          </div>

          <p className="mt-2 max-w-md text-sm text-ink-500">
            Independent, open-source project.{" "}
            <span className="font-medium text-ink-900">
              Not an official UIDAI service.
            </span>{" "}
            Always verify against the linked source.
          </p>
        </section>

        {/* right — the signature: a worked, cited answer */}
        <section aria-label="Example of a cited answer" className="relative">
          <div className="pointer-events-none absolute -inset-3 -z-10 rounded-[20px] bg-teal-50/60 blur-xl" />
          <figure className="overflow-hidden rounded-lg border border-hairline bg-surface-0 shadow-[var(--shadow-lift)]">
            {/* question row */}
            <div className="flex items-center gap-2 border-b border-hairline bg-surface-50 px-5 py-3.5">
              <span className="text-xs font-medium uppercase tracking-wide text-ink-400">
                You asked
              </span>
            </div>
            <div className="px-5 pt-4">
              <p className="text-ink-900">
                Do I need any documents to update my Aadhaar mobile number, and
                what does it cost?
              </p>
            </div>

            {/* answer */}
            <div className="px-5 pb-5 pt-4">
              <div className="mb-3 flex items-center gap-2">
                <span className="agent-avatar h-7 w-7 text-[13px]">S</span>
                <GroundingBadge count={2} />
              </div>
              <p className="text-ink-900">
                No document is required to update your mobile number
                <CitationChip n={1} title={DEMO_SOURCES[0].title} />. You can do it
                at any Aadhaar Seva Kendra for a fee of ₹50
                <CitationChip n={2} title={DEMO_SOURCES[1].title} />.
              </p>

              <div className="mt-4 space-y-2.5">
                <p className="text-xs font-medium uppercase tracking-wide text-ink-400">
                  Sources
                </p>
                {DEMO_SOURCES.map((s) => (
                  <SourceCard key={s.rank} source={s} />
                ))}
              </div>
            </div>
          </figure>
          <figcaption className="mt-3 text-center text-xs text-ink-400">
            Illustrative example — live answers arrive with the grounded pipeline.
          </figcaption>
        </section>
      </main>

      {/* how it works */}
      <section
        id="how"
        className="border-t border-paper-edge bg-surface-0/50 py-14 scroll-mt-8"
      >
        <div className="mx-auto grid w-full max-w-6xl gap-8 px-6 md:grid-cols-3">
          <Step
            n="01"
            title="Ask in plain words"
            body="Type your question the way you'd ask a friend — no forms, no jargon. English for now; Hindi and Gujarati are next."
          />
          <Step
            n="02"
            title="Grounded in official docs"
            body="Answers are built only from archived UIDAI sources — never from the model's imagination or a stale web search."
          />
          <Step
            n="03"
            title="Verify, or hear 'not sure'"
            body="Every claim carries a source you can open. When the sources don't cover it, you get the official link, not a guess."
          />
        </div>

        {/* the honesty promise, shown as a real state */}
        <div className="mx-auto mt-10 w-full max-w-2xl px-6">
          <p className="mb-2.5 text-center text-sm font-medium text-ink-500">
            When it doesn&apos;t know, it says so:
          </p>
          <UncertainCard />
        </div>
      </section>

      {/* footer disclaimer */}
      <footer className="border-t border-paper-edge py-8">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-1 px-6 text-sm text-ink-500">
          <p>
            <span className="wordmark text-ink-900">
              Sarkari<span className="mark-dot">·</span>Sahayak
            </span>{" "}
            — an independent, open-source Aadhaar-update assistant.
          </p>
          <p>
            Not affiliated with UIDAI or the Government of India. Official source:{" "}
            <a
              className="font-medium text-teal underline-offset-2 hover:underline"
              href="https://uidai.gov.in"
              target="_blank"
              rel="noreferrer"
            >
              uidai.gov.in
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}

function Step({ n, title, body }: { n: string; title: string; body: string }) {
  return (
    <div className="flex flex-col gap-2">
      <span className="font-display text-sm font-semibold tabular-nums text-teal">
        {n}
      </span>
      <div className="h-px w-8 bg-teal-100" />
      <h3 className="text-lg text-ink-900">{title}</h3>
      <p className="text-ink-500">{body}</p>
    </div>
  );
}
