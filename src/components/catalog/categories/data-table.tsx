"use client";

import * as React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pageCount?: number;
  pagination?: { pageIndex: number; pageSize: number };
  setPagination?: React.Dispatch<React.SetStateAction<{ pageIndex: number; pageSize: number }>>;
  totalElements?: number;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  pageCount,
  pagination,
  setPagination,
  totalElements,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    pageCount: pageCount,
    state: pagination ? { pagination } : undefined,
    onPaginationChange: setPagination,
    manualPagination: true,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="bg-surface-container-lowest rounded-xl shadow-[0_4px_20px_-4px_rgba(12,32,13,0.04)] border border-outline-variant/10 flex flex-col h-full overflow-hidden">
      <div className="flex-1 overflow-y-auto overflow-x-hidden">
        <Table>
          <TableHeader className="bg-surface-container-low border-none sticky top-0 z-10 shadow-sm">
            {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="hover:bg-transparent border-none">
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id} className="h-14 font-bold text-on-surface-variant">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => {
              const category = row.original as any;
              const isInactive = !category.isActive;
              return (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className={cn(
                    "hover:bg-surface-container-high/40 transition-colors border-none",
                    isInactive && "opacity-60 grayscale"
                  )}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="py-2">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="h-24 text-center text-on-surface-variant/60 font-medium"
              >
                No results found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      </div>

      {/* Pagination Footer */}
      <div className="py-4 px-6 bg-surface-container-low flex items-center justify-between border-t border-outline-variant/10">
        <span className="text-xs font-medium text-on-surface-variant/70">
          Showing {data.length === 0 ? 0 : table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1} - {Math.min((table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize, totalElements || data.length)} of {totalElements || data.length} categories
        </span>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="hover:bg-surface-container-high text-on-surface-variant"
          >
            <ChevronLeft size={20} strokeWidth={1.5} />
          </Button>

          {Array.from({ length: pageCount || 1 }, (_, i) => (
            <Button
              key={i}
              variant={table.getState().pagination.pageIndex === i ? "default" : "ghost"}
              onClick={() => table.setPageIndex(i)}
              className={cn(
                "h-8 w-8 rounded-lg text-xs font-bold shadow-sm transition-all",
                table.getState().pagination.pageIndex === i
                  ? "bg-primary text-on-primary hover:bg-primary"
                  : "bg-transparent text-on-surface-variant hover:bg-surface-container-high"
              )}
            >
              {i + 1}
            </Button>
          ))}

          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="hover:bg-surface-container-high text-on-surface-variant"
          >
            <ChevronRight size={20} strokeWidth={1.5} />
          </Button>
        </div>
      </div>
    </div>
  );
}
