"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import type {
  ClothingItem,
  ClothingFormData,
  ClothingCategoryId,
  ClothingSeasonId,
} from "../types/clothing.types";
import {
  getClothesByClosetApi,
  createClothingApi,
  updateClothingApi,
  deleteClothingApi,
  type ApiClothingItem,
  type CreateClothingPayload,
} from "../api/clothes.api";
import { normalizeCategory, normalizeSeason } from "../lib/garment-store";

function toClothingCategoryUpper(cat: string): CreateClothingPayload["category"] {
  const norm = (cat || "").toLowerCase();
  if (norm.startsWith("top") || norm.startsWith("shirt")) return "TOPS";
  if (norm.startsWith("bottom") || norm.startsWith("pant") || norm.startsWith("trouser")) return "BOTTOMS";
  if (norm.startsWith("outer") || norm.startsWith("jacket") || norm.startsWith("coat")) return "OUTERWEAR";
  if (norm.startsWith("dress") || norm.startsWith("skirt")) return "DRESSES";
  if (norm.startsWith("foot") || norm.startsWith("shoe") || norm.startsWith("boot")) return "FOOTWEAR";
  if (norm.startsWith("access") || norm.startsWith("bag")) return "ACCESSORIES";
  return "OTHER";
}

function toClothingCategoryId(cat: string): ClothingCategoryId {
  const norm = normalizeCategory(cat).toLowerCase();
  if (norm === "bottoms") return "bottoms";
  if (norm === "outerwear") return "outerwear";
  if (norm === "footwear") return "footwear";
  if (norm === "accessories") return "accessories";
  return "tops";
}

function toClothingSeasonId(season: string): ClothingSeasonId {
  const norm = normalizeSeason(season).toLowerCase();
  if (norm.includes("spring")) return "spring";
  if (norm.includes("summer")) return "summer";
  if (norm.includes("autumn") || norm.includes("fall")) return "fall";
  if (norm.includes("winter")) return "winter";
  return "all-season";
}

function apiItemToClothingItem(item: ApiClothingItem): ClothingItem {
  const norm = normalizeCategory(item.category);
  return {
    id: item.id,
    closetId: item.closetId,
    name: item.name,
    category: toClothingCategoryId(norm),
    color: item.color || "Neutral",
    season: toClothingSeasonId(item.seasons?.[0] || "all-season"),
    imageUrl: item.imageKey || item.thumbnailKey || undefined,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
  };
}

export function useClothes(closetId: string) {
  const [clothes, setClothes] = useState<ClothingItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedCategory, setSelectedCategory] = useState<ClothingCategoryId | "all">("all");
  const [selectedSeason, setSelectedSeason] = useState<ClothingSeasonId | "all">("all");

  const fetchClothes = useCallback(async () => {
    if (!closetId) {
      setClothes([]);
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const data = await getClothesByClosetApi(closetId);
      setClothes(data.map(apiItemToClothingItem));
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to load clothes");
      setClothes([]);
    } finally {
      setIsLoading(false);
    }
  }, [closetId]);

  useEffect(() => {
    queueMicrotask(() => {
      void fetchClothes();
    });
  }, [fetchClothes]);

  const addClothing = async (formData: ClothingFormData): Promise<ClothingItem> => {
    setError(null);
    const catUpper = toClothingCategoryUpper(formData.category);
    try {
      const created = await createClothingApi(closetId, {
        name: formData.name,
        category: catUpper,
        color: formData.color,
        seasons: [formData.season],
        imageKey: formData.imageUrl,
      });
      const mapped = apiItemToClothingItem(created);
      setClothes((prev) => [mapped, ...prev]);
      return mapped;
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to create clothing item";
      setError(msg);
      throw err;
    }
  };

  const updateClothing = async (
    clothingId: string,
    formData: ClothingFormData
  ): Promise<ClothingItem> => {
    setError(null);
    const catUpper = toClothingCategoryUpper(formData.category);
    try {
      const updated = await updateClothingApi(clothingId, {
        name: formData.name,
        category: catUpper,
        color: formData.color,
        seasons: [formData.season],
        imageKey: formData.imageUrl,
      });
      const mapped = apiItemToClothingItem(updated);
      setClothes((prev) => prev.map((item) => (item.id === clothingId ? mapped : item)));
      return mapped;
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to update clothing item";
      setError(msg);
      throw err;
    }
  };

  const deleteClothing = async (clothingId: string): Promise<void> => {
    setError(null);
    try {
      await deleteClothingApi(clothingId);
      setClothes((prev) => prev.filter((item) => item.id !== clothingId));
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to delete clothing item";
      setError(msg);
      throw err;
    }
  };

  const filteredClothes = useMemo(() => {
    return clothes.filter((item) => {
      const matchesCategory =
        selectedCategory === "all" || item.category === selectedCategory;
      const matchesSeason =
        selectedSeason === "all" || item.season === selectedSeason;
      return matchesCategory && matchesSeason;
    });
  }, [clothes, selectedCategory, selectedSeason]);

  return {
    clothes: filteredClothes,
    allClothesCount: clothes.length,
    isLoading,
    error,
    selectedCategory,
    selectedSeason,
    setSelectedCategory,
    setSelectedSeason,
    addClothing,
    updateClothing,
    deleteClothing,
    refresh: fetchClothes,
  };
}
