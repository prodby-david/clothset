"use client";

import { motion } from "motion/react";
import Badge from "@/shared/components/ui/Badge";
import { LandingHowItWorksProps } from "../types/how-it-works.types";
import { useHowItWorksSteps } from "../hooks/useHowItWorksSteps";

export default function LandingHowItWorks({ className = "" }: LandingHowItWorksProps) {
  const { steps } = useHowItWorksSteps();

  return (
    <section
      id="how-it-works"
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
            Simple Process
          </Badge>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-charcoal">
            How Clothset works in three steps.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-muted-gray leading-relaxed max-w-xl mx-auto">
            Move from a chaotic physical closet to a curated digital capsule in
            minutes.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.45, delay: index * 0.1, ease: "easeOut" }}
                whileHover={{ y: -3 }}
                className="relative rounded-2xl border border-warm-gray bg-surface p-7 sm:p-8 flex flex-col justify-between shadow-xs hover:border-sage/60 transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-pale-sage text-forest flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-3xl font-bold text-warm-gray/90 tracking-tight font-mono">
                      {step.number}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-charcoal mb-2 tracking-tight">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-gray leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
