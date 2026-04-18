import { Metadata } from "next";
import { CategoriesClient } from "@/components/catalog/categories/categories-client";

export const metadata: Metadata = {
  title: "Categories Management | Hortus Admin",
  description: "Manage your plant and accessory categories.",
};

export default function CategoriesPage() {
  const initialData = {
    items: [],
    page: 0,
    size: 10,
    totalElements: 0,
    totalPages: 0,
  };

  return (
    <div className="flex-1 flex flex-col bg-surface/30">
      <div className="flex flex-col gap-8 p-8 max-w-[1600px] mx-auto h-full overflow-hidden w-full">
        <CategoriesClient initialData={initialData} />
      </div>
    </div>
  );
}
