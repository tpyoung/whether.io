import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { DayOfWeek } from "@features/planning/types";

interface DaySelectorProps {
  selected: DayOfWeek;
  onChange: (day: DayOfWeek) => void;
  className?: string;
}

const days: { value: DayOfWeek; label: string }[] = [
  { value: "sunday", label: "Sunday" },
  { value: "monday", label: "Monday" },
  { value: "tuesday", label: "Tuesday" },
  { value: "wednesday", label: "Wednesday" },
  { value: "thursday", label: "Thursday" },
  { value: "friday", label: "Friday" },
  { value: "saturday", label: "Saturday" },
];

export function DaySelector({
  selected,
  onChange,
  className = 'border-0 shadow-none',
}: DaySelectorProps) {
  const selectedDay = days.find((d) => d.value === selected);

  return (
    <Select value={selected} onValueChange={(value) => onChange(value as DayOfWeek)}>
      <SelectTrigger className={className}>
        <SelectValue>
          <span className="font-medium">{selectedDay?.label}</span>
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {days.map(({ value, label }) => (
          <SelectItem key={value} value={value}>
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
