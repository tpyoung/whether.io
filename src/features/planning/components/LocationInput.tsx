import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { MapPinIcon } from "lucide-react";

interface LocationInputProps {
  value: string;
  onChange: (location: string) => void;
  className?: string;
  placeholder?: string;
}

export function LocationInput({
  value,
  onChange,
  className,
  placeholder = "Enter location...",
}: LocationInputProps) {
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  // Debounce the onChange to avoid too many API calls
  useEffect(() => {
    const timer = setTimeout(() => {
      if (inputValue !== value && inputValue.trim()) {
        onChange(inputValue.trim());
      }
    }, 750);

    return () => clearTimeout(timer);
  }, [inputValue, value, onChange]);

  return (
    <div className={ `flex justify-between gap-x-2 items-center ${className ?? ""}`}>
      <MapPinIcon className="size-8 text-muted-foreground" />
      <Input
        id='locationInput'
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder={placeholder}
        className="border-b !text-xl font-bold pl-1 selection:bg-sky-500 selection:text-white"
      />
    </div>
  );
}
