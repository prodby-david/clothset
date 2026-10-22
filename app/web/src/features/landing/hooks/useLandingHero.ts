"use client";

import { useState } from "react";
import type { LayeredOutfitPiece } from "../types/landing.types";
import { CAPSULES } from "../constants/landing.constants";

export function useLandingHero() {
  const [activeCapsuleId, setActiveCapsuleId] = useState<string>("workday");
  const [activeOutfitIndex, setActiveOutfitIndex] = useState<number>(0);

  const activeCapsule =
    CAPSULES.find((c) => c.id === activeCapsuleId) || CAPSULES[0];

  const currentOutfitList = activeCapsule.outfits;
  const activeOutfit: LayeredOutfitPiece[] =
    currentOutfitList[activeOutfitIndex % currentOutfitList.length];

  const handleSelectCapsule = (id: string) => {
    setActiveCapsuleId(id);
    setActiveOutfitIndex(0);
  };

  const handleShuffleMatch = () => {
    setActiveOutfitIndex((prev) => (prev + 1) % currentOutfitList.length);
  };

  return {
    capsules: CAPSULES,
    activeCapsule,
    activeCapsuleId,
    activeOutfit,
    activeOutfitIndex,
    totalVariants: currentOutfitList.length,
    handleSelectCapsule,
    handleShuffleMatch,
  };
}