import axios from "axios";
import type { Admin, AdminSignInInput, AdminAuthResponse } from "../types/admin.types";
import type { WardrobeTemplateItem } from "@/features/closets/types/closet.types";
import { getAdminTokenFromCookies } from "../lib/admin-cookies";

export const adminApiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

adminApiClient.interceptors.request.use((config) => {
  const token = getAdminTokenFromCookies();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export async function adminLoginApi(data: AdminSignInInput): Promise<AdminAuthResponse> {
  const response = await adminApiClient.post<AdminAuthResponse>("/admin/auth/login", data);
  return response.data;
}

export async function adminGetMeApi(): Promise<Admin> {
  const response = await adminApiClient.get<Admin>("/admin/auth/me");
  return response.data;
}

export async function adminLogoutApi(): Promise<{ success: boolean }> {
  const response = await adminApiClient.post<{ success: boolean }>("/admin/auth/logout");
  return response.data;
}

export async function getAdminWardrobeTemplatesApi(): Promise<WardrobeTemplateItem[]> {
  const response = await adminApiClient.get<WardrobeTemplateItem[]>("/admin/wardrobe-templates");
  return response.data;
}

export async function createWardrobeTemplateApi(data: {
  name: string;
  description?: string;
  type?: string;
  minTier?: "FREE" | "PLUS" | "ELITE";
}): Promise<WardrobeTemplateItem> {
  const response = await adminApiClient.post<WardrobeTemplateItem>("/admin/wardrobe-templates", data);
  return response.data;
}

export async function updateWardrobeTemplateApi(
  id: string,
  data: Partial<{
    name: string;
    description?: string;
    type?: string;
    minTier?: "FREE" | "PLUS" | "ELITE";
  }>
): Promise<WardrobeTemplateItem> {
  const response = await adminApiClient.put<WardrobeTemplateItem>(`/admin/wardrobe-templates/${id}`, data);
  return response.data;
}

export async function deleteWardrobeTemplateApi(id: string): Promise<{ success: boolean }> {
  const response = await adminApiClient.delete<{ success: boolean }>(`/admin/wardrobe-templates/${id}`);
  return response.data;
}
