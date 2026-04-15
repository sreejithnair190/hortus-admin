"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Product } from "@/services/products-service";
import { Badge } from "@/components/ui/badge";
import { 
  Eye, 
  Pencil, 
  Trash2, 
  RotateCcw, 
  Trash,
  Star,
  StarHalf
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const RatingStars = ({ rating }: { rating: number }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  return (
    <div className="flex items-center justify-center gap-0.5 text-primary-container">
      {Array.from({ length: 5 }).map((_, i) => {
        if (i < fullStars) {
          return <Star key={i} size={14} fill="currentColor" />;
        }
        if (i === fullStars && hasHalfStar) {
          return <StarHalf key={i} size={14} fill="currentColor" />;
        }
        return <Star key={i} size={14} className="opacity-20" />;
      })}
    </div>
  );
};

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <div className="text-[10px] font-bold uppercase tracking-widest px-4">Product</div>
    ),
    cell: ({ row }) => {
      const product = row.original;
      return (
        <div className="flex items-center gap-3 px-4">
          <div className="h-10 w-10 rounded-md overflow-hidden bg-surface-container-low flex-shrink-0 shadow-sm border border-outline-variant/5">
            <img src={product.imageUrl} alt={product.name} className="h-full w-full object-cover" />
          </div>
          <span className="text-sm font-semibold text-on-surface tracking-tight">{product.name}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "category",
    header: () => <div className="text-[10px] font-bold uppercase tracking-widest px-4">Category</div>,
    cell: ({ row }) => <div className="text-sm text-on-surface-variant px-4">{row.getValue("category")}</div>,
  },
  {
    accessorKey: "price",
    header: () => <div className="text-[10px] font-bold uppercase tracking-widest px-4">Price</div>,
    cell: ({ row }) => <div className="text-sm font-medium px-4">{row.getValue("price")}</div>,
  },
  {
    accessorKey: "stock",
    header: () => <div className="text-[10px] font-bold uppercase tracking-widest px-4">Stock</div>,
    cell: ({ row }) => {
      const stock = row.getValue("stock") as number;
      return (
        <div className={cn(
          "text-xs font-medium px-4",
          stock <= 5 ? "text-error font-bold" : "text-on-surface-variant"
        )}>
          {stock} units
        </div>
      );
    },
  },
  {
    accessorKey: "rating",
    header: () => <div className="text-[10px] font-bold uppercase tracking-widest text-center px-4">Rating</div>,
    cell: ({ row }) => (
      <div className="px-4 flex justify-center">
        <RatingStars rating={row.getValue("rating")} />
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: () => <div className="text-[10px] font-bold uppercase tracking-widest px-4">Status</div>,
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      const isDeleted = status === "Soft Deleted";
      return (
        <div className="px-4">
          <Badge 
            variant={isDeleted ? "secondary" : "default"}
            className={cn(
              "text-[10px] font-bold uppercase tracking-tight py-0.5 px-3 rounded-full border-none shadow-none",
              isDeleted ? "bg-error/10 text-error" : "bg-primary/10 text-primary"
            )}
          >
            {status}
          </Badge>
        </div>
      );
    },
  },
  {
    id: "actions",
    header: () => <div className="text-[10px] font-bold uppercase tracking-widest text-right px-4">Actions</div>,
    cell: ({ row }) => {
      const isDeleted = row.original.status === "Soft Deleted";
      return (
        <div className="flex items-center justify-end gap-1 px-4">
          {isDeleted ? (
            <>
              <Button variant="ghost" size="icon-sm" className="hover:bg-primary/10 text-primary rounded-lg transition-colors">
                <RotateCcw size={18} strokeWidth={1.5} />
              </Button>
              <Button variant="ghost" size="icon-sm" className="hover:bg-error/10 text-error rounded-lg transition-colors">
                <Trash size={18} strokeWidth={1.5} />
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" size="icon-sm" className="hover:bg-primary/10 text-primary rounded-lg transition-colors">
                <Eye size={18} strokeWidth={1.5} />
              </Button>
              <Button variant="ghost" size="icon-sm" className="hover:bg-primary/10 text-primary rounded-lg transition-colors">
                <Pencil size={18} strokeWidth={1.5} />
              </Button>
              <Button variant="ghost" size="icon-sm" className="hover:bg-error/10 text-error rounded-lg transition-colors">
                <Trash2 size={18} strokeWidth={1.5} />
              </Button>
            </>
          )}
        </div>
      );
    },
  },
];
