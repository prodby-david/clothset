"use client";

import React from "react";
import {
  Shirt,
  ArrowRight,
  Plus,
  FolderPlus,
  ShieldCheck,
  CheckCircle2,
  Lock,
} from "lucide-react";
import Card from "@/shared/components/ui/Card";
import Button from "@/shared/components/ui/Button";
import Badge from "@/shared/components/ui/Badge";
import ClosetCard from "@/features/closets/ui/ClosetCard";
import type { DashboardOverviewTabProps } from "../types/dashboard.types";

export default function DashboardOverviewTab({
  userName,
  userPlan,
  totalClosets,
  totalGarments,
  closets = [],
  onNavigateTab,
  onCreateCloset,
  onAddGarment,
  onSelectWardrobe,
  onEditCloset = () => {},
  onDeleteCloset = () => {},
  onAddGarmentToCloset,
}: DashboardOverviewTabProps) {
  const normalizedPlan = (userPlan || "FREE").toUpperCase();
  const maxClosets = normalizedPlan === "ELITE" ? 8 : normalizedPlan === "PLUS" ? 5 : 2;
  const maxPerWardrobe = normalizedPlan === "ELITE" ? 50 : normalizedPlan === "PLUS" ? 30 : 20;

  const isLimitReached = totalClosets >= maxClosets;
  const wardrobeUsagePct = Math.min(100, Math.round((totalClosets / maxClosets) * 100));

  const handleSelectCloset = (closetId: string) => {
    if (onSelectWardrobe) {
      onSelectWardrobe(closetId);
    } else {
      onNavigateTab("clothes", closetId);
    }
  };

  const handleAddGarmentForCloset = (closetId: string) => {
    if (onAddGarmentToCloset) {
      onAddGarmentToCloset(closetId);
    } else {
      onAddGarment();
    }
  };

  return (
    <div className="flex flex-col gap-8">
      {totalClosets === 0 ? (
        <div className="p-6 sm:p-8 rounded-3xl bg-surface border border-warm-gray shadow-xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div className="flex flex-col gap-2 max-w-xl">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-forest dark:bg-sage animate-pulse" />
              <span className="text-xs font-semibold uppercase tracking-wider text-sage">
                Welcome to Clothset
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-charcoal tracking-tight">
              Welcome, {userName || "there"}. Start your digital wardrobe.
            </h1>
            <p className="text-sm text-muted-gray leading-relaxed">
              Organize what you own into intentional wardrobes, track your item capacity, and discover outfit combinations within your plan limits.
            </p>
          </div>

          <div className="shrink-0">
            <Button
              variant="primary"
              size="lg"
              onClick={onCreateCloset}
              className="gap-2 text-sm h-11 px-6 shadow-sm cursor-pointer"
            >
              <FolderPlus className="w-4 h-4" />
              <span>Choose Your First Wardrobe</span>
            </Button>
          </div>
        </div>
      ) : (
        <div className="p-6 sm:p-8 rounded-3xl bg-surface border border-warm-gray shadow-xs flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex flex-col gap-1.5 max-w-xl">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-forest dark:bg-sage animate-pulse" />
              <span className="text-xs font-semibold uppercase tracking-wider text-sage">
                Digital Wardrobe Hub
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-charcoal tracking-tight">
              Welcome back, {userName || "there"}
            </h1>
            <p className="text-sm text-muted-gray leading-relaxed">
              Curate intentional wardrobes, catalog your pieces, and manage your capacity according to your {normalizedPlan} plan rules.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2 md:pt-0">
            <Button
              variant="outline"
              size="md"
              disabled={isLimitReached}
              onClick={onCreateCloset}
              className={`gap-2 text-sm h-10 px-4 ${
                isLimitReached ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
              }`}
            >
              {isLimitReached ? (
                <>
                  <Lock className="w-4 h-4 text-muted-gray" />
                  <span>Wardrobes Full (2/2)</span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4 text-forest dark:text-sage" />
                  <span>Choose Wardrobe</span>
                </>
              )}
            </Button>

            <Button
              variant="primary"
              size="md"
              onClick={onAddGarment}
              className="gap-2 text-sm h-10 px-4 cursor-pointer shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Add Garment</span>
            </Button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <Card className="p-6 flex flex-col justify-between gap-4">
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-muted-gray uppercase tracking-wider">
                Wardrobe Usage
              </span>
              <Badge
                variant={
                  isLimitReached
                    ? "accent"
                    : totalClosets === 0
                    ? "neutral"
                    : "secondary"
                }
              >
                {isLimitReached
                  ? "Wardrobes Full"
                  : `${maxClosets - totalClosets} Slot${maxClosets - totalClosets > 1 ? "s" : ""} Left`}
              </Badge>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold font-mono text-charcoal">
                {totalClosets}
              </span>
              <span className="text-sm font-semibold text-muted-gray font-mono">
                / {maxClosets} allowed
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="w-full h-2 rounded-full bg-warm-gray/40 dark:bg-[#252f27] overflow-hidden">
              <div
                className="h-full bg-forest dark:bg-sage rounded-full transition-all duration-500 ease-out"
                style={{ width: `${wardrobeUsagePct}%` }}
              />
            </div>
            <span className="text-[11px] text-muted-gray font-medium">
              {wardrobeUsagePct}% of wardrobe capacity utilized
            </span>
          </div>
        </Card>

        <Card className="p-6 flex flex-col justify-between gap-4">
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-muted-gray uppercase tracking-wider">
                Total Clothes
              </span>
              <Shirt className="w-4 h-4 text-forest dark:text-sage" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold font-mono text-charcoal">
                {totalGarments}
              </span>
              <span className="text-sm font-semibold text-muted-gray">
                pieces stored
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onNavigateTab("clothes", "all")}
            className="flex items-center gap-1.5 text-xs font-bold text-forest dark:text-sage hover:underline cursor-pointer text-left"
          >
            <span>View all items</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </Card>

        <Card className="p-6 flex flex-col justify-between gap-4">
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-muted-gray uppercase tracking-wider">
                Wardrobe Capacity
              </span>
              <Badge variant="accent">{normalizedPlan}</Badge>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold font-mono text-charcoal">
                {maxPerWardrobe}
              </span>
              <span className="text-sm font-semibold text-muted-gray">
                max pieces / wardrobe
              </span>
            </div>
          </div>

          <div className="text-[11px] text-muted-gray flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-forest dark:text-sage shrink-0" />
            <span>Enforced per wardrobe automatically</span>
          </div>
        </Card>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-charcoal tracking-tight">
              Your Wardrobes
            </h2>
            <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-sand text-muted-gray">
              {totalClosets} / {maxClosets}
            </span>
          </div>

          {totalClosets > 0 && !isLimitReached && (
            <Button
              variant="outline"
              size="sm"
              onClick={onCreateCloset}
              className="gap-1.5 text-xs h-8 px-3 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Second Wardrobe</span>
            </Button>
          )}
        </div>

        {totalClosets === 0 && (
          <div className="p-8 sm:p-12 rounded-3xl bg-surface border border-warm-gray text-center flex flex-col items-center justify-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-pale-sage text-forest dark:text-sage flex items-center justify-center shadow-xs">
              <FolderPlus className="w-7 h-7" />
            </div>
            <div className="max-w-md flex flex-col gap-1.5">
              <h3 className="text-base font-bold text-charcoal">
                No active wardrobes yet
              </h3>
              <p className="text-xs text-muted-gray leading-relaxed">
                You can create up to 2 specialized wardrobes under your Free plan. Choose a starter template like Everyday Essentials or Capsule Basics to start organizing.
              </p>
            </div>
            <Button
              variant="primary"
              size="md"
              onClick={onCreateCloset}
              className="gap-2 text-xs font-bold h-10 px-5 mt-2 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Choose Your First Wardrobe</span>
            </Button>
          </div>
        )}

        {totalClosets === 1 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-stretch">
            {closets.map((closet) => (
              <ClosetCard
                key={closet.id}
                closet={closet}
                onEdit={onEditCloset}
                onDelete={onDeleteCloset}
                onSelect={handleSelectCloset}
                onAddGarment={handleAddGarmentForCloset}
              />
            ))}

            <div
              onClick={onCreateCloset}
              className="p-6 rounded-2xl border-2 border-dashed border-warm-gray hover:border-sage bg-cream/30 hover:bg-cream/60 dark:bg-[#151a16]/30 dark:hover:bg-[#151a16]/60 transition-all flex flex-col items-center justify-center text-center gap-3 cursor-pointer group min-h-[220px]"
            >
              <div className="w-11 h-11 rounded-2xl bg-pale-sage text-forest dark:text-sage flex items-center justify-center group-hover:scale-105 transition-transform">
                <Plus className="w-5 h-5" />
              </div>
              <div className="max-w-xs flex flex-col gap-1">
                <h4 className="text-sm font-bold text-charcoal group-hover:text-forest dark:group-hover:text-sage transition-colors">
                  Add Your Second Wardrobe
                </h4>
                <p className="text-xs text-muted-gray leading-relaxed">
                  You have 1 open wardrobe slot available. Add another wardrobe such as Workwear or Seasonal Rotation.
                </p>
              </div>
              <span className="text-xs font-bold text-forest dark:text-sage underline underline-offset-4 mt-1">
                Choose Wardrobe Template &rarr;
              </span>
            </div>
          </div>
        )}

        {totalClosets >= 2 && (
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-stretch">
              {closets.map((closet) => (
                <ClosetCard
                  key={closet.id}
                  closet={closet}
                  onEdit={onEditCloset}
                  onDelete={onDeleteCloset}
                  onSelect={handleSelectCloset}
                  onAddGarment={handleAddGarmentForCloset}
                />
              ))}
            </div>

            <div className="p-3.5 rounded-2xl bg-pale-sage/40 dark:bg-[#243026]/50 border border-sage/30 flex items-center justify-between gap-3 text-xs text-charcoal">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-forest dark:text-sage shrink-0" />
                <span>
                  <strong className="font-bold">Maximum Wardrobes Active (2/2):</strong> You are utilizing all allowed wardrobes under your {normalizedPlan} plan. You can continue adding clothing items to each wardrobe up to its individual capacity limit.
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
