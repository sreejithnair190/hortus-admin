import { fetchProductsData } from "@/services/products-service";
import { ProductsClient } from "@/components/catalog/products/products-client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products Management | Hortus Admin",
  description: "Manage your botanical inventory and product listings.",
};

export default async function ProductsPage() {
  const { products, insights } = await fetchProductsData();

  return (
    <div className="flex-1 flex flex-col bg-surface/30">
      <ProductsClient products={products} insights={insights} />
    </div>
  );
}
