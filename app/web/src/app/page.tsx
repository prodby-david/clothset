import { Metadata } from "next";
import LandingView from "@/features/landing/components/LandingView";

export const metadata: Metadata = {
  title: "Clothset — Digital Wardrobe & Outfit Planner",
  description: "Minimalist digital wardrobe organizer and outfit planner",
};

export default function Home() {
  return <LandingView />;
}
