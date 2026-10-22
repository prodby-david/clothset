"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useClosetDetails } from "./useClosetDetails";
import { useClosetCapacity } from "./useClosetCapacity";
import { useClothes } from "@/features/clothes/hooks/useClothes";
import { CLOSET_TYPES, type ClosetFormData } from "../types/closet.types";
import type { ClothingItem, ClothingFormData } from "@/features/clothes/types/clothing.types";
import { useAuth } from "@/features/auth/hooks/useAuth";

export function useClosetDetailView(closetId: string) {
  const router = useRouter();
  const { user, logout } = useAuth();

  const {
    closet,
    isLoading: isClosetLoading,
    updateCloset,
    deleteCloset,
  } = useClosetDetails(closetId);

  const {
    clothes,
    allClothesCount,
    isLoading: isClothesLoading,
    selectedCategory,
    selectedSeason,
    setSelectedCategory,
    setSelectedSeason,
    addClothing,
    updateClothing,
    deleteClothing,
  } = useClothes(closetId);

  const [isAddClothingOpen, setIsAddClothingOpen] = useState<boolean>(false);
  const [editingClothing, setEditingClothing] = useState<ClothingItem | null>(null);
  const [deletingClothing, setDeletingClothing] = useState<ClothingItem | null>(null);

  const [isEditClosetOpen, setIsEditClosetOpen] = useState<boolean>(false);
  const [isDeleteClosetOpen, setIsDeleteClosetOpen] = useState<boolean>(false);

  const typePreset = CLOSET_TYPES.find((t) => t.id === closet?.type);
  const typeTitle = typePreset ? typePreset.title : closet?.type || "Closet";
  const capacity = useClosetCapacity(closet?.type, allClothesCount);

  const handleClothingSubmit = async (data: ClothingFormData) => {
    if (editingClothing) {
      await updateClothing(editingClothing.id, data);
      setEditingClothing(null);
    } else {
      await addClothing(data);
    }
  };

  const handleClothingDeleteConfirm = async () => {
    if (deletingClothing) {
      await deleteClothing(deletingClothing.id);
      setDeletingClothing(null);
    }
  };

  const handleClosetEditSubmit = async (data: ClosetFormData) => {
    await updateCloset(data);
  };

  const handleClosetDeleteConfirm = async () => {
    await deleteCloset();
    router.push("/dashboard");
  };

  return {
    user,
    logout,
    closet,
    isClosetLoading,
    clothes,
    allClothesCount,
    isClothesLoading,
    selectedCategory,
    selectedSeason,
    setSelectedCategory,
    setSelectedSeason,
    typeTitle,
    capacity,
    isAddClothingOpen,
    setIsAddClothingOpen,
    editingClothing,
    setEditingClothing,
    deletingClothing,
    setDeletingClothing,
    isEditClosetOpen,
    setIsEditClosetOpen,
    isDeleteClosetOpen,
    setIsDeleteClosetOpen,
    handleClothingSubmit,
    handleClothingDeleteConfirm,
    handleClosetEditSubmit,
    handleClosetDeleteConfirm,
  };
}
