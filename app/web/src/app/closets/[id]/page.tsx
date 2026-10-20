import { Metadata } from "next";
import ClosetPageView from "@/features/closets/components/ClosetPageView";
import { ClosetPageViewProps } from "@/features/closets/types/closet.types";

export const metadata: Metadata = {
  title: "Closet Details — Clothset",
  description: "Manage clothing pieces in this closet",
};

export default function ClosetDetailPage({ params }: ClosetPageViewProps) {
  return <ClosetPageView params={params} />;
}
