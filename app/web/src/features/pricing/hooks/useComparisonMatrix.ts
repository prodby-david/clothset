import { MatrixCategory } from "../types/pricing.types";

export function useComparisonMatrix() {
  const categories: MatrixCategory[] = [
    {
      category: "Wardrobe Storage & Capacity",
      features: [
        {
          name: "Total Clothing Items",
          description: "Number of active wardrobe garments you can upload and catalog",
          free: "Up to 50 items",
          premium: "Unlimited",
        },
        {
          name: "Custom Closets & Wardrobes",
          description: "Groupings for work, weekend, travel, or seasons",
          free: "2 wardrobes",
          premium: "Unlimited",
        },
        {
          name: "Photo Storage Resolution",
          description: "Clear photo quality saved in private cloud storage",
          free: "Standard",
          premium: "High-Resolution",
        },
      ],
    },
    {
      category: "Outfit Ideas & Smart Scanner",
      features: [
        {
          name: "Smart Scanner & Auto-Tagging",
          description: "Automatic detection of categories, colors, and styles",
          free: "10 items / month",
          premium: "Unlimited",
        },
        {
          name: "Color & Tone Detection",
          description: "Accurate color detection and outfit matching",
          free: "Basic colors",
          premium: "Advanced Color Detection",
        },
        {
          name: "Daily Outfit Recommendations",
          description: "Occasion-driven outfit pairings using only your own clothes",
          free: "3 daily suggestions",
          premium: "Unlimited on-demand",
        },
        {
          name: "Mix-and-Match Versatility Score",
          description: "Shows you how many outfits your wardrobe can create",
          free: false,
          premium: true,
        },
      ],
    },
    {
      category: "Planning & Workflow Tools",
      features: [
        {
          name: "Seasonal Rotation Filters",
          description: "Quick filter toggles for Summer, Winter, Spring, and Autumn",
          free: true,
          premium: true,
        },
        {
          name: "Trip Packing Planner",
          description: "Build travel packing lists with maximum outfit combinations",
          free: false,
          premium: true,
        },
        {
          name: "Wardrobe CSV & PDF Export",
          description: "Export full inventory records, purchase dates, and tags",
          free: false,
          premium: true,
        },
      ],
    },
    {
      category: "Privacy & Account Support",
      features: [
        {
          name: "100% Private Cloud Vault",
          description: "Your wardrobe photos are never sold or trained on public models",
          free: true,
          premium: true,
        },
        {
          name: "Zero Third-Party Advertising",
          description: "No affiliate sponsors, banner ads, or fast-fashion marketing",
          free: true,
          premium: true,
        },
        {
          name: "Customer Support Desk",
          description: "Dedicated assistance for wardrobe setup and account questions",
          free: "Standard Email",
          premium: "Priority Concierge",
        },
      ],
    },
  ];

  return { categories };
}