"use client";

import { useEffect, useState } from "react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { CategoryDetails, fetchCategoryById } from "@/services/categories-service";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { 
  X, 
  MapPin, 
  Clock, 
  Tag, 
  Layers, 
  Image as ImageIcon,
  CheckCircle2,
  XCircle
} from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface CategoryViewSheetProps {
  open: boolean;
  onClose: () => void;
  categoryId: string | null;
}

export function CategoryViewSheet({ open, onClose, categoryId }: CategoryViewSheetProps) {
  const [data, setData] = useState<CategoryDetails | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadData() {
      if (open && categoryId) {
        setLoading(true);
        try {
          const res = await fetchCategoryById(categoryId);
          setData(res);
        } catch (err) {
          console.error("Failed to load category details", err);
        } finally {
          setLoading(false);
        }
      } else {
        setData(null);
      }
    }
    loadData();
  }, [open, categoryId]);

  const imageUrl = data?.asset?.url
    ? data.asset.url.startsWith("http")
      ? data.asset.url
      : `https://${data.asset.url}`
    : null;

  return (
    <Sheet open={open} onOpenChange={(o) => !o && onClose()} modal>
      <SheetContent side="right" className="p-0 !min-w-[90%] border-none shadow-2xl bg-surface-container-lowest overflow-y-auto custom-scrollbar">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary/20 border-t-primary" />
          </div>
        ) : !data ? (
          <div className="flex items-center justify-center h-full text-on-surface-variant font-medium">
            Category not found or failed to load.
          </div>
        ) : (
          <div className="flex flex-col h-full relative">
            {/* Header / Hero Image */}
            <div className="relative h-80 w-full bg-surface-container flex-shrink-0">
              {imageUrl ? (
                <>
                  <Image 
                    src={imageUrl} 
                    alt={data.name} 
                    fill 
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                </>
              ) : (
                <div className="h-full w-full flex items-center justify-center bg-surface-container-low">
                  <ImageIcon size={64} className="text-on-surface-variant/20" />
                </div>
              )}
              
              {/* <button 
                onClick={onClose}
                className="absolute top-6 right-6 h-10 w-10 flex items-center justify-center rounded-full bg-black/20 text-white backdrop-blur-md hover:bg-black/40 transition-colors"
              >
                <X size={20} strokeWidth={2.5} />
              </button> */}

              <div className="absolute bottom-8 left-8 right-8">
                <div className="flex items-center gap-3 mb-3">
                  <Badge 
                    className={cn(
                      "px-3 py-1 text-xs font-bold uppercase tracking-widest border-none",
                      data.isActive 
                        ? "bg-primary/90 text-on-primary backdrop-blur-sm" 
                        : "bg-error/90 text-on-error backdrop-blur-sm"
                    )}
                  >
                    {data.isActive ? "Active" : "Inactive"}
                  </Badge>
                  {data.parent && (
                    <Badge variant="outline" className="px-3 py-1 text-xs font-bold uppercase tracking-widest text-white border-white/30 backdrop-blur-sm bg-black/20">
                      Parent: {data.parent.name}
                    </Badge>
                  )}
                </div>
                <h1 className="text-5xl font-black tracking-tight text-white drop-shadow-md">
                  {data.name}
                </h1>
                <p className="text-white/80 font-mono text-sm mt-3 flex items-center gap-2">
                  <Tag size={14} /> /{data.slug}
                </p>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-10 flex-1 flex flex-col gap-10">
              {/* Description */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-on-surface-variant mb-4 flex items-center gap-2">
                  <Layers size={14} /> Description
                </h3>
                <p className="text-base text-on-surface leading-relaxed max-w-3xl">
                  {data.description || <span className="italic opacity-50">No description provided for this category.</span>}
                </p>
              </div>

              {/* Children Grid */}
              {data.children && data.children.length > 0 && (
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-on-surface-variant mb-4">
                    Sub-Categories ({data.children.length})
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {data.children.map((child) => (
                      <div key={child.id} className="p-5 rounded-2xl bg-surface-container-low/50 ring-1 ring-outline-variant/10 hover:bg-surface-container-low transition-colors">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-bold text-on-surface">{child.name}</h4>
                          <Badge 
                            variant={!child.isActive ? "secondary" : "default"}
                            className={cn(
                              "text-[10px] font-bold uppercase tracking-tight py-0.5 px-3 rounded-full border-none shadow-none ml-2",
                              !child.isActive ? "bg-error/10 text-error hover:bg-error/20" : "bg-primary/10 text-primary hover:bg-primary/20"
                            )}
                          >
                            {child.isActive ? "Active" : "Inactive"}
                          </Badge>
                        </div>
                        <p className="text-xs text-on-surface-variant/70 font-mono">/{child.slug}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Meta info */}
              <div className="mt-auto pt-8 border-t border-outline-variant/10">
                <div className="flex items-center gap-8 text-xs font-medium text-on-surface-variant">
                  <div className="flex items-center gap-2">
                    <Clock size={14} className="opacity-60" />
                    Created: {format(new Date(data.createdAt), "MMM d, yyyy")}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={14} className="opacity-60" />
                    Updated: {format(new Date(data.updatedAt), "MMM d, yyyy")}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
