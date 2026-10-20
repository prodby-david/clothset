import { Metadata } from "next";
import FaqView from "@/features/faq/components/FaqView";

export const metadata: Metadata = {
  title: "Frequently Asked Questions — Clothset",
  description:
    "Answers to common questions about privacy, outfit ideas, and wardrobe limits.",
};

export default function FaqPage() {
  return <FaqView />;
}
