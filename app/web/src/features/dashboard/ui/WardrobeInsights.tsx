"use client";

import { Folder, Shirt, Palette, PieChart, Layers, BarChart3 } from "lucide-react";
import { motion } from "motion/react";
import Card from "@/shared/components/ui/Card";
import Badge from "@/shared/components/ui/Badge";
import EmptyState from "@/shared/components/ui/EmptyState";
import type { WardrobeInsightsProps } from "../types/dashboard.types";
import { normalizeCategory } from "@/features/clothes/lib/garment-store";

const KNOWN_COLOR_MAP: Record<string, { hex: string; border: string }> = {
  "Sage Green": { hex: "#87977A", border: "#748467" },
  "Warm Cream": { hex: "#F7F5EF", border: "#E5E2DA" },
  "Cream": { hex: "#F7F5EF", border: "#E5E2DA" },
  "Forest Green": { hex: "#354438", border: "#2A362D" },
  "Earthy Taupe": { hex: "#C2CEB9", border: "#B5C2AC" },
  "Taupe": { hex: "#C2CEB9", border: "#B5C2AC" },
  "Charcoal": { hex: "#292C28", border: "#1C1E1B" },
  "Black": { hex: "#18181B", border: "#09090B" },
  "White": { hex: "#FFFFFF", border: "#E4E4E7" },
  "Off White": { hex: "#FAF8F5", border: "#E5E2DA" },
  "Beige": { hex: "#E8E2D5", border: "#D4CCBD" },
  "Navy": { hex: "#1E293B", border: "#0F172A" },
  "Denim Blue": { hex: "#475569", border: "#334155" },
  "Brown": { hex: "#78350F", border: "#5E290B" },
  "Oatmeal": { hex: "#EDE8DF", border: "#DDD6C8" },
  "Earthy Sand": { hex: "#E3DAC9", border: "#D1C5B0" },
};

const CATEGORY_LABELS: Record<string, string> = {
  Tops: "Tops & Shirts",
  Bottoms: "Trousers & Bottoms",
  Footwear: "Footwear & Shoes",
  Outerwear: "Outerwear & Layers",
  Accessories: "Accessories & Bags",
};

