"use client";

import {
  Layers,
  Shirt,
  Sparkles,
  ArrowRight,
  Plus,
  CheckCircle2,
} from "lucide-react";
import Card from "@/shared/components/ui/Card";
import Button from "@/shared/components/ui/Button";
import { DashboardOverviewTabProps } from "../types/dashboard.types";

export default function DashboardOverviewTab({
  userName,
  totalClosets,
  totalGarments,
  planLimit = 100,
  onNavigateTab,
  onCreateCloset,
  onAddGarment,
}: DashboardOverviewTabProps) {
  const safeLimit = planLimit > 0 ? planLimit : 100;
  const capacityPct = Math.min(100, Math.round((totalGarments / safeLimit) * 100));

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-surface border border-warm-gray shadow-xs">
        <div className="flex flex-col gap-1.5 max-w-xl">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-forest animate-pulse" />
            <span className="text-xs font-semibold uppercase tracking-wider text-sage">
              Digital Wardrobe Hub
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-charcoal tracking-tight">
            Welcome back, {userName || "there"}
          </h1>
          <p className="text-sm text-muted-gray leading-relaxed">
            Curate intentional capsules, catalog your pieces, and discover fresh outfit combinations using clothes you already own.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-2 md:pt-0">
          <Button
            variant="outline"
            size="md"
            onClick={onCreateCloset}
            className="gap-2 text-sm h-10 px-4"
          >
            <Plus className="w-4 h-4 text-forest" />
            <span>New Capsule</span>
          </Button>

          <Button
            variant="primary"
            size="md"
            onClick={onAddGarment}
            className="gap-2 text-sm h-10 px-4"
          >
            <Plus className="w-4 h-4" />
            <span>Add Garment</span>
          </Button>
        </div>
      </div>

      <Card className="p-6 sm:p-7 flex flex-col gap-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-sm font-bold text-charcoal">Wardrobe Capacity</h2>
            <p className="text-xs text-muted-gray mt-0.5">
              Personal plan allowance: {totalGarments} of {safeLimit} pieces utilized
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-forest bg-pale-sage px-2.5 py-1 rounded-lg">
              {capacityPct}% utilized
            </span>
          </div>
        </div>

        <div className="w-full h-2 rounded-full bg-sand overflow-hidden">
          <div
            className="h-full bg-forest rounded-full transition-all duration-500 ease-out"
            style={{ width: `${capacityPct}%` }}
          />
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div
          role="button"
          tabIndex={0}
          onClick={() => onNavigateTab("wardrobes")}
          onKeyDown={(e) => e.key === "Enter" && onNavigateTab("wardrobes")}
          className="group text-left p-6 rounded-2xl bg-surface border border-warm-gray hover:border-sage/70 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between gap-6"
        >
          <div className="flex flex-col gap-4">
            <div className="w-11 h-11 rounded-xl bg-pale-sage text-forest flex items-center justify-center">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-charcoal font-mono">
                  {totalClosets}
                </span>
                <span className="text-xs font-semibold text-muted-gray uppercase tracking-wider">
                  Capsules
                </span>
              </div>
              <h3 className="text-base font-bold text-charcoal mt-1 group-hover:text-forest transition-colors">
                Wardrobes & Capsules
              </h3>
              <p className="text-xs text-muted-gray mt-1 leading-relaxed">
                Organize your items into specialized collections for work, everyday wear, formal events, and seasons.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-xs font-bold text-forest group-hover:translate-x-0.5 transition-transform">
            <span>Browse Capsules</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>

        <div
          role="button"
          tabIndex={0}
          onClick={() => onNavigateTab("clothes", "all")}
          onKeyDown={(e) => e.key === "Enter" && onNavigateTab("clothes", "all")}
          className="group text-left p-6 rounded-2xl bg-surface border border-warm-gray hover:border-sage/70 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between gap-6"
        >
          <div className="flex flex-col gap-4">
            <div className="w-11 h-11 rounded-xl bg-pale-sage text-forest flex items-center justify-center">
              <Shirt className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-charcoal font-mono">
                  {totalGarments}
                </span>
                <span className="text-xs font-semibold text-muted-gray uppercase tracking-wider">
                  Total Pieces
                </span>
              </div>
              <h3 className="text-base font-bold text-charcoal mt-1 group-hover:text-forest transition-colors">
                Clothes Catalog
              </h3>
              <p className="text-xs text-muted-gray mt-1 leading-relaxed">
                Inspect and filter your clothing pieces by wardrobe, category (tops, bottoms, outerwear, footwear), and color.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-xs font-bold text-forest group-hover:translate-x-0.5 transition-transform">
            <span>View All Pieces</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>

        <div
          role="button"
          tabIndex={0}
          onClick={() => onNavigateTab("outfits")}
          onKeyDown={(e) => e.key === "Enter" && onNavigateTab("outfits")}
          className="group text-left p-6 rounded-2xl bg-surface border border-warm-gray hover:border-sage/70 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between gap-6"
        >
          <div className="flex flex-col gap-4">
            <div className="w-11 h-11 rounded-xl bg-cream border border-warm-gray text-forest flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-sage" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-charcoal font-mono">
                  Daily
                </span>
                <span className="text-xs font-semibold text-muted-gray uppercase tracking-wider">
                  Outfits
                </span>
              </div>
              <h3 className="text-base font-bold text-charcoal mt-1 group-hover:text-forest transition-colors">
                Daily Outfit Ideas
              </h3>
              <p className="text-xs text-muted-gray mt-1 leading-relaxed">
                Discover outfit combinations styled for your weather and occasions using only clothes you own.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-xs font-bold text-forest group-hover:translate-x-0.5 transition-transform">
            <span>Explore Outfit Ideas</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>

      <div className="p-4 rounded-2xl bg-pale-sage/40 border border-sage/30 flex items-start gap-3">
        <CheckCircle2 className="w-4 h-4 text-forest shrink-0 mt-0.5" />
        <div className="text-xs text-charcoal leading-relaxed">
          <span className="font-bold">Wardrobe Privacy & Authenticity: </span>
          Clothset only suggests outfits built entirely with clothes in your library. Outfit suggestions never invent phantom pieces.
        </div>
      </div>
    </div>
  );
}
