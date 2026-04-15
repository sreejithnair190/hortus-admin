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
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  return (
    <div className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-[0_4px_20px_-4px_rgba(12,32,13,0.04)] border border-outline-variant/10">
      <Table>
        <TableHeader className="bg-surface-container-low border-none">
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
              const product = row.original as any;
              const isDeleted = product.status === "Soft Deleted";
              return (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className={cn(
                    "hover:bg-surface-container-high/40 transition-colors border-none",
                    isDeleted && "opacity-60 grayscale"
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

      {/* Pagination Footer */}
      <div className="py-4 px-6 bg-surface-container-low flex items-center justify-between border-t border-outline-variant/10">
        <span className="text-xs font-medium text-on-surface-variant/70">
          Showing 1 - {table.getRowModel().rows.length} of {data.length} products
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

          {/* Dummy pagination numbers for UI fidelity */}
          <Button className="h-8 w-8 rounded-lg bg-primary text-on-primary text-xs font-bold shadow-sm">
            1
          </Button>
          <Button variant="ghost" className="h-8 w-8 rounded-lg hover:bg-surface-container-high text-on-surface-variant text-xs font-semibold">
            2
          </Button>
          <Button variant="ghost" className="h-8 w-8 rounded-lg hover:bg-surface-container-high text-on-surface-variant text-xs font-semibold">
            3
          </Button>
          <span className="px-1 text-on-surface-variant opacity-40">...</span>
          <Button variant="ghost" className="h-8 w-8 rounded-lg hover:bg-surface-container-high text-on-surface-variant text-xs font-semibold">
            12
          </Button>

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
