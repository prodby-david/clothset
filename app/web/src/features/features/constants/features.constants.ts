import { Eye, Palette, Scissors, Sparkles } from "lucide-react";

export const SCANNER_STEPS = [
  {
    step: "01",
    icon: Eye,
    title: "Automatic Background Removal",
    description:
      "Isolates the clothing piece from background shadows, keeping photos crisp and focused on the garment.",
    badge: "Clean Cutout",
  },
  {
    step: "02",
    icon: Palette,
    title: "Color & Tone Detection",
    description:
      "Analyzes exact garment tones and colors to determine how well they match with other clothes in your collection.",
    badge: "Color Matching",
  },
  {
    step: "03",
    icon: Scissors,
    title: "Fabric & Fit Detection",
    description:
      "Recognizes texture, drape, and occasion classification—from casual cotton to tailored wool.",
    badge: "Material Details",
  },
  {
    step: "04",
    icon: Sparkles,
    title: "Wardrobe Organization",
    description:
      "Keeps your digital wardrobe neatly cataloged and categorized strictly by the real clothes you own.",
    badge: "Real Clothes Only",
  },
];

export const CHAOTIC_POINTS = [
  "Physical closet stuffed with unworn, forgotten clothes across mixed piles",
  "Constant morning fatigue searching for matching pieces",
  "Duplicate purchases because you lose track of what you already own",
  "No clear separation between everyday wear, workwear, and seasonal collections",
  "Zero visibility into closet capacity and actual garment counts",
];

export const CAPSULE_POINTS = [
  "Organize separate wardrobes and drawers for everyday, work, and seasonal wear",
  "Instant category filtering across Clothing, Footwear, Accessories, and more",
  "Clear capacity tracking and item limits enforced by your subscription tier",
  "Catalog garments with photos, colors, and seasons for quick morning discovery",
  "Clutter-free digital inventory strictly tracking items you actually own",
];
