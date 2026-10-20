"use client";

import React from "react";
import { Check, Minus } from "lucide-react";
import { motion } from "motion/react";
import Badge from "@/shared/components/ui/Badge";
import { PricingComparisonMatrixProps } from "../types/pricing.types";
import { useComparisonMatrix } from "../hooks/useComparisonMatrix";

export default function PricingComparisonMatrix({
  className = "",
}: PricingComparisonMatrixProps) {
  const { categories } = useComparisonMatrix();

  const renderCellContent = (value: string | boolean) => {
    if (typeof value === "boolean") {
      return value ? (
        <div className="flex justify-center items-center">
          <div className="w-6 h-6 rounded-full bg-pale-sage text-forest flex items-center justify-center">
            <Check className="w-3.5 h-3.5" />
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center">
          <Minus className="w-4 h-4 text-warm-gray" />
        </div>
      );
    }
    return (
      <span className="text-xs sm:text-sm font-medium text-charcoal">
        {value}
      </span>
    );
  };

  return (
    <section className={`py-20 sm:py-28 bg-transparent border-b border-warm-gray ${className}`}>
      <div className="max-w-5xl w-full mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <Badge variant="accent" className="mb-3">
            Feature Breakdown
          </Badge>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-charcoal">
            Detailed Plan Comparison
          </h2>
          <p className="mt-3 text-sm sm:text-base text-muted-gray leading-relaxed max-w-xl mx-auto">
            Everything included in Clothset at a glance. Transparent boundaries,
            zero hidden add-ons.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="rounded-3xl border border-warm-gray bg-surface overflow-hidden shadow-xs"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="border-b border-warm-gray bg-cream/40">
                  <th className="py-5 px-6 font-bold text-sm text-charcoal w-1/2">
                    Features & Inclusions
                  </th>
                  <th className="py-5 px-4 font-bold text-sm text-charcoal text-center w-1/4">
                    Free
                  </th>
                  <th className="py-5 px-4 font-bold text-sm text-forest text-center w-1/4 bg-pale-sage/20">
                    Premium
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-warm-gray/70">
                {categories.map((category) => (
                  <React.Fragment key={category.category}>
                    <tr className="bg-cream/20">
                      <td
                        colSpan={3}
                        className="py-3 px-6 text-xs font-bold uppercase tracking-wider text-forest"
                      >
                        {category.category}
                      </td>
                    </tr>
                    {category.features.map((feature) => (
                      <tr
                        key={feature.name}
                        className="hover:bg-cream/10 transition-colors"
                      >
                        <td className="py-4 px-6">
                          <div className="font-semibold text-charcoal text-sm">
                            {feature.name}
                          </div>
                          <div className="text-xs text-muted-gray mt-0.5 leading-relaxed">
                            {feature.description}
                          </div>
                        </td>
                        <td className="py-4 px-4 text-center">
                          {renderCellContent(feature.free)}
                        </td>
                        <td className="py-4 px-4 text-center bg-pale-sage/10 font-medium">
                          {renderCellContent(feature.premium)}
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </section>
  );
}