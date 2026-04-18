import api from "@/lib/axios";
import { ADMIN_ROUTE } from "@/lib/constants";

export interface CategoryAsset {
  id: string;
  url: string;
}

export interface CategoryParent {
  id: string;
  name: string;
  slug: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  slug: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  asset?: CategoryAsset;
  parent?: CategoryParent;
}

export interface PagedResponse<T> {
  items: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  data: T;
  timestamp: string;
}

export interface GetCategoriesParams {
  page?: number;
  perPage?: number;
  sortBy?: string;
  sortDir?: "asc" | "desc";
  isActive?: boolean | number;
  parentId?: string;
  search?: string;
}

export interface DropdownCategory {
  id: string;
  name: string;
  asset?: {
    id: string;
    url: string;
  } | null;
}

export interface CreateCategoryPayload {
  name: string;
  description?: string;
  isActive: boolean;
  parentId?: string;
  file?: File;
}

export async function fetchCategories(
  params?: GetCategoriesParams
): Promise<PagedResponse<Category>> {
  const { data } = await api.get<ApiResponse<PagedResponse<Category>>>(`${ADMIN_ROUTE}/categories`, {
    params: {
      page: params?.page ?? 0,
      perPage: params?.perPage ?? 10,
      sortBy: params?.sortBy ?? "displayOrder",
      sortDir: params?.sortDir ?? "asc",
      isActive: params?.isActive,
      parentId: params?.parentId,
      search: params?.search,
    },
  });
  return data.data;
}

export async function fetchAllCategories(): Promise<DropdownCategory[]> {
  const { data } = await api.get<ApiResponse<DropdownCategory[]>>(`${ADMIN_ROUTE}/categories/all`);
  return data.data;
}

export async function createCategory(
  payload: CreateCategoryPayload
): Promise<Category> {
  const formData = new FormData();
  formData.append("name", payload.name);
  if (payload.description) {
    formData.append("description", payload.description);
  }
  formData.append("isActive", String(payload.isActive));
  if (payload.parentId) {
    formData.append("parentId", payload.parentId);
  }
  if (payload.file) {
    formData.append("file", payload.file);
  }

  const { data } = await api.post<ApiResponse<Category>>(
    "/admin/categories",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return data.data;
}
