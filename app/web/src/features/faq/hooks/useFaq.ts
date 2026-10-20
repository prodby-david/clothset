"use client";

import { useState } from "react";
import { FaqItem } from "../types/faq.types";

const FAQS: FaqItem[] = [
  {
    id: "outfits",
    question: "How does Clothset generate outfit recommendations?",
    answer:
      "Clothset pairs items that exist in your digital wardrobe. Our smart outfit matcher takes into account colors, seasonal balance, and garment categories to suggest coordinated outfits. It never invents clothing you don't actually own.",
  },
  {
    id: "privacy",
    question: "Is my clothing information and photography kept private?",
    answer:
      "Yes, completely. Your wardrobe and uploaded photos are private to your individual account. Your data is stored securely and is never published or shared with third parties.",
  },
  {
    id: "manual-edits",
    question: "Can I edit the automatically generated clothing tags?",
    answer:
      "Always. Clothset treats auto-generated tags as suggestions, not verified facts. You maintain full control to edit names, category assignments, colors, and seasons at any point.",
  },
  {
    id: "plan-limits",
    question: "What happens when I reach the Free tier limit of 50 items?",
    answer:
      "You can continue browsing, organizing, and generating outfits with your 50 items indefinitely. When you are ready to catalog more pieces or create unlimited custom capsules, you can upgrade to Premium anytime.",
  },
  {
    id: "devices",
    question: "Does Clothset work on mobile phones and tablets?",
    answer:
      "Yes. Clothset is engineered mobile-first and works seamlessly across phones, tablets, and desktop computers. You can snap clothing photos directly from your phone's browser or organize closets on your laptop.",
  },
];

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
