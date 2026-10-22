"use client";

import { useState, useEffect, useCallback } from "react";
import type { Closet, ClosetFormData } from "../types/closet.types";
import {
  getClosetsApi,
  createClosetApi,
  activateWardrobeTemplateApi,
  updateClosetApi,
  deleteClosetApi,
} from "../api/closets.api";
import { useAuth } from "@/features/auth/hooks/useAuth";

export function useClosets() {
  const { user } = useAuth();
  const userId = user?.id;

  const [closets, setClosets] = useState<Closet[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchClosets = useCallback(async () => {
    if (!userId) {
      setClosets([]);
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const data = await getClosetsApi();
      setClosets(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load wardrobes");
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    queueMicrotask(() => {
      void fetchClosets();
    });
  }, [fetchClosets]);

  const activateTemplate = async (templateId: string): Promise<Closet> => {
    setError(null);
    const newCloset = await activateWardrobeTemplateApi(templateId);
    setClosets((prev) => [newCloset, ...prev]);
    return newCloset;
  };

  const createCloset = async (formData: ClosetFormData): Promise<Closet> => {
    setError(null);
    const newCloset = await createClosetApi(formData);
    setClosets((prev) => [newCloset, ...prev]);
    return newCloset;
  };

  const updateCloset = async (
    id: string,
    formData: ClosetFormData
  ): Promise<Closet> => {
    setError(null);
    const updated = await updateClosetApi(id, formData);
    setClosets((prev) => prev.map((c) => (c.id === id ? updated : c)));
    return updated;
  };

  const deleteCloset = async (id: string): Promise<void> => {
    setError(null);
    await deleteClosetApi(id);
    setClosets((prev) => prev.filter((c) => c.id !== id));
  };

  return {
    closets,
    isLoading,
    error,
    fetchClosets,
    activateTemplate,
    createCloset,
    updateCloset,
    deleteCloset,
  };
}
