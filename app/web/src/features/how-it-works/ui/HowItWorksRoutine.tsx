"use client";

import { Sparkles, CalendarDays, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import Badge from "@/shared/components/ui/Badge";
import { HowItWorksRoutineProps } from "../types/how-it-works.types";
import { useCapsuleRoutine } from "../hooks/useCapsuleRoutine";

export default function HowItWorksRoutine({
  className = "",
}: HowItWorksRoutineProps) {
  const { routineDays, activeDayId, setActiveDayId, currentRoutine } =
    useCapsuleRoutine();

  return (
    <section className={`py-20 sm:py-28 bg-transparent border-b border-warm-gray ${className}`}>
      <div className="max-w-6xl w-full mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <Badge variant="accent" className="mb-3">
            7-Day Rotation
          </Badge>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-charcoal">
            See how 10 pieces create 7 distinct days
          </h2>
          <p className="mt-3 text-sm sm:text-base text-muted-gray leading-relaxed max-w-xl mx-auto">
            See how easily core clothes mix and match together. Select any day
            to view how pieces rotate into complete outfits.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-1.5 sm:gap-2 mb-8 overflow-x-auto pb-2">
            {routineDays.map((item) => {
              const isActive = item.id === activeDayId;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveDayId(item.id)}
                  className={`px-3.5 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                    isActive
                      ? "bg-forest text-white shadow-xs"
                      : "bg-surface border border-warm-gray text-charcoal hover:bg-cream"
                  }`}
                >
                  <span>{item.day}</span>
                </button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentRoutine.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="rounded-3xl border border-warm-gray bg-surface p-6 sm:p-10 shadow-sm"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-warm-gray">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <CalendarDays className="w-4 h-4 text-forest" />
                    <span className="text-xs font-bold text-forest uppercase tracking-wider">
                      {currentRoutine.fullDay}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-charcoal">
                    {currentRoutine.occasion}
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <Badge variant="secondary">{currentRoutine.vibe}</Badge>
                  <span className="text-xs font-medium text-muted-gray">
                    3-Piece Rotation
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6">
                {currentRoutine.items.map((piece) => (
                  <div
                    key={piece.id}
                    className="p-5 rounded-2xl bg-cream/40 border border-warm-gray/80 flex flex-col justify-between"
                  >
                    <div>
                      <span className="text-[11px] font-semibold text-muted-gray uppercase tracking-wider">
                        {piece.category}
                      </span>
                      <div className="mt-1 font-bold text-charcoal text-sm">
                        {piece.name}
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-warm-gray/60 flex items-center justify-between text-xs">
                      <span className="text-muted-gray font-medium">Color</span>
                      <span className="font-semibold text-charcoal">
                        {piece.color}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-warm-gray flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-muted-gray">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-forest" />
                  <span>All pieces pulled from your personal digitized wardrobe</span>
                </div>
                <div className="flex items-center gap-1.5 font-medium text-forest">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>No new clothes required</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}