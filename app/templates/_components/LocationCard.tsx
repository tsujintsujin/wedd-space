import type { MapLocation } from "../_lib/types";
import EditableText from "./EditableText";

export default function LocationCard({
  kicker,
  location,
  editable,
  onFieldChange,
}: {
  kicker: string;
  location: MapLocation;
  editable?: boolean;
  onFieldChange?: (field: "label" | "address", value: string) => void;
}) {
  const mapsHref = `https://www.google.com/maps?q=${location.lat},${location.lng}`;

  return (
    <div className="bg-surface p-8 shadow-[0_25px_50px_-30px_rgba(36,26,18,0.35)]">
      <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-wine">{kicker}</p>
      <div className="mt-4 border-t border-dashed border-ink/20" aria-hidden="true" />
      <EditableText
        as="h3"
        className="mt-4 font-display text-2xl italic text-ink"
        value={location.label}
        editable={editable}
        onCommit={(v) => onFieldChange?.("label", v)}
        placeholder="Venue name"
      />
      <EditableText
        as="p"
        className="mt-2 font-body text-sm leading-relaxed text-muted"
        value={location.address}
        editable={editable}
        onCommit={(v) => onFieldChange?.("address", v)}
        placeholder="Address"
      />
      <a
        href={mapsHref}
        target="_blank"
        rel="noopener noreferrer"
        className="focus-ring group mt-5 inline-flex cursor-pointer items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-wine transition-colors duration-200 hover:text-wine-deep"
      >
        Open in Google Maps
        <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">
          →
        </span>
      </a>
    </div>
  );
}
