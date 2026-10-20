"use client";

import { useState, useEffect, useCallback } from "react";
import { Closet, ClosetFormData } from "../types/closet.types";
import { getClosetByIdApi, updateClosetApi, deleteClosetApi } from "../api/closets.api";

const LOCAL_STORAGE_KEY = "clothset_closets_cache";

function getStoredCloset(closetId: string): Closet | null {
  if (typeof window === "undefined" || !closetId) return null;
  const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (raw) {
    try {
      const list: Closet[] = JSON.parse(raw);
      const found = list.find((c) => c.id === closetId);
      if (found) return found;
    } catch {}
  }
  return {
    id: closetId,
    name: "My Wardrobe",
    type: "everyday",
    description: "Primary closet collection",
    createdAt: new Date().toISOString(),
  };
}

export function useClosetDetails(closetId: string) {
  const [closet, setCloset] = useState<Closet | null>(() => getStoredCloset(closetId));
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCloset = useCallback(async () => {
    if (!closetId) return;
    setIsLoading(true);
    setError(null);
    try {
      const data = await getClosetByIdApi(closetId);
      setCloset(data);
    } catch {
      setCloset(getStoredCloset(closetId));
    } finally {
      setIsLoading(false);
    }
  }, [closetId]);

  useEffect(() => {
    if (!closetId) return;
    let isMounted = true;
    getClosetByIdApi(closetId)
      .then((data) => {
        if (isMounted) setCloset(data);
      })
      .catch(() => {
        if (isMounted) setCloset(getStoredCloset(closetId));
      });

    return () => {
      isMounted = false;
    };
  }, [closetId]);

  const updateCloset = async (formData: ClosetFormData): Promise<Closet> => {
    setError(null);
    try {
      const updated = await updateClosetApi(closetId, formData);
      setCloset(updated);
      return updated;
    } catch {
      const updated: Closet = {
        id: closetId,
        name: formData.name,
        type: formData.type,
        description: formData.description,
        createdAt: closet?.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setCloset(updated);
      if (typeof window !== "undefined") {
        const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (raw) {
          try {
            const list: Closet[] = JSON.parse(raw);
            const nextList = list.map((c) => (c.id === closetId ? updated : c));
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(nextList));
          } catch {}
        }
      }
      return updated;
    }
  };

  const deleteCloset = async (): Promise<void> => {
    setError(null);
    try {
      await deleteClosetApi(closetId);
    } catch {}
    if (typeof window !== "undefined") {
      const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (raw) {
        try {
          const list: Closet[] = JSON.parse(raw);
          const nextList = list.filter((c) => c.id !== closetId);
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(nextList));
        } catch {}
      }
    }
  };

  return {
    closet,
    isLoading,
    error,
    updateCloset,
    deleteCloset,
    refresh: fetchCloset,
  };
}
