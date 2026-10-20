import { apiClient } from "@/lib/axios";
import { ClothingItem, ClothingFormData } from "../types/clothing.types";

export async function getClothesByClosetApi(closetId: string): Promise<ClothingItem[]> {
  const response = await apiClient.get<ClothingItem[]>(`/closets/${closetId}/clothes`);
  return response.data;
}

export async function createClothingApi(
  closetId: string,
  data: ClothingFormData
): Promise<ClothingItem> {
  const response = await apiClient.post<ClothingItem>(
    `/closets/${closetId}/clothes`,
    data
  );
  return response.data;
}

export async function updateClothingApi(
  clothingId: string,
  data: ClothingFormData
): Promise<ClothingItem> {
  const response = await apiClient.put<ClothingItem>(
    `/clothes/${clothingId}`,
    data
  );
  return response.data;
}

export async function deleteClothingApi(clothingId: string): Promise<{ success: boolean }> {
  const response = await apiClient.delete<{ success: boolean }>(`/clothes/${clothingId}`);
  return response.data;
}
