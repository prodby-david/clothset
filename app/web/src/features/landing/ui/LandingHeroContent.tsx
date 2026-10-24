"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Layers,
  Shuffle,
  ShieldCheck,
  Tag,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import Button from "@/shared/components/ui/Button";
import Badge from "@/shared/components/ui/Badge";
import HeroPieceCard from "./HeroPieceCard";
import { LandingHeroContentProps } from "../types/landing.types";
import { useLandingHero } from "../hooks/useLandingHero";

export default function LandingHeroContent({
  className = "",
}: LandingHeroContentProps) {
  const {
    capsules,
    activeCapsule,
    activeCapsuleId,
    activeOutfit,
    activeOutfitIndex,
    totalVariants,
    handleSelectCapsule,
    handleShuffleMatch,
  } = useLandingHero();

  return (
    <section
      className={`relative overflow-hidden bg-transparent pt-12 pb-20 sm:pt-20 sm:pb-28 border-b border-warm-gray ${className}`}
    >
      <div className="max-w-6xl w-full mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex flex-col items-center text-center max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pale-sage text-forest dark:text-sage text-xs font-semibold mb-6 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-sage" />
            <span>Mindful Digital Wardrobe</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-charcoal leading-[1.14]">
            Intentional wardrobes for conscious dressers.
          </h1>

          <p className="mt-5 text-sm sm:text-base md:text-lg text-muted-gray max-w-2xl leading-relaxed">
            Curate intentional capsule collections, track item capacity limits, and style daily outfits strictly from clothes you actually own.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <Link href="/sign-up" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto gap-2">
                <span>Create Free Wardrobe</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/dashboard" className="w-full sm:w-auto">
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto gap-2"
              >
                <span>View Live Demo</span>
              </Button>
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-muted-gray">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-forest dark:text-sage" />
              <span>100% grounded in clothes you own</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-forest dark:text-sage" />
              <span>Strict capacity limits that prevent clutter</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-forest dark:text-sage" />
              <span>Private & encrypted wardrobe data</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
          className="mt-14 max-w-5xl mx-auto"
        >
          <div className="rounded-3xl border border-warm-gray bg-surface shadow-md overflow-hidden transition-all">
            <div className="px-5 sm:px-8 py-4 bg-cream/70 dark:bg-[#151a16] border-b border-warm-gray flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2 overflow-x-auto py-1">
                {capsules.map((capsule) => {
                  const isActive = capsule.id === activeCapsuleId;
                  return (
                    <button
                      key={capsule.id}
                      type="button"
                      onClick={() => handleSelectCapsule(capsule.id)}
                      className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                        isActive
                          ? "bg-forest text-white shadow-xs"
                          : "text-muted-gray hover:text-charcoal hover:bg-cream dark:hover:bg-[#1c231e]"
                      }`}
                    >
                      <Layers className="w-3.5 h-3.5 shrink-0" />
                      <span>{capsule.title}</span>
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleShuffleMatch}
                  className="gap-2 text-xs h-9 px-3.5"
                >
                  <Shuffle className="w-3.5 h-3.5 text-forest dark:text-sage" />
                  <span>
                    Shuffle Match ({activeOutfitIndex + 1}/{totalVariants})
                  </span>
                </Button>
              </div>
            </div>

            <div className="px-5 sm:px-8 py-5 border-b border-warm-gray/70 bg-surface/50 dark:bg-[#18201a]/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-sage">
                    Curated Wardrobe
                  </span>
                  <Badge variant="secondary">{activeCapsule.vibe}</Badge>
                </div>
                <p className="text-xs sm:text-sm text-muted-gray leading-relaxed max-w-xl">
                  {activeCapsule.description}
                </p>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
                <div className="px-3 py-1.5 rounded-xl bg-pale-sage text-forest dark:text-sage text-xs font-bold flex items-center gap-1.5 shadow-xs">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{activeCapsule.harmonyScore}% Synergy Score</span>
                </div>
              </div>
            </div>

            <div className="p-5 sm:p-8 bg-cream/30 dark:bg-[#151a16]/40">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${activeCapsuleId}-${activeOutfitIndex}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
                >
                  {activeOutfit.map((piece) => (
                    <HeroPieceCard key={piece.id} piece={piece} />
                  ))}
                </motion.div>
              </AnimatePresence>

              <div className="mt-6 pt-4 border-t border-warm-gray/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-muted-gray">
                <div className="flex items-center gap-2">
                  <Tag className="w-3.5 h-3.5 text-sage" />
                  <span className="font-medium text-charcoal">
                    Tonal Palette:
                  </span>
                  <span>{activeCapsule.palette}</span>
                </div>

                <div className="flex items-center gap-1.5 text-forest dark:text-sage font-semibold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>100% grounded in owned items</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
