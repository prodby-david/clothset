"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { Tag, AlertCircle, UploadCloud, X, Loader2 } from "lucide-react";
import Modal from "@/shared/components/ui/Modal";
import Input from "@/shared/components/ui/Input";
import Select from "@/shared/components/ui/Select";
import Button from "@/shared/components/ui/Button";
import type { DashboardClothingModalProps } from "../types/dashboard.types";
import { useDashboardClothingModal } from "../hooks/useDashboardClothingModal";
import {
  CATEGORY_OPTIONS,
  SEASON_OPTIONS,
  QUICK_COLORS,
} from "../constants/dashboard.constants";

export default function DashboardClothingModal({
  isOpen,
  onClose,
  onSubmit,
  closets,
}: DashboardClothingModalProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
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
  } = useDashboardClothingModal({ closets, onSubmit, onClose });

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add New Garment"
      description="Register a clothing piece into your digital wardrobe."
      maxWidth="md"
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {error && (
          <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs">
            {error}
          </div>
        )}

        {closets.length === 0 && (
          <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 dark:bg-amber-950/40 dark:border-amber-800 dark:text-amber-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-amber-600 dark:text-amber-400" />
            <span>You need at least one wardrobe before cataloging clothes.</span>
          </div>
        )}

        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-muted-gray block mb-1.5">
            Garment Photo
          </label>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
          {imageUrl ? (
            <div className="relative w-full h-36 rounded-2xl overflow-hidden border border-warm-gray bg-cream dark:bg-[#151a16]">
              <Image
                src={imageUrl}
                alt="Garment preview"
                fill
                className="object-cover object-center"
              />
              <button
                type="button"
                onClick={handleClearImage}
                className="absolute top-2 right-2 p-1.5 rounded-full bg-black/70 text-white hover:bg-black/90 transition-colors cursor-pointer"
                aria-label="Remove image"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              disabled={isUploadingImage}
              onClick={() => fileInputRef.current?.click()}
              className="w-full h-24 rounded-2xl border-2 border-dashed border-warm-gray hover:border-sage bg-cream/30 dark:bg-[#151a16] hover:bg-cream/60 dark:hover:bg-[#1c231e] flex flex-col items-center justify-center gap-1 text-muted-gray hover:text-forest dark:hover:text-sage transition-colors cursor-pointer"
            >
              {isUploadingImage ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin text-forest dark:text-sage" />
                  <span className="text-xs font-medium">Uploading image...</span>
                </>
              ) : (
                <>
                  <UploadCloud className="w-5 h-5 text-sage" />
                  <span className="text-xs font-semibold">Upload Photo (optional)</span>
                  <span className="text-[11px] text-muted-gray">PNG, JPG, or WEBP</span>
                </>
              )}
            </button>
          )}
        </div>

        <Input
          label="Garment Name"
          placeholder="e.g., Heavyweight Boxy Tee, Relaxed Linen Pants"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Select
            label="Assign Wardrobe"
            value={closetId}
            onChange={(e) => setClosetId(e.target.value)}
            options={closetOptions}
            disabled={closets.length === 0}
          />

          <Select
            label="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            options={CATEGORY_OPTIONS}
          />
        </div>

        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-muted-gray block mb-1.5">
            Primary Color
          </label>
          <div className="flex flex-wrap gap-1.5 mb-2">
            {QUICK_COLORS.map((c) => (
              <button
                type="button"
                key={c}
                onClick={() => setColor(c)}
                className={`text-xs px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                  color === c
                    ? "bg-forest text-white border-forest font-medium"
                    : "bg-surface border-warm-gray text-charcoal hover:bg-cream"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
          <Input
            placeholder="Or type a custom tone (e.g. Oatmeal, Rust, Slate Blue)"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            required
          />
        </div>

        <Select
          label="Seasonal Suitability"
          value={season}
          onChange={(e) => setSeason(e.target.value)}
          options={SEASON_OPTIONS}
        />

        <div className="p-3.5 rounded-xl bg-cream/50 dark:bg-[#151a16] border border-warm-gray/70 text-xs text-muted-gray flex items-start gap-2.5 mt-1">
          <Tag className="w-4 h-4 text-forest dark:text-sage shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            Garments are cataloged directly in your selected wardrobe and count towards its capacity limit.
          </p>
        </div>

        <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-warm-gray">
          <Button type="button" variant="ghost" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            isLoading={isSubmitting}
            disabled={closets.length === 0 || isUploadingImage}
            className="gap-1.5"
          >
            <Tag className="w-4 h-4" />
            <span>Add to Wardrobe</span>
          </Button>
        </div>
      </form>
    </Modal>
  );
}
