import { Metadata } from "next";
import FeaturesView from "@/features/features/components/FeaturesView";

export const metadata: Metadata = {
  title: "Features & Capabilities — Clothset",
  description:
    "Explore Clothset's digital wardrobe organization, custom closets, and smart outfit discovery.",
};

export default function FeaturesPage() {
  return <FeaturesView />;
}
