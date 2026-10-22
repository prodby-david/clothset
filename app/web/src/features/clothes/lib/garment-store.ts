export const CATEGORY_IMAGE_FALLBACKS: Record<string, string> = {
  Tops: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80",
  TOPS: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80",
  Bottoms: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=600&q=80",
  BOTTOMS: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=600&q=80",
  Outerwear: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=600&q=80",
  OUTERWEAR: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=600&q=80",
  Dresses: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=600&q=80",
  DRESSES: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=600&q=80",
  Footwear: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=600&q=80",
  FOOTWEAR: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=600&q=80",
  Accessories: "https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=600&q=80",
  ACCESSORIES: "https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=600&q=80",
  Other: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=600&q=80",
  OTHER: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=600&q=80",
};

export function normalizeCategory(category: string): string {
  const lower = (category || "").toLowerCase().trim();
  if (lower.startsWith("top") || lower.startsWith("shirt") || lower.startsWith("tee")) return "Tops";
  if (lower.startsWith("bottom") || lower.startsWith("trouser") || lower.startsWith("pant") || lower.startsWith("jean")) return "Bottoms";
  if (lower.startsWith("outer") || lower.startsWith("jacket") || lower.startsWith("coat") || lower.startsWith("blazer")) return "Outerwear";
  if (lower.startsWith("dress") || lower.startsWith("skirt") || lower.startsWith("gown")) return "Dresses";
  if (lower.startsWith("foot") || lower.startsWith("shoe") || lower.startsWith("boot") || lower.startsWith("loafer") || lower.startsWith("trainer") || lower.startsWith("sneaker")) return "Footwear";
  if (lower.startsWith("access") || lower.startsWith("bag") || lower.startsWith("belt") || lower.startsWith("hat") || lower.startsWith("jewelry")) return "Accessories";
  return category || "Other";
}

export function normalizeSeason(season: string): string {
  const lower = (season || "").toLowerCase().trim();
  if (lower.includes("all")) return "All Season";
  if (lower.includes("spring")) return "Spring";
  if (lower.includes("summer")) return "Summer";
  if (lower.includes("autumn") || lower.includes("fall")) return "Autumn";
  if (lower.includes("winter")) return "Winter";
  return season || "All Season";
}
