"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import {
  Shirt,
  Plus,
  Edit2,
  Trash2,
  ExternalLink,
} from "lucide-react";
import Card from "@/shared/components/ui/Card";
import Badge from "@/shared/components/ui/Badge";
import Button from "@/shared/components/ui/Button";
import type { Closet } from "@/features/closets/types/closet.types";
import type {
  RecentGarment,
  WardrobeClothesExplorerProps,
} from "../types/dashboard.types";

import {
  CLOSET_TYPE_ICONS,
  DASHBOARD_CATEGORIES,
} from "../constants/dashboard.constants";

export default function WardrobeClothesExplorer({
  closets,
  selectedWardrobeId,
  onSelectWardrobe,
  selectedCategory,
  onSelectCategory,
  garments,
  onAddNewGarment,
  onEditCloset,
  onDeleteCloset,
}: WardrobeClothesExplorerProps) {
  const currentCloset = closets.find((c) => c.id === selectedWardrobeId);
  const isAll = selectedWardrobeId === "all";

  const getWardrobeIcon = (type?: string) => {
    const Icon = (type && CLOSET_TYPE_ICONS[type]) || Shirt;
    return <Icon className="w-4 h-4 shrink-0" />;
  };

  const currentCount = isAll
    ? closets.reduce((acc, c) => acc + (c.clothesCount || 0), 0)
    : currentCloset?.clothesCount || garments.length;

  const currentMax = isAll
    ? closets.reduce((acc, c) => acc + (c.maxSize || 50), 0)
    : currentCloset?.maxSize || 50;

  const capacityPct = Math.min(100, Math.round((currentCount / currentMax) * 100));

  return (
    <section id="wardrobe-clothes-explorer" className="flex flex-col gap-6 scroll-mt-6">
      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-charcoal tracking-tight">
              Wardrobe & Clothes Explorer
            </h2>
            <p className="text-sm text-muted-gray mt-0.5">
              Select a wardrobe to see and manage the specific garments stored inside it
            </p>
          </div>
          <Button
            variant="primary"
            size="sm"
            onClick={onAddNewGarment}
            className="gap-2 shadow-xs text-sm h-9 px-4"
          >
            <Plus className="w-4 h-4" />
            <span>Add Garment Piece</span>
          </Button>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-2 scrollbar-none">
          <button
            type="button"
            onClick={() => onSelectWardrobe("all")}
            className={`px-4 py-2 rounded-xl text-xs font-semibold shrink-0 transition-all cursor-pointer flex items-center gap-2 ${
              isAll
                ? "bg-forest text-white shadow-xs"
                : "bg-surface border border-warm-gray text-charcoal hover:bg-cream"
            }`}
          >
            <span>All Wardrobes</span>
            <span
              className={`text-xs px-2 py-0.5 rounded-full ${
                isAll ? "bg-white/20 text-white" : "bg-cream text-muted-gray font-mono"
              }`}
            >
              {closets.reduce((acc, c) => acc + (c.clothesCount || 0), 0)}
            </span>
          </button>

          {closets.map((c: Closet) => {
            const isSelected = selectedWardrobeId === c.id;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => onSelectWardrobe(c.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold shrink-0 transition-all cursor-pointer flex items-center gap-2 ${
                  isSelected
                    ? "bg-forest text-white shadow-xs"
                    : "bg-surface border border-warm-gray text-charcoal hover:bg-cream"
                }`}
              >
                <span className={isSelected ? "text-white" : "text-sage"}>
                  {getWardrobeIcon(c.type)}
                </span>
                <span>{c.name}</span>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full font-mono ${
                    isSelected
                      ? "bg-white/20 text-white"
                      : "bg-cream text-muted-gray"
                  }`}
                >
                  {c.clothesCount || 0}/{c.maxSize || 50}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <Card className="p-5 sm:p-6 border border-warm-gray bg-surface shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-warm-gray">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-pale-sage text-forest dark:text-sage flex items-center justify-center shrink-0 shadow-xs">
              {getWardrobeIcon(currentCloset?.type)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-charcoal">
                  {isAll ? "All Wardrobe Pieces" : currentCloset?.name}
                </h3>
                {!isAll && currentCloset && (
                  <Badge variant="accent" className="capitalize text-xs">
                    {currentCloset.type} Wardrobe
                  </Badge>
                )}
              </div>
              <p className="text-sm text-muted-gray mt-0.5 max-w-xl">
                {isAll
                  ? "Viewing all stored clothing pieces across your custom wardrobes."
                  : currentCloset?.description || "Curated wardrobe pieces."}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="flex flex-col gap-1 min-w-[160px]">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-charcoal">Capacity</span>
                <span className="text-sage font-mono">
                  {currentCount} / {currentMax} ({capacityPct}%)
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-warm-gray/40 dark:bg-[#252f27] overflow-hidden">
                <div
                  className="h-full bg-forest dark:bg-sage rounded-full transition-all duration-300"
                  style={{ width: `${capacityPct}%` }}
                />
              </div>
            </div>

            {!isAll && currentCloset && (
              <div className="flex items-center gap-1.5 shrink-0">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onEditCloset(currentCloset)}
                  className="p-1.5 h-auto text-muted-gray hover:text-charcoal"
                  aria-label="Edit closet"
                >
                  <Edit2 className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDeleteCloset(currentCloset)}
                  className="p-1.5 h-auto text-muted-gray hover:text-rose-600"
                  aria-label="Delete closet"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
                <Link href={`/closets/${currentCloset.id}`}>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-1.5 text-xs h-8"
                  >
                    <span>Full View</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>

        <div className="pt-4 flex flex-col gap-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-1.5 overflow-x-auto">
              {DASHBOARD_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => onSelectCategory(cat.id)}
                  className={`px-3 py-1 rounded-xl text-xs font-medium transition-colors cursor-pointer shrink-0 ${
                    selectedCategory === cat.id
                      ? "bg-forest text-white shadow-xs"
                      : "bg-warm-gray/30 dark:bg-[#151a16] text-charcoal hover:bg-pale-sage/30 dark:hover:bg-[#243026]"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <span className="text-xs text-muted-gray">
              Showing {garments.length} {garments.length === 1 ? "piece" : "pieces"}
            </span>
          </div>

          {garments.length === 0 ? (
            <div className="py-12 px-4 rounded-2xl border-2 border-dashed border-warm-gray bg-cream/30 dark:bg-[#151a16] text-center flex flex-col items-center justify-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-cream/50 dark:bg-[#1c231e] border border-warm-gray flex items-center justify-center text-sage">
                <Shirt className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-charcoal">
                  No pieces found in this view
                </h4>
                <p className="text-xs text-muted-gray mt-1 max-w-sm">
                  {isAll
                    ? "Start building your wardrobe by cataloging your everyday staples and pieces."
                    : `No pieces matching the selected filter in "${currentCloset?.name}".`}
                </p>
              </div>
              <Button
                variant="primary"
                size="sm"
                onClick={onAddNewGarment}
                className="gap-1.5 mt-1"
              >
                <Plus className="w-4 h-4" />
                <span>Add Piece Now</span>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {garments.map((garment: RecentGarment, index: number) => (
                <motion.div
                  key={garment.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.03 }}
                  whileHover={{ y: -3 }}
                >
                  <Card className="p-3 h-full flex flex-col justify-between border border-warm-gray bg-surface hover:border-sage/60 hover:shadow-md transition-all group">
                    <div>
                      <div className="relative aspect-square w-full rounded-xl bg-cream dark:bg-[#151a16] border border-warm-gray/60 overflow-hidden mb-3 group-hover:scale-[1.02] transition-transform">
                        {garment.imageUrl ? (
                          <Image
                            src={garment.imageUrl}
                            alt={garment.name}
                            fill
                            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                            className="object-cover object-center"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-forest dark:text-sage">
                            <Shirt className="w-10 h-10 opacity-60" />
                          </div>
                        )}
                        <div className="absolute top-2 left-2">
                          <Badge variant="accent" className="text-xs px-2.5 py-0.5 backdrop-blur-xs">
                            {garment.category}
                          </Badge>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <h4 className="text-sm font-bold text-charcoal line-clamp-1">
                          {garment.name}
                        </h4>
                        <p className="text-xs text-muted-gray line-clamp-1">
                          {garment.color} • {garment.season}
                        </p>
                      </div>
                    </div>

                    <div className="pt-2 mt-2 border-t border-warm-gray/50 flex items-center justify-between text-xs text-sage font-medium">
                      <span className="truncate">{garment.closetName}</span>
                    </div>
                  </Card>
                </motion.div>
              ))}

              <motion.div whileHover={{ y: -3 }} transition={{ duration: 0.15 }}>
                <button
                  type="button"
                  onClick={onAddNewGarment}
                  className="w-full h-full min-h-[220px] rounded-2xl border-2 border-dashed border-warm-gray hover:border-sage bg-cream/30 dark:bg-[#151a16] hover:bg-cream/60 dark:hover:bg-[#1c231e] flex flex-col items-center justify-center gap-2 text-muted-gray hover:text-forest dark:hover:text-sage transition-all cursor-pointer p-4 group"
                  aria-label="Add new garment"
                >
                  <div className="w-10 h-10 rounded-full bg-surface border border-warm-gray flex items-center justify-center shadow-xs group-hover:scale-110 group-hover:border-sage transition-all">
                    <Plus className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-bold">Add Piece</span>
                  <span className="text-xs text-muted-gray text-center leading-tight">
                    Add new piece to this wardrobe
                  </span>
                </button>
              </motion.div>
            </div>
          )}
        </div>
      </Card>
    </section>
  );
}
