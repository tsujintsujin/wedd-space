export default function ColorMotifSwatches({ colors }: { colors: string[] }) {
  return (
    <div className="flex items-center gap-2" role="list" aria-label="Wedding color motif">
      {colors.map((c, i) => (
        <span
          key={i}
          role="listitem"
          title={c}
          className="h-6 w-6 rounded-full border border-ink/15 shadow-sm"
          style={{ backgroundColor: c }}
        />
      ))}
    </div>
  );
}
