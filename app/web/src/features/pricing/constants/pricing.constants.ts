import type { MatrixCategory } from "../types/pricing.types";

export const COMPARISON_MATRIX_CATEGORIES: MatrixCategory[] = [
  {
    category: "Wardrobe Storage & Capacity",
    icon: "archive",
    features: [
      {
        name: "Total Clothing Items",
        description: "Active wardrobe garments you can upload and catalog",
        basic: "Up to 40 items (20 / wardrobe)",
        plus: "Up to 150 items (30 / wardrobe)",
        elite: "Up to 400 items (50 / wardrobe)",
      },
      {
        name: "Custom Wardrobes",
        description: "Curated groupings for work, weekend, travel, or seasons",
        basic: "2 wardrobes",
        plus: "5 wardrobes",
        elite: "8 wardrobes",
      },
      {
        name: "Photo Storage Resolution",
        description: "Clear photo quality saved in private cloud storage",
        basic: "Standard",
        plus: "High-Resolution",
        elite: "Ultra-HD & Studio",
      },
    ],
  },
  {
    category: "AI Styling & Smart Scanner",
    icon: "sparkles",
    features: [
      {
        name: "Smart Scanner & Auto-Tagging",
        description: "Automatic detection of categories, colors, and styles",
        basic: "10 items / month",
        plus: "100 items / month",
        elite: "Unlimited on-demand",
      },
      {
        name: "Color Harmony & Tone Detection",
        description: "Accurate palette detection and color theory matching",
        basic: "Basic palette",
        plus: "Advanced Harmony Matrix",
        elite: "Full Color Studio",
      },
      {
        name: "Daily Outfit Recommendations",
        description: "Occasion-driven outfit pairings using only your own clothes",
        basic: "3 daily suggestions",
        plus: "Unlimited daily ideas",
        elite: "Unlimited + Event Styling",
      },
      {
        name: "Mix-and-Match Versatility Score",
        description: "Shows you how many outfits your wardrobe can create",
        basic: false,
        plus: true,
        elite: true,
      },
    ],
  },
  {
    category: "Planning & Workflow Tools",
    icon: "calendar",
    features: [
      {
        name: "Seasonal Rotation Filters",
        description: "Quick filter toggles for Summer, Winter, Spring, and Autumn",
        basic: true,
        plus: true,
        elite: true,
      },
      {
        name: "Trip Packing Planner",
        description: "Build travel packing lists with maximum outfit combinations",
        basic: false,
        plus: "1 trip / month",
        elite: "Unlimited + Weather Sync",
      },
      {
        name: "Wardrobe CSV & PDF Export",
        description: "Export full inventory records, purchase dates, and tags",
        basic: false,
        plus: true,
        elite: true,
      },
    ],
  },
  {
    category: "Privacy & Support Vault",
    icon: "shield",
    features: [
      {
        name: "100% Private Cloud Vault",
        description: "Your wardrobe photos are never sold or trained on public models",
        basic: true,
        plus: true,
        elite: true,
      },
      {
        name: "Zero Third-Party Advertising",
        description: "No affiliate sponsors, banner ads, or fast-fashion marketing",
        basic: true,
        plus: true,
        elite: true,
      },
      {
        name: "Customer Support Desk",
        description: "Dedicated assistance for wardrobe setup and styling inquiries",
        basic: "Community FAQ",
        plus: "Priority Email (24h)",
        elite: "VIP Concierge Stylist",
      },
    ],
  },
];
