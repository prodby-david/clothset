"use client";

import { useState } from "react";
import { Shield, Clock, Mail } from "lucide-react";
import { motion } from "motion/react";
import Badge from "@/shared/components/ui/Badge";
import { FaqSupportBannerProps } from "../types/faq.types";
import FaqContactForm from "./FaqContactForm";

export default function FaqSupportBanner({
  className = "",
}: FaqSupportBannerProps) {
  const [selectedTopic, setSelectedTopic] = useState<string>("general");

  const topicOptions = [
    { id: "general", label: "General Questions" },
    { id: "wardrobe-uploads", label: "Wardrobe Photos" },
    { id: "capsule-rules", label: "Wardrobe Tips" },
    { id: "ai-styling", label: "AI Suggestions" },
    { id: "privacy-security", label: "Data & Privacy" },
    { id: "billing-plans", label: "Plans & Billing" },
  ];

  return (
    <section
      id="contact"
      className={`py-16 sm:py-24 bg-transparent border-b border-warm-gray ${className}`}
    >
      <div className="max-w-5xl w-full mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="rounded-3xl border border-warm-gray bg-cream/40 p-6 sm:p-10 lg:p-12 relative overflow-hidden shadow-xs"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-5 flex flex-col justify-between h-full">
              <div>
                <Badge variant="accent" className="mb-3">
                  Still have questions?
                </Badge>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-charcoal">
                  We are here to help you organize your wardrobe
                </h2>
                <p className="mt-3 text-sm text-muted-gray leading-relaxed">
                  Whether you need assistance importing your clothing photos, setting up
                  your first digital wardrobe, or discovering outfit combinations,
                  send us a message and our team will be happy to assist.
                </p>

                <div className="mt-6">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-gray block mb-2.5">
                    Select a topic:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {topicOptions.map((topic) => {
                      const isSelected = selectedTopic === topic.id;
                      return (
                        <button
                          key={topic.id}
                          type="button"
                          onClick={() => setSelectedTopic(topic.id)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-150 cursor-pointer border ${
                            isSelected
                              ? "bg-forest text-white border-forest shadow-xs"
                              : "bg-surface text-charcoal/80 border-warm-gray hover:bg-cream"
                          }`}
                        >
                          {topic.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-warm-gray/80 flex flex-col gap-3">
                <div className="flex items-center gap-3 text-xs text-muted-gray">
                  <div className="w-7 h-7 rounded-lg bg-surface border border-warm-gray flex items-center justify-center shrink-0 text-forest">
                    <Clock className="w-3.5 h-3.5" />
                  </div>
                  <span>Average response time under 24 hours</span>
                </div>

                <div className="flex items-center gap-3 text-xs text-muted-gray">
                  <div className="w-7 h-7 rounded-lg bg-surface border border-warm-gray flex items-center justify-center shrink-0 text-forest">
                    <Shield className="w-3.5 h-3.5" />
                  </div>
                  <span>Your wardrobe photography is strictly private</span>
                </div>

                <div className="flex items-center gap-3 text-xs text-muted-gray">
                  <div className="w-7 h-7 rounded-lg bg-surface border border-warm-gray flex items-center justify-center shrink-0 text-forest">
                    <Mail className="w-3.5 h-3.5" />
                  </div>
                  <span>Direct inquiries: support@clothset.app</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <FaqContactForm
                selectedTopic={selectedTopic}
                onTopicChange={setSelectedTopic}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
