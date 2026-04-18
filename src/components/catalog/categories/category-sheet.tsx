"use client";

import { useState } from "react";
import {
  Sheet,
  SheetContent,
} from "@/components/ui/sheet";
import { CategoryForm } from "./category-form";
import { createCategory, CreateCategoryPayload } from "@/services/categories-service";
import { toast } from "sonner";

interface CategorySheetProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function CategorySheet({ open, onClose, onSuccess }: CategorySheetProps) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data: CreateCategoryPayload) => {
    try {
      setLoading(true);
      await createCategory(data);
      toast.success("Category Created", {
        description: `"${data.name}" has been added successfully.`,
      });
      onSuccess();
      onClose();
    } catch (err) {
      // Error toast is handled by axios interceptor
      console.error("Create category failed", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={(o) => !o && onClose()} modal>
      <SheetContent side="right" className="p-0 !min-w-[90%] border-none shadow-2xl">
        <CategoryForm
          mode="add"
          onSubmit={handleSubmit}
          onCancel={onClose}
          isLoading={loading}
        />
      </SheetContent>
    </Sheet>
  );
}
