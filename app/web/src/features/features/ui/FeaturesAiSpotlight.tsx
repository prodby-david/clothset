"use client";

import { Eye, Palette, Scissors, Sparkles, CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";
import Badge from "@/shared/components/ui/Badge";
import { FeaturesAiSpotlightProps } from "../types/features.types";

export default function FeaturesAiSpotlight({
  className = "",
}: FeaturesAiSpotlightProps) {
  const steps = [
    {
      step: "01",
      icon: Eye,
      title: "Automatic Background Removal",
      description:
        "Isolates the clothing piece from background shadows, keeping photos crisp and focused on the garment.",
      badge: "Clean Cutout",
    },
    {
      step: "02",
      icon: Palette,
      title: "Color & Tone Detection",
      description:
        "Analyzes exact garment tones and colors to determine how well they match with other clothes in your collection.",
      badge: "Color Matching",
    },
    {
      step: "03",
      icon: Scissors,
      title: "Fabric & Fit Detection",
      description:
        "Recognizes texture, drape, and occasion classification—from casual cotton to tailored wool.",
      badge: "Material Details",
    },
    {
      step: "04",
      icon: Sparkles,
      title: "Smart Outfit Matching",
      description:
        "Checks your own digital wardrobe to suggest coordinated combinations without ever inventing clothes you do not have.",
      badge: "Real Clothes Only",
    },
  ];

  return (
    <section className={`py-20 sm:py-28 bg-transparent border-b border-warm-gray ${className}`}>
      <div className="max-w-6xl w-full mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <Badge variant="accent" className="mb-3">
            Smart Scanner
          </Badge>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-charcoal">
            How Clothset scans and tags your clothes
          </h2>
          <p className="mt-3 text-sm sm:text-base text-muted-gray leading-relaxed max-w-xl mx-auto">
            Our smart scanner automatically detects clothing categories, colors, and fabrics
            while keeping your photos completely private.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.08,
                  ease: "easeOut",
                }}
                className="rounded-2xl border border-warm-gray bg-surface p-6 flex flex-col justify-between hover:border-sage/50 transition-colors shadow-xs"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold text-muted-gray">
                      {item.step}
                    </span>
                    <Badge variant="neutral">{item.badge}</Badge>
                  </div>

                  <div className="w-10 h-10 rounded-xl bg-pale-sage text-forest flex items-center justify-center mb-4 shadow-xs">
                    <Icon className="w-5 h-5" />
                  </div>

                  <h3 className="text-base font-bold text-charcoal">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs text-muted-gray leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-warm-gray flex items-center gap-1.5 text-xs text-forest font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Verified Output</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}