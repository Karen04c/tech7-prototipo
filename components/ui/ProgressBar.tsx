interface ProgressBarProps {
  value: number;
  max: number;
  colorClassName?: string;
  heightClassName?: string;
}

export function ProgressBar({
  value,
  max,
  colorClassName = "bg-brand",
  heightClassName = "h-2.5",
}: ProgressBarProps) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  return (
    <div className={`w-full overflow-hidden rounded-full bg-field ${heightClassName}`}>
      <div
        className={`h-full rounded-full transition-all duration-500 ease-out ${colorClassName}`}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
