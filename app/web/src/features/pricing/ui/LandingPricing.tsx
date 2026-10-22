"use client";

import Link from "next/link";
import { Check, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import Button from "@/shared/components/ui/Button";
import Badge from "@/shared/components/ui/Badge";
import { LandingPricingProps } from "../types/pricing.types";

export default function LandingPricing({ className = "" }: LandingPricingProps) {
  return (
    <section
      id="pricing"
      className={`py-20 sm:py-28 bg-transparent border-b border-warm-gray ${className}`}
    >
      <div className="max-w-6xl w-full mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <Badge variant="accent" className="mb-3">
            Honest Pricing
          </Badge>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-charcoal">
            Predictable plans for every wardrobe size.
          </h2>
          <p className="mt-3 text-sm sm:text-base md:text-lg text-muted-gray leading-relaxed max-w-xl mx-auto">
            Organize intentional wardrobes with ease. Choose the tier that matches
            your closet size and styling routine.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.45, delay: 0.05, ease: "easeOut" }}
            whileHover={{ y: -3 }}
            className="rounded-3xl border border-warm-gray bg-surface p-7 lg:p-8 flex flex-col justify-between hover:border-sage/40 transition-all shadow-xs"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-charcoal">Basic</h3>
                <Badge variant="neutral">Starter</Badge>
              </div>

              <p className="text-xs sm:text-sm text-muted-gray leading-relaxed min-h-[40px]">
                Essential tools to organize core pieces and build your first wardrobe.
              </p>

              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-4xl font-bold text-charcoal tracking-tight">
                  $0
                </span>
                <span className="text-xs sm:text-sm text-muted-gray font-medium">
                  / forever
                </span>
              </div>

              <div className="mt-8 pt-6 border-t border-warm-gray space-y-3">
                <div className="flex items-center gap-3 text-xs sm:text-sm text-charcoal">
                  <Check className="w-4 h-4 text-forest dark:text-sage shrink-0" />
                  <span>Up to 40 items (20 per wardrobe)</span>
                </div>
                <div className="flex items-center gap-3 text-xs sm:text-sm text-charcoal">
                  <Check className="w-4 h-4 text-forest dark:text-sage shrink-0" />
                  <span>2 custom wardrobes</span>
                </div>
                <div className="flex items-center gap-3 text-xs sm:text-sm text-charcoal">
                  <Check className="w-4 h-4 text-forest dark:text-sage shrink-0" />
                  <span>Segmented category filtering</span>
                </div>
                <div className="flex items-center gap-3 text-xs sm:text-sm text-charcoal">
                  <Check className="w-4 h-4 text-forest dark:text-sage shrink-0" />
                  <span>Private cloud photo storage</span>
                </div>
                <div className="flex items-center gap-3 text-xs sm:text-sm text-charcoal">
                  <Check className="w-4 h-4 text-forest dark:text-sage shrink-0" />
                  <span>100% private data vault</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6">
              <Link href="/sign-up" className="block w-full">
                <Button variant="outline" className="w-full h-11 font-semibold text-sm">
                  Get Started Free
                </Button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.45, delay: 0.12, ease: "easeOut" }}
            whileHover={{ y: -3 }}
            className="relative rounded-3xl border-2 border-forest bg-surface p-7 lg:p-8 flex flex-col justify-between shadow-lg ring-1 ring-forest/20"
          >
            <div className="absolute -top-3.5 right-6">
              <span className="px-3 py-1 rounded-full bg-forest text-white text-xs font-semibold shadow-xs flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Most Popular</span>
              </span>
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-charcoal">Plus</h3>
                <Badge variant="accent">Everyday Curator</Badge>
              </div>

              <p className="text-xs sm:text-sm text-muted-gray leading-relaxed min-h-[40px]">
                For seasonal rotations, smart color harmony, and versatile outfits.
              </p>

              <div className="mt-6 flex items-baseline gap-1.5 flex-wrap">
                <span className="text-4xl font-bold text-charcoal tracking-tight">
                  $8
                </span>
                <span className="text-xs sm:text-sm text-muted-gray font-medium">
                  / month
                </span>
                <span className="text-[11px] text-forest dark:text-sage font-medium ml-1">
                  ($69 billed annually)
                </span>
              </div>

              <div className="mt-8 pt-6 border-t border-warm-gray space-y-3">
                <div className="flex items-center gap-3 text-xs sm:text-sm text-charcoal font-medium">
                  <Check className="w-4 h-4 text-forest dark:text-sage shrink-0" />
                  <span>Up to 150 items (30 per wardrobe)</span>
                </div>
                <div className="flex items-center gap-3 text-xs sm:text-sm text-charcoal font-medium">
                  <Check className="w-4 h-4 text-forest dark:text-sage shrink-0" />
                  <span>5 custom wardrobes</span>
                </div>
                <div className="flex items-center gap-3 text-xs sm:text-sm text-charcoal">
                  <Check className="w-4 h-4 text-forest dark:text-sage shrink-0" />
                  <span>Full category & subcategory splits</span>
                </div>
                <div className="flex items-center gap-3 text-xs sm:text-sm text-charcoal">
                  <Check className="w-4 h-4 text-forest dark:text-sage shrink-0" />
                  <span>High-resolution garment storage</span>
                </div>
                <div className="flex items-center gap-3 text-xs sm:text-sm text-charcoal">
                  <Check className="w-4 h-4 text-forest dark:text-sage shrink-0" />
                  <span>Dedicated capacity tracking</span>
                </div>
                <div className="flex items-center gap-3 text-xs sm:text-sm text-charcoal">
                  <Check className="w-4 h-4 text-forest dark:text-sage shrink-0" />
                  <span>Wardrobe CSV & PDF export</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6">
              <Link href="/sign-up" className="block w-full">
                <Button variant="primary" className="w-full h-11 font-semibold text-sm shadow-xs">
                  Upgrade to Plus
                </Button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.45, delay: 0.2, ease: "easeOut" }}
            whileHover={{ y: -3 }}
            className="rounded-3xl border border-warm-gray bg-surface p-7 lg:p-8 flex flex-col justify-between hover:border-sage/40 transition-all shadow-xs"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-charcoal">Elite</h3>
                <Badge variant="outline">Full Wardrobe</Badge>
              </div>

              <p className="text-xs sm:text-sm text-muted-gray leading-relaxed min-h-[40px]">
                Complete wardrobe digitization, unlimited packing trips, and VIP concierge styling.
              </p>

              <div className="mt-6 flex items-baseline gap-1.5 flex-wrap">
                <span className="text-4xl font-bold text-charcoal tracking-tight">
                  $16
                </span>
                <span className="text-xs sm:text-sm text-muted-gray font-medium">
                  / month
                </span>
                <span className="text-[11px] text-muted-gray font-medium ml-1">
                  ($149 billed annually)
                </span>
              </div>

              <div className="mt-8 pt-6 border-t border-warm-gray space-y-3">
                <div className="flex items-center gap-3 text-xs sm:text-sm text-charcoal font-medium">
                  <Check className="w-4 h-4 text-forest dark:text-sage shrink-0" />
                  <span>Up to 400 items (50 per wardrobe)</span>
                </div>
                <div className="flex items-center gap-3 text-xs sm:text-sm text-charcoal font-medium">
                  <Check className="w-4 h-4 text-forest dark:text-sage shrink-0" />
                  <span>8 custom wardrobes</span>
                </div>
                <div className="flex items-center gap-3 text-xs sm:text-sm text-charcoal">
                  <Check className="w-4 h-4 text-forest dark:text-sage shrink-0" />
                  <span>Maximum per-wardrobe capacity</span>
                </div>
                <div className="flex items-center gap-3 text-xs sm:text-sm text-charcoal">
                  <Check className="w-4 h-4 text-forest dark:text-sage shrink-0" />
                  <span>Priority image processing</span>
                </div>
                <div className="flex items-center gap-3 text-xs sm:text-sm text-charcoal">
                  <Check className="w-4 h-4 text-forest dark:text-sage shrink-0" />
                  <span>Full category & subcategory management</span>
                </div>
                <div className="flex items-center gap-3 text-xs sm:text-sm text-charcoal">
                  <Check className="w-4 h-4 text-forest dark:text-sage shrink-0" />
                  <span>Dedicated concierge support</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6">
              <Link href="/sign-up" className="block w-full">
                <Button variant="outline" className="w-full h-11 font-semibold text-sm">
                  Get Elite Access
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
