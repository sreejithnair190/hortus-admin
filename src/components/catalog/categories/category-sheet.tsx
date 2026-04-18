"use client";

import { useState } from "react";
import {
  Sheet,
  SheetContent,
} from "@/components/ui/sheet";
import { CategoryForm } from "./category-form";
import { createCategory, updateCategory, CreateCategoryPayload, UpdateCategoryPayload } from "@/services/categories-service";
import { toast } from "sonner";

interface CategorySheetProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  mode?: "add" | "edit";
  categoryId?: string | null;
}

export function CategorySheet({ open, onClose, onSuccess, mode = "add", categoryId }: CategorySheetProps) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data: CreateCategoryPayload | UpdateCategoryPayload) => {
    try {
      setLoading(true);
      if (mode === "add") {
        await createCategory(data as CreateCategoryPayload);
        toast.success("Category Created", {
          description: `"${data.name}" has been added successfully.`,
        });
      } else if (mode === "edit" && categoryId) {
        await updateCategory(categoryId, data as UpdateCategoryPayload);
        toast.success("Category Updated", {
          description: `"${data.name}" has been updated successfully.`,
        });
      }
      onSuccess();
      onClose();
    } catch (err) {
      console.error(`${mode === "add" ? "Create" : "Update"} category failed`, err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={(o) => !o && onClose()} modal>
      <SheetContent side="right" className="p-0 !min-w-[90%] border-none shadow-2xl">
        <CategoryForm
          mode={mode}
          categoryId={categoryId}
          onSubmit={handleSubmit}
          onCancel={onClose}
          isLoading={loading}
        />
      </SheetContent>
    </Sheet>
  );
}
