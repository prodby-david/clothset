"use client";

import { useRef } from "react";
import { ClothingImageUploaderProps } from "../types/clothing.types";

export function useImageUpload({
  onImageChange,
  onClearImage,
}: Pick<ClothingImageUploaderProps, "onImageChange" | "onClearImage">) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        onImageChange(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClear = () => {
    onClearImage();
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return {
    fileInputRef,
    handleFileChange,
    handleClear,
    triggerFileInput,
  };
}
