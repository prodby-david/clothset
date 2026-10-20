"use client";

import Image from "next/image";
import {
  Sparkles,
  Bookmark,
  Sun,
  Shirt,
  Scissors,
  Footprints,
  Compass,
  Check,
} from "lucide-react";
import { motion } from "motion/react";
import Card from "@/shared/components/ui/Card";
import Badge from "@/shared/components/ui/Badge";
import Button from "@/shared/components/ui/Button";
import { DailyOutfitSpotlightProps } from "../types/dashboard.types";

export default function DailyOutfitSpotlight({
  activeOccasion,
  onSelectOccasion,
  outfit,
  onShuffle,
  isSaved,
  onToggleSave,
}: DailyOutfitSpotlightProps) {
  return (
    <Card className="overflow-hidden border border-warm-gray bg-surface shadow-xs hover:border-sage/50 transition-all">
      <div className="px-5 sm:px-6 py-4 bg-cream/70 border-b border-warm-gray flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-pale-sage text-forest flex items-center justify-center shadow-xs">
            <Shirt className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-charcoal">
                Outfit of the Day
              </h2>
              <Badge variant="accent">{outfit.harmony}</Badge>
            </div>
            <p className="text-xs text-muted-gray flex items-center gap-1.5 mt-0.5">
              <Sun className="w-3.5 h-3.5 text-amber-500" />
              <span>{outfit.weather}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleSave}
            className={`gap-1.5 ${
              isSaved
                ? "bg-pale-sage text-forest hover:bg-pale-sage-hover"
                : "text-muted-gray hover:text-charcoal"
            }`}
            aria-label={isSaved ? "Saved to favorites" : "Save outfit to favorites"}
          >
            {isSaved ? (
              <>
                <Check className="w-3.5 h-3.5 text-forest" />
                <span>Saved</span>
              </>
            ) : (
              <>
                <Bookmark className="w-3.5 h-3.5" />
                <span>Save</span>
              </>
            )}
          </Button>

          <Button
            variant="secondary"
            size="sm"
            onClick={onShuffle}
            className="gap-1.5 shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-forest" />
            <span>Shuffle Outfit</span>
          </Button>
        </div>
      </div>

      <div className="px-5 sm:px-6 py-3 border-b border-warm-gray flex items-center gap-1.5 overflow-x-auto bg-surface">
        <span className="text-xs text-muted-gray font-medium mr-1 shrink-0">
          Occasion:
        </span>
        <button
          type="button"
          onClick={() => onSelectOccasion("work")}
          className={`px-3 py-1 rounded-xl text-xs font-medium transition-colors cursor-pointer shrink-0 ${
            activeOccasion === "work"
              ? "bg-forest text-white shadow-xs"
              : "bg-cream text-charcoal hover:bg-warm-gray/60"
          }`}
        >
          Workday Smart
        </button>
        <button
          type="button"
          onClick={() => onSelectOccasion("casual")}
          className={`px-3 py-1 rounded-xl text-xs font-medium transition-colors cursor-pointer shrink-0 ${
            activeOccasion === "casual"
              ? "bg-forest text-white shadow-xs"
              : "bg-cream text-charcoal hover:bg-warm-gray/60"
          }`}
        >
          Casual Weekend
        </button>
        <button
          type="button"
          onClick={() => onSelectOccasion("evening")}
          className={`px-3 py-1 rounded-xl text-xs font-medium transition-colors cursor-pointer shrink-0 ${
            activeOccasion === "evening"
              ? "bg-forest text-white shadow-xs"
              : "bg-cream text-charcoal hover:bg-warm-gray/60"
          }`}
        >
          Evening Dinner
        </button>
      </div>

      <div className="p-5 sm:px-6 py-5 bg-cream/30 flex flex-col gap-5">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <motion.div
            key={outfit.top.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="p-3.5 rounded-2xl border border-warm-gray bg-surface flex flex-col justify-between gap-3 shadow-xs hover:border-sage/50 transition-all"
          >
            <div>
              <div className="relative aspect-square w-full rounded-xl bg-cream border border-warm-gray/60 overflow-hidden mb-3">
                {outfit.top.imageUrl ? (
                  <Image
                    src={outfit.top.imageUrl}
                    alt={outfit.top.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover object-center"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-forest">
                    <Shirt className="w-10 h-10 opacity-70" />
                  </div>
                )}
                <div className="absolute top-2 right-2">
                  <span className="text-xs font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md bg-surface/90 text-charcoal shadow-xs backdrop-blur-xs">
                    Top
                  </span>
                </div>
              </div>
              <h3 className="text-sm font-bold text-charcoal line-clamp-1">
                {outfit.top.name}
              </h3>
              <p className="text-xs text-sage font-medium mt-0.5">
                {outfit.top.color}
              </p>
            </div>
          </motion.div>

          <motion.div
            key={outfit.bottom.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: 0.05 }}
            className="p-3.5 rounded-2xl border border-warm-gray bg-surface flex flex-col justify-between gap-3 shadow-xs hover:border-sage/50 transition-all"
          >
            <div>
              <div className="relative aspect-square w-full rounded-xl bg-cream border border-warm-gray/60 overflow-hidden mb-3">
                {outfit.bottom.imageUrl ? (
                  <Image
                    src={outfit.bottom.imageUrl}
                    alt={outfit.bottom.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover object-center"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-forest">
                    <Scissors className="w-10 h-10 opacity-70" />
                  </div>
                )}
                <div className="absolute top-2 right-2">
                  <span className="text-xs font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md bg-surface/90 text-charcoal shadow-xs backdrop-blur-xs">
                    Bottom
                  </span>
                </div>
              </div>
              <h3 className="text-sm font-bold text-charcoal line-clamp-1">
                {outfit.bottom.name}
              </h3>
              <p className="text-xs text-sage font-medium mt-0.5">
                {outfit.bottom.color}
              </p>
            </div>
          </motion.div>

          <motion.div
            key={outfit.footwear.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: 0.1 }}
            className="p-3.5 rounded-2xl border border-warm-gray bg-surface flex flex-col justify-between gap-3 shadow-xs hover:border-sage/50 transition-all"
          >
            <div>
              <div className="relative aspect-square w-full rounded-xl bg-cream border border-warm-gray/60 overflow-hidden mb-3">
                {outfit.footwear.imageUrl ? (
                  <Image
                    src={outfit.footwear.imageUrl}
                    alt={outfit.footwear.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover object-center"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-forest">
                    <Footprints className="w-10 h-10 opacity-70" />
                  </div>
                )}
                <div className="absolute top-2 right-2">
                  <span className="text-xs font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md bg-surface/90 text-charcoal shadow-xs backdrop-blur-xs">
                    Footwear
                  </span>
                </div>
              </div>
              <h3 className="text-sm font-bold text-charcoal line-clamp-1">
                {outfit.footwear.name}
              </h3>
              <p className="text-xs text-sage font-medium mt-0.5">
                {outfit.footwear.color}
              </p>
            </div>
          </motion.div>
        </div>

        <div className="p-4 rounded-xl bg-pale-sage/40 border border-pale-sage flex items-start gap-3">
          <Compass className="w-4 h-4 text-forest shrink-0 mt-0.5" />
          <div className="flex-1">
            <span className="text-xs font-bold text-forest uppercase tracking-wider block mb-0.5">
              Styling Rationale
            </span>
            <p className="text-sm text-charcoal leading-relaxed">
              {outfit.reason}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}
