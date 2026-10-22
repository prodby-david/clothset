"use client";

import { useState } from "react";
import { FAQS } from "../constants/faq.constants";

export function useFaq() {
  const [openId, setOpenId] = useState<string | null>("outfits");

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return {
    faqs: FAQS,
    openId,
    toggleItem,
  };
}
