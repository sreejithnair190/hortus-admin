"use client";

import { useEffect, useState, useRef } from "react";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchInputProps {
  placeholder?: string;
  className?: string;
  value: string;
  onChange: (value: string) => void;
  debounceMs?: number;
}

export function SearchInput({
  placeholder = "Search...",
  className,
  value,
  onChange,
  debounceMs = 500,
}: SearchInputProps) {
  const [localValue, setLocalValue] = useState(value);
  const isInitialMount = useRef(true);

  // Sync value from parent (e.g., when resetting filters)
  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    const timer = setTimeout(() => {
      if (localValue !== value) {
        onChange(localValue);
      }
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [localValue, debounceMs, value, onChange]);

  const handleClear = () => {
    setLocalValue("");
    onChange("");
  };

  return (
    <div className={cn("relative group", className)}>
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant/40 group-focus-within:text-primary transition-colors pointer-events-none" />
      <input
        type="text"
        placeholder={placeholder}
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        className="w-full h-11 bg-white/50 border border-outline-variant/10 backdrop-blur-sm rounded-xl py-2 pl-10 pr-9 text-xs font-bold text-on-surface-variant hover:bg-white hover:shadow-sm focus:bg-white focus:shadow-sm focus:ring-2 focus:ring-primary/10 outline-none placeholder:text-on-surface-variant/40 placeholder:font-normal transition-all"
      />
      {localValue && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center text-on-surface-variant/40 hover:text-on-surface transition-colors rounded-full hover:bg-surface-container-low"
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
}
