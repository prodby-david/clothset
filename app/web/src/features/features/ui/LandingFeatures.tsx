"use client";

import {
  Layers,
  Sliders,
  Compass,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";
import { motion } from "motion/react";
import Badge from "@/shared/components/ui/Badge";
import { LandingFeaturesProps } from "../types/features.types";

export default function LandingFeatures({ className = "" }: LandingFeaturesProps) {
  return (
    <section id="features" className={`py-20 sm:py-28 bg-transparent border-b border-warm-gray ${className}`}>
      <div className="max-w-6xl w-full mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <Badge variant="accent" className="mb-3">
            Conscious Wardrobe System
          </Badge>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-charcoal">
            Intentional features for effortless everyday dressing.
          </h2>
          <p className="mt-3 text-sm sm:text-base md:text-lg text-muted-gray leading-relaxed max-w-xl mx-auto">
            Clothset helps you curate what you own, honor capacity limits, and discover fresh outfit ideas from your existing wardrobe.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.45, delay: 0.05, ease: "easeOut" }}
            whileHover={{ y: -3 }}
            className="rounded-2xl border border-warm-gray bg-surface p-6 sm:p-8 flex flex-col justify-between hover:border-sage/60 hover:shadow-sm transition-all"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-pale-sage text-forest dark:text-sage flex items-center justify-center mb-6 shadow-xs">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-charcoal">
                Intentional Capsule Wardrobes
              </h3>
              <p className="mt-3 text-sm text-muted-gray leading-relaxed">
                Curate distinct collections for work, weekend, and seasonal capsules.
                Stay within mindful limits and find what you love in seconds.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-warm-gray/70">
              <div className="rounded-xl border border-warm-gray bg-surface p-4 flex flex-col gap-2.5">
                <div className="flex items-center justify-between text-xs font-semibold text-charcoal">
                  <span>Work Wardrobe</span>
                  <span className="text-sage">16 Items</span>
                </div>
                <div className="w-full bg-cream rounded-full h-2 overflow-hidden">
                  <div className="bg-forest dark:bg-sage h-full rounded-full w-3/4" />
                </div>
                <div className="flex items-center gap-1.5 text-xs text-muted-gray pt-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-sage" />
                  <span>Neutral pieces: 6 tops, 4 bottoms, 2 pairs of shoes</span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.45, delay: 0.15, ease: "easeOut" }}
            whileHover={{ y: -3 }}
            className="rounded-2xl border border-warm-gray bg-surface p-6 sm:p-8 flex flex-col justify-between hover:border-sage/60 hover:shadow-sm transition-all"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-pale-sage text-forest dark:text-sage flex items-center justify-center mb-6 shadow-xs">
                <Sliders className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-charcoal">
                Smart Scanner & Auto-Tagging
              </h3>
              <p className="mt-3 text-sm text-muted-gray leading-relaxed">
                Digitize each garment effortlessly. Automatically extract silhouette,
                color palette, and season coordinates without manual spreadsheets.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-warm-gray/70">
              <div className="rounded-xl border border-warm-gray bg-surface p-4 flex flex-col gap-2">
                <div className="flex items-center justify-between text-xs pb-1.5 border-b border-warm-gray">
                  <span className="font-semibold text-charcoal">Automatic Tags</span>
                  <Badge variant="accent">Confidence 96%</Badge>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  <span className="px-2 py-0.5 rounded-lg bg-cream text-charcoal text-xs font-medium border border-warm-gray">
                    Oatmeal Cream
                  </span>
                  <span className="px-2 py-0.5 rounded-lg bg-cream text-charcoal text-xs font-medium border border-warm-gray">
                    Linen Blend
                  </span>
                  <span className="px-2 py-0.5 rounded-lg bg-cream text-charcoal text-xs font-medium border border-warm-gray">
                    Spring / Summer
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.45, delay: 0.25, ease: "easeOut" }}
            whileHover={{ y: -3 }}
            className="rounded-2xl border border-warm-gray bg-surface p-6 sm:p-8 flex flex-col justify-between hover:border-sage/60 hover:shadow-sm transition-all"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-pale-sage text-forest dark:text-sage flex items-center justify-center mb-6 shadow-xs">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-charcoal">
                Grounded Outfit Discovery
              </h3>
              <p className="mt-3 text-sm text-muted-gray leading-relaxed">
                Discover high-harmony outfits styled strictly from your wardrobe.
                Zero fabricated suggestions, zero pressure to buy new clothes.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-warm-gray/70">
              <div className="rounded-xl border border-warm-gray bg-surface p-4 flex flex-col gap-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-charcoal">Today&apos;s Outfit Match</span>
                  <Badge variant="secondary">Color Match</Badge>
                </div>
                <div className="flex items-center justify-between text-xs text-muted-gray">
                  <span>Top + Bottom + Loafers</span>
                  <span className="text-forest dark:text-sage font-semibold">Ready to wear</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-muted-gray pt-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-forest dark:text-sage" />
                  <span>Uses items you already own</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
