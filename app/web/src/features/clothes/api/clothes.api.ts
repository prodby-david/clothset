import { apiClient } from "@/lib/axios";

export interface ApiClothingItem {
  id: string;
  userId: string;
  closetId: string;
  name: string;
  category: "TOPS" | "BOTTOMS" | "OUTERWEAR" | "DRESSES" | "FOOTWEAR" | "ACCESSORIES" | "OTHER";
  subcategory?: string | null;
  color?: string | null;
  brand?: string | null;
  material?: string | null;
  style?: string | null;
  seasons?: string[];
  occasions?: string[];
  description?: string | null;
  imageKey?: string | null;
  thumbnailKey?: string | null;
  isFavorite?: boolean;
  isArchived?: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface CreateClothingPayload {
  name: string;
  category: "TOPS" | "BOTTOMS" | "OUTERWEAR" | "DRESSES" | "FOOTWEAR" | "ACCESSORIES" | "OTHER";
  subcategory?: string;
  color?: string;
  brand?: string;
  material?: string;
  style?: string;
  seasons?: string[];
  occasions?: string[];
  description?: string;
  imageKey?: string;
  thumbnailKey?: string;
}

export async function getAllClothesApi(category?: string): Promise<ApiClothingItem[]> {
  const params = category && category !== "all" ? { category } : undefined;
  const response = await apiClient.get<ApiClothingItem[]>("/clothes", { params });
  return response.data;
}

export async function getClothesByClosetApi(
  closetId: string,
  category?: string
): Promise<ApiClothingItem[]> {
  const params = category && category !== "all" ? { category } : undefined;
  const response = await apiClient.get<ApiClothingItem[]>(
    `/closets/${closetId}/clothes`,
    { params }
  );
  return response.data;
}

export async function createClothingApi(
  closetId: string,
  data: CreateClothingPayload
): Promise<ApiClothingItem> {
  const response = await apiClient.post<ApiClothingItem>(
    `/closets/${closetId}/clothes`,
    data
  );
  return response.data;
}

export async function updateClothingApi(
  clothingId: string,
  data: Partial<CreateClothingPayload>
): Promise<ApiClothingItem> {
  const response = await apiClient.put<ApiClothingItem>(
    `/clothes/${clothingId}`,
    data
  );
  return response.data;
}

export async function deleteClothingApi(clothingId: string): Promise<{ success: boolean }> {
  const response = await apiClient.delete<{ success: boolean }>(`/clothes/${clothingId}`);
  return response.data;
}

export async function uploadImageApi(
  dataUrl: string,
  fileName?: string
): Promise<{ url: string }> {
  const response = await apiClient.post<{ url: string }>("/storage/upload", {
    dataUrl,
    fileName,
  });
  return response.data;
}
