import { apiClient } from "@/lib/axios";
import { Closet, ClosetFormData } from "../types/closet.types";

export async function getClosetsApi(): Promise<Closet[]> {
  const response = await apiClient.get<Closet[]>("/closets");
  return response.data;
}

export async function getClosetByIdApi(id: string): Promise<Closet> {
  const response = await apiClient.get<Closet>(`/closets/${id}`);
  return response.data;
}

export async function createClosetApi(data: ClosetFormData): Promise<Closet> {
  const response = await apiClient.post<Closet>("/closets", data);
  return response.data;
}

export async function updateClosetApi(id: string, data: ClosetFormData): Promise<Closet> {
  const response = await apiClient.put<Closet>(`/closets/${id}`, data);
  return response.data;
}

export async function deleteClosetApi(id: string): Promise<{ success: boolean }> {
  const response = await apiClient.delete<{ success: boolean }>(`/closets/${id}`);
  return response.data;
}