export default function WardrobeInsights({
  totalClosets,
  totalGarments,
  garments = [],
  onAddGarment,
}: WardrobeInsightsProps) {
  if (totalGarments === 0 || garments.length === 0) {
    return (
      <EmptyState
        icon={<BarChart3 className="w-6 h-6" />}
        title="No wardrobe analytics yet"
        description="Add pieces to your wardrobes to visualize your category balance, color palette harmony, and foundation ratios."
        actionLabel={onAddGarment ? "Add Garment" : undefined}
        onAction={onAddGarment}
      />
    );
  }

  const effectiveTotal = garments.length || totalGarments || 1;

  const foundationCount = garments.filter((g) => {
    const c = normalizeCategory(g.category);
    return c === "Tops" || c === "Bottoms";
  }).length;
  const foundationPct = Math.round((foundationCount / effectiveTotal) * 100);
  const accentPct = Math.max(0, 100 - foundationPct);

  const healthStatus =
    foundationPct >= 55 && foundationPct <= 85
      ? "Balanced"
      : foundationPct > 85
      ? "Basics Heavy"
      : "Accent Heavy";

  const colorCounts = new Map<string, number>();
  for (const g of garments) {
    const col = g.color?.trim() || "Neutral";
    colorCounts.set(col, (colorCounts.get(col) || 0) + 1);
  }

  const sortedColors = Array.from(colorCounts.entries())
    .map(([name, count]) => ({
      name,
      count,
      percent: Math.max(1, Math.round((count / effectiveTotal) * 100)),
      hex: KNOWN_COLOR_MAP[name]?.hex || "#87977A",
      border: KNOWN_COLOR_MAP[name]?.border || "#748467",
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  const totalTopColorCount = sortedColors.reduce((acc, c) => acc + c.count, 0) || 1;

  const catCounts = new Map<string, number>();
  for (const g of garments) {
    const cat = normalizeCategory(g.category);
    catCounts.set(cat, (catCounts.get(cat) || 0) + 1);
  }

  const standardCategories = ["Tops", "Bottoms", "Outerwear", "Footwear", "Accessories"];
  const dynamicCategories = standardCategories.map((catKey) => {
    const count = catCounts.get(catKey) || 0;
    return {
      key: catKey,
      label: CATEGORY_LABELS[catKey] || catKey,
      count,
      percent: Math.round((count / effectiveTotal) * 100),
    };
  });

  const sortedCategories = [...dynamicCategories].sort((a, b) => b.count - a.count);
  const primaryCategory = sortedCategories[0]?.count > 0 ? sortedCategories[0].label : "Tops";

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
              <Badge variant="accent">{healthStatus}</Badge>
            </div>

            <div className="grid grid-cols-2 gap-4 my-2">
              <div className="p-3.5 rounded-xl bg-cream/50 dark:bg-[#151a16] border border-warm-gray">
                <div className="flex items-center gap-2 text-muted-gray mb-1">
                  <Shirt className="w-4 h-4 text-forest dark:text-sage" />
                  <span className="text-xs">Total Pieces</span>
                </div>
                <span className="text-xl sm:text-2xl font-bold text-charcoal tracking-tight font-mono">
                  {totalGarments}
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-cream/50 dark:bg-[#151a16] border border-warm-gray">
                <div className="flex items-center gap-2 text-muted-gray mb-1">
                  <Folder className="w-4 h-4 text-forest dark:text-sage" />
                  <span className="text-xs">Wardrobes</span>
                </div>
                <span className="text-xl sm:text-2xl font-bold text-charcoal tracking-tight font-mono">
                  {totalClosets}
                </span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-warm-gray/60 mt-4 text-xs text-muted-gray flex items-center justify-between">
            <span>Wardrobe Foundation Ratio</span>
            <span className="font-semibold text-forest dark:text-sage">
              {foundationPct}% Basics / {accentPct}% Accent
            </span>
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
              <span className="text-xs font-semibold text-sage">
                {sortedColors.length} Tones
              </span>
            </div>

            <div className="h-3 w-full rounded-full overflow-hidden flex my-3 border border-warm-gray">
              {sortedColors.map((color) => (
                <div
                  key={color.name}
                  style={{
                    width: `${(color.count / totalTopColorCount) * 100}%`,
                    backgroundColor: color.hex,
                  }}
                  className="h-full"
                  title={`${color.name}: ${color.percent}%`}
                />
              ))}
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
              {sortedColors.map((color) => (
                <div
                  key={color.name}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-cream/50 dark:bg-[#151a16] border border-warm-gray text-xs text-charcoal"
                >
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{
                      backgroundColor: color.hex,
                      border: `1px solid ${color.border}`,
                    }}
                  />
                  <span className="font-medium text-xs">{color.name}</span>
                  <span className="text-muted-gray text-xs font-mono">{color.percent}%</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-warm-gray/60 mt-4 text-xs text-muted-gray flex items-center justify-between">
            <span>Palette Aesthetic</span>
            <span className="font-semibold text-forest dark:text-sage truncate max-w-[180px]">
              {sortedColors[0]?.name || "Natural"} & {sortedColors[1]?.name || "Tones"}
            </span>
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
              <span className="text-xs font-semibold text-muted-gray">
                {dynamicCategories.filter((c) => c.count > 0).length} Active Categories
              </span>
            </div>

            <div className="space-y-3">
              {dynamicCategories.map((cat) => (
                <div key={cat.label} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="font-medium text-charcoal">{cat.label}</span>
                    <span className="text-muted-gray font-mono">{cat.count}</span>
                  </div>
                  <div className="h-2 w-full bg-warm-gray/40 dark:bg-[#252f27] rounded-full overflow-hidden border border-warm-gray/60">
                    <div
                      className="h-full bg-forest dark:bg-sage rounded-full transition-all duration-300"
                      style={{ width: `${cat.percent}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-warm-gray/60 mt-4 text-xs text-muted-gray flex items-center justify-between">
            <span>Primary Focus</span>
            <span className="font-semibold text-forest dark:text-sage truncate max-w-[180px]">
              {primaryCategory}
            </span>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
