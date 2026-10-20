import { apiClient } from "@/lib/axios";
import { AuthResponse, LoginFormData, RegisterFormData, User } from "../types/auth.types";

export async function loginApi(data: LoginFormData): Promise<AuthResponse> {
  const response = await apiClient.post<AuthResponse>("/auth/login", data);
  return response.data;
}

export async function registerApi(data: RegisterFormData): Promise<AuthResponse> {
  const payload = {
    name: data.name,
    email: data.email,
    password: data.password,
  };
  const response = await apiClient.post<AuthResponse>("/auth/register", payload);
  return response.data;
}

export async function getMeApi(): Promise<User> {
  const response = await apiClient.get<User>("/auth/me");
  return response.data;
}
