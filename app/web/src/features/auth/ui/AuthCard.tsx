"use client";

import Link from "next/link";
import Image from "next/image";
import { Shirt, Sparkles, ShieldCheck } from "lucide-react";
import { motion } from "motion/react";
import { AuthCardProps } from "../types/auth.types";

export default function AuthCard({
  title,
  subtitle,
  description,
  children,
}: AuthCardProps) {
  const displayText = subtitle || description;

  return (
    <div className="w-full flex items-center justify-center p-3 sm:p-4 lg:p-6 my-auto">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="w-full max-w-5xl bg-surface border border-warm-gray rounded-3xl shadow-sm overflow-hidden grid grid-cols-1 lg:grid-cols-2"
      >
        <div className="hidden lg:flex relative overflow-hidden flex-col justify-between p-6 xl:p-8 text-white min-h-[460px]">
          <Image
            src="https://images.unsplash.com/photo-1558882224-dda166733046?auto=format&fit=crop&w=1200&q=80"
            alt="Serene minimalist wardrobe"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/55 z-10" />

          <div className="relative z-20">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-forest/80 backdrop-blur-md text-pale-sage text-xs font-semibold border border-white/15 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-pale-sage" />
              <span>Curated Living</span>
            </div>
          </div>

          <div className="relative z-20 pt-6 border-t border-white/20">
            <span className="text-[11px] font-semibold tracking-widest uppercase text-pale-sage/90 block mb-2">
              Intentional Wardrobe
            </span>
            <blockquote className="text-lg sm:text-xl italic font-serif text-white leading-relaxed">
              &ldquo;Buy less, choose well, make it last.&rdquo;
            </blockquote>
            <p className="mt-2 text-xs text-pale-sage font-medium">
              — Vivienne Westwood
            </p>
          </div>
        </div>

        <div className="p-5 sm:p-7 lg:p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3.5 sm:mb-4">
              <Link
                href="/"
                className="flex items-center gap-2.5 font-bold text-xl text-charcoal hover:opacity-90 transition-opacity"
              >
                <div className="w-8 h-8 rounded-xl bg-forest text-white flex items-center justify-center shadow-xs">
                  <Shirt className="w-4 h-4" />
                </div>
                <span>Clothset</span>
              </Link>
              <span className="text-[11px] font-medium text-muted-gray uppercase tracking-wider">
                Digital Wardrobe
              </span>
            </div>

            <div className="mb-3.5 sm:mb-4">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-charcoal">
                {title}
              </h1>
              {displayText && (
                <p className="mt-1 text-xs sm:text-sm text-muted-gray leading-relaxed">
                  {displayText}
                </p>
              )}
            </div>

            {children}
          </div>

          <div className="pt-3 mt-3 sm:mt-4 border-t border-warm-gray flex items-center gap-2 text-xs text-muted-gray">
            <ShieldCheck className="w-4 h-4 text-forest dark:text-sage shrink-0" />
            <span>100% private wardrobe data • Zero speculative recommendations</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
