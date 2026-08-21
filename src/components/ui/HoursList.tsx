import type { OfficeHoursEntry } from "@/types/contact";

type HoursListProps = {
  entries?: readonly OfficeHoursEntry[];
  lines?: readonly string[];
  summary?: string;
  className?: string;
};

export function HoursList({
  entries,
  lines,
  summary,
  className = "mt-1 grid min-w-0 gap-2 text-sm leading-relaxed text-muted",
}: HoursListProps) {
  if (entries && entries.length > 0) {
    return (
      <dl className={className}>
        {entries.map((entry) => (
          <div key={entry.label} className="min-w-0">
            <dt className="font-medium text-foreground">{entry.label}</dt>
            <dd>{entry.value}</dd>
          </div>
        ))}
      </dl>
    );
  }

  if (lines && lines.length > 0) {
    return (
      <ul className={className}>
        {lines.map((line) => (
          <li key={line}>{line}</li>
        ))}
      </ul>
    );
  }

  if (summary) {
    return <p className={className}>{summary}</p>;
  }

  return null;
}
