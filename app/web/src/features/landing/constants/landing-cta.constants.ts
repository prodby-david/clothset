import type { TrustBadgeItem, WardrobeDrawerPreviewData } from "../types/landing-cta.types";

export const LANDING_CTA_TRUST_BADGES: TrustBadgeItem[] = [
  {
    id: "no-card",
    label: "No credit card required",
    iconName: "check",
  },
  {
    id: "private",
    label: "100% private wardrobe data",
    iconName: "shield",
  },
  {
    id: "no-ads",
    label: "Zero fast-fashion ads",
    iconName: "check",
  },
];

export const SAMPLE_WARDROBE_DRAWER: WardrobeDrawerPreviewData = {
  drawerName: "Core Essentials Wardrobe",
  currentCount: 32,
  maxCount: 50,
  percentage: 64,
  categories: [
    { id: "tops", label: "Tops", count: 14 },
    { id: "bottoms", label: "Bottoms", count: 8 },
    { id: "footwear", label: "Footwear", count: 6 },
    { id: "accessories", label: "Accessories", count: 4 },
  ],
  sampleItems: [
    {
      id: "item-1",
      name: "Relaxed Boxy Tee",
      category: "Tops",
      color: "Warm Cream",
    },
    {
      id: "item-2",
      name: "Tailored Pleated Trouser",
      category: "Bottoms",
      color: "Forest Green",
    },
    {
      id: "item-3",
      name: "Suede Penny Loafer",
      category: "Footwear",
      color: "Earthy Taupe",
    },
    {
      id: "item-4",
      name: "Linen Overshirt",
      category: "Tops",
      color: "Sage Green",
    },
  ],
};
