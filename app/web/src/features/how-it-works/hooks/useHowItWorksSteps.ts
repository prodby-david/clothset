import { Camera, Sliders, Layers } from "lucide-react";

export function useHowItWorksSteps() {
  const steps = [
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

  return { steps };
}
