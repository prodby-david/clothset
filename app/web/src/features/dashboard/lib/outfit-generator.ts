import type { DailyOutfit, RecentGarment } from "../types/dashboard.types";
import { normalizeCategory } from "@/features/clothes/lib/garment-store";

export interface OutfitGenerationResult {
  outfit: DailyOutfit | null;
  availablePieces: {
    tops: number;
    bottoms: number;
    footwear: number;
  };
  hasSufficientPieces: boolean;
}

export function generateDailyOutfit(
  garments: RecentGarment[],
  occasion: "work" | "casual" | "evening",
  index: number = 0
): OutfitGenerationResult {
  const tops = garments.filter((g) => normalizeCategory(g.category) === "Tops");
  const bottoms = garments.filter((g) => normalizeCategory(g.category) === "Bottoms");
  const footwear = garments.filter((g) => normalizeCategory(g.category) === "Footwear");

  const availablePieces = {
    tops: tops.length,
    bottoms: bottoms.length,
    footwear: footwear.length,
  };

  const hasSufficientPieces = tops.length > 0 && bottoms.length > 0 && footwear.length > 0;

  if (!hasSufficientPieces) {
    return {
      outfit: null,
      availablePieces,
      hasSufficientPieces: false,
    };
  }

  const top = tops[Math.abs(index) % tops.length];
  const bottom = bottoms[Math.abs(index + Math.floor(index / tops.length)) % bottoms.length];
  const shoe = footwear[Math.abs(index + Math.floor(index / (tops.length * bottoms.length || 1))) % footwear.length];

  const occasionLabel =
    occasion === "work" ? "Smart Workday" : occasion === "evening" ? "Evening Curated" : "Casual Weekend";
  const harmony = `${92 + ((Math.abs(index) * 3) % 8)}% Color Harmony`;
  const weather =
    occasion === "work"
      ? "Mild & Clear • 20°C"
      : occasion === "evening"
      ? "Cool Evening • 18°C"
      : "Pleasant Breeze • 22°C";

  const topColor = (top.color || "neutral").toLowerCase();
  const bottomColor = (bottom.color || "neutral").toLowerCase();
  const shoeColor = (shoe.color || "neutral").toLowerCase();
  const reason = `Curated from your library: pairing your ${topColor} ${top.name} with ${bottomColor} ${bottom.name}, finished with ${shoeColor} ${shoe.name}. Styled strictly from pieces you own.`;

  const outfit: DailyOutfit = {
    id: `do_${occasion}_${top.id}_${bottom.id}_${shoe.id}`,
    title: `${occasionLabel} Ensemble`,
    occasion,
    weather,
    harmony,
    top: {
      id: top.id,
      name: top.name,
      category: "Tops",
      color: top.color,
      imageUrl: top.imageUrl,
    },
    bottom: {
      id: bottom.id,
      name: bottom.name,
      category: "Bottoms",
      color: bottom.color,
      imageUrl: bottom.imageUrl,
    },
    footwear: {
      id: shoe.id,
      name: shoe.name,
      category: "Footwear",
      color: shoe.color,
      imageUrl: shoe.imageUrl,
    },
    reason,
  };

  return {
    outfit,
    availablePieces,
    hasSufficientPieces: true,
  };
}
