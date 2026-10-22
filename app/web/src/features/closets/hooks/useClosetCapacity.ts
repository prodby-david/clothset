import { useMemo } from "react";
import type { ClosetCapacityInfo } from "../types/closet.types";

const CAPACITY_LIMITS: Record<string, number> = {
  capsule: 35,
  everyday: 50,
  work: 40,
  formal: 25,
  seasonal: 45,
  custom: 50,
};

export function useClosetCapacity(
  closetType?: string,
  currentCount: number = 0
): ClosetCapacityInfo {
  return useMemo(() => {
    const key = (closetType || "everyday").toLowerCase();
    const maxLimit = CAPACITY_LIMITS[key] || 50;
    const percentage = Math.min(100, Math.round((currentCount / maxLimit) * 100));
    const isNearLimit = percentage >= 85;

    let statusLabel = "Optimal balance";
    if (percentage >= 100) {
      statusLabel = "At capacity";
    } else if (percentage >= 85) {
      statusLabel = "Near limit";
    } else if (percentage === 0) {
      statusLabel = "Empty wardrobe";
    }

    return {
      currentCount,
      maxLimit,
      percentage,
      isNearLimit,
      statusLabel,
    };
  }, [closetType, currentCount]);
}
