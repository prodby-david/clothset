"use client";

import { useState, useEffect, useCallback } from "react";
import type { Closet, ClosetFormData } from "../types/closet.types";
import { getClosetByIdApi, updateClosetApi, deleteClosetApi } from "../api/closets.api";

export function useClosetDetails(closetId: string) {
  const [closet, setCloset] = useState<Closet | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCloset = useCallback(async () => {
    if (!closetId) return;
    setIsLoading(true);
    setError(null);
    try {
      const data = await getClosetByIdApi(closetId);
      setCloset(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to load closet");
      setCloset(null);
    } finally {
      setIsLoading(false);
    }
  }, [closetId]);

  useEffect(() => {
    queueMicrotask(() => {
      void fetchCloset();
    });
  }, [fetchCloset]);

  const updateCloset = async (formData: ClosetFormData): Promise<Closet> => {
    setError(null);
    try {
      const updated = await updateClosetApi(closetId, formData);
      setCloset(updated);
      return updated;
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to update closet";
      setError(msg);
      throw err;
    }
  };

  const deleteCloset = async (): Promise<void> => {
    setError(null);
    try {
      await deleteClosetApi(closetId);
      setCloset(null);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to delete closet";
      setError(msg);
      throw err;
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
