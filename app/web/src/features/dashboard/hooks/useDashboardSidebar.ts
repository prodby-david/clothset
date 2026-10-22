"use client";

import { useState } from "react";
import type { DashboardTab } from "../types/dashboard.types";

interface UseDashboardSidebarParams {
  totalClothesCount: number;
  planLimit: number;
  onSelectWardrobe: (id: string) => void;
  onSelectTab?: (tab: DashboardTab) => void;
}

export function useDashboardSidebar({
  totalClothesCount,
  planLimit,
  onSelectWardrobe,
  onSelectTab,
}: UseDashboardSidebarParams) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const planPercentage = Math.min(
    100,
    Math.round((totalClothesCount / planLimit) * 100)
  );

  const toggleMobile = () => {
    setIsMobileOpen((prev) => !prev);
  };

  const closeMobile = () => {
    setIsMobileOpen(false);
  };

  const handleNavClick = (tab: DashboardTab) => {
    if (tab === "clothes") {
      onSelectWardrobe("all");
    }
    onSelectTab?.(tab);
    setIsMobileOpen(false);
  };

  const handleSelectWardrobe = (id: string) => {
    onSelectWardrobe(id);
    setIsMobileOpen(false);
  };

  return {
    isMobileOpen,
    toggleMobile,
    closeMobile,
    planPercentage,
    handleNavClick,
    handleSelectWardrobe,
  };
}
