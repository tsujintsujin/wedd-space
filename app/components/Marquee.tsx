const items = [
  "Your story",
  "RSVP tracking",
  "Schedule & venue",
  "Photo gallery",
  "Gift registry",
  "One link to share",
];

function MarqueeGroup({ hidden = false }: { hidden?: boolean }) {
  return (
    <span
      className="mr-10 flex shrink-0 items-center gap-10"
      aria-hidden={hidden || undefined}
    >
      {items.map((item) => (
        <span key={item} className="flex items-center gap-10">
          <span className="font-mono text-xs uppercase tracking-[0.32em] text-cream">
            {item}
          </span>
          <span className="text-cream/50">&#10022;</span>
        </span>
      ))}
    </span>
  );
}

export default function Marquee() {
  return (
    <div className="relative z-10 overflow-hidden py-[clamp(16px,2.5vw,48px)]">
      <div className="w-[130%] -translate-x-[15%] rotate-[-1.4deg] overflow-hidden border-y border-wine-deep/40 bg-wine py-3.5 shadow-[0_10px_30px_-10px_rgba(58,16,24,0.55)] md:py-4">
        <div className="marquee-track flex whitespace-nowrap">
          <MarqueeGroup />
          <MarqueeGroup hidden />
        </div>
      </div>
    </div>
  );
}
