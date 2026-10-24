"use client";

import React from "react";
import { motion } from "motion/react";
import { LandingCtaProps } from "../types/landing.types";
import LandingCtaContent from "./LandingCtaContent";

export default function LandingCta({ className = "" }: LandingCtaProps) {
  return (
    <section className={`py-16 sm:py-24 bg-transparent ${className}`}>
      <div className="max-w-6xl w-full mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="rounded-3xl border border-warm-gray bg-surface p-8 sm:p-12 lg:p-16 shadow-xs w-full"
        >
          <LandingCtaContent className="w-full" />
        </motion.div>
      </div>
    </section>
  );
}
