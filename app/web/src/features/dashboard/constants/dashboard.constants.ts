import React from "react";
import {
  Shirt,
  Briefcase,
  Award,
  SunSnow,
  Layers,
  Folder,
  LayoutDashboard,
} from "lucide-react";
import type { DashboardTab } from "../types/dashboard.types";

export const CLOSET_TYPE_ICONS: Record<string, React.ElementType> = {
  capsule: Layers,
  work: Briefcase,
  everyday: Shirt,
  formal: Award,
  seasonal: SunSnow,
  custom: Folder,
};

export const DASHBOARD_CATEGORIES = [
  { id: "all", label: "All Pieces" },
  { id: "Clothing", label: "Clothing" },
  { id: "Footwear", label: "Footwear" },
  { id: "Accessories", label: "Accessories" },
  { id: "Other", label: "Other" },
];

export const CLOTHING_SUBCATEGORIES = [
  { id: "all_clothing", label: "All Clothing" },
  { id: "Tops", label: "Tops" },
  { id: "Bottoms", label: "Bottoms" },
  { id: "Outerwear", label: "Outerwear" },
  { id: "Dresses", label: "Dresses" },
];

export const DASHBOARD_NAV_ITEMS: {
  id: DashboardTab;
  label: string;
  icon: React.ElementType;
}[] = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "wardrobes", label: "Wardrobes", icon: Layers },
  { id: "clothes", label: "Clothes", icon: Shirt },
];

export const CATEGORY_OPTIONS = [
  { value: "TOPS", label: "Tops & Shirts" },
  { value: "BOTTOMS", label: "Bottoms & Trousers" },
  { value: "OUTERWEAR", label: "Outerwear & Jackets" },
  { value: "DRESSES", label: "Dresses & Jumpsuits" },
  { value: "FOOTWEAR", label: "Footwear & Shoes" },
  { value: "ACCESSORIES", label: "Accessories & Bags" },
  { value: "OTHER", label: "Other Essentials" },
];

export const SEASON_OPTIONS = [
  { value: "All Season", label: "All Season" },
  { value: "Spring", label: "Spring" },
  { value: "Summer", label: "Summer" },
  { value: "Autumn", label: "Autumn" },
  { value: "Winter", label: "Winter" },
];

export const QUICK_COLORS = [
  "Sage Green",
  "Cream",
  "Charcoal",
  "Beige",
  "Navy",
  "White",
  "Forest Green",
  "Black",
];
