"use client";

import { Plus, Sparkles, FolderPlus } from "lucide-react";
import Button from "@/shared/components/ui/Button";
import { DashboardHeaderProps } from "../types/dashboard.types";

export default function DashboardHeader({
  userName,
  onCreateCloset,
  onAddGarment,
  onMatchOutfit,
}: DashboardHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
      <div>
        <span className="text-xs font-semibold uppercase tracking-wider text-sage">
          Personal Wardrobe Hub
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold text-charcoal tracking-tight mt-1">
          Welcome back{userName ? `, ${userName}` : ""}
        </h1>
        <p className="text-sm text-muted-gray mt-1 max-w-xl">
          Curate your capsules, plan your daily styling, and discover new outfit combinations.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2.5">
        {onMatchOutfit && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onMatchOutfit}
            className="border border-warm-gray bg-surface text-charcoal hover:bg-cream gap-2 text-sm h-9 px-3.5"
          >
            <Sparkles className="w-4 h-4 text-sage" />
            <span>Match Outfit</span>
          </Button>
        )}

        <Button
          variant="secondary"
          size="sm"
          onClick={onCreateCloset}
          className="gap-2 text-sm h-9 px-3.5"
        >
          <FolderPlus className="w-4 h-4 text-forest" />
          <span>New Closet</span>
        </Button>

        {onAddGarment && (
          <Button
            variant="primary"
            size="sm"
            onClick={onAddGarment}
            className="gap-2 shadow-xs text-sm h-9 px-4"
          >
            <Plus className="w-4 h-4" />
            <span>Add Garment</span>
          </Button>
        )}
      </div>
    </div>
  );
}
