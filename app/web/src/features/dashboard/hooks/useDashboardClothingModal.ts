"use client";

import { useState } from "react";
import type { Closet } from "@/features/closets/types/closet.types";
import type { DashboardClothingFormData } from "../types/dashboard.types";
import { uploadImageApi } from "@/features/clothes/api/clothes.api";

interface UseDashboardClothingModalParams {
  closets: Closet[];
  onSubmit: (data: DashboardClothingFormData) => Promise<void>;
  onClose: () => void;
}

export function useDashboardClothingModal({
  closets,
  onSubmit,
  onClose,
}: UseDashboardClothingModalParams) {
  const [name, setName] = useState("");
  const [rawClosetId, setClosetId] = useState("");
  const [category, setCategory] = useState("TOPS");
  const [color, setColor] = useState("Sage Green");
  const [season, setSeason] = useState("All Season");
  const [imageUrl, setImageUrl] = useState("");
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const closetId =
    closets.length === 0
      ? ""
      : !rawClosetId || !closets.some((c) => c.id === rawClosetId)
      ? closets[0].id
      : rawClosetId;

  const closetOptions = closets.map((c) => ({
    value: c.id,
    label: c.name,
  }));

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploadingImage(true);
      setError(null);
      const reader = new FileReader();
      reader.onload = async () => {
        try {
          const dataUrl = reader.result as string;
          const { url } = await uploadImageApi(dataUrl, file.name);
          setImageUrl(url || dataUrl);
        } catch {
          setImageUrl(reader.result as string);
        } finally {
          setIsUploadingImage(false);
        }
      };
      reader.readAsDataURL(file);
    } catch {
      setIsUploadingImage(false);
    }
  };

  const handleClearImage = () => {
    setImageUrl("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (closets.length === 0) {
      setError("Please create a wardrobe before adding garments");
      return;
    }
    if (!name.trim()) {
      setError("Please enter a garment name");
      return;
    }
    if (!color.trim()) {
      setError("Please enter a primary color");
      return;
    }

    const targetClosetId = closetId || closets[0]?.id;
    if (!targetClosetId) {
      setError("Please select a valid wardrobe");
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);
      await onSubmit({
        name: name.trim(),
        closetId: targetClosetId,
        category,
        color: color.trim(),
        season,
        imageUrl: imageUrl || undefined,
        imageKey: imageUrl || undefined,
      });
      setName("");
      setColor("Sage Green");
      setImageUrl("");
      onClose();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to add garment. Please try again.";
      setError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    name,
    setName,
    closetId,
    setClosetId,
    category,
    setCategory,
    color,
    setColor,
    season,
    setSeason,
    imageUrl,
    isUploadingImage,
    handleImageChange,
    handleClearImage,
    isSubmitting,
    error,
    closetOptions,
    handleSubmit,
  };
}
