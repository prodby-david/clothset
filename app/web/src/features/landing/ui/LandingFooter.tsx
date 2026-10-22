"use client";

import Link from "next/link";
import { Shirt } from "lucide-react";
import { LandingFooterProps } from "../types/landing.types";

export default function LandingFooter({ className = "" }: LandingFooterProps) {
  return (
    <footer className={`w-full bg-forest dark:bg-surface text-cream dark:text-charcoal border-t border-forest-dark dark:border-warm-gray py-16 ${className}`}>
      <div className="max-w-6xl w-full mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-forest-dark dark:border-warm-gray">
          <div className="md:col-span-2 flex flex-col gap-4">
            <Link
              href="/"
              className="flex items-center gap-2.5 font-bold text-xl tracking-tight text-white dark:text-charcoal"
            >
              <div className="w-9 h-9 rounded-xl bg-pale-sage text-forest dark:text-sage flex items-center justify-center shadow-xs">
                <Shirt className="w-5 h-5" />
              </div>
              <span>Clothset</span>
            </Link>

            <p className="text-xs text-pale-sage/80 dark:text-muted-gray max-w-sm leading-relaxed">
              A simple digital wardrobe app that helps you organize your clothes
              and discover great outfits from what you already own.
            </p>

            <div className="text-xs text-pale-sage/70 dark:text-muted-gray/80 flex items-center gap-1.5 pt-1">
              <span>Designed to make getting dressed easy and stress-free</span>
            </div>
          </div>

          <div className="flex flex-col gap-2.5 text-sm">
            <span className="font-semibold text-white dark:text-charcoal text-xs uppercase tracking-wider">
              Explore
            </span>
            <Link
              href="/features"
              className="text-pale-sage/80 hover:text-white dark:text-muted-gray dark:hover:text-charcoal transition-colors"
            >
              Features
            </Link>
            <Link
              href="/how-it-works"
              className="text-pale-sage/80 hover:text-white dark:text-muted-gray dark:hover:text-charcoal transition-colors"
            >
              How It Works
            </Link>
            <Link
              href="/pricing"
              className="text-pale-sage/80 hover:text-white dark:text-muted-gray dark:hover:text-charcoal transition-colors"
            >
              Pricing
            </Link>
            <Link
              href="/faq"
              className="text-pale-sage/80 hover:text-white dark:text-muted-gray dark:hover:text-charcoal transition-colors"
            >
              FAQ
            </Link>
          </div>

          <div className="flex flex-col gap-2.5 text-sm">
            <span className="font-semibold text-white dark:text-charcoal text-xs uppercase tracking-wider">
              Account
            </span>
            <Link
              href="/sign-in"
              className="text-pale-sage/80 hover:text-white dark:text-muted-gray dark:hover:text-charcoal transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/sign-up"
              className="text-pale-sage/80 hover:text-white dark:text-muted-gray dark:hover:text-charcoal transition-colors"
            >
              Get Started Free
            </Link>
            <Link
              href="/dashboard"
              className="text-pale-sage/80 hover:text-white dark:text-muted-gray dark:hover:text-charcoal transition-colors"
            >
              Dashboard Demo
            </Link>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-pale-sage/70 dark:text-muted-gray/80">
          <p>© 2026 Clothset. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Your Clothes Stay Private</span>
            <span>•</span>
            <span>Built for Everyday Wear</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
