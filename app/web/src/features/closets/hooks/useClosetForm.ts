"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CLOSET_TYPES,
  closetSchema,
  ClosetFormData,
  ClosetFormModalProps,
} from "../types/closet.types";

export function useClosetForm({
  onSubmit,
  onClose,
  initialData,
  isOpen,
}: ClosetFormModalProps) {
  const isEditing = Boolean(initialData);

  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ClosetFormData>({
    resolver: zodResolver(closetSchema),
    defaultValues: {
      type: "everyday",
      name: "",
      description: "",
      maxSize: 50,
    },
  });

  useEffect(() => {
    if (initialData) {
      reset({
        type: initialData.type,
        name: initialData.name,
        description: initialData.description || "",
        maxSize: initialData.maxSize || 50,
      });
    } else {
      const defaultCapacity =
        CLOSET_TYPES.find((t) => t.id === "everyday")?.defaultMaxSize || 50;
      reset({
        type: "everyday",
        name: "",
        description: "",
        maxSize: defaultCapacity,
      });
    }
  }, [initialData, reset, isOpen]);

  const handleTypeChange = (newType: string) => {
    setValue("type", newType, { shouldValidate: true });
    if (!initialData) {
      const matched = CLOSET_TYPES.find((t) => t.id === newType);
      if (matched?.defaultMaxSize) {
        setValue("maxSize", matched.defaultMaxSize, { shouldValidate: true });
      }
    }
  };

  const handleFormSubmit = async (data: ClosetFormData) => {
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
    handleTypeChange,
    handleFormSubmit,
  };
}
