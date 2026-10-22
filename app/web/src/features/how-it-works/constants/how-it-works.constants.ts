import { Camera, Sliders, Layers, SunMedium, Maximize2, Scan, FolderPlus } from "lucide-react";
import type { RoutineDay } from "../types/how-it-works.types";

export const HOW_IT_WORKS_STEPS = [
  {
    number: "01",
    icon: Camera,
    title: "Snap & Upload",
    description:
      "Take a quick photo of your clothes with your phone or drag and drop files from your desktop. Neutral lighting and plain backgrounds work best.",
  },
  {
    number: "02",
    icon: Sliders,
    title: "AI Scanning & Tagging",
    description:
      "Clothset detects clothing categories, colors, textures, and seasons, adding each piece into your digital wardrobe in seconds.",
  },
  {
    number: "03",
    icon: Layers,
    title: "Discover Fresh Outfits",
    description:
      "Generate coordinated outfit recommendations matched to your day and the weather, using only clothes you actually own.",
  },
];

export const DIGITIZE_TIPS = [
  {
    number: "01",
    icon: SunMedium,
    title: "Natural Indirect Light",
    description:
      "Photograph near a window during daytime. Avoid harsh overhead tungsten lamps or direct flash to preserve true garment colors.",
    tip: "Best time: Morning or early afternoon",
  },
  {
    number: "02",
    icon: Maximize2,
    title: "Neutral Contrast Backdrop",
    description:
      "Place items against a neutral floor, bedspread, or hang against a plain wall. Clean contrast allows edge detection to isolate silhouettes flawlessly.",
    tip: "Wooden hangers work wonderfully",
  },
  {
    number: "03",
    icon: Scan,
    title: "Single Item per Frame",
    description:
      "Take one photo per garment. Avoid overlapping clothes or accessories in the same frame for the most accurate material parsing.",
    tip: "Keep garments lightly smoothed out",
  },
  {
    number: "04",
    icon: FolderPlus,
    title: "Instant Wardrobe Assignment",
    description:
      "Once scanned, assign pieces directly to work, weekend, or seasonal closets with a single tap to keep everything organized immediately.",
    tip: "Organize as you upload",
  },
];

export const ROUTINE_DAYS: RoutineDay[] = [
  {
    id: "mon",
    day: "Mon",
    fullDay: "Monday",
    occasion: "Strategic Planning & Standups",
    vibe: "Structured & Polished",
    items: [
      {
        id: "item-1",
        category: "Layer",
        name: "Tailored Linen Blazer",
        color: "Forest Green",
      },
      {
        id: "item-2",
        category: "Top",
        name: "Organic Cotton Poplin Shirt",
        color: "Crisp White",
      },
      {
        id: "item-3",
        category: "Bottom",
        name: "Pleated Wide Trousers",
        color: "Charcoal Slate",
      },
    ],
  },
  {
    id: "tue",
    day: "Tue",
    fullDay: "Tuesday",
    occasion: "Design Reviews & Focus Work",
    vibe: "Relaxed Minimalist",
    items: [
      {
        id: "item-4",
        category: "Top",
        name: "Merino Wool Knit",
        color: "Oatmeal Cream",
      },
      {
        id: "item-5",
        category: "Bottom",
        name: "Tapered Cotton Chinos",
        color: "Warm Sand",
      },
      {
        id: "item-6",
        category: "Footwear",
        name: "Minimalist Leather Derby",
        color: "Espresso",
      },
    ],
  },
  {
    id: "wed",
    day: "Wed",
    fullDay: "Wednesday",
    occasion: "Client Lunch & Presentations",
    vibe: "Elevated Tailoring",
    items: [
      {
        id: "item-1",
        category: "Layer",
        name: "Tailored Linen Blazer",
        color: "Forest Green",
      },
      {
        id: "item-4",
        category: "Top",
        name: "Merino Wool Knit",
        color: "Oatmeal Cream",
      },
      {
        id: "item-3",
        category: "Bottom",
        name: "Pleated Wide Trousers",
        color: "Charcoal Slate",
      },
    ],
  },
  {
    id: "thu",
    day: "Thu",
    fullDay: "Thursday",
    occasion: "Team Brainstorming & Errand Runs",
    vibe: "Contemporary Casual",
    items: [
      {
        id: "item-2",
        category: "Top",
        name: "Organic Cotton Poplin Shirt",
        color: "Crisp White",
      },
      {
        id: "item-7",
        category: "Bottom",
        name: "Straight Raw Denim",
        color: "Deep Indigo",
      },
      {
        id: "item-8",
        category: "Layer",
        name: "Lightweight Trench",
        color: "Pale Stone",
      },
    ],
  },
  {
    id: "fri",
    day: "Fri",
    fullDay: "Friday",
    occasion: "Closing Sprints & Casual Drinks",
    vibe: "Smart Casual Transition",
    items: [
      {
        id: "item-1",
        category: "Layer",
        name: "Tailored Linen Blazer",
        color: "Forest Green",
      },
      {
        id: "item-9",
        category: "Top",
        name: "Pima Cotton T-Shirt",
        color: "Muted Chalk",
      },
      {
        id: "item-7",
        category: "Bottom",
        name: "Straight Raw Denim",
        color: "Deep Indigo",
      },
    ],
  },
  {
    id: "sat",
    day: "Sat",
    fullDay: "Saturday",
    occasion: "Farmers Market & Art Walk",
    vibe: "Effortless Weekend",
    items: [
      {
        id: "item-4",
        category: "Top",
        name: "Merino Wool Knit",
        color: "Oatmeal Cream",
      },
      {
        id: "item-7",
        category: "Bottom",
        name: "Straight Raw Denim",
        color: "Deep Indigo",
      },
      {
        id: "item-6",
        category: "Footwear",
        name: "Minimalist Leather Derby",
        color: "Espresso",
      },
    ],
  },
  {
    id: "sun",
    day: "Sun",
    fullDay: "Sunday",
    occasion: "Dinner with Friends & Relaxation",
    vibe: "Understated Elegance",
    items: [
      {
        id: "item-8",
        category: "Layer",
        name: "Lightweight Trench",
        color: "Pale Stone",
      },
      {
        id: "item-2",
        category: "Top",
        name: "Organic Cotton Poplin Shirt",
        color: "Crisp White",
      },
      {
        id: "item-5",
        category: "Bottom",
        name: "Tapered Cotton Chinos",
        color: "Warm Sand",
      },
    ],
  },
];
