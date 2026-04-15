"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { 
  CloudUpload, 
  Plus, 
  Minus, 
  Trash2, 
  Save, 
  X,
  Package,
  Info,
  ChevronDown,
  Bold,
  Italic,
  List,
  Link2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Product } from "@/services/products-service";

const productSchema = z.object({
  name: z.string().min(2, "Botanical name is required"),
  price: z.number().min(0, "Price must be positive"),
  category: z.string().min(1, "Category is required"),
  stock: z.number().min(0, "Stock cannot be negative"),
  description: z.string().optional(),
  imageUrl: z.string().min(1, "Image URL is required"),
  seasons: z.array(z.string()).default([]),
  classification: z.array(z.string()).default([]),
});

type ProductFormValues = z.infer<typeof productSchema>;

interface ProductFormProps {
  initialData?: Product | null;
  mode: "add" | "edit" | "view";
  onSubmit: (data: ProductFormValues) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export function ProductForm({
  initialData,
  mode,
  onSubmit,
  onCancel,
  isLoading
}: ProductFormProps) {
  const isView = mode === "view";

  const { register, handleSubmit, control, watch, formState: { errors } } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: initialData?.name || "",
      price: initialData?.price || 0,
      category: initialData?.category || "Aroids & Foliage",
      stock: initialData?.stock || 0,
      description: initialData?.description || "",
      imageUrl: initialData?.imageUrl || "https://images.unsplash.com/photo-1545239351-ef35627ec750?q=80&w=200&auto=format&fit=crop",
      seasons: initialData?.seasons || ["Spring", "Summer"],
      classification: initialData?.classification || ["Indoor", "Rare Hybrid"],
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col h-full bg-surface-container-lowest overflow-hidden">
      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-8 custom-scrollbar space-y-8 pb-32">
        <div className="flex flex-col gap-2">
          <h2 className="text-3xl font-black tracking-tighter text-on-surface">
            {mode === "add" ? "Curate New Specimen" : mode === "edit" ? "Refine Specimens" : "Specimen Archive"}
          </h2>
          <p className="text-on-surface-variant text-sm">
            {mode === "view" 
              ? "Studying the botanical properties and commercial presence of this archive entry."
              : "Defining the botanical properties and commercial presence of a new atelier offering."}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {/* Media Section */}
          <div className="space-y-6">
            <div className="bg-surface-container-low/50 rounded-2xl p-6 ring-1 ring-outline-variant/10">
              <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant mb-4 opacity-60">Gallery & Cover</label>
              <div className={cn(
                "group relative aspect-video w-full rounded-2xl border-2 border-dashed border-outline-variant/30 flex flex-col items-center justify-center gap-4 bg-surface-container-low transition-all overflow-hidden",
                !isView && "hover:bg-surface-container hover:border-primary/30 cursor-pointer"
              )}>
                <img 
                  src={watch("imageUrl")} 
                  alt="Product preview" 
                  className={cn(
                    "absolute inset-0 w-full h-full object-cover transition-opacity",
                    isView ? "opacity-100" : "opacity-30 group-hover:opacity-40"
                  )} 
                />
                {!isView && (
                  <div className="z-10 flex flex-col items-center">
                    <CloudUpload size={48} strokeWidth={1.5} className="text-primary/60 mb-2" />
                    <p className="font-bold text-on-surface">Update primary visual</p>
                    <p className="text-xs text-on-surface-variant">High-resolution botanical captures preferred</p>
                  </div>
                )}
              </div>
              
              {/* Manual URL input since we don't have a real file picker */}
              {!isView && (
                <div className="mt-4">
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-on-surface-variant/60 mb-1">Image URL</label>
                  <Input {...register("imageUrl")} className="h-10 bg-surface-container-low border-none rounded-lg" />
                </div>
              )}
            </div>

            {/* Price & Stock */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-surface-container-low p-6 rounded-2xl flex flex-col gap-3">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Available Quantity</label>
                <Controller
                  name="stock"
                  control={control}
                  render={({ field }) => (
                    <div className="flex items-center bg-white/50 rounded-xl ring-1 ring-outline-variant/20 overflow-hidden">
                      <button 
                        type="button"
                        disabled={isView || field.value <= 0}
                        onClick={() => field.onChange(Math.max(0, field.value - 1))}
                        className="px-4 py-3 hover:bg-surface-container transition-colors"
                      >
                        <Minus size={14} />
                      </button>
                      <input 
                        type="number"
                        className="w-full text-center bg-transparent border-none focus:ring-0 font-bold text-lg" 
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                        disabled={isView}
                      />
                      <button 
                        type="button"
                        disabled={isView}
                        onClick={() => field.onChange(field.value + 1)}
                        className="px-4 py-3 hover:bg-surface-container transition-colors"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  )}
                />
              </div>

              <div className="bg-secondary-container/20 p-6 rounded-2xl flex flex-col gap-3">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-on-secondary-container opacity-60">Price (₹)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 font-black text-on-secondary-container opacity-40 text-lg">₹</span>
                  <input 
                    {...register("price", { valueAsNumber: true })}
                    className="w-full pl-10 pr-4 py-3 bg-white/50 border-none rounded-xl text-xl font-black text-on-secondary-container focus:ring-2 focus:ring-primary/20" 
                    placeholder="2,499"
                    disabled={isView}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Details Section */}
          <div className="space-y-8 bg-surface-container-low/30 p-8 rounded-3xl border border-outline-variant/10">
            <div className="space-y-6">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-on-surface-variant/60 mb-2 font-headline">Botanical/Product Name</label>
                <input 
                   {...register("name")}
                   className="w-full px-5 py-4 bg-surface-container-low border-none rounded-2xl text-xl font-bold focus:ring-2 focus:ring-primary/20 placeholder:text-on-surface-variant/20 tracking-tight" 
                   placeholder="e.g., Midnight Velvet Alocasia"
                   disabled={isView}
                />
                {errors.name && <p className="text-error text-xs mt-1">{errors.name.message}</p>}
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-on-surface-variant/60 mb-2">Category</label>
                <div className={cn("relative", isView && "pointer-events-none")}>
                  <select 
                    {...register("category")}
                    className="w-full appearance-none px-5 py-4 bg-surface-container-low border-none rounded-2xl text-base font-bold text-on-surface-variant focus:ring-2 focus:ring-primary/20"
                  >
                    <option>Aroids & Foliage</option>
                    <option>Cacti & Succulents</option>
                    <option>Flowering Perennials</option>
                    <option>Atelier Tools</option>
                    <option>Tropicals</option>
                    <option>Indoor Trees</option>
                  </select>
                  {!isView && <ChevronDown size={20} className="absolute right-5 top-1/2 -translate-y-1/2 opacity-40" />}
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-on-surface-variant/60 mb-2">Detailed Narrative</label>
                <div className="rounded-2xl overflow-hidden ring-1 ring-outline-variant/20 bg-white">
                  {!isView && (
                    <div className="bg-surface-container-low/50 px-4 py-2 border-b border-outline-variant/10 flex gap-4">
                      <button type="button" className="p-1 text-on-surface-variant hover:text-primary transition-colors"><Bold size={16} /></button>
                      <button type="button" className="p-1 text-on-surface-variant hover:text-primary transition-colors"><Italic size={16} /></button>
                      <button type="button" className="p-1 text-on-surface-variant hover:text-primary transition-colors"><List size={16} /></button>
                      <div className="w-px h-10 bg-outline-variant/20 mx-2"></div>
                      <button type="button" className="p-1 text-on-surface-variant hover:text-primary transition-colors"><Link2 size={16} /></button>
                    </div>
                  )}
                  <textarea 
                    {...register("description")}
                    className="w-full p-6 border-none focus:ring-0 resize-none text-on-surface-variant text-sm leading-relaxed" 
                    placeholder="Describe the origin, care instructions, and aesthetic appeal..." 
                    rows={6}
                    disabled={isView}
                  ></textarea>
                </div>
              </div>
            </div>

            {/* Tags Section */}
            <div className="space-y-8">
              <div>
                <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant/40 mb-4">Vibrant Seasons</h4>
                <Controller
                  name="seasons"
                  control={control}
                  render={({ field }) => (
                    <div className="flex flex-wrap gap-2">
                      {["Spring", "Summer", "Autumn", "Winter", "All-year"].map(tag => (
                        <button
                          key={tag}
                          type="button"
                          disabled={isView}
                          onClick={() => {
                            const newValue = field.value.includes(tag)
                              ? field.value.filter((v: string) => v !== tag)
                              : [...field.value, tag];
                            field.onChange(newValue);
                          }}
                          className={cn(
                            "px-5 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-2",
                            field.value.includes(tag) 
                              ? "bg-primary text-white shadow-lg shadow-primary/20" 
                              : "bg-surface-container-low text-on-surface-variant/60 hover:bg-surface-container"
                          )}
                        >
                          {tag} {field.value.includes(tag) && !isView && <X size={12} />}
                        </button>
                      ))}
                    </div>
                  )}
                />
              </div>

              <div>
                <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant/40 mb-4">Specimen Classification</h4>
                <Controller
                  name="classification"
                  control={control}
                  render={({ field }) => (
                    <div className="flex flex-wrap gap-2">
                      {["Rare Hybrid", "Indoor", "Outdoor", "Low Light", "Pet Friendly", "Tropical"].map(tag => (
                        <button
                          key={tag}
                          type="button"
                          disabled={isView}
                          onClick={() => {
                            const newValue = field.value.includes(tag)
                              ? field.value.filter((v: string) => v !== tag)
                              : [...field.value, tag];
                            field.onChange(newValue);
                          }}
                          className={cn(
                            "px-5 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-2",
                            field.value.includes(tag) 
                              ? "bg-secondary text-white shadow-lg shadow-secondary/20" 
                              : "bg-surface-container-low text-on-secondary-container/60 hover:bg-surface-container"
                          )}
                        >
                          {tag} {field.value.includes(tag) && !isView && <X size={12} />}
                        </button>
                      ))}
                    </div>
                  )}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Action Bar */}
      <footer className="shrink-0 glass-panel px-8 py-6 border-t border-outline-variant/10 z-50 flex items-center justify-between bg-white/80 backdrop-blur-xl absolute bottom-0 right-0 left-0">
        <div className="flex items-center gap-4">
          <div className="flex -space-x-3">
            <div className="w-9 h-9 rounded-full bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center text-[9px] font-black border-2 border-white ring-2 ring-tertiary/10">NEW</div>
            <div className="w-9 h-9 rounded-full bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center text-[9px] font-black border-2 border-white ring-2 ring-secondary/10">INV</div>
          </div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant/40 max-w-[200px] leading-relaxed">
            {isView ? "Archive view is read-only for historical consistency." : "Product changes are automatically staged for curation."}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button 
            type="button" 
            variant="ghost" 
            onClick={onCancel}
            className="px-6 h-12 rounded-2xl font-bold text-secondary-container hover:bg-secondary-container/10 transition-all uppercase tracking-widest text-[10px]"
          >
            {isView ? "Close Archive" : "Cancel"}
          </Button>
          {!isView && (
            <Button 
              type="submit"
              disabled={isLoading}
              className="px-8 h-12 rounded-2xl font-black bg-gradient-to-br from-primary to-primary-container text-white shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-3 uppercase tracking-widest text-[10px]"
            >
              {isLoading ? (
                <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <Save size={16} />
              )}
              {mode === "add" ? "Save Specimen" : "Refine Entry"}
            </Button>
          )}
        </div>
      </footer>
    </form>
  );
}
