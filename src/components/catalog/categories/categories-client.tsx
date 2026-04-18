"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import {
  Category,
  PagedResponse,
  fetchCategories,
  fetchAllCategories,
  DropdownCategory,
  deleteCategory,
} from "@/services/categories-service";
import { DataTable } from "./data-table";
import { getColumns } from "./columns";
import { CategorySheet } from "./category-sheet";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FilterSelect } from "@/components/ui/filter-select";
import { SearchInput } from "@/components/ui/search-input";
import { CategoryViewSheet } from "./category-view-sheet";
import { toast } from "sonner";

export function CategoriesClient({
  initialData,
}: {
  initialData: PagedResponse<Category>;
}) {
  const [data, setData] = useState<PagedResponse<Category>>(initialData);
  const [loading, setLoading] = useState(false);
  const [sheetMode, setSheetMode] = useState<"add" | "edit" | "view" | null>(null);
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);

  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });

  const [parentCategories, setParentCategories] = useState<DropdownCategory[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [parentFilter, setParentFilter] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    async function loadParents() {
      try {
        const cats = await fetchAllCategories();
        setParentCategories(cats);
      } catch (err) {
        console.error("Failed to load parent categories", err);
      }
    }
    loadParents();
  }, []);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetchCategories({
        page: pagination.pageIndex,
        perPage: pagination.pageSize,
        isActive: statusFilter === "true" ? 1 : statusFilter === "false" ? 0 : undefined,
        parentId: parentFilter || undefined,
        search: searchQuery || undefined,
      });
      setData(res);
    } catch (err) {
      console.error("Failed to load categories", err);
    } finally {
      setLoading(false);
    }
  }, [pagination.pageIndex, pagination.pageSize, statusFilter, parentFilter, searchQuery]);

  const tableColumns = useMemo(() => getColumns({
    onView: (id) => { 
      setActiveCategoryId(id); 
      setSheetMode("view"); 
    },
    onEdit: (id) => { 
      setActiveCategoryId(id); 
      setSheetMode("edit"); 
    },
    onDelete: async (id) => {
      if (window.confirm("Are you sure you want to delete this category?")) {
        try {
          await deleteCategory(id);
          toast.success("Category deleted successfully.");
          loadData();
        } catch (err) {
          console.error("Delete failed", err);
        }
      }
    }
  }), [loadData]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <>
      <section className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex gap-3">
          <FilterSelect
            label="Status"
            options={[
              { label: "Active", value: "true" },
              { label: "Inactive", value: "false" }
            ]}
            value={statusFilter}
            onChange={(val) => {
              setStatusFilter(val);
              setPagination((prev) => ({ ...prev, pageIndex: 0 }));
            }}
          />
          <FilterSelect
            label="Parent"
            options={parentCategories.map((cat) => ({
              label: cat.name,
              value: cat.id,
              image: cat.asset?.url,
            }))}
            value={parentFilter}
            onChange={(val) => {
              setParentFilter(val);
              setPagination((prev) => ({ ...prev, pageIndex: 0 }));
            }}
            isImage={true}
          />
        </div>
        <div className="flex items-center gap-3">
          <SearchInput
            placeholder="Search categories..."
            value={searchQuery}
            onChange={(val) => {
              setSearchQuery(val);
              setPagination((prev) => ({ ...prev, pageIndex: 0 }));
            }}
            className="w-64"
          />
          <Button 
            onClick={() => setSheetMode("add")}
            className="bg-gradient-to-br from-primary to-primary-container text-on-primary h-11 px-6 rounded-xl flex items-center gap-2 text-sm font-bold shadow-[0_8px_24px_-4px_rgba(12,32,13,0.15)] hover:scale-[1.02] active:scale-95 transition-all"
          >
            <Plus size={18} strokeWidth={2.5} />
            Add Category
          </Button>
        </div>
      </section>
      <section className="flex-1 overflow-hidden min-h-0">
        <DataTable 
          columns={tableColumns} 
          data={data.items} 
          pageCount={data.totalPages}
          pagination={pagination}
          setPagination={setPagination}
          totalElements={data.totalElements}
        />
      </section>
      <CategorySheet
        open={sheetMode === "add" || sheetMode === "edit"}
        onClose={() => { setSheetMode(null); setActiveCategoryId(null); }}
        onSuccess={loadData}
        mode={sheetMode === "edit" ? "edit" : "add"}
        categoryId={activeCategoryId}
      />
      <CategoryViewSheet
        open={sheetMode === "view"}
        onClose={() => { setSheetMode(null); setActiveCategoryId(null); }}
        categoryId={activeCategoryId}
      />
    </>
  );
}
