"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Layers,
} from "lucide-react";
import { motion } from "motion/react";
import Button from "@/shared/components/ui/Button";
import { LandingCtaProps } from "../types/landing.types";

export default function LandingCta({ className = "" }: LandingCtaProps) {
  return (
    <section className={`py-16 sm:py-24 bg-transparent ${className}`}>
      <div className="max-w-6xl w-full mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="rounded-3xl border border-warm-gray bg-cream/30 p-8 sm:p-12 lg:p-14 shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
        >
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pale-sage text-forest text-xs font-semibold mb-6 shadow-xs">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Get Started in 5 Minutes</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-charcoal leading-tight">
                Make getting dressed the easiest part of your morning.
              </h2>

              <p className="mt-4 text-sm sm:text-base text-muted-gray leading-relaxed max-w-xl">
                Join conscious dressers building versatile digital capsules.
                Organize your favorite items once and unlock daily grounded outfit
                recommendations powered by clothes you already own.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                <Link href="/sign-up" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto gap-2">
                    <span>Create Free Account</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/sign-in" className="w-full sm:w-auto">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto"
                  >
                    <span>Sign in to Account</span>
                  </Button>
                </Link>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-warm-gray flex flex-wrap items-center gap-6 text-xs text-muted-gray">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-forest" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-forest" />
                <span>100% private cloud storage</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-forest" />
                <span>Zero fast-fashion ads</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-gradient-to-br from-forest via-[#2c382f] to-[#1d261f] text-white p-7 sm:p-8 rounded-2xl border border-forest/80 shadow-md flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-sage/20 rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold text-pale-sage uppercase tracking-wider flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5" />
                  <span>Capsule Blueprint</span>
                </span>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-white/10 text-white border border-white/15">
                  Formula
                </span>
              </div>

              <h3 className="text-lg font-bold text-white tracking-tight">
                10 Core Pieces ➔ 25+ Unique Looks
              </h3>
              <p className="mt-1 text-xs text-pale-sage/80 leading-relaxed">
                Mathematics of a balanced rotation: maximum versatility, zero clutter.
              </p>

              <div className="mt-5 space-y-2">
                <div className="p-2.5 rounded-xl bg-white/10 backdrop-blur-xs border border-white/15 flex items-center justify-between text-xs">
                  <span className="font-semibold text-white">
                    Linen Blazer
                  </span>
                  <span className="text-pale-sage text-[11px]">Forest Green</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white/10 backdrop-blur-xs border border-white/15 flex items-center justify-between text-xs">
                  <span className="font-semibold text-white">
                    Crewneck Sweater
                  </span>
                  <span className="text-pale-sage text-[11px]">Oatmeal Cream</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white/10 backdrop-blur-xs border border-white/15 flex items-center justify-between text-xs">
                  <span className="font-semibold text-white">
                    Pleated Trousers
                  </span>
                  <span className="text-pale-sage text-[11px]">Charcoal Slate</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white/10 backdrop-blur-xs border border-white/15 flex items-center justify-between text-xs">
                  <span className="font-semibold text-white">
                    Suede Loafers
                  </span>
                  <span className="text-pale-sage text-[11px]">Earthy Taupe</span>
                </div>
              </div>
            </div>

            <div className="relative z-10 mt-6 pt-5 border-t border-white/15">
              <div className="flex items-center justify-between text-xs text-pale-sage mb-2">
                <span>Capsule Synergy Index</span>
                <span className="font-bold text-white">98% Cohesion</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
                <div className="bg-pale-sage h-full rounded-full w-[98%]" />
              </div>
              <div className="mt-3 flex items-center gap-1.5 text-[11px] text-pale-sage/80">
                <ShieldCheck className="w-3.5 h-3.5 text-pale-sage" />
                <span>Outfit recommendations matched to clothes in your wardrobe</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}