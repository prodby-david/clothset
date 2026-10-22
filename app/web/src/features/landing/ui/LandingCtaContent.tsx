"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";
import Button from "@/shared/components/ui/Button";
import { LANDING_CTA_TRUST_BADGES } from "../constants/landing-cta.constants";
import type { LandingCtaContentProps } from "../types/landing-cta.types";

export default function LandingCtaContent({ className = "" }: LandingCtaContentProps) {
  return (
    <div className={`flex flex-col justify-between ${className}`}>
      <div>
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pale-sage text-forest dark:text-sage text-xs font-semibold mb-6 shadow-xs">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Get Started in 5 Minutes</span>
        </div>

        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-charcoal leading-tight">
          Make getting dressed the easiest part of your morning.
        </h2>

        <p className="mt-4 text-sm sm:text-base md:text-lg text-muted-gray leading-relaxed max-w-xl">
          Join conscious dressers building intentional digital wardrobes. Organize your garments into dedicated drawers, track your capacity limits, and filter across categories with zero clutter.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
          <Link href="/sign-up" className="w-full sm:w-auto">
            <Button size="lg" className="w-full sm:w-auto gap-2">
              <span>Create Free Wardrobe</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
          <Link href="/sign-in" className="w-full sm:w-auto">
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              <span>Sign in to Account</span>
            </Button>
          </Link>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-warm-gray flex flex-wrap items-center gap-6 text-xs text-muted-gray">
        {LANDING_CTA_TRUST_BADGES.map((badge) => {
          const IconComponent = badge.iconName === "shield" ? ShieldCheck : CheckCircle2;
          return (
            <div key={badge.id} className="flex items-center gap-1.5">
              <IconComponent className="w-4 h-4 text-forest dark:text-sage shrink-0" />
              <span>{badge.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
