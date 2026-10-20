"use client";

import Link from "next/link";
import { Check, ShieldCheck } from "lucide-react";
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
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-charcoal">
            Predictable plans for every wardrobe size.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-muted-gray leading-relaxed max-w-xl mx-auto">
            Begin organizing your clothing for free. Upgrade to Premium when you are
            ready for unlimited closets and unlimited outfit ideas.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.45, delay: 0.05, ease: "easeOut" }}
            whileHover={{ y: -3 }}
            className="rounded-2xl border border-warm-gray bg-cream/30 p-8 flex flex-col justify-between hover:border-warm-gray transition-all"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-charcoal">Free Tier</h3>
                <Badge variant="neutral">Starter</Badge>
              </div>

              <p className="text-sm text-muted-gray leading-relaxed">
                Essential tools to organize your favorite clothes and build your first
                wardrobes.
              </p>

              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-4xl font-bold text-charcoal tracking-tight">
                  $0
                </span>
                <span className="text-sm text-muted-gray font-medium">
                  / forever
                </span>
              </div>

              <div className="mt-8 pt-6 border-t border-warm-gray space-y-3.5">
                <div className="flex items-center gap-3 text-sm text-charcoal">
                  <Check className="w-4 h-4 text-forest shrink-0" />
                  <span>Up to 50 wardrobe items</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-charcoal">
                  <Check className="w-4 h-4 text-forest shrink-0" />
                  <span>2 custom wardrobes</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-charcoal">
                  <Check className="w-4 h-4 text-forest shrink-0" />
                  <span>Standard category & season filters</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-charcoal">
                  <Check className="w-4 h-4 text-forest shrink-0" />
                  <span>Daily outfit suggestions</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-charcoal">
                  <Check className="w-4 h-4 text-forest shrink-0" />
                  <span>Your wardrobe stays 100% private</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6">
              <Link href="/sign-up" className="block w-full">
                <Button variant="outline" className="w-full">
                  Get Started Free
                </Button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.45, delay: 0.15, ease: "easeOut" }}
            whileHover={{ y: -3 }}
            className="relative rounded-2xl border-2 border-forest bg-surface p-8 flex flex-col justify-between shadow-lg"
          >
            <div className="absolute -top-3.5 right-6">
              <span className="px-3 py-1 rounded-full bg-forest text-white text-xs font-semibold shadow-xs flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Most Popular</span>
              </span>
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-charcoal">Premium</h3>
                <Badge variant="accent">Full Access</Badge>
              </div>

              <p className="text-sm text-muted-gray leading-relaxed">
                For full wardrobe freedom, unlimited closets, and smart outfit styling.
              </p>

              <div className="mt-6 flex items-baseline gap-1.5">
                <span className="text-4xl font-bold text-charcoal tracking-tight">
                  $8
                </span>
                <span className="text-sm text-muted-gray font-medium">
                  / month
                </span>
                <span className="text-xs text-sage font-medium ml-1">
                  ($69 billed annually)
                </span>
              </div>

              <div className="mt-8 pt-6 border-t border-warm-gray space-y-3.5">
                <div className="flex items-center gap-3 text-sm text-charcoal font-medium">
                  <Check className="w-4 h-4 text-forest shrink-0" />
                  <span>Unlimited clothing items</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-charcoal font-medium">
                  <Check className="w-4 h-4 text-forest shrink-0" />
                  <span>Unlimited custom wardrobes</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-charcoal">
                  <Check className="w-4 h-4 text-forest shrink-0" />
                  <span>Smart scanner & auto-tagging</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-charcoal">
                  <Check className="w-4 h-4 text-forest shrink-0" />
                  <span>Unlimited daily outfit ideas</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-charcoal">
                  <Check className="w-4 h-4 text-forest shrink-0" />
                  <span>Smart color and style matching</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-charcoal">
                  <Check className="w-4 h-4 text-forest shrink-0" />
                  <span>Packing trip planner</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6">
              <Link href="/sign-up" className="block w-full">
                <Button variant="primary" className="w-full">
                  Try Premium Free for 14 Days
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
