"use client";

import {
  Sheet,
  SheetContent,
} from "@/components/ui/sheet";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { clearSelectedProduct, saveProduct } from "@/store/slices/products-slice";
import { ProductForm } from "./product-form";

export function ProductSheet() {
  const dispatch = useAppDispatch();
  const { selectedProduct, sidebarMode, loading } = useAppSelector((state) => state.products);

  const isOpen = !!sidebarMode;

  const handleClose = () => {
    dispatch(clearSelectedProduct());
  };

  const handleSubmit = (data: any) => {
    if (sidebarMode === "add" || sidebarMode === "edit") {
      const productData = sidebarMode === "edit" ? { ...data, id: selectedProduct?.id } : data;
      dispatch(saveProduct({ product: productData, mode: sidebarMode }));
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && handleClose()} modal disablePointerDismissal>
      <SheetContent side="right" className="p-0 !min-w-[90%] border-none shadow-2xl">
        <ProductForm 
          initialData={selectedProduct}
          mode={sidebarMode || "view"}
          onSubmit={handleSubmit}
          onCancel={handleClose}
          isLoading={loading}
        />
      </SheetContent>
    </Sheet>
  );
}
