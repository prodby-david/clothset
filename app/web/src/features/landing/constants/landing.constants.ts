import type { CapsulePreset } from "../types/landing.types";

export const CAPSULES: CapsulePreset[] = [
  {
    id: "workday",
    title: "Workday Minimal",
    vibe: "Refined & Architectural",
    palette: "Forest Green • Cream • Charcoal",
    harmonyScore: 98,
    description:
      "Clean tailoring and breathable natural layers crafted for deep focus, presentations, and creative reviews.",
    outfits: [
      [
        {
          id: "wm-1-layer",
          slot: "layer",
          slotLabel: "Layer",
          name: "Linen Blazer",
          color: "Forest Green",
        },
        {
          id: "wm-1-top",
          slot: "top",
          slotLabel: "Top",
          name: "Cotton Poplin Shirt",
          color: "Crisp Off-White",
        },
        {
          id: "wm-1-bottom",
          slot: "bottom",
          slotLabel: "Bottom",
          name: "Pleated Trousers",
          color: "Charcoal Slate",
        },
        {
          id: "wm-1-footwear",
          slot: "footwear",
          slotLabel: "Footwear",
          name: "Suede Penny Loafers",
          color: "Earthy Taupe",
        },
      ],
      [
        {
          id: "wm-2-layer",
          slot: "layer",
          slotLabel: "Layer",
          name: "Lightweight Trench",
          color: "Muted Stone",
        },
        {
          id: "wm-2-top",
          slot: "top",
          slotLabel: "Top",
          name: "Merino Crewneck",
          color: "Oatmeal Cream",
        },
        {
          id: "wm-2-bottom",
          slot: "bottom",
          slotLabel: "Bottom",
          name: "Tailored Chinos",
          color: "Forest Green",
        },
        {
          id: "wm-2-footwear",
          slot: "footwear",
          slotLabel: "Footwear",
          name: "Classic Leather Derby",
          color: "Dark Espresso",
        },
      ],
    ],
  },
  {
    id: "weekend",
    title: "Weekend Ease",
    vibe: "Tactile & Relaxed",
    palette: "Oatmeal • Indigo • Chalk",
    harmonyScore: 96,
    description:
      "Comfort-first silhouettes with natural drape, raw denim, and relaxed basics for leisure and exploration.",
    outfits: [
      [
        {
          id: "we-1-layer",
          slot: "layer",
          slotLabel: "Layer",
          name: "Relaxed Cardigan",
          color: "Oatmeal Heather",
        },
        {
          id: "we-1-top",
          slot: "top",
          slotLabel: "Top",
          name: "Heavy Cotton Tee",
          color: "Chalk White",
        },
        {
          id: "we-1-bottom",
          slot: "bottom",
          slotLabel: "Bottom",
          name: "Straight Raw Denim",
          color: "Deep Indigo",
        },
        {
          id: "we-1-footwear",
          slot: "footwear",
          slotLabel: "Footwear",
          name: "Low Leather Sneakers",
          color: "Natural Ecru",
        },
      ],
      [
        {
          id: "we-2-layer",
          slot: "layer",
          slotLabel: "Layer",
          name: "Utility Chore Jacket",
          color: "Muted Olive",
        },
        {
          id: "we-2-top",
          slot: "top",
          slotLabel: "Top",
          name: "Slub Pocket T-Shirt",
          color: "Warm Cream",
        },
        {
          id: "we-2-bottom",
          slot: "bottom",
          slotLabel: "Bottom",
          name: "Relaxed Fatigue Trouser",
          color: "Faded Sandstone",
        },
        {
          id: "we-2-footwear",
          slot: "footwear",
          slotLabel: "Footwear",
          name: "Suede Desert Boot",
          color: "Warm Taupe",
        },
      ],
    ],
  },
  {
    id: "evening",
    title: "Evening Tailored",
    vibe: "Elevated Depth & Contrast",
    palette: "Charcoal • Sage • Onyx",
    harmonyScore: 97,
    description:
      "Sophisticated tonal interplay with clean lines and subtle textural warmth for dining and cultural outings.",
    outfits: [
      [
        {
          id: "et-1-layer",
          slot: "layer",
          slotLabel: "Layer",
          name: "Double-Breasted Coat",
          color: "Charcoal Melange",
        },
        {
          id: "et-1-top",
          slot: "top",
          slotLabel: "Top",
          name: "Ribbed Knit Sweater",
          color: "Sage Green",
        },
        {
          id: "et-1-bottom",
          slot: "bottom",
          slotLabel: "Bottom",
          name: "Wide Wool Trousers",
          color: "Dark Espresso",
        },
        {
          id: "et-1-footwear",
          slot: "footwear",
          slotLabel: "Footwear",
          name: "Leather Chelsea Boot",
          color: "Deep Onyx",
        },
      ],
    ],
  },
];
