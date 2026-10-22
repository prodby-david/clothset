"use client";

import React from "react";
import { Folder, Layers, ShieldCheck } from "lucide-react";
import { SAMPLE_WARDROBE_DRAWER } from "../constants/landing-cta.constants";
import type { WardrobeDrawerPreviewProps } from "../types/landing-cta.types";

export default function WardrobeDrawerPreview({
  className = "",
  data = SAMPLE_WARDROBE_DRAWER,
}: WardrobeDrawerPreviewProps) {
  return (
    <div
      className={`bg-gradient-to-br from-forest via-[#28372b] to-[#162018] text-white p-7 sm:p-8 rounded-3xl border border-forest/80 shadow-md flex flex-col justify-between relative overflow-hidden ${className}`}
    >
      <div className="absolute top-0 right-0 w-48 h-48 bg-sage/20 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-semibold text-pale-sage dark:text-sage uppercase tracking-wider flex items-center gap-1.5">
            <Folder className="w-3.5 h-3.5" />
            <span>Digital Wardrobe Drawer</span>
          </span>
          <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-white/10 text-white border border-white/15">
            Standard Tier
          </span>
        </div>

        <h3 className="text-lg font-bold text-white tracking-tight">
          {data.drawerName}
        </h3>
        <p className="mt-1 text-xs text-pale-sage/80 dark:text-sage/80 leading-relaxed">
          Cataloged collection partitioned by high-level category and item capacity.
        </p>

        <div className="mt-5 p-4 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/15 flex flex-col gap-2.5">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-white">
              {data.currentCount} of {data.maxCount} items utilized
            </span>
            <span className="font-mono text-pale-sage dark:text-sage font-bold">
              {data.percentage}% capacity
            </span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
            <div
              className="bg-pale-sage dark:bg-sage h-full rounded-full transition-all duration-500"
              style={{ width: `${data.percentage}%` }}
            />
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {data.categories.map((cat) => (
            <span
              key={cat.id}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/10 border border-white/15 text-xs text-white"
            >
              <span className="font-medium">{cat.label}</span>
              <span className="text-[11px] font-mono text-pale-sage dark:text-sage">
                {cat.count}
              </span>
            </span>
          ))}
        </div>

        <div className="mt-4 space-y-2">
          {data.sampleItems.map((item) => (
            <div
              key={item.id}
              className="p-2.5 rounded-xl bg-white/10 backdrop-blur-xs border border-white/15 flex items-center justify-between text-xs"
            >
              <div className="flex items-center gap-2">
                <span className="font-semibold text-white">{item.name}</span>
                <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-white/15 text-pale-sage dark:text-sage">
                  {item.category}
                </span>
              </div>
              <span className="text-pale-sage/90 dark:text-sage text-[11px]">
                {item.color}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="relative z-10 mt-6 pt-5 border-t border-white/15 flex items-center justify-between text-xs">
        <div className="flex items-center gap-1.5 text-pale-sage/90 dark:text-sage">
          <Layers className="w-3.5 h-3.5" />
          <span>Independent Wardrobe Isolation</span>
        </div>
        <div className="flex items-center gap-1 text-[11px] text-white/80">
          <ShieldCheck className="w-3.5 h-3.5 text-pale-sage dark:text-sage" />
          <span>Zero Fabricated Items</span>
        </div>
      </div>
    </div>
  );
}
