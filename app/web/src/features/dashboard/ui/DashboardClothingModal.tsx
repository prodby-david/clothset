"use client";

import React, { useState } from "react";
import { Tag, Sparkles } from "lucide-react";
import Modal from "@/shared/components/ui/Modal";
import Input from "@/shared/components/ui/Input";
import Select from "@/shared/components/ui/Select";
import Button from "@/shared/components/ui/Button";
import { DashboardClothingModalProps } from "../types/dashboard.types";

const CATEGORY_OPTIONS = [
  { value: "Tops", label: "Tops & Shirts" },
  { value: "Bottoms", label: "Bottoms & Trousers" },
  { value: "Outerwear", label: "Outerwear & Jackets" },
  { value: "Footwear", label: "Footwear & Shoes" },
  { value: "Accessories", label: "Accessories & Bags" },
];

const SEASON_OPTIONS = [
  { value: "All Season", label: "All Season" },
  { value: "Spring", label: "Spring" },
  { value: "Summer", label: "Summer" },
  { value: "Autumn", label: "Autumn" },
  { value: "Winter", label: "Winter" },
];

const QUICK_COLORS = [
  "Sage Green",
  "Cream",
  "Charcoal",
  "Beige",
  "Navy",
  "White",
  "Forest Green",
  "Black",
];

export default function DashboardClothingModal({
  isOpen,
  onClose,
  onSubmit,
  closets,
}: DashboardClothingModalProps) {
  const [name, setName] = useState("");
  const [closetId, setClosetId] = useState(closets[0]?.id || "");
  const [category, setCategory] = useState("Tops");
  const [color, setColor] = useState("Sage Green");
  const [season, setSeason] = useState("All Season");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const closetOptions = closets.map((c) => ({
    value: c.id,
    label: c.name,
  }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Please enter a garment name");
      return;
    }
    if (!color.trim()) {
      setError("Please enter a primary color");
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);
      await onSubmit({
        name: name.trim(),
        closetId: closetId || closets[0]?.id || "cls_1",
        category,
        color: color.trim(),
        season,
      });
      setName("");
      setColor("Sage Green");
      onClose();
    } catch {
      setError("Failed to add garment. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add New Garment"
      description="Register a clothing piece into your digital wardrobe for daily outfit pairing."
      maxWidth="md"
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {error && (
          <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs">
            {error}
          </div>
        )}

        <Input
          label="Garment Name"
          placeholder="e.g. Oatmeal Linen Overshirt"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        {closetOptions.length > 0 && (
          <Select
            label="Assign to Capsule Closet"
            options={closetOptions}
            value={closetId || closets[0]?.id}
            onChange={(e) => setClosetId(e.target.value)}
          />
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Select
            label="Category"
            options={CATEGORY_OPTIONS}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />

          <Select
            label="Season"
            options={SEASON_OPTIONS}
            value={season}
            onChange={(e) => setSeason(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-1.5 w-full">
          <Input
            label="Primary Color"
            placeholder="e.g. Sage Green, Warm Cream"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            required
          />
          <div className="flex flex-wrap gap-1.5 pt-1">
            {QUICK_COLORS.map((quickColor) => (
              <button
                type="button"
                key={quickColor}
                onClick={() => setColor(quickColor)}
                className={`text-xs px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                  color.toLowerCase() === quickColor.toLowerCase()
                    ? "bg-forest text-white border-forest shadow-2xs"
                    : "bg-surface border-warm-gray text-charcoal hover:bg-cream"
                }`}
              >
                {quickColor}
              </button>
            ))}
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-pale-sage/40 border border-pale-sage flex items-start gap-2.5">
          <Tag className="w-4 h-4 text-forest shrink-0 mt-0.5" />
          <div className="text-xs text-charcoal">
            <span className="font-semibold block text-forest flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Smart Wardrobe Grounding
            </span>
            <span className="text-muted-gray leading-relaxed">
              This garment will be strictly paired with pieces you own in this capsule.
            </span>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-3 border-t border-warm-gray mt-1">
          <Button
            type="button"
            variant="ghost"
            onClick={onClose}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button type="submit" variant="primary" isLoading={isSubmitting}>
            Add Garment
          </Button>
        </div>
      </form>
    </Modal>
  );
}
