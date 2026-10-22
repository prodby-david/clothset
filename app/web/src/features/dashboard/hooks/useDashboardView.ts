"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useClosets } from "@/features/closets/hooks/useClosets";
import type { Closet, ClosetFormData } from "@/features/closets/types/closet.types";
import type {
  RecentGarment,
  DashboardClothingFormData,
  DashboardTab,
} from "../types/dashboard.types";
import { useAuth } from "@/features/auth/hooks/useAuth";
import {
  normalizeCategory,
  CATEGORY_IMAGE_FALLBACKS,
} from "@/features/clothes/lib/garment-store";
import {
  getAllClothesApi,
  createClothingApi,
  deleteClothingApi,
  type CreateClothingPayload,
} from "@/features/clothes/api/clothes.api";

export function useDashboardView() {
  const { user, logout } = useAuth();
  const userId = user?.id;
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const {
    closets,
    isLoading,
    activateTemplate,
    createCloset,
    updateCloset,
    deleteCloset,
  } = useClosets();

  const normalizedPlan = (user?.plan || "FREE").toUpperCase();
  const maxClosets = normalizedPlan === "ELITE" ? 8 : normalizedPlan === "PLUS" ? 5 : 2;
  const planLimit =
    normalizedPlan === "ELITE"
      ? 400
      : normalizedPlan === "PLUS"
      ? 150
      : 40;

  const urlTab = searchParams.get("tab") as DashboardTab | null;
  const activeTab: DashboardTab =
    urlTab && ["overview", "wardrobes", "clothes"].includes(urlTab)
      ? urlTab
      : "overview";

  const selectedWardrobeId: string = searchParams.get("closetId") || "all";

  const [isCatalogOpen, setIsCatalogOpen] = useState<boolean>(false);
  const [hasAutoPrompted, setHasAutoPrompted] = useState<boolean>(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [editingCloset, setEditingCloset] = useState<Closet | null>(null);
  const [deletingCloset, setDeletingCloset] = useState<Closet | null>(null);
  const [isAddGarmentOpen, setIsAddGarmentOpen] = useState<boolean>(false);

  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [recentGarments, setRecentGarments] = useState<RecentGarment[]>([]);

  const fetchGarments = useCallback(async () => {
    if (!userId) {
      setRecentGarments([]);
      return;
    }
    try {
      const items = await getAllClothesApi();
      const mapped: RecentGarment[] = items.map((item) => {
        const closet = closets.find((c) => c.id === item.closetId);
        const norm = normalizeCategory(item.category);
        return {
          id: item.id,
          name: item.name,
          category: item.category,
          color: item.color || "Neutral",
          season: item.seasons?.[0] || "All Season",
          closetId: item.closetId,
          closetName: closet?.name || "Wardrobe",
          imageUrl:
            item.imageKey ||
            item.thumbnailKey ||
            CATEGORY_IMAGE_FALLBACKS[norm] ||
            CATEGORY_IMAGE_FALLBACKS.Tops,
        };
      });
      setRecentGarments(mapped);
    } catch {
      setRecentGarments([]);
    }
  }, [userId, closets]);

  useEffect(() => {
    queueMicrotask(() => {
      void fetchGarments();
    });
  }, [fetchGarments]);

  const handleSelectTab = useCallback(
    (tab: DashboardTab, closetId?: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("tab", tab);
      if (closetId !== undefined) {
        if (closetId === "all") {
          params.delete("closetId");
        } else {
          params.set("closetId", closetId);
        }
      } else if (tab !== "clothes") {
        params.delete("closetId");
      }
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [pathname, router, searchParams]
  );

  const handleSelectWardrobe = useCallback(
    (id: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("tab", "clothes");
      if (id === "all") {
        params.delete("closetId");
      } else {
        params.set("closetId", id);
      }
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [pathname, router, searchParams]
  );

  const setSelectedWardrobeId = useCallback(
    (id: string) => {
      handleSelectWardrobe(id);
    },
    [handleSelectWardrobe]
  );

  const setActiveTab = useCallback(
    (tab: DashboardTab) => {
      handleSelectTab(tab);
    },
    [handleSelectTab]
  );

  const totalClothesCount = recentGarments.length;

  const filteredGarments = useMemo(() => {
    return recentGarments.filter((g) => {
      const matchesWardrobe =
        selectedWardrobeId === "all" || g.closetId === selectedWardrobeId;
      return matchesWardrobe;
    });
  }, [recentGarments, selectedWardrobeId]);

  useEffect(() => {
    if (!isLoading && closets.length === 0 && !hasAutoPrompted) {
      queueMicrotask(() => {
        setIsCatalogOpen(true);
        setHasAutoPrompted(true);
      });
    }
  }, [isLoading, closets.length, hasAutoPrompted]);

  const handleCreateSubmit = async (data: ClosetFormData) => {
    const created = await createCloset(data);
    handleSelectWardrobe(created.id);
  };

  const handleActivateTemplate = async (templateId: string) => {
    const created = await activateTemplate(templateId);
    handleSelectWardrobe(created.id);
  };

  const handleUpdateSubmit = async (data: ClosetFormData) => {
    if (editingCloset) {
      await updateCloset(editingCloset.id, data);
      setEditingCloset(null);
    }
  };

  const handleDeleteConfirm = async () => {
    if (deletingCloset) {
      const deletedId = deletingCloset.id;
      await deleteCloset(deletedId);
      if (selectedWardrobeId === deletedId) {
        setSelectedWardrobeId("all");
      }
      setRecentGarments((prev) => prev.filter((g) => g.closetId !== deletedId));
      setDeletingCloset(null);
    }
  };

  const handleAddGarmentSubmit = async (data: DashboardClothingFormData) => {
    const targetCloset = closets.find((c) => c.id === data.closetId);
    const cat = (data.category || "TOPS").toUpperCase() as CreateClothingPayload["category"];

    const created = await createClothingApi(data.closetId, {
      name: data.name,
      category: cat,
      color: data.color,
      seasons: [data.season],
      imageKey: data.imageUrl || data.imageKey,
    });

    const newGarment: RecentGarment = {
      id: created.id,
      name: created.name,
      category: created.category,
      color: created.color || data.color,
      season: data.season,
      closetId: created.closetId,
      closetName: targetCloset?.name || "Wardrobe",
      imageUrl:
        created.imageKey ||
        data.imageUrl ||
        CATEGORY_IMAGE_FALLBACKS[created.category] ||
        CATEGORY_IMAGE_FALLBACKS.Tops,
    };

    setRecentGarments((prev) => [newGarment, ...prev]);
  };

  const handleDeleteGarment = async (clothingId: string) => {
    await deleteClothingApi(clothingId);
    setRecentGarments((prev) => prev.filter((g) => g.id !== clothingId));
  };

  return {
    user,
    logout,
    closets,
    isLoading,
    totalClothesCount,
    planLimit,
    isCatalogOpen,
    setIsCatalogOpen,
    handleActivateTemplate,
    maxClosets,
    isCreateModalOpen,
    setIsCreateModalOpen,
    editingCloset,
    setEditingCloset,
    deletingCloset,
    setDeletingCloset,
    isAddGarmentOpen,
    setIsAddGarmentOpen,
    activeTab,
    setActiveTab,
    handleSelectTab,
    handleSelectWardrobe,
    recentGarments,
    filteredGarments,
    selectedWardrobeId,
    setSelectedWardrobeId,
    selectedCategory,
    setSelectedCategory,
    handleCreateSubmit,
    handleUpdateSubmit,
    handleDeleteConfirm,
    handleAddGarmentSubmit,
    handleDeleteGarment,
  };
}
