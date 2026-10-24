"use client";

import { CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";
import Badge from "@/shared/components/ui/Badge";
import type { HowItWorksDigitizeGuideProps } from "../types/how-it-works.types";
import { DIGITIZE_TIPS } from "../constants/how-it-works.constants";
import HowItWorksVisualShowcase from "./HowItWorksVisualShowcase";

export default function HowItWorksDigitizeGuide({
  className = "",
}: HowItWorksDigitizeGuideProps) {
  return (
    <section className={`py-20 sm:py-28 bg-transparent border-b border-warm-gray ${className}`}>
      <div className="max-w-6xl w-full mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <Badge variant="accent" className="mb-3">
            Digitizing Best Practices
          </Badge>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-charcoal">
            Four tips for effortless wardrobe digitization
          </h2>
          <p className="mt-3 text-sm sm:text-base text-muted-gray leading-relaxed max-w-xl mx-auto">
            Digitizing your clothes is a one-time setup that pays off every single
            morning. Follow these recommendations for fast and accurate photo scanning.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-12"
        >
          <HowItWorksVisualShowcase />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {DIGITIZE_TIPS.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.08,
                  ease: "easeOut",
                }}
                className="rounded-2xl border border-warm-gray bg-cream/30 dark:bg-[#141a15] p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold text-muted-gray">
                      Step {item.number}
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-surface border border-warm-gray flex items-center justify-center text-forest dark:text-sage shadow-xs">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-charcoal">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs text-muted-gray leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-warm-gray flex items-center gap-1.5 text-xs text-charcoal dark:text-cream font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-sage shrink-0" />
                  <span className="truncate">{item.tip}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
