"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Category } from "@/services/categories-service";
import { Badge } from "@/components/ui/badge";
import { 
  Eye, 
  Pencil, 
  Trash2,
  Image as ImageIcon,
  MoreHorizontal
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

export interface CategoryActions {
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const ActionCell = ({ category, actions }: { category: Category; actions: CategoryActions }) => {
  return (
    <div className="flex items-center justify-end px-4">
      <DropdownMenu>
        <DropdownMenuTrigger className="h-8 w-8 flex items-center justify-center hover:bg-surface-container-high data-[state=open]:bg-surface-container-high rounded-lg transition-colors text-on-surface-variant cursor-pointer outline-none">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal size={18} strokeWidth={2} />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[170px] rounded-2xl shadow-xl border-none ring-1 ring-outline-variant/10 bg-surface-container-lowest p-2">
          <DropdownMenuItem onClick={() => actions.onView(category.id)} className="cursor-pointer gap-2.5 py-2.5 px-3 focus:bg-primary/5 focus:text-primary rounded-xl text-sm text-on-surface font-bold transition-colors">
            <Eye size={16} strokeWidth={2.5} className="text-primary/60" />
            <span>View Details</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => actions.onEdit(category.id)} className="cursor-pointer gap-2.5 py-2.5 px-3 focus:bg-primary/5 focus:text-primary rounded-xl text-sm text-on-surface font-bold transition-colors">
            <Pencil size={16} strokeWidth={2.5} className="text-primary/60" />
            <span>Edit Category</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator className="bg-outline-variant/10 my-1 mx-2" />
          <DropdownMenuItem onClick={() => actions.onDelete(category.id)} className="cursor-pointer gap-2.5 py-2.5 px-3 focus:bg-error/10 text-error focus:text-error rounded-xl text-sm font-bold transition-colors">
            <Trash2 size={16} strokeWidth={2.5} className="text-error/60" />
            <span>Delete</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export const getColumns = (actions: CategoryActions): ColumnDef<Category>[] => [

  {
    accessorKey: "name",
    header: ({ column }) => (
      <div className="text-[10px] font-bold uppercase tracking-widest px-4">
        Category
      </div>
    ),
    cell: ({ row }) => {
      const category = row.original;

      const imageUrl = category.asset?.url
        ? category.asset.url.startsWith("http")
          ? category.asset.url
          : `https://${category.asset.url}`
        : null;

      return (
        <div className="flex items-center gap-3 px-4">
          <div className="h-10 w-10 rounded-md overflow-hidden bg-surface-container-low flex-shrink-0 shadow-sm border border-outline-variant/5 flex items-center justify-center">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={category.name}
                width={40}
                height={40}
                className="h-full w-full object-cover"
              />
            ) : (
              <ImageIcon
                className="text-on-surface-variant/40"
                size={20}
              />
            )}
          </div>

          <span className="text-sm font-semibold text-on-surface tracking-tight">
            {category.name}
          </span>
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
    cell: ({ row }) => <ActionCell category={row.original} actions={actions} />,
  },
];
