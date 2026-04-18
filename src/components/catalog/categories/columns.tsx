"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Category } from "@/services/categories-service";
import { Badge } from "@/components/ui/badge";
import { 
  Eye, 
  Pencil, 
  Trash2,
  Image as ImageIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const ActionCell = ({ category }: { category: Category }) => {
  return (
    <div className="flex items-center justify-end gap-1 px-4">
      <Button 
        variant="ghost" 
        size="icon-sm" 
        className="hover:bg-primary/10 text-primary rounded-lg transition-colors"
      >
        <Eye size={18} strokeWidth={1.5} />
      </Button>
      <Button 
        variant="ghost" 
        size="icon-sm" 
        className="hover:bg-primary/10 text-primary rounded-lg transition-colors"
      >
        <Pencil size={18} strokeWidth={1.5} />
      </Button>
      <Button variant="ghost" size="icon-sm" className="hover:bg-error/10 text-error rounded-lg transition-colors">
        <Trash2 size={18} strokeWidth={1.5} />
      </Button>
    </div>
  );
};

export const columns: ColumnDef<Category>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <div className="text-[10px] font-bold uppercase tracking-widest px-4">Category</div>
    ),
    cell: ({ row }) => {
      const category = row.original;
      return (
        <div className="flex items-center gap-3 px-4">
          <div className="h-10 w-10 rounded-md overflow-hidden bg-surface-container-low flex-shrink-0 shadow-sm border border-outline-variant/5 flex items-center justify-center">
            {category.asset ? (
              <img src={`https://${category.asset.url}`} alt={category.name} className="h-full w-full object-cover" />
            ) : (
              <ImageIcon className="text-on-surface-variant/40" size={20} />
            )}
          </div>
          <span className="text-sm font-semibold text-on-surface tracking-tight">{category.name}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "description",
    header: () => <div className="text-[10px] font-bold uppercase tracking-widest px-4">Description</div>,
    cell: ({ row }) => (
      <div className="text-sm text-on-surface-variant px-4 max-w-xs truncate">
        {row.getValue("description") || "-"}
      </div>
    ),
  },
  {
    accessorKey: "slug",
    header: () => <div className="text-[10px] font-bold uppercase tracking-widest px-4">Slug</div>,
    cell: ({ row }) => (
      <div className="text-sm font-mono text-on-surface-variant px-4">/{row.getValue("slug")}</div>
    ),
  },
  {
    accessorKey: "parent",
    header: () => <div className="text-[10px] font-bold uppercase tracking-widest px-4">Parent</div>,
    cell: ({ row }) => {
      const parent = row.original.parent;
      return (
        <div className="text-sm font-medium px-4">
          {parent ? parent.name : <span className="text-on-surface-variant/40">Root</span>}
        </div>
      );
    },
  },
  {
    accessorKey: "isActive",
    header: () => <div className="text-[10px] font-bold uppercase tracking-widest px-4">Status</div>,
    cell: ({ row }) => {
      const isActive = row.getValue("isActive") as boolean;
      return (
        <div className="px-4">
          <Badge 
            variant={!isActive ? "secondary" : "default"}
            className={cn(
              "text-[10px] font-bold uppercase tracking-tight py-0.5 px-3 rounded-full border-none shadow-none",
              !isActive ? "bg-error/10 text-error" : "bg-primary/10 text-primary"
            )}
          >
            {isActive ? "Active" : "Inactive"}
          </Badge>
        </div>
      );
    },
  },
  {
    id: "actions",
    header: () => <div className="text-[10px] font-bold uppercase tracking-widest text-right px-4">Actions</div>,
    cell: ({ row }) => <ActionCell category={row.original} />,
  },
];
