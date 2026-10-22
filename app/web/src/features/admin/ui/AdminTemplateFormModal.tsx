"use client";

import React, { useState } from "react";
import Modal from "@/shared/components/ui/Modal";
import Input from "@/shared/components/ui/Input";
import Select from "@/shared/components/ui/Select";
import Button from "@/shared/components/ui/Button";
import type { AdminTemplateFormModalProps } from "../types/admin.types";

const CLOSET_TYPE_OPTIONS = [
  { value: "EVERYDAY", label: "Everyday / Casual" },
  { value: "WORK", label: "Work / Office" },
  { value: "FORMAL", label: "Formal / Evening" },
  { value: "SEASONAL", label: "Seasonal Rotation" },
  { value: "CAPSULE", label: "Capsule Wardrobe" },
  { value: "CUSTOM", label: "Custom / Specialized" },
];

const TIER_OPTIONS = [
  { value: "FREE", label: "FREE (Accessible to Free, Plus, Elite)" },
  { value: "PLUS", label: "PLUS (Accessible to Plus, Elite)" },
  { value: "ELITE", label: "ELITE (Accessible to Elite only)" },
];

export default function AdminTemplateFormModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}: AdminTemplateFormModalProps) {
  const [name, setName] = useState(initialData?.name || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [type, setType] = useState(initialData?.type || "EVERYDAY");
  const [minTier, setMinTier] = useState<"FREE" | "PLUS" | "ELITE">(initialData?.minTier || "FREE");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Template name is required");
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);
      await onSubmit({
        name: name.trim(),
        description: description.trim() || undefined,
        type,
        minTier,
      });
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save template");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isEdit = Boolean(initialData);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEdit ? "Edit Wardrobe Template" : "New Wardrobe Template"}
      description={
        isEdit
          ? "Update template attributes and plan tier requirements."
          : "Create a curated wardrobe template that users can choose based on their plan."
      }
      maxWidth="md"
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {error && (
          <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs">
            {error}
          </div>
        )}

        <Input
          label="Template Name"
          placeholder="e.g. Summer Vacation, Tailored Workwear"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <Input
          label="Description"
          placeholder="Brief summary of the intended collection and occasion"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Select
            label="Closet Type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            options={CLOSET_TYPE_OPTIONS}
          />

          <Select
            label="Minimum Plan Required"
            value={minTier}
            onChange={(e) => setMinTier(e.target.value as "FREE" | "PLUS" | "ELITE")}
            options={TIER_OPTIONS}
          />
        </div>

        <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-warm-gray mt-2">
          <Button type="button" variant="ghost" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" isLoading={isSubmitting}>
            {isEdit ? "Update Template" : "Create Template"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
