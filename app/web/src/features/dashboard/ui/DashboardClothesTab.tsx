"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import {
  Shirt,
  Plus,
  SlidersHorizontal,
  FolderPlus,
  AlertTriangle,
  Trash2,
} from "lucide-react";
import Card from "@/shared/components/ui/Card";
import Badge from "@/shared/components/ui/Badge";
import Button from "@/shared/components/ui/Button";
import EmptyState from "@/shared/components/ui/EmptyState";
import type { DashboardClothesTabProps } from "../types/dashboard.types";
import {
  CLOSET_TYPE_ICONS,
  DASHBOARD_CATEGORIES,
  CLOTHING_SUBCATEGORIES,
} from "../constants/dashboard.constants";

export default function DashboardClothesTab({
  closets,
  selectedWardrobeId,
  onSelectWardrobe,
  selectedCategory,
  onSelectCategory,
  garments,
  onAddNewGarment,
  onDeleteGarment,
  onNavigateTab,
}: DashboardClothesTabProps) {
  const [subCategory, setSubCategory] = useState<string>("all_clothing");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const displayedGarments = useMemo(() => {
    return garments.filter((g) => {
      if (selectedCategory === "all") return true;

      const norm = (g.category || "").toUpperCase();
      if (selectedCategory === "Clothing") {
        const isClothing = ["TOPS", "BOTTOMS", "OUTERWEAR", "DRESSES"].includes(norm);
        if (!isClothing) return false;
        if (subCategory === "all_clothing") return true;
        return norm === subCategory.toUpperCase();
      }

      if (selectedCategory === "Footwear") {
        return norm === "FOOTWEAR";
      }

      if (selectedCategory === "Accessories") {
        return norm === "ACCESSORIES";
      }

      if (selectedCategory === "Other") {
        return norm === "OTHER" || (!["TOPS", "BOTTOMS", "OUTERWEAR", "DRESSES", "FOOTWEAR", "ACCESSORIES"].includes(norm));
      }

      return true;
    });
  }, [garments, selectedCategory, subCategory]);

  if (closets.length === 0) {
    return (
      <EmptyState
        icon={<FolderPlus className="w-6 h-6" />}
        title="Create a wardrobe first"
        description="To catalog and organize your clothes, start by creating your first wardrobe collection."
        actionLabel="Create Wardrobe"
        onAction={() => (onNavigateTab ? onNavigateTab("wardrobes") : undefined)}
      />
    );
  }

  const currentCloset = closets.find((c) => c.id === selectedWardrobeId);
  const isAll = selectedWardrobeId === "all";

  const getWardrobeIcon = (type?: string) => {
    const Icon = (type && CLOSET_TYPE_ICONS[type]) || Shirt;
    return <Icon className="w-4 h-4 shrink-0" />;
  };

  const currentCount = isAll
    ? garments.length
    : currentCloset?.clothesCount ?? garments.filter((g) => g.closetId === selectedWardrobeId).length;

  const currentMax = isAll
    ? closets.reduce((acc, c) => acc + (c.maxSize || c.maxItems || 20), 0)
    : currentCloset?.maxSize || currentCloset?.maxItems || 20;

  const isAtCapacity = !isAll && currentCount >= currentMax;
  const capacityPct = Math.min(100, Math.round((currentCount / currentMax) * 100));

  const handleDelete = async (id: string) => {
    if (onDeleteGarment) {
      setDeletingId(id);
      try {
        await onDeleteGarment(id);
      } finally {
        setDeletingId(null);
      }
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-5 sm:p-6 rounded-2xl bg-surface border border-warm-gray shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-pale-sage text-forest dark:text-sage flex items-center justify-center shrink-0">
            {getWardrobeIcon(currentCloset?.type)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold text-charcoal tracking-tight">
                {isAll ? "All Wardrobes & Pieces" : currentCloset?.name}
              </h1>
              {!isAll && currentCloset?.type && (
                <Badge variant="secondary" className="capitalize text-xs">
                  {currentCloset.type}
                </Badge>
              )}
            </div>
            <p className="text-xs sm:text-sm text-muted-gray mt-0.5">
              {isAll
                ? `Showing ${garments.length} pieces across all your wardrobes`
                : currentCloset?.description || "Curated wardrobe collection"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          {!isAll && (
            <div className="hidden sm:flex flex-col items-end text-xs">
              <span className={`font-mono font-bold ${isAtCapacity ? "text-amber-600 dark:text-amber-400" : "text-forest dark:text-sage"}`}>
                {currentCount} / {currentMax} pieces
              </span>
              <span className="text-muted-gray">{capacityPct}% capacity</span>
            </div>
          )}

          <Button
            variant="primary"
            size="md"
            onClick={onAddNewGarment}
            disabled={isAtCapacity}
            className="gap-2 text-sm h-9 px-4 shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>{isAtCapacity ? "Capacity Reached" : "Add Garment"}</span>
          </Button>
        </div>
      </div>

      {!isAll && (
        <div className="p-4 rounded-2xl bg-surface border border-warm-gray flex flex-col gap-2">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className="text-charcoal font-medium">Wardrobe Capacity</span>
            <span className={`font-mono ${isAtCapacity ? "text-amber-600 dark:text-amber-400 font-bold" : "text-sage"}`}>
              {currentCount} / {currentMax} pieces ({capacityPct}%)
            </span>
          </div>
          <div className="w-full h-2 rounded-full bg-warm-gray/40 dark:bg-[#252f27] overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-300 ${
                isAtCapacity ? "bg-amber-600 dark:bg-amber-500" : "bg-forest dark:bg-sage"
              }`}
              style={{ width: `${capacityPct}%` }}
            />
          </div>
        </div>
      )}

      {isAtCapacity && (
        <div className="p-3.5 sm:p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-300 text-xs flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
            <span>
              Wardrobe capacity reached ({currentCount}/{currentMax} pieces). Remove an item before adding more pieces to this wardrobe.
            </span>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-3 p-3.5 rounded-2xl bg-surface border border-warm-gray">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-center gap-2 min-w-0">
            <div className="flex items-center gap-1.5 text-xs font-bold text-muted-gray shrink-0 pl-1">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Wardrobe:</span>
            </div>
            <select
              value={selectedWardrobeId}
              onChange={(e) => onSelectWardrobe(e.target.value)}
              className="text-xs font-semibold text-charcoal bg-surface dark:bg-[#18201a] hover:bg-cream border border-warm-gray rounded-xl px-3 py-1.5 focus:outline-hidden focus:ring-2 focus:ring-sage/40 transition-colors cursor-pointer max-w-[220px] truncate"
              aria-label="Filter by wardrobe"
            >
              <option value="all">All Wardrobes ({closets.length})</option>
              {closets.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.clothesCount ?? 0} pieces)
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            {DASHBOARD_CATEGORIES.map((cat) => {
              const isCatActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => {
                    onSelectCategory(cat.id);
                    if (cat.id !== "Clothing") {
                      setSubCategory("all_clothing");
                    }
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    isCatActive
                      ? "bg-forest text-white shadow-xs"
                      : "text-charcoal bg-warm-gray/30 dark:bg-[#151a16] hover:bg-pale-sage/30 dark:hover:bg-[#243026] hover:text-forest dark:hover:text-sage"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {selectedCategory === "Clothing" && (
          <div className="flex items-center gap-1.5 pt-2 border-t border-warm-gray/60 overflow-x-auto scrollbar-none pl-1">
            <span className="text-[11px] font-bold text-muted-gray uppercase tracking-wider mr-1">
              Subcategory:
            </span>
            {CLOTHING_SUBCATEGORIES.map((sub) => {
              const isSubActive = subCategory === sub.id;
              return (
                <button
                  key={sub.id}
                  type="button"
                  onClick={() => setSubCategory(sub.id)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                    isSubActive
                      ? "bg-pale-sage text-forest dark:text-sage font-bold border border-sage/40"
                      : "text-muted-gray hover:text-charcoal bg-warm-gray/20 dark:bg-[#151a16] hover:bg-warm-gray/40 dark:hover:bg-[#1c231e]"
                  }`}
                >
                  {sub.label}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {displayedGarments.length === 0 ? (
        <EmptyState
          icon={<Shirt className="w-6 h-6" />}
          title="No pieces cataloged"
          description={
            isAll
              ? "You haven't cataloged any clothes in this category yet. Add your first piece to your wardrobe."
              : `No pieces matching this category inside "${currentCloset?.name}".`
          }
          actionLabel={isAtCapacity ? undefined : "Add Garment"}
          onAction={isAtCapacity ? undefined : onAddNewGarment}
        />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
          {displayedGarments.map((garment) => (
            <Card
              key={garment.id}
              className="group overflow-hidden p-0 border border-warm-gray flex flex-col justify-between hover:border-sage hover:shadow-md transition-all"
            >
              <div className="relative aspect-4/5 w-full bg-cream dark:bg-[#151a16] overflow-hidden">
                {garment.imageUrl ? (
                  <Image
                    src={garment.imageUrl}
                    alt={garment.name}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-gray">
                    <Shirt className="w-8 h-8" />
                  </div>
                )}
                <div className="absolute top-2 left-2">
                  <Badge variant="neutral" className="backdrop-blur-md bg-surface/90 text-xs px-2.5 py-0.5">
                    {garment.category}
                  </Badge>
                </div>
                {onDeleteGarment && (
                  <button
                    type="button"
                    disabled={deletingId === garment.id}
                    onClick={() => handleDelete(garment.id)}
                    className="absolute top-2 right-2 p-1.5 rounded-full bg-black/70 text-white hover:bg-rose-600 transition-colors opacity-0 group-hover:opacity-100 cursor-pointer"
                    aria-label={`Delete ${garment.name}`}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              <div className="p-3 sm:p-4 flex flex-col gap-1.5">
                <h4 className="text-xs sm:text-sm font-bold text-charcoal line-clamp-1 group-hover:text-forest dark:group-hover:text-sage transition-colors">
                  {garment.name}
                </h4>
                <div className="flex items-center justify-between text-xs text-muted-gray">
                  <span>{garment.color}</span>
                  <span>{garment.season}</span>
                </div>
                <div className="pt-2 border-t border-warm-gray/60 flex items-center justify-between">
                  <span className="text-xs text-sage font-medium truncate">
                    {garment.closetName}
                  </span>
                </div>
              </div>
            </Card>
          ))}

          {!isAtCapacity && (
            <button
              type="button"
              onClick={onAddNewGarment}
              className="rounded-2xl border-2 border-dashed border-warm-gray hover:border-sage p-6 flex flex-col items-center justify-center text-center gap-2 group hover:bg-pale-sage/10 transition-all cursor-pointer min-h-[220px]"
            >
              <div className="w-10 h-10 rounded-xl bg-pale-sage text-forest dark:text-sage flex items-center justify-center group-hover:scale-110 transition-transform">
                <Plus className="w-5 h-5" />
              </div>
              <span className="text-sm font-bold text-charcoal group-hover:text-forest dark:group-hover:text-sage">
                Add New Garment
              </span>
              <span className="text-xs text-muted-gray">
                Upload photo or record details
              </span>
            </button>
          )}
        </div>
      )}
    </div>
  );
}
