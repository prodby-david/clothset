"use client";

import { useState, useEffect, useCallback } from "react";
import { Closet, ClosetFormData } from "../types/closet.types";
import {
  getClosetsApi,
  createClosetApi,
  updateClosetApi,
  deleteClosetApi,
} from "../api/closets.api";

const LOCAL_STORAGE_KEY = "clothset_closets_cache";

const initialClosets: Closet[] = [
  {
    id: "cls_1",
    name: "My Daily Wardrobe",
    type: "everyday",
    description: "Casual staples and everyday go-to garments",
    clothesCount: 4,
    maxSize: 50,
    createdAt: new Date().toISOString(),
  },
  {
    id: "cls_2",
    name: "Office & Formal Wear",
    type: "work",
    description: "Professional button-downs and tailored trousers",
    clothesCount: 4,
    maxSize: 40,
    createdAt: new Date().toISOString(),
  },
  {
    id: "cls_3",
    name: "Weekend Minimalist Capsule",
    type: "capsule",
    description: "Curated 30-piece interchangeable weekend rotation",
    clothesCount: 4,
    maxSize: 30,
    createdAt: new Date().toISOString(),
  },
];

function getStoredClosets(): Closet[] {
  if (typeof window === "undefined") return initialClosets;
  const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!raw) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(initialClosets));
    return initialClosets;
  }
  try {
    return JSON.parse(raw);
  } catch {
    return initialClosets;
  }
}

export function useClosets() {
  const [closets, setClosets] = useState<Closet[]>(getStoredClosets);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const setCachedClosets = useCallback((items: Closet[]) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
    }
    setClosets(items);
  }, []);

  const fetchClosets = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getClosetsApi();
      setClosets(data);
      if (typeof window !== "undefined") {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
      }
    } catch {
      setClosets(getStoredClosets());
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;
    getClosetsApi()
      .then((data) => {
        if (isMounted) {
          setClosets(data);
          if (typeof window !== "undefined") {
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
          }
        }
      })
      .catch(() => {
        if (isMounted) {
          setClosets(getStoredClosets());
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const createCloset = async (formData: ClosetFormData): Promise<Closet> => {
    setError(null);
    try {
      const newCloset = await createClosetApi(formData);
      setClosets((prev) => [newCloset, ...prev]);
      return newCloset;
    } catch {
      const fallback: Closet = {
        id: `cls_${Date.now()}`,
        name: formData.name,
        type: formData.type,
        description: formData.description,
        clothesCount: 0,
        maxSize: formData.maxSize || 50,
        createdAt: new Date().toISOString(),
      };
      const updated = [fallback, ...getStoredClosets()];
      setCachedClosets(updated);
      return fallback;
    }
  };

  const updateCloset = async (
    id: string,
    formData: ClosetFormData
  ): Promise<Closet> => {
    setError(null);
    try {
      const updated = await updateClosetApi(id, formData);
      setClosets((prev) => prev.map((c) => (c.id === id ? updated : c)));
      return updated;
    } catch {
      const currentList = getStoredClosets();
      const updatedList = currentList.map((c) =>
        c.id === id
          ? {
              ...c,
              name: formData.name,
              type: formData.type,
              description: formData.description,
              maxSize: formData.maxSize || c.maxSize || 50,
              updatedAt: new Date().toISOString(),
            }
          : c
      );
      setCachedClosets(updatedList);
      const found = updatedList.find((c) => c.id === id);
      if (found) return found;
      throw new Error("Closet not found");
    }
  };

  const deleteCloset = async (id: string): Promise<void> => {
    setError(null);
    try {
      await deleteClosetApi(id);
      setClosets((prev) => prev.filter((c) => c.id !== id));
    } catch {
      const currentList = getStoredClosets();
      const updatedList = currentList.filter((c) => c.id !== id);
      setCachedClosets(updatedList);
    }
  };

  return {
    closets,
    isLoading,
    error,
    fetchClosets,
    createCloset,
    updateCloset,
    deleteCloset,
  };
}
