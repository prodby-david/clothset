"use client";

import {
  useState,
  useEffect,
  useCallback,
} from "react";
import { useRouter } from "next/navigation";
import { loginApi, registerApi, getMeApi, logoutApi } from "../api/auth.api";
import { AuthContext } from "../context/auth.context";
import type {
  User,
  LoginFormData,
  RegisterFormData,
  AuthProviderProps,
} from "../types/auth.types";

export function AuthProvider({ children }: AuthProviderProps) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const checkAuth = useCallback(async () => {
    try {
      const currentUser = await getMeApi();
      setUser(currentUser);
    } catch {
      setUser(null);
      setToken(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    queueMicrotask(() => {
      void checkAuth();
    });
  }, [checkAuth]);

  const login = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      const response = await loginApi(data);
      setUser(response.user);
      setToken(response.accessToken);
      router.push("/dashboard");
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: RegisterFormData) => {
    setIsLoading(true);
    try {
      const response = await registerApi(data);
      setUser(response.user);
      setToken(response.accessToken);
      router.push("/dashboard");
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    const target = new URL("/auth/google", process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api");
    window.location.replace(target.toString());
  };

  const logout = async () => {
    try {
      await logoutApi();
    } catch {
    } finally {
      setUser(null);
      setToken(null);
      router.push("/sign-in");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        login,
        register,
        loginWithGoogle,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
export default AuthProvider;
