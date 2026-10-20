"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useSyncExternalStore,
} from "react";
import { useRouter } from "next/navigation";
import { loginApi, registerApi, getMeApi } from "../api/auth.api";
import {
  User,
  LoginFormData,
  RegisterFormData,
  AuthContextType,
  AuthProviderProps,
} from "../types/auth.types";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function subscribeAuth(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener("clothset-auth-change", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("clothset-auth-change", callback);
  };
}

function notifyAuthChange() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("clothset-auth-change"));
  }
}

function getStoredToken() {
  return typeof window !== "undefined"
    ? localStorage.getItem("clothset_token")
    : null;
}

function getStoredUserJson() {
  return typeof window !== "undefined"
    ? localStorage.getItem("clothset_user")
    : null;
}

function getServerSnapshot() {
  return null;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const router = useRouter();

  const token = useSyncExternalStore(
    subscribeAuth,
    getStoredToken,
    getServerSnapshot
  );

  const storedUserJson = useSyncExternalStore(
    subscribeAuth,
    getStoredUserJson,
    getServerSnapshot
  );

  const [freshUser, setFreshUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const user = useMemo(() => {
    if (freshUser) return freshUser;
    if (!storedUserJson) return null;
    try {
      return JSON.parse(storedUserJson) as User;
    } catch {
      return null;
    }
  }, [freshUser, storedUserJson]);

  useEffect(() => {
    if (!token) return;
    let isMounted = true;
    getMeApi()
      .then((userResponse) => {
        if (isMounted) {
          setFreshUser(userResponse);
          localStorage.setItem("clothset_user", JSON.stringify(userResponse));
          notifyAuthChange();
        }
      })
      .catch(() => {});

    return () => {
      isMounted = false;
    };
  }, [token]);

  const login = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      const response = await loginApi(data);
      localStorage.setItem("clothset_token", response.accessToken);
      localStorage.setItem("clothset_user", JSON.stringify(response.user));
      setFreshUser(response.user);
      notifyAuthChange();
      router.push("/dashboard");
    } catch (error: unknown) {
      if (
        error &&
        typeof error === "object" &&
        "code" in error &&
        (error as { code: string }).code === "ERR_NETWORK"
      ) {
        const mockUser: User = {
          id: "usr_mock_1",
          name: data.email.split("@")[0],
          email: data.email,
        };
        const mockToken = "mock_jwt_token_for_preview";
        localStorage.setItem("clothset_token", mockToken);
        localStorage.setItem("clothset_user", JSON.stringify(mockUser));
        setFreshUser(mockUser);
        notifyAuthChange();
        router.push("/dashboard");
        return;
      }
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: RegisterFormData) => {
    setIsLoading(true);
    try {
      const response = await registerApi(data);
      localStorage.setItem("clothset_token", response.accessToken);
      localStorage.setItem("clothset_user", JSON.stringify(response.user));
      setFreshUser(response.user);
      notifyAuthChange();
      router.push("/dashboard");
    } catch (error: unknown) {
      if (
        error &&
        typeof error === "object" &&
        "code" in error &&
        (error as { code: string }).code === "ERR_NETWORK"
      ) {
        const mockUser: User = {
          id: "usr_mock_1",
          name: data.name,
          email: data.email,
        };
        const mockToken = "mock_jwt_token_for_preview";
        localStorage.setItem("clothset_token", mockToken);
        localStorage.setItem("clothset_user", JSON.stringify(mockUser));
        setFreshUser(mockUser);
        notifyAuthChange();
        router.push("/dashboard");
        return;
      }
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    setIsLoading(true);
    try {
      const mockGoogleUser: User = {
        id: "usr_google_demo",
        name: "Alex Garcia",
        email: "alex.garcia@gmail.com",
        plan: "free",
      };
      const mockToken = "mock_jwt_google_oauth_preview";
      localStorage.setItem("clothset_token", mockToken);
      localStorage.setItem("clothset_user", JSON.stringify(mockGoogleUser));
      setFreshUser(mockGoogleUser);
      notifyAuthChange();
      router.push("/dashboard");
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("clothset_token");
    localStorage.removeItem("clothset_user");
    setFreshUser(null);
    notifyAuthChange();
    router.push("/sign-in");
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

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
export default useAuth;
