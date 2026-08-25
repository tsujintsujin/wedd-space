function parseDateString(value: string): { year: number; month: number; day: number } | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return null;
  return {
    year: Number(match[1]),
    month: Number(match[2]) - 1,
    day: Number(match[3]),
  };
}

export function getDaysUntil(weddingDate: string): number | null {
  const parsed = parseDateString(weddingDate);
  if (!parsed) return null;

  const target = new Date(parsed.year, parsed.month, parsed.day);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return Math.round((target.getTime() - today.getTime()) / 86_400_000);
}

export function formatCountdownLabel(diffDays: number): string {
  if (diffDays > 1) return `${diffDays} days to go`;
  if (diffDays === 1) return "1 day to go";
  if (diffDays === 0) return "Today's the day";
  return `Married ${Math.abs(diffDays)} day${Math.abs(diffDays) === 1 ? "" : "s"} ago`;
}

export default function Countdown({
  weddingDate,
  className,
}: {
  weddingDate: string;
  className?: string;
}) {
  const diffDays = getDaysUntil(weddingDate);
  if (diffDays === null) return null;

  return (
    <p className={className ?? "font-mono text-[11px] uppercase tracking-[0.22em]"}>
      {formatCountdownLabel(diffDays)}
    </p>
  );
}
