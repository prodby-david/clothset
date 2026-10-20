import { Metadata } from "next";
import PricingView from "@/features/pricing/components/PricingView";

export const metadata: Metadata = {
  title: "Pricing & Plans — Clothset",
  description:
    "Simple, transparent pricing for digital wardrobe organization and smart outfit ideas.",
};

export default function PricingPage() {
  return <PricingView />;
}
