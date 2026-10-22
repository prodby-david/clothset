"use client";

import React from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  Layers,
  Shirt,
  Plus,
  LogOut,
  Menu,
  X,
  Compass,
} from "lucide-react";
import Button from "@/shared/components/ui/Button";
import ThemeToggle from "@/shared/components/ui/ThemeToggle";
import type { Closet } from "@/features/closets/types/closet.types";
import type { DashboardSidebarProps } from "../types/dashboard.types";
import { CLOSET_TYPE_ICONS } from "../constants/dashboard.constants";
import { useDashboardSidebar } from "../hooks/useDashboardSidebar";

export default function DashboardSidebar({
  userEmail,
  userName,
  userPlan,
  onLogout,
  closets,
  selectedWardrobeId,
  onSelectWardrobe,
  activeTab = "overview",
  onSelectTab,
  onCreateCloset,
  totalClothesCount,
  planLimit = 100,
  className = "",
}: DashboardSidebarProps) {
  const normalizedPlan = (userPlan || "FREE").toUpperCase();
  const maxClosets = normalizedPlan === "ELITE" ? 8 : normalizedPlan === "PLUS" ? 5 : 2;
  const isWardrobeLimitReached = closets.length >= maxClosets;

  const {
    isMobileOpen,
    toggleMobile,
    closeMobile,
    handleNavClick,
    handleSelectWardrobe,
  } = useDashboardSidebar({
    totalClothesCount,
    planLimit,
    onSelectWardrobe,
    onSelectTab,
  });

  const getWardrobeIcon = (type: string) => {
    const Icon = CLOSET_TYPE_ICONS[type] || Shirt;
    return <Icon className="w-4 h-4 shrink-0" />;
  };

  const sidebarContent = (
    <div className="flex flex-col h-full justify-between p-4 sm:p-5 text-charcoal">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between pb-1">
          <Link
            href="/dashboard"
            className="flex items-center gap-2.5 font-bold text-base text-forest dark:text-sage tracking-tight"
          >
            <div className="w-8 h-8 rounded-xl bg-forest text-white flex items-center justify-center shadow-xs">
              <Compass className="w-4 h-4" />
            </div>
            <span>Clothset</span>
          </Link>
          <button
            type="button"
            onClick={closeMobile}
            className="lg:hidden p-1.5 rounded-lg text-muted-gray hover:text-charcoal hover:bg-cream"
            aria-label="Close sidebar"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <nav className="flex flex-col gap-1.5">
          <button
            type="button"
            onClick={() => handleNavClick("overview")}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all text-left cursor-pointer ${
              activeTab === "overview"
                ? "bg-forest text-white shadow-xs"
                : "text-charcoal hover:bg-cream"
            }`}
          >
            <LayoutDashboard className="w-4 h-4 shrink-0" />
            <span>Overview</span>
          </button>

          <button
            type="button"
            onClick={() => handleNavClick("wardrobes")}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all text-left cursor-pointer ${
              activeTab === "wardrobes"
                ? "bg-forest text-white shadow-xs"
                : "text-charcoal hover:bg-cream"
            }`}
          >
            <div className="flex items-center gap-3">
              <Layers className="w-4 h-4 shrink-0" />
              <span>Wardrobes</span>
            </div>
            <span
              className={`text-xs px-2 py-0.5 rounded-md font-mono ${
                activeTab === "wardrobes"
                  ? "bg-white/20 text-white"
                  : "bg-warm-gray/40 dark:bg-[#252f27] text-muted-gray"
              }`}
            >
              {closets.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => handleNavClick("clothes")}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all text-left cursor-pointer ${
              activeTab === "clothes" && selectedWardrobeId === "all"
                ? "bg-forest text-white shadow-xs"
                : "text-charcoal hover:bg-cream"
            }`}
          >
            <div className="flex items-center gap-3">
              <Shirt className="w-4 h-4 shrink-0" />
              <span>All Clothes</span>
            </div>
            <span
              className={`text-xs px-2 py-0.5 rounded-md font-mono ${
                activeTab === "clothes" && selectedWardrobeId === "all"
                  ? "bg-white/20 text-white"
                  : "bg-warm-gray/40 dark:bg-[#252f27] text-muted-gray"
              }`}
            >
              {totalClothesCount}
            </span>
          </button>
        </nav>

        <div className="flex flex-col gap-2.5 pt-4 border-t border-warm-gray">
          <div className="flex items-center justify-between px-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-muted-gray">
              Wardrobes ({closets.length}/{maxClosets})
            </span>
            <button
              type="button"
              disabled={isWardrobeLimitReached}
              onClick={() => {
                if (isWardrobeLimitReached) return;
                closeMobile();
                onCreateCloset();
              }}
              className={`p-1 rounded-md transition-colors ${
                isWardrobeLimitReached
                  ? "text-muted-gray/40 cursor-not-allowed"
                  : "text-sage hover:text-forest dark:hover:text-sage hover:bg-pale-sage/60 cursor-pointer"
              }`}
              aria-label="Create new wardrobe"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex flex-col gap-1.5 max-h-[220px] overflow-y-auto pr-1">
            {closets.map((closet: Closet) => {
              const isSelected = activeTab === "clothes" && selectedWardrobeId === closet.id;
              const count = closet.clothesCount || 0;
              const max = closet.maxSize || closet.maxItems || 20;

              return (
                <button
                  key={closet.id}
                  type="button"
                  onClick={() => handleSelectWardrobe(closet.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-all text-left group cursor-pointer ${
                    isSelected
                      ? "bg-pale-sage text-forest dark:text-sage font-bold shadow-xs border border-sage/40"
                      : "text-charcoal hover:bg-cream border border-transparent"
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className={isSelected ? "text-forest dark:text-sage" : "text-sage group-hover:text-forest dark:group-hover:text-sage"}>
                      {getWardrobeIcon(closet.type)}
                    </span>
                    <span className="truncate">{closet.name}</span>
                  </div>
                  <span
                    className={`text-xs px-1.5 py-0.5 rounded-md font-mono shrink-0 ${
                      isSelected
                        ? "bg-forest/10 text-forest dark:text-sage font-semibold"
                        : "bg-warm-gray/40 dark:bg-[#252f27] text-muted-gray"
                    }`}
                  >
                    {count}/{max}
                  </span>
                </button>
              );
            })}
          </div>

          <button
            type="button"
            disabled={isWardrobeLimitReached}
            onClick={() => {
              if (isWardrobeLimitReached) return;
              closeMobile();
              onCreateCloset();
            }}
            className={`w-full flex items-center justify-center gap-1.5 py-2 px-3 mt-1 rounded-xl border border-dashed text-xs font-semibold transition-all ${
              isWardrobeLimitReached
                ? "border-warm-gray text-muted-gray/40 cursor-not-allowed bg-cream/10 dark:bg-[#151a16]/30"
                : "border-warm-gray text-muted-gray hover:text-forest dark:hover:text-sage hover:border-sage bg-cream/30 dark:bg-[#151a16] hover:bg-cream/60 dark:hover:bg-[#1c231e] cursor-pointer"
            }`}
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{isWardrobeLimitReached ? "Wardrobes Full (2/2)" : "New Wardrobe"}</span>
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-3.5 pt-4 border-t border-warm-gray">
        <div className="p-3 rounded-xl bg-cream/50 dark:bg-[#151a16] border border-warm-gray flex flex-col gap-2">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className="text-charcoal">
              {normalizedPlan} Tier
            </span>
            <span className="text-sage font-mono text-xs">
              {closets.length} / {maxClosets} Wardrobes
            </span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-warm-gray/40 dark:bg-[#252f27] overflow-hidden">
            <div
              className="h-full bg-forest dark:bg-sage rounded-full transition-all duration-300"
              style={{ width: `${Math.min(100, Math.round((closets.length / maxClosets) * 100))}%` }}
            />
          </div>
        </div>

        <div className="flex items-center justify-between gap-2 pt-1">
          <div className="min-w-0 flex-1">
            <p className="text-sm font-bold text-charcoal truncate">
              {userName || "Wardrobe Owner"}
            </p>
            <p className="text-xs text-muted-gray truncate">
              {userEmail || "guest@clothset.app"}
            </p>
          </div>
          <ThemeToggle className="w-8 h-8 rounded-lg shrink-0" />
          <Button
            variant="ghost"
            size="sm"
            onClick={onLogout}
            className="p-1.5 h-auto text-muted-gray hover:text-charcoal hover:bg-cream cursor-pointer"
            aria-label="Sign out"
          >
            <LogOut className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="lg:hidden sticky top-3 z-40 mx-4 my-3 rounded-2xl border border-warm-gray bg-surface/90 backdrop-blur-md shadow-xs px-4 py-2.5 flex items-center justify-between">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 font-bold text-forest dark:text-sage tracking-tight text-sm"
        >
          <div className="w-7 h-7 rounded-lg bg-forest text-white flex items-center justify-center">
            <Compass className="w-3.5 h-3.5" />
          </div>
          <span>Clothset</span>
        </Link>

        <div className="flex items-center gap-2">
          <ThemeToggle className="w-8 h-8 rounded-lg" />
          <button
            type="button"
            onClick={toggleMobile}
            className="p-1.5 rounded-xl border border-warm-gray text-charcoal hover:bg-cream transition-colors cursor-pointer"
            aria-label="Open sidebar"
          >
            <Menu className="w-4 h-4" />
          </button>
        </div>
      </div>

      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-xs p-4 flex items-center justify-center"
          onClick={closeMobile}
        >
          <div
            className="w-full max-w-xs max-h-[90vh] bg-surface rounded-2xl shadow-xl border border-warm-gray overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {sidebarContent}
          </div>
        </div>
      )}

      <aside
        className={`hidden lg:flex flex-col w-64 shrink-0 bg-surface border border-warm-gray rounded-2xl shadow-sm h-[calc(100vh-2rem)] sticky top-4 my-4 ml-4 overflow-y-auto ${className}`}
      >
        {sidebarContent}
      </aside>
    </>
  );
}
