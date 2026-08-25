import type { RsvpEntry } from "../_lib/types";

export default function RsvpList({ rsvps }: { rsvps: RsvpEntry[] }) {
  const attendingCount = rsvps.filter((r) => r.attending).length;
  const pct = rsvps.length ? Math.round((attendingCount / rsvps.length) * 100) : 0;

  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-faint">
          {attendingCount} of {rsvps.length} guests confirmed
        </p>
        <p className="font-mono text-[11px] text-faint">{pct}%</p>
      </div>
      <div className="mt-3 h-1.5 w-full bg-ink/10">
        <div className="h-1.5 bg-wine transition-all duration-700" style={{ width: `${pct}%` }} />
      </div>

      <ul className="mt-8 divide-y divide-dashed divide-ink/15">
        {rsvps.map((r) => (
          <li key={r.name} className="py-4 first:pt-0 last:pb-0">
            <div className="flex items-center justify-between gap-4">
              <span className="font-display text-lg italic text-ink">{r.name}</span>
              <span
                className={`shrink-0 font-mono text-[10px] uppercase tracking-[0.18em] ${
                  r.attending ? "text-wine" : "text-faint"
                }`}
              >
                {r.attending ? "Attending" : "Can't make it"}
              </span>
            </div>
            {r.message && (
              <p className="mt-1.5 font-body text-sm italic leading-relaxed text-muted">
                &ldquo;{r.message}&rdquo;
              </p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
