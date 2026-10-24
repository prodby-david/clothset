"use client";

import Image from "next/image";
import { Camera, Sparkles, Layers, ArrowRight } from "lucide-react";
import type { HowItWorksVisualShowcaseProps } from "../types/how-it-works.types";

const VISUAL_STEPS = [
  {
    step: "01",
    title: "Capture at Home",
    caption: "Place on a bed or hang near natural morning light",
    tag: "Natural Light",
    icon: Camera,
    imageUrl:
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=600&q=80",
  },
  {
    step: "02",
    title: "Silhouette Extracted",
    caption: "Automatic background cleanup and color coordinates",
    tag: "Clean Cutout",
    icon: Sparkles,
    imageUrl:
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80",
  },
  {
    step: "03",
    title: "Curated Outfit",
    caption: "Seamless daily styling from items you actually own",
    tag: "Zero Hallucination",
    icon: Layers,
    imageUrl:
      "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=600&q=80",
  },
];

export default function HowItWorksVisualShowcase({
  className = "",
}: HowItWorksVisualShowcaseProps) {
  return (
    <div
      className={`rounded-3xl border border-warm-gray bg-surface shadow-md p-6 sm:p-8 ${className}`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-6 border-b border-warm-gray">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-forest dark:text-sage">
            Visual Digitize Workflow
          </span>
          <h3 className="text-lg sm:text-xl font-bold text-charcoal tracking-tight mt-0.5">
            From physical hanger to digital lookbook in three steps
          </h3>
        </div>
        <div className="text-xs text-muted-gray">
          <span>Takes ~30 seconds per garment</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {VISUAL_STEPS.map((step, idx) => {
          const Icon = step.icon;
          return (
            <div
              key={step.step}
              className="group rounded-2xl border border-warm-gray bg-cream/30 dark:bg-[#141a15] overflow-hidden flex flex-col justify-between hover:border-sage/60 transition-all shadow-2xs"
            >
              <div className="relative aspect-4/3 w-full bg-cream dark:bg-[#101411] overflow-hidden">
                <Image
                  src={step.imageUrl}
                  alt={step.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
                <div className="absolute top-2.5 left-2.5 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-surface/90 dark:bg-[#18201a]/90 backdrop-blur-xs border border-warm-gray text-[11px] font-bold text-forest dark:text-sage shadow-2xs">
                  <Icon className="w-3.5 h-3.5" />
                  <span>{step.tag}</span>
                </div>
                <div className="absolute top-2.5 right-2.5 z-10 px-2 py-0.5 rounded-md bg-black/60 text-white font-mono text-[10px] font-bold">
                  {step.step}
                </div>
              </div>

              <div className="p-4 flex flex-col justify-between flex-1 gap-2">
                <div>
                  <h4 className="text-sm font-bold text-charcoal leading-snug group-hover:text-forest dark:group-hover:text-sage transition-colors">
                    {step.title}
                  </h4>
                  <p className="mt-1 text-xs text-muted-gray leading-relaxed">
                    {step.caption}
                  </p>
                </div>

                {idx < VISUAL_STEPS.length - 1 && (
                  <div className="pt-2 border-t border-warm-gray/60 hidden md:flex items-center gap-1 text-[11px] text-muted-gray font-medium">
                    <span>Next step</span>
                    <ArrowRight className="w-3 h-3 text-sage" />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
