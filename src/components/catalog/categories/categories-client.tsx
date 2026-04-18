"use client";

import { useEffect, useState, useCallback } from "react";
import { Category, PagedResponse, fetchCategories } from "@/services/categories-service";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { CategorySheet } from "./category-sheet";
import {
  Plus,
  ChevronDown
} from "lucide-react";
import { Button } from "@/components/ui/button";

export function CategoriesClient({
  initialData,
}: {
  initialData: PagedResponse<Category>;
}) {
  const [data, setData] = useState<PagedResponse<Category>>(initialData);
  const [loading, setLoading] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);

  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetchCategories({
        page: pagination.pageIndex,
        perPage: pagination.pageSize,
      });
      setData(res);
    } catch (err) {
      console.error("Failed to load categories", err);
    } finally {
      setLoading(false);
    }
  }, [pagination.pageIndex, pagination.pageSize]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleCreateSuccess = () => {
    // Reset to first page and refetch
    setPagination((prev) => ({ ...prev, pageIndex: 0 }));
    loadData();
  };

  return (
    <div className="flex flex-col gap-8 p-8 max-w-[1600px] mx-auto h-full overflow-hidden w-full">
      {/* Categories Actions Strip */}
      <section className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex gap-3">
          <FilterSelect label="Status" options={["Active", "Inactive"]} />
          <FilterSelect label="Parent" options={["Root", "Sub-category"]} />
        </div>
        <Button 
          onClick={() => setSheetOpen(true)}
          className="bg-gradient-to-br from-primary to-primary-container text-on-primary h-11 px-6 rounded-xl flex items-center gap-2 text-sm font-bold shadow-[0_8px_24px_-4px_rgba(12,32,13,0.15)] hover:scale-[1.02] active:scale-95 transition-all"
        >
          <Plus size={18} strokeWidth={2.5} />
          Add Category
        </Button>
      </section>

      {/* Categories Table Area */}
      <section className="flex-1 overflow-hidden min-h-0">
        <DataTable 
          columns={columns} 
          data={data.items} 
          pageCount={data.totalPages}
          pagination={pagination}
          setPagination={setPagination}
          totalElements={data.totalElements}
        />
      </section>

      {/* Create Category Sheet */}
      <CategorySheet
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
        onSuccess={handleCreateSuccess}
      />
    </div>
  );
}

function FilterSelect({ label, options }: { label: string; options: string[] }) {
  return (
    <div className="relative group">
      <button className="bg-white/50 border border-outline-variant/10 backdrop-blur-sm rounded-xl text-xs font-bold text-on-surface-variant flex items-center gap-3 px-5 py-2.5 hover:bg-white hover:shadow-sm transition-all focus:ring-2 focus:ring-primary/10 outline-none">
        <span className="opacity-60">{label}</span>
        <ChevronDown size={14} className="opacity-40 group-hover:opacity-100 transition-opacity" />
      </button>
    </div>
  );
}
