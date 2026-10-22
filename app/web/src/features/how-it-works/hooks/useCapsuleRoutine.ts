"use client";

import { useState } from "react";
import { ROUTINE_DAYS } from "../constants/how-it-works.constants";

export function useCapsuleRoutine() {
  const [activeDayId, setActiveDayId] = useState("mon");

  const currentRoutine =
    ROUTINE_DAYS.find((d) => d.id === activeDayId) || ROUTINE_DAYS[0];

  return {
    routineDays: ROUTINE_DAYS,
    activeDayId,
    setActiveDayId,
    currentRoutine,
  };
}
