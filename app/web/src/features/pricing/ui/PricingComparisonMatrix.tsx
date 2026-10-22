"use client";

import React from "react";
import { Check, Minus, Archive, Sparkles, Calendar, Shield } from "lucide-react";
import { motion } from "motion/react";
import Badge from "@/shared/components/ui/Badge";
import type { PricingComparisonMatrixProps } from "../types/pricing.types";
import { COMPARISON_MATRIX_CATEGORIES } from "../constants/pricing.constants";

export default function PricingComparisonMatrix({
  className = "",
}: PricingComparisonMatrixProps) {
  const getCategoryIcon = (iconName?: string) => {
    switch (iconName) {
      case "archive":
        return <Archive className="w-4 h-4 text-forest dark:text-sage" />;
      case "sparkles":
        return <Sparkles className="w-4 h-4 text-forest dark:text-sage" />;
      case "calendar":
        return <Calendar className="w-4 h-4 text-forest dark:text-sage" />;
      case "shield":
        return <Shield className="w-4 h-4 text-forest dark:text-sage" />;
      default:
        return <Sparkles className="w-4 h-4 text-forest dark:text-sage" />;
    }
  };

  const renderCellContent = (value: string | boolean, isHighlighted = false) => {
    if (typeof value === "boolean") {
      return value ? (
        <div className="flex justify-center items-center">
          <div
            className={`w-6 h-6 rounded-full flex items-center justify-center ${
              isHighlighted
                ? "bg-forest text-white shadow-2xs"
                : "bg-pale-sage text-forest dark:text-sage"
            }`}
          >
            <Check className="w-3.5 h-3.5" />
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center">
          <Minus className="w-4 h-4 text-warm-gray dark:text-muted-gray/50" />
        </div>
      );
    }
    return (
      <span
        className={`text-xs sm:text-sm font-semibold ${
          isHighlighted ? "text-forest dark:text-sage" : "text-charcoal"
        }`}
      >
        {value}
      </span>
    );
  };

  return (
    <section className={`py-20 sm:py-28 bg-transparent border-b border-warm-gray ${className}`}>
      <div className="max-w-6xl w-full mx-auto px-4 sm:px-6">
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
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-charcoal">
            Detailed Plan Comparison
          </h2>
          <p className="mt-3 text-sm sm:text-base md:text-lg text-muted-gray leading-relaxed max-w-xl mx-auto">
            Explore every feature across Basic, Plus, and Elite. Transparent limits,
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
            <table className="w-full text-left border-collapse min-w-[720px]">
              <thead>
                <tr className="border-b border-warm-gray bg-cream/40">
                  <th className="py-5 px-6 font-bold text-sm text-charcoal w-[40%]">
                    Features & Inclusions
                  </th>
                  <th className="py-5 px-4 font-bold text-sm text-charcoal text-center w-[20%]">
                    <div>Basic</div>
                    <div className="text-xs font-normal text-muted-gray mt-0.5">$0 forever</div>
                  </th>
                  <th className="py-5 px-4 font-bold text-sm text-forest dark:text-sage text-center w-[20%] bg-pale-sage/25">
                    <div className="inline-flex items-center gap-1">
                      <span>Plus</span>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-forest text-white shadow-2xs">
                        Popular
                      </span>
                    </div>
                    <div className="text-xs font-normal text-muted-gray mt-0.5">$8 / month</div>
                  </th>
                  <th className="py-5 px-4 font-bold text-sm text-forest dark:text-sage text-center w-[20%] bg-forest/5">
                    <div className="inline-flex items-center gap-1">
                      <span>Elite</span>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-pale-sage text-forest dark:text-sage border border-forest/20">
                        VIP
                      </span>
                    </div>
                    <div className="text-xs font-normal text-muted-gray mt-0.5">$16 / month</div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-warm-gray/70">
                {COMPARISON_MATRIX_CATEGORIES.map((category) => (
                  <React.Fragment key={category.category}>
                    <tr className="bg-cream/40 border-y border-warm-gray">
                      <td
                        colSpan={4}
                        className="py-3 px-6"
                      >
                        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-forest dark:text-sage">
                          {getCategoryIcon(category.icon)}
                          <span>{category.category}</span>
                        </div>
                      </td>
                    </tr>
                    {category.features.map((feature) => (
                      <tr
                        key={feature.name}
                        className="hover:bg-cream/15 transition-colors"
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
                          {renderCellContent(feature.basic)}
                        </td>
                        <td className="py-4 px-4 text-center bg-pale-sage/15">
                          {renderCellContent(feature.plus, true)}
                        </td>
                        <td className="py-4 px-4 text-center bg-forest/5">
                          {renderCellContent(feature.elite, true)}
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
