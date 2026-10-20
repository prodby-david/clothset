"use client";

import { Folder, Shirt, Palette, PieChart, Layers } from "lucide-react";
import { motion } from "motion/react";
import Card from "@/shared/components/ui/Card";
import Badge from "@/shared/components/ui/Badge";
import { WardrobeInsightsProps } from "../types/dashboard.types";

const COLOR_DISTRIBUTION = [
  { name: "Warm Cream", hex: "#F7F5EF", percent: 35, border: "#E5E2DA" },
  { name: "Sage Green", hex: "#87977A", percent: 25, border: "#87977A" },
  { name: "Forest Green", hex: "#354438", percent: 20, border: "#354438" },
  { name: "Earthy Taupe", hex: "#C2CEB9", percent: 12, border: "#B5C2AC" },
  { name: "Charcoal", hex: "#292C28", percent: 8, border: "#292C28" },
];

const CATEGORY_STATS = [
  { label: "Tops & Shirts", count: 18, percent: 40 },
  { label: "Trousers & Bottoms", count: 12, percent: 27 },
  { label: "Footwear", count: 8, percent: 18 },
  { label: "Outerwear & Layers", count: 6, percent: 15 },
];

export default function WardrobeInsights({
  totalClosets,
  totalGarments,
}: WardrobeInsightsProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
      <motion.div
        whileHover={{ y: -2 }}
        transition={{ duration: 0.15, ease: "easeOut" }}
      >
        <Card className="p-6 h-full flex flex-col justify-between border border-warm-gray bg-surface hover:border-sage/50 transition-colors">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-gray flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-sage" />
                <span>Wardrobe Health</span>
              </span>
              <Badge variant="accent">Balanced</Badge>
            </div>

            <div className="grid grid-cols-2 gap-4 my-2">
              <div className="p-3.5 rounded-xl bg-cream border border-warm-gray">
                <div className="flex items-center gap-2 text-muted-gray mb-1">
                  <Shirt className="w-4 h-4 text-forest" />
                  <span className="text-xs">Total Pieces</span>
                </div>
                <span className="text-xl sm:text-2xl font-bold text-charcoal tracking-tight">
                  {totalGarments || 44}
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-cream border border-warm-gray">
                <div className="flex items-center gap-2 text-muted-gray mb-1">
                  <Folder className="w-4 h-4 text-forest" />
                  <span className="text-xs">Capsule Closets</span>
                </div>
                <span className="text-xl sm:text-2xl font-bold text-charcoal tracking-tight">
                  {totalClosets || 3}
                </span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-warm-gray/60 mt-4 text-xs text-muted-gray flex items-center justify-between">
            <span>Capsule Foundation Ratio</span>
            <span className="font-semibold text-forest">70% Basics / 30% Accent</span>
          </div>
        </Card>
      </motion.div>

      <motion.div
        whileHover={{ y: -2 }}
        transition={{ duration: 0.15, ease: "easeOut" }}
      >
        <Card className="p-6 h-full flex flex-col justify-between border border-warm-gray bg-surface hover:border-sage/50 transition-colors">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-gray flex items-center gap-1.5">
                <Palette className="w-3.5 h-3.5 text-sage" />
                <span>Color Palette Harmony</span>
              </span>
              <span className="text-xs font-semibold text-sage">5 Tones</span>
            </div>

            <div className="h-3 w-full rounded-full overflow-hidden flex my-3 border border-warm-gray">
              {COLOR_DISTRIBUTION.map((color) => (
                <div
                  key={color.name}
                  style={{
                    width: `${color.percent}%`,
                    backgroundColor: color.hex,
                  }}
                  className="h-full"
                  title={`${color.name}: ${color.percent}%`}
                />
              ))}
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
              {COLOR_DISTRIBUTION.map((color) => (
                <div
                  key={color.name}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-cream border border-warm-gray text-xs text-charcoal"
                >
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{
                      backgroundColor: color.hex,
                      border: `1px solid ${color.border}`,
                    }}
                  />
                  <span className="font-medium text-xs">{color.name}</span>
                  <span className="text-muted-gray text-xs">{color.percent}%</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-warm-gray/60 mt-4 text-xs text-muted-gray flex items-center justify-between">
            <span>Palette Aesthetic</span>
            <span className="font-semibold text-forest">Earthy Sage & Cream</span>
          </div>
        </Card>
      </motion.div>

      <motion.div
        whileHover={{ y: -2 }}
        transition={{ duration: 0.15, ease: "easeOut" }}
      >
        <Card className="p-6 h-full flex flex-col justify-between border border-warm-gray bg-surface hover:border-sage/50 transition-colors">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-gray flex items-center gap-1.5">
                <PieChart className="w-3.5 h-3.5 text-sage" />
                <span>Category Distribution</span>
              </span>
              <span className="text-xs font-semibold text-muted-gray">4 Categories</span>
            </div>

            <div className="space-y-3">
              {CATEGORY_STATS.map((cat) => (
                <div key={cat.label} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="font-medium text-charcoal">{cat.label}</span>
                    <span className="text-muted-gray font-mono">{cat.count}</span>
                  </div>
                  <div className="h-2 w-full bg-cream rounded-full overflow-hidden border border-warm-gray/60">
                    <div
                      className="h-full bg-forest rounded-full transition-all duration-300"
                      style={{ width: `${cat.percent}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-warm-gray/60 mt-4 text-xs text-muted-gray flex items-center justify-between">
            <span>Primary Focus</span>
            <span className="font-semibold text-forest">Interchangeable Tops</span>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
