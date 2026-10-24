"use client";

import Image from "next/image";
import { Sparkles, Scan, CheckCircle2, ShieldCheck, Tag } from "lucide-react";
import type { FeaturesAiScannerPreviewProps } from "../types/features.types";

export default function FeaturesAiScannerPreview({
  className = "",
}: FeaturesAiScannerPreviewProps) {
  return (
    <div
      className={`rounded-3xl border border-warm-gray bg-surface shadow-md overflow-hidden flex flex-col md:flex-row items-stretch ${className}`}
    >
      <div className="relative w-full md:w-1/2 min-h-[320px] sm:min-h-[380px] bg-cream/60 dark:bg-[#121713] overflow-hidden flex items-center justify-center p-6">
        <Image
          src="https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80"
          alt="AI Garment Scanner Demonstration"
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
          priority
        />

        <div className="absolute inset-0 bg-black/15 pointer-events-none" />

        <div className="absolute inset-6 border border-white/50 rounded-2xl pointer-events-none flex flex-col justify-between p-3.5 backdrop-blur-[0.5px]">
          <div className="flex items-center justify-between">
            <span className="w-3.5 h-3.5 border-t-2 border-l-2 border-white rounded-tl-sm" />
            <span className="w-3.5 h-3.5 border-t-2 border-r-2 border-white rounded-tr-sm" />
          </div>
          <div className="flex items-center justify-between">
            <span className="w-3.5 h-3.5 border-b-2 border-l-2 border-white rounded-bl-sm" />
            <span className="w-3.5 h-3.5 border-b-2 border-r-2 border-white rounded-br-sm" />
          </div>
        </div>

        <div className="absolute top-9 left-9 z-10 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-semibold border border-white/20 shadow-xs">
          <Scan className="w-3.5 h-3.5 text-pale-sage" />
          <span>Silhouette Isolated</span>
        </div>

        <div className="absolute bottom-9 left-9 right-9 z-10 p-3.5 rounded-xl bg-surface/90 dark:bg-[#18201a]/95 backdrop-blur-md border border-warm-gray/90 shadow-sm flex flex-col gap-2">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5 font-bold text-charcoal">
              <Sparkles className="w-3.5 h-3.5 text-sage" />
              <span>Smart Analysis Active</span>
            </div>
            <span className="font-mono text-[11px] font-bold text-forest dark:text-sage">
              99.2% Confidence
            </span>
          </div>

          <div className="flex flex-wrap gap-1.5 text-[11px]">
            <span className="px-2 py-0.5 rounded-md bg-pale-sage/80 text-forest dark:text-sage font-medium">
              TOPS • Poplin Cotton
            </span>
            <span className="px-2 py-0.5 rounded-md bg-cream dark:bg-[#141a15] text-charcoal font-medium border border-warm-gray">
              Crisp Off-White
            </span>
            <span className="px-2 py-0.5 rounded-md bg-cream dark:bg-[#141a15] text-charcoal font-medium border border-warm-gray">
              All Season
            </span>
          </div>
        </div>
      </div>

      <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between bg-surface dark:bg-[#18201a]">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-pale-sage text-forest dark:text-sage text-xs font-bold">
              <Tag className="w-3.5 h-3.5" />
              <span>Instant Silhouette Digitization</span>
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-charcoal">
            Automated item extraction with zero manual data entry
          </h3>

          <p className="mt-3 text-xs sm:text-sm text-muted-gray leading-relaxed">
            Snap clothing with any phone camera. Clothset cleans the photo, determines true color harmony coordinates, and assigns it to your wardrobe drawer in seconds.
          </p>

          <div className="mt-6 space-y-3">
            <div className="p-3 rounded-xl bg-cream/50 dark:bg-[#141a15] border border-warm-gray flex items-start gap-3 text-xs">
              <CheckCircle2 className="w-4 h-4 text-forest dark:text-sage shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-charcoal block">Tone & Contrast Calibrated</span>
                <span className="text-muted-gray text-[11px]">Exact color coordinates mapped against your personal palette.</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-cream/50 dark:bg-[#141a15] border border-warm-gray flex items-start gap-3 text-xs">
              <CheckCircle2 className="w-4 h-4 text-forest dark:text-sage shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-charcoal block">Zero Cloud Training</span>
                <span className="text-muted-gray text-[11px]">Your wardrobe photos are never used to train public generative models.</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-5 border-t border-warm-gray flex items-center justify-between text-xs text-muted-gray">
          <div className="flex items-center gap-1.5 font-medium text-forest dark:text-sage">
            <ShieldCheck className="w-4 h-4" />
            <span>Private User Storage</span>
          </div>
          <span className="text-[11px]">S3 Encrypted</span>
        </div>
      </div>
    </div>
  );
}
