"use client";

import { Product, ProductInsights } from "@/services/products-service";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import {
  Plus,
  Package,
  TrendingUp,
  TriangleAlert,
  ShoppingBag,
  ChevronDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchProducts, setSidebarMode } from "@/store/slices/products-slice";
import { ProductSheet } from "./product-sheet";
import { useEffect } from "react";

export function ProductsClient({
  products: initialProducts,
  insights: initialInsights,
}: {
  products: Product[];
  insights: ProductInsights;
}) {
  const dispatch = useAppDispatch();
  const { items, insights, loading } = useAppSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const displayProducts = items.length > 0 ? items : initialProducts;
  const displayInsights = insights || initialInsights;

  return (
    <div className="flex flex-col gap-8 p-8 max-w-[1600px] mx-auto">
      {/* Product Actions Strip */}
      <section className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex gap-3">
          <FilterSelect label="Category" options={["Ferns", "Succulents", "Tropicals"]} />
          <FilterSelect label="Type" options={["Indoor", "Outdoor"]} />
          <FilterSelect label="Season" options={["Spring", "All-year"]} />
          <FilterSelect label="Stock Status" options={["In Stock", "Low Stock"]} />
        </div>
        <Button 
          onClick={() => dispatch(setSidebarMode({ mode: "add" }))}
          className="bg-gradient-to-br from-primary to-primary-container text-on-primary h-11 px-6 rounded-xl flex items-center gap-2 text-sm font-bold shadow-[0_8px_24px_-4px_rgba(12,32,13,0.15)] hover:scale-[1.02] active:scale-95 transition-all"
        >
          <Plus size={18} strokeWidth={2.5} />
          Add Product
        </Button>
      </section>

      {/* Product Table Area */}
      <section>
        <DataTable columns={columns} data={displayProducts} />
      </section>
      
      <ProductSheet />

      {/* Insights Bento Mini-Strip */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <InsightCard 
          icon={<Package size={20} strokeWidth={1.5} />} 
          label="Total Items" 
          value={insights?.totalItems?.toLocaleString() ?? ""} 
          iconClassName="bg-primary/10 text-primary"
        />
        <InsightCard 
          icon={<TrendingUp size={20} strokeWidth={1.5} />} 
          label="Avg. Margin" 
          value={insights?.avgMargin ?? ""} 
          iconClassName="bg-tertiary/10 text-tertiary"
        />
        <InsightCard 
          icon={<TriangleAlert size={20} strokeWidth={1.5} />} 
          label="Low Stock" 
          value={insights?.lowStockCount?.toString() ?? ""} 
          iconClassName="bg-error/10 text-error"
        />
        <div className="bg-primary p-6 rounded-2xl flex items-center gap-5 shadow-[0_8px_32px_-8px_rgba(23,57,1,0.3)] border border-white/5 overflow-hidden relative">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/5 rounded-full blur-2xl"></div>
          <div className="h-12 w-12 rounded-full bg-white/10 flex items-center justify-center text-on-primary shadow-sm backdrop-blur-sm relative z-10">
            <ShoppingBag size={20} strokeWidth={1.5} />
          </div>
          <div className="relative z-10">
            <p className="text-[10px] font-bold uppercase tracking-widest text-on-primary/60">Units Sold</p>
            <p className="text-2xl font-black text-on-primary tracking-tight">{insights?.unitsSold?.toLocaleString() ?? ""}</p>
          </div>
        </div>
      </section>
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

function InsightCard({ icon, label, value, iconClassName }: { icon: React.ReactNode; label: string; value: string; iconClassName: string }) {
  return (
    <div className="bg-surface-container-low/40 p-6 rounded-2xl flex items-center gap-5 border border-outline-variant/5 hover:bg-white hover:shadow-md transition-all group">
      <div className={cn("h-12 w-12 rounded-full flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform", iconClassName)}>
        {icon}
      </div>
      <div>
        <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant/40">{label}</p>
        <p className="text-2xl font-black text-on-surface tracking-tight">{value}</p>
      </div>
    </div>
  );
}
