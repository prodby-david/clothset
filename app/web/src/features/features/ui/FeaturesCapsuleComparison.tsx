"use client";

import { XCircle, CheckCircle2, ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import Badge from "@/shared/components/ui/Badge";
import Button from "@/shared/components/ui/Button";
import type { FeaturesCapsuleComparisonProps } from "../types/features.types";
import {
  CHAOTIC_POINTS,
  CAPSULE_POINTS,
} from "../constants/features.constants";

export default function FeaturesCapsuleComparison({
  className = "",
}: FeaturesCapsuleComparisonProps) {

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
            Wardrobe Organization
          </Badge>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-charcoal">
            Chaotic Physical Closet vs. Intentional Digital Wardrobe
          </h2>
          <p className="mt-3 text-sm sm:text-base md:text-lg text-muted-gray leading-relaxed max-w-xl mx-auto">
            Clothset transforms messy, overwhelmed closets into neatly partitioned digital wardrobes with capacity tracking and quick category filtering.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="rounded-3xl border border-warm-gray bg-surface p-8 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-semibold text-muted-gray uppercase tracking-wider">
                  Traditional Approach
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-rose-100/60 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 text-xs font-medium">
                  Chaotic & Overwhelming
                </span>
              </div>

              <h3 className="text-xl font-bold text-charcoal">
                The Chaotic Physical Closet
              </h3>
              <p className="mt-2 text-sm text-muted-gray leading-relaxed">
                Full closets with nothing to wear. Buying more pieces only adds friction instead of solving daily dressing dilemmas.
              </p>

              <div className="mt-8 space-y-4">
                {CHAOTIC_POINTS.map((point) => (
                  <div key={point} className="flex items-start gap-3">
                    <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                    <span className="text-sm text-charcoal leading-snug">
                      {point}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-warm-gray text-xs text-muted-gray">
              Average friction: 15–20 minutes lost deciding outfits every morning.
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="rounded-3xl border-2 border-forest bg-surface p-8 flex flex-col justify-between shadow-md"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-semibold text-forest dark:text-sage uppercase tracking-wider">
                  Clothset Method
                </span>
                <Badge variant="accent">Intentional & Streamlined</Badge>
              </div>

              <h3 className="text-xl font-bold text-charcoal">
                The Intentional Digital Wardrobe
              </h3>
              <p className="mt-2 text-sm text-muted-gray leading-relaxed">
                Your wardrobe structured into distinct collections, with clear category filtering and subscription-based capacity limits.
              </p>

              <div className="mt-8 space-y-4">
                {CAPSULE_POINTS.map((point) => (
                  <div key={point} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-forest dark:text-sage shrink-0 mt-0.5" />
                    <span className="text-sm text-charcoal font-medium leading-snug">
                      {point}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-warm-gray flex items-center justify-between">
              <span className="text-xs text-forest dark:text-sage font-semibold">
                Average decision time: &lt; 30 seconds
              </span>
              <Link href="/sign-up">
                <Button variant="primary" size="sm" className="gap-1.5 text-xs h-8">
                  <span>Start Wardrobe</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}