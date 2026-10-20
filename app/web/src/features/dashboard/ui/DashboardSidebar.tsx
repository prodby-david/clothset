"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  Sparkles,
  BarChart3,
  Layers,
  Briefcase,
  Shirt,
  Award,
  SunSnow,
  Folder,
  Plus,
  LogOut,
  Menu,
  X,
  Compass,
} from "lucide-react";
import Button from "@/shared/components/ui/Button";
import { Closet } from "@/features/closets/types/closet.types";
import { DashboardSidebarProps } from "../types/dashboard.types";

const TYPE_ICONS: Record<string, React.ElementType> = {
  capsule: Layers,
  work: Briefcase,
  everyday: Shirt,
  formal: Award,
  seasonal: SunSnow,
  custom: Folder,
};

export default function DashboardSidebar({
  userEmail,
  userName,
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
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const planPercentage = Math.min(100, Math.round((totalClothesCount / planLimit) * 100));

  const getWardrobeIcon = (type: string) => {
    const Icon = TYPE_ICONS[type] || Shirt;
    return <Icon className="w-3.5 h-3.5 shrink-0" />;
  };

  const handleNavClick = (tab: "overview" | "wardrobes" | "clothes" | "outfits" | "insights") => {
    if (tab === "clothes") {
      onSelectWardrobe("all");
    }
    onSelectTab?.(tab);
    setIsMobileOpen(false);
  };

  const handleSelect = (id: string) => {
    onSelectWardrobe(id);
    setIsMobileOpen(false);
  };

  const sidebarContent = (
    <div className="flex flex-col h-full justify-between p-3.5 text-charcoal">
      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 font-bold text-base text-forest tracking-tight"
          >
            <div className="w-7 h-7 rounded-lg bg-forest text-cream flex items-center justify-center shadow-xs">
              <Compass className="w-3.5 h-3.5" />
            </div>
            <span>Clothset</span>
          </Link>
          <button
            type="button"
            onClick={() => setIsMobileOpen(false)}
            className="lg:hidden p-1.5 rounded-lg text-muted-gray hover:text-charcoal hover:bg-cream"
            aria-label="Close sidebar"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <nav className="flex flex-col gap-1">
          <button
            type="button"
            onClick={() => handleNavClick("overview")}
            className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-xs font-semibold transition-all text-left cursor-pointer ${
              activeTab === "overview"
                ? "bg-forest text-white shadow-xs"
                : "text-charcoal hover:bg-cream"
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5 shrink-0" />
            <span>Overview</span>
          </button>

          <button
            type="button"
            onClick={() => handleNavClick("wardrobes")}
            className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-xs font-semibold transition-all text-left cursor-pointer ${
              activeTab === "wardrobes"
                ? "bg-forest text-white shadow-xs"
                : "text-charcoal hover:bg-cream"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Layers className="w-3.5 h-3.5 shrink-0" />
              <span>Wardrobes</span>
            </div>
            <span
              className={`text-xs px-1.5 py-0.5 rounded-md font-mono ${
                activeTab === "wardrobes"
                  ? "bg-white/20 text-white"
                  : "bg-sand text-muted-gray"
              }`}
            >
              {closets.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => handleNavClick("clothes")}
            className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-xs font-semibold transition-all text-left cursor-pointer ${
              activeTab === "clothes" && selectedWardrobeId === "all"
                ? "bg-forest text-white shadow-xs"
                : "text-charcoal hover:bg-cream"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Shirt className="w-3.5 h-3.5 shrink-0" />
              <span>All Clothes</span>
            </div>
            <span
              className={`text-xs px-1.5 py-0.5 rounded-md font-mono ${
                activeTab === "clothes" && selectedWardrobeId === "all"
                  ? "bg-white/20 text-white"
                  : "bg-sand text-muted-gray"
              }`}
            >
              {totalClothesCount}
            </span>
          </button>

          <button
            type="button"
            onClick={() => handleNavClick("outfits")}
            className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-xs font-semibold transition-all text-left cursor-pointer ${
              activeTab === "outfits"
                ? "bg-forest text-white shadow-xs"
                : "text-charcoal hover:bg-cream"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-sage shrink-0" />
            <span>Outfit Ideas</span>
          </button>

          <button
            type="button"
            onClick={() => handleNavClick("insights")}
            className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-xs font-semibold transition-all text-left cursor-pointer ${
              activeTab === "insights"
                ? "bg-forest text-white shadow-xs"
                : "text-charcoal hover:bg-cream"
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5 text-sage shrink-0" />
            <span>Insights</span>
          </button>
        </nav>

        <div className="flex flex-col gap-2 pt-3 border-t border-warm-gray">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-gray">
              Wardrobes ({closets.length})
            </span>
            <button
              type="button"
              onClick={() => {
                setIsMobileOpen(false);
                onCreateCloset();
              }}
              className="p-1 rounded-md text-sage hover:text-forest hover:bg-pale-sage/60 transition-colors cursor-pointer"
              aria-label="Create new closet"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex flex-col gap-1 max-h-[200px] overflow-y-auto pr-1">
            {closets.map((closet: Closet) => {
              const isSelected = activeTab === "clothes" && selectedWardrobeId === closet.id;
              const count = closet.clothesCount || 0;
              const max = closet.maxSize || 50;

              return (
                <button
                  key={closet.id}
                  type="button"
                  onClick={() => handleSelect(closet.id)}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-xs transition-all text-left group cursor-pointer ${
                    isSelected
                      ? "bg-pale-sage text-forest font-bold shadow-xs border border-sage/40"
                      : "text-charcoal hover:bg-cream border border-transparent"
                  }`}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span className={isSelected ? "text-forest" : "text-sage group-hover:text-forest"}>
                      {getWardrobeIcon(closet.type)}
                    </span>
                    <span className="truncate">{closet.name}</span>
                  </div>
                  <span
                    className={`text-xs px-1.5 py-0.5 rounded-md font-mono shrink-0 ${
                      isSelected
                        ? "bg-forest/10 text-forest font-semibold"
                        : "bg-sand text-muted-gray"
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
            onClick={() => {
              setIsMobileOpen(false);
              onCreateCloset();
            }}
            className="w-full flex items-center justify-center gap-1.5 py-1.5 px-2 mt-1 rounded-xl border border-dashed border-warm-gray text-xs font-semibold text-muted-gray hover:text-forest hover:border-sage bg-cream/30 hover:bg-cream/60 transition-all cursor-pointer"
          >
            <Plus className="w-3 h-3" />
            <span>New Capsule</span>
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-3 pt-3 border-t border-warm-gray">
        <div className="p-2.5 rounded-xl bg-cream border border-warm-gray flex flex-col gap-1.5">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className="text-charcoal text-xs">Free Capacity</span>
            <span className="text-sage font-mono text-xs">
              {totalClothesCount} / {planLimit}
            </span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-sand overflow-hidden">
            <div
              className="h-full bg-deep-sage rounded-full transition-all duration-300"
              style={{ width: `${planPercentage}%` }}
            />
          </div>
        </div>

        <div className="flex items-center justify-between gap-2 pt-0.5">
          <div className="min-w-0 flex-1">
            <p className="text-sm font-bold text-charcoal truncate">
              {userName || "Wardrobe Owner"}
            </p>
            <p className="text-xs text-muted-gray truncate">
              {userEmail || "guest@clothset.app"}
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onLogout}
            className="p-1 h-auto text-muted-gray hover:text-charcoal hover:bg-cream"
            aria-label="Sign out"
          >
            <LogOut className="w-3.5 h-3.5" />
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
          className="flex items-center gap-2 font-bold text-forest tracking-tight text-sm"
        >
          <div className="w-6 h-6 rounded-md bg-forest text-cream flex items-center justify-center">
            <Compass className="w-3 h-3" />
          </div>
          <span>Clothset</span>
        </Link>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsMobileOpen(true)}
            className="p-1.5 rounded-xl border border-warm-gray text-charcoal hover:bg-cream transition-colors cursor-pointer"
            aria-label="Open sidebar"
          >
            <Menu className="w-4 h-4" />
          </button>
        </div>
      </div>

      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-50 bg-charcoal/40 backdrop-blur-xs p-4 flex items-center justify-center"
          onClick={() => setIsMobileOpen(false)}
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
        className={`hidden lg:flex flex-col w-56 shrink-0 bg-surface border border-warm-gray rounded-2xl shadow-sm h-[calc(100vh-2rem)] sticky top-4 my-4 ml-4 overflow-y-auto ${className}`}
      >
        {sidebarContent}
      </aside>
    </>
  );
}
