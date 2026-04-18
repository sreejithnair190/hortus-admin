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
      <CategoriesClient initialData={initialData} />
    </div>
  );
}
