"use client";

import { useEffect, useState, useRef } from "react";
import { useForm, Form, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Save,
  ChevronDown
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  DropdownCategory,
  fetchAllCategories,
  CreateCategoryPayload,
} from "@/services/categories-service";
import { FileUploader } from "@/components/ui/file-uploader";

// ── Validation Schema ────────────────────────────────────────────────
const categorySchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(255, "Name must not exceed 255 characters"),
  description: z
    .string()
    .max(1000, "Description must not exceed 1000 characters")
    .optional()
    .or(z.literal("")),
  isActive: z.boolean(),
  parentId: z.string().optional().or(z.literal("")),
});

type CategoryFormValues = z.infer<typeof categorySchema>;

interface CategoryFormProps {
  mode: "add";
  onSubmit: (data: CreateCategoryPayload) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export function CategoryForm({
  mode,
  onSubmit,
  onCancel,
  isLoading,
}: CategoryFormProps) {
  const [parentCategories, setParentCategories] = useState<DropdownCategory[]>([]);
  const [loadingParents, setLoadingParents] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const controlProps = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
      description: "",
      isActive: true,
      parentId: "",
    },
  });

  const { control } = controlProps;

  useEffect(() => {
    async function loadParents() {
      try {
        setLoadingParents(true);
        const cats = await fetchAllCategories();
        setParentCategories(cats);
      } catch (err) {
        console.error("Failed to load parent categories", err);
      } finally {
        setLoadingParents(false);
      }
    }
    loadParents();
  }, []);

  const handleFormSubmit = ({ data }: { data: CategoryFormValues }) => {
    const payload: CreateCategoryPayload = {
      name: data.name,
      description: data.description || undefined,
      isActive: data.isActive,
      parentId: data.parentId || undefined,
      file: file || undefined,
    };
    onSubmit(payload);
  };

  return (
    <Form
      control={control}
      onSubmit={handleFormSubmit}
      className="flex flex-col h-full bg-surface-container-lowest overflow-hidden"
    >
      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-8 custom-scrollbar space-y-8 pb-32">
        <div className="flex flex-col gap-2">
          <h2 className="text-3xl font-black tracking-tighter text-on-surface">
            Create New Category
          </h2>
          <p className="text-on-surface-variant text-sm">
            Define a new category for organising your botanical catalogue.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {/* Media Section */}
          <Card className="border-none bg-surface-container-low/30 shadow-none ring-1 ring-outline-variant/10 rounded-2xl pt-4">
            <CardContent className="p-6">
              <Label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant mb-4 opacity-60">
                Category Image
              </Label>
              <FileUploader
                value={file}
                onChange={(f) => setFile(f as File | null)}
                multiple={false}
                accept={["image/jpeg", "image/png", "image/webp"]}
                maxSize={15 * 1024 * 1024}
                title="Upload category image"
                description="JPEG, PNG, WEBP — Max 15MB"
                className="aspect-[21/9] w-full"
              />
            </CardContent>
          </Card>

          <Card className="border-none bg-surface-container-low/30 shadow-none ring-1 ring-outline-variant/10 rounded-3xl pt-8">
            <CardContent className="space-y-6">
              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant/60">
                  Category Name
                </Label>
                <Controller
                  control={control}
                  name="name"
                  render={({ field, fieldState: { error } }) => (
                    <div>
                      <Input
                        {...field}
                        id="name"
                        placeholder="e.g., Indoor Plants"
                        className="w-full px-5 py-4 h-auto bg-surface-container-low border-none rounded-2xl text-xl font-bold focus-visible:ring-2 focus-visible:ring-primary/20 placeholder:text-on-surface-variant/20 tracking-tight"
                      />
                      {error && (
                        <p className="mt-2 text-xs text-error animate-in fade-in slide-in-from-top-1 duration-200">
                          {error.message}
                        </p>
                      )}
                    </div>
                  )}
                />
              </div>

              {/* Parent Category */}
              <div className="space-y-2">
                <Label htmlFor="parentId" className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant/60">
                  Parent Category
                </Label>
                <Controller
                  control={control}
                  name="parentId"
                  render={({ field }) => (
                    <div className="relative">
                      <select
                        {...field}
                        id="parentId"
                        className="w-full appearance-none px-5 py-4 bg-surface-container-low border-none rounded-2xl text-base font-bold text-on-surface-variant focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                      >
                        <option value="">None (Root Category)</option>
                        {parentCategories.map((cat) => (
                          <option key={cat.id} value={cat.id}>
                            {cat.name}
                          </option>
                        ))}
                      </select>
                      <ChevronDown
                        size={20}
                        className="absolute right-5 top-1/2 -translate-y-1/2 opacity-40 pointer-events-none"
                      />
                    </div>
                  )}
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description" className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant/60">
                  Description
                </Label>
                <Controller
                  control={control}
                  name="description"
                  render={({ field, fieldState: { error } }) => (
                    <div>
                      <div className="rounded-2xl overflow-hidden ring-1 ring-outline-variant/20 bg-white">
                        <textarea
                          {...field}
                          id="description"
                          className="w-full p-6 border-none focus:ring-0 resize-none text-on-surface-variant text-sm leading-relaxed transition-all duration-200"
                          placeholder="Describe what this category encompasses…"
                          rows={4}
                        />
                      </div>
                      {error && (
                        <p className="mt-2 text-xs text-error animate-in fade-in slide-in-from-top-1 duration-200">
                          {error.message}
                        </p>
                      )}
                    </div>
                  )}
                />
              </div>

              {/* Active Toggle */}
              <Controller
                control={control}
                name="isActive"
                render={({ field }) => (
                  <div className="flex items-center justify-between bg-surface-container-low rounded-2xl px-6 py-5">
                    <div>
                      <p className="text-sm font-bold text-on-surface">
                        Active Status
                      </p>
                      <p className="text-xs text-on-surface-variant/60 mt-0.5">
                        Inactive categories won&apos;t appear in the storefront
                      </p>
                    </div>
                    <button
                      type="button"
                      role="switch"
                      aria-checked={field.value}
                      onClick={() => field.onChange(!field.value)}
                      className={cn(
                        "relative inline-flex h-7 w-12 shrink-0 cursor-pointer items-center rounded-full transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
                        field.value
                          ? "bg-primary"
                          : "bg-on-surface-variant/20"
                      )}
                    >
                      <span
                        className={cn(
                          "pointer-events-none block h-5 w-5 rounded-full bg-white shadow-lg ring-0 transition-transform duration-200",
                          field.value
                            ? "translate-x-6"
                            : "translate-x-1"
                        )}
                      />
                    </button>
                  </div>
                )}
              />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer Action Bar */}
      <footer className="shrink-0 glass-panel px-8 py-6 border-t border-outline-variant/10 z-50 flex items-center justify-center bg-white/80 backdrop-blur-xl absolute bottom-0 right-0 left-0">
        <div className="flex justify-center gap-3">
          <Button
            type="submit"
            disabled={isLoading}
            className="px-8 h-12 rounded-2xl font-black bg-gradient-to-br from-primary to-primary-container text-white shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-3 uppercase tracking-widest text-[10px]"
          >
            {isLoading ? (
              <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Save size={16} />
            )}
            Create Category
          </Button>
        </div>
      </footer>
    </Form>
  );
}
