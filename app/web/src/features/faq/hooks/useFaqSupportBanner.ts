"use client";

import { useState } from "react";

export function useFaqSupportBanner() {
  const [selectedTopic, setSelectedTopic] = useState<string>("general");

  return {
    selectedTopic,
    setSelectedTopic,
  };
}
