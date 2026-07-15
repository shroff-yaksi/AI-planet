// Shared, presentational citation UI — the product's wedge made visible.
// No hooks, so it works in both the server landing and the client chat.
// Violet is reserved system-wide for these (DL-2026-05-15-a): a numbered chip
// inline in an answer ties to a violet-railed source card, footnote-style.

export interface Source {
  rank: number;
  title: string;
  host: string; // e.g. "uidai.gov.in" — shown, never the raw long URL
  url: string;
  snippet: string;
  lastVerified: string; // ISO date; provenance affordance
}

/* ------------------------------ icons ------------------------------ */
export function ArrowUpRight({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 11L11 5M6 5h5v5" />
    </svg>
  );
}

export function CheckSeal({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden className={className} fill="none">
      <path
        d="M8 1.2l1.6 1.1 1.9-.2.8 1.8 1.7.9-.6 1.9.6 1.9-1.7.9-.8 1.8-1.9-.2L8 14.8l-1.6-1.1-1.9.2-.8-1.8-1.7-.9.6-1.9-.6-1.9 1.7-.9.8-1.8 1.9.2L8 1.2z"
        fill="currentColor"
        opacity="0.14"
      />
      <path
        d="M5.4 8.1l1.8 1.8 3.4-3.6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* --------------------------- citation chip -------------------------- */
// Inline footnote marker. Renders as a superscript-ish violet pill: ◈ N.
export function CitationChip({
  n,
  href,
  title,
}: {
  n: number;
  href?: string;
  title?: string;
}) {
  const inner = (
    <>
      <span aria-hidden className="text-[0.85em]">
        ◈
      </span>
      <span className="chip-num">{n}</span>
    </>
  );
  if (!href) {
    return (
      <span className="citation-chip" title={title}>
        {inner}
      </span>
    );
  }
  return (
    <a
      className="citation-chip"
      href={href}
      target="_blank"
      rel="noreferrer"
      title={title ? `Verify: ${title}` : "Verify against the official source"}
    >
      {inner}
    </a>
  );
}

/* ---------------------------- source card --------------------------- */
export function SourceCard({ source }: { source: Source }) {
  const verified = formatVerified(source.lastVerified);
  return (
    <a
      className="source-card group"
      href={source.url}
      target="_blank"
      rel="noreferrer"
    >
      <div className="flex items-start gap-3">
        <span className="source-rank" aria-hidden>
          {source.rank}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <p className="text-[0.95rem] font-medium leading-snug text-ink-900">
              {source.title}
            </p>
            <ArrowUpRight className="source-arrow mt-1 h-4 w-4 flex-none text-citation" />
          </div>
          <p className="mt-1 line-clamp-2 text-sm text-ink-500">
            &ldquo;{source.snippet}&rdquo;
          </p>
          <div className="mt-2.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-ink-400">
            <span className="font-medium text-citation-700">{source.host}</span>
            <span aria-hidden>·</span>
            <span className="inline-flex items-center gap-1">
              <CheckSeal className="h-3.5 w-3.5 text-citation" />
              Official source
            </span>
            {verified && (
              <>
                <span aria-hidden>·</span>
                <span>Checked {verified}</span>
              </>
            )}
          </div>
        </div>
      </div>
    </a>
  );
}

/* -------------------------- grounding badge ------------------------- */
export function GroundingBadge({ count }: { count: number }) {
  return (
    <span className="grounding-badge is-grounded">
      <CheckSeal className="h-3.5 w-3.5" />
      Grounded in {count} official {count === 1 ? "source" : "sources"}
    </span>
  );
}

/* ------------------------- uncertain state -------------------------- */
// The honesty flow (§5, Flow 2): a real screen, not a shrug.
export function UncertainCard({
  officialUrl = "https://uidai.gov.in",
}: {
  officialUrl?: string;
}) {
  return (
    <div className="rounded-md border border-[#f4e2c4] bg-warning-50 p-4">
      <span className="grounding-badge is-uncertain">Not certain</span>
      <p className="mt-2.5 text-ink-900">
        I couldn&apos;t find an official source that clearly answers this, so I
        won&apos;t guess. Check the official UIDAI page — and feel free to rephrase
        your question.
      </p>
      <a
        href={officialUrl}
        target="_blank"
        rel="noreferrer"
        className="mt-3 inline-flex min-h-[44px] items-center gap-2 rounded-md bg-teal px-4 font-medium text-surface-0 transition-colors hover:bg-teal-700"
      >
        Open the official UIDAI page
        <ArrowUpRight className="h-4 w-4" />
      </a>
    </div>
  );
}

/* ------------------------------ helpers ----------------------------- */
function formatVerified(iso: string): string | null {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
