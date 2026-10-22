"use client";

import { ChevronDown, Mail, ArrowDown } from "lucide-react";
import { motion } from "motion/react";
import Badge from "@/shared/components/ui/Badge";
import Button from "@/shared/components/ui/Button";
import { LandingFaqProps } from "../types/faq.types";
import { useFaq } from "../hooks/useFaq";

export default function LandingFaq({ className = "" }: LandingFaqProps) {
  const { faqs, openId, toggleItem } = useFaq();

  return (
    <section id="faq" className={`py-20 sm:py-28 bg-transparent border-b border-warm-gray ${className}`}>
      <div className="max-w-4xl w-full mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <Badge variant="accent" className="mb-3">
            Common Questions
          </Badge>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-charcoal">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-sm sm:text-base md:text-lg text-muted-gray leading-relaxed max-w-xl mx-auto">
            Everything you need to know about Clothset wardrobe organization and
            outfit ideas.
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openId === faq.id;
            return (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.35, delay: index * 0.06, ease: "easeOut" }}
                className="rounded-2xl border border-warm-gray bg-surface overflow-hidden transition-all shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => toggleItem(faq.id)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 font-semibold text-charcoal hover:bg-cream/40 transition-colors cursor-pointer focus:outline-none outline-none focus-visible:outline-none select-none"
                >
                  <span className="text-sm sm:text-base md:text-lg">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-muted-gray shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-forest dark:text-sage" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-sm text-muted-gray leading-relaxed border-t border-warm-gray/60 bg-cream/20">
                    {faq.answer}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="mt-12 p-6 sm:p-8 rounded-2xl border border-warm-gray bg-surface flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs"
        >
          <div>
            <h3 className="text-base font-semibold text-charcoal">
              Couldn&apos;t find an answer to your question?
            </h3>
            <p className="mt-1 text-xs sm:text-sm text-muted-gray leading-relaxed">
              Send our wardrobe team a message using our contact form below.
            </p>
          </div>
          <a href="#contact" className="w-full sm:w-auto shrink-0">
            <Button variant="outline" size="sm" className="w-full sm:w-auto gap-2 text-xs">
              <Mail className="w-3.5 h-3.5 text-forest dark:text-sage" />
              <span>Contact Us</span>
              <ArrowDown className="w-3 h-3 text-muted-gray" />
            </Button>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
