"use client";

import React from "react";
import type { DashboardBottomNavProps } from "../types/dashboard.types";
import { DASHBOARD_NAV_ITEMS } from "../constants/dashboard.constants";

export default function DashboardBottomNav({
  activeTab,
  onSelectTab,
}: DashboardBottomNavProps) {
  return (
    <nav
      aria-label="Mobile navigation"
      className="lg:hidden fixed bottom-3 inset-x-4 z-40 bg-surface/95 backdrop-blur-md border border-warm-gray rounded-2xl shadow-lg px-2 py-1.5 flex items-center justify-around"
    >
      {DASHBOARD_NAV_ITEMS.map(({ id, label, icon: Icon }) => {
        const isActive = activeTab === id;
        return (
          <button
            key={id}
            type="button"
            onClick={() => onSelectTab(id)}
            className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all cursor-pointer min-w-[56px] ${
              isActive
                ? "text-forest dark:text-sage font-bold bg-pale-sage/70"
                : "text-muted-gray hover:text-charcoal"
            }`}
          >
            <Icon className={`w-4 h-4 ${isActive ? "text-forest dark:text-sage" : "text-muted-gray"}`} />
            <span className="text-[11px] mt-0.5 leading-tight">{label}</span>
          </button>
        );
      })}
    </nav>
  );
}
