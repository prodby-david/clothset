"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import {
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
} from "../api/clothes.api";

const LOCAL_STORAGE_KEY_PREFIX = "clothset_clothes_cache_";

const sampleClothes: Record<string, ClothingItem[]> = {
  cls_1: [
    {
      id: "clt_1",
      closetId: "cls_1",
      name: "Oversized Linen Shirt",
      category: "tops",
      color: "White",
      season: "summer",
      imageUrl: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=600&q=80",
      createdAt: new Date().toISOString(),
    },
    {
      id: "clt_2",
      closetId: "cls_1",
      name: "Pleated Relaxed Trousers",
      category: "bottoms",
      color: "Beige",
      season: "all-season",
      imageUrl: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=600&q=80",
      createdAt: new Date().toISOString(),
    },
    {
      id: "clt_3",
      closetId: "cls_1",
      name: "Minimalist Leather Loafers",
      category: "footwear",
      color: "Black",
      season: "all-season",
      imageUrl: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=600&q=80",
      createdAt: new Date().toISOString(),
    },
    {
      id: "clt_4",
      closetId: "cls_1",
      name: "Wool Blend Knit Sweater",
      category: "tops",
      color: "Sage Green",
      season: "fall",
      imageUrl: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=600&q=80",
      createdAt: new Date().toISOString(),
    },
  ],
  cls_2: [
    {
      id: "clt_5",
      closetId: "cls_2",
      name: "Single-Breasted Tailored Blazer",
      category: "outerwear",
      color: "Charcoal",
      season: "all-season",
      imageUrl: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80",
      createdAt: new Date().toISOString(),
    },
    {
      id: "clt_6",
      closetId: "cls_2",
      name: "Crisp Poplin Button-Down",
      category: "tops",
      color: "White",
      season: "all-season",
      imageUrl: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=600&q=80",
      createdAt: new Date().toISOString(),
    },
  ],
};

function getStoredClothes(closetId: string): ClothingItem[] {
  if (typeof window === "undefined" || !closetId) return [];
  const storageKey = `${LOCAL_STORAGE_KEY_PREFIX}${closetId}`;
  const raw = localStorage.getItem(storageKey);
  if (!raw) {
    const defaults = sampleClothes[closetId] || [];
    localStorage.setItem(storageKey, JSON.stringify(defaults));
    return defaults;
  }
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function useClothes(closetId: string) {
  const [clothes, setClothes] = useState<ClothingItem[]>(() =>
    getStoredClothes(closetId)
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [selectedCategory, setSelectedCategory] = useState<
    ClothingCategoryId | "all"
  >("all");
  const [selectedSeason, setSelectedSeason] = useState<
    ClothingSeasonId | "all"
  >("all");

  const storageKey = `${LOCAL_STORAGE_KEY_PREFIX}${closetId}`;

  const setCachedItems = useCallback(
    (items: ClothingItem[]) => {
      if (typeof window !== "undefined") {
        localStorage.setItem(storageKey, JSON.stringify(items));
      }
      setClothes(items);
    },
    [storageKey]
  );

  const fetchClothes = useCallback(async () => {
    if (!closetId) return;
    setIsLoading(true);
    setError(null);
    try {
      const data = await getClothesByClosetApi(closetId);
      setClothes(data);
      if (typeof window !== "undefined") {
        localStorage.setItem(storageKey, JSON.stringify(data));
      }
    } catch {
      setClothes(getStoredClothes(closetId));
    } finally {
      setIsLoading(false);
    }
  }, [closetId, storageKey]);

  useEffect(() => {
    if (!closetId) return;
    let isMounted = true;
    getClothesByClosetApi(closetId)
      .then((data) => {
        if (isMounted) {
          setClothes(data);
          if (typeof window !== "undefined") {
            localStorage.setItem(storageKey, JSON.stringify(data));
          }
        }
      })
      .catch(() => {
        if (isMounted) {
          setClothes(getStoredClothes(closetId));
        }
      });

    return () => {
      isMounted = false;
    };
  }, [closetId, storageKey]);

  const addClothing = async (formData: ClothingFormData): Promise<ClothingItem> => {
    setError(null);
    try {
      const created = await createClothingApi(closetId, formData);
      setClothes((prev) => [created, ...prev]);
      return created;
    } catch {
      const fallback: ClothingItem = {
        id: `clt_${Date.now()}`,
        closetId,
        name: formData.name,
        category: formData.category as ClothingCategoryId,
        color: formData.color,
        season: formData.season as ClothingSeasonId,
        imageUrl: formData.imageUrl,
        createdAt: new Date().toISOString(),
      };
      const updated = [fallback, ...getStoredClothes(closetId)];
      setCachedItems(updated);
      return fallback;
    }
  };

  const updateClothing = async (
    clothingId: string,
    formData: ClothingFormData
  ): Promise<ClothingItem> => {
    setError(null);
    try {
      const updated = await updateClothingApi(clothingId, formData);
      setClothes((prev) => prev.map((item) => (item.id === clothingId ? updated : item)));
      return updated;
    } catch {
      const currentList = getStoredClothes(closetId);
      const updatedList = currentList.map((item) =>
        item.id === clothingId
          ? {
              ...item,
              name: formData.name,
              category: formData.category as ClothingCategoryId,
              color: formData.color,
              season: formData.season as ClothingSeasonId,
              imageUrl: formData.imageUrl,
              updatedAt: new Date().toISOString(),
            }
          : item
      );
      setCachedItems(updatedList);
      const target = updatedList.find((i) => i.id === clothingId);
      if (!target) throw new Error("Item not found");
      return target;
    }
  };

  const deleteClothing = async (clothingId: string): Promise<void> => {
    setError(null);
    try {
      await deleteClothingApi(clothingId);
      setClothes((prev) => prev.filter((item) => item.id !== clothingId));
    } catch {
      const updated = getStoredClothes(closetId).filter((item) => item.id !== clothingId);
      setCachedItems(updated);
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
