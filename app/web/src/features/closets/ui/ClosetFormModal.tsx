"use client";

import { Controller } from "react-hook-form";
import { Sparkles } from "lucide-react";
import Modal from "@/shared/components/ui/Modal";
import Input from "@/shared/components/ui/Input";
import Textarea from "@/shared/components/ui/Textarea";
import Button from "@/shared/components/ui/Button";
import ClosetTypeSelector from "./ClosetTypeSelector";
import type { ClosetFormModalProps } from "../types/closet.types";
import { useClosetForm } from "../hooks/useClosetForm";

export default function ClosetFormModal(props: ClosetFormModalProps) {
  const { isOpen, onClose } = props;

  const {
    register,
    handleSubmit,
    control,
    errors,
    isSubmitting,
    isEditing,
    handleTypeChange,
    handleFormSubmit,
  } = useClosetForm(props);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? "Edit Wardrobe" : "Create New Wardrobe"}
      description={
        isEditing
          ? "Update details, type, or capacity for this wardrobe."
          : "Choose a wardrobe type and configure maximum capacity to organize your collection."
      }
      maxWidth="lg"
    >
      <form onSubmit={handleSubmit(handleFormSubmit)} className="flex flex-col gap-5">
        <Controller
          name="type"
          control={control}
          render={({ field }) => (
            <ClosetTypeSelector
              value={field.value}
              onChange={(newType) => handleTypeChange(newType)}
              error={errors.type?.message}
            />
          )}
        />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="sm:col-span-2">
            <Input
              label="Wardrobe Name"
              placeholder="e.g. Summer Outfits or Work Essentials"
              error={errors.name?.message}
              {...register("name")}
            />
          </div>
          <div>
            <Input
              type="number"
              label="Capacity (Max Pieces)"
              placeholder="50"
              min={5}
              max={300}
              error={errors.maxSize?.message}
              {...register("maxSize", { valueAsNumber: true })}
            />
          </div>
        </div>

        <Textarea
          label="Description (Optional)"
          placeholder="A brief note about what goes into this wardrobe..."
          error={errors.description?.message}
          {...register("description")}
        />

        <div className="p-3.5 rounded-xl bg-pale-sage/40 border border-pale-sage flex items-start gap-2.5">
          <Sparkles className="w-4 h-4 text-forest dark:text-sage shrink-0 mt-0.5" />
          <div className="text-xs text-charcoal">
            <span className="font-semibold block text-forest dark:text-sage">Wardrobe Capacity Rules</span>
            <span className="text-muted-gray leading-relaxed">
              Clothset uses your selected wardrobe limit to balance rotation frequency and recommend high-utility pieces.
            </span>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-3 border-t border-warm-gray">
          <Button type="button" variant="outline" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            size="sm"
            isLoading={isSubmitting}
          >
            {isEditing ? "Save Changes" : "Create Wardrobe"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
