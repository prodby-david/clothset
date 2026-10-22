"use client";

import { Controller } from "react-hook-form";
import Modal from "@/shared/components/ui/Modal";
import Input from "@/shared/components/ui/Input";
import Select from "@/shared/components/ui/Select";
import Button from "@/shared/components/ui/Button";
import ClothingImageUploader from "../ui/ClothingImageUploader";
import ClothingColorPicker from "../ui/ClothingColorPicker";
import {
  type ClothingFormModalProps,
  CLOTHING_CATEGORIES,
  CLOTHING_SEASONS,
} from "../types/clothing.types";
import { useClothingForm } from "../hooks/useClothingForm";

export default function ClothingFormModal(props: ClothingFormModalProps) {
  const { isOpen, onClose } = props;
  const {
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
  } = useClothingForm(props);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? "Edit Clothing Piece" : "Add Clothing Piece"}
      description="Record details and photograph for your digital wardrobe."
      maxWidth="md"
    >
      <form onSubmit={handleSubmit(handleFormSubmit)} className="flex flex-col gap-4">
        <ClothingImageUploader
          previewUrl={previewUrl}
          onImageChange={handleImageChange}
          onClearImage={handleClearImage}
        />

        <Input
          label="Item Name"
          placeholder="e.g. Linen Button-down Shirt"
          error={errors.name?.message}
          {...register("name")}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <Select
                label="Category"
                options={CLOTHING_CATEGORIES.map((c) => ({
                  value: c.id,
                  label: c.label,
                }))}
                value={field.value}
                onChange={field.onChange}
                error={errors.category?.message}
              />
            )}
          />

          <Controller
            name="season"
            control={control}
            render={({ field }) => (
              <Select
                label="Season"
                options={CLOTHING_SEASONS.map((s) => ({
                  value: s.id,
                  label: s.label,
                }))}
                value={field.value}
                onChange={field.onChange}
                error={errors.season?.message}
              />
            )}
          />
        </div>

        <ClothingColorPicker
          value={selectedColor}
          onChange={handleColorChange}
          error={errors.color?.message}
        />

        <div className="flex items-center justify-end gap-3 pt-3 border-t border-warm-gray mt-2">
          <Button type="button" variant="outline" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            size="sm"
            isLoading={isSubmitting}
          >
            {isEditing ? "Save Changes" : "Add Item"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
