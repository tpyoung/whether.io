interface LegendItem {
  color: string;
  label: string;
}

const items: LegendItem[] = [
  { color: "bg-rose-400", label: "Temperature" },
  { color: "bg-emerald-400", label: "Wind" },
  { color: "bg-sky-400", label: "Precipitation" },
];

interface ChartLegendProps {
  className?: string;
}

export function ChartLegend({ className }: ChartLegendProps) {
  return (
    <div className={`flex lg:hidden justify-center gap-6 text-sm mt-4 ${className ?? ""}`}>
      {items.map(({ color, label }) => (
        <div key={label} className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${color}`} />
          <span className="text-muted-foreground">{label}</span>
        </div>
      ))}
    </div>
  );
}
