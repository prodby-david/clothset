"use client";

import React from "react";
import Image from "next/image";
import {
  Shirt,
  Plus,
  Layers,
  Briefcase,
  Award,
  SunSnow,
  Folder,
  SlidersHorizontal,
} from "lucide-react";
import Card from "@/shared/components/ui/Card";
import Badge from "@/shared/components/ui/Badge";
import Button from "@/shared/components/ui/Button";
import { DashboardClothesTabProps } from "../types/dashboard.types";

const TYPE_ICONS: Record<string, React.ElementType> = {
  capsule: Layers,
  work: Briefcase,
  everyday: Shirt,
  formal: Award,
  seasonal: SunSnow,
  custom: Folder,
};

const CATEGORIES = [
  { id: "all", label: "All Pieces" },
  { id: "Tops", label: "Tops" },
  { id: "Bottoms", label: "Bottoms" },
  { id: "Outerwear", label: "Outerwear" },
  { id: "Footwear", label: "Footwear" },
];

export default function DashboardClothesTab({
  closets,
  selectedWardrobeId,
  onSelectWardrobe,
  selectedCategory,
  onSelectCategory,
  garments,
  onAddNewGarment,
}: DashboardClothesTabProps) {
  const currentCloset = closets.find((c) => c.id === selectedWardrobeId);
  const isAll = selectedWardrobeId === "all";

  const getWardrobeIcon = (type?: string) => {
    const Icon = (type && TYPE_ICONS[type]) || Shirt;
    return <Icon className="w-4 h-4 shrink-0" />;
  };

  const currentCount = isAll
    ? garments.length
    : currentCloset?.clothesCount || garments.length;

  const currentMax = isAll
    ? closets.reduce((acc, c) => acc + (c.maxSize || 50), 0)
    : currentCloset?.maxSize || 50;

  const capacityPct = Math.min(100, Math.round((currentCount / currentMax) * 100));

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-5 sm:p-6 rounded-2xl bg-surface border border-warm-gray shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-pale-sage text-forest flex items-center justify-center shrink-0">
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
                : currentCloset?.description || "Curated wardrobe capsule"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          {!isAll && (
            <div className="hidden sm:flex flex-col items-end text-xs">
              <span className="font-mono font-bold text-forest">
                {currentCount} / {currentMax} pieces
              </span>
              <span className="text-muted-gray">{capacityPct}% capacity</span>
            </div>
          )}

          <Button
            variant="primary"
            size="md"
            onClick={onAddNewGarment}
            className="gap-2 text-sm h-9 px-4 shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Add Garment</span>
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 p-3.5 rounded-2xl bg-surface border border-warm-gray">
        <div className="flex items-center gap-2 min-w-0">
          <div className="flex items-center gap-1.5 text-xs font-bold text-muted-gray shrink-0 pl-1">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Wardrobe:</span>
          </div>
          <select
            value={selectedWardrobeId}
            onChange={(e) => onSelectWardrobe(e.target.value)}
            className="text-xs font-semibold text-charcoal bg-cream/70 hover:bg-cream border border-warm-gray rounded-xl px-3 py-1.5 focus:outline-hidden focus:ring-2 focus:ring-sage/40 transition-colors cursor-pointer max-w-[220px] truncate"
            aria-label="Filter by wardrobe capsule"
          >
            <option value="all">All Wardrobes ({closets.length})</option>
            {closets.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name} ({c.clothesCount || 0} pieces)
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const isCatActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => onSelectCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isCatActive
                    ? "bg-forest text-cream shadow-xs"
                    : "text-charcoal bg-sand/40 hover:bg-cream hover:text-forest"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {garments.length === 0 ? (
        <Card className="p-10 text-center flex flex-col items-center justify-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-cream text-muted-gray flex items-center justify-center">
            <Shirt className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-charcoal">No pieces found</h3>
            <p className="text-xs text-muted-gray mt-1 max-w-sm">
              {isAll
                ? "You haven't cataloged any clothes in this category yet."
                : `No pieces matching this filter inside "${currentCloset?.name}".`}
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={onAddNewGarment}
            className="mt-2 text-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add First Garment</span>
          </Button>
        </Card>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
          {garments.map((garment) => (
            <Card
              key={garment.id}
              className="group overflow-hidden p-0 border border-warm-gray flex flex-col justify-between hover:border-sage hover:shadow-md transition-all"
            >
              <div className="relative aspect-4/5 w-full bg-cream overflow-hidden">
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
              </div>

              <div className="p-3 sm:p-4 flex flex-col gap-1.5">
                <h4 className="text-xs sm:text-sm font-bold text-charcoal line-clamp-1 group-hover:text-forest transition-colors">
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

          <button
            type="button"
            onClick={onAddNewGarment}
            className="rounded-2xl border-2 border-dashed border-warm-gray hover:border-sage p-6 flex flex-col items-center justify-center text-center gap-2 group hover:bg-pale-sage/10 transition-all cursor-pointer min-h-[220px]"
          >
            <div className="w-10 h-10 rounded-xl bg-pale-sage text-forest flex items-center justify-center group-hover:scale-110 transition-transform">
              <Plus className="w-5 h-5" />
            </div>
            <span className="text-sm font-bold text-charcoal group-hover:text-forest">
              Add New Garment
            </span>
            <span className="text-xs text-muted-gray">
              Upload photo or record details
            </span>
          </button>
        </div>
      )}
    </div>
  );
}
