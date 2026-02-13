import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { TimePeriod } from "@/types/time";

interface TimePeriodSelectorProps {
  selected: TimePeriod;
  onChange: (period: TimePeriod) => void;
  className?: string;
}

const periods: { value: TimePeriod; label: string; timeRange: string }[] = [
  { value: "morning", label: "Morning", timeRange: "6am - 11am" },
  { value: "afternoon", label: "Afternoon", timeRange: "12pm - 5pm" },
  { value: "evening", label: "Evening", timeRange: "6pm - 10pm" },
];

export function TimePeriodSelector({
  selected,
  onChange,
  className = 'border-0 shadow-none',
}: TimePeriodSelectorProps) {
  const selectedPeriod = periods.find((p) => p.value === selected);

  return (
    <Select value={selected} onValueChange={(value) => onChange(value as TimePeriod)}>
      <SelectTrigger className={className}>
        <SelectValue>
          <span className="font-medium">{selectedPeriod?.label}</span>
          <span className="text-xs text-muted-foreground ml-2">{selectedPeriod?.timeRange}</span>
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {periods.map(({ value, label, timeRange }) => (
          <SelectItem key={value} value={value}>
            <span className="font-medium">{label}</span>
            <span className="text-xs text-muted-foreground ml-2">{timeRange}</span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
