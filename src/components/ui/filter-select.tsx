"use client";

import * as React from "react";
import { ImageIcon, Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";

export interface FilterOption {
  label: string;
  value: string;
  image?: string | null;
}

interface FilterSelectProps {
  label: string;
  options: FilterOption[];
  value?: string;
  onChange?: (value: string) => void;
  isImage?: boolean;
  showSearch?: boolean;
}

export function FilterSelect({
  label,
  options,
  value,
  onChange,
  isImage = false,
  showSearch = options.length > 5,
}: FilterSelectProps) {
  const [searchTerm, setSearchTerm] = React.useState("");

  const selectedOption = options.find((opt) => opt.value === value);

  const getImageUrl = (url?: string | null) =>
    url ? (url.startsWith("http") ? url : `https://${url}`) : null;

  const handleValueChange = (val: string | null) => {
    if (onChange) {
      onChange(val === "ALL" || !val ? "" : val);
    }
  };

  const filteredOptions = options.filter((opt) =>
    opt.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const displayValue = value === "" || value === undefined ? "ALL" : value;

  return (
    <Select value={displayValue} onValueChange={handleValueChange}>
      <SelectTrigger className="bg-white/50 border border-outline-variant/10 backdrop-blur-sm rounded-xl text-xs font-bold text-on-surface-variant flex items-center gap-3 px-5 py-2.5 hover:bg-white hover:shadow-sm transition-all focus:ring-2 focus:ring-primary/10 outline-none w-auto h-11 shadow-none">
        <SelectValue>
          <div className="flex items-center gap-2">
            <span className="opacity-60">{label}:</span>
            {!selectedOption ? (
              <span className="text-on-surface">All</span>
            ) : (
              <div className="flex items-center gap-2">
                {isImage && (
                  getImageUrl(selectedOption.image) ? (
                    <Image
                       src={getImageUrl(selectedOption.image)!}
                       alt={selectedOption.label}
                       width={20}
                       height={20}
                       className="w-5 h-5 rounded-full object-cover border border-outline-variant/20"
                    />
                  ) : (
                    <div className="w-5 h-5 rounded-full bg-surface-container-low flex items-center justify-center border border-outline-variant/20">
                      <ImageIcon size={10} className="text-on-surface-variant/40" />
                    </div>
                  )
                )}
                <span className="text-on-surface">{selectedOption.label}</span>
              </div>
            )}
          </div>
        </SelectValue>
      </SelectTrigger>
      <SelectContent 
        alignItemWithTrigger={false} 
        className="rounded-2xl border-none shadow-xl bg-surface-container-lowest max-h-[400px] min-w-[260px]"
      >
        {showSearch && (
          <div className="px-2 py-2 sticky top-0 bg-surface-container-lowest z-10 border-b border-outline-variant/10 mb-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant/40" />
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => e.stopPropagation()}
                onClick={(e) => e.stopPropagation()}
                className="w-full bg-surface-container-low border-none rounded-xl py-2 pl-9 pr-4 text-sm text-on-surface focus:ring-2 focus:ring-primary/20 outline-none placeholder:text-on-surface-variant/40"
              />
            </div>
          </div>
        )}
        {("all".includes(searchTerm.toLowerCase()) || searchTerm === "") && (
          <SelectItem
            value="ALL"
            className="rounded-xl my-1 cursor-pointer font-bold text-on-surface-variant focus:bg-surface-container focus:text-on-surface"
          >
            <div className="flex items-center gap-3 py-1">
               {isImage && (
                  <div className="w-8 h-8 rounded-full bg-surface-container-low flex items-center justify-center border border-outline-variant/20">
                    <ImageIcon size={16} className="text-on-surface-variant/40" />
                  </div>
               )}
               <span>All</span>
            </div>
          </SelectItem>
        )}
        {filteredOptions.map((opt) => {
          const imageUrl = getImageUrl(opt.image);

          return (
            <SelectItem
              key={opt.value}
              value={opt.value}
              className="rounded-xl my-1 cursor-pointer font-bold text-on-surface-variant focus:bg-surface-container focus:text-on-surface"
            >
              <div className="flex items-center gap-3 py-1">
                {isImage && (
                  imageUrl ? (
                    <Image
                      src={imageUrl}
                      alt={opt.label}
                      width={32}
                      height={32}
                      className="w-8 h-8 rounded-full object-cover border border-outline-variant/20 shadow-sm bg-surface-container-lowest"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-surface-container-low flex items-center justify-center border border-outline-variant/20">
                      <ImageIcon
                        size={16}
                        className="text-on-surface-variant/40"
                      />
                    </div>
                  )
                )}
                <span>{opt.label}</span>
              </div>
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}
