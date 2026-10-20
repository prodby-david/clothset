"use client";

import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  clothingSchema,
  ClothingFormData,
  ClothingFormModalProps,
} from "../types/clothing.types";

export function useClothingForm({
  onSubmit,
  onClose,
  initialData,
  isOpen,
}: ClothingFormModalProps) {
  const isEditing = Boolean(initialData);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ClothingFormData>({
    resolver: zodResolver(clothingSchema),
    defaultValues: {
      name: "",
      category: "tops",
      color: "White",
      season: "all-season",
      imageUrl: "",
    },
  });

  const selectedColor = useWatch({ control, name: "color" }) || "";
  const previewUrl = useWatch({ control, name: "imageUrl" }) || "";

  useEffect(() => {
    if (initialData) {
      reset({
        name: initialData.name,
        category: initialData.category,
        color: initialData.color,
        season: initialData.season,
        imageUrl: initialData.imageUrl || "",
      });
    } else {
      reset({
        name: "",
        category: "tops",
        color: "White",
        season: "all-season",
        imageUrl: "",
      });
    }
  }, [initialData, reset, isOpen]);

  const handleImageChange = (url: string) => {
    setValue("imageUrl", url, { shouldValidate: true, shouldDirty: true });
  };

  const handleClearImage = () => {
    setValue("imageUrl", "", { shouldValidate: true, shouldDirty: true });
  };

  const handleColorChange = (color: string) => {
    setValue("color", color, { shouldValidate: true, shouldDirty: true });
  };

  const handleFormSubmit = async (data: ClothingFormData) => {
    await onSubmit(data);
    onClose();
  };

  return {
    register,
    handleSubmit,
    control,
    errors,
    isSubmitting,
    isEditing,
    selectedColor,
    previewUrl,
    handleImageChange,
    handleClearImage,
    handleColorChange,
    handleFormSubmit,
  };
}
