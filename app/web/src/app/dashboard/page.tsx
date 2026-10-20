import { Suspense } from "react";
import { Metadata } from "next";
import DashboardView from "@/features/dashboard/components/DashboardView";

export const metadata: Metadata = {
  title: "Wardrobe Dashboard — Clothset",
  description: "Manage your wardrobe closets and collections",
};

export default function DashboardPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-sand/20 animate-pulse" />}>
      <DashboardView />
    </Suspense>
  );
}
