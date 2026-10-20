import { Suspense } from "react";
import ClosetDetailView from "./ClosetDetailView";
import { ClosetPageViewProps } from "../types/closet.types";

async function ClosetDetailLoader({ params }: ClosetPageViewProps) {
  const { id } = await params;
  return <ClosetDetailView closetId={id} />;
}

export default function ClosetPageView({ params }: ClosetPageViewProps) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-cream text-muted-gray">
          <div className="w-8 h-8 rounded-full border-2 border-sage border-t-transparent animate-spin" />
        </div>
      }
    >
      <ClosetDetailLoader params={params} />
    </Suspense>
  );
}
