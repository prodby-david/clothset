import { Metadata } from "next";
import HowItWorksView from "@/features/how-it-works/components/HowItWorksView";

export const metadata: Metadata = {
  title: "How It Works — Clothset",
  description:
    "Learn how to digitize your wardrobe and discover daily outfits in three simple steps.",
};

export default function HowItWorksPage() {
  return <HowItWorksView />;
}
