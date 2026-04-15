import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Product, fetchProductsData, addProduct, updateProduct, ProductsData } from "@/services/products-service";

interface ProductsState {
  items: Product[];
  insights: ProductsData["insights"] | null;
  loading: boolean;
  error: string | null;
  selectedProduct: Product | null;
  sidebarMode: "add" | "edit" | "view" | null;
}

const initialState: ProductsState = {
  items: [],
  insights: null,
  loading: false,
  error: null,
  selectedProduct: null,
  sidebarMode: null,
};

export const fetchProducts = createAsyncThunk("products/fetchAll", async () => {
  const result = await fetchProductsData();
  return result;
});

export const saveProduct = createAsyncThunk(
  "products/save",
  async (data: { product: any; mode: "add" | "edit" }) => {
    if (data.mode === "add") {
      return await addProduct(data.product);
    } else {
      return await updateProduct(data.product.id, data.product);
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setSidebarMode: (state, action: PayloadAction<{ mode: "add" | "edit" | "view" | null; product?: Product | null }>) => {
      state.sidebarMode = action.payload.mode;
      state.selectedProduct = action.payload.product || null;
    },
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
      state.sidebarMode = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.products;
        state.insights = action.payload.insights;
      })
      .addCase(saveProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(saveProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.sidebarMode = null;
        state.selectedProduct = null;
        // In a real app we might just push to items or re-fetch
        // But for mock we'll just allow the fetch case to handle it or manually add
      });
  },
});

export const { setSidebarMode, clearSelectedProduct } = productsSlice.actions;
export default productsSlice.reducer;
